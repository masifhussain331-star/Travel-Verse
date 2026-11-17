// Local & Supabase Storage Service with Fallback
import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEYS = {
  USER: 'travelverse_user',
  BOOKINGS: 'travelverse_bookings',
  WISHLIST: 'travelverse_wishlist',
  CURRENCY: 'travelverse_currency',
  CUSTOM_FLIGHTS: 'travelverse_admin_custom_flights',
  CUSTOM_HOTELS: 'travelverse_admin_custom_hotels'
};

// Initial default user for seamless instant testing
export const DEFAULT_DEMO_USER = {
  id: 'usr-demo-786',
  email: 'traveler@travelverse.com',
  full_name: 'Zainab Fatima',
  phone: '+92 300 1234567',
  role: 'customer', // 'customer' or 'admin'
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
  preferred_currency: 'PKR',
  passport_number: 'PK9823411',
  nationality: 'Pakistani',
  loyaltyTier: 'Platinum Voyager',
  points: 12450
};

export const DEFAULT_ADMIN_USER = {
  id: 'usr-admin-001',
  email: 'admin@travelverse.com',
  full_name: 'Director Asif Khan',
  phone: '+92 321 9876543',
  role: 'admin',
  avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
  preferred_currency: 'PKR',
  loyaltyTier: 'Super Admin',
  points: 99999
};

// Initial seed bookings so user dashboard and my bookings look alive immediately
const INITIAL_SEED_BOOKINGS = [
  {
    id: 'TV-BK-8921',
    bookingReference: 'TV-FL-8921',
    itemType: 'flight',
    itemId: 'FL-EK-612',
    itemTitle: 'Emirates EK 612 (Islamabad -> Dubai)',
    itemDetails: {
      airline: 'Emirates',
      flightNumber: 'EK 612',
      origin: 'ISB',
      destination: 'DXB',
      departureDate: '2026-12-05',
      departureTime: '03:10',
      arrivalTime: '05:45',
      cabinClass: 'Economy',
      passengers: 1,
      seat: '14A (Window)',
      aircraft: 'Boeing 777-300ER',
      baggage: '30 kg checked + 7 kg cabin'
    },
    passengers: [
      { firstName: 'Zainab', lastName: 'Fatima', passport: 'PK9823411', meal: 'Halal Muslim Meal (MOML)' }
    ],
    contactInfo: {
      email: 'traveler@travelverse.com',
      phone: '+92 300 1234567'
    },
    supplierCurrency: 'USD',
    supplierPrice: 295,
    chargedCurrency: 'PKR',
    chargedPrice: 82187,
    exchangeRate: 278.60,
    exchangeTimestamp: '2026-11-17T11:00:00Z',
    status: 'confirmed',
    isDemo: true,
    paymentMethod: 'Mastercard •••• 4821',
    paymentId: 'PAY-TRV-901824',
    createdAt: '2026-11-15T09:24:00Z'
  },
  {
    id: 'TV-BK-6304',
    bookingReference: 'TV-HTL-6304',
    itemType: 'hotel',
    itemId: 'HTL-DXB-ATLANTIS',
    itemTitle: 'Atlantis The Royal Resort & Residences',
    itemDetails: {
      hotelName: 'Atlantis The Royal Resort & Residences',
      city: 'Dubai',
      country: 'UAE',
      roomName: 'Seascape King Room with Palm Balcony',
      checkIn: '2026-12-05',
      checkOut: '2026-12-09',
      nights: 4,
      guests: '2 Adults'
    },
    passengers: [
      { firstName: 'Zainab', lastName: 'Fatima', email: 'traveler@travelverse.com' },
      { firstName: 'Hamza', lastName: 'Tariq', email: 'hamza@travelverse.com' }
    ],
    contactInfo: {
      email: 'traveler@travelverse.com',
      phone: '+92 300 1234567'
    },
    supplierCurrency: 'USD',
    supplierPrice: 2080,
    chargedCurrency: 'PKR',
    chargedPrice: 579488,
    exchangeRate: 278.60,
    exchangeTimestamp: '2026-11-17T11:00:00Z',
    status: 'confirmed',
    isDemo: true,
    paymentMethod: 'Visa •••• 9012',
    paymentId: 'PAY-TRV-882194',
    createdAt: '2026-11-15T09:30:00Z'
  }
];

export const storageService = {
  // --- USER AUTH ---
  getUser() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USER);
      if (stored) return JSON.parse(stored);
      // Default to demo user if not logged in
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(DEFAULT_DEMO_USER));
      return DEFAULT_DEMO_USER;
    } catch {
      return DEFAULT_DEMO_USER;
    }
  },

  setUser(user) {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    }
    return user;
  },

  // --- BOOKINGS ---
  getBookings() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      if (stored) return JSON.parse(stored);
      localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(INITIAL_SEED_BOOKINGS));
      return INITIAL_SEED_BOOKINGS;
    } catch {
      return INITIAL_SEED_BOOKINGS;
    }
  },

  addBooking(booking) {
    const list = this.getBookings();
    const updated = [booking, ...list];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));

    // Also attempt Supabase insert if connected
    if (isSupabaseConfigured && supabase) {
      supabase.from('bookings').insert([booking]).then(({ error }) => {
        if (error) console.warn('Supabase booking sync warning:', error);
      });
    }

    return booking;
  },

  updateBookingStatus(bookingId, newStatus) {
    const list = this.getBookings();
    const updated = list.map(b => b.id === bookingId ? { ...b, status: newStatus } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));

    if (isSupabaseConfigured && supabase) {
      supabase.from('bookings').update({ status: newStatus }).eq('id', bookingId);
    }

    return updated;
  },

  // --- WISHLIST ---
  getWishlist() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      if (stored) return JSON.parse(stored);
      const initialWishlist = [
        {
          id: 'HTL-IST-FOURSEASONS',
          type: 'hotel',
          title: 'Four Seasons Hotel Istanbul at the Bosphorus',
          location: 'Istanbul, Turkey',
          priceUSD: 440,
          image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&auto=format&fit=crop&q=80',
          rating: 4.9
        },
        {
          id: 'PKG-HUNZA-EXPEDITION',
          type: 'package',
          title: 'Enchanting Hunza & Skardu: The Karakoram Odyssey',
          location: 'Gilgit-Baltistan, Pakistan',
          priceUSD: 520,
          image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&auto=format&fit=crop&q=80',
          rating: 5.0
        }
      ];
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(initialWishlist));
      return initialWishlist;
    } catch {
      return [];
    }
  },

  toggleWishlist(item) {
    const list = this.getWishlist();
    const exists = list.some(w => w.id === item.id);
    let updated;
    if (exists) {
      updated = list.filter(w => w.id !== item.id);
    } else {
      updated = [item, ...list];
    }
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(updated));
    return updated;
  },

  isWishlisted(itemId) {
    const list = this.getWishlist();
    return list.some(w => w.id === itemId);
  }
};

