import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService, DEFAULT_DEMO_USER, DEFAULT_ADMIN_USER } from '../services/storageService';
import { supabase, isSupabaseConfigured } from '../services/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storageService.getUser());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If Supabase is configured, listen to auth state changes
    if (isSupabaseConfigured && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (session?.user) {
          // Fetch profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          const currentUser = {
            id: session.user.id,
            email: session.user.email,
            full_name: profile?.full_name || session.user.email.split('@')[0],
            role: profile?.role || 'customer',
            avatar_url: profile?.avatar_url || DEFAULT_DEMO_USER.avatar_url,
            preferred_currency: profile?.preferred_currency || 'PKR'
          };
          setUser(currentUser);
          storageService.setUser(currentUser);
        }
      });

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // User handled by onAuthStateChange
        return { success: true };
      }

      // Demo login
      let loggedUser;
      if (email.toLowerCase().includes('admin')) {
        loggedUser = { ...DEFAULT_ADMIN_USER, email };
      } else {
        loggedUser = {
          ...DEFAULT_DEMO_USER,
          email,
          full_name: email.split('@')[0].replace('.', ' ').replace(/\b\w/g, l => l.toUpperCase())
        };
      }
      setUser(loggedUser);
      storageService.setUser(loggedUser);
      return { success: true, user: loggedUser };
    } finally {
      setLoading(false);
    }
  };

  const register = async ({ email, fullName, password, phone }) => {
    setLoading(true);
    try {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName, phone }
          }
        });
        if (error) throw error;
        return { success: true };
      }

      // Demo registration
      const newUser = {
        id: 'usr-' + Date.now(),
        email,
        full_name: fullName,
        phone: phone || '+92 300 0000000',
        role: email.toLowerCase().includes('admin') ? 'admin' : 'customer',
        avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        preferred_currency: 'PKR',
        loyaltyTier: 'Silver Explorer',
        points: 500
      };
      setUser(newUser);
      storageService.setUser(newUser);
      return { success: true, user: newUser };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    storageService.setUser(null);
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    storageService.setUser(updated);

    if (isSupabaseConfigured && supabase && user?.id) {
      supabase.from('profiles').update(updates).eq('id', user.id);
    }
  };

  const toggleAdminRole = () => {
    if (!user) {
      setUser(DEFAULT_ADMIN_USER);
      storageService.setUser(DEFAULT_ADMIN_USER);
      return;
    }
    const newRole = user.role === 'admin' ? 'customer' : 'admin';
    const updated = { ...user, role: newRole };
    setUser(updated);
    storageService.setUser(updated);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin: user?.role === 'admin',
      loading,
      login,
      register,
      logout,
      updateProfile,
      toggleAdminRole
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

