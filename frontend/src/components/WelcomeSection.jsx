import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode, FaUserGraduate, FaArrowRight, FaTimes } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const storyParagraphs = [
  {
    type: 'opener',
    text: `Every successful company begins with a dream.\nOurs began with a belief — that technology should not just solve problems, but create possibilities for the future.\nThat belief became DVein Innovations Pvt. Ltd.\nA name built with purpose.`,
  },
  {
    type: 'indigo',
    text: `"D" stands for Dream, Design, and Deliver.\nBecause every innovation starts with a dream, grows through thoughtful design, and earns its value only when it is delivered with impact.`,
  },
  {
    type: 'default',
    text: `And "Vein" represents the leaf vein — the invisible network that carries life, connection, and growth.\nJust like those veins, data flows silently through the world around us. At DVein, we transform that flow into intelligence, automation, and future-ready innovation powered by AI and technology.`,
  },
  {
    type: 'slate',
    text: `What started as a vision slowly became a mission.\nLong nights. Endless learning. Experiments that failed. Ideas that evolved. Projects built from scratch. Challenges that tested patience, courage, and consistency.`,
  },
  {
    type: 'amber',
    text: `But through every stage, one thing remained unchanged — the determination to build something meaningful.`,
  },
  {
    type: 'indigo',
    text: `DVein was never created to be "just another software company."\nIt was built to become a platform where creativity meets technology, where young talents are empowered, and where innovation becomes accessible to businesses, students, and society.`,
  },
  {
    type: 'default',
    text: `From AI-driven solutions to real-time applications, from student mentoring to enterprise software development, every step of our journey reflects growth, resilience, and belief in continuous innovation.`,
  },
  {
    type: 'slate',
    text: `Under the leadership of Logesh Ramamoorthy, DVein continues to move forward with a vision of creating impactful technological solutions that shape the future.`,
  },
  {
    type: 'default',
    text: `Today, DVein stands not only as a company, but as a story of ambition, passion, learning, and transformation.`,
  },
  {
    type: 'closer',
    text: `A story that tells every dreamer:\nYou don't need a perfect beginning to create an extraordinary future.\nYou only need the courage to start.\nAnd this is just the beginning of the DVein journey.`,
  },
];

const StoryModal = ({ onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
    onClick={e => { if (e.target === e.currentTarget) onClose(); }}
  >
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94, y: 24 }}
      transition={{ duration: 0.35 }}
      className="bg-white rounded-3xl w-full max-w-2xl max-h-[88vh] overflow-hidden shadow-2xl flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 shrink-0">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-500 mb-0.5">DVein Innovations</p>
          <h2 className="text-xl font-extrabold text-slate-900 leading-tight">Our Story</h2>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>

      {/* Scrollable body */}
      <div className="overflow-y-auto px-8 py-6 space-y-4 flex-1">
        {storyParagraphs.map((para, idx) => {
          if (para.type === 'opener') return (
            <div key={idx} className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl px-7 py-7 text-center">
              {para.text.split('\n').map((line, i) => (
                <p key={i} className={`font-bold text-white ${i === 0 ? 'text-lg mb-1' : i <= 1 ? 'text-sm text-indigo-200' : 'text-base text-indigo-100 mt-1'}`}>{line}</p>
              ))}
            </div>
          );
          if (para.type === 'closer') return (
            <div key={idx} className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl px-7 py-7 text-center border border-indigo-500/30">
              {para.text.split('\n').map((line, i) => (
                <p key={i} className={`font-semibold ${i === 0 ? 'text-indigo-400 text-xs uppercase tracking-widest mb-3' : i === 1 ? 'text-white text-base mb-1' : 'text-slate-400 text-sm'}`}>{line}</p>
              ))}
            </div>
          );
          if (para.type === 'amber') return (
            <div key={idx} className="bg-amber-50 border-l-4 border-amber-400 rounded-xl px-5 py-4">
              <p className="text-amber-900 font-semibold text-sm leading-relaxed">{para.text}</p>
            </div>
          );
          if (para.type === 'indigo') return (
            <div key={idx} className="bg-indigo-50 border border-indigo-100 rounded-xl px-5 py-4">
              <p className="text-indigo-900 font-medium text-sm leading-relaxed whitespace-pre-line">{para.text}</p>
            </div>
          );
          if (para.type === 'slate') return (
            <div key={idx} className="bg-slate-50 border border-slate-200 rounded-xl px-5 py-4">
              <p className="text-slate-700 font-medium text-sm leading-relaxed whitespace-pre-line">{para.text}</p>
            </div>
          );
          return (
            <div key={idx} className="bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm">
              <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-line">{para.text}</p>
            </div>
          );
        })}

        {/* Footer tag */}
        <div className="text-center pt-2 pb-4">
          <div className="inline-flex items-center gap-3 bg-slate-50 border border-slate-100 px-6 py-3 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-slate-400 text-[10px] uppercase tracking-[0.3em] font-bold">DVein Innovations - 2022</span>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          </div>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

const WelcomeSection = () => {
  const { content } = useContent();
  const cms = content.welcome;
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <>
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

                <button
                  onClick={() => setStoryOpen(true)}
                  className="inline-flex items-center gap-2 text-white bg-gray-900 hover:bg-dveinBlue px-8 py-3 rounded-lg font-medium transition-all shadow-lg hover:shadow-dveinBlue/30"
                >
                  {cms?.ctaText || 'Read Our Story'} <FaArrowRight />
                </button>
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

      {/* Story Modal */}
      <AnimatePresence>
        {storyOpen && <StoryModal onClose={() => setStoryOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default WelcomeSection;
