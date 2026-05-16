import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaSearch, FaTimes, FaCloudUploadAlt, FaCheckCircle, 
  FaRocket, FaShieldAlt, FaUsers, FaArrowRight, FaBolt, 
  FaHeart, FaGlobe, FaMicrochip, FaCogs, FaHandsHelping, FaAward, FaNetworkWired
} from 'react-icons/fa';

const CareerHub = () => {
  const [filter, setFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [liveJobs, setLiveJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    fetch('http://localhost:5000/api/public/jobs')
      .then(res => res.json())
      .then(data => { setLiveJobs(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '', portfolio: '', resume: null });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const filteredJobs = liveJobs.filter(job => 
    job.title.toLowerCase().includes(filter.toLowerCase()) || 
    job.department.toLowerCase().includes(filter.toLowerCase())
  );

  const handleApplySubmit = async (e) => {
    e.preventDefault();
    if (!window.confirm("Transmit mission profile?")) return;
    setIsSubmitting(true);
    const data = new FormData();
    Object.keys(formData).forEach(key => { if(key !== 'resume') data.append(key, formData[key]); });
    data.append('jobTitle', selectedJob.title);
    if (formData.resume) data.append('resume', formData.resume);
    try {
        const res = await fetch("http://localhost:5000/api/public/apply", { method: 'POST', body: data });
        if (res.ok) { setSubmitStatus('success'); setTimeout(() => { setSubmitStatus(null); setSelectedJob(null); }, 3000); }
    } catch (err) { console.error(err); }
    setIsSubmitting(false);
  };

  return (
    <div className="font-sans text-slate-900 bg-white min-h-screen pt-24 selection:bg-purple-600 selection:text-white overflow-x-hidden flex flex-col items-center">
      
      {/* 1. HERO - CHINA SIZE (Small & Neat) */}
      <section className="w-full max-w-4xl px-6 py-12 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center">
           <span className="py-1 px-3 rounded-full bg-purple-50 text-purple-600 text-[9px] font-black tracking-widest mb-4 border border-purple-100 uppercase">Careers 2.0</span>
           <h1 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 text-slate-900 uppercase">
             Build the <span className="text-purple-600 italic">Future.</span>
           </h1>
           <div className="relative w-full max-w-sm shadow-lg rounded-xl overflow-hidden flex bg-slate-50 border border-slate-100 p-1 focus-within:ring-2 focus-within:ring-purple-200 transition-all">
              <input type="text" placeholder="Search role..." className="w-full pl-4 pr-2 py-2.5 bg-transparent outline-none text-xs font-medium" onChange={(e) => setFilter(e.target.value)} />
              <div className="pr-4 flex items-center text-purple-600"><FaSearch size={14} /></div>
           </div>
        </motion.div>
      </section>

      {/* 2. MISSION - BIG IMAGE & RICH CONTENT (Full Pack) */}
      <section className="w-full py-20 px-6 bg-white border-y border-slate-50">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                  <div className="absolute inset-0 bg-purple-600/10 rounded-[2rem] rotate-3 group-hover:rotate-0 transition-transform duration-500"></div>
                  {/* Big Image */}
                  <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=100&w=1200&auto=format&fit=crop" alt="Rich Content" className="w-full h-full object-cover rounded-[2rem] shadow-2xl relative z-10" />
              </div>
              <div className="text-left space-y-8">
                  <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-slate-900 leading-none">Engineering <br/><span className="text-purple-600 italic">Excellence.</span></h2>
                  {/* Rich Content - Multiple Paragraphs */}
                  <div className="space-y-6 text-slate-600 text-sm md:text-base font-medium leading-relaxed">
                    <p>Our engineering culture is built on the principles of speed and radical ownership. We don't just write code; we architect digital universes that solve real-world complexities at scale.</p>
                    <p>At Dvein, you are empowered to lead your own feature sets. From initial design patterns to global deployment, you own the entire lifecycle of the code you ship to millions of nodes.</p>
                    <div className="grid grid-cols-1 gap-4 pt-4">
                        {[ 
                          {i: <FaMicrochip/>, t: "R&D Focus", d: "We dedicate 20% of time to future frameworks and AI research labs."},
                          {i: <FaNetworkWired/>, t: "Scalable Nodes", d: "Systems designed for 10x growth with zero performance leaks."}
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                              <div className="text-purple-600 text-xl">{item.i}</div>
                              <div><h4 className="font-bold text-xs text-slate-900 uppercase">{item.t}</h4><p className="text-[11px] text-slate-400">{item.d}</p></div>
                          </div>
                        ))}
                    </div>
                  </div>
              </div>
          </div>
      </section>

      {/* 3. DNA - KUTTY SIZE (Minimalist Cards) */}
      <section className="w-full py-20 px-6 bg-[#f8fafc] flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter mb-12 text-center">OUR DNA</h2>
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6 place-items-center">
              {[ { i: <FaBolt/>, t: "SPEED", d: "Fast execution over ego." },
                 { i: <FaShieldAlt/>, t: "TRUST", d: "Extreme transparency always." },
                 { i: <FaUsers/>, t: "OWNERSHIP", d: "You are the founder here." } ].map((v, i) => (
                  <div key={i} className="w-full max-w-[280px] p-8 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center text-center">
                      <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-lg text-purple-600 mb-6">{v.i}</div>
                      <h4 className="font-bold text-xs uppercase mb-2 tracking-widest">{v.t}</h4>
                      <p className="text-[11px] text-slate-400 font-medium">{v.d}</p>
                  </div>
              ))}
          </div>
      </section>

      {/* 4. VISION - REAL TEAM IMAGE & LARGE TEXT (Rocket Logo Removed) */}
      <section className="w-full py-24 px-6 bg-white flex flex-col items-center">
          <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="text-left">
                  {/* Large Content Size as requested */}
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-10 text-slate-900 leading-[1]">THE <span className="text-purple-600 italic">UPGRADE</span> YOU NEED.</h2>
                  <div className="space-y-8">
                      <p className="text-lg md:text-xl text-slate-500 font-bold leading-relaxed border-l-8 border-purple-100 pl-8">Join the collective that is defining the next generation of software engineering. No more boring tasks, only high-impact missions.</p>
                      <ul className="space-y-4 pt-6">
                        {['Global Remote Access', 'Hyper-Growth Maps', 'Equity Pool Access', 'Health Armor'].map((item, i) => (
                          <li key={i} className="flex items-center gap-4 text-sm font-black uppercase tracking-widest text-slate-700">
                             <FaCheckCircle className="text-purple-600" /> {item}
                          </li>
                        ))}
                      </ul>
                  </div>
              </div>
              <div className="relative">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/5 rounded-full blur-3xl"></div>
                  {/* Team Image instead of Rocket */}
                  <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=100&w=1200&auto=format&fit=crop" alt="Team Vision" className="w-full rounded-[4rem] shadow-2xl border-2 border-slate-100 grayscale hover:grayscale-0 transition-all duration-700" />
              </div>
          </div>
      </section>

      {/* 5. OPEN MISSIONS - LIST STYLE */}
      <section className="w-full py-20 px-6 bg-slate-900 flex flex-col items-center rounded-t-[3rem] md:rounded-t-[5rem] mx-4 shadow-2xl">
         <div className="max-w-3xl w-full flex flex-col items-center text-center px-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-16 text-white italic">OPEN DROPS</h2>
            <div className="grid gap-3 w-full">
               {loading ? <div className="text-slate-500 font-black tracking-widest text-[9px] animate-pulse">Scanning...</div> :
               filteredJobs.map((job) => (
                    <motion.div whileHover={{ scale: 1.01, x: 5 }} key={job._id} onClick={() => { setSelectedJob(job); setActiveTab('details'); }} className="w-full bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 hover:bg-white transition-all flex justify-between items-center group cursor-pointer text-left">
                       <div className="overflow-hidden pr-4">
                          <h3 className="text-base md:text-xl font-black text-white group-hover:text-slate-900 uppercase truncate leading-none">{job.title}</h3>
                          <p className="text-[9px] text-slate-400 group-hover:text-slate-500 font-bold uppercase tracking-widest mt-2">{job.department} • {job.location}</p>
                       </div>
                       <div className="bg-white/10 p-3 rounded-full text-white group-hover:bg-purple-600 transition-all"><FaArrowRight size={14}/></div>
                    </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. CTA - JOIN THE COLLECTIVE */}
      <section className="w-full py-24 px-4 flex flex-col items-center bg-white">
          <div className="w-full max-w-5xl relative rounded-[3rem] p-16 md:p-24 overflow-hidden bg-[#0a0f1c] text-center shadow-2xl flex flex-col items-center justify-center border border-white/5">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none"></div>
              <div className="relative z-10 flex flex-col items-center">
                  <h2 className="text-3xl md:text-6xl font-black text-white mb-6 uppercase italic tracking-tighter leading-none">JOIN THE <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">COLLECTIVE.</span></h2>
                  <a
                    href="https://wa.me/919500181230?text=Hello%20DVein%20Team,%20I%20want%20to%20join%20the%20collective!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-slate-900 px-12 py-4 rounded-full font-black text-[11px] uppercase tracking-[0.4em] hover:scale-105 transition-transform shadow-xl"
                  >Touch In Now</a>
              </div>
          </div>
      </section>

      {/* MODAL - NEAT SPLIT VIEW */}
      <AnimatePresence>
        {selectedJob && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedJob(null)} className="absolute inset-0 bg-black/80 backdrop-blur-md" />
             <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25 }} className="bg-white w-full max-w-5xl h-auto max-h-[90vh] rounded-[2.5rem] shadow-2xl relative z-20 flex flex-col md:flex-row overflow-hidden border border-slate-100">
                <div className="md:hidden flex items-center justify-between p-4 border-b">
                    <button onClick={() => setSelectedJob(null)} className="text-slate-400 p-1"><FaTimes size={18}/></button>
                    <div className="flex bg-slate-100 p-1 rounded-full scale-90">
                        <button onClick={() => setActiveTab('details')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'details' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'}`}>Mission</button>
                        <button onClick={() => setActiveTab('form')} className={`px-6 py-2 rounded-full text-[10px] font-black uppercase transition-all ${activeTab === 'form' ? 'bg-white text-purple-600 shadow-sm' : 'text-slate-400'}`}>Board</button>
                    </div>
                </div>
                <div className="flex flex-1 overflow-hidden flex-col md:flex-row">
                    <div className={`${activeTab === 'details' ? 'flex' : 'hidden md:flex'} w-full md:w-1/2 flex-col bg-slate-50 overflow-y-auto p-10 md:p-14 border-r border-slate-100 text-left`}>
                        <span className="text-purple-600 text-[10px] font-bold uppercase mb-4 block">Briefing</span>
                        <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-6 uppercase italic underline decoration-purple-600 decoration-4 underline-offset-8 leading-tight">{selectedJob.title}</h2>
                        <p className="text-slate-500 text-xs leading-relaxed font-bold border-l-4 border-purple-400 pl-6 italic uppercase tracking-tight">{selectedJob.description}</p>
                    </div>
                    <div className={`${activeTab === 'form' ? 'flex' : 'hidden md:flex'} w-full md:w-1/2 flex-col bg-white overflow-y-auto p-10 md:p-14`}>
                        {submitStatus === 'success' ? <div className="h-full flex flex-col items-center justify-center text-center animate-fadeIn"><FaCheckCircle className="text-green-500 text-7xl mb-6 animate-bounce" /><h3 className="text-2xl font-black italic tracking-tight text-slate-900 uppercase">Mission Accepted</h3></div> :
                        <form onSubmit={handleApplySubmit} className="space-y-4">
                            <h3 className="text-xl md:text-2xl font-black tracking-tight mb-8 italic border-b pb-4 uppercase text-slate-900">Boarding Pass</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <input required className="bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-purple-300 uppercase shadow-inner" placeholder="FIRST" onChange={e => setFormData({...formData, firstName: e.target.value})} />
                                <input required className="bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-purple-300 uppercase shadow-inner" placeholder="LAST" onChange={e => setFormData({...formData, lastName: e.target.value})} />
                            </div>
                            <input required type="email" className="w-full bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-purple-300 uppercase shadow-inner" placeholder="WORK EMAIL" onChange={e => setFormData({...formData, email: e.target.value})} />
                            <input required className="w-full bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-purple-300 uppercase shadow-inner" placeholder="WHATSAPP" onChange={e => setFormData({...formData, phone: e.target.value})} />
                            <input className="w-full bg-slate-50 p-4 rounded-xl text-xs font-black border-none focus:ring-1 focus:ring-purple-300 uppercase shadow-inner" placeholder="PORTFOLIO" value={formData.portfolio} onChange={e => setFormData({...formData, portfolio: e.target.value})} />
                            <label className="flex flex-col items-center justify-center p-10 bg-purple-50/20 border-2 border-dashed border-purple-100 rounded-3xl cursor-pointer hover:bg-purple-100/20 transition-all group">
                                <FaCloudUploadAlt className="text-purple-600 text-4xl mb-4 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black text-purple-600 uppercase text-center">{formData.resume ? formData.resume.name : "DROP FILE"}</span>
                                <input type="file" required onChange={e => setFormData({...formData, resume: e.target.files[0]})} className="hidden" />
                            </label>
                            <button disabled={isSubmitting} className="w-full py-5 bg-slate-900 text-white rounded-xl font-black text-xs shadow-xl uppercase tracking-[0.3em] hover:bg-black transition-colors disabled:opacity-50">{isSubmitting ? "TRANSMITTING..." : "Submit Mission"}</button>
                        </form>}
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