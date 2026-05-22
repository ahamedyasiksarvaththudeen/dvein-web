import React from 'react';
import { motion } from 'framer-motion';
import { useContent } from '../context/ContentContext';

const defaultStats = [
  { id: 1, name: 'Projects Completed', value: '200+' },
  { id: 2, name: 'Students Trained', value: '500+' },
  { id: 3, name: 'Happy Clients', value: '50+' },
  { id: 4, name: 'Years of Innovation', value: '2+' },
];

const Stats = () => {
  const { content } = useContent();
  const stats = (content.stats?.length ? content.stats : defaultStats);
  return (
    <div className="bg-white py-12 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-y-10 gap-x-8 text-center lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mx-auto flex flex-col gap-y-2 p-6 rounded-2xl bg-gray-50 border border-gray-100 hover:shadow-xl hover:shadow-dveinBlue/10 transition-all w-full"
            >
              <dd className="order-first text-4xl font-bold tracking-tight text-dveinBlue sm:text-5xl">
                {stat.value}
              </dd>
              <dt className="text-base leading-7 text-black font-semibold">{stat.name}</dt>
            </motion.div>
          ))}
        </dl>
      </div>
    </div>
  );
};

export default Stats;
