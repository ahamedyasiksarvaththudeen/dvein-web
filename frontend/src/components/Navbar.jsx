import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX, HiChevronDown } from 'react-icons/hi';
import { FaChevronRight, FaUserShield, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [desktopServiceOpen, setDesktopServiceOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminCreds, setAdminCreds] = useState({ username: '', password: '' });
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsOpen(false);
    setMobileServiceOpen(false);
    setDesktopServiceOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = (isOpen || showAdminModal) ? 'hidden' : 'unset';
  }, [isOpen, showAdminModal]);

  useEffect(() => {
    if (!desktopServiceOpen) return;
    const handleOutsideClick = (e) => {
      if (!e.target.closest('[data-services-dropdown]')) {
        setDesktopServiceOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [desktopServiceOpen]);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setAdminLoading(true);
    setAdminError('');
    try {
      const response = await fetch('http://localhost:5000/api/auth/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminCreds)
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('isAdmin', 'true');
        setShowAdminModal(false);
        navigate('/admin-dashboard');
      } else {
        setAdminError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      setAdminError('Server unavailable. Ensure backend is running.');
    } finally {
      setAdminLoading(false);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    {
      name: 'Services',
      path: '#',
      subLinks: [
        { name: 'Software Solutions', path: '/services/software' },
        { name: 'Courses & Training', path: '/services/courses' },
        { name: 'Student Projects', path: '/student-projects' },
      ]
    },
    { name: 'Internships', path: '/training' },
    { name: 'Products', path: '/products' },
    { name: 'Collaboration', path: '/collaboration' },
    { name: 'Career Hub', path: '/career-hub' },
  ];

  const sidebarVariants = {
    closed: { x: "100%", transition: { type: "spring", stiffness: 300, damping: 30 } },
    open:   { x: 0,      transition: { type: "spring", stiffness: 300, damping: 30 } }
  };

  return (
    <>
      {/* ── BLACK HEADER ── */}
      <nav className="sticky top-0 z-[60] w-full bg-black border-b border-gray-800 shadow-sm transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo — click opens hidden Admin Login */}
            <div
              className="flex-shrink-0 cursor-pointer z-[70]"
              onClick={() => { setShowAdminModal(true); setAdminError(''); setAdminCreds({ username: '', password: '' }); }}
              title=""
            >
              <img src={logo} alt="DVein" className="h-10 md:h-12 w-auto object-contain" />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-3 font-sans">
              {navLinks.map((item) => {
                if (item.subLinks) {
                  return (
                    <div key={item.name} className="relative flex items-center" data-services-dropdown="true">
                      <button
                        onClick={() => setDesktopServiceOpen((prev) => !prev)}
                        className="flex items-center gap-1.5 bg-white text-black px-4 py-2 rounded-lg font-extrabold text-[12px] uppercase tracking-wider hover:bg-gray-100 transition-colors"
                      >
                        {item.name}
                        <HiChevronDown className={`text-base transition-transform duration-200 ${desktopServiceOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {desktopServiceOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-[calc(100%+8px)] left-0 w-64 bg-white border border-gray-100 shadow-2xl rounded-xl overflow-hidden z-50"
                          >
                            {item.subLinks.map((sub) => (
                              <Link
                                key={sub.name}
                                to={sub.path}
                                onClick={() => setDesktopServiceOpen(false)}
                                className="block px-6 py-4 text-black hover:bg-gray-50 text-[11px] font-black transition-colors border-b border-gray-100 last:border-0 uppercase tracking-widest"
                              >
                                {sub.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="bg-white text-black px-4 py-2 rounded-lg font-extrabold text-[12px] uppercase tracking-wider hover:bg-gray-100 transition-colors"
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Mobile Toggle */}
            <div className="lg:hidden z-[70]">
              <button onClick={() => setIsOpen(true)} className="text-white hover:text-gray-300 p-2 bg-white/10 rounded-full transition-all">
                <HiMenuAlt3 size={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div variants={sidebarVariants} initial="closed" animate="open" exit="closed" className="absolute top-0 right-0 w-[85%] max-w-sm h-full bg-white shadow-2xl flex flex-col">

              <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50">
                <img src={logo} alt="DVein" className="h-8 w-auto" />
                <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-red-500 bg-white p-2 rounded-full shadow-sm border border-gray-200"><HiX size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto py-6 px-5 space-y-3">
                {navLinks.map((item) => (
                  <div key={item.name}>
                    {item.subLinks ? (
                      <div className="space-y-2">
                        <button
                          onClick={() => setMobileServiceOpen(!mobileServiceOpen)}
                          className="w-full flex items-center justify-between p-4 rounded-xl text-black font-extrabold hover:bg-slate-50 transition-all border border-gray-100 uppercase text-[11px] tracking-widest"
                        >
                          {item.name}
                          <HiChevronDown className={`transition-transform duration-300 ${mobileServiceOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {mobileServiceOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-4 space-y-2">
                              {item.subLinks.map((sub) => (
                                <Link key={sub.name} to={sub.path} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-xl text-black font-black hover:bg-gray-100 transition-all uppercase text-[10px] bg-gray-50/50 tracking-widest">
                                  {sub.name} <FaChevronRight size={8} />
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link to={item.path} onClick={() => setIsOpen(false)} className="flex items-center justify-between p-4 rounded-xl text-black font-extrabold hover:bg-slate-50 transition-all border border-gray-100 uppercase text-[11px] tracking-widest">
                        {item.name} <FaChevronRight size={10} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* HIDDEN ADMIN LOGIN MODAL */}
      <AnimatePresence>
        {showAdminModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowAdminModal(false); }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-8 relative"
            >
              <button
                onClick={() => setShowAdminModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
              >
                <FaTimes size={18} />
              </button>

              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-dveinBlue rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl shadow-lg">
                  <FaUserShield />
                </div>
                <h2 className="text-xl font-black text-gray-800">Admin Portal</h2>
                <p className="text-xs text-gray-400 mt-1">Authorized access only</p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Username</label>
                  <input
                    type="text"
                    required
                    value={adminCreds.username}
                    onChange={e => setAdminCreds({ ...adminCreds, username: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-dveinBlue/20 focus:border-dveinBlue transition"
                    placeholder="admin"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-wider">Password</label>
                  <input
                    type="password"
                    required
                    value={adminCreds.password}
                    onChange={e => setAdminCreds({ ...adminCreds, password: e.target.value })}
                    className="w-full border border-gray-200 bg-gray-50 p-3 rounded-xl text-sm outline-none focus:ring-2 focus:ring-dveinBlue/20 focus:border-dveinBlue transition"
                    placeholder="••••••"
                  />
                </div>

                {adminError && (
                  <p className="text-red-500 text-xs font-semibold text-center bg-red-50 py-2 px-3 rounded-lg">{adminError}</p>
                )}

                <button
                  type="submit"
                  disabled={adminLoading}
                  className="w-full bg-dveinBlue text-white py-3 rounded-xl font-bold text-sm hover:opacity-90 transition disabled:opacity-50"
                >
                  {adminLoading ? 'Verifying...' : 'Access Dashboard'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
