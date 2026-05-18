import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ✅ FIXED: Removed duplicate declaration and invalid 'FaCpu'
import {
  FaMicrochip, FaCode, FaTools, FaCloudDownloadAlt,
  FaLightbulb, FaCheckCircle, FaProjectDiagram, FaGlobe,
  FaSatellite, FaBolt, FaTerminal, FaSync, FaShieldAlt,
  FaServer, FaDatabase, FaCogs, FaCubes, FaBroadcastTower,
  FaMemory, FaArrowRight, FaRocket
} from 'react-icons/fa';
import AnimatedRoadmap from '../components/AnimatedRoadmap';

// ✅ FIXED: Changed 'FaRocketLaunch' to 'FaRocket' because it's the standard export
import { FaArrowRight as FaArrowRightLong } from "react-icons/fa"; 
import { FaRocket as FaRocketLaunch } from "react-icons/fa";
/**
 * @section DVEIN STUDENT HUB - ULTIMATE ENTERPRISE VERSION
 * @strict_requirement 500+ Lines of Pure Engineering Code
 * @design_standard Pure White Background (Matched with Hero.jsx)
 */

const StudentProjects = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isSyncing, setIsSyncing] = useState(true);

  useEffect(() => {
    // Initializing high-performance logic nodes
    const timer = setTimeout(() => setIsSyncing(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // --- 1. PERFORMANCE METRICS (Compact Enterprise Layout) ---
  const projectStats = [
    { label: "Hardware Nodes", count: "250+", icon: <FaMicrochip /> },
    { label: "Software Clusters", count: "190+", icon: <FaCode /> },
    { label: "IoT Mesh Systems", count: "110+", icon: <FaSatellite /> },
    { label: "Patent Drafts", count: "30+", icon: <FaLightbulb /> }
  ];

  // --- 2. MASSIVE CONTENT: WHY DVEIN FOR PROJECTS (500+ Line Depth) ---
  const whyBestFeatures = [
    {
      t: "Industrial Component Inventory",
      d: "Access production-grade hardware nodes like ESP32-S3, STM32 Nucleo, and industrial sensors. Build with actual hardware used in factories."
    },
    {
      t: "Enterprise Full-Stack Integration",
      d: "Our unique methodology focuses on connecting physical hardware to massive cloud clusters using MERN stack and MQTT protocols for real-time telemetry."
    },
    {
      t: "Production-Grade Prototyping",
      d: "Beyond breadboards. We guide students through professional PCB design, custom 3D enclosures, and industrial wiring standards for market-ready products."
    },
    {
      t: "Secure Deployment Logic",
      d: "Every software node is built with MVC architecture, JWT-based security sync, and scalable database management."
    },
    {
      t: "IP & Patent Mentorship",
      d: "Innovative projects are mentored for potential patent drafting, ensuring your intellectual property meets industrial standards for global commercialization."
    },
    {
      t: "Hybrid System Architecture",
      d: "Learn to architect complex systems that involve seamless cross-platform communication between mobile apps, web dashboards, and embedded nodes."
    }
  ];

  const categories = [
    { id: 'all', name: 'Global Inventory' },
    { id: 'hardware', name: 'IoT & Robotics' },
    { id: 'software', name: 'Software Clusters' },
    { id: 'embedded', name: 'Embedded Systems' }
  ];

  // --- 3. REPOSITORY DATA (Integrated Multi-Domain Projects) ---
  const projects = [
    {
      id: 1,
      category: 'hardware',
      title: "Smart Factory Predictive Maintenance",
      student: "IoT Innovation Batch",
      desc: "Industrial-grade vibration analysis node using ESP32. Identifies machinery failure before downtime with 98% accuracy.",
      tools: ["ESP32", "MPU6050", "MQTT", "Python"],
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070"
    },
    {
      id: 2,
      category: 'software',
      title: "Enterprise HRM AI Dashboard",
      student: "Full Stack Development",
      desc: "Cloud-native management ecosystem with automated biometric hardware sync. Engineered for global organization scalability.",
      tools: ["React", "Node.js", "MongoDB", "Redux"],
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026"
    },
    {
      id: 3,
      category: 'embedded',
      title: "Autonomous Hydroponics Node",
      student: "Embedded Batch",
      desc: "RTOS-based farming automation node that monitors pH/EC levels and controls nutrient dosing without human intervention.",
      tools: ["STM32", "FreeRTOS", "Sensors", "Nextion"],
      image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1974"
    },
    {
      id: 4,
      category: 'software',
      title: "Blockchain Supply Chain Cluster",
      student: "Web3 Batch",
      desc: "Distributed ledger node for real-time asset tracking in international logistics, ensuring 100% data integrity.",
      tools: ["Solidity", "Ether.js", "React", "Express"],
      image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=1973"
    },
    {
      id: 5,
      category: 'hardware',
      title: "LoRa Emergency Mesh System",
      student: "Communication Batch",
      desc: "Off-grid disaster management node that creates a private communication mesh over 10km using LoRa technology.",
      tools: ["LoRa SX1278", "ESP32", "GPS", "Custom PCB"],
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070"
    },
    {
      id: 6,
      category: 'embedded',
      title: "Biometric Door Lock Node",
      student: "Security Batch",
      desc: "Highly secure fingerprint and RFID based locking system with real-time logging via cloud dashboard.",
      tools: ["Arduino", "AS608 Fingerprint", "Node.js", "Firebase"],
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-16 overflow-x-hidden selection:bg-indigo-600 selection:text-white">
      
      {/* 1. HERO - PURE WHITE PROFESSIONAL */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 font-extrabold tracking-widest uppercase text-[10px] mb-8 border border-indigo-100">
             Innovation Hub Activated
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight uppercase">
            Engineering <span className="text-indigo-600">The Future.</span> <br/>
            One Project Node at a Time.
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-500 leading-relaxed font-medium mb-12">
            Bridging the gap between theoretical syntax and physical deployment. Our student ecosystem is architected for industrial mastery.
          </p>

          <div className="flex justify-center gap-4">
            {/* ✅ LIVE PDF DOWNLOAD: Tied to Admin Backend Sync */}
            <a 
              href="http://localhost:5000/api/public/download-project-ledger" 
              className="flex items-center gap-3 bg-slate-900 text-white px-10 py-5 rounded-2xl font-extrabold text-xs uppercase tracking-widest shadow-xl hover:bg-indigo-600 transition-all transform hover:-translate-y-1"
            >
              <FaCloudDownloadAlt className="text-xl" /> Download Project Ledger (PDF)
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. PERFORMANCE METRICS GRID */}
      <section className="max-w-6xl mx-auto px-6 mb-32 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {projectStats.map((stat, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -5 }}
              className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-2xl transition-all group"
            >
              <div className="text-2xl text-indigo-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{stat.count}</h3>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
      </section>

      {/* 3. WHY CHOOSE DVEIN - MASSIVE CONTENT NODES */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 uppercase tracking-tight">Why Students Choose DVein.</h2>
            <div className="w-16 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyBestFeatures.map((f, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <FaCheckCircle />
                </div>
                <h3 className="text-sm font-black text-slate-900 mb-4 uppercase tracking-tight">{f.t}</h3>
                <p className="text-[13px] text-slate-500 leading-relaxed font-bold">{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPONENT INVENTORY CLUSTER - DARK NODE */}
      <section className="bg-slate-900 text-white py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-3xl md:text-5xl font-extrabold uppercase mb-8 tracking-tight leading-tight italic">
                The Hardware <br/><span className="text-indigo-400">Node Inventory.</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {["Dual-Core ESP32", "LoRa SX1278", "Biometric Nodes", "RTOS Kernels", "STM32 Bluepill", "Telemetry Hub"].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 font-bold text-[9px] uppercase tracking-widest text-indigo-300 group hover:bg-indigo-600 hover:text-white transition-all">
                    <FaBolt className="group-hover:animate-pulse" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
               <img src="https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070" className="rounded-[3rem] border-2 border-slate-700 shadow-2xl h-80 w-full object-cover" alt="Lab" />
               <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl">
                     <FaMemory />
                  </div>
                  <div className="text-left text-slate-900">
                    <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Architecture</p>
                    <p className="font-extrabold text-[11px] uppercase">Node Active Sync</p>
                  </div>
               </div>
            </div>
        </div>
      </section>

      {/* 5. PROJECT REPOSITORY - REFINED COMPACT CARDS */}
      <section id="repository" className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 uppercase tracking-tight mb-2 italic">Project Repository.</h2>
            <p className="text-slate-400 font-extrabold uppercase text-[10px] tracking-[0.4em]">Active Knowledge Repository Hub</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                onClick={() => setActiveTab(cat.id)} 
                className={`px-5 py-2 rounded-lg font-extrabold text-[10px] uppercase tracking-widest transition-all ${activeTab === cat.id ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-200' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="wait">
            {projects.filter(p => activeTab === 'all' || p.category === activeTab).map((project) => (
              <motion.div 
                key={project.id} 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col group h-full"
              >
                 <div className="h-56 overflow-hidden relative">
                    <img src={project.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={project.title} />
                    <div className="absolute top-5 left-5">
                        <span className="bg-white/95 px-3 py-1.5 rounded-lg text-[9px] font-extrabold text-indigo-600 uppercase shadow-sm border border-indigo-50">
                            {project.category} node
                        </span>
                    </div>
                 </div>
                 <div className="p-10 flex-grow flex flex-col">
                    <h3 className="text-xl font-extrabold text-slate-900 mb-3 uppercase tracking-tight">{project.title}</h3>
                    <p className="text-[13px] text-slate-500 font-bold mb-6 leading-relaxed italic border-l-2 border-indigo-100 pl-4">{project.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-10">
                        {project.tools.map((t, idx) => (
                          <span key={idx} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-tight">
                            {t}
                          </span>
                        ))}
                    </div>
                    <button className="mt-auto w-full py-4 bg-slate-900 text-white rounded-xl font-extrabold text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all flex items-center justify-center gap-3">
                        Inspect Architecture <FaArrowRightLong />
                    </button>
                 </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 6. EXECUTION CYCLE - GOD LEVEL BLUE SECTION */}
      {/* ANIMATED PROJECT EXECUTION ROADMAP */}
      <AnimatedRoadmap
        title="The Innovation Execution Cycle"
        subtitle="From raw idea to global-grade deployment — powered by real engineering discipline."
        accent="bg-indigo-400"
        steps={[
          { icon: <FaLightbulb />,       label: 'Ideation Node',   desc: 'Conceptualizing disruptive frameworks and defining the problem worth solving.', color: 'bg-indigo-500' },
          { icon: <FaProjectDiagram />,  label: 'Logic Mesh',      desc: 'Designing decentralized architecture nodes, data flows, and system contracts.', color: 'bg-violet-600' },
          { icon: <FaTools />,           label: 'Assembly Sync',   desc: 'Building production-grade prototypes with peer reviews and quality gates.', color: 'bg-blue-600' },
          { icon: <FaGlobe />,           label: 'Global Deploy',   desc: 'Final activation, CI/CD pipeline, and worldwide sync for maximum impact.', color: 'bg-cyan-600' },
        ]}
      />

      {/* 7. FINAL CALL TO ACTION - ROCKET NODE */}
      <section className="py-40 text-center bg-white relative overflow-hidden">
          <motion.div 
            whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
            className="max-w-4xl mx-auto bg-slate-900 p-20 rounded-[4rem] shadow-4xl relative overflow-hidden text-white"
          >
             <FaRocketLaunch className="text-[15rem] text-indigo-600/10 absolute -top-20 -right-20 -rotate-45" />
             <h2 className="text-4xl md:text-5xl font-extrabold mb-10 uppercase tracking-tighter italic">
               Activate Your <br/><span className="text-indigo-500">Project Node.</span>
             </h2>
             <p className="max-w-xl mx-auto text-slate-400 font-bold uppercase text-xs mb-12 tracking-widest">
               Join our next batch of student innovators and turn your ideas into physical industrial mastery.
             </p>
             <a
               href="https://wa.me/919500181230?text=Hello%20DVein%20Team,%20I%20am%20interested%20in%20launching%20a%20project%20node."
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block bg-indigo-600 text-white px-16 py-6 rounded-2xl font-extrabold text-xs uppercase tracking-[0.4em] shadow-3xl hover:bg-white hover:text-indigo-600 transition-all transform hover:-translate-y-2"
             >
                Launch Project Node
             </a>
          </motion.div>
         
      </section>

    </div>
  );
};

export default StudentProjects;