import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { motion } from 'framer-motion';
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedinIn, 
  FaInstagram, FaWhatsapp, FaArrowRight, FaClock, FaCheckCircle 
} from 'react-icons/fa';

const WA_OTHER = '918667363896';

const Contact = () => {
  const { content } = useContent();
  const cms = content.contact;
  const [formState, setFormState] = useState({ name: '', email: '', service: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'

  const handleContact = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    // Build WhatsApp message
    const waText = [
      `*New Contact Message — DVein Innovations*`,
      ``,
      `*Name:* ${formState.name}`,
      `*Email:* ${formState.email}`,
      `*Service:* ${formState.service || 'General Enquiry'}`,
      `*Message:* ${formState.message}`,
      ``,
      `_Sent from DVein Website_`,
    ].join('\n');

    // Also try backend (silent)
    try {
      const data = new FormData();
      data.append('name', formState.name);
      data.append('email', formState.email);
      data.append('service', formState.service || 'General Enquiry');
      data.append('message', formState.message);
      await fetch('/api/public/contact', {
        method: 'POST', body: data, signal: AbortSignal.timeout(5000),
      });
    } catch (error) {
      console.warn('Could not save contact message to backend before opening WhatsApp.', error);
    }

    // Open WhatsApp
    window.open(`https://wa.me/${WA_OTHER}?text=${encodeURIComponent(waText)}`, '_blank');
    setSubmitStatus('success');
    setFormState({ name: '', email: '', service: '', message: '' });
    setSubmitting(false);
  };

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVars = {
    hidden: { y: 30, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] overflow-hidden relative font-sans selection:bg-dveinBlue selection:text-white">
      
      {/* Abstract Background Elements (Gen Z Glows) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-dveinBlue/5 rounded-full blur-[100px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-dveinGreen/5 rounded-full blur-[100px] -z-10 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        
        {/* === 1. HERO SECTION === */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block py-1 px-4 rounded-full bg-white border border-gray-200 text-dveinBlue text-xs font-bold tracking-[0.2em] uppercase mb-6 shadow-sm">
            {cms?.badge || 'Available for New Projects'}
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 font-heading" style={{ whiteSpace: 'pre-line' }}>
            {cms?.headline
              ? cms.headline.replace(/\\n/g, '\n')
              : <>Let's Build the <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-dveinBlue via-blue-500 to-dveinGreen">Future Together</span></>
            }
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {cms?.description || 'Whether you have a groundbreaking idea or need technical expertise, we are here to turn your vision into reality.'}
          </p>
        </motion.div>

        {/* === 2. BENTO GRID (CONTACT INFO) === */}
        <motion.div 
          variants={containerVars}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {/* Card 1: Sales */}
          <motion.div variants={itemVars} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-dveinBlue/30 transition-all duration-300 group">
             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-dveinBlue text-xl mb-6 group-hover:scale-110 transition-transform">
                <FaPhoneAlt />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Talk to Sales</h3>
             <p className="text-gray-500 mb-6 text-sm">Interested in our services? Just pick up the phone to chat with a member of our sales team.</p>
             <a href={`tel:${(cms?.phone || '+919500181230').replace(/\s/g, '')}`} className="text-lg font-bold text-dveinBlue hover:underline flex items-center gap-2">
                {cms?.phone || '+91 95001 81230'} <FaArrowRight className="text-sm"/>
             </a>
          </motion.div>

          {/* Card 2: Support */}
          <motion.div variants={itemVars} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-dveinGreen/30 transition-all duration-300 group">
             <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-dveinGreen text-xl mb-6 group-hover:scale-110 transition-transform">
                <FaEnvelope />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Email Support</h3>
             <p className="text-gray-500 mb-6 text-sm">Sometimes you need a little help from your friends. Or a support rep. Don't worry… we're here for you.</p>
             <a href={`mailto:${cms?.email || 'info@dveininnovations.com'}`} className="text-lg font-bold text-dveinGreen hover:underline flex items-center gap-2">
                {cms?.email || 'info@dveininnovations.com'} <FaArrowRight className="text-sm"/>
             </a>
          </motion.div>

          {/* Card 3: Location */}
          <motion.div variants={itemVars} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-300 transition-all duration-300 group md:col-span-2 lg:col-span-1">
             <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 text-xl mb-6 group-hover:scale-110 transition-transform">
                <FaMapMarkerAlt />
             </div>
             <h3 className="text-2xl font-bold text-gray-900 mb-2">Visit HQ</h3>
             <p className="text-gray-500 mb-6 text-sm">{cms?.address || 'Alpha City IT Park, No.25, OMR, Navalur, Chennai – 600 130.'}</p>
             <a href="https://maps.google.com" target="_blank" className="text-lg font-bold text-blue-600 hover:underline flex items-center gap-2">
                Get Directions <FaArrowRight className="text-sm"/>
             </a>
          </motion.div>
        </motion.div>


        {/* === 3. THE FORM & PROCESS SECTION === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          
          {/* Left: Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-gray-100 relative overflow-hidden"
          >
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-dveinBlue to-dveinGreen"></div>
             
             <h2 className="text-3xl font-bold text-gray-900 mb-2">{cms?.formHeading || 'Send us a Message'}</h2>
             <p className="text-gray-500 mb-8">{cms?.formSubheading || 'We usually respond within 2 hours.'}</p>

             {/* Success message */}
             {submitStatus === 'success' && (
               <div className="flex flex-col items-center gap-3 py-10 text-center">
                 <FaCheckCircle className="text-5xl text-dveinGreen" />
                 <h3 className="text-2xl font-bold text-gray-900">WhatsApp Opened! ✅</h3>
                 <p className="text-gray-500 text-sm max-w-xs">
                   Your message is pre-filled in WhatsApp. Just tap <strong>Send</strong> to complete.
                 </p>
                 <button
                   onClick={() => setSubmitStatus(null)}
                   className="mt-4 px-6 py-2.5 bg-dveinBlue text-white rounded-xl font-bold text-sm hover:opacity-90 transition"
                 >
                   Send Another Message
                 </button>
               </div>
             )}

             {/* Error fallback */}
             {submitStatus === 'error' && (
               <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center mb-6">
                 <p className="text-red-700 font-bold text-sm mb-1">Couldn't send the message right now.</p>
                 <p className="text-red-500 text-xs">
                   Please email us directly at{' '}
                   <a href="mailto:info@dveininnovations.com" className="underline">info@dveininnovations.com</a>
                   {' '}or{' '}
                   <a href="https://wa.me/919500181230" className="underline" target="_blank" rel="noopener noreferrer">WhatsApp us</a>.
                 </p>
                 <button onClick={() => setSubmitStatus(null)} className="text-xs text-red-400 underline mt-3">Try again</button>
               </div>
             )}

             {!submitStatus && (
             <form onSubmit={handleContact} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Name *</label>
                      <input
                        type="text" required
                        value={formState.name}
                        onChange={e => setFormState(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-dveinBlue focus:ring-2 focus:ring-dveinBlue/10 transition-all"
                        placeholder="John Doe"
                      />
                   </div>
                   <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email *</label>
                      <input
                        type="email" required
                        value={formState.email}
                        onChange={e => setFormState(p => ({ ...p, email: e.target.value }))}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-dveinBlue focus:ring-2 focus:ring-dveinBlue/10 transition-all"
                        placeholder="john@example.com"
                      />
                   </div>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Service Interested In</label>
                   <select
                     value={formState.service}
                     onChange={e => setFormState(p => ({ ...p, service: e.target.value }))}
                     className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-dveinBlue focus:ring-2 focus:ring-dveinBlue/10 transition-all text-gray-600"
                   >
                      <option value="">Select Service</option>
                      <option>Web Development</option>
                      <option>Mobile App</option>
                      <option>AI Solutions</option>
                      <option>Internship / Training</option>
                      <option>Student Project</option>
                      <option>General Enquiry</option>
                   </select>
                </div>

                <div className="space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Message *</label>
                   <textarea
                     rows="4" required
                     value={formState.message}
                     onChange={e => setFormState(p => ({ ...p, message: e.target.value }))}
                     className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-dveinBlue focus:ring-2 focus:ring-dveinBlue/10 transition-all"
                     placeholder="Tell us about your project..."
                   ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-dveinBlue transition-colors shadow-lg hover:shadow-dveinBlue/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Sending…
                    </>
                  ) : (
                    <>{cms?.submitBtn || 'Send Message'} <FaArrowRight /></>
                  )}
                </button>
             </form>
             )}
          </motion.div>

          {/* Right: "What Happens Next?" Content */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="pt-10 lg:pl-10"
          >
             <h2 className="text-3xl font-bold text-gray-900 mb-8">What happens next?</h2>
             
             <div className="space-y-10 relative">
                {/* Connector Line */}
                <div className="absolute left-6 top-2 bottom-10 w-0.5 bg-gray-200"></div>

                {[
                   { title: "We Analyze Requirements", desc: "Our team reviews your project details and requirements thoroughly." },
                   { title: "Schedule a Discovery Call", desc: "We arrange a call to discuss your vision, timeline, and budget." },
                   { title: "Proposal & Strategy", desc: "We provide a detailed roadmap, technical architecture, and cost estimation." },
                   { title: "Project Kickoff", desc: "Once approved, we assemble the team and start building your dream." }
                ].map((step, index) => (
                   <div key={index} className="relative pl-16">
                      <div className="absolute left-0 top-0 w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center text-dveinBlue font-bold shadow-sm z-10">
                         {index + 1}
                      </div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>
                      <p className="text-gray-500 leading-relaxed">{step.desc}</p>
                   </div>
                ))}
             </div>

             {/* Social Proof Mini */}
             <div className="mt-12 bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                <p className="text-sm font-semibold text-gray-700 mb-4">Trusted by teams at:</p>
                <div className="flex flex-wrap gap-3 text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {['Startups', 'Agencies', 'Enterprises', 'Institutions'].map((t, i) => (
                    <span key={i} className="px-3 py-1 bg-white border border-gray-200 rounded-full">{t}</span>
                  ))}
                </div>
              </div>
          </motion.div>
        </div>
      </div>

    </div>
  );
};

export default Contact;
