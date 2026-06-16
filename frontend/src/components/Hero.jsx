import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useContent } from '../context/ContentContext';

const defaultSlides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=100&w=2070&auto=format&fit=crop",
    smallTag: "Welcome to DVein Innovations",
    title: "Empowering Innovation through Technology",
    description: "Your partner for custom software solutions and engineering training.",
    primaryBtn: "Explore Services",
    primaryLink: "/student-projects",
    secondaryBtn: "Contact Us",
    secondaryLink: "/contact"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=100&w=2070&auto=format&fit=crop",
    smallTag: "Software Solutions",
    title: "Custom Software built for Business Growth",
    description: "We build digital ecosystems. From Web and Mobile Apps to AI/ML solutions.",
    primaryBtn: "View Solutions",
    primaryLink: "/services/software",
    secondaryBtn: "Get a Quote",
    secondaryLink: "/contact"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=100&w=2070&auto=format&fit=crop",
    smallTag: "Training and Development",
    title: "Shaping Future Tech Leaders",
    description: "Industry-relevant training programs designed by experts for students.",
    primaryBtn: "View Courses",
    primaryLink: "/services/courses",
    secondaryBtn: "Apply Internship",
    secondaryLink: "/training"
  }
];

const ChevronIcon = ({ dir }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'left'
      ? <polyline points="15 18 9 12 15 6" />
      : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

const Hero = () => {
  const { content } = useContent();
  const slides = (content.hero?.slides?.length ? content.hero.slides : defaultSlides);

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => { setCurrent(0); }, [slides.length]);

  const next = useCallback(() => setCurrent(p => (p + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setCurrent(p => (p - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div
      className="relative w-full h-[85vh] md:h-[700px] overflow-hidden flex items-center pb-12 md:pb-24 font-sans bg-gray-900"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background Image Slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "linear" }}
          className="absolute inset-0 w-full h-full z-0"
        >
          <img
            src={slides[current].image}
            alt="Hero"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        </motion.div>
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-6 lg:px-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current + "-text"}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl md:pl-4"
          >
            <span className="inline-block text-white font-extrabold tracking-widest uppercase text-xs mb-6 bg-white/20 backdrop-blur-sm shadow-[0_0_20px_rgba(255,255,255,0.3)] px-4 py-2 rounded-full border border-white/30">
              {slides[current].smallTag}
            </span>
            <h1
              className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-6 font-heading drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]"
              style={{ color: '#ffffff' }}
            >
              {slides[current].title}
            </h1>
            <p className="text-lg md:text-xl text-white mb-10 leading-relaxed font-bold drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
              {slides[current].description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={slides[current].primaryLink}>
                <button className="bg-dveinBlue hover:bg-white hover:text-dveinBlue text-white px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all shadow-[0_4px_14px_0_rgba(0,118,255,0.39)] hover:-translate-y-1">
                  {slides[current].primaryBtn}
                </button>
              </Link>
              <Link to={slides[current].secondaryLink}>
                <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm transition-all hover:-translate-y-1 shadow-lg">
                  {slides[current].secondaryBtn}
                </button>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Prev / Next Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/35 border border-white/30 text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/35 border border-white/30 text-white backdrop-blur-sm transition-all hover:scale-110 active:scale-95"
          >
            <ChevronIcon dir="right" />
          </button>
        </>
      )}

      {/* Dot Indicators */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-7 h-2.5 bg-white'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      {/* Slide counter */}
      <div className="absolute top-6 right-6 z-20 text-white/60 text-xs font-bold tracking-widest">
        {String(current + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>
    </div>
  );
};

export default Hero;
