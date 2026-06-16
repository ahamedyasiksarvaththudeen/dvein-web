import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaTimes, FaCloudUploadAlt, FaCheckCircle,
  FaArrowRight, FaBolt,
  FaShieldAlt, FaUsers, FaMicrochip, FaNetworkWired
} from 'react-icons/fa';
import clientImg from '../assets/client-img.jpg';
import dveinLogo from '../assets/logo.png';
import studentsImg from '../assets/students-img.jpeg';
import img2Src from '../assets/img2.jpeg';
import img3Src from '../assets/img3.jpeg';
import vid1Src from '../assets/vid1.mp4';
import vid2Src from '../assets/vid2.mp4';
import { useContent } from '../context/ContentContext';

// Panel local assets for CMS image resolution
const panelAssets = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
const resolvePanel = (img) => {
  if (!img) return '';
  if (/^(data:|https?:|\/)/.test(img)) return img;
  return panelAssets[`../assets/${img}`] || img;
};

// DNA dot icon pool (icons cycle by index so labels stay editable)
const DNA_ICONS   = [<FaBolt />, <FaShieldAlt />, <FaUsers />, <FaMicrochip />, <FaNetworkWired />];
const DNA_COLORS  = ['bg-indigo-600', 'bg-violet-600', 'bg-blue-600', 'bg-cyan-600', 'bg-purple-600'];

const CareerHub = () => {
  const { content } = useContent();
  const cms = content?.careerHub || {};
  const cmsHero         = cms.hero         || {};
  const cmsPanels       = Array.isArray(cms.panels)  ? cms.panels  : [];
  const cmsSuccessStory = cms.successStory  || {};
  const cmsDna          = cms.dna           || {};
  const cmsDots         = Array.isArray(cmsDna.dots) ? cmsDna.dots : [];
  const cmsContact      = cms.contact       || {};
  const WA_CAREER       = cmsContact.whatsappNumber || '918667363896';

  const [selectedJob, setSelectedJob] = useState(null);
  const [liveJobs, setLiveJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successStories, setSuccessStories] = useState([]);
  const [activeTab, setActiveTab] = useState('details');
  const dnaRef = useRef(null);
  const dnaInView = useInView(dnaRef, { once: true, margin: '-80px' });

  const vid1Ref = useRef(null);
  const vid2Ref = useRef(null);
  const [videoIndex, setVideoIndex] = useState(0);
  const images = [studentsImg, img2Src, img3Src];
  const [imageIndex, setImageIndex] = useState(0);
  const switchImage = (dir) => setImageIndex(i => (i + dir + images.length) % images.length);
  const videos = [
    { src: vid1Src, ref: vid1Ref },
    { src: vid2Src, ref: vid2Ref },
  ];
  const switchVideo = (dir) => {
    [vid1Ref, vid2Ref].forEach(r => { if (r.current) { r.current.pause(); r.current.currentTime = 0; } });
    setVideoIndex(i => (i + dir + videos.length) % videos.length);
  };


  useEffect(() => {
    fetch('/api/public/jobs')
      .then(res => res.json())
      .then(data => { setLiveJobs(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
    fetch('/api/public/success-stories')
      .then(res => res.json())
      .then(data => setSuccessStories(data))
      .catch(() => {});
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
      await fetch('/api/public/apply', { method: 'POST', body: data, signal: AbortSignal.timeout(5000) });
    } catch (_) {}
    window.open('https://wa.me/' + WA_CAREER + '?text=' + encodeURIComponent(waText), '_blank');
    setSubmitStatus('success');
    setTimeout(() => { setSubmitStatus(null); setSelectedJob(null); }, 4000);
    setIsSubmitting(false);
  };

  return (
    <div className="font-sans text-slate-900 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen pt-24 selection:bg-purple-600 selection:text-white overflow-x-hidden flex flex-col items-center">

      {/* 1. HERO */}
      <section className="w-full max-w-5xl px-6 py-12 flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center w-full">
          <span className="inline-block py-1 px-3 rounded-full bg-white border border-blue-100 text-blue-600 text-xs font-bold tracking-wider mb-4 shadow-sm uppercase">{cmsHero.badge || 'Career Hub'}</span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black leading-tight mb-4 font-heading">{cmsHero.heading || 'Build Your Career'}</h1>
          <p className="text-slate-500 text-base font-normal max-w-xl text-center">{cmsHero.description || 'Upskill your career with DVein Innovations'}</p>
        </motion.div>
      </section>

      {/* 2. RECRUITMENT PANELS */}
      <section className="w-full py-20 px-6 flex flex-col items-center">
        <div className="max-w-5xl w-full grid gap-6 md:grid-cols-2">
          {cmsPanels.map((panel, i) => (
            <div key={panel._id || i} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-6 text-left shadow-sm">
              <div className="relative h-56 overflow-hidden rounded-[2rem] mb-6">
                <img
                  src={resolvePanel(panel.image) || (i === 0 ? clientImg : dveinLogo)}
                  alt={panel.tag}
                  className="w-full h-full object-cover"
                  onError={e => { e.target.src = i === 0 ? clientImg : dveinLogo; }}
                />
              </div>
              <span className="text-[11px] font-black uppercase tracking-[0.35em] text-slate-900 mb-3 block">{panel.tag}</span>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4 font-heading">{panel.heading}</h2>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">{panel.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. OUR SUCCESS STORY */}
      <section className="w-full py-20 px-6 bg-white border-y border-slate-50">
        <div className="max-w-7xl mx-auto">
          {/* Centered heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-black leading-tight mb-4 font-heading">{cmsSuccessStory.heading || 'Our Success Story'}</h2>
            <p className="text-slate-500 text-sm leading-relaxed font-normal max-w-xl mx-auto">{cmsSuccessStory.description || ''}</p>
          </div>

          {/* Media Cards — image and videos in separate cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">

            {/* Image card — arrow to switch between images */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}
              className="relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-100"
            >
              <img
                src={images[imageIndex]}
                alt="DVein Students"
                className="w-full h-80 object-cover transition-opacity duration-300"
              />
              {/* Left arrow */}
              <button onClick={() => switchImage(-1)} aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center hover:bg-white active:scale-95 transition-all z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {/* Right arrow */}
              <button onClick={() => switchImage(1)} aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center hover:bg-white active:scale-95 transition-all z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                  <button key={i} onClick={() => setImageIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === imageIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'}`} />
                ))}
              </div>
            </motion.div>

            {/* Videos card — arrow to switch between videos */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
              className="relative rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 bg-black"
            >
              <div className="w-full h-80 flex items-center justify-center">
                {videos.map((v, i) => (
                  <video
                    key={i}
                    ref={v.ref}
                    src={v.src}
                    className={`w-full h-full object-contain ${i === videoIndex ? 'block' : 'hidden'}`}
                    controls
                    playsInline
                  />
                ))}
              </div>
              {/* Left arrow */}
              <button onClick={() => switchVideo(-1)} aria-label="Previous video"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center hover:bg-white active:scale-95 transition-all z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              {/* Right arrow */}
              <button onClick={() => switchVideo(1)} aria-label="Next video"
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200 shadow-md flex items-center justify-center hover:bg-white active:scale-95 transition-all z-10">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                {videos.map((_, i) => (
                  <button key={i} onClick={() => { [vid1Ref, vid2Ref].forEach(r => { if (r.current) { r.current.pause(); r.current.currentTime = 0; } }); setVideoIndex(i); }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${i === videoIndex ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/80'}`} />
                ))}
              </div>
            </motion.div>

          </div>

          {/* Story Cards */}
          {successStories.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {successStories.map((story, i) => (
                <motion.div
                  key={story._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-slate-50 border border-slate-100 rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-lg transition-all"
                >
                  {/* Media: video takes priority over image */}
                  {story.videoUrl ? (
                    <div className="relative w-full aspect-video bg-black">
                      <iframe
                        src={story.videoUrl}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title={story.title}
                      />
                    </div>
                  ) : story.image ? (
                    <div className="w-full h-48 overflow-hidden">
                      <img src={story.image} alt={story.title} className="w-full h-full object-cover" />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <h3 className="font-black text-slate-900 text-base mb-2">{story.title}</h3>
                    <p className="text-slate-500 text-xs leading-relaxed">{story.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* 7. OUR DNA — Animated Roadmap */}
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
            {cmsDna.badge || 'Who We Are'}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter">{cmsDna.heading || 'OUR DNA'}</h2>
        </motion.div>

        {/* Desktop: horizontal timeline */}
        <div className="max-w-3xl w-full mx-auto px-6 hidden md:block">
          <div className="relative flex items-start justify-between gap-0">
            <div className="absolute top-8 left-[calc(100%/8)] right-[calc(100%/8)] h-0.5 bg-white/10 overflow-hidden">
              <motion.div className="h-full bg-blue-500" initial={{ scaleX: 0 }} animate={dnaInView ? { scaleX: 1 } : {}} transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.4 }} style={{ originX: 0 }} />
            </div>
            {cmsDots.map((dot, i) => (
              <motion.div key={dot._id || i} className="flex flex-col items-center text-center flex-1 relative z-10" initial={{ opacity: 0, y: 30 }} animate={dnaInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.25 + i * 0.18 }}>
                <motion.div className="relative mb-4" whileHover={{ scale: 1.12, rotate: 3 }} transition={{ type: 'spring', stiffness: 300 }}>
                  <div className={`w-16 h-16 rounded-2xl ${DNA_COLORS[i % DNA_COLORS.length]} flex items-center justify-center text-white text-2xl shadow-lg ring-4 ring-white/10`}>
                    {DNA_ICONS[i % DNA_ICONS.length]}
                  </div>
                  <div className="absolute -top-2 left-[60%] w-5 h-5 rounded-full bg-white text-slate-900 text-[10px] font-black flex items-center justify-center shadow">{i + 1}</div>
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
              <motion.div className="w-full bg-blue-500" initial={{ scaleY: 0 }} animate={dnaInView ? { scaleY: 1 } : {}} transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.2 }} style={{ originY: 0 }} />
            </div>
            {cmsDots.map((dot, i) => (
              <motion.div key={dot._id || i} className="relative pl-8 pb-10 last:pb-0" initial={{ opacity: 0, x: -20 }} animate={dnaInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay: 0.15 + i * 0.13 }}>
                <div className={`absolute left-[-8px] top-1 w-4 h-4 rounded-full ${DNA_COLORS[i % DNA_COLORS.length]} ring-2 ring-white/20 shadow`} />
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 rounded-xl ${DNA_COLORS[i % DNA_COLORS.length]} flex items-center justify-center text-white text-lg shadow shrink-0`}>{DNA_ICONS[i % DNA_ICONS.length]}</div>
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

      {/* 4. COLLECTIVE CONTACT */}
      <section className="w-full py-20 px-6 bg-white flex flex-col items-center">
        <div className="w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-[3rem] shadow-2xl p-8">
          <div className="space-y-6 text-center flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-white">{cmsContact.heading || 'chat us'}</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">{cmsContact.description || 'Send a quick message and we will connect you.'}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.open('https://wa.me/' + WA_CAREER + '?text=' + encodeURIComponent(cmsContact.whatsappMessage || 'Hello DVein Team, I would like to discuss career opportunities.'), '_blank')}
                className="bg-white text-slate-950 px-10 py-4 rounded-full font-black uppercase tracking-[0.35em] text-[11px] hover:bg-slate-100 transition"
              >{cmsContact.buttonText || 'WhatsApp the Team'}</button>
            </div>
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
                  <div className="mt-8 space-y-4">
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Responsibilities</h4>
                      {selectedJob.responsibilities?.map((r, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2">
                          <span className="text-indigo-500 mt-0.5">•</span>
                          <span className="text-slate-600 text-xs leading-relaxed">{r}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Requirements</h4>
                      {selectedJob.requirements?.map((r, i) => (
                        <div key={i} className="flex items-start gap-2 mb-2">
                          <span className="text-green-500 mt-0.5">✓</span>
                          <span className="text-slate-600 text-xs leading-relaxed">{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={(activeTab === 'form' ? 'flex' : 'hidden md:flex') + ' w-full md:w-1/2 flex-col bg-white overflow-y-auto p-10 md:p-14'}>
                  <h3 className="text-lg font-black text-slate-900 uppercase mb-6">Apply for {selectedJob.title}</h3>
                  <form className="space-y-4" onSubmit={(e) => {
                    e.preventDefault();
                    const fd = new FormData(e.target);
                    const msg = `Application for ${selectedJob.title}. Name: ${fd.get('name')}, Email: ${fd.get('email')}, Phone: ${fd.get('phone')}`;
                    window.open(`https://wa.me/919500181230?text=${encodeURIComponent(msg)}`, '_blank');
                  }}>
                    <input name="name" required placeholder="Full Name" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400" />
                    <input name="email" type="email" required placeholder="Email Address" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400" />
                    <input name="phone" required placeholder="Phone Number" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-400" />
                    <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all">
                      Submit Application
                    </button>
                  </form>
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
