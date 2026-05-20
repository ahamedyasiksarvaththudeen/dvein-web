import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { SiPython, SiDocker, SiNodedotjs, SiReact, SiGithub } from 'react-icons/si';
import logo from '../assets/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0B1120] text-gray-300 py-8 border-t border-dveinBlue/30">
      {/* Floating icons inside footer (transparent bubbles) */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">

          {/* Left: Logo + Social Icons — centered */}
          <div className="flex flex-col items-center gap-4 text-center">
            <img src={logo} alt="DVein" className="h-10 w-auto object-contain" />
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
                className="w-9 h-9 flex items-center justify-center rounded-full bg-dveinGreen text-white hover:scale-110 transition-transform shadow-sm"
                title="Get Directions"
              >
                <FaMapMarkerAlt size={14} />
              </a>
            </div>
          </div>

          {/* Center: Reach Us — centered */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white text-sm font-bold mb-3 border-b border-dveinGreen inline-block pb-1 uppercase tracking-wider">Reach Us</h3>
            <div className="flex gap-3 items-start text-sm text-gray-400 justify-center">
              <FaMapMarkerAlt className="text-dveinGreen mt-1 shrink-0" />
              <span className="leading-relaxed text-center">
                Alpha City IT Park, No.25, OMR,<br />Navalur, Chennai – 600130
              </span>
            </div>
          </div>

          {/* Right: Contact — click phone to call, click email to compose */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white text-sm font-bold mb-3 border-b border-dveinGreen inline-block pb-1 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4 text-sm">
              <li>
                <a
                  href="tel:+919500181230"
                  className="flex items-center justify-center gap-2 hover:text-dveinGreen transition-colors group"
                >
                  <FaPhoneAlt className="text-dveinGreen shrink-0" />
                  <span>+91 95001 81230</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@dveininnovations.com"
                  className="flex items-center justify-center gap-2 hover:text-dveinGreen transition-colors group"
                >
                  <FaEnvelope className="text-dveinGreen shrink-0" />
                  <span>info@dveininnovations.com</span>
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
          <p>© {currentYear} DVein Innovations. All Rights Reserved.</p>
          <Link to="/privacy" className="hover:text-white transition-colors mt-2 md:mt-0">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
