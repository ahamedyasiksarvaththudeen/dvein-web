import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Custom CSS to refine pagination and navigation
const styles = `
  .swiper-pagination {
    position: static !important;
    margin-top: 1.5rem;
  }
  .swiper-pagination-bullet {
    background: #CBD5E1; 
    opacity: 1;
    width: 8px;
    height: 8px;
    transition: all 0.3s ease;
  }
  .swiper-pagination-bullet-active {
    background: #2563EB;
    width: 20px;
    border-radius: 4px;
  }
  .swiper-button-next, .swiper-button-prev {
    color: #1F2937; 
    width: 30px;
    height: 30px;
  }
  .swiper-button-next:after, .swiper-button-prev:after {
    font-size: 1.2rem;
    font-weight: bold;
  }
`;

const ServiceHighlights = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetch('/api/public/services')
      .then(res => res.json())
      .then(data => setServices(data))
      .catch(err => console.error(err));
  }, []);

  const getIcon = (iconName) => {
    const Icon = FaIcons[iconName];
    return Icon ? <Icon /> : <FaIcons.FaCode />;
  };

  return (
    <div className="py-16 bg-gray-50">
      <style>{styles}</style>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-extrabold text-black tracking-tight sm:text-4xl">Our Expertise</h2>
          <p className="mt-3 max-w-2xl mx-auto text-lg text-black sm:mt-4">
            Solutions tailored for your business growth.
          </p>
        </motion.div>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={20} // Reduced space between slides
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, el: '.custom-pagination' }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1280: { slidesPerView: 3, spaceBetween: 30 },
          }}
          className="swiper-with-nav pb-4 !px-10"
        >
          {services.map((service, idx) => (
            <SwiperSlide key={service._id} className="h-auto py-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.07 }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.10)' }}
                className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
              >
                
                {/* IMAGE SECTION - Reduced Height */}
                <div className="relative h-40 w-full bg-gray-100 flex-shrink-0 overflow-hidden">
                   {service.image ? (
                       <img 
                         src={service.image} 
                         alt={service.title} 
                         className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                       />
                   ) : (
                       <div className="w-full h-full bg-gradient-to-br from-blue-50 to-blue-50 flex items-center justify-center text-4xl text-blue-500">
                          {getIcon(service.iconName)}
                       </div>
                   )}
                </div>

                {/* CONTENT SECTION - More Compact */}
                <div className="flex flex-col flex-grow p-5">
                  <div className="flex items-start justify-between mb-2">
                     <div className="flex items-center gap-2">
                        <span className="text-blue-600 text-lg">{getIcon(service.iconName)}</span>
                        <h3 className="text-lg font-bold text-black line-clamp-1">{service.title}</h3>
                     </div>
                  </div>
                  
                  <p className="text-sm text-black leading-relaxed line-clamp-3 mb-4 flex-grow">
                    {service.desc}
                  </p>
                  
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <Link 
                      to={service.link || '/contact'} 
                      className="inline-flex items-center text-xs font-bold text-blue-600 uppercase tracking-wide hover:text-blue-700 transition-colors group"
                    >
                        Know More 
                        <FaIcons.FaArrowRight className="ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>

              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Dots Container */}
        <div className="custom-pagination flex justify-center mt-6"></div>
      </div>
    </div>
  );
};
export default ServiceHighlights;
