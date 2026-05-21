import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaUserGraduate, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const WelcomeSection = () => {
  const { content } = useContent();
  const cms = content.welcome;
  return (
    <section className="py-24 bg-white relative overflow-hidden">

      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Side: Content */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-black font-bold tracking-widest uppercase text-sm mb-2 block">
                {cms?.tagline || 'Who We Are'}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-heading leading-tight">
                {cms?.heading || <>Welcome To <span className="text-black">DVein</span> Innovations</>}
              </h2>
              <p className="text-lg text-black mb-8 leading-relaxed">
                {cms?.paragraph || "We are a dynamic team of passionate tech professionals and educators. We don't just build software; we build careers. Our mission is to bridge the gap between Industry Requirements and Academic Learning."}
              </p>

              <Link
                to={cms?.ctaLink || '/our-story'}
                className="inline-flex items-center gap-2 text-white bg-gray-900 hover:bg-dveinBlue px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-dveinBlue/30"
              >
                {cms?.ctaText || 'Read Our Story'} <FaArrowRight />
              </Link>
            </motion.div>
          </div>

          {/* Right Side: 2 Core Cards */}
          <div className="lg:w-1/2 flex flex-col gap-6">

            {/* Card 1: Software */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-l-8 border-dveinBlue relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 bg-dveinBlue/5 w-32 h-32 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 bg-dveinBlue text-white rounded-lg flex items-center justify-center text-2xl shadow-md shrink-0">
                  <FaCode />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{cms?.card1Title || 'Software Development'}</h3>
                  <p className="text-black text-sm leading-relaxed">
                    {cms?.card1Desc || 'Building scalable Web & Mobile applications, AI solutions, and Cloud infrastructure for modern businesses.'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Training */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border-l-8 border-dveinGreen relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 bg-dveinGreen/5 w-32 h-32 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
              <div className="flex items-start gap-5 relative z-10">
                <div className="w-14 h-14 bg-dveinGreen text-white rounded-lg flex items-center justify-center text-2xl shadow-md shrink-0">
                  <FaUserGraduate />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-black mb-2">{cms?.card2Title || 'Skill Development'}</h3>
                  <p className="text-black text-sm leading-relaxed">
                    {cms?.card2Desc || 'Providing hands-on internships and industry-standard training to shape the next generation of engineers.'}
                  </p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
