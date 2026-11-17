import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from './LoadingSpinner';

/**
 * ProtectedRoute — Auth-based route guard for TravelVerse.
 *
 * Props:
 *   children     — The protected page/component to render.
 *   requireAdmin — When true, also requires user.role === 'admin'.
 */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show spinner while auth state is being resolved
  if (loading) {
    return <LoadingSpinner />;
  }

  // Not logged in → redirect to /login, preserving the intended destination
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // Logged in but doesn't have admin role → redirect to dashboard
  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
