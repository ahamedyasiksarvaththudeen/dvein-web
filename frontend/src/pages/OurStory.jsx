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
  `DVein Innovations was not born in a boardroom. It was born in a garage.`,

  `It started with a few passionate engineers who were frustrated. Frustrated with the gap between what academia taught and what the industry demanded. Frustrated that brilliant students were graduating with degrees but no real-world engineering experience. Frustrated that the tools, mentorship, and opportunities needed to build something meaningful were locked behind expensive institutions or inaccessible networks.`,

  `So they decided to build something different.`,

  `In the early days, DVein was just a small team — a handful of engineers, designers, and thinkers who believed that great technology could come from anywhere, and that talent had no address. They set up shop with minimal resources but maximum resolve. Their lab was a mix of salvaged hardware, open-source software, and an unshakeable belief that engineering was the language of the future.`,

  `The name "DVein" came from the idea of veins — the networks that carry life through a body. They wanted to be that invisible infrastructure. The connective tissue that carries ideas, talent, and innovation through the ecosystem of technology. D for Digital. Vein for the network that runs through everything.`,

  `Their first project was a student initiative — helping final-year engineering students build projects that actually worked in the real world. Not demo projects. Not placeholder code. Real systems. Embedded hardware. Full-stack applications. IoT nodes. Production-ready code reviewed by practicing engineers.`,

  `Word spread fast. Students who went through DVein's programs started getting noticed. Companies started asking: "Where are these engineers coming from?" The team grew. The programs expanded. And the mission became clearer with every student who launched a project that changed how they saw themselves — not as a student, but as an engineer.`,

  `DVein expanded into software development — taking on real client projects, building enterprise-grade systems for startups, SMEs, and growing businesses. Every client project was treated as a dual-purpose mission: deliver great software, and give team members the opportunity to work on live production systems. This wasn't outsourcing. This was engineering with purpose.`,

  `Then came the courses. Not the typical tutorial-based, watch-and-forget online content. DVein's training programs were built around one principle: you learn by building. Every module ended not with a quiz, but with a deployment. Students didn't just learn React — they shipped a real React application. They didn't just learn about databases — they designed, built, and secured one. The curriculum was built with engineers, for engineers, by engineers who had done it themselves.`,

  `Collaborations followed. Universities, corporates, research institutions, and government programs started partnering with DVein — not just to train talent, but to co-create technology. The team built custom solutions for industries ranging from agriculture to aerospace, always staying true to their core identity: practical, precise, and production-grade.`,

  `Today, DVein Innovations operates across multiple verticals — software solutions, academy training, student project mentorship, hardware prototyping, product development, and collaborative R&D. The garage is long gone. But the spirit that built it? That's in every commit, every PCB trace, every line of code that leaves this team's hands.`,

  `We are DVein. We don't just talk about the future. We engineer it.`,
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
        <div className="space-y-8">
          {displayParagraphs.map((para, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              <p
                className={`leading-relaxed font-medium ${
                  idx === 0
                    ? 'text-2xl md:text-3xl text-indigo-700 font-bold text-center'
                    : idx === displayParagraphs.length - 1
                    ? 'text-xl md:text-2xl text-slate-900 font-extrabold text-center uppercase tracking-widest border border-indigo-100 bg-indigo-50 px-8 py-6 rounded-2xl'
                    : idx === 2
                    ? 'text-xl text-slate-700 font-bold text-center'
                    : 'text-base md:text-lg text-slate-700'
                }`}
              >
                {para}
              </p>
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
