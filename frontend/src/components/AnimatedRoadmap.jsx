import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

/**
 * AnimatedRoadmap — a professional animated step-by-step roadmap.
 * Props:
 *   title    — section heading
 *   subtitle — section subheading
 *   steps    — array of { icon, label, desc, color }
 *   accent   — tailwind color class for connectors (default "bg-indigo-500")
 */
const AnimatedRoadmap = ({ title, subtitle, steps, accent = 'bg-indigo-500' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-white/70 text-xs font-semibold tracking-widest uppercase mb-4">
            Roadmap
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">{title}</h2>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">{subtitle}</p>
        </motion.div>
      </div>

      {/* Desktop: horizontal timeline */}
      <div className="max-w-7xl mx-auto px-6 hidden md:block">
        <div className="relative flex items-start justify-between gap-0">
          {/* Animated connecting line */}
          <div className="absolute top-8 left-[calc(100%/10)] right-[calc(100%/10)] h-0.5 bg-white/10 overflow-hidden">
            <motion.div
              className={`h-full ${accent}`}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.3 }}
              style={{ originX: 0 }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center flex-1 relative z-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.15 }}
            >
              {/* Step circle */}
              <motion.div
                className={`w-16 h-16 rounded-2xl ${step.color || 'bg-indigo-600'} flex items-center justify-center text-white text-2xl shadow-lg mb-4 ring-4 ring-white/10`}
                whileHover={{ scale: 1.12, rotate: 3 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {step.icon}
              </motion.div>

              {/* Step number badge */}
              <div className="absolute -top-2 -right-2 md:right-auto md:left-[60%] w-5 h-5 rounded-full bg-white text-slate-900 text-[10px] font-black flex items-center justify-center shadow">
                {i + 1}
              </div>

              <h3 className="text-white font-bold text-sm mb-2 leading-snug px-2">{step.label}</h3>
              <p className="text-slate-400 text-xs leading-relaxed px-3 max-w-[160px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="max-w-md mx-auto px-6 md:hidden">
        <div className="relative ml-8">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 overflow-hidden">
            <motion.div
              className={`w-full ${accent}`}
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
              style={{ originY: 0 }}
            />
          </div>

          {steps.map((step, i) => (
            <motion.div
              key={i}
              className="relative pl-8 pb-10 last:pb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.13 }}
            >
              {/* Dot on line */}
              <div className={`absolute left-[-8px] top-1 w-4 h-4 rounded-full ${step.color || 'bg-indigo-600'} ring-2 ring-white/20 shadow`} />

              <div className="flex items-start gap-4">
                <div className={`w-11 h-11 rounded-xl ${step.color || 'bg-indigo-600'} flex items-center justify-center text-white text-lg shadow shrink-0`}>
                  {step.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white/40 text-[10px] font-bold">STEP {i + 1}</span>
                  </div>
                  <h3 className="text-white font-bold text-sm mb-1">{step.label}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedRoadmap;
