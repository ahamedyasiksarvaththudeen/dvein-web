import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCopy, FaCheck } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import logo from '../assets/logo.png';

const CopyItem = ({ value, icon, display }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <li className="relative group flex items-center justify-center gap-2 text-sm cursor-pointer" onClick={handleCopy}>
      <span className="text-dveinGreen shrink-0">{icon}</span>
      <span className="hover:text-dveinGreen transition-colors">{display}</span>
      <span className={`
        absolute -top-8 left-1/2 -translate-x-1/2
        text-[10px] font-bold px-2 py-1 rounded-lg shadow-md whitespace-nowrap
        transition-all duration-200
        ${copied
          ? 'bg-dveinGreen text-white opacity-100 scale-100'
          : 'bg-gray-800 text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100'
        }
      `}>
        {copied ? <span className="flex items-center gap-1"><FaCheck size={8}/> Copied!</span> : <span className="flex items-center gap-1"><FaCopy size={8}/> Copy</span>}
      </span>
    </li>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0B1120] text-gray-300 py-8 border-t border-dveinBlue/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">

          {/* Left: Logo + Social Icons — centered */}
          <div className="flex flex-col items-center gap-4 text-center">
            <img src={logo} alt="DVein" className="h-10 w-auto object-contain" />
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-white text-[#1877F2] hover:scale-110 transition-transform shadow-sm">
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

          {/* Right: Contact — centered, with copy-on-hover */}
          <div className="flex flex-col items-center text-center">
            <h3 className="text-white text-sm font-bold mb-3 border-b border-dveinGreen inline-block pb-1 uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4 text-sm">
              <CopyItem
                value="+919500181230"
                display="+91 95001 81230"
                icon={<FaPhoneAlt />}
              />
              <CopyItem
                value="info@dveininnovations.com"
                display="info@dveininnovations.com"
                icon={<FaEnvelope />}
              />
            </ul>
          </div>

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
