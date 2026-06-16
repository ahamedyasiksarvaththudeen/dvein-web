import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FaIcons from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const getIcon = (iconName) => {
  const IconComponent = FaIcons[iconName];
  return IconComponent ? <IconComponent /> : <FaIcons.FaCode />;
};

const cardGradients = [
  'from-blue-100 via-blue-50 to-indigo-50',
  'from-emerald-100 via-green-50 to-teal-50',
  'from-purple-100 via-violet-50 to-fuchsia-50',
  'from-indigo-100 via-indigo-50 to-blue-50',
  'from-teal-100 via-cyan-50 to-sky-50',
  'from-orange-100 via-amber-50 to-yellow-50',
  'from-purple-100 via-violet-50 to-fuchsia-50',
  'from-sky-100 via-sky-50 to-blue-50',
  'from-cyan-100 via-blue-50 to-indigo-50',
  'from-pink-100 via-rose-50 to-fuchsia-50',
  'from-blue-100 via-sky-50 to-cyan-50',
  'from-green-100 via-emerald-50 to-teal-50',
  'from-amber-100 via-yellow-50 to-orange-50',
  'from-red-100 via-rose-50 to-pink-50',
  'from-violet-100 via-purple-50 to-indigo-50',
  'from-slate-100 via-blue-50 to-indigo-50',
  'from-rose-100 via-pink-50 to-fuchsia-50',
  'from-emerald-100 via-teal-50 to-cyan-50',
  'from-orange-100 via-red-50 to-rose-50',
  'from-cyan-100 via-teal-50 to-emerald-50',
];

const marqueeStyle = `
  @keyframes marquee {
    0% { transform: translateX(0%); }
    100% { transform: translateX(-50%); }
  }
  .animate-marquee { animation: marquee 30s linear infinite; }
`;

const STATIC_DATA = {
  domains: [
    { _id: 1,  title: "Full Stack Java",               iconName: "FaCode",            color: "text-blue-600",    desc: "Build enterprise-grade applications with Java, Spring Boot, REST APIs, and scalable backend systems.",      skills: ["Java", "Spring Boot", "REST API", "MySQL"] },
    { _id: 2,  title: "Full Stack Python",              iconName: "FaCode",            color: "text-green-600",   desc: "End-to-end Python development using Django, FastAPI, and modern frontend integration.",                   skills: ["Python", "Django", "FastAPI", "PostgreSQL"] },
    { _id: 3,  title: "Data Science and AI",            iconName: "FaBrain",           color: "text-purple-600",  desc: "Explore data pipelines, statistical modelling, and AI-driven applications using Python and real datasets.", skills: ["Python", "Pandas", "Statistics", "Visualization"] },
    { _id: 4,  title: "AI & Machine Learning",          iconName: "FaRobot",           color: "text-indigo-600",  desc: "Supervised, unsupervised, and deep learning models built for real production deployments.",                skills: ["TensorFlow", "PyTorch", "Scikit-learn", "LLMs"] },
    { _id: 5,  title: "Data Analytics",                 iconName: "FaChartBar",        color: "text-teal-600",    desc: "Transform raw data into actionable insights using SQL, Excel, Power BI, and Tableau.",                   skills: ["SQL", "Excel", "Power BI", "Tableau"] },
    { _id: 6,  title: "Business Analytics",             iconName: "FaChartLine",       color: "text-orange-600",  desc: "Drive strategic decisions through data-driven business modelling, KPIs, and BI dashboards.",             skills: ["Strategy", "BI Tools", "KPIs", "Reporting"] },
    { _id: 7,  title: "Software Testing",               iconName: "FaBug",             color: "text-purple-600",  desc: "Manual and automated testing, test case design, and QA methodologies for production-grade software.",   skills: ["Manual Testing", "Selenium", "Postman", "Test Plans"] },
    { _id: 8,  title: "Cloud Computing",                iconName: "FaCloud",           color: "text-sky-600",     desc: "Deploy, scale, and manage applications on AWS, Azure, and GCP with cloud-native best practices.",        skills: ["AWS", "Azure", "GCP", "Terraform"] },
    { _id: 9,  title: "MERN Stack",                     iconName: "FaLayerGroup",      color: "text-blue-500",    desc: "Full-stack web apps with MongoDB, Express, React, and Node.js in a cohesive modern workflow.",           skills: ["MongoDB", "Express", "React", "Node.js"] },
    { _id: 10, title: "UI/UX Design and Prototyping",   iconName: "FaDraftingCompass", color: "text-pink-600",    desc: "Design intuitive user interfaces and interactive prototypes using Figma and design system principles.",    skills: ["Figma", "Prototyping", "Wireframes", "User Research"] },
    { _id: 11, title: "Web Development",                iconName: "FaGlobe",           color: "text-blue-600",    desc: "Core and advanced web development covering HTML, CSS, JavaScript, and modern frameworks.",               skills: ["HTML/CSS", "JavaScript", "React", "Responsive"] },
    { _id: 12, title: "IOT",                            iconName: "FaMicrochip",       color: "text-green-600",   desc: "Connect physical devices to the internet with sensor integration, protocols, and cloud IoT platforms.",   skills: ["Arduino", "MQTT", "Sensors", "Cloud IoT"] },
    { _id: 13, title: "Embedded Systems",               iconName: "FaMemory",          color: "text-amber-600",   desc: "Program microcontrollers, real-time systems, and low-level hardware interfaces for embedded applications.", skills: ["C/C++", "Microcontrollers", "RTOS", "PCB"] },
    { _id: 14, title: "Cybersecurity",                  iconName: "FaShieldAlt",       color: "text-red-600",     desc: "Ethical hacking, threat analysis, and secure system design following OWASP and industry standards.",      skills: ["Ethical Hacking", "OWASP", "Pen Testing", "SIEM"] },
    { _id: 15, title: "Big Data Analytics",             iconName: "FaDatabase",        color: "text-violet-600",  desc: "Process and analyse massive datasets using Hadoop, Spark, and distributed computing frameworks.",         skills: ["Hadoop", "Spark", "Hive", "Kafka"] },
    { _id: 16, title: "HR - Operations",                iconName: "FaUserTie",         color: "text-slate-600",   desc: "Streamline HR workflows, talent acquisition, and workforce management with modern HR tools.",            skills: ["Talent Acquisition", "HRMS", "Onboarding", "Compliance"] },
    { _id: 17, title: "HR - Marketing",                 iconName: "FaBullhorn",        color: "text-rose-600",    desc: "Employer branding, talent marketing strategies, and HR communication for modern organisations.",         skills: ["Employer Branding", "Recruitment Mktg", "LinkedIn", "Analytics"] },
    { _id: 18, title: "HR - Finance & Accounting",      iconName: "FaMoneyBillWave",   color: "text-emerald-600", desc: "Payroll management, financial reporting, and accounting fundamentals for HR professionals.",            skills: ["Payroll", "Tally", "Budgeting", "Compliance"] },
    { _id: 19, title: "Digital Marketing",              iconName: "FaBullseye",        color: "text-orange-500",  desc: "SEO, paid advertising, social media strategy, and analytics for impactful digital campaigns.",          skills: ["SEO", "Google Ads", "Social Media", "Analytics"] },
    { _id: 20, title: "DevOps",                         iconName: "FaCogs",            color: "text-slate-600",   desc: "CI/CD pipelines, containerisation, and infrastructure automation for modern software delivery.",         skills: ["Docker", "CI/CD", "Kubernetes", "Jenkins"] },
  ],
  curriculum: {
    web: [
      { _id: 1, week: "Week 1-2", title: "HTML,CSS",        desc: "Javascript V8 Engine internals, Async architecture, and DOM manipulation." },
      { _id: 2, week: "Week 3-5", title: "JAVASCRIPT",   desc: "Building scalable APIs with Node.js, Express, and Database Design patterns." },
      { _id: 3, week: "Week 6-8", title: "BOOTSTRAP", desc: "Advanced React hooks, Redux, Next.js SSR, and deploying to AWS EC2." },
    ],
    ai: [
      { _id: 1, week: "Week 1-2", title: "Python & Statistics",        desc: "Advanced Python structures, NumPy, Pandas, and Linear Algebra for ML." },
      { _id: 2, week: "Week 3-5", title: "Machine Learning",  desc: "Supervised Learning, Scikit-learn, and model evaluation metrics." },
      { _id: 3, week: "Week 6-8", title: "Deep Learning & LLMs",  desc: "Neural Networks, Transformers, and building RAG applications." },
    ],
  },
  projects: [
    { _id: 1, title: "AI-Powered SaaS",  tag: "Full Stack", desc: "Build a subscription-based SaaS platform integrated with OpenAI API." },
    { _id: 2, title: "Crypto Exchange",   tag: "Web3",       desc: "Real-time trading engine with WebSockets and high-frequency data handling." },
    { _id: 3, title: "Autonomous Agents", tag: "AI/ML",      desc: "Create AI agents that can browse the web and perform tasks automatically." },
  ],
  faqs: [
    { _id: 1, question: "Is this beginner friendly?",        answer: "Yes, but be ready to work hard. We start from zero but move fast." },
    { _id: 2, question: "Do you provide placement support?", answer: "We have 20+ hiring partners. If you clear our assessments, we refer you directly." },
    { _id: 3, question: "What is the duration?",             answer: "The internship class runs for 1 Month to 3 Months." },
  ],
};

const Training = () => {
  const { content } = useContent();
  const cms = content.internships;

  const [activeTab, setActiveTab] = useState('web');
  const [activeAccordion, setActiveAccordion] = useState(null);
  const [data, setData] = useState(STATIC_DATA);

  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '', portfolio: '', jobTitle: ''
  });
  const [resume, setResume] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const WA_NUMBER = '918667363896';

  useEffect(() => {
    fetch('/api/public/training-page')
      .then(res => res.json())
      .then(apiData => { setData(apiData); })
      .catch(error => {
        console.warn('Could not load training page from backend.', error);
      });
  }, []);

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    const waText = [
      `*New Internship Application — DVein Innovations*`,
      ``,
      `*Name:* ${formData.firstName} ${formData.lastName}`,
      `*Email:* ${formData.email}`,
      `*Phone:* ${formData.phone}`,
      `*Applying For internship:* ${formData.jobTitle}`,
      `*Portfolio:* ${formData.portfolio || 'Not provided'}`,
      ``,
      `_Sent from DVein Website_`,
    ].join('\n');

    try {
      const dataToSend = new FormData();
      Object.keys(formData).forEach(key => dataToSend.append(key, formData[key]));
      if (resume) dataToSend.append('resume', resume);
      await fetch('/api/public/apply', {
        method: 'POST',
        body: dataToSend,
        signal: AbortSignal.timeout(5000),
      });
    } catch (error) {
      console.warn('Could not save internship application to backend before opening WhatsApp.', error);
    }

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`, '_blank');

    setSubmitStatus('success');
    setFormData({ firstName: '', lastName: '', email: '', phone: '', portfolio: '', jobTitle: '' });
    setResume(null);
    e.target.reset();
    setSubmitting(false);
  };

  return (
    <div className="font-sans text-gray-900 bg-gradient-to-br from-blue-50 via-white to-blue-50 min-h-screen pt-24 overflow-x-hidden selection:bg-blue-500 selection:text-white relative">
      <style>{marqueeStyle}</style>

      {/* HERO */}
      <div className="relative min-h-[70vh] flex flex-col justify-center pb-12 overflow-hidden px-6">
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block py-1 px-3 rounded-full bg-white border border-blue-100 text-blue-600 text-xs font-bold tracking-wider mb-4 shadow-sm uppercase">{cms?.hero?.badge || 'Internships'}</span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900 font-heading">
              Stop Learning Syntax <br />
              <span className="text-black">Start Building Projects</span>
            </h1>
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
              {cms?.hero?.description || 'Join the internship program designed by IT Professionals. Mastering the tech through intense execution and real-world deployment.'}
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() => document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg hover:bg-blue-700 transition-all"
              >Apply Now</button>
              <button
                onClick={() => document.getElementById('domains').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3.5 bg-white text-gray-800 border border-gray-200 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all"
              >Explore Tracks</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* MARQUEE */}
      <div className="bg-white/50 backdrop-blur-sm py-8 border-y border-white z-20 relative overflow-hidden">
        <div className="animate-marquee inline-block whitespace-nowrap">
          {[1,2,3].map(i => (
            <span key={i} className="mx-10 text-gray-900 font-black text-xl uppercase tracking-tighter">
              1000+ Students &bull; 500+ Projects &bull; 20+ Courses &bull;
            </span>
          ))}
        </div>
      </div>

      {/* DOMAINS */}
      <div id="domains" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-gray-900">{cms?.domainsHeading || 'Choose Your Internships'}</h2>
            <p className="text-gray-500 font-medium">{cms?.domainsSubheading || 'Great courses built for high-performance careers.'}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {(cms?.domains?.length ? cms.domains : data.domains)?.map((domain, index) => (
              <motion.div key={domain._id} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: (index % 5) * 0.08 }} className={`bg-gradient-to-br ${cardGradients[index % cardGradients.length]} border border-white/80 rounded-[1.5rem] p-6 hover:shadow-xl transition-all group flex flex-col`}>
                <div className={`w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-2xl ${domain.color} mb-6 group-hover:scale-110 transition-transform`}>{getIcon(domain.iconName)}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{domain.title}</h3>
                <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">{domain.desc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {domain.skills?.map((s, i) => <span key={i} className="px-2.5 py-1 bg-white border border-gray-100 rounded-lg text-[10px] font-bold text-gray-500 uppercase">{s}</span>)}
                </div>
                <button
                  onClick={() => document.getElementById('apply-section').scrollIntoView({ behavior: 'smooth' })}
                  className="mt-auto inline-flex items-center gap-2 text-blue-600 font-black text-xs uppercase tracking-widest"
                >Apply Now <FaIcons.FaArrowRight /></button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* APPLICATION FORM */}
      <div id="apply-section" className="py-24 max-w-4xl mx-auto px-6">
        <div className="bg-white p-8 md:p-14 rounded-[2.5rem] shadow-2xl border border-blue-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-500 rounded-t-[2.5rem]" />

          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-3">Apply Now</h2>
            <p className="text-gray-400 text-sm font-medium">
              Fill the form — WhatsApp will open with your details ready to send.
            </p>
          </div>

          {submitStatus === 'success' && (
            <div className="flex flex-col items-center gap-4 py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center text-green-500 text-4xl">
                <FaIcons.FaWhatsapp />
              </div>
              <h3 className="text-2xl font-black text-gray-900">WhatsApp Opened! ✅</h3>
              <p className="text-gray-500 text-sm max-w-sm leading-relaxed">
                Your application details are pre-filled in WhatsApp.<br />
                <strong className="text-gray-700">Just tap Send</strong> to complete your application.
              </p>
              <a
                href={`https://wa.me/${WA_NUMBER}`}
                target="_blank" rel="noopener noreferrer"
                className="mt-2 flex items-center gap-2 bg-green-500 text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-600 transition shadow"
              >
                <FaIcons.FaWhatsapp className="text-lg" /> Open WhatsApp Again
              </a>
              <button onClick={() => setSubmitStatus(null)} className="mt-1 text-xs text-gray-400 underline">
                Submit another application
              </button>
            </div>
          )}

          {!submitStatus && (
            <form onSubmit={handleApply} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">First Name *</label>
                  <input
                    type="text" required
                    value={formData.firstName}
                    onChange={e => setFormData(p => ({ ...p, firstName: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    placeholder="Arjun"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Last Name *</label>
                  <input
                    type="text" required
                    value={formData.lastName}
                    onChange={e => setFormData(p => ({ ...p, lastName: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    placeholder="Kumar"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email" required
                    value={formData.email}
                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    placeholder="arjun@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phone Number *</label>
                  <input
                    type="tel" required
                    value={formData.phone}
                    onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Applying For internship *</label>
                <select
                  required
                  value={formData.jobTitle}
                  onChange={e => setFormData(p => ({ ...p, jobTitle: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm text-gray-700"
                >
                  <option value="">-- Select a track --</option>
                  <option value="Full Stack Java">Full Stack Java</option>
                  <option value="Full Stack Python">Full Stack Python</option>
                  <option value="Data Science and AI">Data Science and AI</option>
                  <option value="AI & Machine Learning">AI &amp; Machine Learning</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Business Analytics">Business Analytics</option>

                  <option value="Cloud Computing">Cloud Computing</option>
                  <option value="MERN Stack">MERN Stack</option>
                  <option value="UI/UX Design and Prototyping">UI/UX Design and Prototyping</option>
                  <option value="Web Development">Web Development</option>
                  <option value="IOT">IOT</option>
                  <option value="Embedded Systems">Embedded Systems</option>
                  <option value="Cybersecurity">Cybersecurity</option>
                  <option value="Big Data Analytics">Big Data Analytics</option>
                  <option value="HR - Operations">HR - Operations</option>
                  <option value="HR - Marketing">HR - Marketing</option>
                  <option value="HR - Finance & Accounting">HR - Finance &amp; Accounting</option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Software Testing">Software Testing</option>
                  <option value="DevOps">DevOps</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Portfolio / LinkedIn / GitHub <span className="text-gray-300 font-normal">(optional)</span>
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={e => setFormData(p => ({ ...p, portfolio: e.target.value }))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                  placeholder="https://github.com/yourname"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Resume <span className="text-gray-300 font-normal">(optional, PDF/DOC)</span>
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={e => setResume(e.target.files[0])}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-blue-500 transition-all text-sm text-gray-600 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-700"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-base hover:bg-blue-700 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                    Opening WhatsApp...
                  </>
                ) : (
                  <><FaIcons.FaWhatsapp className="text-lg" /> Submit via WhatsApp</>
                )}
              </button>

              <p className="text-center text-xs text-gray-400">
                WhatsApp will open with your details pre-filled. Just tap Submit to complete.
              </p>
            </form>
          )}
        </div>
      </div>


      {/* FAQ */}
      <div className="py-20 max-w-3xl mx-auto px-6">
        <div className="space-y-3">
          {(cms?.faqs?.length ? cms.faqs : data.faqs)?.map((faq, index) => (
            <div key={faq._id} className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setActiveAccordion(activeAccordion === index ? null : index)} className="w-full flex justify-between items-center p-5 text-left font-bold text-sm text-gray-800">
                {faq.question}
                {activeAccordion === index ? <FaIcons.FaChevronUp className="text-blue-600" /> : <FaIcons.FaChevronDown className="text-gray-400" />}
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
