import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft, FaGoogle } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { useContent } from '../context/ContentContext';

const defaultReviews = [
  { id: 1, name: "Sriram K.", role: "Data Science Intern", text: "The internship gave me practical exposure to real datasets. I contributed to an actual AI project, not just dummy tasks.", rating: 5 },
  { id: 2, name: "Divya R.", role: "Client - E-commerce", text: "DVein team delivered our mobile app way ahead of schedule. The UI is stunning and exactly what we envisioned.", rating: 5 },
  { id: 3, name: "Arun Vijay", role: "Full Stack Student", text: "Best place to learn MERN stack. Mentors are working professionals, teaching industry standards.", rating: 5 },
  { id: 4, name: "Priya M.", role: "Client - Healthcare", text: "They built a complex patient management system for us. Very secure and scalable.", rating: 5 },
  { id: 5, name: "Karthik S.", role: "Java Trainee", text: "Started with zero knowledge, now I can build full applications. The hands-on approach changed everything for me.", rating: 4 },
  { id: 6, name: "TechSolutions", role: "Corporate Client", text: "Reliable development partner. They handle our cloud infrastructure efficiently.", rating: 5 },
];

const Testimonials = () => {
  const { content } = useContent();
  const cms = content.testimonials;
  const reviews = (cms?.reviews?.length ? cms.reviews : defaultReviews);

  return (
    <section className="py-20 ai-gradient-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            whileHover={{ scale: 1.04 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-5 py-2 rounded-full shadow-sm mb-4 border border-white/50 cursor-pointer"
          >
            <FaGoogle className="text-red-500 text-xl" />
            <span className="font-bold text-black">{cms?.googleRating || 'Rated 5.0 on Google Reviews'}</span>
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-black font-heading">
            {cms?.heading || 'Loved by Clients & Students'}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            loop={true}
            centeredSlides={false}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 30 },
              1280: { slidesPerView: 3, spaceBetween: 30 },
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper swiper-with-nav !pb-16 !px-8"
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={review.id} className="h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.06 }}
                  whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,86,210,0.12)' }}
                  className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-sm border border-white hover:border-dveinBlue/50 transition-all duration-300 relative h-full flex flex-col group"
                >
                  <FaQuoteLeft className="text-dveinBlue/10 text-6xl absolute top-6 right-6 group-hover:text-dveinBlue/20 transition-colors" />
                  <div className="flex gap-1 text-yellow-400 mb-6 text-lg">
                    {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <p className="text-black mb-8 italic relative z-10 text-base leading-relaxed flex-grow">"{review.text}"</p>
                  <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-dveinBlue to-cyan-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-bold text-black text-base font-heading">{review.name}</h4>
                      <p className="text-xs text-black font-medium">{review.role}</p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

      </div>
    </section>
  );
};

export default Testimonials;
