import React, { useState, useEffect, useCallback } from 'react';

const ChevronIcon = ({ dir }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    {dir === 'left'
      ? <polyline points="15 18 9 12 15 6" />
      : <polyline points="9 18 15 12 9 6" />}
  </svg>
);

const ImageSlideshow = ({ images = [], interval = 3000, className = '' }) => {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setCurrent(p => (p + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent(p => (p - 1 + images.length) % images.length), [images.length]);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [images.length, interval, paused, next]);

  useEffect(() => { setCurrent(0); }, [images.length]);

  if (!images.length) return null;

  return (
    <div
      className={`relative w-full h-full overflow-hidden group ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt=""
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
          onError={e => { e.target.style.display = 'none'; }}
        />
      ))}

      {images.length > 1 && (
        <>
          <button
            onClick={e => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/65 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ChevronIcon dir="left" />
          </button>
          <button
            onClick={e => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/40 hover:bg-black/65 text-white opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 active:scale-95"
          >
            <ChevronIcon dir="right" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); setCurrent(i); }}
              aria-label={`Go to image ${i + 1}`}
              className={`transition-all duration-300 rounded-full ${
                i === current ? 'w-5 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSlideshow;
