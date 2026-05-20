import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaLaptopCode, FaRocket, FaGlobe, FaMicrochip, FaNetworkWired,
  FaCheckCircle, FaShieldAlt, FaUsers, FaChartLine, FaDraftingCompass,
  FaArrowRight, FaBolt, FaChevronUp, FaChevronDown, FaAward, FaBrain, FaCogs,
  FaSearch, FaLayerGroup, FaSyncAlt, FaCloudUploadAlt
} from 'react-icons/fa';
import AnimatedRoadmap from '../components/AnimatedRoadmap';
import '../styles/software-solutions.css';

const AcademyPage = () => {
  const [trainings, setTrainings] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  // ── Enrollment Modal State ──────────────────────────────────────────────────
  const WA_NUMBER = '918667363896';
  const [enrollModal, setEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [enrollForm, setEnrollForm] = useState({ firstName: '', lastName: '', email: '', phone: '', portfolio: '' });
  const [enrollSubmitting, setEnrollSubmitting] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState(null); // null | 'success'

  const openEnroll = (courseTitle = 'DVein Course') => {
    setSelectedCourse(courseTitle);
    setEnrollStatus(null);
    setEnrollForm({ firstName: '', lastName: '', email: '', phone: '', portfolio: '' });
    setEnrollModal(true);
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    setEnrollSubmitting(true);

    // ── Build WhatsApp message ──
    const waText = [
      `*New Course Enrollment — DVein Innovations*`,
      ``,
      `*Course:* ${selectedCourse}`,
      `*Name:* ${enrollForm.firstName} ${enrollForm.lastName}`,
      `*Email:* ${enrollForm.email}`,
      `*Phone:* ${enrollForm.phone}`,
      `*Portfolio:* ${enrollForm.portfolio || 'Not provided'}`,
      ``,
      `_Sent from DVein Website_`,
    ].join('\n');

    // ── Save to backend silently ──
    try {
      const data = new FormData();
      Object.entries(enrollForm).forEach(([k, v]) => data.append(k, v));
      data.append('jobTitle', selectedCourse);
      await fetch('http://localhost:5000/api/public/apply', {
        method: 'POST',
        body: data,
        signal: AbortSignal.timeout(5000),
      });
    } catch (_) { /* silent */ }

    // ── Open WhatsApp ──
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');

    setEnrollStatus('success');
    setEnrollSubmitting(false);
  };

  useEffect(() => {
    fetch('http://localhost:5000/api/public/trainings')
      .then(res => res.json())
      .then(data => setTrainings(data.filter(item => item.category === 'course')))
      .catch(err => console.error(err));
  }, []);

  const features = [
    { icon: <FaBolt />, title: "PR-Driven Learning", desc: "Real production workflows with architectural feedback from senior engineers." },
    { icon: <FaShieldAlt />, title: "Security First", desc: "OWASP standards and secure database architecture from day one." },
    { icon: <FaUsers />, title: "Collective Sync", desc: "Daily collaboration with high-performance engineering teams." },
    { icon: <FaChartLine />, title: "Growth Maps", desc: "Structured career tracks to accelerate seniority." },
  ];

  const faqs = [
    { question: "Is this for absolute beginners?", answer: "We start with fundamentals and scale into real engineering workflows." },
    { question: "Do I get to work on real projects?", answer: "Top performers join live production builds and client simulations." },
    { question: "What about certificate validation?", answer: "All certifications are ledger-verified and globally shareable." },
  ];

  return (
    <div className="font-sans text-slate-900 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-24 pb-16">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 font-extrabold tracking-widest uppercase text-[10px] mb-8 border border-indigo-100">
            Academy Hub
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 leading-tight mb-6 tracking-tight">
            Master the <br />
            <span className="text-black">Engineering Stack</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base text-slate-600 leading-relaxed font-medium mb-10">
            Beyond syntax, we focus on engineering scalability. DVein Academy transforms learners into
            industry-ready engineers through production-grade simulation.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => openEnroll('DVein Academy — Full Program')}
              className="text-white px-9 py-4 rounded-xl font-medium text-sm shadow transition" style={{ backgroundColor: '#005ff7' }}
            >
              Enroll Now
            </button>
            <a
              href="/DVein_Roadmap_LightTheme_removed.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-slate-200 text-slate-700 px-9 py-4 rounded-xl font-medium text-sm hover:bg-slate-50 transition"
            >
              Download Roadmap
            </a>
          </div>
        </motion.div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -6 }} 
              className="bg-white/70 backdrop-blur-xl p-8 rounded-2xl border border-white shadow-md hover:shadow-xl transition-all text-center"
            >
              <div className="text-3xl text-indigo-600 mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-slate-900 text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ANIMATED ROADMAP */}
      <AnimatedRoadmap
        title="Engineering Roadmap"
        subtitle="Structured workflow for technical growth — from fundamentals to global deployment."
        accent="bg-indigo-500"
        steps={[
          { icon: <FaSearch />,          label: 'Core Scan',          desc: 'Deep assessment of your skills and career goals to align the learning path.', color: 'bg-indigo-600' },
          { icon: <FaLayerGroup />,      label: 'Architecture Build', desc: 'Hands-on architecture design, system thinking, and production patterns.', color: 'bg-purple-600' },
          { icon: <FaSyncAlt />,         label: 'Live Sync',          desc: 'Real-time collaboration with engineering teams on live production builds.', color: 'bg-blue-600' },
          { icon: <FaCloudUploadAlt />,  label: 'Global Deploy',      desc: 'Ship globally-certified projects and receive your ledger-verified credential.', color: 'bg-cyan-600' },
        ]}
      />

      {/* PROGRAM GRID – ENTERPRISE STYLE */}
<section className="max-w-7xl mx-auto px-6 mb-28">
  <div className="text-center mb-14">
    <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-2">
      Active Programs
    </h2>
    <p className="text-sm text-slate-500">
      Industry-aligned technical programs
    </p>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {trainings.map((course) => (
      <motion.div
        key={course._id}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.25 }}
        className="
          bg-white
          border border-slate-200
          rounded-xl
          shadow-sm hover:shadow-md
          overflow-hidden
          flex flex-col
        "
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden bg-slate-100">
          <img
            src={course.image || "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"}
            className="w-full h-full object-cover"
            alt=""
          />

          {/* Badge */}
          <div className="absolute top-3 left-3 bg-slate-900 text-white px-3 py-1 rounded-md text-[11px] font-medium">
            {course.tag || "PRO"}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col h-full">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            {course.title}
          </h3>

          <p className="text-sm text-slate-600 leading-relaxed mb-4">
            {course.description ||
              "Production-grade program focused on real-world engineering practices, scalable systems, and collaborative workflows."}
          </p>

          <div className="flex items-center gap-2 text-indigo-600 text-sm font-medium mt-auto">
            <FaCheckCircle className="text-indigo-500" /> Active Program
          </div>

          <button
            onClick={() => openEnroll(course.title)}
            className="w-full mt-4 py-2.5 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition block text-center"
          >
            Enroll Now
          </button>
        </div>
      </motion.div>
    ))}
  </div>
</section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <h2 className="text-2xl font-semibold text-center text-slate-900 mb-10">
          Academy FAQs
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-100 shadow-md overflow-hidden">
              <button
                onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left font-medium text-slate-800 hover:bg-slate-50 transition"
              >
                {faq.question}
                {activeAccordion === index ? 
                  <FaChevronUp className="text-indigo-600" /> : 
                  <FaChevronDown className="text-slate-300" />
                }
              </button>

              <AnimatePresence>
                {activeAccordion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-slate-50 px-5 pb-5 text-sm text-slate-600 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 mb-20">
        <div className="rounded-3xl p-12 md:p-20 bg-gradient-to-r from-indigo-900 to-slate-900 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">
            Ready to start your engineering journey?
          </h2>
          <p className="text-sm text-slate-300 mb-10 max-w-2xl mx-auto">
            Let’s discuss your goals and activate your learning path.
          </p>
          <Link to="/training">
            <button
              className="px-10 py-4 rounded-xl font-medium text-sm transition flex items-center gap-3 mx-auto shadow"
              style={{ backgroundColor: '#005ff7', color: '#ffffff' }}
            >
              Join DVein Academy <FaArrowRight />
            </button>
          </Link>
        </div>
      </section>

      <footer className="py-12 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">
          © 2026 DVein Innovations · Academy Division
        </p>
      </footer>

      {/* ── Enrollment Modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {enrollModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={e => { if (e.target === e.currentTarget) setEnrollModal(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-[2rem] p-8 md:p-10 w-full max-w-lg shadow-2xl relative overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-600 to-purple-500" />

              {/* Close */}
              <button
                onClick={() => setEnrollModal(false)}
                className="absolute top-5 right-5 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200 transition text-sm font-bold"
              >✕</button>

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Enroll in Course</h3>
                <p className="text-sm text-slate-500 mt-1">{selectedCourse}</p>
              </div>

              {/* Success */}
              {enrollStatus === 'success' ? (
                <div className="flex flex-col items-center gap-4 py-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-5xl">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="40" height="40"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">WhatsApp Opened!</h3>
                  <p className="text-slate-500 text-sm">Tap <strong>Send</strong> in WhatsApp to complete your enrollment.</p>
                  <button onClick={() => setEnrollModal(false)} className="mt-4 text-xs text-indigo-600 underline">Close</button>
                </div>
              ) : (
                <form onSubmit={handleEnroll} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="First Name"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 w-full"
                      onChange={e => setEnrollForm(p => ({...p, firstName: e.target.value}))} />
                    <input required placeholder="Last Name"
                      className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 w-full"
                      onChange={e => setEnrollForm(p => ({...p, lastName: e.target.value}))} />
                  </div>
                  <input required type="email" placeholder="Email Address"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                    onChange={e => setEnrollForm(p => ({...p, email: e.target.value}))} />
                  <input required placeholder="Phone / WhatsApp"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                    onChange={e => setEnrollForm(p => ({...p, phone: e.target.value}))} />
                  <input placeholder="Portfolio / LinkedIn (optional)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                    onChange={e => setEnrollForm(p => ({...p, portfolio: e.target.value}))} />
                  <button type="submit" disabled={enrollSubmitting}
                    className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition flex items-center justify-center gap-2 disabled:opacity-60">
                    {enrollSubmitting ? 'Opening WhatsApp...' : (
                      <><svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg> Enroll via WhatsApp</>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AcademyPage;
