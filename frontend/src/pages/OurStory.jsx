import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

// Animated canvas background with circuit-board / matrix style effect
const TechieBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let width, height;

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particles
    const PARTICLE_COUNT = 120;
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.6,
      vy: (Math.random() - 0.5) * 0.6,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    // Matrix rain columns
    const FONT_SIZE = 13;
    const columns = Math.floor(window.innerWidth / FONT_SIZE);
    const drops = Array.from({ length: columns }, () => Math.random() * -100);
    const chars = '01アイウエオカキクケコサシスセソタチツテトDVEININNOVATIONS<>{}[];()=+*#@!'.split('');

    let frame = 0;

    const draw = () => {
      frame++;
      // Dark translucent overlay for trail effect
      ctx.fillStyle = 'rgba(2, 5, 15, 0.18)';
      ctx.fillRect(0, 0, width, height);

      // Matrix rain
      ctx.font = `${FONT_SIZE}px "Courier New", monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const green = Math.random() > 0.95 ? '#00ffcc' : '#0a6640';
        ctx.fillStyle = green;
        ctx.globalAlpha = 0.25;
        ctx.fillText(char, i * FONT_SIZE, drops[i] * FONT_SIZE);
        if (drops[i] * FONT_SIZE > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.35;
      }

      // Particles and connections
      ctx.globalAlpha = 1;
      particles.forEach((p, idx) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(99, 179, 255, ${p.opacity})`;
        ctx.fill();

        // Draw connections
        for (let j = idx + 1; j < particles.length; j++) {
          const q = particles[j];
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(99, 179, 255, ${0.12 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      });

      // Pulse rings (every 120 frames)
      if (frame % 120 === 0) {
        const rx = Math.random() * width;
        const ry = Math.random() * height;
        const pulseFrames = 60;
        let pf = 0;
        const drawPulse = () => {
          if (pf > pulseFrames) return;
          const r = (pf / pulseFrames) * 100;
          const alpha = 0.4 * (1 - pf / pulseFrames);
          ctx.beginPath();
          ctx.arc(rx, ry, r, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(99, 255, 200, ${alpha})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
          pf++;
          requestAnimationFrame(drawPulse);
        };
        drawPulse();
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0, background: 'linear-gradient(135deg, #020614 0%, #040d1f 50%, #010a10 100%)' }}
    />
  );
};

const storyParagraphs = [
  `Every successful company begins with a dream.\nOurs began with a belief — that technology should not just solve problems, but create possibilities for the future.\nThat belief became DVein Innovations Pvt. Ltd.\nA name built with purpose.`,

  `"D" stands for Dream, Design, and Deliver.\nBecause every innovation starts with a dream, grows through thoughtful design, and earns its value only when it is delivered with impact.`,

  `And "Vein" represents the leaf vein — the invisible network that carries life, connection, and growth.\nJust like those veins, data flows silently through the world around us. At DVein, we transform that flow into intelligence, automation, and future-ready innovation powered by AI and technology.`,

  `What started as a vision slowly became a mission.\nLong nights. Endless learning. Experiments that failed. Ideas that evolved. Projects built from scratch. Challenges that tested patience, courage, and consistency.`,

  `But through every stage, one thing remained unchanged — the determination to build something meaningful.`,

  `DVein was never created to be "just another software company."\nIt was built to become a platform where creativity meets technology, where young talents are empowered, and where innovation becomes accessible to businesses, students, and society.`,

  `From AI-driven solutions to real-time applications, from student mentoring to enterprise software development, every step of our journey reflects growth, resilience, and belief in continuous innovation.`,

  `Under the leadership of Logesh Ramamoorthy, DVein continues to move forward with a vision of creating impactful technological solutions that shape the future.`,

  `Today, DVein stands not only as a company, but as a story of ambition, passion, learning, and transformation.`,

  `A story that tells every dreamer:\nYou don't need a perfect beginning to create an extraordinary future.\nYou only need the courage to start.\nAnd this is just the beginning of the DVein journey.`,
];

const OurStory = () => {
  const { content } = useContent();
  const cms = content.ourStory;

  // Use CMS sections (paragraph text) if available, otherwise fall back to hardcoded storyParagraphs
  const displayParagraphs = (cms?.sections?.length
    ? cms.sections.map(s => s.content || s.desc || s.title || '')
    : storyParagraphs
  ).filter(Boolean);

  return (
    <div className="relative min-h-screen overflow-x-hidden ai-gradient-bg">

      {/* Back button */}
      <div className="fixed top-6 left-6 z-20">
        <Link
          to="/"
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-50 hover:border-indigo-300 transition-all shadow-sm"
        >
          <FaArrowLeft className="text-xs" /> Back to Home
        </Link>
      </div>

      {/* Main content */}
      <div className="max-w-3xl mx-auto px-6 py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="inline-block py-1.5 px-5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 font-bold tracking-[0.25em] uppercase text-xs mb-6">
            {cms?.badge || 'Our Origin'}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-black mb-6 leading-tight tracking-tight font-heading" style={{ whiteSpace: 'pre-line' }}>
            {cms?.headline || <>Our <span className="text-black">Story</span></>}
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Story paragraphs */}
        <div className="space-y-6">
          {displayParagraphs.map((para, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              {idx === 0 ? (
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl px-8 py-8 text-center shadow-lg">
                  {para.split('\n').map((line, i) => (
                    <p key={i} className={`font-bold text-white ${i === 0 ? 'text-xl md:text-2xl mb-2' : i === para.split('\n').length - 1 ? 'text-lg text-indigo-200 mt-2' : 'text-base text-indigo-100'}`}>
                      {line}
                    </p>
                  ))}
                </div>
              ) : idx === displayParagraphs.length - 1 ? (
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl px-8 py-8 text-center shadow-lg border border-indigo-500/30">
                  {para.split('\n').map((line, i) => (
                    <p key={i} className={`font-bold ${i === 0 ? 'text-indigo-400 text-sm uppercase tracking-widest mb-4' : i === 1 ? 'text-white text-lg md:text-xl mb-2' : 'text-slate-300 text-base'}`}>
                      {line}
                    </p>
                  ))}
                </div>
              ) : idx === 4 ? (
                <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl px-6 py-5">
                  <p className="text-amber-900 font-semibold text-base md:text-lg leading-relaxed">{para}</p>
                </div>
              ) : idx % 3 === 1 ? (
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl px-6 py-5">
                  <p className="text-indigo-900 font-medium text-base md:text-lg leading-relaxed whitespace-pre-line">{para}</p>
                </div>
              ) : idx % 3 === 2 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-6 py-5">
                  <p className="text-slate-700 font-medium text-base md:text-lg leading-relaxed whitespace-pre-line">{para}</p>
                </div>
              ) : (
                <div className="bg-white border border-slate-100 rounded-xl px-6 py-5 shadow-sm">
                  <p className="text-slate-700 font-medium text-base md:text-lg leading-relaxed whitespace-pre-line">{para}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer tag */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-3 bg-white border border-slate-100 shadow-sm px-8 py-4 rounded-full">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-slate-500 text-xs uppercase tracking-[0.3em] font-bold">DVein Innovations Â· Est. 2022</span>
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OurStory;
