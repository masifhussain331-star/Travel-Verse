/**
 * customerService.js
 * Supabase-integrated customer data service with local storageService fallback.
 * All functions return plain JS objects/arrays so components stay data-source agnostic.
 */

import { supabase, isSupabaseConfigured } from './supabase';
import { storageService } from './storageService';

// ---------------------------------------------------------------------------
// fetchProfile
// ---------------------------------------------------------------------------
/**
 * Fetch a user's profile from Supabase `profiles` table.
 * Falls back to storageService.getUser() when Supabase is not configured.
 *
 * @param {string} userId
 * @returns {Promise<object|null>}
 */
export async function fetchProfile(userId) {
  if (isSupabaseConfigured && supabase && userId) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) return data;
    // Fall through to local fallback on error
    if (error) console.warn('[customerService] fetchProfile Supabase error:', error.message);
  }

  return storageService.getUser();
}

// ---------------------------------------------------------------------------
// updateProfile
// ---------------------------------------------------------------------------
/**
 * Upsert user profile data in Supabase `profiles` table.
 * Falls back to storageService.setUser() when Supabase is not configured.
 *
 * @param {string} userId
 * @param {object} updates
 * @returns {Promise<object|null>}
 */
export async function updateProfile(userId, updates) {
  if (isSupabaseConfigured && supabase && userId) {
    const { data, error } = await supabase
      .from('profiles')
      .upsert({ id: userId, ...updates }, { onConflict: 'id' })
      .select()
      .single();

    if (!error && data) return data;
    if (error) console.warn('[customerService] updateProfile Supabase error:', error.message);
  }

  const existing = storageService.getUser();
  const merged = { ...existing, ...updates };
  storageService.setUser(merged);
  return merged;
}

// ---------------------------------------------------------------------------
// fetchBookings
// ---------------------------------------------------------------------------
/**
 * Fetch all bookings for a given user from Supabase `bookings` table.
 * Falls back to storageService.getBookings() (which returns all local bookings).
 *
 * @param {string} userId
 * @returns {Promise<object[]>}
 */
export async function fetchBookings(userId) {
  if (isSupabaseConfigured && supabase && userId) {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) return data;
    if (error) console.warn('[customerService] fetchBookings Supabase error:', error.message);
  }

  return storageService.getBookings();
}

// ---------------------------------------------------------------------------
// fetchWishlist
// ---------------------------------------------------------------------------
/**
 * Fetch a user's wishlist / saved destinations from Supabase `saved_destinations` table.
 * Falls back to storageService.getWishlist().
 *
 * @param {string} userId
 * @returns {Promise<object[]>}
 */
export async function fetchWishlist(userId) {
  if (isSupabaseConfigured && supabase && userId) {
    const { data, error } = await supabase
      .from('saved_destinations')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) return data;
    if (error) console.warn('[customerService] fetchWishlist Supabase error:', error.message);
  }

  return storageService.getWishlist();
}

// ---------------------------------------------------------------------------
// fetchPaymentHistory
// ---------------------------------------------------------------------------
/**
 * Fetch payment history from Supabase `payments` table.
 * Falls back to deriving payment records from local bookings.
 *
 * @param {string} userId
 * @returns {Promise<object[]>}
 */
export async function fetchPaymentHistory(userId) {
  if (isSupabaseConfigured && supabase && userId) {
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (!error && data) return data;
    if (error) console.warn('[customerService] fetchPaymentHistory Supabase error:', error.message);
  }

  // Derive payment records from local bookings
  const bookings = storageService.getBookings();
  return bookings.map((b) => ({
    id: b.paymentId || `PAY-${b.id}`,
    booking_reference: b.bookingReference,
    item_title: b.itemTitle,
    item_type: b.itemType,
    payment_method: b.paymentMethod || 'Card on file',
    amount: b.chargedPrice,
    currency: b.chargedCurrency,
    amount_usd: b.supplierPrice,
    status: b.status === 'cancelled' ? 'refunded' : 'completed',
    created_at: b.createdAt,
  }));
}

// ---------------------------------------------------------------------------
// fetchSavedDestinations
// ---------------------------------------------------------------------------
/**
 * Alias for fetchWishlist — fetches from Supabase `saved_destinations` table.
 *
 * @param {string} userId
 * @returns {Promise<object[]>}
 */
export async function fetchSavedDestinations(userId) {
  return fetchWishlist(userId);
}

// ---------------------------------------------------------------------------
// cancelBooking
// ---------------------------------------------------------------------------
/**
 * Cancel a booking by id.
 * Updates `status` to 'cancelled' in Supabase and local storage.
 *
 * @param {string} bookingId
 * @returns {Promise<boolean>}
 */
export async function cancelBooking(bookingId) {
  if (isSupabaseConfigured && supabase && bookingId) {
    const { error } = await supabase
      .from('bookings')
      .update({ status: 'cancelled' })
      .eq('id', bookingId);

    if (error) console.warn('[customerService] cancelBooking Supabase error:', error.message);
  }

  storageService.updateBookingStatus(bookingId, 'cancelled');
  return true;
}
