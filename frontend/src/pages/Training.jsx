import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import { SiReact, SiPython } from 'react-icons/si';

const getIcon = (iconName) => {
  const IconComponent = FaIcons[iconName];
  return IconComponent ? <IconComponent /> : <FaIcons.FaCode />;
};

const marqueeStyle = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee { animation: marquee 30s linear infinite; }
`;

const STATIC_DATA = {
  domains: [
    { _id: 1, title: "Full Stack Mafia",   iconName: "FaLayerGroup", color: "text-blue-600",   desc: "Dominate the web. MERN Stack, Next.js, and System Design.",           skills: ["React", "Node.js", "MongoDB", "AWS"] },
    { _id: 2, title: "AI Architects",       iconName: "FaBrain",      color: "text-purple-600", desc: "Build the brain. Python, TensorFlow, LLMs, and Neural Networks.",     skills: ["Python", "PyTorch", "OpenAI API", "HuggingFace"] },
    { _id: 3, title: "Cloud Commanders",    iconName: "FaCloud",      color: "text-indigo-600", desc: "Scale to infinity. Docker, Kubernetes, Terraform, and CI/CD.",        skills: ["AWS", "Docker", "K8s", "Linux"] },
  ],
  curriculum: {
    web: [
      { _id: 1, week: "Week 1-2", title: "The Foundation",        desc: "Javascript V8 Engine internals, Async architecture, and DOM manipulation." },
      { _id: 2, week: "Week 3-5", title: "Backend Engineering",   desc: "Building scalable APIs with Node.js, Express, and Database Design patterns." },
      { _id: 3, week: "Week 6-8", title: "Frontend & Deployment", desc: "Advanced React hooks, Redux, Next.js SSR, and deploying to AWS EC2." },
    ],
    ai: [
      { _id: 1, week: "Week 1-2", title: "Python & Maths",        desc: "Advanced Python structures, NumPy, Pandas, and Linear Algebra for ML." },
      { _id: 2, week: "Week 3-5", title: "Machine Learning Ops",  desc: "Supervised Learning, Scikit-learn, and model evaluation metrics." },
      { _id: 3, week: "Week 6-8", title: "Deep Learning & LLMs", desc: "Neural Networks, Transformers, and building RAG applications." },
    ],
  },
  projects: [
    { _id: 1, title: "AI-Powered SaaS",  tag: "Full Stack", desc: "Build a subscription-based SaaS platform integrated with OpenAI API." },
    { _id: 2, title: "Crypto Exchange",   tag: "Web3",       desc: "Real-time trading engine with WebSockets and high-frequency data handling." },
    { _id: 3, title: "Autonomous Agents", tag: "AI/ML",      desc: "Create AI agents that can browse the web and perform tasks automatically." },
  ],
  faqs: [
    { _id: 1, question: "Is this beginner friendly?",        answer: "Yes, but be ready to work hard. We start from zero but move fast." },
    { _id: 2, question: "Do you provide placement support?", answer: "We have 50+ hiring partners. If you clear our assessments, we refer you directly." },
    { _id: 3, question: "What is the duration?",             answer: "The internship cohort runs for 8 weeks intense training + 4 weeks live project." },
  ],
};

const Training = () => {
  const [activeTab, setActiveTab] = useState('web');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [data, setData] = useState(STATIC_DATA);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', portfolio: '', jobTitle: 'Internship Cohort 2026'
  });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/public/training-page')
      .then(res => res.json())
      .then(apiData => { setData(apiData); })
      .catch(() => {});
  }, []);

  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'fallback'

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);
    const dataToSend = new FormData();
    Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
    if (resume) dataToSend.append('resume', resume);
    try {
      const response = await fetch('http://localhost:5000/api/public/apply', {
        method: 'POST',
        body: dataToSend,
        signal: AbortSignal.timeout(8000)
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus('success');
        setFormData({ firstName: '', lastName: '', email: '', phone: '', portfolio: '', jobTitle: 'Internship Cohort 2026' });
        setResume(null);
        e.target.reset();
      } else {
        setSubmitStatus('fallback');
      }
    } catch (err) {
      // Backend not running — show WhatsApp/email fallback
      setSubmitStatus('fallback');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-24 overflow-x-hidden selection:bg-purple-500 selection:text-white relative">
      <style>{marqueeStyle}</style>

      {/* HERO */}
      <div className="relative min-h-[70vh] flex flex-col justify-center pb-12 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-purple-100 text-purple-600 text-xs font-bold tracking-wider mb-4 shadow-sm uppercase">Engineering Excellence</span>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight text-gray-900">
              Stop Learning Syntax. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">Start Building Products.</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">Join an elite program designed by Senior Engineers. Master industry-standard tech through intense execution and real-world deployment.</p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a href="https://forms.gle/GEWGy11JyF1mBuMe6" target="_blank" rel="noopener noreferrer" className="px-8 py-3.5 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 transition-all">Apply Now</a>
              <button onClick={() => document.getElementById('domains').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-3.5 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all">Explore Tracks</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="bg-white/50 backdrop-blur-sm py-8 border-y border-white rotate-[-1deg] scale-[1.01] z-20 relative">
        <div className="animate-marquee inline-block whitespace-nowrap">
          {[1,2,3].map(i => (
            <span key={i} className="mx-10 text-gray-900 font-black text-xl uppercase tracking-tighter">
              500+ Graduates &bull; 100+ Projects &bull; 50+ Partners &bull;
            </span>
          ))}
        </div>
      </div>

      {/* DOMAINS */}
      <div id="domains" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">Choose Your Battlefield</h2>
            <p className="text-gray-500 font-medium">Focused tracks built for high-performance careers.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.domains?.map((domain, index) => (
              <motion.div key={domain._id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="bg-white/70 backdrop-blur-md border border-white/50 rounded-[2rem] p-8 hover:shadow-xl transition-all group">
                <div className={`w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center text-2xl ${domain.color} mb-6 group-hover:scale-110 transition-transform`}>{getIcon(domain.iconName)}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{domain.title}</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">{domain.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {domain.skills?.map((s, i) => <span key={i} className="px-2.5 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500 uppercase">{s}</span>)}
                </div>
                <a href="https://forms.gle/GEWGy11JyF1mBuMe6" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-purple-600 font-black text-xs uppercase tracking-widest">Apply Now <FaIcons.FaArrowRight /></a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CURRICULUM */}
      <div className="py-24 bg-[#0f172a] text-white rounded-[3rem] mx-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tight">What will you master?</h2>
              <p className="text-gray-400 mb-10 leading-relaxed font-medium">Our curriculum is engineered backward from industry hiring requirements.</p>
              <div className="flex gap-4">
                <button onClick={() => setActiveTab('web')} className={`px-6 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'web' ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10'}`}>Web Track</button>
                <button onClick={() => setActiveTab('ai')}  className={`px-8 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'ai'  ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10'}`}>AI Track</button>
              </div>
            </div>
            <div className="space-y-8">
              {data.curriculum && data.curriculum[activeTab]?.map((item, index) => (
                <div key={item._id} className="flex gap-6 group">
                  <div className="text-white/10 font-black text-3xl group-hover:text-purple-50 transition-colors">0{index + 1}</div>
                  <div>
                    <span className="text-purple-400 font-bold text-[10px] uppercase tracking-widest mb-1 block">{item.week}</span>
                    <h4 className="text-lg font-bold mb-2">{item.title}</h4>
                    <p className="text-gray-400 leading-relaxed text-xs font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* APPLICATION CTA */}
      <div id="apply-section" className="py-24 max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl border border-purple-50 text-center">
          <h2 className="text-3xl font-black mb-3">Ready to Apply?</h2>
          <p className="text-gray-400 text-sm font-medium mb-8">Fill out our application form. Our team will review and reach out to you on WhatsApp and Email within 48 hours.</p>
          <a
            href="https://forms.gle/GEWGy11JyF1mBuMe6"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-purple-600 text-white rounded-xl font-bold text-base hover:bg-purple-700 transition-all shadow-xl mb-6"
          >
            Apply Now — Fill the Form
          </a>
          <p className="text-xs text-gray-400 mb-4">Or reach us directly:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="https://wa.me/919500181230?text=Hello%20DVein%20Team!%20I%20want%20to%20apply%20for%20the%20Internship%20Cohort%202026."
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 max-w-xs mx-auto sm:mx-0 bg-green-500 text-white text-center py-2.5 px-4 rounded-lg font-bold text-sm hover:bg-green-600 transition"
            >
              📱 WhatsApp Us
            </a>
            <a
              href="mailto:info@dveininnovations.com?subject=Internship%20Application%202026"
              className="flex-1 max-w-xs mx-auto sm:mx-0 bg-dveinBlue text-white text-center py-2.5 px-4 rounded-lg font-bold text-sm hover:opacity-90 transition"
            >
              ✉️ Email Us
            </a>
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div className="py-20 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-black text-center mb-14 tracking-tight">Industry Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.projects?.map((project) => (
            <div key={project._id} className="bg-white rounded-[1.5rem] p-8 border border-gray-100 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[9px] font-black bg-purple-50 text-purple-600 px-3 py-1 rounded-full uppercase tracking-widest">Enterprise</span>
                <h3 className="text-lg font-black mt-4 mb-2">{project.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{project.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="py-20 max-w-3xl mx-auto px-6">
        <div className="space-y-3">
          {data.faqs?.map((faq, index) => (
            <div key={faq._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setActiveAccordion(activeAccordion === index ? null : index)} className="w-full flex justify-between items-center p-5 text-left font-bold text-sm text-gray-800">
                {faq.question}
                {activeAccordion === index ? <FaIcons.FaChevronUp className="text-purple-600" /> : <FaIcons.FaChevronDown className="text-gray-400" />}
              </button>
              <AnimatePresence>
                {activeAccordion === index && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="px-5 pb-5 text-gray-500 text-xs leading-relaxed overflow-hidden font-medium">
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Training;
