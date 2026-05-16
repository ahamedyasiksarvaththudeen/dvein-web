import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaLaptopCode, FaRocket, FaGlobe, FaMicrochip, FaNetworkWired, 
  FaCheckCircle, FaShieldAlt, FaUsers, FaChartLine, FaDraftingCompass, 
  FaArrowRight, FaBolt, FaChevronUp, FaChevronDown, FaAward, FaBrain, FaCogs 
} from 'react-icons/fa';

const AcademyPage = () => {
  const [trainings, setTrainings] = useState([]);
  const [activeAccordion, setActiveAccordion] = useState(null);

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
          <span className="inline-block py-1.5 px-4 rounded-full bg-white text-indigo-600 font-medium text-xs mb-6 border border-indigo-100 shadow-sm">
            Academy Hub
          </span>

          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900 leading-tight mb-6 tracking-tight">
            Master the <br />
            <span className="text-indigo-600">Engineering Stack</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base text-slate-600 leading-relaxed font-medium mb-10">
            Beyond syntax, we focus on engineering scalability. DVein Academy transforms learners into
            industry-ready engineers through production-grade simulation.
          </p>

          <div className="flex justify-center gap-4">
            <button className="bg-indigo-600 text-white px-9 py-4 rounded-xl font-medium text-sm shadow hover:bg-indigo-700 transition">
              Browse Curriculum
            </button>
            <button className="bg-white border border-slate-200 text-slate-700 px-9 py-4 rounded-xl font-medium text-sm hover:bg-slate-50 transition">
              Download Roadmap
            </button>
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

      {/* ROADMAP */}
      <section className="bg-white/60 border-y border-slate-100 py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
            Engineering Roadmap
          </h2>
          <p className="text-sm text-slate-500 mb-14">
            Structured workflow for technical growth.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {['Core Scan', 'Architecture Build', 'Live Sync', 'Global Deploy'].map((step, index) => (
              <motion.div key={index} whileHover={{ y: -6 }}>
                <div className="w-16 h-16 bg-white mx-auto rounded-xl flex items-center justify-center border border-slate-100 shadow-md mb-4">
                  <span className="text-lg font-semibold text-indigo-600">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-slate-900">
                  {step}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

          <button className="
            w-full mt-4 py-2.5
            bg-indigo-600 text-white
            rounded-lg
            font-medium text-sm
            hover:bg-indigo-700
            transition
          ">
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
            <button className="px-10 py-4 bg-white text-slate-900 rounded-xl font-medium text-sm hover:bg-slate-100 transition flex items-center gap-3 mx-auto shadow">
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

    </div>
  );
};

export default AcademyPage;
