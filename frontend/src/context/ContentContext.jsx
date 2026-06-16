import React, { createContext, useContext, useState, useEffect } from 'react';

// ─── PERSISTENT STORAGE (localStorage + IndexedDB fallback) ──────────────────
const IDB_NAME = 'dvein_cms_db';
const IDB_STORE = 'content';
const IDB_KEY   = 'dvein_cms_content';

const idbSave = (data) => new Promise((resolve) => {
  try {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = (e) => e.target.result.createObjectStore(IDB_STORE);
    req.onsuccess = (e) => {
      const tx = e.target.result.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(data, IDB_KEY);
      tx.oncomplete = () => resolve(true);
      tx.onerror    = () => resolve(false);
    };
    req.onerror = () => resolve(false);
  } catch { resolve(false); }
});

const idbLoad = () => new Promise((resolve) => {
  try {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = (e) => e.target.result.createObjectStore(IDB_STORE);
    req.onsuccess = (e) => {
      const tx = e.target.result.transaction(IDB_STORE, 'readonly');
      const get = tx.objectStore(IDB_STORE).get(IDB_KEY);
      get.onsuccess = () => resolve(get.result ?? null);
      get.onerror   = () => resolve(null);
    };
    req.onerror = () => resolve(null);
  } catch { resolve(null); }
});

const idbClear = () => new Promise((resolve) => {
  try {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onsuccess = (e) => {
      const tx = e.target.result.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(IDB_KEY);
      tx.oncomplete = () => resolve(true);
      tx.onerror    = () => resolve(false);
    };
    req.onerror = () => resolve(false);
  } catch { resolve(false); }
});

const safeStringify = (data) => {
  const seen = new WeakSet();
  return JSON.stringify(data, (key, value) => {
    if (value instanceof Node || value instanceof Window) return undefined;
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return undefined;
      seen.add(value);
    }
    return value;
  });
};

const persistContent = (data) => {
  const json = safeStringify(data);
  // ── 1. Local cache ──────────────────────────────────────────────────────────
  try {
    localStorage.setItem('dvein_cms_content', json);
  } catch {
    // localStorage full (likely large base64 images) — fall back to IndexedDB
    try { localStorage.removeItem('dvein_cms_content'); } catch {}
    idbSave(data);
  }
  // ── 2. Backend sync (only when logged in as admin) ─────────────────────────
  try {
    const token = localStorage.getItem('adminToken');
    if (token) {
      fetch('/api/public/cms/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
        body: json,
      }).catch((err) => console.warn('CMS backend sync failed:', err));
    }
  } catch {}
};

const loadPersistedContent = async () => {
  try {
    const ls = localStorage.getItem('dvein_cms_content');
    if (ls) return JSON.parse(ls);
  } catch {}
  // Try IndexedDB fallback
  return await idbLoad();
};

export const defaultContent = {
  // ─── HOME PAGE ────────────────────────────────────────────────────────────
  hero: {
    slides: [
      { id: 1, image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=100&w=2070&auto=format&fit=crop", smallTag: "Welcome to DVein Innovations", title: "Empowering Innovation through Technology", description: "Your partner for custom software solutions and engineering training.", primaryBtn: "Explore Services", primaryLink: "/student-projects", secondaryBtn: "Contact Us", secondaryLink: "/contact" },
      { id: 2, image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=100&w=2070&auto=format&fit=crop", smallTag: "Software Solutions", title: "Custom Software built for Business Growth", description: "We build digital ecosystems. From Web and Mobile Apps to AI/ML solutions.", primaryBtn: "View Solutions", primaryLink: "/services/software", secondaryBtn: "Get a Quote", secondaryLink: "/contact" },
      { id: 3, image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=100&w=2070&auto=format&fit=crop", smallTag: "Training and Development", title: "Shaping Future Tech Leaders", description: "Industry-relevant training programs designed by experts for students.", primaryBtn: "View Courses", primaryLink: "/services/courses", secondaryBtn: "Apply Internship", secondaryLink: "/training" }
    ]
  },
  welcome: {
    tagline: "Who We Are",
    heading: "Welcome To DVein Innovations",
    paragraph: "We are a dynamic team of passionate tech professionals and educators. We don't just build software; we build careers. Our mission is to bridge the gap between Industry Requirements and Academic Learning.",
    ctaText: "Read Our Story",
    ctaLink: "/our-story",
    card1Title: "Software Development",
    card1Desc: "Building scalable Web & Mobile applications, AI solutions, and Cloud infrastructure for modern businesses.",
    card2Title: "Skill Development",
    card2Desc: "Providing hands-on internships and industry-standard training to shape the next generation of engineers."
  },
  stats: [
    { id: 1, name: 'Projects Completed', value: '500+' },
    { id: 2, name: 'Students Trained',   value: '2000+' },
    { id: 3, name: 'Happy Clients',      value: '50+' },
    { id: 4, name: 'Years of Innovation',value: '2+' }
  ],
  howWeDo: {
    tagline: "Our Process",
    heading: "How We Make It Happen",
    steps: [
      { id: '01', title: 'Discovery',   desc: 'We analyze your requirements and brainstorm the best technical approach.' },
      { id: '02', title: 'Design',      desc: 'Creating intuitive UI/UX prototypes that align with your brand identity.' },
      { id: '03', title: 'Development', desc: 'Our experts build robust, scalable solutions using cutting-edge technology.' },
      { id: '04', title: 'Launch',      desc: 'Testing, deployment, and post-launch support to ensure success.' }
    ]
  },
  whyChooseUs: {
    heading: "Why Choose DVein?",
    subheading: "Our journey has just begun, and we're excited to grow alongside our clients and learners.",
    features: [
      { name: 'Innovative Approach',        desc: 'We believe in learning by doing and delivering value through every line of code.' },
      { name: 'Industry-Relevant Training', desc: 'Curriculum designed by experts to meet current market demands.' },
      { name: 'Student & Client-Focused',   desc: 'Dedicated support for both business growth and student career development.' },
      { name: 'Affordable Solutions',       desc: 'Top-tier tech solutions and education at accessible price points.' }
    ]
  },
  testimonials: {
    heading: "Loved by Clients & Students",
    googleRating: "Rated 5.0 on Google Reviews",
    reviews: [
      { id: 1, name: "Sriram K.",     role: "Data Science Intern",  text: "The internship gave me practical exposure to real datasets. I contributed to an actual AI project, not just dummy tasks.", rating: 5 },
      { id: 2, name: "Divya R.",      role: "Client - E-commerce",  text: "DVein team delivered our mobile app way ahead of schedule. The UI is stunning and exactly what we envisioned.", rating: 5 },
      { id: 3, name: "Arun Vijay",    role: "Full Stack Student",   text: "Best place to learn MERN stack. Mentors are working professionals, teaching industry standards.", rating: 5 },
      { id: 4, name: "Priya M.",      role: "Client - Healthcare",  text: "They built a complex patient management system for us. Very secure and scalable.", rating: 5 },
      { id: 5, name: "Karthik S.",    role: "Java Trainee",         text: "Started with zero knowledge, now I can build full applications. The hands-on approach changed everything for me.", rating: 4 },
      { id: 6, name: "TechSolutions", role: "Corporate Client",     text: "Reliable development partner. They handle our cloud infrastructure efficiently.", rating: 5 }
    ]
  },
  footer: {
    address: "Alpha City IT Park, No.25, OMR,\nNavalur, Chennai - 600130",
    phone: "+91 95001 81230",
    email: "info@dveininnovations.com",
    copyright: "DVein Innovations. All Rights Reserved."
  },

  // ─── MEET THE CREW ────────────────────────────────────────────────────────
  meetTeam: {
    eyebrow: "Our People",
    heading: "Meet the Crew",
    members: [
      { id: 1,  name: "Ms. Gopika Ayyavu",    role: "Founder & CEO",           image: "dir.jpeg"         },
      { id: 2,  name: "Mr. Logesh",           role: "Manager Director",        image: "manager.jpeg"     },
      { id: 3,  name: "Ms. Sahana",           role: "Executive Head",          image: "executive.jpeg"   },
      { id: 4,  name: "Ms. Jayasri",          role: "HR Executive",            image: "jayasri.jpeg"     },
      { id: 5,  name: "Ms. Aruna",            role: "HR",                      image: "aruna.jpeg"       },
      { id: 6,  name: "Ms. Gowsalya",         role: "Data Analyst",            image: "kaviya.jpeg"      },
      { id: 7,  name: "Mr. Navin",            role: "Software Developer",      image: "navin.png"        },
      { id: 8,  name: "Mr. Selvamani",        role: "Software Developer",      image: "selvamani.jpeg"   },
      { id: 9,  name: "Mr. Muniyappan",       role: "Data Analyst",            image: "munik.jpeg"       },
      { id: 10, name: "Mr. Sidharraj",        role: "Business Analyst",        image: "sidhar.jpeg"      },
      { id: 11, name: "Mr. Yasik",            role: "Devops Engineer",         image: "yasik.png"        },
      { id: 12, name: "Mr. Suriya",           role: "Data Science Engineer",   image: "suriya.jpeg"      },
      { id: 13, name: "Mr. Nivash",           role: "Software Developer",      image: "nivash.jpeg"      },
      { id: 14, name: "Mr. Prasanth",         role: "Software Developer",      image: "prasanth.jpeg"    },
      { id: 15, name: "Mr. Arsal",            role: "Software Developer",      image: "arsal.png"        },
    ]
  },

  // ─── INTERNSHIPS PAGE ─────────────────────────────────────────────────────
  internships: {
    hero: {
      badge: "Internships",
      headline: "Stop Learning Syntax.\nStart Building Projects.",
      description: "Join the internship program designed by IT Professionals. Mastering the tech through intense execution and real-world deployment.",
      applyBtn: "Apply Now",
      exploreBtn: "Explore Tracks"
    },
    marquee: "200+ Students • 100+ Projects • 20+ Courses •",
    domainsHeading: "Choose Your Internships",
    domainsSubheading: "Great courses built for high-performance careers.",
    domains: [
      { _id: 1,  title: "Full Stack Java",               iconName: "FaCode",            color: "text-blue-600",    desc: "Build enterprise-grade applications with Java, Spring Boot, REST APIs, and scalable backend systems.",      skills: ["Java", "Spring Boot", "REST API", "MySQL"] },
      { _id: 2,  title: "Full Stack Python",              iconName: "FaCode",            color: "text-green-600",   desc: "End-to-end Python development using Django, FastAPI, and modern frontend integration.",                   skills: ["Python", "Django", "FastAPI", "PostgreSQL"] },
      { _id: 3,  title: "Data Science and AI",            iconName: "FaBrain",           color: "text-purple-600",  desc: "Explore data pipelines, statistical modelling, and AI-driven applications using Python and real datasets.", skills: ["Python", "Pandas", "Statistics", "Visualization"] },
      { _id: 4,  title: "AI & Machine Learning",          iconName: "FaRobot",           color: "text-indigo-600",  desc: "Supervised, unsupervised, and deep learning models built for real production deployments.",                skills: ["TensorFlow", "PyTorch", "Scikit-learn", "LLMs"] },
      { _id: 5,  title: "Data Analytics",                 iconName: "FaChartBar",        color: "text-teal-600",    desc: "Transform raw data into actionable insights using SQL, Excel, Power BI, and Tableau.",                   skills: ["SQL", "Excel", "Power BI", "Tableau"] },
      { _id: 6,  title: "Business Analytics",             iconName: "FaChartLine",       color: "text-orange-600",  desc: "Drive strategic decisions through data-driven business modelling, KPIs, and BI dashboards.",             skills: ["Strategy", "BI Tools", "KPIs", "Reporting"] },
      { _id: 7,  title: "Software Testing",                iconName: "FaBug",             color: "text-purple-600",  desc: "Manual and automated testing, test case design, and QA methodologies for production-grade software.",   skills: ["Manual Testing", "Selenium", "Postman", "Test Plans"] },
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
      heading: "What will you master?",
      subheading: "Our curriculum is engineered backward from industry hiring requirements.",
      web: [
        { _id: 1, week: "Week 1-2", title: "HTML, CSS",           desc: "JavaScript V8 Engine internals, Async architecture, and DOM manipulation." },
        { _id: 2, week: "Week 3-5", title: "JAVASCRIPT",          desc: "Building scalable APIs with Node.js, Express, and Database Design patterns." },
        { _id: 3, week: "Week 6-8", title: "BOOTSTRAP",           desc: "Advanced React hooks, Redux, Next.js SSR, and deploying to AWS EC2." }
      ],
      ai: [
        { _id: 1, week: "Week 1-2", title: "Python & Statistics", desc: "Advanced Python structures, NumPy, Pandas, and Linear Algebra for ML." },
        { _id: 2, week: "Week 3-5", title: "Machine Learning",    desc: "Supervised Learning, Scikit-learn, and model evaluation metrics." },
        { _id: 3, week: "Week 6-8", title: "Deep Learning & LLMs",desc: "Neural Networks, Transformers, and building RAG applications." }
      ]
    },
    projects: {
      heading: "Industry Portfolio",
      items: [
        { _id: 1, title: "AI-Powered SaaS",  tag: "Full Stack", desc: "Build a subscription-based SaaS platform integrated with OpenAI API." },
        { _id: 2, title: "Crypto Exchange",   tag: "Web3",       desc: "Real-time trading engine with WebSockets and high-frequency data handling." },
        { _id: 3, title: "Autonomous Agents", tag: "AI/ML",      desc: "Create AI agents that can browse the web and perform tasks automatically." }
      ]
    },
    faqs: [
      { _id: 1, question: "Is this beginner friendly?",        answer: "Yes, but be ready to work hard. We start from zero but move fast." },
      { _id: 2, question: "Do you provide placement support?", answer: "We have 20+ hiring partners. If you clear our assessments, we refer you directly." },
      { _id: 3, question: "What is the duration?",             answer: "The internship class runs for 1 Month to 3 Months." }
    ]
  },

  // ─── PRODUCTS PAGE ────────────────────────────────────────────────────────
  products: {
    hero: {
      badge: "Product Hub Node Activated",
      headline: "Future-Proof\nProduct Disruptors",
      description: "We build high-performance software nodes designed for enterprise stability. Deploy disruptive kernels globally with zero-latency sync.",
      exploreBtn: "Explore Inventory",
      docsBtn: "Technical Docs"
    },
    dna: {
      heading: "Core Architecture",
      items: [
        { title: "Quantum Sync",      desc: "Low-latency data kernels for high-speed enterprise nodes synchronized globally." },
        { title: "Zero-Trust Mesh",   desc: "Multi-layered identity validation nodes ensure secure cluster environments." },
        { title: "Immutable Sync",    desc: "System logs mirrored on private ledgers for audit accuracy." }
      ]
    },
    roadmap: {
      title: "Deployment Lifecycle",
      subtitle: "Agile Activation Sync Nodes — from discovery to global deployment.",
      steps: [
        { label: "Technical Discovery", desc: "Identifying scaling bottlenecks in current tech stacks." },
        { label: "Architecture Build",  desc: "Designing customized clusters for production load." },
        { label: "Mesh Integration",    desc: "Securing nodes and performing vulnerability scans." },
        { label: "Global Activation",   desc: "Zero-downtime deployment across global nodes." }
      ]
    },
    reviews: {
      heading: "Trusted by Leading Enterprises",
      googleBadge: "Rated 5.0 on Google Reviews",
      items: [
        { id: 1, name: "Rajesh M.",      role: "Tech Lead",              text: "DVein's product solutions are enterprise-grade and highly scalable. Excellent support team.", rating: 5 },
        { id: 2, name: "Neha Sharma",    role: "CTO - FinTech",          text: "Their AI integration capabilities transformed our data processing pipeline. Highly recommended.", rating: 5 },
        { id: 3, name: "Vikram Singh",   role: "Product Manager",        text: "Working with DVein has been a game-changer for our development velocity and code quality.", rating: 5 }
      ]
    },
    faq: {
      heading: "Product Logs",
      items: [
        { q: "Is Cluster Redundancy Standard?", a: "Every enterprise node comes with automated backups by default." },
        { q: "Custom AI Cluster Sync?",         a: "Nodes support seamless third-party AI/ML integration." },
        { q: "Activation Cycle Window?",        a: "Full activation usually takes less than 48 hours." }
      ]
    }
  },

  // ─── STUDENT PROJECTS PAGE ────────────────────────────────────────────────
  studentProjects: {
    hero: {
      badge: "Innovation Hub Activated",
      headline: "Engineering The Future.\nOne Project Node at a Time.",
      description: "Bridging the gap between theoretical syntax and physical deployment. Our student ecosystem is architected for industrial mastery.",
      pdfBtn: "Download Project Ledger (PDF)",
      pdfLink: "/DVein_Projects_List.pdf"
    },
    stats: [
      { _id: 1, label: "Hardware Nodes",    count: "250+" },
      { _id: 2, label: "Software Clusters", count: "190+" },
      { _id: 3, label: "IoT Mesh Systems",  count: "110+" },
      { _id: 4, label: "Patent Drafts",     count: "30+"  }
    ],
    whyHeading: "Why Students Choose DVein.",
    whyFeatures: [
      { _id: 1, title: "Industrial Component Inventory",    desc: "Access production-grade hardware nodes like ESP32-S3, STM32 Nucleo, and industrial sensors. Build with actual hardware used in factories." },
      { _id: 2, title: "Enterprise Full-Stack Integration", desc: "Our unique methodology focuses on connecting physical hardware to massive cloud clusters using MERN stack and MQTT protocols for real-time telemetry." },
      { _id: 3, title: "Production-Grade Prototyping",      desc: "Beyond breadboards. We guide students through professional PCB design, custom 3D enclosures, and industrial wiring standards for market-ready products." },
      { _id: 4, title: "Secure Deployment Logic",           desc: "Every software node is built with MVC architecture, JWT-based security sync, and scalable database management." },
      { _id: 5, title: "IP & Patent Mentorship",            desc: "Innovative projects are mentored for potential patent drafting, ensuring your intellectual property meets industrial standards for global commercialization." },
      { _id: 6, title: "Hybrid System Architecture",        desc: "Learn to architect complex systems that involve seamless cross-platform communication between mobile apps, web dashboards, and embedded nodes." }
    ],
    hardware: {
      heading: "The Hardware\nNode Inventory.",
      image: "https://images.unsplash.com/photo-1555664424-778a1e5e1b48?q=80&w=2070",
      badgeText: "Node Active Sync",
      nodes: ["Dual-Core ESP32", "LoRa SX1278", "Biometric Nodes", "RTOS Kernels", "STM32 Bluepill", "Telemetry Hub"]
    },
    repository: {
      heading: "Project Repository.",
      subtitle: "Active Knowledge Repository Hub",
      projects: [
        { _id: 1, category: "hardware",  title: "Smart Factory Predictive Maintenance", desc: "Industrial-grade vibration analysis node using ESP32. Identifies machinery failure before downtime with 98% accuracy.",                               tools: ["ESP32", "MPU6050", "MQTT", "Python"],       image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070" },
        { _id: 2, category: "software",  title: "Enterprise HRM AI Dashboard",          desc: "Cloud-native management ecosystem with automated biometric hardware sync. Engineered for global organization scalability.",                           tools: ["React", "Node.js", "MongoDB", "Redux"],     image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026" },
        { _id: 3, category: "embedded",  title: "Autonomous Hydroponics Node",          desc: "RTOS-based farming automation node that monitors pH/EC levels and controls nutrient dosing without human intervention.",                              tools: ["STM32", "FreeRTOS", "Sensors", "Nextion"],  image: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1974" },
        { _id: 4, category: "software",  title: "Blockchain Supply Chain Cluster",      desc: "Distributed ledger node for real-time asset tracking in international logistics, ensuring 100% data integrity.",                                     tools: ["Solidity", "Ether.js", "React", "Express"], image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?q=80&w=1973" },
        { _id: 5, category: "hardware",  title: "LoRa Emergency Mesh System",           desc: "Off-grid disaster management node that creates a private communication mesh over 10km using LoRa technology.",                                        tools: ["LoRa SX1278", "ESP32", "GPS", "Custom PCB"],image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070" },
        { _id: 6, category: "embedded",  title: "Biometric Door Lock Node",             desc: "Highly secure fingerprint and RFID based locking system with real-time logging via cloud dashboard.",                                                  tools: ["Arduino", "AS608 Fingerprint", "Node.js", "Firebase"], image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070" }
      ]
    },
    roadmap: {
      title: "The Innovation Execution Cycle",
      subtitle: "From raw idea to global-grade deployment — powered by real engineering discipline.",
      steps: [
        { _id: 1, label: "Ideation Node",  desc: "Conceptualizing disruptive frameworks and defining the problem worth solving." },
        { _id: 2, label: "Logic Mesh",     desc: "Designing decentralized architecture nodes, data flows, and system contracts." },
        { _id: 3, label: "Assembly Sync",  desc: "Building production-grade prototypes with peer reviews and quality gates." },
        { _id: 4, label: "Global Deploy",  desc: "Final activation, CI/CD pipeline, and worldwide sync for maximum impact." }
      ]
    },
    cta: {
      heading: "Activate Your\nProject",
      description: "Join our next batch of student innovators and turn your ideas into physical industrial mastery.",
      buttonText: "Launch Project",
      whatsappNumber: "918667363896",
      whatsappMessage: "Hello DVein Team, I am interested in launching a project node."
    }
  },

  // ─── SOFTWARE SOLUTIONS PAGE ─────────────────────────────────────────────
  softwareSolutions: {
    hero: {
      badge: "ENGINEERING EXCELLENCE",
      headline: "Transforming Ideas into\nDigital Reality",
      description: "We are a full-cycle software development company. From conceptualization to deployment, we build robust, scalable, and secure digital products.",
      primaryBtn: "Start Your Project",
      secondaryBtn: "Explore Services",
    },
    services: [
      { _id: 1, title: "AI & Machine Learning",       desc: "Automate complex tasks with custom AI models, NLP for chatbots, and predictive analytics to forecast business trends." },
      { _id: 2, title: "Full Stack Development",      desc: "Scalable web portals using MERN (MongoDB, Express, React, Node) or Python-Django stacks tailored for high traffic." },
      { _id: 3, title: "Mobile App Development",      desc: "Native performance with cross-platform efficiency using Flutter & React Native. Apps that work flawlessly on iOS & Android." },
      { _id: 4, title: "Cloud Solutions (DevOps)",    desc: "End-to-end AWS/Azure architecture, serverless deployment, Docker/Kubernetes containerization, and CI/CD pipelines." },
      { _id: 5, title: "Data Engineering",            desc: "Transform raw data into actionable insights. Big Data processing, warehousing, and real-time visualization dashboards." },
      { _id: 6, title: "Cybersecurity & VAPT",        desc: "Comprehensive security audits, penetration testing, and compliance setups (GDPR/ISO) to protect your digital assets." },
    ],
    features: [
      { _id: 1, title: "Agile & Fast Delivery",       desc: "We use Agile methodology to deliver MVPs in weeks, not months. Regular updates ensure you are always in the loop." },
      { _id: 2, title: "24/7 Post-Launch Support",    desc: "Our relationship doesn't end at deployment. We provide round-the-clock maintenance and bug-fixing support." },
      { _id: 3, title: "Scalable Architecture",       desc: "We write code that grows with you. Our solutions are built to handle millions of users without breaking." },
      { _id: 4, title: "Clean & Modern Code",         desc: "We follow industry-best coding standards, ensuring your software is secure, maintainable, and bug-free." },
    ],
    industries: [
      { _id: 1, name: "EdTech",       desc: "LMS, Virtual Classrooms, Student Portals" },
      { _id: 2, name: "Healthcare",   desc: "Telemedicine, Appointment Booking, EHR Systems" },
      { _id: 3, name: "E-Commerce",   desc: "Multi-vendor Marketplaces, Payment Gateways" },
      { _id: 4, name: "Real Estate",  desc: "Property Listing, VR Tours, CRM Integration" },
    ],
    faqs: [
      { _id: 1, question: "How much does a custom software project cost?",  answer: "Cost depends on complexity. We offer flexible pricing models: Fixed Price for defined scopes, and Hourly for ongoing development. Contact us for a free quote." },
      { _id: 2, question: "How long does it take to build an app?",         answer: "A simple MVP can take 4-6 weeks. Complex enterprise solutions may take 3-6 months. We provide a detailed timeline during the discovery phase." },
      { _id: 3, question: "Do you provide source code ownership?",          answer: "Absolutely. Once the project is fully paid for, you own 100% of the source code and intellectual property." },
    ],
  },

  // ─── COURSES PAGE ─────────────────────────────────────────────────────────
  courses: {
    hero: {
      badge: "DVEIN TRAINING ACADEMY",
      headline: "Industry-Grade Training\nFor Real-World Careers",
      description: "Hands-on courses built by working engineers. Learn by building — not just watching.",
      primaryBtn: "Enroll Now",
      secondaryBtn: "Browse Courses",
    },
    courses: [
      { _id: 'sc1',  title: 'Full Stack Java',              tag: 'DEV',      description: 'Master enterprise-grade Java development with Spring Boot, REST APIs, and scalable backend architecture.' },
      { _id: 'sc2',  title: 'Full Stack Python',            tag: 'DEV',      description: 'Build end-to-end Python applications with Django, Flask, and modern frontend integration.' },
      { _id: 'sc3',  title: 'Data Science and AI',          tag: 'AI',       description: 'Explore data pipelines, statistical modeling, and AI-driven applications using Python and real datasets.' },
      { _id: 'sc4',  title: 'AI & Machine Learning',        tag: 'AI',       description: 'Deep dive into supervised, unsupervised, and reinforcement learning models for production deployments.' },
      { _id: 'sc5',  title: 'Data Analytics',               tag: 'DATA',     description: 'Transform raw data into actionable insights with advanced analytics tools and visualization techniques.' },
      { _id: 'sc6',  title: 'Business Analytics',           tag: 'BIZ',      description: 'Drive strategic decisions through data-driven business modeling, KPIs, and BI dashboards.' },
      { _id: 'sc7',  title: 'DevOps',                       tag: 'OPS',      description: 'CI/CD pipelines, containerization, and infrastructure automation for modern software delivery.' },
      { _id: 'sc8',  title: 'Cloud Computing',              tag: 'CLOUD',    description: 'Deploy, scale, and manage applications on AWS, Azure, and GCP with cloud-native best practices.' },
      { _id: 'sc9',  title: 'MERN Stack',                   tag: 'DEV',      description: 'Build full-stack web apps with MongoDB, Express, React, and Node.js in a cohesive workflow.' },
      { _id: 'sc10', title: 'UI/UX Design and Prototyping', tag: 'DESIGN',   description: 'Design intuitive user interfaces and interactive prototypes using Figma and design system principles.' },
      { _id: 'sc11', title: 'Web Development',              tag: 'DEV',      description: 'Core and advanced web development covering HTML, CSS, JavaScript, and modern frameworks.' },
      { _id: 'sc12', title: 'IOT',                          tag: 'HARDWARE', description: 'Connect physical devices to the internet with sensor integration, protocols, and cloud IoT platforms.' },
      { _id: 'sc13', title: 'Embedded Systems',             tag: 'HARDWARE', description: 'Program microcontrollers, real-time systems, and low-level hardware interfaces for embedded applications.' },
      { _id: 'sc14', title: 'Cybersecurity',                tag: 'SECURITY', description: 'Ethical hacking, threat analysis, and secure system design following OWASP and industry standards.' },
      { _id: 'sc15', title: 'Big Data Analytics',           tag: 'DATA',     description: 'Process and analyze massive datasets using Hadoop, Spark, and distributed computing frameworks.' },
      { _id: 'sc16', title: 'HR - Operations',              tag: 'HR',       description: 'Streamline HR workflows, talent acquisition, and workforce management with modern HR tools.' },
      { _id: 'sc17', title: 'HR - Marketing',               tag: 'HR',       description: 'Employer branding, talent marketing strategies, and HR communication for modern organizations.' },
      { _id: 'sc18', title: 'HR - Finance & Accounting',    tag: 'HR',       description: 'Payroll management, financial reporting, and accounting fundamentals for HR professionals.' },
      { _id: 'sc19', title: 'Digital Marketing',            tag: 'MARKETING',description: 'SEO, social media strategy, paid advertising, and analytics for impactful digital campaigns.' },
      { _id: 'sc20', title: 'Software Testing',             tag: 'QA',       description: 'Manual and automated testing, test case design, and QA methodologies for production software.' },
    ],
    features: [
      { _id: 1, title: "Learn by Building",    desc: "Every course includes real project work—not just tutorials. You ship code from day one." },
      { _id: 2, title: "Industry Mentors",     desc: "Courses designed and taught by working professionals with real industry experience." },
      { _id: 3, title: "Career Support",       desc: "Resume reviews, mock interviews, and direct referrals to our hiring partner network." },
      { _id: 4, title: "Flexible Schedule",    desc: "Weekend and weekday batches. Online and offline options available for all courses." },
    ],
    faqs: [
      { _id: 1, question: "Are these courses beginner-friendly?",   answer: "Yes. Most courses start from basics and build up to advanced topics progressively." },
      { _id: 2, question: "Will I get a certificate?",              answer: "Yes, DVein issues course completion certificates recognized by our hiring partner network." },
      { _id: 3, question: "How do I enroll?",                       answer: "Click 'Enroll Now' on any course card or contact us via WhatsApp for instant assistance." },
    ],
  },

  // ─── OUR STORY PAGE ───────────────────────────────────────────────────────
  ourStory: {
    badge: "The DVein Story",
    headline: "Built from Passion.\nDriven by Purpose.",
    subheadline: "We didn't start as a company. We started as a team that refused to accept the gap between education and industry.",
    sections: [
      { _id: 1, heading: "Where It All Began",        body: "DVein Innovations was born in 2022 in Chennai, India. A small team of engineers and educators who believed that real learning happens when you build real things." },
      { _id: 2, heading: "The Problem We Solve",      body: "Students graduate with degrees but struggle to get jobs. Companies hire but can't find job-ready talent. We exist to fix that gap — one project, one internship, one engineer at a time." },
      { _id: 3, heading: "Our Mission",               body: "To empower the next generation of technology professionals by combining rigorous software development with industry-standard training programs." },
      { _id: 4, heading: "Where We Are Headed",       body: "Building a global talent ecosystem — connecting students in India with enterprises worldwide, and delivering software solutions that scale." },
    ],
    cta: { text: "Work With Us", link: "/contact" },
  },

  // ─── COLLABORATIONS PAGE ──────────────────────────────────────────────────
  collaborations: {
    hero: {
      badge: "GLOBAL PARTNERSHIP NETWORK",
      headline: "Building Tomorrow's\nTech Ecosystem Together",
      description: "We partner with enterprises, startups, and research institutions worldwide to co-create technology that scales.",
      primaryBtn: "Start a Collaboration",
    },
    metrics: [
      { _id: 1, label: "Enterprise Partners",       count: "45+" },
      { _id: 2, label: "Countries Served",          count: "12+" },
      { _id: 3, label: "Joint Projects Delivered",  count: "150+" },
      { _id: 4, label: "Uptime SLA",                count: "99.9%" },
    ],
    tiers: [
      { _id: 1, title: "Strategic Enterprise Alliance", desc: "A long-term partnership model designed for multinational enterprises seeking a reliable offshore technology backbone. We deliver dedicated development clusters, secure cloud infrastructure, and SLA-driven performance monitoring.", features: ["Dedicated Engineering Pods", "SLA-Backed Infrastructure", "Cross-Border Compliance", "Enterprise Support Desk"] },
      { _id: 2, title: "R&D Innovation Partnership",    desc: "A co-innovation framework for startups, labs, and product companies to jointly build next-gen solutions across IoT, Smart Manufacturing, AI, and Blockchain ecosystems.", features: ["Joint IP Ownership Models", "Rapid Prototyping Labs", "Secure Data Sandboxes", "Product Commercialization Support"] },
      { _id: 3, title: "Global Talent Synergy",         desc: "A talent bridge connecting verified student innovators and industry-ready engineers with international firms for project outsourcing, hiring pipelines, and digital transformation initiatives.", features: ["Vetted Developer Network", "Quality Assurance Gates", "Structured Onboarding", "Global Talent Pipelines"] },
    ],
    frameworkNodes: [
      { _id: 1, title: "Architecture Alignment",  detail: "We align our technical standards with your enterprise architecture to ensure seamless integration and long-term scalability." },
      { _id: 2, title: "Innovation Hub Cluster",  detail: "High-availability backend clusters with managed databases and global load balancing for international performance." },
      { _id: 3, title: "Financial Transparency",  detail: "Clear billing structures, milestone-based payouts, and automated financial audit synchronization." },
      { _id: 4, title: "Logistics Sync Engine",   detail: "Integrated APIs for cross-border operations, supply chain tracking, and partner coordination." },
      { _id: 5, title: "Neural Synergy Cloud",    detail: "Decentralized AI processing nodes for real-time analytics and localized data intelligence." },
      { _id: 6, title: "Resilience Shield",        detail: "Zero-trust security architecture with continuous vulnerability assessments and regulatory compliance." },
    ],
    faqs: [
      { _id: 1, question: "What industries do you collaborate with?",                  answer: "We work across fintech, edtech, healthtech, smart manufacturing, and enterprise SaaS. Our team adapts to sector-specific compliance and integration needs." },
      { _id: 2, question: "Is there a minimum engagement duration for partnerships?", answer: "Our Strategic Alliance model requires a minimum 6-month commitment. R&D and Talent Synergy programs can start with a 3-month pilot." },
      { _id: 3, question: "How do we get started?",                                   answer: "Reach out via WhatsApp or the contact form. Our partnerships team will schedule a discovery call within 48 hours." },
    ],
  },

  // ─── CAREER HUB PAGE ──────────────────────────────────────
  careerHub: {
    hero: {
      badge:       "Career Hub",
      heading:     "Build Your Career",
      description: "Upskill your career with DVein Innovations",
    },
    panels: [
      { _id: 1, tag: "CLIENT COMPANIES",  heading: "Recruitments", description: "Explore curated opportunities with our trusted clients. Roles in design, product, and growth teams.", image: "client-img.jpg" },
      { _id: 2, tag: "DVEIN INNOVATIONS", heading: "Recruitments", description: "Discover internal openings at DVein. Build products, systems, and strategy with our core team.",    image: "logo.png" },
    ],
    successStory: {
      heading:     "Our Success Story",
      description: "Real stories from real people who built their careers with DVein Innovations. Every image, video, and milestone shared here is a testament to what dedication and the right guidance can achieve.",
    },
    dna: {
      badge:   "Who We Are",
      heading: "OUR DNA",
      dots: [
        { _id: 1, label: "DREAM",    desc: "Ambition beyond features." },
        { _id: 2, label: "DESIGN",   desc: "Crafted systems, seamless journeys." },
        { _id: 3, label: "DELIVERY", desc: "Relentless launch and impact." },
      ],
    },
    contact: {
      heading:         "chat us",
      description:     "Send a quick message and we will connect you.",
      buttonText:      "WhatsApp the Team",
      whatsappNumber:  "918667363896",
      whatsappMessage: "Hello DVein Team, I would like to discuss career opportunities.",
    },
  },

  // ─── CLIENTS TICKER ─────────────────────────────────────────────
  clients: {
    heading: "Trusted by Industry Sectors",
    names: [
      "Information Technology & Software",
      "Healthcare",
      "EdTech",
      "Banking & Financial Services",
      "E-Commerce",
      "Manufacturing",
      "Logistics & Supply Chain",
      "Smart Farming",
      "HR Tech",
      "Real Estate & Construction",
    ],
  },

  // ─── CONTACT PAGE ──────────────────────────────────────────────────
  contact: {
    badge: "GET IN TOUCH",
    headline: "Let's Build Something\nAmazing Together",
    description: "Whether you have a project in mind, want to collaborate, or just want to say hello \u2014 we'd love to hear from you.",
    address: "Alpha City IT Park, No.25, OMR,\nNavalur, Chennai \u2013 600130",
    phone: "+91 95001 81230",
    email: "info@dveininnovations.com",
    hours: "Mon \u2013 Sat: 9 AM \u2013 7 PM IST",
    formHeading: "Send Us a Message",
    formSubheading: "Fill in the form and we'll get back to you within 24 hours.",
    submitBtn: "Send Message",
  },
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────────────────
const ContentContext = createContext(null);

const buildContent = (p) => {
  if (!p) return defaultContent;
  const merge = (key) => {
    if (!p[key]) return defaultContent[key];
    if (Array.isArray(defaultContent[key])) return p[key];
    return { ...defaultContent[key], ...p[key] };
  };
  return {
    hero:              { slides: p.hero?.slides || defaultContent.hero.slides },
    welcome:           merge('welcome'),
    stats:             p.stats || defaultContent.stats,
    howWeDo:           { ...merge('howWeDo'), steps: p.howWeDo?.steps || defaultContent.howWeDo.steps },
    whyChooseUs:       { ...merge('whyChooseUs'), features: p.whyChooseUs?.features || defaultContent.whyChooseUs.features },
    testimonials:      { ...merge('testimonials'), reviews: p.testimonials?.reviews || defaultContent.testimonials.reviews },
    footer:            merge('footer'),
    meetTeam:          p.meetTeam ? { ...defaultContent.meetTeam, ...p.meetTeam, members: Array.isArray(p.meetTeam.members) ? p.meetTeam.members : defaultContent.meetTeam.members } : defaultContent.meetTeam,
    internships:       p.internships       ? { ...defaultContent.internships,       ...p.internships       } : defaultContent.internships,
    products:          p.products          ? { ...defaultContent.products,          ...p.products          } : defaultContent.products,
    studentProjects:   p.studentProjects   ? { ...defaultContent.studentProjects,   ...p.studentProjects   } : defaultContent.studentProjects,
    softwareSolutions: p.softwareSolutions ? { ...defaultContent.softwareSolutions, ...p.softwareSolutions } : defaultContent.softwareSolutions,
    courses:           p.courses           ? { ...defaultContent.courses,           ...p.courses           } : defaultContent.courses,
    ourStory:          p.ourStory          ? { ...defaultContent.ourStory,          ...p.ourStory          } : defaultContent.ourStory,
    collaborations:    p.collaborations    ? {
      ...defaultContent.collaborations,
      ...p.collaborations,
      metrics:        p.collaborations.metrics        || defaultContent.collaborations.metrics,
      tiers:          p.collaborations.tiers          || defaultContent.collaborations.tiers,
      frameworkNodes: p.collaborations.frameworkNodes || defaultContent.collaborations.frameworkNodes,
      faqs:           p.collaborations.faqs           || defaultContent.collaborations.faqs,
    } : defaultContent.collaborations,
    careerHub:         p.careerHub ? {
      ...defaultContent.careerHub,
      ...p.careerHub,
      panels: p.careerHub.panels || defaultContent.careerHub.panels,
      dna: p.careerHub.dna ? { ...defaultContent.careerHub.dna, ...p.careerHub.dna, dots: p.careerHub.dna.dots || defaultContent.careerHub.dna.dots } : defaultContent.careerHub.dna,
    } : defaultContent.careerHub,
    clients:           defaultContent.clients,
    contact:           merge('contact'),
  };
};

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    // Synchronous first load from localStorage
    try {
      const saved = localStorage.getItem('dvein_cms_content');
      if (saved) return buildContent(JSON.parse(saved));
    } catch {}
    return defaultContent;
  });

  // On mount: 1) try backend (source of truth for all visitors)
  //            2) fall back to IndexedDB if localStorage was full
  useEffect(() => {
    (async () => {
      // ── Backend is the authoritative source ────────────────────────────────
      try {
        const res = await fetch('/api/public/cms/content');
        if (res.ok) {
          const data = await res.json();
          if (data && Object.keys(data).length > 0) {
            setContent(buildContent(data));
            // Update local cache so next page load is instant
            try { localStorage.setItem('dvein_cms_content', safeStringify(data)); } catch {}
            return;
          }
        }
      } catch {}
      // ── IndexedDB fallback (localStorage already loaded in useState) ───────
      try {
        const ls = localStorage.getItem('dvein_cms_content');
        if (ls) return;
      } catch {}
      const idb = await idbLoad();
      if (idb) setContent(buildContent(idb));
    })();
  }, []);

  const updateSection = (section, data) => {
    setContent(prev => {
      const updated = { ...prev, [section]: data };
      persistContent(updated);
      return updated;
    });
  };

  const resetSection = (section) => updateSection(section, defaultContent[section]);
  const resetAll = () => {
    try { localStorage.removeItem('dvein_cms_content'); } catch {}
    idbClear();
    setContent(defaultContent);
    // Also clear backend so visitors see defaults too
    try {
      const token = localStorage.getItem('adminToken');
      if (token) {
        fetch('/api/public/cms/content', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-admin-token': token },
          body: '{}',
        }).catch(() => {});
      }
    } catch {}
  };

  return (
    <ContentContext.Provider value={{ content, updateSection, resetSection, resetAll, defaultContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within <ContentProvider>');
  return ctx;
};
