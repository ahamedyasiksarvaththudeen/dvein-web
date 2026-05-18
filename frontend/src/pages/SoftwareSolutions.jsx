import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  { title: "Frontend", stack: [{ icon: <SiReact className="text-cyan-400" />, name: "React.js" }, { icon: <FaCode className="text-orange-500" />, name: "Next.js" }, { icon: <FaCode className="text-blue-500" />, name: "Tailwind" }] },
  { title: "Backend", stack: [{ icon: <SiNodedotjs className="text-green-600" />, name: "Node.js" }, { icon: <SiPython className="text-blue-400" />, name: "Python" }, { icon: <FaCode className="text-purple-600" />, name: "FastAPI" }] },
  { title: "Database", stack: [{ icon: <SiMongodb className="text-green-500" />, name: "MongoDB" }, { icon: <SiPostgresql className="text-blue-700" />, name: "PostgreSQL" }, { icon: <SiFirebase className="text-yellow-500" />, name: "Firebase" }] },
  { title: "Cloud & AI", stack: [{ icon: <FaAws className="text-orange-500" />, name: "AWS" }, { icon: <SiDocker className="text-blue-500" />, name: "Docker" }, { icon: <SiTensorflow className="text-orange-600" />, name: "TensorFlow" }] },
];

const faqs = [
  { question: "How much does a custom software project cost?", answer: "Cost depends on complexity. We offer flexible pricing models: Fixed Price for defined scopes, and Hourly for ongoing development. Contact us for a free quote." },
  { question: "How long does it take to build an app?", answer: "A simple MVP can take 4-6 weeks. Complex enterprise solutions may take 3-6 months. We provide a detailed timeline during the discovery phase." },
  { question: "Do you provide source code ownership?", answer: "Absolutely. Once the project is fully paid for, you own 100% of the source code and intellectual property." },
];

const SoftwareSolutions = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  return (
    // ✨ MIXED COLOR BACKGROUND (Consistent Theme) ✨
    <div className="font-sans text-gray-900 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-24 pb-16 selection:bg-purple-500 selection:text-white">
      
      {/* === HERO SECTION === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-purple-100 text-purple-600 text-sm font-bold tracking-wider mb-4 shadow-sm">
              ENGINEERING EXCELLENCE
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 font-heading mb-6 leading-tight">
             Transforming Ideas into <br/>
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">Digital Reality</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            We are a full-cycle software development company. From conceptualization to deployment, we build robust, scalable, and secure digital products.
            </p>
            <div className="flex justify-center gap-4">
               <Link to="/contact">
                 <button className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold shadow-lg hover:bg-purple-700 hover:-translate-y-1 transition-all">Start Your Project</button>
               </Link>
               <button onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all">Explore Services</button>
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
                <div className="text-3xl text-purple-600 mb-4">{feature.icon}</div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
             </motion.div>
           ))}
        </div>
      </div>

      {/* === ANIMATED PROCESS ROADMAP === */}
      <AnimatedRoadmap
        title="Our Development Process"
        subtitle="A transparent, agile workflow engineered for speed, quality, and scale."
        accent="bg-purple-500"
        steps={[
          { icon: <FaSearch />,      label: 'Requirement Analysis',  desc: 'Deep dive into your goals, users, and technical needs to define the perfect scope.', color: 'bg-purple-600' },
          { icon: <FaPencilRuler />, label: 'UI/UX & Architecture',  desc: 'Design system blueprints, wireframes, and scalable tech architecture.', color: 'bg-indigo-600' },
          { icon: <FaCogs />,        label: 'Development & QA',      desc: 'Agile sprints with continuous testing, code reviews, and performance benchmarks.', color: 'bg-blue-600' },
          { icon: <FaLifeRing />,    label: 'Deployment & Support',  desc: 'CI/CD pipeline launch, monitoring setup, and round-the-clock post-launch support.', color: 'bg-cyan-600' },
        ]}
      />

      {/* === KEY SERVICES === */}
      <div id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
         <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Competencies</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">We leverage cutting-edge technology to solve complex challenges.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesList.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-purple-200 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl text-purple-600 mb-6">
                    {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">{service.desc}</p>
                <div className="flex items-center gap-2 text-purple-700 text-sm font-bold">
                    <FaCheckCircle /> Enterprise Grade
                </div>
              </motion.div>
            ))}
         </div>
      </div>

      {/* === INDUSTRIES === */}
      <div className="bg-[#0f172a] py-20 mb-24 text-white relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                    <span className="text-purple-400 font-bold tracking-widest uppercase text-sm">Industries</span>
                    <h2 className="text-4xl font-bold mt-2 mb-6">Software for Every Sector</h2>
                    <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        Our technical expertise spans across various industries. We understand the unique challenges and compliance requirements of your sector.
                    </p>
                    <Link to="/contact" className="text-purple-400 font-bold hover:underline flex items-center gap-2">
                        Schedule a Consultation <FaArrowRight />
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    {industries.map((ind, i) => (
                        <div key={i} className="bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-colors">
                            <div className="text-3xl text-purple-400 mb-3">{ind.icon}</div>
                            <h4 className="font-bold text-lg">{ind.name}</h4>
                            <p className="text-sm text-gray-400 mt-1">{ind.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
         </div>
      </div>

      {/* === TECH STACK === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
         <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Technology Stack</h2>
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {techCategories.map((cat, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <h4 className="font-bold text-gray-900 mb-4 uppercase text-sm tracking-wider">{cat.title}</h4>
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Frequently Asked Questions</h2>
          <div className="space-y-4">
              {faqs.map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                      <button 
                        onClick={() => setActiveAccordion(activeAccordion === index ? null : index)}
                        className="w-full flex justify-between items-center p-5 text-left font-bold text-gray-800 hover:bg-gray-50 transition-colors"
                      >
                          {faq.question}
                          {activeAccordion === index ? <FaChevronUp className="text-purple-600"/> : <FaChevronDown className="text-gray-400"/>}
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

      {/* === CTA SECTION === */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-[2.5rem] p-10 md:p-20 overflow-hidden bg-[#0a0f1c] text-center border border-white/10 shadow-2xl group">
              
              {/* Dynamic Glow Background */}
              <div className="absolute top-0 left-0 w-full h-full bg-grid-white/[0.05]"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] group-hover:bg-purple-600/30 transition-all duration-700"></div>
              
              {/* Content */}
              <div className="relative z-10">
                  <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
                    Ready to Start Your <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Digital Evolution?</span>
                  </h2>
                  <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
                    No commitment. Just a friendly conversation about your goals and how we can help you achieve them.
                  </p>
                  
                  <Link to="/contact">
                      <button className="px-10 py-5 bg-white text-gray-900 rounded-2xl font-bold text-lg hover:scale-105 transition-transform flex items-center gap-3 mx-auto shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
                        Get a Free Quote <FaArrowRight />
                      </button>
                  </Link>
              </div>
          </div>
      </div>

    </div>
  );
};

export default SoftwareSolutions;