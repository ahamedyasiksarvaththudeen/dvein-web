import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useContent } from '../context/ContentContext';

const teamAssets = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });

const PLACEHOLDER = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" fill="%23e5e7eb"/><circle cx="80" cy="64" r="28" fill="%23d1d5db"/><ellipse cx="80" cy="128" rx="44" ry="32" fill="%23d1d5db"/></svg>';

const resolveTeamImage = (image) => {
  if (!image) return PLACEHOLDER;
  if (/^(data:|https?:|\/)/.test(image)) return image;
  const resolved = teamAssets[`../assets/${image}`];
  if (resolved) return resolved;
  const key = Object.keys(teamAssets).find(
    k => k.toLowerCase() === `../assets/${image}`.toLowerCase()
  );
  return key ? teamAssets[key] : PLACEHOLDER;
};

const NavBtn = ({ dir, onClick }) => (
  <button
    onClick={onClick}
    aria-label={dir === 'prev' ? 'Previous member' : 'Next member'}
    className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 shadow-md hover:bg-dveinBlue hover:border-dveinBlue hover:text-white text-gray-700 transition-all duration-200 hover:scale-110 active:scale-95 shrink-0"
  >
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      {dir === 'prev'
        ? <polyline points="15 18 9 12 15 6" />
        : <polyline points="9 18 15 12 9 6" />}
    </svg>
  </button>
);

const MeetTeam = () => {
  const { content } = useContent();
  const cms = content?.meetTeam || {};
  const teamMembers = Array.isArray(cms.members) ? cms.members.filter(Boolean) : [];
  const swiperRef = useRef(null);

  if (teamMembers.length === 0) return null;

  return (
    <section className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header + Nav row */}
        <div className="flex items-end justify-between mb-12 gap-4">
          <div className="text-center flex-1">
            <p className="text-sm font-black uppercase tracking-[0.28em] text-dveinGreen mb-3">
              {cms.eyebrow || 'Our People'}
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-black font-heading">
              {cms.heading || 'Meet the Crew'}
            </h2>
          </div>
          {/* Navigation buttons — always visible */}
          {teamMembers.length > 1 && (
            <div className="flex gap-2 pb-1 shrink-0">
              <NavBtn dir="prev" onClick={() => swiperRef.current?.slidePrev()} />
              <NavBtn dir="next" onClick={() => swiperRef.current?.slideNext()} />
            </div>
          )}
        </div>

        <Swiper
          onSwiper={(s) => { swiperRef.current = s; }}
          slidesPerView={1}
          spaceBetween={22}
          loop={teamMembers.length > 3}
          autoplay={{ delay: 3200, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: Math.min(2, teamMembers.length), spaceBetween: 22 },
            1024: { slidesPerView: Math.min(3, teamMembers.length), spaceBetween: 28 },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="!pb-14"
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={member.id || index} className="h-auto">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                whileHover={{ y: -5, boxShadow: '0 16px 40px rgba(0,0,0,0.10)' }}
                className="group flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300"
              >
                <div className="mb-6 rounded-full bg-gradient-to-tr from-dveinBlue via-cyan-400 to-dveinGreen p-1.5 shadow-lg shadow-dveinBlue/10">
                  <div className="h-36 w-36 overflow-hidden rounded-full bg-gray-100 ring-4 ring-white sm:h-40 sm:w-40">
                    <img
                      src={resolveTeamImage(member.image)}
                      alt={member.name || 'Team member'}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      onError={(e) => { e.target.src = PLACEHOLDER; }}
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
