import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLaptopCode, FaBriefcase } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const TrainingHighlights = () => {
  const [activeTab, setActiveTab] = useState('internship');
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetch('/api/public/trainings')
      .then(res => res.json())
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  }, []);

  const filteredData = trainings.filter(item => item.category === activeTab);

  return (
    <section className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row justify-between items-center md:items-end mb-12 gap-6 text-center md:text-left"
        >
          <div className="w-full md:w-auto">
            <h2 className="text-3xl font-bold text-gray-900 font-heading">Upskill with <span className="text-blue-600">DVein</span></h2>
            <p className="text-gray-600 mt-2">Explore our extensive range of programs.</p>
          </div>

          <div className="flex bg-gray-100 p-1.5 rounded-xl shadow-inner">
            <button
              onClick={() => setActiveTab('internship')}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'internship' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaBriefcase /> Internships
            </button>
            <button
              onClick={() => setActiveTab('course')}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all flex items-center gap-2 ${activeTab === 'course' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <FaLaptopCode /> Courses
            </button>
          </div>
        </motion.div>

        <Swiper
          key={activeTab}
          slidesPerView={1}
          spaceBetween={25}
          loop={filteredData.length > 3}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper swiper-with-nav !pb-14 !px-8"
        >
          {filteredData.length > 0 ? (
            filteredData.map((item, idx) => (
              <SwiperSlide key={item._id} className="h-auto py-2">
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl border border-gray-200 hover:border-blue-400 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group h-full flex flex-col w-full"
                >
                  <div className="h-44 bg-gray-100 relative overflow-hidden shrink-0">
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    ) : (
                      <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-300 text-4xl"><FaLaptopCode /></div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm border border-gray-100">
                      {item.tag}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 font-heading line-clamp-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                    <div className="mt-auto">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4 font-medium">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs uppercase tracking-wide">&#x23F1; {item.duration}</span>
                      </div>
                      <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-bold py-2 rounded-lg transition-all duration-300 text-sm">
                        View Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))
          ) : (
            <div className="text-center w-full py-10 text-gray-500">No programs found yet. Add from Admin Panel.</div>
          )}
        </Swiper>

      </div>
    </section>
  );
};
export default TrainingHighlights;
