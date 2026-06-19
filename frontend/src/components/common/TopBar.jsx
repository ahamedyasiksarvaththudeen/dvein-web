import React from 'react';
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

const TopBar = () => {
  return (
    // Dark Theme, Proper Padding, Professional Font Size
    <div className="hidden lg:flex justify-between items-center bg-[#050912] text-gray-300 py-2.5 px-6 text-xs font-medium tracking-wide border-b border-gray-800 z-50">
      
      <div className="flex items-center space-x-8">
        {/* Address */}
        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
          <FaMapMarkerAlt className="text-dveinGreen shrink-0 text-sm" />
          <span>Alpha City IT Park, No.25, OMR, Navalur, Chennai – 130</span>
        </div>
        
        {/* Email */}
        <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
          <FaEnvelope className="text-dveinGreen shrink-0 text-sm" />
          <span>info@dveininnovations.com</span>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
        <FaPhoneAlt className="text-dveinGreen shrink-0 text-sm" />
        <span>+91-9500181230</span>
      </div>

    </div>
  );
};

export default TopBar;
