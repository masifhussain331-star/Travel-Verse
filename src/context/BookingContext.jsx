import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService';
import { providerService } from '../services/providerService';

const BookingContext = createContext();

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => storageService.getBookings());

  const addBooking = (newBooking) => {
    const saved = storageService.addBooking(newBooking);
    setBookings(storageService.getBookings());
    return saved;
  };

  const cancelBooking = (bookingId, reason = 'Customer requested cancellation') => {
    const updated = storageService.updateBookingStatus(bookingId, 'cancelled');
    setBookings(updated);
    return true;
  };

  const refundBooking = (bookingId) => {
    const updated = storageService.updateBookingStatus(bookingId, 'refunded');
    setBookings(updated);
    return true;
  };

  const getBookingById = (bookingId) => {
    return bookings.find(b => b.id === bookingId || b.bookingReference === bookingId);
  };

  return (
    <BookingContext.Provider value={{
      bookings,
      addBooking,
      cancelBooking,
      refundBooking,
      getBookingById
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBookings must be used within a BookingProvider');
  }
  return context;
}

