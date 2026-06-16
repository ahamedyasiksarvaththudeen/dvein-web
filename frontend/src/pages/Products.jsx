import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaRocket, FaShieldAlt, FaSync, FaBolt, FaDatabase,
  FaNetworkWired, FaCogs, FaArrowRight, FaPlayCircle,
  FaLock, FaChevronDown, FaChevronUp, FaMicrochip,
  FaQuoteLeft, FaStar, FaGoogle, FaSearch, FaLayerGroup, FaGlobe
} from 'react-icons/fa';
import AnimatedRoadmap from '../components/AnimatedRoadmap';
import '../styles/products.css';
import { useContent } from '../context/ContentContext';
import compack1 from '../assets/compack1.png';
import compack2 from '../assets/compack2.png';
import compack3 from '../assets/compack3.png';
import compack4 from '../assets/compack4.png';
import compack5 from '../assets/compack5.png';
import compack6 from '../assets/compack6.png';
import compack7 from '../assets/compack7.png';
import hrm1 from '../assets/hrm1.png';
import hrm2 from '../assets/hrm2.png';
import hrm3 from '../assets/hrm3.png';
import hrm4 from '../assets/hrm4.png';
import hrm5 from '../assets/hrm5.png';
import hrm6 from '../assets/hrm6.png';
import hrm7 from '../assets/hrm7.png';
import hrm8 from '../assets/hrm8.png';
import hrm9 from '../assets/hrm9.png';
import hrm10 from '../assets/hrm10.png';
import ecommerce1 from '../assets/E1.png';
import ecommerce2 from '../assets/E2.png';
import ecommerce3 from '../assets/E3.png';
import ecommerce4 from '../assets/E4.png';

// All CTAs go to WhatsApp
const WA_PROD = '919500181230';
const openWA_Prod = (msg) =>
  window.open(`https://wa.me/${WA_PROD}?text=${encodeURIComponent(msg)}`, '_blank');

const compackProduct = {
  name: 'Inventory System',
  category: 'Inventory Node',
  description: 'Inventory management project developed for efficient product tracking, real-time stock visibility, billing, quotation management, and streamlined warehouse operations, helping businesses manage inventory movement, monitor stock levels, generate invoices, handle quotations, and improve overall operational efficiency through a centralized and user-friendly system with secure data management and advanced reporting features for better business decision-making.',
  tools: ['React.js', 'FastAPI', 'Uvicorn', 'Pydantic', 'Docker', 'REST API'],
  images: [compack1, compack2, compack3, compack4, compack5, compack6, compack7]
};

const hrmProduct = {
  name: 'HRM Software',
  category: 'HRM Node',
  description: 'The HRMS software is a centralized system used to manage employee attendance, payroll, leave requests, tasks, and overall company operations efficiently. It provides separate dashboards and access controls for Administrator, HR, Manager, Team Lead, and Employee roles to improve workflow and productivity. The system also automates salary processing, attendance tracking, leave approvals, project monitoring, and secure payslip generation for better organizational management.',
  tools: ['React.js', 'vite', 'Java', 'Spring Boot ', 'JWT', 'JavaMailSender ', 'MySQL', 'MySQL Workbench'],
  images: [hrm1, hrm2, hrm3, hrm4, hrm5, hrm6, hrm7, hrm8, hrm9, hrm10]
};

const ecommerceProduct = {
  name: 'Smart E-commerce',
  category: 'E-commerce Node',
  description: 'The Smart E-Commerce Billing & Inventory Management System automates billing, inventory, customer management, GST calculation, and invoice generation for retail businesses. It provides secure Admin and Cashier dashboards with real-time stock tracking, sales analytics, and low stock alerts. The system helps improve business efficiency, reduce manual errors, and simplify daily store operations. It also enables fast and secure invoice processing with professional business management features.',
  tools: ['React.js', 'Java', 'Spring Boot', 'MySQL', 'JWT', 'iText PDF ', 'Swagger','Postman','Docker','REST API'],
  images: [ecommerce1, ecommerce2, ecommerce3, ecommerce4]
};

const ProductsPage = () => {
  const { content } = useContent();
  const cms = content.products;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [compackImageIndex, setCompackImageIndex] = useState(0);
  const [hrmImageIndex, setHrmImageIndex] = useState(0);
  const [ecommerceImageIndex, setEcommerceImageIndex] = useState(0);
  const [activeInventoryCard, setActiveInventoryCard] = useState(0);

  useEffect(() => {
    fetch('/api/public/products')
      .then(res => res.json())
      .then(data => { setProducts(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, []);

  useEffect(() => {
    const compackTimer = setInterval(() => {
      setCompackImageIndex((currentIndex) => (currentIndex + 1) % compackProduct.images.length);
    }, 2500);
    const hrmTimer = setInterval(() => {
      setHrmImageIndex((currentIndex) => (currentIndex + 1) % hrmProduct.images.length);
    }, 2500);
    const ecommerceTimer = setInterval(() => {
      setEcommerceImageIndex((currentIndex) => (currentIndex + 1) % ecommerceProduct.images.length);
    }, 2500);

    return () => {
      clearInterval(compackTimer);
      clearInterval(hrmTimer);
      clearInterval(ecommerceTimer);
    };
  }, []);

  useEffect(() => {
    const inventoryCardTimer = setInterval(() => {
      setActiveInventoryCard((currentIndex) => (currentIndex + 1) % 3);
    }, 10000);

    return () => clearInterval(inventoryCardTimer);
  }, []);

  const inventoryCards = [
    { ...hrmProduct, imageIndex: hrmImageIndex },
    { ...compackProduct, imageIndex: compackImageIndex },
    { ...ecommerceProduct, imageIndex: ecommerceImageIndex }
  ];

  const showPreviousInventoryCard = () => {
    setActiveInventoryCard((currentIndex) =>
      currentIndex === 0 ? inventoryCards.length - 1 : currentIndex - 1
    );
  };

  const showNextInventoryCard = () => {
    setActiveInventoryCard((currentIndex) =>
      currentIndex === inventoryCards.length - 1 ? 0 : currentIndex + 1
    );
  };

  const staticDNA = [
    { icon: <FaBolt />, title: "Quantum Sync", desc: "Low-latency data kernels for high-speed enterprise nodes synchronized globally." },
    { icon: <FaShieldAlt />, title: "Zero-Trust Mesh", desc: "Multi-layered identity validation nodes ensure secure cluster environments." },
    { icon: <FaSync />, title: "Immutable Sync", desc: "System logs mirrored on private ledgers for audit accuracy." }
  ];
  const architecturalDNA = staticDNA.map((d, i) => ({
    ...d,
    title: cms?.dna?.items?.[i]?.title ?? d.title,
    desc:  cms?.dna?.items?.[i]?.desc  ?? d.desc,
  }));

  const staticRoadmapSteps = [
    { id: "01", t: "Technical Discovery", d: "Identifying scaling bottlenecks in current tech stacks." },
    { id: "02", t: "Architecture Build", d: "Designing customized clusters for production load." },
    { id: "03", t: "Mesh Integration", d: "Securing nodes and performing vulnerability scans." },
    { id: "04", t: "Global Activation", d: "Zero-downtime deployment across global nodes." }
  ];
  const RoadmapSteps = staticRoadmapSteps.map((s, i) => ({
    ...s,
    t: cms?.roadmap?.steps?.[i]?.label ?? s.t,
    d: cms?.roadmap?.steps?.[i]?.desc  ?? s.d,
  }));

  const staticReviews = [
    { id: 1, name: "Karthik R.", role: "HR Operations Lead", text: "The HRM software made attendance, leave approvals, payroll checks, and employee records much easier to manage from one dashboard.", rating: 5 },
    { id: 2, name: "Meena S.", role: "Warehouse Manager", text: "The inventory system helped our team track stock, billing, quotations, and product movement without depending on manual sheets.", rating: 5 },
    { id: 3, name: "Rahul V.", role: "Retail Business Owner", text: "Smart E-commerce gave us a clean product catalog, faster billing, stock alerts, and simple order handling for daily store operations.", rating: 5 }
  ];
  const reviews = (cms?.reviews?.items?.length ? cms.reviews.items : staticReviews);

  return (
    <div className="font-sans text-slate-900 bg-gradient-to-br from-indigo-50 via-white to-purple-50 min-h-screen pt-24 pb-16">

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-block py-1.5 px-4 rounded-full bg-white text-indigo-600 font-semibold tracking-wide text-xs mb-6 border border-indigo-100 shadow-sm">
            {cms?.hero?.badge || 'Product Hub Node Activated'}
          </span>

          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight font-heading" style={{ whiteSpace: 'pre-line' }}>
            {cms?.hero?.headline || <>Future-Proof <br/><span className="text-black">Product Disruptors</span></>}
          </h1>

          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed mb-10 font-medium">
            {cms?.hero?.description || 'We build high-performance software nodes designed for enterprise stability. Deploy disruptive kernels globally with zero-latency sync.'}
          </p>

          <div className="flex justify-center">
            <button
              onClick={() => document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' })}
              className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-semibold text-sm transition-all shadow-xl hover:bg-slate-900 hover:-translate-y-1"
            >
              Explore Inventory
            </button>
          </div>
        </motion.div>
      </div>

      {/* CORE DNA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {architecturalDNA.map((node, i) => (
            <motion.div key={i} whileHover={{ y: -5 }} className="bg-white/70 backdrop-blur-md p-10 rounded-[2.5rem] border border-white transition-all group hover:shadow-2xl text-center">
              <div className="text-2xl text-indigo-600 mb-6 flex justify-center group-hover:scale-110 transition-transform">
                {node.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-3 tracking-tight">
                {node.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">
                {node.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* PROCESS — Animated Roadmap */}
      <div className="mb-32">
        <AnimatedRoadmap
          title="Deployment Lifecycle"
          subtitle="Agile Activation Sync Nodes — from discovery to global deployment."
          accent="bg-indigo-500"
          steps={[
            { icon: <FaSearch />,      label: 'Technical Discovery', desc: 'Identifying scaling bottlenecks in current tech stacks.',           color: 'bg-indigo-600' },
            { icon: <FaLayerGroup />,  label: 'Architecture Build',   desc: 'Designing customized clusters for production load.',               color: 'bg-violet-600' },
            { icon: <FaShieldAlt />,   label: 'Mesh Integration',     desc: 'Securing nodes and performing vulnerability scans.',              color: 'bg-blue-600'   },
            { icon: <FaGlobe />,       label: 'Global Activation',    desc: 'Zero-downtime deployment across global nodes.',                   color: 'bg-cyan-600'   },
          ]}
        />
      </div>

      {/* INVENTORY */}
      <div id="inventory" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="text-center mb-20 px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
            Active Inventory
          </h2>
          <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full"></div>
        </div>

        {loading ? (
          <div className="text-center py-20 text-indigo-600 font-medium animate-pulse text-sm">
            Syncing Ledger...
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((item) => (
              <motion.div key={item._id} whileHover={{ y: -5 }} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all h-full flex flex-col group">
                <div className="h-56 bg-slate-50 rounded-3xl overflow-hidden mb-8 relative shadow-inner">
                  <img 
                    src={item.image || "https://images.unsplash.com/photo-1460925895917-afdab827c52f"} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt="" 
                  />
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-tight">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-600 font-medium leading-relaxed mb-6 border-l-4 border-indigo-100 pl-4">
                  {item.description}
                </p>

                <div className="bg-indigo-50 p-5 rounded-2xl mb-8 flex justify-between items-center border border-indigo-100">
                  <span className="text-xs font-medium text-indigo-400">
                    Monthly sync
                  </span>
                  <span className="text-lg font-bold text-indigo-700">
                    {item.price || "$299"}/mo
                  </span>
                </div>

                <div className="grid gap-3 mt-auto">
                  <button
                    onClick={() => openWA_Prod(`Hello DVein Team, I am interested in launching a trial for: ${item.name}`)}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:bg-slate-900 transition-all flex items-center justify-center gap-2"
                  >
                    <FaPlayCircle className="text-base" /> Launch Trial
                  </button>
                  <button
                    onClick={() => openWA_Prod(`Hello DVein Team, I want member access for: ${item.name}`)}
                    className="w-full py-3 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:border-indigo-400 transition-all"
                  >
                    <FaLock className="text-indigo-600" /> Member Access
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden">
              <motion.div
                className="flex"
                animate={{ x: `-${activeInventoryCard * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 24 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) showNextInventoryCard();
                  if (info.offset.x > 80) showPreviousInventoryCard();
                }}
              >
                {inventoryCards.map((item) => (
                  <div key={item.name} className="min-w-full px-1">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -5 }}
                      className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all overflow-hidden flex flex-col group h-full"
                    >
                      <div className="h-[300px] sm:h-[380px] md:h-[520px] overflow-hidden relative bg-slate-50 p-3 sm:p-4 md:p-5 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                          <motion.img
                            key={item.images[item.imageIndex]}
                            src={item.images[item.imageIndex]}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.45 }}
                            className="max-w-full max-h-full w-auto h-auto object-contain rounded-2xl select-none"
                            alt={item.name}
                            draggable="false"
                          />
                        </AnimatePresence>
                        <div className="absolute top-5 left-5">
                          <span className="bg-white/95 px-4 py-2 rounded-lg text-[10px] font-extrabold text-indigo-600 uppercase shadow-sm border border-indigo-50">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-8 flex-grow flex flex-col">
                        <h3 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight font-heading">
                          {item.name}
                        </h3>

                        <p className="text-sm text-slate-500 font-medium mb-6 leading-relaxed border-l-2 border-indigo-100 pl-4">
                          {item.description}
                        </p>

                        <div className="flex flex-wrap gap-2 mt-auto">
                          {item.tools.map((tool) => (
                            <span key={tool} className="bg-slate-50 text-slate-600 px-3 py-1 rounded-md text-[9px] font-extrabold uppercase tracking-tight">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>

            <div className="flex justify-center items-center gap-2 mt-8">
              {inventoryCards.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveInventoryCard(index)}
                  aria-label={`Show ${item.name}`}
                  className={`h-2.5 rounded-full transition-all ${
                    activeInventoryCard === index ? 'w-8 bg-indigo-600' : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* TESTIMONIALS */}
      <section className="py-32 bg-white/40 border-y border-white backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm mb-6 border border-indigo-50">
              <FaGoogle className="text-red-500 text-lg" />
              <span className="font-medium text-slate-700 text-sm">
                {cms?.reviews?.googleBadge || 'Rated 5.0 Google Reviews'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              {cms?.reviews?.heading || 'Loved by Global Partners'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <motion.div key={review.id} whileHover={{ y: -5 }} className="bg-white p-12 rounded-[2.5rem] border border-slate-100 shadow-sm transition-all relative flex flex-col hover:shadow-2xl">
                <FaQuoteLeft className="text-indigo-400/10 text-6xl absolute top-8 right-10" />
                <div className="flex gap-1 text-yellow-400 mb-8">
                  {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                </div>
                <p className="text-slate-600 mb-10 text-sm leading-relaxed font-medium">
                  "{review.text}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">
                      {review.name}
                    </h4>
                    <p className="text-xs text-indigo-400 font-medium tracking-wide">
                      {review.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-16 tracking-tight">
          {cms?.faq?.heading || 'Product Logs'}
        </h2>
        <div className="space-y-4">
          {(cms?.faq?.items?.length ? cms.faq.items : [
            {q: "Is Cluster Redundancy Standard?", a: "Every enterprise node comes with automated backups by default." },
            {q: "Custom AI Cluster Sync?", a: "Nodes support seamless third-party AI/ML integration." },
            {q: "Activation Cycle Window?", a: "Full activation usually takes less than 48 hours." }
          ]).map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
              <button 
                onClick={() => setActiveAccordion(activeAccordion === index ? null : index)} 
                className="w-full flex justify-between items-center p-6 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-all"
              >
                <span className="text-sm">{faq.q}</span>
                {activeAccordion === index 
                  ? <FaChevronUp className="text-indigo-600"/> 
                  : <FaChevronDown className="text-slate-300"/>}
              </button>

              <AnimatePresence>
                {activeAccordion === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: "auto", opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }} 
                    className="bg-slate-50 px-8 pb-8 text-sm text-slate-600 font-medium leading-relaxed border-l-4 border-indigo-600 ml-6"
                  >
                    {faq.a}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
        <button
          onClick={() => openWA_Prod('Hello DVein Team, I want to request a custom node activation for your product.')}
          className="bg-slate-900 text-white px-10 py-5 rounded-xl font-semibold text-sm transition-all shadow-2xl hover:bg-indigo-600 hover:-translate-y-1"
        >
          Request Custom Node Activation <FaArrowRight className="inline ml-3" />
        </button>
        <p className="mt-12 text-xs font-medium text-slate-300 tracking-wide">
          Â© 2026 DVEIN â¢ PRODUCT INFRASTRUCTURE
        </p>
      </div>
    </div>
  );
};

export default ProductsPage;
