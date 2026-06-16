import React, { useState } from 'react';
import ImageSlideshow from '../components/ImageSlideshow';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaCode, FaMobileAlt, FaBrain, FaCloud, FaDatabase, FaShieldAlt,
  FaCheckCircle, FaAws, FaRocket, FaHeadset, FaChartLine, FaLaptopCode,
  FaBuilding, FaStethoscope, FaGraduationCap, FaShoppingCart, FaChevronDown, FaChevronUp, FaArrowRight,
  FaSearch, FaPencilRuler, FaCogs, FaLifeRing
} from 'react-icons/fa';
import AnimatedRoadmap from '../components/AnimatedRoadmap';
import {
  SiReact, SiNodedotjs, SiPython, SiMongodb, SiPostgresql,
  SiDocker, SiTensorflow, SiFlutter, SiFirebase
} from 'react-icons/si';
import '../styles/software-solutions.css';
import t1 from '../assets/T1.png';
import t2 from '../assets/T2.png';
import t3 from '../assets/T3.png';
import t4 from '../assets/T4.png';
import t5 from '../assets/T5.png';
import t6 from '../assets/T6.png';
import F1 from '../assets/F1.png';
import F2 from '../assets/F2.png';
import F3 from '../assets/F3.png';
import SD1 from '../assets/Seller dash/S1.png';
import SD2 from '../assets/Seller dash/S2.png';
import SD3 from '../assets/Seller dash/S3.png';
import SD4 from '../assets/Seller dash/S4.png';
import SD5 from '../assets/Seller dash/S5.png';
import SD6 from '../assets/Seller dash/S6.png';
import EC1 from '../assets/ecommerce/e1.jpeg';
import EC2 from '../assets/ecommerce/E2.jpeg';
import EC3 from '../assets/ecommerce/E3.jpeg';
import EC4 from '../assets/ecommerce/E4.jpeg';
const BRAND = '#005ff7';

const servicesList = [
  { icon: <FaBrain />, title: "AI & Machine Learning", desc: "Automate complex tasks with custom AI models, NLP for chatbots, and predictive analytics to forecast business trends." },
  { icon: <FaCode />, title: "Full Stack Development", desc: "Scalable web portals using MERN (MongoDB, Express, React, Node) or Python-Django stacks tailored for high traffic." },
  { icon: <FaMobileAlt />, title: "Mobile App Development", desc: "Native performance with cross-platform efficiency using Flutter & React Native. Apps that work flawlessly on iOS & Android." },
  { icon: <FaCloud />, title: "Cloud Solutions (DevOps)", desc: "End-to-end AWS/Azure architecture, serverless deployment, Docker/Kubernetes containerization, and CI/CD pipelines." },
  { icon: <FaDatabase />, title: "Data Engineering", desc: "Transform raw data into actionable insights. Big Data processing, warehousing, and real-time visualization dashboards." },
  { icon: <FaShieldAlt />, title: "Cybersecurity & VAPT", desc: "Comprehensive security audits, penetration testing, and compliance setups (GDPR/ISO) to protect your digital assets." },
];

const features = [
  { icon: <FaRocket />, title: "Agile & Fast Delivery", desc: "We use Agile methodology to deliver MVPs in weeks, not months. Regular updates ensure you are always in the loop." },
  { icon: <FaHeadset />, title: "24/7 Post-Launch Support", desc: "Our relationship doesn't end at deployment. We provide round-the-clock maintenance and bug-fixing support." },
  { icon: <FaChartLine />, title: "Scalable Architecture", desc: "We write code that grows with you. Our solutions are built to handle millions of users without breaking." },
  { icon: <FaLaptopCode />, title: "Clean & Modern Code", desc: "We follow industry-best coding standards, ensuring your software is secure, maintainable, and bug-free." },
];

const industries = [
  { icon: <FaGraduationCap />, name: "EdTech", desc: "LMS, Virtual Classrooms, Student Portals" },
  { icon: <FaStethoscope />, name: "Healthcare", desc: "Telemedicine, Appointment Booking, EHR Systems" },
  { icon: <FaShoppingCart />, name: "E-Commerce", desc: "Multi-vendor Marketplaces, Payment Gateways" },
  { icon: <FaBuilding />, name: "Real Estate", desc: "Property Listing, VR Tours, CRM Integration" },
];

const techCategories = [
  { title: "Frontend", stack: [{ icon: <SiReact style={{ color: '#005ff7' }} />, name: "React.js" }, { icon: <FaCode style={{ color: '#005ff7' }} />, name: "Next.js" }, { icon: <FaCode style={{ color: '#005ff7' }} />, name: "Tailwind" }] },
  { title: "Backend", stack: [{ icon: <SiNodedotjs style={{ color: '#005ff7' }} />, name: "Node.js" }, { icon: <SiPython style={{ color: '#005ff7' }} />, name: "Python" }, { icon: <FaCode style={{ color: '#005ff7' }} />, name: "FastAPI" }] },
  { title: "Database", stack: [{ icon: <SiMongodb style={{ color: '#005ff7' }} />, name: "MongoDB" }, { icon: <SiPostgresql style={{ color: '#005ff7' }} />, name: "PostgreSQL" }, { icon: <SiFirebase style={{ color: '#005ff7' }} />, name: "Firebase" }] },
  { title: "Cloud & AI", stack: [{ icon: <FaAws style={{ color: '#005ff7' }} />, name: "AWS" }, { icon: <SiDocker style={{ color: '#005ff7' }} />, name: "Docker" }, { icon: <SiTensorflow style={{ color: '#005ff7' }} />, name: "TensorFlow" }] },
];

const faqs = [
  { question: "How much does a custom software project cost?", answer: "Cost depends on complexity. We offer flexible pricing models: Fixed Price for defined scopes, and Hourly for ongoing development. Contact us for a free quote." },
  { question: "How long does it take to build an app?", answer: "A simple MVP can take 4-6 weeks. Complex enterprise solutions may take 3-6 months. We provide a detailed timeline during the discovery phase." },
  { question: "Do you provide source code ownership?", answer: "Absolutely. Once the project is fully paid for, you own 100% of the source code and intellectual property." },
];

const WA_SS = '919500181230';
const openWA_SS = (msg = 'Hello DVein Team, I am interested in your Software Solutions.') =>
  window.open(`https://wa.me/${WA_SS}?text=${encodeURIComponent(msg)}`, '_blank');

const SoftwareSolutions = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    <div className="ss-page font-sans text-gray-900 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-24 pb-16">

      {/* === HERO === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-indigo-50 text-indigo-600 font-extrabold tracking-widest uppercase text-[10px] mb-8 border border-indigo-100">
            ENGINEERING EXCELLENCE
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-black font-heading mb-6 leading-tight">
            Transforming Ideas into <br/>
            <span className="text-black">Digital Reality</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We are a full-cycle software development company. From conceptualization to deployment, we build robust, scalable, and secure digital products.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => openWA_SS('Hello DVein Team, I want to start a software project with you.')}
              className="ss-btn-primary px-8 py-4 rounded-xl font-bold shadow-lg"
              style={{ backgroundColor: BRAND }}
            >Start Your Project</button>
            <button
              onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all"
            >Explore Services</button>
          </div>
        </motion.div>
      </div>

      {/* === WHY CHOOSE US === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/60 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-sm hover:shadow-md transition-all"
            >
              <div className="text-3xl mb-4" style={{ color: BRAND }}>{feature.icon}</div>
              <h3 className="font-bold text-black text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === ANIMATED PROCESS ROADMAP === */}
      <AnimatedRoadmap
        title="Our Development Process"
        subtitle="A transparent, agile workflow engineered for speed, quality, and scale."
        accent="bg-blue-500"
        steps={[
          { icon: <FaSearch />,      label: 'Requirement Analysis', desc: 'Deep dive into your goals, users, and technical needs to define the perfect scope.', color: 'bg-indigo-600' },
          { icon: <FaPencilRuler />, label: 'UI/UX & Architecture',  desc: 'Design system blueprints, wireframes, and scalable tech architecture.',              color: 'bg-violet-600' },
          { icon: <FaCogs />,        label: 'Development & QA',      desc: 'Agile sprints with continuous testing, code reviews, and performance benchmarks.',    color: 'bg-blue-600'   },
          { icon: <FaLifeRing />,    label: 'Deployment & Support',  desc: 'CI/CD pipeline launch, monitoring setup, and round-the-clock post-launch support.',   color: 'bg-cyan-600'   },
        ]}
      />

      {/* === KEY SERVICES === */}
      <div id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Our Core Competencies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">We leverage cutting-edge technology to solve complex challenges.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6" style={{ color: BRAND }}>
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{service.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.desc}</p>
              <div className="flex items-center gap-2 text-sm font-bold" style={{ color: BRAND }}>
                <FaCheckCircle /> Enterprise Grade
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === SOFTWARE PROJECTS === */}
      <div className="bg-[#0f172a] py-20 mb-24 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight font-heading">
              Software Projects
            </h2>
            <div className="w-16 h-1 mx-auto mt-4 rounded-full" style={{ backgroundColor: BRAND }}></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Temple Website",
                desc: "•Admin panel •Donation system •Event calendar •Multilingual support •Virtual tours •Live streaming integration",
                tags: ["HTML", "CSS", "JavaScript", "React", "Node.js", "express.js", "motion.js"],
                images: [t1, t2, t3, t4, t5, t6]
              },
              {
                title: "SARAL-X FERTILIZER WEBSITE",
                desc: "•Dynamic Product Catalog Management •Secure UPI Payment Verification •Automated WhatsApp Order Processing •Hyper-Local SEO Optimization •Fully Responsive Cross-Browser Interface",
                tags: ["React.js", "Tailwind CSS", "Framer Motion", "Node.js", "Express.js", "MongoDB", "UPI API Integration"],
                images: [F1, F2, F3]
              },
              {
                title: "Seller Dashboard",
                desc: "•Seller Hub & Order Management •Admin Analytics Dashboard •Store Reels Manager •Financial Settlements & Payouts •Category & Inventory Management •Revenue Analytics & Reporting",
                tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Recharts", "Tailwind CSS"],
                images: [SD1, SD2, SD3, SD4, SD5, SD6]
              },
              {
                title: "E-Commerce Platform",
                desc: "•Multi-vendor marketplace with seller onboarding •Secure UPI & card payment gateway •Real-time inventory & stock management •Order tracking with automated notifications •Seller analytics & revenue dashboard •Product catalog with category management",
                tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "UPI API", "Framer Motion"],
                images: [EC1, EC2, EC3, EC4]
              }
            ].map((project, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/40 hover:bg-white/10 transition-all overflow-hidden flex flex-col"
              >
                <div className="h-48 relative overflow-hidden">
                  <ImageSlideshow images={project.images} interval={3000 + i * 500} className="w-full h-full" />
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h4 className="font-bold text-lg text-white mb-2">{project.title}</h4>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 flex-grow">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="text-[10px] font-bold uppercase px-2 py-1 rounded-md bg-white/10 text-blue-300 tracking-wider">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* === TECH STACK === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h2 className="text-3xl font-bold text-center text-black mb-12">Technology Stack</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {techCategories.map((cat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
              <h4 className="font-bold text-black mb-4 uppercase text-sm tracking-wider">{cat.title}</h4>
              <div className="flex flex-wrap justify-center gap-3">
                {cat.stack.map((tool, j) => (
                  <div key={j} className="flex flex-col items-center">
                    <div className="text-2xl mb-1">{tool.icon}</div>
                    <span className="text-xs text-gray-500">{tool.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === FAQ === */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <h2 className="text-3xl font-bold text-center text-black mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <button
                onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                className="w-full flex justify-between items-center p-5 text-left font-bold text-black hover:bg-gray-50 transition-colors"
              >
                {faq.question}
                {activeAccordion === index
                  ? <FaChevronUp style={{ color: BRAND }}/>
                  : <FaChevronDown className="text-gray-400"/>}
              </button>
              <AnimatePresence>
                {activeAccordion === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-gray-50 px-5 pb-5 pt-0 text-gray-600 leading-relaxed"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* === CTA === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-[2.5rem] p-10 md:p-20 overflow-hidden bg-[#0a0f1c] text-center border border-white/10 shadow-2xl group">
          <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] group-hover:bg-blue-600/30 transition-all duration-700"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
              Ready to Start Your <br/>
              <span className="text-white">Digital Evolution?</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
              No commitment. Just a friendly conversation about your goals and how we can help you achieve them.
            </p>
            <button
              onClick={() => openWA_SS('Hello DVein Team, I would like to get a free quote for my software project.')}
              className="px-10 py-5 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-[0_0_40px_-10px_rgba(0,95,247,0.4)]"
              style={{ backgroundColor: '#005ff7', color: '#ffffff' }}
            >
              Get a Free Quote <FaArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftwareSolutions;
