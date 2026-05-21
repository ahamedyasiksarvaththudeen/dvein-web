import React from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb, FaChalkboardTeacher, FaUsers, FaHandHoldingUsd } from 'react-icons/fa';
import { useContent } from '../context/ContentContext';

const staticFeatures = [
  { name: 'Innovative Approach', desc: 'We believe in learning by doing and delivering value through every line of code.', icon: FaLightbulb, color: 'text-yellow-500', bg: 'bg-yellow-50' },
  { name: 'Industry-Relevant Training', desc: 'Curriculum designed by experts to meet current market demands.', icon: FaChalkboardTeacher, color: 'text-blue-600', bg: 'bg-blue-50' },
  { name: 'Student & Client-Focused', desc: 'Dedicated support for both business growth and student career development.', icon: FaUsers, color: 'text-green-600', bg: 'bg-green-50' },
  { name: 'Affordable Solutions', desc: 'Top-tier tech solutions and education at accessible price points.', icon: FaHandHoldingUsd, color: 'text-blue-600', bg: 'bg-blue-50' },
];

const WhyChooseUs = () => {
  const { content } = useContent();
  const cms = content.whyChooseUs;
  const features = staticFeatures.map((f, i) => ({
    ...f,
    name: cms?.features?.[i]?.name ?? f.name,
    desc: cms?.features?.[i]?.desc ?? f.desc,
  }));

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-black mb-4 font-heading">
            {cms?.heading || <>Why Choose <span className="text-black">DVein?</span></>}
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto">
            {cms?.subheading || "Our journey has just begun, and we're excited to grow alongside our clients and learners."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="p-6 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all bg-white group"
            >
              <div className={`w-16 h-16 ${feature.bg} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`text-3xl ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">{feature.name}</h3>
              <p className="text-black text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
