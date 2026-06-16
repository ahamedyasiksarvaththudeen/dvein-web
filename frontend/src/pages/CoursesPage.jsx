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

const staticCourses = [
  { _id: 'sc1', title: 'Full Stack Java', tag: 'JAVA', icon: <FaLaptopCode />, color: 'from-blue-600 to-blue-800', description: 'Build enterprise-grade applications with Java, Spring Boot, and modern frontend frameworks.' },
  { _id: 'sc2', title: 'Full Stack Python', tag: 'PYTHON', icon: <FaLaptopCode />, color: 'from-slate-600 to-slate-900', description: 'Create end-to-end Python applications using Django, Flask, and data-driven backends.' },
  { _id: 'sc3', title: 'Data Science and AI', tag: 'AI', icon: <FaBrain />, color: 'from-purple-500 to-purple-800', description: 'Master machine learning, statistical modeling, and AI-driven data solutions.' },
  { _id: 'sc4', title: 'AI & Machine Learning', tag: 'ML', icon: <FaBrain />, color: 'from-indigo-500 to-cyan-700', description: 'Develop intelligent systems with deep learning, NLP, and production-ready ML pipelines.' },
  { _id: 'sc5', title: 'Data Analytics', tag: 'DATA', icon: <FaChartLine />, color: 'from-cyan-500 to-sky-700', description: 'Analyze business data, build dashboards, and derive actionable insights.' },
  { _id: 'sc6', title: 'Web Development', tag: 'WEB', icon: <FaGlobe />, color: 'from-teal-500 to-slate-700', description: 'Craft responsive web experiences with modern frontend and backend stacks.' },
  { _id: 'sc7', title: 'IOT', tag: 'IOT', icon: <FaMicrochip />, color: 'from-emerald-500 to-teal-700', description: 'Connect devices, sensors, and cloud platforms to build smart IoT systems.' },
  { _id: 'sc8', title: 'Embedded Systems', tag: 'EMBED', icon: <FaMicrochip />, color: 'from-slate-700 to-indigo-900', description: 'Design firmware, real-time systems, and embedded hardware solutions.' },
  { _id: 'sc9', title: 'Cybersecurity', tag: 'SEC', icon: <FaShieldAlt />, color: 'from-emerald-700 to-slate-900', description: 'Protect systems with security testing, threat analysis, and defense architecture.' },
  { _id: 'sc10', title: 'Big Data Analytics', tag: 'BIG', icon: <FaChartLine />, color: 'from-blue-700 to-slate-900', description: 'Process large-scale datasets with big data frameworks and practical analytics workflows.' },
  { _id: 'sc11', title: 'Human Resources', tag: 'HR', icon: <FaUsers />, color: 'from-violet-600 to-fuchsia-700', description: 'Learn HR operations, talent management, and workforce analytics for modern organizations.' },
  { _id: 'sc12', title: 'Digital Marketing', tag: 'MARKET', icon: <FaBolt />, color: 'from-pink-600 to-rose-700', description: 'Execute performance marketing, social media campaigns, and digital growth strategies.' },
  { _id: 'sc13', title: 'Software Testing', tag: 'QA', icon: <FaCheckCircle />, color: 'from-slate-600 to-slate-900', description: 'Validate software quality with testing automation, QA frameworks, and process improvements.' },
];

const CoursesPage = () => {
  const [trainings, setTrainings] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

  // ── Enrollment Modal State ──────────────────────────────────────────────────
  const WA_NUMBER = '918667363896';
  const [enrollModal, setEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('DVein Academy — Full Program');
  const [enrollForm, setEnrollForm] = useState({ firstName: '', lastName: '', email: '', phone: '', course: '', portfolio: '' });
  const [enrollSubmitting, setEnrollSubmitting] = useState(false);
  const [enrollStatus, setEnrollStatus] = useState(null); // null | 'success'

  const [courseForm, setCourseForm] = useState({
    name: '',
    email: '',
    phone: '',
    course: staticCourses[0]?.title || '',
    portfolio: '',
    resume: null,
  });
  const [courseSubmitting, setCourseSubmitting] = useState(false);
  const [courseSuccess, setCourseSuccess] = useState(false);

  const getWhatsAppLink = (phone, title) => {
    const text = `Hello DVein team, I am interested in the ${title} program. Please share the details.`;
    return `https://wa.me/${phone.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`;
  };

  const openEnroll = (courseTitle = 'DVein Course') => {
    setSelectedCourse(courseTitle);
    setEnrollStatus(null);
    setEnrollForm({ firstName: '', lastName: '', email: '', phone: '', course: courseTitle !== 'DVein Academy — Full Program' ? courseTitle : '', portfolio: '' });
    setEnrollModal(true);
  };

  const handleEnroll = async (e) => {
    e.preventDefault();
    setEnrollSubmitting(true);

    // ── Build WhatsApp message ──
    const waText = [
      `*New Course Enrollment — DVein Innovations*`,
      ``,
      `*Selected Course:* ${enrollForm.course || selectedCourse}`,
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
      await fetch('/api/public/apply', {
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

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    setCourseSubmitting(true);

    const selected = selectedCourseItem || { title: courseForm.course, whatsappNumber: WA_NUMBER };
    const waText = [
      `*Course Application — DVein Innovations*`,
      ``,
      `*Course:* ${selected.title}`,
      `*Name:* ${courseForm.name}`,
      `*Email:* ${courseForm.email}`,
      `*Phone:* ${courseForm.phone}`,
      `*Portfolio:* ${courseForm.portfolio || 'Not provided'}`,
      `*Resume:* ${courseForm.resume?.name || 'Not provided'}`,
      ``,
      `_Sent from DVein Website_`,
    ].join('\n');

    const destination = (selected.whatsappNumber || WA_NUMBER).replace(/\D/g, '');
    window.open(`https://wa.me/${destination}?text=${encodeURIComponent(waText)}`, '_blank');

    setCourseSubmitting(false);
    setCourseSuccess(true);
  };

  useEffect(() => {
    fetch('/api/public/trainings')
      .then(res => res.json())
      .then(data => setTrainings(data.filter(item => item.category === 'course')))
      .catch(err => console.error(err));
  }, []);

  const coursesToDisplay = trainings.length > 0
    ? trainings
    : staticCourses.map(course => ({
        ...course,
        whatsappNumber: WA_NUMBER,
        contactName: `${course.title} Advisor`,
      }));

  const selectedCourseItem = coursesToDisplay.find(c => c.title === courseForm.course) || coursesToDisplay[0];

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

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight font-heading">
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
              <h3 className="font-bold text-slate-900 text-lg mb-2 font-heading">{feature.title}</h3>
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

      {/* COURSE APPLICATION FORM */}
      <section className="max-w-6xl mx-auto px-6 mb-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-slate-200 rounded-[2rem] shadow-2xl p-8 md:p-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-slate-900">Apply Now</h2>
            <p className="mt-2 text-sm text-slate-500">Fill the form — WhatsApp will open with your details ready to send.</p>
          </div>

          <form onSubmit={handleCourseSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Name *</span>
                <input
                  required
                  value={courseForm.name}
                  onChange={e => setCourseForm(p => ({ ...p, name: e.target.value }))}
                  className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="Your Name"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Email *</span>
                <input
                  type="email"
                  required
                  value={courseForm.email}
                  onChange={e => setCourseForm(p => ({ ...p, email: e.target.value }))}
                  className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="you@example.com"
                />
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Phone no *</span>
                <input
                  required
                  value={courseForm.phone}
                  onChange={e => setCourseForm(p => ({ ...p, phone: e.target.value }))}
                  className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                  placeholder="+91 98765 43210"
                />
              </label>
              <label className="block">
                <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Course *</span>
                <select
                  required
                  value={courseForm.course}
                  onChange={e => setCourseForm(p => ({ ...p, course: e.target.value }))}
                  className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                >
                  {coursesToDisplay.map(course => (
                    <option key={course._id} value={course.title}>{course.title}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Portfolio / LinkedIn / GitHub (optional)</span>
              <input
                value={courseForm.portfolio}
                onChange={e => setCourseForm(p => ({ ...p, portfolio: e.target.value }))}
                className="mt-2 w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-4 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                placeholder="https://github.com/yourname"
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">Resume (optional, PDF/DOC)</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={e => setCourseForm(p => ({ ...p, resume: e.target.files?.[0] || null }))}
                className="mt-2 w-full text-sm text-slate-700"
              />
            </label>

            <button
              type="submit"
              disabled={courseSubmitting}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-semibold text-sm hover:bg-blue-700 transition disabled:opacity-60"
            >
              {courseSubmitting ? 'Opening WhatsApp...' : 'Submit via WhatsApp'}
            </button>

            {courseSuccess && (
              <div className="rounded-2xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
                WhatsApp opened successfully. Please complete the message in WhatsApp and tap Send.
              </div>
            )}
          </form>
        </motion.div>
      </section>

      {/* FAQ */}
      <section className="max-w-4xl mx-auto px-6 mb-24">
        <h2 className="text-2xl font-bold text-center text-slate-900 mb-10 font-heading">
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
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-3xl p-12 md:p-20 bg-gradient-to-r from-indigo-900 to-slate-900 text-center shadow-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
            Ready to start your engineering journey?
          </h2>
          <p className="text-sm text-slate-300 mb-10 max-w-2xl mx-auto">
            Let's discuss your goals and activate your learning path.
          </p>
          <Link to="/training">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="px-10 py-4 rounded-xl font-medium text-sm transition flex items-center gap-3 mx-auto shadow"
              style={{ backgroundColor: '#005ff7', color: '#ffffff' }}
            >
              Join DVein Academy <FaArrowRight />
            </motion.button>
          </Link>
        </motion.div>
      </section>

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
                  <select
                    required
                    value={enrollForm.course}
                    onChange={e => setEnrollForm(p => ({...p, course: e.target.value}))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200 text-slate-700"
                  >
                    <option value="" disabled>Select a Course</option>
                    {staticCourses.map(course => (
                      <option key={course._id} value={course.title}>{course.title}</option>
                    ))}
                  </select>
                  <input placeholder="Portfolio / LinkedIn (optional)"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-200"
                    onChange={e => setEnrollForm(p => ({...p, portfolio: e.target.value}))} />
                  <button
                    type="submit"
                    disabled={enrollSubmitting}
                    className="w-full py-3 rounded-xl font-bold text-sm text-white transition disabled:opacity-60"
                    style={{ backgroundColor: '#005ff7' }}
                  >
                    {enrollSubmitting ? 'Opening WhatsApp...' : 'Enroll via WhatsApp'}
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

export default CoursesPage;
