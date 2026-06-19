import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaUserGraduate } from 'react-icons/fa';

const CoreAreas = () => {
  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
         <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl font-heading">Our Core Areas of Expertise</h2>
            <p className="mt-4 text-lg text-gray-600">We focus on two symbiotic pillars to drive innovation and skill development.</p>
         </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Software Development */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-dveinBlue group"
          >
            <div className="w-16 h-16 bg-dveinBlue/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-dveinBlue transition-colors">
              <FaCode className="text-3xl text-dveinBlue group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Software Solutions</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              For businesses seeking efficient and modern digital solutions. We build custom software, web & mobile apps, and AI-driven systems tailored to your needs.
            </p>
          </motion.div>

          {/* Card 2: Skill Development */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border-t-4 border-dveinGreen group"
          >
            <div className="w-16 h-16 bg-dveinGreen/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-dveinGreen transition-colors">
              <FaUserGraduate className="text-3xl text-dveinGreen group-hover:text-white transition-colors" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Skill Development & Training</h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              Providing hands-on engineering courses, real-time project support, and world-class internship programs for students to become industry-ready.
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CoreAreas;
