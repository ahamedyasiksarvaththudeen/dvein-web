import React from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useContent } from '../context/ContentContext';

const teamAssets = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

const resolveTeamImage = (image) => {
  if (!image) return '';
  if (/^(data:|https?:|\/)/.test(image)) return image;
  return teamAssets[`../assets/${image}`] || image;
};

const MeetTeam = () => {
  const { content } = useContent();
  const cms = content?.meetTeam || {};
  const teamMembers = Array.isArray(cms.members) ? cms.members.filter(Boolean) : [];

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-dveinGreen mb-3">{cms.eyebrow || 'Our People'}</p>
          <h2 className="text-3xl md:text-4xl font-bold text-black font-heading">{cms.heading || 'Meet the crew'}</h2>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={22}
          loop={false}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 22 },
            1024: { slidesPerView: 3, spaceBetween: 28 },
          }}
          modules={[Autoplay, Pagination]}
          className="!pb-14 !px-2"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={member.id || index} className="h-auto">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-6 rounded-full bg-gradient-to-tr from-dveinBlue via-cyan-400 to-dveinGreen p-1.5 shadow-lg shadow-dveinBlue/10">
                  <div className="h-36 w-36 overflow-hidden rounded-full bg-gray-100 ring-4 ring-white sm:h-40 sm:w-40">
                    <img
                      src={resolveTeamImage(member.image)}
                      alt={member.name || 'Team member'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-black font-heading">{member.name || 'Team Member'}</h3>
                <p className="mt-2 text-sm font-semibold text-dveinBlue">{member.role || 'Role'}</p>
              </motion.article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default MeetTeam;
