import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { BookingProvider } from './context/BookingContext';

// Common Components
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import LoadingSpinner from './components/common/LoadingSpinner';
import ProtectedRoute from './components/common/ProtectedRoute';

// Lazy Loaded Customer Pages (17 Pages)
const HomePage = lazy(() => import('./pages/HomePage'));
const FlightSearchPage = lazy(() => import('./pages/FlightSearchPage'));
const FlightDetailsPage = lazy(() => import('./pages/FlightDetailsPage'));
const HotelSearchPage = lazy(() => import('./pages/HotelSearchPage'));
const HotelDetailsPage = lazy(() => import('./pages/HotelDetailsPage'));
const DestinationExplorerPage = lazy(() => import('./pages/DestinationExplorerPage'));
const DestinationDetailPage = lazy(() => import('./pages/DestinationDetailPage'));
const TravelPackagesPage = lazy(() => import('./pages/TravelPackagesPage'));
const PackageDetailPage = lazy(() => import('./pages/PackageDetailPage'));
const CarRentalsPage = lazy(() => import('./pages/CarRentalsPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const CustomerDashboardPage = lazy(() => import('./pages/CustomerDashboardPage'));
const MyBookingsPage = lazy(() => import('./pages/MyBookingsPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));

// Admin Portal
const AdminDashboardPage = lazy(() => import('./pages/admin/AdminDashboardPage'));

export default function App() {
  return (
    <CurrencyProvider>
      <AuthProvider>
        <WishlistProvider>
          <BookingProvider>
            <Router>
              <ScrollToTop />
              <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
                <Navbar />
                
                <main className="flex-1">
                  <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                      {/* 1. Homepage */}
                      <Route path="/" element={<HomePage />} />

                      {/* 2 & 3. Flight search & details */}
                      <Route path="/flights" element={<FlightSearchPage />} />
                      <Route path="/flights/:id" element={<FlightDetailsPage />} />

                      {/* 4 & 5. Hotel search & details */}
                      <Route path="/hotels" element={<HotelSearchPage />} />
                      <Route path="/hotels/:id" element={<HotelDetailsPage />} />

                      {/* 6. Destination explorer */}
                      <Route path="/destinations" element={<DestinationExplorerPage />} />
                      <Route path="/destinations/:slug" element={<DestinationDetailPage />} />

                      {/* 7. Travel packages */}
                      <Route path="/packages" element={<TravelPackagesPage />} />
                      <Route path="/packages/:id" element={<PackageDetailPage />} />

                      {/* 8. Car rentals */}
                      <Route path="/cars" element={<CarRentalsPage />} />

                      {/* 9 & 10. Login & Register */}
                      <Route path="/login" element={<LoginPage />} />
                      <Route path="/register" element={<RegisterPage />} />

                      {/* 11. Customer dashboard (protected) */}
                      <Route path="/dashboard" element={
                        <ProtectedRoute>
                          <CustomerDashboardPage />
                        </ProtectedRoute>
                      } />

                      {/* 12. My bookings (protected) */}
                      <Route path="/bookings" element={
                        <ProtectedRoute>
                          <MyBookingsPage />
                        </ProtectedRoute>
                      } />

                      {/* 13. Wishlist (protected) */}
                      <Route path="/wishlist" element={
                        <ProtectedRoute>
                          <WishlistPage />
                        </ProtectedRoute>
                      } />

                      {/* 14. Contact */}
                      <Route path="/contact" element={<ContactPage />} />

                      {/* 15. About */}
                      <Route path="/about" element={<AboutPage />} />

                      {/* 16. Terms and conditions */}
                      <Route path="/terms" element={<TermsPage />} />

                      {/* 17. Privacy policy */}
                      <Route path="/privacy" element={<PrivacyPage />} />

                      {/* Admin Dashboard (protected, admin-only) */}
                      <Route path="/admin" element={
                        <ProtectedRoute requireAdmin>
                          <AdminDashboardPage />
                        </ProtectedRoute>
                      } />

                      {/* Fallback */}
                      <Route path="*" element={<HomePage />} />
                    </Routes>
                  </Suspense>
                </main>

                <Footer />
              </div>
            </Router>
          </BookingProvider>
        </WishlistProvider>
      </AuthProvider>
    </CurrencyProvider>
  );
}
