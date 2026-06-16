import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaGlobeAmericas, FaHandshake, FaChartLine, FaNetworkWired,
  FaBuilding, FaMicrochip, FaShieldAlt, FaDatabase,
  FaCogs, FaWhatsapp, FaInfoCircle, FaCheck
} from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

// Icon pool for frameworkNodes (cycles by index so titles stay editable)
const FW_ICONS = [<FaMicrochip />, <FaDatabase />, <FaCogs />, <FaNetworkWired />, <FaCogs />, <FaShieldAlt />];
// Accent pool for tiers
const TIER_ACCENTS = ['border-indigo-600', 'border-slate-900', 'border-indigo-400'];

const Collaborations = () => {
  const { content } = useContent();
  const cms = content?.collaborations || {};
  const cmsHero    = cms.hero           || {};
  const cmsMetrics = Array.isArray(cms.metrics)        ? cms.metrics        : [];
  const cmsTiers   = Array.isArray(cms.tiers)          ? cms.tiers          : [];
  const cmsNodes   = Array.isArray(cms.frameworkNodes) ? cms.frameworkNodes : [];
  const cmsFaqs    = Array.isArray(cms.faqs)           ? cms.faqs           : [];

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

  // All data now comes from CMS (cmsMetrics, cmsTiers, cmsNodes, cmsFaqs defined above)

  return (
    <div className="font-sans text-slate-900 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-24 pb-16">

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-10 pb-20 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={isLoaded ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-white text-indigo-600 font-medium text-xs mb-6 border border-indigo-100">
            {cmsHero.badge || 'Global Partnership Hub'}
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight font-heading">
            {cmsHero.headline || 'Building Tomorrow\'s Tech Ecosystem Together'}
          </h1>
          <p className="max-w-3xl mx-auto text-base text-slate-600 leading-relaxed font-medium mb-10">
            {cmsHero.description || ''}
          </p>
          <div className="flex justify-center gap-4">
            <button onClick={handleCollaborate} className="inline-flex items-center gap-3 bg-indigo-600 text-white px-9 py-4 rounded-xl font-semibold text-sm transition-all shadow hover:bg-indigo-700">
              <FaHandshake className="text-lg" /> {cmsHero.primaryBtn || 'Start a Collaboration'}
            </button>
          </div>
        </motion.div>
      </section>

      {/* METRICS */}
      <section className="max-w-6xl mx-auto px-6 mb-24 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {cmsMetrics.map((metric, i) => (
          <motion.div key={metric._id || i} whileHover={{ y: -5 }} className="bg-white p-8 rounded-2xl border border-slate-100 transition-all hover:shadow-lg text-center">
            <div className="text-2xl text-indigo-600 mb-4 flex justify-center">{[<FaBuilding />, <FaGlobeAmericas />, <FaHandshake />, <FaChartLine />][i % 4]}</div>
            <h3 className="font-heading text-3xl font-bold text-slate-900 mb-1">{metric.count}</h3>
            <p className="text-sm text-slate-500">{metric.label}</p>
          </motion.div>
        ))}
      </section>

      {/* VALUE PROPOSITION */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">
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
              <h3 className="font-heading text-lg font-bold text-slate-900 mb-3">{v.t}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TIERS */}
      <section className="bg-white/60 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              Collaboration Models
            </h2>
            <p className="text-sm text-slate-500">
              Flexible engagement structures tailored to your growth strategy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cmsTiers.map((tier, i) => (
              <motion.div key={tier._id || i} whileHover={{ y: -8 }} className={`bg-white p-10 rounded-2xl border-t-4 ${TIER_ACCENTS[i % TIER_ACCENTS.length]} shadow flex flex-col h-full`}>
                <h3 className="font-heading text-xl font-bold text-slate-900 mb-4">{tier.title}</h3>
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
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Our Collaboration Framework
          </h2>
          <p className="text-sm text-slate-500">
            A structured approach to building reliable global systems
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cmsNodes.map((node, i) => (
            <motion.div key={node._id || i} whileHover={{ scale: 1.02 }} className="flex gap-6 p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-lg transition">
              <div className="text-3xl text-indigo-600">{FW_ICONS[i % FW_ICONS.length]}</div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 font-heading">{node.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{node.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-white/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-2xl font-bold text-center text-slate-900 mb-10">
            Partnership FAQs
          </h2>

          <div className="space-y-4">
            {cmsFaqs.map((faq, i) => (
              <div key={faq._id || i} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-5 text-left font-medium text-slate-800"
                >
                  {faq.question || faq.q} <FaInfoCircle className="text-indigo-600" />
                </button>

                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div 
                      initial={{ height: 0 }} 
                      animate={{ height: "auto" }} 
                      exit={{ height: 0 }} 
                      className="px-5 pb-5 text-sm text-slate-600 leading-relaxed"
                    >
                      {faq.answer || faq.a}
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
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-slate-900 mb-8">
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
    </div>
  );
};

export default Collaborations;
