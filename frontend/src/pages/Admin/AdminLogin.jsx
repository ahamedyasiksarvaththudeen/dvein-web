import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { adminSignIn, onAuthStateChanged } from '../../lib/firebaseService';

const AdminLogin = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const redirect  = new URLSearchParams(location.search).get('redirect') || '/admin/cms';

  const [form, setForm]       = useState({ email: '', password: '' });
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw]   = useState(false);

  // If already logged in via Firebase, go straight to CMS (UI-28 fix: deps included)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) navigate(redirect, { replace: true });
    });
    return unsubscribe;
  }, [navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await adminSignIn(form.email, form.password);
      navigate(redirect, { replace: true });
    } catch (err) {
      console.error('[AdminLogin] sign-in failed:', err);
      setError('Invalid credentials. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">

      {/* ── Top accent bar ── */}
      <div className="h-1 w-full bg-gradient-to-r from-[#0056D2] via-[#00C49F] to-[#0056D2]" />

      {/* ── Main centered card ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">

          {/* Logo + brand */}
          <div className="flex flex-col items-center mb-10">
            <div className="mb-5 p-4 rounded-2xl bg-[#F0F6FF] shadow-sm">
              <img src={logo} alt="DVein Innovations" className="h-12 w-auto object-contain" />
            </div>
            <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight font-heading">
              Admin Portal
            </h1>
            <p className="text-sm text-gray-400 mt-1 font-medium">
              DVein Innovations — Content Management System
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-100/60 p-8">

            {/* Error */}
            {error && (
              <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 text-sm font-medium px-4 py-3 rounded-xl">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="shrink-0">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="admin@dveininnovations.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/25 focus:border-[#0056D2] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                  <input
                    type={showPw ? 'text' : 'password'}
                    required
                    autoComplete="current-password"
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0056D2]/25 focus:border-[#0056D2] focus:bg-white transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(p => !p)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors"
                  >
                    {showPw ? (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                        <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 bg-[#0056D2] hover:bg-[#0046B8] text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-[#0056D2]/25 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Authenticating…
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    Sign In to Admin Panel
                  </>
                )}
              </button>

            </form>

            {/* Hint */}
            <p className="text-center text-xs text-gray-300 mt-6 font-medium">
              This portal is restricted to authorized personnel only.
            </p>
          </div>

          {/* Back to site */}
          <p className="text-center text-sm text-gray-400 mt-6">
            <a href="/" className="text-[#0056D2] font-semibold hover:underline">
              ← Back to website
            </a>
          </p>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-gray-100 py-4 text-center">
        <p className="text-xs text-gray-300">© {new Date().getFullYear()} DVein Innovations. Admin Portal v2.0</p>
      </div>
    </div>
  );
};

export default AdminLogin;
