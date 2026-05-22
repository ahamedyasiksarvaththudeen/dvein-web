import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';
import { FaXTwitter } from 'react-icons/fa6';
import { SiPython, SiDocker, SiNodedotjs, SiReact, SiGithub } from 'react-icons/si';
import logoIcon from '../assets/LOGO-ICON.png';
import logoWhite from '../assets/LOGO-WHITE-V-LIGHT-GREEN.png';

const GoogleMapsIcon = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    role="img"
    aria-hidden="true"
    focusable="false"
  >
    <path fill="#1A73E8" d="M24 2C15.2 2 8 9.1 8 17.9c0 11.9 16 28.1 16 28.1s16-16.2 16-28.1C40 9.1 32.8 2 24 2z" />
    <path fill="#34A853" d="M40 17.9c0 11.9-16 28.1-16 28.1V29.8c5.7 0 10.4-4.7 10.4-10.4 0-2.5-.9-4.8-2.4-6.6l4.4-4.4c2.3 2.5 3.6 5.8 3.6 9.5z" />
    <path fill="#FBBC04" d="M24 29.8V46S14.4 36.3 10 26.1l8.4-8.4c-.1.5-.2 1.1-.2 1.7 0 5.7 4.6 10.4 10.4 10.4z" />
    <path fill="#EA4335" d="M10 26.1C8.8 23.2 8 20.4 8 17.9c0-4.4 1.8-8.4 4.7-11.2l8.2 8.2c-1.4.9-2.3 2.4-2.5 2.8L10 26.1z" />
    <path fill="#FFFFFF" d="M24 11.8a7.6 7.6 0 1 1 0 15.2 7.6 7.6 0 0 1 0-15.2z" />
  </svg>
);

const Footer = () => {
  const { content } = useContent();
  const cms = content.footer;
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef(null);

  // Hidden admin trigger: 5 rapid clicks on the logo
  const handleLogoClick = (event) => {
    clickCountRef.current += 1;
    clearTimeout(clickTimerRef.current);
    if (clickCountRef.current >= 5) {
      event.preventDefault();
      clickCountRef.current = 0;
      navigate('/admin/login');
      return;
    }
    clickTimerRef.current = setTimeout(() => { clickCountRef.current = 0; }, 2000);
  };

  return (
    <footer className="relative bg-black text-gray-300 py-8 border-t border-dveinBlue/30">
      {/* Floating icons inside footer (transparent bubbles) */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">

          {/* Left: Logo + Social Icons — centered */}
          <div className="flex flex-col items-center gap-4 text-center">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 cursor-pointer select-none"
              aria-label="DVein Innovations home"
              onClick={handleLogoClick}
              draggable={false}
              title=""
            >
              <img src={logoIcon} alt="" className="h-14 w-14 object-contain" aria-hidden="true" draggable={false} />
              <img src={logoWhite} alt="DVein Innovations" className="h-14 w-auto object-contain" draggable={false} />
            </Link>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a
                href="https://www.facebook.com/share/1752aXvNUP/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#1877F2] hover:scale-110 transition-transform shadow-sm"
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://x.com/dveininnovation"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-gray-900 hover:scale-110 transition-transform shadow-sm"
              >
                <FaXTwitter size={14} />
              </a>
              <a
                href="https://www.instagram.com/dvein_innovations?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#E4405F] hover:scale-110 transition-transform shadow-sm"
              >
                <FaInstagram size={14} />
              </a>
              <a
                href="https://www.linkedin.com/company/dvein-innovations/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#0A66C2] hover:scale-110 transition-transform shadow-sm"
              >
                <FaLinkedinIn size={14} />
              </a>
              <a
                href="https://maps.google.com/maps?q=Alpha+City+IT+Park+Navalur+Chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-dveinGreen hover:scale-110 transition-transform shadow-sm"
                title="Get Directions"
              >
                <GoogleMapsIcon size={18} />
              </a>
            </div>
          </div>

          {/* Center: Reach Us — centered */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white text-sm font-bold mb-3 border-b border-dveinGreen inline-block pb-1 uppercase tracking-wider">Reach Us</h3>
            <div className="flex gap-3 items-start text-sm text-gray-400 justify-center">
              <FaMapMarkerAlt className="text-dveinGreen mt-1 shrink-0" />
              <span className="leading-relaxed text-center" style={{ whiteSpace: 'pre-line' }}>
                {cms?.address || 'Alpha City IT Park, No.25, OMR,\nNavalur, Chennai – 600130'}
              </span>
            </div>
          </div>

          {/* Right: Contact — click phone to call, click email to compose */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white text-sm font-bold mb-3 border-b border-dveinGreen inline-block pb-1 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href={`tel:${(cms?.phone || '+919500181230').replace(/[\s-]/g, '')}`}
                  className="flex items-center justify-center gap-2 hover:text-dveinGreen transition-colors group"
                >
                  <FaPhoneAlt className="text-dveinGreen shrink-0" />
                  <span>{cms?.phone || '+91 95001 81230'}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${cms?.email || 'info@dveininnovations.com'}`}
                  className="flex items-center justify-center gap-2 hover:text-dveinGreen transition-colors group"
                >
                  <FaEnvelope className="text-dveinGreen shrink-0" />
                  <span>{cms?.email || 'info@dveininnovations.com'}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
        {/* Floating icons (separate centered row inside footer) */}
        <div className="flex justify-center gap-3 mb-6">
          <a href="https://www.python.org/downloads/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full floating-bubble floating-icon float-1" title="Python">
            <SiPython size={18} color="#148FF4" />
          </a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full floating-bubble floating-icon float-2" title="GitHub">
            <SiGithub size={18} color="#FFFFFF" />
          </a>
          <a href="https://react.dev/learn/installation" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full floating-bubble floating-icon float-3" title="React">
            <SiReact size={18} color="#61DAFB" />
          </a>
          <a href="https://docs.docker.com/desktop/setup/install/windows-install/" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full floating-bubble floating-icon float-4" title="Docker">
            <SiDocker size={18} color="#2496ED" />
          </a>
          <a href="https://nodejs.org/en/download" target="_blank" rel="noopener noreferrer" className="w-11 h-11 flex items-center justify-center rounded-full floating-bubble floating-icon float-2" title="Node.js">
            <SiNodedotjs size={18} color="#339933" />
          </a>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {currentYear} {cms?.copyright || 'DVein Innovations. All Rights Reserved.'}</p>
          <Link to="/privacy" className="hover:text-white transition-colors mt-2 md:mt-0">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
