import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaGlobeAmericas, FaHandshake, FaChartLine, FaNetworkWired, 
  FaBuilding, FaMicrochip, FaShieldAlt, FaDatabase, 
  FaCogs, FaWhatsapp, FaInfoCircle, FaCheck
} from 'react-icons/fa';

const Collaborations = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleCollaborate = () => {
    window.open(
      "https://wa.me/919500181230?text=Hello%20DVein%20Team,%20I%20am%20interested%20in%20a%20global%20collaboration.",
      "_blank"
    );
  };

  const globalMetrics = [
    { label: "Enterprise Partners", count: "45+", icon: <FaBuilding /> },
    { label: "Countries Served", count: "12+", icon: <FaGlobeAmericas /> },
    { label: "Joint Projects Delivered", count: "150+", icon: <FaHandshake /> },
    { label: "Uptime SLA", count: "99.9%", icon: <FaChartLine /> }
  ];

  const collaborationTiers = [
    {
      title: "Strategic Enterprise Alliance",
      desc: "A long-term partnership model designed for multinational enterprises seeking a reliable offshore technology backbone. We deliver dedicated development clusters, secure cloud infrastructure, and SLA-driven performance monitoring.",
      features: [
        "Dedicated Engineering Pods",
        "SLA-Backed Infrastructure",
        "Cross-Border Compliance",
        "Enterprise Support Desk"
      ],
      accent: "border-indigo-600"
    },
    {
      title: "R&D Innovation Partnership",
      desc: "A co-innovation framework for startups, labs, and product companies to jointly build next-gen solutions across IoT, Smart Manufacturing, AI, and Blockchain ecosystems.",
      features: [
        "Joint IP Ownership Models",
        "Rapid Prototyping Labs",
        "Secure Data Sandboxes",
        "Product Commercialization Support"
      ],
      accent: "border-slate-900"
    },
    {
      title: "Global Talent Synergy",
      desc: "A talent bridge connecting verified student innovators and industry-ready engineers with international firms for project outsourcing, hiring pipelines, and digital transformation initiatives.",
      features: [
        "Vetted Developer Network",
        "Quality Assurance Gates",
        "Structured Onboarding",
        "Cybersecurity Compliance"
      ],
      accent: "border-indigo-400"
    }
  ];

  const frameworkNodes = [
    { title: "Architecture Alignment", detail: "We align our technical standards with your enterprise architecture to ensure seamless integration and long-term scalability.", icon: <FaMicrochip /> },
    { title: "Innovation Hub Cluster", detail: "High-availability backend clusters with managed databases and global load balancing for international performance.", icon: <FaDatabase /> },
    { title: "Financial Transparency", detail: "Clear billing structures, milestone-based payouts, and automated financial audit synchronization.", icon: <FaCogs /> },
    { title: "Logistics Sync Engine", detail: "Integrated APIs for cross-border operations, supply chain tracking, and partner coordination.", icon: <FaNetworkWired /> },
    { title: "Neural Synergy Cloud", detail: "Decentralized AI processing nodes for real-time analytics and localized data intelligence.", icon: <FaCogs /> },
    { title: "Resilience Shield", detail: "Zero-trust security architecture with continuous vulnerability assessments and regulatory compliance.", icon: <FaShieldAlt /> }
  ];

  const partnershipLogs = [
    { q: "What is your typical collaboration onboarding timeline?", a: "We complete technical alignment, legal formalities, and team onboarding within 14–22 business days." },
    { q: "How do you ensure data and IP protection?", a: "All projects operate under NDAs, encrypted repositories, controlled access policies, and continuous security audits." },
    { q: "What service levels do you guarantee?", a: "We offer a 99.9% uptime SLA with proactive monitoring and 24/7 incident response." },
    { q: "Do you support long-term enterprise contracts?", a: "Yes. We specialize in multi-year enterprise agreements with flexible scaling and pricing models." }
  ];

  return (
    <div className="font-sans text-slate-900 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-24 pb-16">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-white text-indigo-600 font-medium text-xs mb-6 border border-indigo-100">
            Global Partnership Hub
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-slate-900 leading-tight mb-6 tracking-tight">
            Global Reach <span className="text-black">DVein Precision</span>
          </h1>

          <p className="max-w-3xl mx-auto text-base text-slate-600 leading-relaxed font-medium mb-10">
            DVein Innovations Pvt Ltd partners with global enterprises to design, build, and operate secure software platforms, intelligent infrastructure, and next-generation digital ecosystems. We help organizations scale faster, operate smarter, and innovate with confidence.
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleCollaborate}
              className="inline-flex items-center gap-3 bg-indigo-600 text-white px-9 py-4 rounded-xl font-semibold text-sm transition-all shadow hover:bg-indigo-700"
            >
              <FaHandshake className="text-lg" /> Start a Collaboration
            </button>
          </div>
        </motion.div>
      </section>

      {/* METRICS */}
      <section className="max-w-6xl mx-auto px-6 mb-24 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {globalMetrics.map((metric, i) => (
          <motion.div key={i} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border border-slate-100 transition-all hover:shadow-lg text-center">
            <div className="text-2xl text-indigo-600 mb-4 flex justify-center">{metric.icon}</div>
            <h3 className="text-3xl font-semibold text-slate-900 mb-1">{metric.count}</h3>
            <p className="text-sm text-slate-500">{metric.label}</p>
          </motion.div>
        ))}
      </section>

      {/* VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
            Why Global Enterprises Choose DVein
          </h2>
          <p className="text-sm text-slate-500">
            A proven partner for digital transformation and international scale
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {t:"Enterprise-Grade Security", d:"Zero-trust security models, encrypted infrastructure, and continuous vulnerability monitoring."},
            {t:"Scalable Delivery Model", d:"Modular delivery framework for rapid team expansion and predictable project timelines."},
            {t:"Transparent Governance", d:"Milestone-driven execution, real-time reporting dashboards, and clear communication."}
          ].map((v,i)=>(
            <div key={i} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900 mb-3">{v.t}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIERS */}
      <section className="bg-white/60 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
              Collaboration Models
            </h2>
            <p className="text-sm text-slate-500">
              Flexible engagement structures tailored to your growth strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collaborationTiers.map((tier, i) => (
              <motion.div key={i} whileHover={{ y: -8 }} className={`bg-white p-10 rounded-2xl border-t-4 ${tier.accent} shadow flex flex-col h-full`}>
                <h3 className="text-xl font-semibold text-slate-900 mb-4">{tier.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">{tier.desc}</p>

                <ul className="space-y-3 mb-8">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm text-slate-600">
                      <FaCheck className="text-emerald-500" /> {feat}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={handleCollaborate}
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg font-medium text-sm hover:bg-indigo-700 transition"
                >
                  Discuss This Model
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FRAMEWORK */}
      <section className="py-28 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
            Our Collaboration Framework
          </h2>
          <p className="text-sm text-slate-500">
            A structured approach to building reliable global systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {frameworkNodes.map((node, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition">
              <div className="text-3xl text-indigo-600">{node.icon}</div>
              <div>
                <h4 className="text-lg font-semibold text-slate-900 mb-2">{node.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{node.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-semibold text-center text-slate-900 mb-10">
            Partnership FAQs
          </h2>

          <div className="space-y-4">
            {partnershipLogs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-5 text-left font-medium text-slate-800"
                >
                  {faq.q} <FaInfoCircle className="text-indigo-600" />
                </button>

                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: "auto" }} 
                      exit={{ height: 0 }} 
                      className="px-5 pb-5 text-sm text-slate-600 leading-relaxed"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-8">
          Ready to build a high-impact global partnership?
        </h2>

        <p className="max-w-2xl mx-auto text-sm text-slate-600 mb-10">
          Connect with our leadership team to explore strategic alliances, R&D partnerships, and enterprise-grade delivery models.
        </p>

        <button 
          onClick={handleCollaborate}
          className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-4 rounded-xl font-medium text-sm shadow hover:bg-indigo-600 transition"
        >
          <FaWhatsapp className="text-lg" /> Contact DVein Partnerships
        </button>
      </section>
      <footer className="py-10 text-center border-t border-slate-100">
        <p className="text-xs text-slate-400">© 2026 DVein Innovations · Collaborations</p>
      </footer>
    </div>
  );
};

export default Collaborations;
