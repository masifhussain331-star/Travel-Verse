import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Globe,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  UserCheck,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import Badge from '../components/common/Badge';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await login(email, password);
      if (res?.success) {
        if (email.toLowerCase().includes('admin')) {
          navigate('/admin');
        } else {
          navigate('/dashboard');
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.');
    }
  };

  const handleQuickLogin = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    login(demoEmail, demoPass).then(() => {
      if (demoEmail.includes('admin')) {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    });
  };

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl space-y-6">

        {/* Brand header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-700 via-blue-600 to-sky-400 flex items-center justify-center text-white mx-auto shadow-md shadow-blue-500/20">
            <Globe className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 font-serif">Sign in to TRAVELVERSE</h2>
          <p className="text-xs text-slate-500">Access your itineraries, e-tickets, and loyalty voyager perks</p>
        </div>

        {/* Quick Demo Logins Pill */}
        <div className="p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100 space-y-2 text-xs">
          <div className="flex items-center justify-between font-bold text-blue-900 text-[11px]">
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Instant One-Click Access:</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('traveler@travelverse.com', 'traveler123')}
              className="py-1.5 px-2 bg-white hover:bg-blue-100/60 text-slate-800 font-bold rounded-xl border border-blue-200 transition-colors text-[11px] flex items-center justify-center gap-1"
            >
              <UserCheck className="w-3 h-3 text-blue-600" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('admin@travelverse.com', 'admin123')}
              className="py-1.5 px-2 bg-amber-100/80 hover:bg-amber-200 text-amber-900 font-bold rounded-xl border border-amber-300 transition-colors text-[11px] flex items-center justify-center gap-1"
            >
              <ShieldCheck className="w-3 h-3 text-amber-600" />
              <span>Admin</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-slate-700">Password</label>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Demo password reset link simulated to your email.'); }} className="text-[11px] text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-blue-700 to-sky-600 hover:from-blue-800 hover:to-sky-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Don't have an account yet? </span>
          <Link to="/register" className="font-bold text-blue-600 hover:underline">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}

