
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Added missing AnimatePresence import
import {
  FaMicrochip, FaCode, FaTools, FaCloudDownloadAlt,
  FaLightbulb, FaCheckCircle, FaProjectDiagram, FaGlobe,
  FaSatellite, FaBolt, FaMemory, FaRocket
} from 'react-icons/fa';
import AnimatedRoadmap from '../components/AnimatedRoadmap';
import ImageSlideshow from '../components/ImageSlideshow';
import { useContent } from '../context/ContentContext';

// Visual constants — icons & colors stay fixed
const STAT_ICONS    = [<FaMicrochip />, <FaCode />, <FaSatellite />, <FaLightbulb />];
const ROADMAP_ICONS  = [<FaLightbulb />, <FaProjectDiagram />, <FaTools />, <FaGlobe />];
const ROADMAP_COLORS = ['bg-indigo-500', 'bg-violet-600', 'bg-blue-600', 'bg-cyan-600'];

const StudentProjects = () => {
  const [isSyncing, setIsSyncing] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [filterOpen, setFilterOpen] = useState(false);
  const { content } = useContent();
  const sp = content.studentProjects;
  const heroLines = sp.hero.headline.split('\n');
  const hwLines = sp.hardware.heading.split('\n');

  const nodeFilters = [
    { label: 'All Nodes',      value: 'all' },
    { label: 'Software Node',  value: 'software' },
    { label: 'Hardware Node',  value: 'hardware' },
    { label: 'Embedded Node',  value: 'embedded' },
  ];

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

  // --- 3. REPOSITORY DATA (Integrated Multi-Domain Projects) ---
  const projects = [
    {
      id: 1,
      category: 'software',
      title: "AI based Smart Medicine Remainder Android Application",
      student: "Software Development Batch",
      desc: "•Smart Reminders • Medicine Tracking • Missed Dose Alerts • Caregiver Notifications • Health Dashboard",
      tools: [ "React Native","FastAPI","PostgreSQL","Twilio API","Expo Notifications" ],
      images: [
        "/project-images/ai-medicine/img1.jpg",
        "/project-images/ai-medicine/img2.jpg",
        "/project-images/ai-medicine/img3.jpg",
        "/project-images/ai-medicine/img4.jpg",
        "/project-images/ai-medicine/img5.jpg",
        "/project-images/ai-medicine/img6.jpg",
        "/project-images/ai-medicine/img7.jpg",
        "/project-images/ai-medicine/img8.jpg",
        "/project-images/ai-medicine/img9.jpg",
      ]
    },
    {
      id: 2,
      category: 'hardware',
      title: "Crowd Safety Application based on Real Time Metro Station Monitoring",
      student: "Hardware & IoT Batch",
      desc: "•Live Crowd Detection • Real-Time Alerts  •Safety Threshold Monitoring •SMS Notifications •Analytics Dashboard •Automated Emergency Indications",
      tools: ["Arduino Uno","I2C LCD Display","Buzzer","LED Indicators","Camera Module","React Native","FastAPI","OpenCV","Twilio API","Arduino IDE","Serial Communication"],
      images: [
        "/project-images/crowd-safety/img1.jpg",
        "/project-images/crowd-safety/img2.jpg",
        "/project-images/crowd-safety/img3.jpg",
        "/project-images/crowd-safety/img4.jpg",
        "/project-images/crowd-safety/img5.jpg",
        "/project-images/crowd-safety/img6.jpg",
        "/project-images/crowd-safety/img7.jpg",
        "/project-images/crowd-safety/img8.jpg",
      ]
    },
    {
      id: 3,
      category: 'embedded',
      title: "Smart Ring Application for Health Monitoring",
      student: "Embedded Systems Batch",
      desc: "•Yoga Posture Tracking • Activity Monitoring • Breathing Analysis • Real-Time Health Insights • Smart Notifications • Progress Analytics",
      tools: ["Smart Sensor Ring", "Motion Sensors", "Bluetooth Module", "Health Monitoring Sensors", "React Native", "FastAPI", "Python", "IoT Sensors", "Bluetooth Communication", "Cloud Analytics"],
      images: [
        "/project-images/smart-ring/img1.jpg",
        "/project-images/smart-ring/img2.jpg",
        "/project-images/smart-ring/img3.jpg",
        "/project-images/smart-ring/img4.jpg",
        "/project-images/smart-ring/img5.jpg",
      ]
    },
    {
      id: 4,
      category: 'hardware',
      title: "Fingerprint and iris voting system",
      student: "Hardware Security Batch",
      desc: " •Facial Recognition Authentication •Secure Vote Casting •Automated Voter Verification •Real-Time LCD Guidance System •Audio & Visual Alert System",
      tools: ["ESP32-CAM Module","ESP32 DevKit V1","16x2 LCD Display with I2C Module","Push Buttons","Active Buzzer","LED Indicators","OV2640 Camera Sensor"],
      images: [
        "/project-images/iris-voting/img1.jpg",
        "/project-images/iris-voting/img2.jpg",
      ]
    },
    {
      id: 5,
      category: 'software',
      title: "Maternal Health Tracker",
      student: "Software Development Batch",
      desc: " •Maternal Health Monitoring System •Real-Time Body Temperature Tracking •Automatic Fall Detection & Emergency Alerts •BLE-Based Mobile App Connectivity •Doctor & Patient Real-Time Monitoring Dashboard",
      tools: ["ESP32 Development Board","MAX30102 Sensor","MPU6050 Sensor","Temperature Sensor","Li-ion Battery","React Native","Spring Boot","MySQL Database"],
      images: [
        "/project-images/maternal-health/img1.jpg",
        "/project-images/maternal-health/img2.jpg",
        "/project-images/maternal-health/img3.jpg",
        "/project-images/maternal-health/img4.jpg",
        "/project-images/maternal-health/img5.jpg",
        "/project-images/maternal-health/img6.jpg",
      ]
    },
    {
      id: 6,
      category: 'embedded',
      title: "Smart Plant Monitoring system using Raspberry pi and ESP32",
      student: "Embedded Systems Batch",
      desc: "•Automated Soil Moisture Sensing •Ambient Temperature & Humidity Telemetry •Real-Time Water Pump Automation •Cloud Dashboard Monitoring •Data Logs Analysis",
      tools: ["Raspberry Pi", "ESP32", "DHT11 Sensor", "Soil Moisture Sensor", "Python", "MQTT", "Node.js"],
      images: [
        "/project-images/smart-plant/img1.jpg",
        "/project-images/smart-plant/img2.jpg",
      ]
    },
    {
      id: 7,
      category: 'hardware',
      title: "Intelligent Mobility and Safety Assistance System for Visually Impaired Individuals",
      student: "Hardware & AI Batch",
      desc: "•Real-Time Object Detection •Face Recognition System •OCR-Based Text Reading •Voice Command Navigation •Bluetooth Audio Assistance",
      tools: ["Raspberry Pi", "Python", "TensorFlow", "Ultralytics", "EasyOCR", "Pyttsx3", "SpeechRecognition"],
      images: [
        "/project-images/safety-assist/img1.jpg",
      ]
    },
    {
      id: 8,
      category: 'embedded',
      title: "Smart Traffic Accident Hotspot Prediction and Prevention System",
      student: "Embedded & Web Batch",
      desc: "•Real-Time Safety Monitoring • Emergency Alerts • Sensor-Based Detection • Live Dashboard • Automated Notifications • Risk Analysis",
      tools: ["Arduino/ESP32","Smoke Sensor","Temperature Sensor","Gas Sensor","Buzzer","LED Indicators","FastAPI","React","IoT Sensors","Arduino IDE","Cloud Monitoring Systems"],
      images: [
        "/project-images/traffic-accidents/img1.png",
        "/project-images/traffic-accidents/img2.png",
        "/project-images/traffic-accidents/img3.png",
        "/project-images/traffic-accidents/img4.png",
        "/project-images/traffic-accidents/img5.png",
        "/project-images/traffic-accidents/img6.png",
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 pt-16 overflow-x-hidden selection:bg-indigo-600 selection:text-white">

      {/* 1. HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 font-extrabold tracking-widest uppercase text-[10px] mb-8 border border-indigo-100">
            {sp.hero.badge}
          </span>
          <h1 className="text-4xl md:text-7xl font-extrabold text-slate-900 leading-tight mb-8 tracking-tight font-heading">
            {heroLines.map((line, i) => (
              <React.Fragment key={i}>{line}{i < heroLines.length - 1 && <br />}</React.Fragment>
            ))}
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg text-slate-500 leading-relaxed font-medium mb-12">
            {sp.hero.description}
          </p>
          <div className="flex justify-center gap-4">
            <a href={sp.hero.pdfLink} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 btn-brand px-10 py-5 rounded-2xl font-extrabold text-xs uppercase tracking-widest shadow-xl transform hover:-translate-y-1">
              <FaCloudDownloadAlt className="text-xl" /> {sp.hero.pdfBtn}
            </a>
          </div>
        </motion.div>
      </section>

      {/* 2. STATS */}
      <section className="max-w-6xl mx-auto px-6 mb-32 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {sp.stats.map((stat, i) => (
          <motion.div key={stat._id} whileHover={{ y: -5 }}
            className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 text-center hover:bg-white hover:shadow-2xl transition-all group">
            <div className="text-2xl text-indigo-600 mb-4 flex justify-center group-hover:scale-110 transition-transform">
              {STAT_ICONS[i % STAT_ICONS.length]}
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 mb-1">{stat.count}</h3>
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      {/* 3. WHY CHOOSE DVEIN */}
      <section className="bg-slate-50 py-32 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight font-heading">
              {sp.whyHeading}
            </h2>
            <div className="w-16 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sp.whyFeatures.map((f) => (
              <div key={f._id} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-xl mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <FaCheckCircle />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-4 tracking-tight font-heading">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HARDWARE INVENTORY */}
      <section className="bg-slate-900 text-white py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight leading-tight font-heading">
              {hwLines.map((line, i) => (
                <React.Fragment key={i}>{line}{i < hwLines.length - 1 && <br />}</React.Fragment>
              ))}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {sp.hardware.nodes.map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 font-bold text-[9px] uppercase tracking-widest text-indigo-300 group hover:bg-indigo-600 hover:text-white transition-all">
                  <FaBolt className="group-hover:animate-pulse" /> {item}
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <img src={sp.hardware.image} className="rounded-[3rem] border-2 border-slate-700 shadow-2xl h-80 w-full object-cover" alt="Hardware Lab" />
            <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-2xl border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white text-2xl">
                <FaMemory />
              </div>
              <div className="text-left text-slate-900">
                <p className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Architecture</p>
                <p className="font-extrabold text-[11px] uppercase">{sp.hardware.badgeText}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PROJECT REPOSITORY */}
      <section id="repository" className="max-w-7xl mx-auto px-6 py-32">
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end gap-6 justify-between">
          <div>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-2 font-heading">Project Repository.</h2>
            <p className="text-slate-400 font-semibold uppercase text-xs tracking-widest">Active Knowledge Repository Hub</p>
          </div>

          {/* ── DROPDOWN FILTER ── */}
          <div className="relative">
            <button
              onClick={() => setFilterOpen(prev => !prev)}
              className="flex items-center gap-3 bg-white border border-slate-200 hover:border-indigo-400 shadow-sm px-5 py-3 rounded-xl font-extrabold text-[10px] uppercase tracking-widest text-slate-700 hover:text-indigo-600 transition-all min-w-[180px] justify-between"
            >
              <span>{nodeFilters.find(f => f.value === activeFilter)?.label}</span>
              <svg
                className={`w-3.5 h-3.5 transition-transform duration-200 ${filterOpen ? 'rotate-180' : ''}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <AnimatePresence>
              {filterOpen && (
                <motion.ul
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-full bg-white border border-slate-100 rounded-xl shadow-2xl overflow-hidden z-50"
                >
                  {nodeFilters.map(f => (
                    <li key={f.value}>
                      <button
                        onClick={() => { setActiveFilter(f.value); setFilterOpen(false); }}
                        className={`w-full text-left px-5 py-3 text-[10px] font-extrabold uppercase tracking-widest transition-colors
                          ${activeFilter === f.value
                            ? 'bg-indigo-600 text-white'
                            : 'text-slate-600 hover:bg-indigo-50 hover:text-indigo-600'
                          }`}
                      >
                        {f.label}
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.filter(p => activeFilter === 'all' || p.category === activeFilter).map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col group h-full"
            >
               <div className="h-56 overflow-hidden relative">
                  <ImageSlideshow images={project.images} interval={3500} className="w-full h-full" />
                  <div className="absolute top-5 left-5 z-10">
                      <span className="bg-white/95 px-3 py-1.5 rounded-lg text-[9px] font-extrabold text-indigo-600 uppercase shadow-sm border border-indigo-50">
                          {project.category} node
                      </span>
                  </div>
               </div>
               <div className="p-10 flex-grow flex flex-col">
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 tracking-tight font-heading">{project.title}</h3>
                  <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed border-l-2 border-indigo-100 pl-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                      {project.tools.map((t, idx) => (
                        <span key={idx} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-tight">
                          {t}
                        </span>
                      ))}
                  </div>
               </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. ROADMAP */}
      <AnimatedRoadmap
        title={sp.roadmap.title}
        subtitle={sp.roadmap.subtitle}
        accent="bg-indigo-400"
        steps={sp.roadmap.steps.map((step, i) => ({
          icon:  ROADMAP_ICONS[i % ROADMAP_ICONS.length],
          label: step.label,
          desc:  step.desc,
          color: ROADMAP_COLORS[i % ROADMAP_COLORS.length],
        }))}
      />

      {/* 7. CTA */}
      <section className="py-40 text-center bg-white relative overflow-hidden">
          <motion.div 
            whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
            className="max-w-4xl mx-auto bg-slate-900 p-20 rounded-[4rem] shadow-4xl relative overflow-hidden text-white"
          >
             <FaRocket className="text-[15rem] text-indigo-600/10 absolute -top-20 -right-20 -rotate-45" />
             <h2 className="text-4xl md:text-5xl font-extrabold mb-10 tracking-tight font-heading">
                Activate Your <br/><span className="text-white">Project</span>
             </h2>
             <p className="max-w-xl mx-auto text-slate-400 font-medium text-base mb-12 leading-relaxed">
               Join our next batch of student innovators and turn your ideas into physical industrial mastery.
             </p>
             <a
               href="https://wa.me/919500181230?text=Hello%20DVein%20Team,%20I%20am%20interested%20in%20launching%20a%20project%20node."
               target="_blank"
               rel="noopener noreferrer"
               className="inline-block bg-indigo-600 text-white px-16 py-6 rounded-2xl font-extrabold text-xs uppercase tracking-[0.4em] shadow-3xl hover:bg-white hover:text-indigo-600 transition-all transform hover:-translate-y-2"
             >
                Launch Project 
             </a>
          </motion.div>
         
      </section>

    </div>
  );
};

export default StudentProjects;
