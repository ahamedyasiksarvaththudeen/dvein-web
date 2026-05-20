import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaTimes, FaCloudUploadAlt, FaCheckCircle,
  FaArrowRight, FaBolt,
  FaShieldAlt, FaUsers, FaMicrochip, FaNetworkWired
} from 'react-icons/fa';

const WA_CAREER = '918667363896';

const dnaDots = [
  { icon: <FaBolt />,      label: 'SPEED',     desc: 'Fast execution over ego.',          color: 'bg-indigo-600' },
  { icon: <FaShieldAlt />, label: 'TRUST',     desc: 'Extreme transparency always.',      color: 'bg-violet-600' },
  { icon: <FaUsers />,     label: 'OWNERSHIP', desc: 'You are the founder here.',         color: 'bg-blue-600'   },
];

const CareerHub = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [liveJobs, setLiveJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const dnaRef = useRef(null);
  const dnaInView = useInView(dnaRef, { once: true, margin: '-80px' });

  useEffect(() => {
    fetch('http://localhost:5000/api/public/jobs')
      .then(res => res.json())
      .then(data => { setLiveJobs(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', portfolio: '', resume: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const waText = [
      '*Job Application — DVein Innovations*', '',
      `*Role:* ${selectedJob.title}`,
      `*Name:* ${formData.firstName} ${formData.lastName}`,
      `*Email:* ${formData.email}`,
      `*Phone:* ${formData.phone}`,
      `*Portfolio:* ${formData.portfolio || 'Not provided'}`, '',
      '_Sent from DVein Career Hub_',
    ].join('\n');
    try {
      const data = new FormData();
      Object.keys(formData).forEach(key => { if (key !== 'resume') data.append(key, formData[key]); });
      data.append('jobTitle', selectedJob.title);
      if (formData.resume) data.append('resume', formData.resume);
      await fetch('http://localhost:5000/api/public/apply', { method: 'POST', body: data, signal: AbortSignal.timeout(5000) });
    } catch (_) {}
    window.open('https://wa.me/' + WA_CAREER + '?text=' + encodeURIComponent(waText), '_blank');
    setSubmitStatus('success');
    setTimeout(() => { setSubmitStatus(null); setSelectedJob(null); }, 4000);
    setIsSubmitting(false);
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen pt-24 selection:bg-purple-600 selection:text-white overflow-x-hidden flex flex-col items-center">

      {/* 1. HERO - simple header */}
      <section className="w-full max-w-5xl px-6 py-12 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center w-full">
          <span className="py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-[9px] font-black tracking-widest mb-6 border border-purple-100 uppercase">Careers 2.0</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-black leading-none mb-4">Career Hub</h1>
          <p className="text-slate-500 text-sm font-medium max-w-xl">Join the collective defining the next generation of software engineering.</p>
        </motion.div>
      </section>

      {/* 2. MISSION */}
      <section className="w-full py-20 px-6 bg-white border-y border-slate-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-slate-100 rounded-[2rem] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
            <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=100&w=1200&auto=format&fit=crop" alt="Rich Content" className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10" />
          </div>
          <div className="text-left space-y-8">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-black leading-none">Engineering Excellence.</h2>
            <div className="space-y-6 text-slate-600 text-sm md:text-base font-medium leading-relaxed">
              <p>Our engineering culture is built on the principles of speed and radical ownership. We architect digital universes that solve real-world complexities at scale.</p>
              <p>At Dvein, you are empowered to lead your own feature sets. From design patterns to global deployment, you own the entire lifecycle of the code you ship.</p>
              <div className="grid grid-cols-1 gap-4 pt-4">
                {[{i: <FaMicrochip/>, t: "R&D Focus", d: "We dedicate 20% of time to future frameworks and AI research labs."}, {i: <FaNetworkWired/>, t: "Scalable Nodes", d: "Systems designed for 10x growth with zero performance leaks."}].map((item, i) => (
                  <div key={i} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <div className="text-slate-700 text-xl">{item.i}</div>
                    <div><h4 className="font-bold text-xs text-slate-900 uppercase">{item.t}</h4><p className="text-[11px] text-slate-400">{item.d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR DNA — Animated Roadmap */}
      <section
        ref={dnaRef}
        className="w-full py-24 bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 overflow-hidden flex flex-col items-center"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16 px-6"
          initial={{ opacity: 0, y: 24 }}
          animate={dnaInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-white/70 text-xs font-semibold tracking-widest uppercase mb-4">
            Who We Are
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">OUR DNA</h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="max-w-3xl w-full mx-auto px-6 hidden md:block">
          <div className="relative flex items-start justify-between gap-0">
            {/* Animated connecting line */}
            <div className="absolute top-8 left-[calc(100%/8)] right-[calc(100%/8)] h-0.5 bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-blue-500"
                initial={{ scaleX: 0 }}
                animate={dnaInView ? { scaleX: 1 } : {}}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 }}
                style={{ originX: 0 }}
              />
            </div>

            {dnaDots.map((dot, i) => (
              <motion.div
                key={i}
                className="flex flex-col items-center text-center flex-1 relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={dnaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.25 + i * 0.18 }}
              >
                <motion.div
                  className="relative mb-4"
                  whileHover={{ scale: 1.12, rotate: 3 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className={`w-16 h-16 rounded-2xl ${dot.color} flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-white/10`}>
                    {dot.icon}
                  </div>
                  {/* Number badge */}
                  <div className="absolute -top-2 left-[60%] w-5 h-5 rounded-full bg-white text-slate-900 text-[10px] font-black flex items-center justify-center shadow">
                    {i + 1}
                  </div>
                </motion.div>
                <h3 className="text-white font-black text-sm mb-1 tracking-widest uppercase">{dot.label}</h3>
                <p className="text-slate-400 text-xs leading-relaxed px-3 max-w-[140px]">{dot.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="max-w-md w-full mx-auto px-6 md:hidden">
          <div className="relative ml-8">
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 overflow-hidden">
              <motion.div
                className="w-full bg-blue-500"
                initial={{ scaleY: 0 }}
                animate={dnaInView ? { scaleY: 1 } : {}}
                transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }}
                style={{ originY: 0 }}
              />
            </div>
            {dnaDots.map((dot, i) => (
              <motion.div
                key={i}
                className="relative pl-8 pb-10 last:pb-0"
                initial={{ opacity: 0, x: -20 }}
                animate={dnaInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.13 }}
              >
                <div className={`absolute left-[-8px] top-1 w-4 h-4 rounded-full ${dot.color} ring-2 ring-white/20 shadow`} />
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${dot.color} flex items-center justify-center text-white text-lg shadow shrink-0`}>
                    {dot.icon}
                  </div>
                  <div>
                    <span className="text-white/40 text-[10px] font-bold block mb-1">STEP {i + 1}</span>
                    <h3 className="text-white font-black text-sm mb-1 uppercase tracking-widest">{dot.label}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{dot.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. VISION */}
      <section className="w-full py-24 px-6 bg-white flex flex-col items-center">
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="text-left">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 text-black leading-[1]">THE UPGRADE YOU NEED.</h2>
            <div className="space-y-8">
              <p className="text-lg md:text-xl text-slate-500 font-bold leading-relaxed border-l-8 border-slate-200 pl-8">Join the collective defining the next generation of software engineering. High-impact missions only.</p>
              <ul className="space-y-4 pt-6">
                {['Global Remote Access', 'Hyper-Growth Maps', 'Equity Pool Access', 'Health Armor'].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-slate-700">
                    <FaCheckCircle className="text-slate-700" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=100&w=1200&auto=format&fit=crop" alt="Team Vision" className="w-full rounded-[4rem] shadow-2xl border-2 border-slate-100 grayscale hover:grayscale-0 transition-all duration-700" />
          </div>
        </div>
      </section>

      {/* 5. OPEN MISSIONS */}
      <section className="w-full py-20 px-6 bg-slate-900 flex flex-col items-center rounded-t-[3rem] md:rounded-t-[5rem] mx-4 shadow-2xl">
        <div className="max-w-3xl w-full flex flex-col items-center text-center px-4">
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-white">OPEN DROPS</h2>
          <div className="grid gap-3 w-full">
            {loading ? <div className="text-slate-500 font-black tracking-widest text-[9px] animate-pulse">Scanning...</div> :
            liveJobs.map((job) => (
              <motion.div whileHover={{ scale: 1.01, x: 5 }} key={job._id} onClick={() => { setSelectedJob(job); setActiveTab('details'); }} className="w-full bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 hover:bg-white transition-all flex justify-between items-center group cursor-pointer text-left">
                <div className="overflow-hidden pr-4">
                  <h3 className="text-base md:text-xl font-black text-white group-hover:text-slate-900 uppercase truncate leading-none">{job.title}</h3>
                  <p className="text-[9px] text-slate-400 group-hover:text-slate-500 font-bold uppercase tracking-widest mt-2">{job.department} • {job.location}</p>
                </div>
                <div className="bg-white/10 p-3 rounded-full text-white group-hover:bg-slate-900 transition-all"><FaArrowRight size={14}/></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CTA */}
      <section className="w-full py-24 px-4 flex flex-col items-center bg-white">
        <div className="w-full max-w-5xl relative rounded-[3rem] p-16 md:p-24 overflow-hidden bg-[#0a0f1c] text-center shadow-2xl flex flex-col items-center justify-center border border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-none">JOIN THE COLLECTIVE.</h2>
            <button onClick={() => window.open('https://wa.me/' + WA_CAREER + '?text=' + encodeURIComponent('Hello DVein Team, I want to join the collective!'), '_blank')} className="bg-white text-slate-900 px-12 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:scale-105 transition-transform shadow-xl">Touch In Now</button>
          </div>
        </div>
      </section>

      {/* MODAL */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} className="bg-white w-full max-w-5xl h-auto max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-20 flex flex-col md:flex-row overflow-hidden border border-slate-100">
              <div className="md:hidden flex items-center justify-between p-4 border-b">
                <button onClick={() => setSelectedJob(null)} className="text-slate-400 p-1"><FaTimes size={18}/></button>
                <div className="flex bg-slate-100 p-1 rounded-full scale-90">
                  <button onClick={() => setActiveTab('details')} className={'px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ' + (activeTab === 'details' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400')}>Mission</button>
                  <button onClick={() => setActiveTab('form')} className={'px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ' + (activeTab === 'form' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400')}>Board</button>
                </div>
              </div>
              <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                <div className={(activeTab === 'details' ? 'flex' : 'hidden md:flex') + ' w-full md:w-1/2 flex-col bg-slate-50 overflow-y-auto p-10 md:p-14 border-r border-slate-100 text-left'}>
                  <span className="text-slate-500 text-[10px] font-bold uppercase mb-4 block">Briefing</span>
                  <h2 className="text-2xl md:text-3xl font-black text-black mb-6 uppercase underline decoration-slate-400 decoration-4 underline-offset-8 leading-tight">{selectedJob.title}</h2>
                  <p className="text-slate-500 text-xs leading-relaxed font-bold border-l-4 border-slate-300 pl-6 uppercase tracking-tight">{selectedJob.description}</p>
                </div>
                <div className={(activeTab === 'form' ? 'flex' : 'hidden md:flex') + ' w-full md:w-1/2 flex-col bg-white overflow-y-auto p-10 md:p-14'}>
                  {submitStatus === 'success' ? (
                    <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn">
                      <FaCheckCircle className="text-green-500 text-7xl mb-6 animate-bounce" />
                      <h3 className="text-2xl font-black tracking-tight text-black uppercase">WhatsApp Opened!</h3>
                      <p className="text-slate-500 text-xs mt-3 font-bold uppercase">Tap Send in WhatsApp to complete</p>
                    </div>
                  ) : (
                  <form onSubmit={handleApplySubmit} className="space-y-4">
                    <h3 className="text-xl md:text-2xl font-black tracking-tight mb-8 border-b pb-4 uppercase text-black">Boarding Pass</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <input required className="bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="FIRST" onChange={e => setFormData({...formData, firstName: e.target.value})} />
                      <input required className="bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="LAST" onChange={e => setFormData({...formData, lastName: e.target.value})} />
                    </div>
                    <input required type="email" className="w-full bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="WORK EMAIL" onChange={e => setFormData({...formData, email: e.target.value})} />
                    <input required className="w-full bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="WHATSAPP" onChange={e => setFormData({...formData, phone: e.target.value})} />
                    <input className="w-full bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-slate-300 uppercase shadow-inner" placeholder="PORTFOLIO" value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} />
                    <label className="flex flex-col items-center justify-center p-10 bg-slate-50 border-2 border-dashed border-slate-200 rounded-3xl cursor-pointer hover:bg-slate-100 transition-all group">
                      <FaCloudUploadAlt className="text-slate-500 text-4xl mb-4 group-hover:scale-110 transition-transform" />
                      <span className="text-[10px] font-black text-slate-500 uppercase text-center">{formData.resume ? formData.resume.name : 'DROP FILE'}</span>
                      <input type="file" onChange={e => setFormData({...formData, resume: e.target.files[0]})} className="hidden" />
                    </label>
                    <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-black transition-all disabled:opacity-50">
                      {isSubmitting ? 'Opening WhatsApp...' : 'Apply via WhatsApp'}
                    </button>
                  </form>
                  )}
                </div>
              </div>
            </motion.div>
        </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CareerHub;
