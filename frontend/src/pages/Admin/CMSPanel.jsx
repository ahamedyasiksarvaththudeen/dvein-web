import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContent } from '../../context/ContentContext';
import logo from '../../assets/logo.png';

// ─── INLINE ICON SYSTEM ───────────────────────────────────────────────────────
const Icon = ({ d, size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="currentColor" className={`shrink-0 ${className}`}>
    <path fillRule="evenodd" d={d} clipRule="evenodd" />
  </svg>
);
const IC = {
  hero:       'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z',
  about:      'M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z',
  stats:      'M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z',
  process:    'M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z',
  star:       'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z',
  map:        'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z',
  grad:       'M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z',
  box:        'M4 3a2 2 0 100 4h12a2 2 0 100-4H4zM3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z',
  flask:      'M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z',
  code:       'M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z',
  book:       'M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z',
  handshake:  'M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z',
  mail:       'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884zM18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z',
  story:      'M9 2a1 1 0 000 2h2a1 1 0 100-2H9zM4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z',
  menu:       'M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z',
  close:      'M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z',
  save:       'M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z',
  reset:      'M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z',
  plus:       'M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z',
  trash:      'M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z',
  chevUp:     'M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z',
  chevDown:   'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z',
  eye:        'M10 12a2 2 0 100-4 2 2 0 000 4zM.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10z',
  logout:     'M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z',
  check:      'M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z',
  image:      'M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z',
  upload:     'M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z',
};

// ─── PRIMITIVES ───────────────────────────────────────────────────────────────
const Field = ({ label, value, onChange, type = 'text', rows, placeholder }) => (
  <div className="mb-4">
    <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">{label}</label>
    {type === 'textarea'
      ? <textarea value={value ?? ''} onChange={e => onChange(e.target.value)} rows={rows || 3} placeholder={placeholder}
          className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-all resize-none placeholder-gray-300 shadow-sm" />
      : <input type={type} value={value ?? ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
          className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-all placeholder-gray-300 shadow-sm" />
    }
  </div>
);

const compressImage = (file, maxPx = 700, quality = 0.78) => new Promise((resolve) => {
  const reader = new FileReader();
  reader.onload = (evt) => {
    const img = new Image();
    img.onload = () => {
      let { width: w, height: h } = img;
      if (w > maxPx || h > maxPx) {
        if (w > h) { h = Math.round(h * maxPx / w); w = maxPx; }
        else       { w = Math.round(w * maxPx / h); h = maxPx; }
      }
      const canvas = document.createElement('canvas');
      canvas.width = w; canvas.height = h;
      canvas.getContext('2d').drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    img.src = evt.target.result;
  };
  reader.readAsDataURL(file);
});

const ImageField = ({ label, value, onChange, placeholder = 'https://...' }) => {
  const fileRef = useRef(null);
  const [tab, setTab] = useState('url');
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const compressed = await compressImage(file);
    onChange(compressed);
    setTab('url');
    e.target.value = '';
  };
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1.5">
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</label>
        <div className="flex gap-1">
          {['url','upload'].map(t => (
            <button key={t} type="button" onClick={() => setTab(t)}
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider transition-all ${tab===t?'bg-[#0056D2] text-white':'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
              {t==='url'?'URL':'Upload'}
            </button>
          ))}
        </div>
      </div>
      {tab === 'url' ? (
        <div className="flex items-center gap-2">
          <input type="text" value={value ?? ''} onChange={e => onChange(e.target.value)} placeholder={placeholder}
            className="flex-1 bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] transition-all placeholder-gray-300 shadow-sm" />
          {value && (
            <div className="w-12 h-10 rounded-lg overflow-hidden border border-gray-100 shrink-0 bg-gray-50">
              <img src={value} alt="" className="w-full h-full object-cover" onError={e => { e.target.style.display='none'; }} />
            </div>
          )}
        </div>
      ) : (
        <div onClick={() => fileRef.current?.click()}
          className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-4 py-5 cursor-pointer hover:border-[#0056D2]/40 hover:bg-[#0056D2]/5 transition-all group">
          <Icon d={IC.upload} size={22} className="text-gray-300 group-hover:text-[#0056D2] transition-colors" />
          <p className="text-xs text-gray-400 font-medium text-center">Click to upload<br /><span className="text-gray-300">PNG, JPG, GIF, WEBP</span></p>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>
      )}
      {value?.startsWith('data:') && (
        <p className="mt-1 text-[10px] text-[#10B981] font-bold flex items-center gap-1">
          <Icon d={IC.check} size={10} className="text-[#10B981]" /> Uploaded locally
        </p>
      )}
    </div>
  );
};

const SaveBar = ({ onSave, onReset, saved }) => (
  <div className="flex items-center gap-3 pt-5 border-t border-gray-100 mt-6">
    <button onClick={() => onSave()}
      className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${saved?'bg-[#10B981] text-white':'bg-[#0056D2] hover:bg-[#0046b0] text-white shadow-[#0056D2]/20'}`}>
      {saved ? <><Icon d={IC.check} size={12} /> Saved!</> : <><Icon d={IC.save} size={12} /> Save Changes</>}
    </button>
    <button onClick={onReset}
      className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-500 border border-gray-200 px-5 py-2.5 rounded-xl font-bold text-sm transition-all">
      <Icon d={IC.reset} size={11} /> Reset Default
    </button>
  </div>
);

const SectionHeader = ({ title, desc, iconD, color = '#0056D2' }) => (
  <div className="flex items-start gap-4 mb-8 pb-6 border-b border-gray-100">
    <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm" style={{ background: color+'18', color }}>
      <Icon d={iconD} size={18} />
    </div>
    <div>
      <h2 className="text-lg font-bold text-gray-900">{title}</h2>
      <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
    </div>
  </div>
);

const Card = ({ children, className = '' }) => (
  <div className={`bg-white rounded-2xl border border-gray-100 shadow-sm p-5 ${className}`}>{children}</div>
);

const Accordion = ({ label, number, open, onToggle, children, accent = '#0056D2' }) => (
  <Card className="!p-0 overflow-hidden">
    <button onClick={onToggle} className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left">
      <div className="flex items-center gap-3">
        <span className="w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shrink-0"
          style={{ background: accent+'18', color: accent }}>{number}</span>
        <span className="text-gray-800 font-semibold text-sm truncate max-w-xs">{label}</span>
      </div>
      <Icon d={open ? IC.chevUp : IC.chevDown} size={12} className="text-gray-300" />
    </button>
    {open && <div className="px-5 pb-5 border-t border-gray-50 pt-4">{children}</div>}
  </Card>
);

const Sub = ({ text }) => <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-3 px-1">{text}</p>;

const DelBtn = ({ onClick }) => (
  <button onClick={onClick} className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 transition-all">
    <Icon d={IC.trash} size={10} />
  </button>
);

const AddBtn = ({ onClick, label }) => (
  <button onClick={onClick} className="mt-3 mb-5 flex items-center gap-2 text-[#10B981] text-sm font-bold hover:text-green-600 transition-colors">
    <Icon d={IC.plus} size={11} /> {label}
  </button>
);

const useSave = (key) => {
  const { updateSection, resetSection, content } = useContent();
  const [data, setData] = useState(content[key]);
  const [saved, setSaved] = useState(false);
  useEffect(() => { setData(content[key]); }, [content[key]]);
  const save = (override) => { updateSection(key, override ?? data); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const reset = () => { resetSection(key); setSaved(false); };
  return { data, setData, save, reset, saved };
};

// ─── HOME EDITORS ─────────────────────────────────────────────────────────────
const HeroEditor = () => {
  const { content, updateSection, resetSection } = useContent();
  const [slides, setSlides] = useState(content.hero.slides);
  const [open, setOpen] = useState(0);
  const [saved, setSaved] = useState(false);
  useEffect(() => setSlides(content.hero.slides), [content.hero]);
  const up = (i, k, v) => setSlides(p => p.map((s, j) => j===i ? {...s,[k]:v} : s));
  const save = () => { updateSection('hero',{slides}); setSaved(true); setTimeout(()=>setSaved(false),2500); };
  return (
    <div>
      <SectionHeader title="Hero Slider" desc="Edit the rotating hero slides — image, text & buttons." iconD={IC.hero} />
      <div className="space-y-3">
        {slides.map((sl, idx) => (
          <Accordion key={sl.id} number={idx+1} label={sl.title} open={open===idx} onToggle={()=>setOpen(open===idx?-1:idx)}>
            <ImageField label="Background Image" value={sl.image} onChange={v=>up(idx,'image',v)} />
            <Field label="Badge Tag" value={sl.smallTag} onChange={v=>up(idx,'smallTag',v)} />
            <Field label="Headline" value={sl.title} onChange={v=>up(idx,'title',v)} />
            <Field label="Description" value={sl.description} onChange={v=>up(idx,'description',v)} type="textarea" rows={2} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Primary Button" value={sl.primaryBtn} onChange={v=>up(idx,'primaryBtn',v)} />
              <Field label="Primary Link" value={sl.primaryLink} onChange={v=>up(idx,'primaryLink',v)} />
              <Field label="Secondary Button" value={sl.secondaryBtn} onChange={v=>up(idx,'secondaryBtn',v)} />
              <Field label="Secondary Link" value={sl.secondaryLink} onChange={v=>up(idx,'secondaryLink',v)} />
            </div>
          </Accordion>
        ))}
      </div>
      <SaveBar onSave={save} onReset={()=>resetSection('hero')} saved={saved} />
    </div>
  );
};

const WelcomeEditor = () => {
  const {data,setData,save,reset,saved} = useSave('welcome');
  if(!data) return null;
  const set = (k,v) => setData(p=>({...p,[k]:v}));
  return (
    <div>
      <SectionHeader title="Welcome / About Section" iconD={IC.about} desc="'Who We Are' text and feature cards." color="#10B981" />
      <Card className="mb-4">
        <Field label="Tagline" value={data.tagline} onChange={v=>set('tagline',v)} />
        <Field label="Heading" value={data.heading} onChange={v=>set('heading',v)} />
        <Field label="Paragraph" value={data.paragraph} onChange={v=>set('paragraph',v)} type="textarea" rows={4} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="CTA Text" value={data.ctaText} onChange={v=>set('ctaText',v)} />
          <Field label="CTA Link" value={data.ctaLink} onChange={v=>set('ctaLink',v)} />
        </div>
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <p className="text-[11px] font-bold text-[#0056D2] uppercase tracking-widest mb-3">Card 1 — Blue</p>
          <Field label="Title" value={data.card1Title} onChange={v=>set('card1Title',v)} />
          <Field label="Description" value={data.card1Desc} onChange={v=>set('card1Desc',v)} type="textarea" rows={2} />
        </Card>
        <Card>
          <p className="text-[11px] font-bold text-[#10B981] uppercase tracking-widest mb-3">Card 2 — Green</p>
          <Field label="Title" value={data.card2Title} onChange={v=>set('card2Title',v)} />
          <Field label="Description" value={data.card2Desc} onChange={v=>set('card2Desc',v)} type="textarea" rows={2} />
        </Card>
      </div>
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

const StatsEditor = () => {
  const {content,updateSection,resetSection} = useContent();
  const [stats,setStats] = useState(content.stats);
  const [saved,setSaved] = useState(false);
  useEffect(()=>setStats(content.stats),[content.stats]);
  const up = (i,k,v) => setStats(p=>p.map((s,j)=>j===i?{...s,[k]:v}:s));
  const save = () => { updateSection('stats',stats); setSaved(true); setTimeout(()=>setSaved(false),2500); };
  return (
    <div>
      <SectionHeader title="Stats / Achievements" iconD={IC.stats} desc="Key numbers on the homepage." color="#7C3AED" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {stats.map((s,i) => (
          <Card key={s.id}>
            <p className="text-[11px] font-bold text-[#7C3AED] uppercase tracking-widest mb-3">Stat {i+1}</p>
            <Field label="Value (e.g. 50+)" value={s.value} onChange={v=>up(i,'value',v)} />
            <Field label="Label" value={s.name} onChange={v=>up(i,'name',v)} />
          </Card>
        ))}
      </div>
      <SaveBar onSave={save} onReset={()=>resetSection('stats')} saved={saved} />
    </div>
  );
};

const HowWeDoEditor = () => {
  const {data,setData,save,reset,saved} = useSave('howWeDo');
  if(!data) return null;
  const upStep = (i,k,v) => setData(p=>({...p,steps:p.steps.map((s,j)=>j===i?{...s,[k]:v}:s)}));
  return (
    <div>
      <SectionHeader title="How We Do It — Process" iconD={IC.process} desc="Section heading and process steps." color="#3B82F6" />
      <Card className="mb-4">
        <Field label="Tagline" value={data.tagline} onChange={v=>setData(p=>({...p,tagline:v}))} />
        <Field label="Heading" value={data.heading} onChange={v=>setData(p=>({...p,heading:v}))} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.steps.map((s,i) => (
          <Card key={i}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Step {i+1}</p>
            <Field label="Title" value={s.title} onChange={v=>upStep(i,'title',v)} />
            <Field label="Description" value={s.desc} onChange={v=>upStep(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

const WhyChooseEditor = () => {
  const {data,setData,save,reset,saved} = useSave('whyChooseUs');
  if(!data) return null;
  const upFeat = (i,k,v) => setData(p=>({...p,features:p.features.map((f,j)=>j===i?{...f,[k]:v}:f)}));
  return (
    <div>
      <SectionHeader title="Why Choose Us" iconD={IC.star} desc="Heading and feature cards." color="#F59E0B" />
      <Card className="mb-4">
        <Field label="Heading" value={data.heading} onChange={v=>setData(p=>({...p,heading:v}))} />
        <Field label="Subheading" value={data.subheading} onChange={v=>setData(p=>({...p,subheading:v}))} type="textarea" rows={2} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {data.features.map((f,i) => (
          <Card key={i}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Feature {i+1}</p>
            <Field label="Title" value={f.name} onChange={v=>upFeat(i,'name',v)} />
            <Field label="Description" value={f.desc} onChange={v=>upFeat(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

const TestimonialsEditor = () => {
  const {data,setData,save,reset,saved} = useSave('testimonials');
  if(!data) return null;
  const upRev = (i,k,v) => setData(p=>({...p,reviews:p.reviews.map((r,j)=>j===i?{...r,[k]:v}:r)}));
  const addRev = () => setData(p=>({...p,reviews:[...p.reviews,{id:Date.now(),name:'New Name',role:'Role',text:'Review text.',rating:5}]}));
  const delRev = (i) => setData(p=>({...p,reviews:p.reviews.filter((_,j)=>j!==i)}));
  return (
    <div>
      <SectionHeader title="Testimonials" iconD={IC.star} desc="Google badge, heading, and all reviews." color="#F59E0B" />
      <Card className="mb-4">
        <Field label="Section Heading" value={data.heading} onChange={v=>setData(p=>({...p,heading:v}))} />
        <Field label="Google Badge Text" value={data.googleRating} onChange={v=>setData(p=>({...p,googleRating:v}))} />
      </Card>
      <div className="space-y-3">
        {data.reviews.map((r,i) => (
          <Card key={r.id} className="relative">
            <DelBtn onClick={()=>delRev(i)} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Review {i+1}</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" value={r.name} onChange={v=>upRev(i,'name',v)} />
              <Field label="Role" value={r.role} onChange={v=>upRev(i,'role',v)} />
            </div>
            <Field label="Text" value={r.text} onChange={v=>upRev(i,'text',v)} type="textarea" rows={2} />
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Stars</label>
              <div className="flex gap-1.5">{[1,2,3,4,5].map(n=>(
                <button key={n} onClick={()=>upRev(i,'rating',n)}
                  className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${r.rating>=n?'bg-yellow-400 text-yellow-900':'bg-gray-100 text-gray-400'}`}>{n}</button>
              ))}</div>
            </div>
          </Card>
        ))}
      </div>
      <AddBtn onClick={addRev} label="Add Review" />
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

const MeetTeamEditor = () => {
  const {data,setData,save,reset,saved} = useSave('meetTeam');
  if(!data) return null;
  const members = Array.isArray(data.members) ? data.members : [];
  const upMember = (i,k,v) => setData(p=>({...p,members:(Array.isArray(p.members) ? p.members : []).map((m,j)=>j===i?{...m,[k]:v}:m)}));
  const addMember = () => setData(p=>({
    ...p,
    members: [
      ...(Array.isArray(p.members) ? p.members : []),
      { id: Date.now(), name: 'New Team Member', role: 'Role', image: '' }
    ]
  }));
  const delMember = (i) => setData(p=>({...p,members:(Array.isArray(p.members) ? p.members : []).filter((_,j)=>j!==i)}));
  return (
    <div>
      <SectionHeader title="Meet the Crew" iconD={IC.about} desc="Edit team carousel cards: image, name, role, add and delete." color="#06B6D4" />
      <Card className="mb-4">
        <Field label="Small Label" value={data.eyebrow} onChange={v=>setData(p=>({...p,eyebrow:v}))} />
        <Field label="Section Heading" value={data.heading} onChange={v=>setData(p=>({...p,heading:v}))} />
        <p className="text-[11px] text-gray-400 font-semibold">
          For local images, use the asset file name only, for example: navin.png, nivash.jpeg, suriya.jpeg.
        </p>
      </Card>
      <div className="space-y-3">
        {members.map((m,i) => (
          <Card key={m.id || i} className="relative">
            <DelBtn onClick={()=>delMember(i)} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Team Card {i+1}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Name" value={m.name} onChange={v=>upMember(i,'name',v)} />
              <Field label="Role" value={m.role} onChange={v=>upMember(i,'role',v)} />
            </div>
            <ImageField label="Image URL / Upload / Asset Filename" value={m.image} onChange={v=>upMember(i,'image',v)} placeholder="navin.png or https://..." />
          </Card>
        ))}
      </div>
      <AddBtn onClick={addMember} label="Add Team Card" />
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

const FooterEditor = () => {
  const {data,setData,save,reset,saved} = useSave('footer');
  if(!data) return null;
  const set=(k,v)=>setData(p=>({...p,[k]:v}));
  return (
    <div>
      <SectionHeader title="Footer" iconD={IC.map} desc="Address, phone, email and copyright." color="#10B981" />
      <Card>
        <Field label="Address" value={data.address} onChange={v=>set('address',v)} type="textarea" rows={2} />
        <Field label="Phone" value={data.phone} onChange={v=>set('phone',v)} />
        <Field label="Email" value={data.email} onChange={v=>set('email',v)} />
        <Field label="Copyright" value={data.copyright} onChange={v=>set('copyright',v)} />
      </Card>
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── INTERNSHIPS EDITOR ───────────────────────────────────────────────────────
const InternshipsEditor = () => {
  const {data,setData,save,reset,saved} = useSave('internships');
  const [openD,setOpenD] = useState(-1);
  if(!data) return null;
  const setHero=(k,v)=>setData(p=>({...p,hero:{...p.hero,[k]:v}}));
  const setCurr=(k,v)=>setData(p=>({...p,curriculum:{...p.curriculum,[k]:v}}));
  const setCurrT=(tr,i,k,v)=>setData(p=>({...p,curriculum:{...p.curriculum,[tr]:p.curriculum[tr].map((x,j)=>j===i?{...x,[k]:v}:x)}}));
  const setDom=(i,k,v)=>setData(p=>({...p,domains:p.domains.map((d,j)=>j===i?{...d,[k]:v}:d)}));
  const upProj=(i,k,v)=>setData(p=>({...p,projects:{...p.projects,items:p.projects.items.map((x,j)=>j===i?{...x,[k]:v}:x)}}));
  const addProj=()=>setData(p=>({...p,projects:{...p.projects,items:[...p.projects.items,{_id:Date.now(),title:'New Project',tag:'Full Stack',desc:'Description.'}]}}));
  const delProj=(i)=>setData(p=>({...p,projects:{...p.projects,items:p.projects.items.filter((_,j)=>j!==i)}}));
  const upFaq=(i,k,v)=>setData(p=>({...p,faqs:p.faqs.map((f,j)=>j===i?{...f,[k]:v}:f)}));
  const addFaq=()=>setData(p=>({...p,faqs:[...p.faqs,{_id:Date.now(),question:'New question?',answer:'Answer.'}]}));
  const delFaq=(i)=>setData(p=>({...p,faqs:p.faqs.filter((_,j)=>j!==i)}));
  return (
    <div>
      <SectionHeader title="Internships Page" iconD={IC.grad} desc="Edit every section of the Internships / Training page." color="#2563EB" />
      <Sub text="Hero Section" />
      <Card className="mb-5">
        <Field label="Badge" value={data.hero.badge} onChange={v=>setHero('badge',v)} />
        <Field label="Headline" value={data.hero.headline} onChange={v=>setHero('headline',v)} type="textarea" rows={2} />
        <Field label="Description" value={data.hero.description} onChange={v=>setHero('description',v)} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Apply Button" value={data.hero.applyBtn} onChange={v=>setHero('applyBtn',v)} />
          <Field label="Explore Button" value={data.hero.exploreBtn} onChange={v=>setHero('exploreBtn',v)} />
        </div>
      </Card>
      <Sub text="Marquee & Domains Heading" />
      <Card className="mb-5">
        <Field label="Marquee Text" value={data.marquee} onChange={v=>setData(p=>({...p,marquee:v}))} />
        <Field label="Domains Heading" value={data.domainsHeading} onChange={v=>setData(p=>({...p,domainsHeading:v}))} />
        <Field label="Domains Subheading" value={data.domainsSubheading} onChange={v=>setData(p=>({...p,domainsSubheading:v}))} />
      </Card>
      <Sub text={`Internship Domains (${data.domains.length})`} />
      <div className="space-y-2 mb-5">
        {data.domains.map((d,i) => (
          <Accordion key={d._id} number={i+1} label={d.title} open={openD===i} onToggle={()=>setOpenD(openD===i?-1:i)}>
            <Field label="Title" value={d.title} onChange={v=>setDom(i,'title',v)} />
            <Field label="Description" value={d.desc} onChange={v=>setDom(i,'desc',v)} type="textarea" rows={2} />
            <Field label="Skills (comma-separated)" value={d.skills?.join(', ')} onChange={v=>setDom(i,'skills',v.split(',').map(s=>s.trim()).filter(Boolean))} />
          </Accordion>
        ))}
      </div>
      <Sub text="Curriculum Section" />
      <Card className="mb-3">
        <Field label="Heading" value={data.curriculum.heading} onChange={v=>setCurr('heading',v)} />
        <Field label="Subheading" value={data.curriculum.subheading} onChange={v=>setCurr('subheading',v)} type="textarea" rows={2} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {['web','ai'].map(tr => (
          <Card key={tr}>
            <p className="text-[11px] font-black text-[#0056D2] uppercase tracking-widest mb-3">{tr==='web'?'Web Track':'AI Track'}</p>
            {data.curriculum[tr].map((item,i) => (
              <div key={item._id} className="mb-4 pb-4 border-b border-gray-50 last:border-0 last:mb-0 last:pb-0">
                <p className="text-[10px] font-bold text-gray-400 mb-2">Module {i+1}</p>
                <Field label="Week" value={item.week} onChange={v=>setCurrT(tr,i,'week',v)} />
                <Field label="Title" value={item.title} onChange={v=>setCurrT(tr,i,'title',v)} />
                <Field label="Description" value={item.desc} onChange={v=>setCurrT(tr,i,'desc',v)} type="textarea" rows={2} />
              </div>
            ))}
          </Card>
        ))}
      </div>
      <Sub text="Industry Portfolio" />
      <Card className="mb-2">
        <Field label="Heading" value={data.projects.heading} onChange={v=>setData(p=>({...p,projects:{...p.projects,heading:v}}))} />
      </Card>
      <div className="space-y-3 mb-1">
        {data.projects.items.map((pr,i) => (
          <Card key={pr._id} className="relative">
            <DelBtn onClick={()=>delProj(i)} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Project {i+1}</p>
            <Field label="Title" value={pr.title} onChange={v=>upProj(i,'title',v)} />
            <Field label="Tag" value={pr.tag} onChange={v=>upProj(i,'tag',v)} />
            <Field label="Description" value={pr.desc} onChange={v=>upProj(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={addProj} label="Add Project" />
      <Sub text="FAQs" />
      <div className="space-y-3">
        {data.faqs.map((f,i) => (
          <Card key={f._id} className="relative">
            <DelBtn onClick={()=>delFaq(i)} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">FAQ {i+1}</p>
            <Field label="Question" value={f.question} onChange={v=>upFaq(i,'question',v)} />
            <Field label="Answer" value={f.answer} onChange={v=>upFaq(i,'answer',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={addFaq} label="Add FAQ" />
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── PRODUCTS EDITOR ─────────────────────────────────────────────────────────
const ProductsEditor = () => {
  const {data,setData,save,reset,saved} = useSave('products');
  if(!data) return null;
  const setHero=(k,v)=>setData(p=>({...p,hero:{...p.hero,[k]:v}}));
  const setDnaI=(i,k,v)=>setData(p=>({...p,dna:{...p.dna,items:p.dna.items.map((d,j)=>j===i?{...d,[k]:v}:d)}}));
  const setRM=(k,v)=>setData(p=>({...p,roadmap:{...p.roadmap,[k]:v}}));
  const setRMS=(i,k,v)=>setData(p=>({...p,roadmap:{...p.roadmap,steps:p.roadmap.steps.map((s,j)=>j===i?{...s,[k]:v}:s)}}));
  const setRevI=(i,k,v)=>setData(p=>({...p,reviews:{...p.reviews,items:p.reviews.items.map((r,j)=>j===i?{...r,[k]:v}:r)}}));
  const addRev=()=>setData(p=>({...p,reviews:{...p.reviews,items:[...p.reviews.items,{id:Date.now(),name:'Name',role:'Role',text:'Review.',rating:5}]}}));
  const delRev=(i)=>setData(p=>({...p,reviews:{...p.reviews,items:p.reviews.items.filter((_,j)=>j!==i)}}));
  const setFaqI=(i,k,v)=>setData(p=>({...p,faq:{...p.faq,items:p.faq.items.map((f,j)=>j===i?{...f,[k]:v}:f)}}));
  const addFaq=()=>setData(p=>({...p,faq:{...p.faq,items:[...p.faq.items,{q:'New question?',a:'Answer.'}]}}));
  const delFaq=(i)=>setData(p=>({...p,faq:{...p.faq,items:p.faq.items.filter((_,j)=>j!==i)}}));
  return (
    <div>
      <SectionHeader title="Products Page" iconD={IC.box} desc="Edit every section of the Products page." color="#6366F1" />
      <Sub text="Hero Section" />
      <Card className="mb-5">
        <Field label="Badge" value={data.hero.badge} onChange={v=>setHero('badge',v)} />
        <Field label="Headline" value={data.hero.headline} onChange={v=>setHero('headline',v)} type="textarea" rows={2} />
        <Field label="Description" value={data.hero.description} onChange={v=>setHero('description',v)} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Explore Button" value={data.hero.exploreBtn} onChange={v=>setHero('exploreBtn',v)} />
          <Field label="Docs Button" value={data.hero.docsBtn} onChange={v=>setHero('docsBtn',v)} />
        </div>
      </Card>
      <Sub text="Core Architecture Cards" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {data.dna.items.map((d,i) => (
          <Card key={i}>
            <p className="text-[11px] font-bold text-indigo-400 uppercase tracking-widest mb-3">Card {i+1}</p>
            <Field label="Title" value={d.title} onChange={v=>setDnaI(i,'title',v)} />
            <Field label="Description" value={d.desc} onChange={v=>setDnaI(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <Sub text="Deployment Roadmap" />
      <Card className="mb-3">
        <Field label="Title" value={data.roadmap.title} onChange={v=>setRM('title',v)} />
        <Field label="Subtitle" value={data.roadmap.subtitle} onChange={v=>setRM('subtitle',v)} type="textarea" rows={2} />
      </Card>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {data.roadmap.steps.map((s,i) => (
          <Card key={i}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Step {i+1}</p>
            <Field label="Label" value={s.label} onChange={v=>setRMS(i,'label',v)} />
            <Field label="Description" value={s.desc} onChange={v=>setRMS(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <Sub text="Reviews" />
      <Card className="mb-3">
        <Field label="Heading" value={data.reviews.heading} onChange={v=>setData(p=>({...p,reviews:{...p.reviews,heading:v}}))} />
        <Field label="Google Badge" value={data.reviews.googleBadge} onChange={v=>setData(p=>({...p,reviews:{...p.reviews,googleBadge:v}}))} />
      </Card>
      <div className="space-y-3 mb-1">
        {data.reviews.items.map((r,i) => (
          <Card key={r.id} className="relative">
            <DelBtn onClick={()=>delRev(i)} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Review {i+1}</p>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name" value={r.name} onChange={v=>setRevI(i,'name',v)} />
              <Field label="Role" value={r.role} onChange={v=>setRevI(i,'role',v)} />
            </div>
            <Field label="Text" value={r.text} onChange={v=>setRevI(i,'text',v)} type="textarea" rows={2} />
            <div className="flex gap-1.5 mt-1">{[1,2,3,4,5].map(n=>(
              <button key={n} onClick={()=>setRevI(i,'rating',n)} className={`w-8 h-8 rounded-lg text-xs font-black transition-all ${r.rating>=n?'bg-yellow-400 text-yellow-900':'bg-gray-100 text-gray-400'}`}>{n}</button>
            ))}</div>
          </Card>
        ))}
      </div>
      <AddBtn onClick={addRev} label="Add Review" />
      <Sub text="FAQ" />
      <Card className="mb-3"><Field label="FAQ Heading" value={data.faq.heading} onChange={v=>setData(p=>({...p,faq:{...p.faq,heading:v}}))} /></Card>
      <div className="space-y-3">
        {data.faq.items.map((f,i) => (
          <Card key={i} className="relative">
            <DelBtn onClick={()=>delFaq(i)} />
            <Field label="Question" value={f.q} onChange={v=>setFaqI(i,'q',v)} />
            <Field label="Answer" value={f.a} onChange={v=>setFaqI(i,'a',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={addFaq} label="Add FAQ" />
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── STUDENT PROJECTS EDITOR ─────────────────────────────────────────────────
const StudentProjectsEditor = () => {
  const {data,setData,save,reset,saved} = useSave('studentProjects');
  const [openP,setOpenP] = useState(-1);
  if(!data) return null;
  const setHero=(k,v)=>setData(p=>({...p,hero:{...p.hero,[k]:v}}));
  const setStat=(i,k,v)=>setData(p=>({...p,stats:p.stats.map((s,j)=>j===i?{...s,[k]:v}:s)}));
  const setWhy=(i,k,v)=>setData(p=>({...p,whyFeatures:p.whyFeatures.map((f,j)=>j===i?{...f,[k]:v}:f)}));
  const setHW=(k,v)=>setData(p=>({...p,hardware:{...p.hardware,[k]:v}}));
  const setNode=(i,v)=>setData(p=>({...p,hardware:{...p.hardware,nodes:p.hardware.nodes.map((n,j)=>j===i?v:n)}}));
  const setProj=(i,k,v)=>setData(p=>({...p,repository:{...p.repository,projects:p.repository.projects.map((x,j)=>j===i?{...x,[k]:v}:x)}}));
  const setStep=(i,k,v)=>setData(p=>({...p,roadmap:{...p.roadmap,steps:p.roadmap.steps.map((s,j)=>j===i?{...s,[k]:v}:s)}}));
  const setCta=(k,v)=>setData(p=>({...p,cta:{...p.cta,[k]:v}}));
  return (
    <div>
      <SectionHeader title="Student Projects Page" iconD={IC.flask} desc="Edit every section of the Student Projects / Innovation Hub." color="#0891B2" />
      <Sub text="Hero Section" />
      <Card className="mb-5">
        <Field label="Badge" value={data.hero.badge} onChange={v=>setHero('badge',v)} />
        <Field label="Headline" value={data.hero.headline} onChange={v=>setHero('headline',v)} type="textarea" rows={2} />
        <Field label="Description" value={data.hero.description} onChange={v=>setHero('description',v)} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="PDF Button" value={data.hero.pdfBtn} onChange={v=>setHero('pdfBtn',v)} />
          <Field label="PDF Link" value={data.hero.pdfLink} onChange={v=>setHero('pdfLink',v)} />
        </div>
      </Card>
      <Sub text={`Performance Metrics (${data.stats.length})`} />
      <div className="space-y-2 mb-2">
        {data.stats.map((s,i) => (
          <Card key={s._id} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,stats:p.stats.filter((_,j)=>j!==i)}))} />
            <div className="grid grid-cols-2 gap-3 pr-10">
              <Field label="Label" value={s.label} onChange={v=>setStat(i,'label',v)} />
              <Field label="Count" value={s.count} onChange={v=>setStat(i,'count',v)} />
            </div>
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,stats:[...p.stats,{_id:Date.now(),label:'New',count:'0+'}]}))} label="Add Metric" />
      <Sub text="Why Choose DVein" />
      <Card className="mb-3"><Field label="Section Heading" value={data.whyHeading} onChange={v=>setData(p=>({...p,whyHeading:v}))} /></Card>
      <div className="space-y-3 mb-2">
        {data.whyFeatures.map((f,i) => (
          <Card key={f._id} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,whyFeatures:p.whyFeatures.filter((_,j)=>j!==i)}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 pr-10">Feature {i+1}</p>
            <Field label="Title" value={f.title} onChange={v=>setWhy(i,'title',v)} />
            <Field label="Description" value={f.desc} onChange={v=>setWhy(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,whyFeatures:[...p.whyFeatures,{_id:Date.now(),title:'New Feature',desc:'Description.'}]}))} label="Add Feature" />
      <Sub text="Hardware Inventory" />
      <Card className="mb-3">
        <Field label="Heading" value={data.hardware.heading} onChange={v=>setHW('heading',v)} type="textarea" rows={2} />
        <ImageField label="Lab Image" value={data.hardware.image} onChange={v=>setHW('image',v)} />
        <Field label="Badge Text" value={data.hardware.badgeText} onChange={v=>setHW('badgeText',v)} />
      </Card>
      <div className="space-y-2 mb-2">
        {data.hardware.nodes.map((n,i) => (
          <div key={i} className="flex items-center gap-2">
            <input value={n} onChange={e=>setNode(i,e.target.value)}
              className="flex-1 bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] shadow-sm" />
            <button onClick={()=>setData(p=>({...p,hardware:{...p.hardware,nodes:p.hardware.nodes.filter((_,j)=>j!==i)}}))}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-red-50 text-red-400 hover:bg-red-100 shrink-0">
              <Icon d={IC.trash} size={10} />
            </button>
          </div>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,hardware:{...p.hardware,nodes:[...p.hardware.nodes,'New Node']}}))} label="Add Node" />
      <Sub text="Project Repository" />
      <Card className="mb-3">
        <Field label="Heading" value={data.repository.heading} onChange={v=>setData(p=>({...p,repository:{...p.repository,heading:v}}))} />
        <Field label="Subtitle" value={data.repository.subtitle} onChange={v=>setData(p=>({...p,repository:{...p.repository,subtitle:v}}))} />
      </Card>
      <div className="space-y-2 mb-2">
        {data.repository.projects.map((pr,i) => (
          <Accordion key={pr._id} number={i+1} label={pr.title} open={openP===i} onToggle={()=>setOpenP(openP===i?-1:i)} accent="#0891B2">
            <button onClick={()=>setData(p=>({...p,repository:{...p.repository,projects:p.repository.projects.filter((_,j)=>j!==i)}}))}
              className="mb-3 flex items-center gap-1.5 text-red-400 text-xs font-bold hover:text-red-600"><Icon d={IC.trash} size={10}/> Remove</button>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title" value={pr.title} onChange={v=>setProj(i,'title',v)} />
              <Field label="Category" value={pr.category} onChange={v=>setProj(i,'category',v)} />
            </div>
            <Field label="Description" value={pr.desc} onChange={v=>setProj(i,'desc',v)} type="textarea" rows={2} />
            <Field label="Tools (comma-separated)" value={pr.tools?.join(', ')} onChange={v=>setProj(i,'tools',v.split(',').map(s=>s.trim()).filter(Boolean))} />
            <ImageField label="Project Image" value={pr.image} onChange={v=>setProj(i,'image',v)} />
          </Accordion>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,repository:{...p.repository,projects:[...p.repository.projects,{_id:Date.now(),category:'software',title:'New Project',desc:'Description.',tools:['React'],image:''}]}}))} label="Add Project" />
      <Sub text="Roadmap" />
      <Card className="mb-3">
        <Field label="Title" value={data.roadmap.title} onChange={v=>setData(p=>({...p,roadmap:{...p.roadmap,title:v}}))} />
        <Field label="Subtitle" value={data.roadmap.subtitle} onChange={v=>setData(p=>({...p,roadmap:{...p.roadmap,subtitle:v}}))} type="textarea" rows={2} />
      </Card>
      <div className="space-y-2 mb-5">
        {data.roadmap.steps.map((s,i) => (
          <Card key={s._id}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Step {i+1}</p>
            <Field label="Label" value={s.label} onChange={v=>setStep(i,'label',v)} />
            <Field label="Description" value={s.desc} onChange={v=>setStep(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <Sub text="Call to Action" />
      <Card>
        <Field label="Heading" value={data.cta.heading} onChange={v=>setCta('heading',v)} type="textarea" rows={2} />
        <Field label="Description" value={data.cta.description} onChange={v=>setCta('description',v)} type="textarea" rows={2} />
        <Field label="Button Text" value={data.cta.buttonText} onChange={v=>setCta('buttonText',v)} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="WhatsApp Number" value={data.cta.whatsappNumber} onChange={v=>setCta('whatsappNumber',v)} />
          <Field label="WhatsApp Message" value={data.cta.whatsappMessage} onChange={v=>setCta('whatsappMessage',v)} />
        </div>
      </Card>
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── SOFTWARE SOLUTIONS EDITOR ────────────────────────────────────────────────
const SoftwareSolutionsEditor = () => {
  const {data,setData,save,reset,saved} = useSave('softwareSolutions');
  if(!data) return null;
  const setHero=(k,v)=>setData(p=>({...p,hero:{...p.hero,[k]:v}}));
  const setSvc=(i,k,v)=>setData(p=>({...p,services:p.services.map((s,j)=>j===i?{...s,[k]:v}:s)}));
  const setFeat=(i,k,v)=>setData(p=>({...p,features:p.features.map((f,j)=>j===i?{...f,[k]:v}:f)}));
  const setInd=(i,k,v)=>setData(p=>({...p,industries:p.industries.map((x,j)=>j===i?{...x,[k]:v}:x)}));
  const setFaq=(i,k,v)=>setData(p=>({...p,faqs:p.faqs.map((f,j)=>j===i?{...f,[k]:v}:f)}));
  return (
    <div>
      <SectionHeader title="Software Solutions Page" iconD={IC.code} desc="Edit every section of the Software Solutions page." color="#7C3AED" />
      <Sub text="Hero Section" />
      <Card className="mb-5">
        <Field label="Badge" value={data.hero.badge} onChange={v=>setHero('badge',v)} />
        <Field label="Headline" value={data.hero.headline} onChange={v=>setHero('headline',v)} type="textarea" rows={2} />
        <Field label="Description" value={data.hero.description} onChange={v=>setHero('description',v)} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary Button" value={data.hero.primaryBtn} onChange={v=>setHero('primaryBtn',v)} />
          <Field label="Secondary Button" value={data.hero.secondaryBtn} onChange={v=>setHero('secondaryBtn',v)} />
        </div>
      </Card>
      <Sub text={`Services (${data.services.length})`} />
      <div className="space-y-3 mb-2">
        {data.services.map((s,i) => (
          <Card key={s._id} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,services:p.services.filter((_,j)=>j!==i)}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 pr-10">Service {i+1}</p>
            <Field label="Title" value={s.title} onChange={v=>setSvc(i,'title',v)} />
            <Field label="Description" value={s.desc} onChange={v=>setSvc(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,services:[...p.services,{_id:Date.now(),title:'New Service',desc:'Description.'}]}))} label="Add Service" />
      <Sub text="Why Choose Us Features" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {data.features.map((f,i) => (
          <Card key={f._id}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Feature {i+1}</p>
            <Field label="Title" value={f.title} onChange={v=>setFeat(i,'title',v)} />
            <Field label="Description" value={f.desc} onChange={v=>setFeat(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <Sub text={`Industries (${data.industries.length})`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
        {data.industries.map((ind,i) => (
          <Card key={ind._id} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,industries:p.industries.filter((_,j)=>j!==i)}))} />
            <div className="pr-8">
              <Field label="Name" value={ind.name} onChange={v=>setInd(i,'name',v)} />
              <Field label="Description" value={ind.desc} onChange={v=>setInd(i,'desc',v)} />
            </div>
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,industries:[...p.industries,{_id:Date.now(),name:'New Industry',desc:'Description.'}]}))} label="Add Industry" />
      <Sub text="FAQs" />
      <div className="space-y-3">
        {data.faqs.map((f,i) => (
          <Card key={f._id} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,faqs:p.faqs.filter((_,j)=>j!==i)}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">FAQ {i+1}</p>
            <Field label="Question" value={f.question} onChange={v=>setFaq(i,'question',v)} />
            <Field label="Answer" value={f.answer} onChange={v=>setFaq(i,'answer',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,faqs:[...p.faqs,{_id:Date.now(),question:'New question?',answer:'Answer.'}]}))} label="Add FAQ" />
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── COURSES EDITOR ───────────────────────────────────────────────────────────
const CoursesEditor = () => {
  const {data,setData,save,reset,saved} = useSave('courses');
  const [openC,setOpenC] = useState(-1);
  if(!data) return null;
  const setHero=(k,v)=>setData(p=>({...p,hero:{...p.hero,[k]:v}}));
  const setCourse=(i,k,v)=>setData(p=>({...p,courses:p.courses.map((c,j)=>j===i?{...c,[k]:v}:c)}));
  const setFeat=(i,k,v)=>setData(p=>({...p,features:p.features.map((f,j)=>j===i?{...f,[k]:v}:f)}));
  const setFaq=(i,k,v)=>setData(p=>({...p,faqs:p.faqs.map((f,j)=>j===i?{...f,[k]:v}:f)}));
  return (
    <div>
      <SectionHeader title="Courses / Academy Page" iconD={IC.book} desc="Edit every section of the Courses page." color="#DB2777" />
      <Sub text="Hero Section" />
      <Card className="mb-5">
        <Field label="Badge" value={data.hero.badge} onChange={v=>setHero('badge',v)} />
        <Field label="Headline" value={data.hero.headline} onChange={v=>setHero('headline',v)} type="textarea" rows={2} />
        <Field label="Description" value={data.hero.description} onChange={v=>setHero('description',v)} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Primary Button" value={data.hero.primaryBtn} onChange={v=>setHero('primaryBtn',v)} />
          <Field label="Secondary Button" value={data.hero.secondaryBtn} onChange={v=>setHero('secondaryBtn',v)} />
        </div>
      </Card>
      <Sub text={`Courses (${data.courses.length})`} />
      <div className="space-y-2 mb-2">
        {data.courses.map((c,i) => (
          <Accordion key={c._id} number={i+1} label={c.title} open={openC===i} onToggle={()=>setOpenC(openC===i?-1:i)} accent="#DB2777">
            <button onClick={()=>setData(p=>({...p,courses:p.courses.filter((_,j)=>j!==i)}))}
              className="mb-3 flex items-center gap-1.5 text-red-400 text-xs font-bold hover:text-red-600"><Icon d={IC.trash} size={10}/> Remove</button>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Title" value={c.title} onChange={v=>setCourse(i,'title',v)} />
              <Field label="Tag" value={c.tag} onChange={v=>setCourse(i,'tag',v)} />
            </div>
            <Field label="Description" value={c.description} onChange={v=>setCourse(i,'description',v)} type="textarea" rows={2} />
          </Accordion>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,courses:[...p.courses,{_id:Date.now(),title:'New Course',tag:'DEV',description:'Description.'}]}))} label="Add Course" />
      <Sub text="Why Choose Us Features" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {data.features.map((f,i) => (
          <Card key={f._id}>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">Feature {i+1}</p>
            <Field label="Title" value={f.title} onChange={v=>setFeat(i,'title',v)} />
            <Field label="Description" value={f.desc} onChange={v=>setFeat(i,'desc',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <Sub text="FAQs" />
      <div className="space-y-3">
        {data.faqs.map((f,i) => (
          <Card key={f._id} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,faqs:p.faqs.filter((_,j)=>j!==i)}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">FAQ {i+1}</p>
            <Field label="Question" value={f.question} onChange={v=>setFaq(i,'question',v)} />
            <Field label="Answer" value={f.answer} onChange={v=>setFaq(i,'answer',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,faqs:[...p.faqs,{_id:Date.now(),question:'New question?',answer:'Answer.'}]}))} label="Add FAQ" />
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── OUR STORY EDITOR ─────────────────────────────────────────────────────────
const OurStoryEditor = () => {
  const {data,setData,save,reset,saved} = useSave('ourStory');
  if(!data) return null;
  const setSec=(i,k,v)=>setData(p=>({...p,sections:p.sections.map((s,j)=>j===i?{...s,[k]:v}:s)}));
  return (
    <div>
      <SectionHeader title="Our Story Page" iconD={IC.story} desc="Edit the Our Story / About page content." color="#0891B2" />
      <Card className="mb-5">
        <Field label="Top Badge" value={data.badge} onChange={v=>setData(p=>({...p,badge:v}))} />
        <Field label="Main Headline" value={data.headline} onChange={v=>setData(p=>({...p,headline:v}))} type="textarea" rows={2} />
        <Field label="Sub-headline" value={data.subheadline} onChange={v=>setData(p=>({...p,subheadline:v}))} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="CTA Button Text" value={data.cta?.text} onChange={v=>setData(p=>({...p,cta:{...p.cta,text:v}}))} />
          <Field label="CTA Link" value={data.cta?.link} onChange={v=>setData(p=>({...p,cta:{...p.cta,link:v}}))} />
        </div>
      </Card>
      <Sub text={`Story Sections (${data.sections.length})`} />
      <div className="space-y-3">
        {data.sections.map((s,i) => (
          <Card key={s._id} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,sections:p.sections.filter((_,j)=>j!==i)}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 pr-10">Section {i+1}</p>
            <Field label="Section Heading" value={s.heading} onChange={v=>setSec(i,'heading',v)} />
            <Field label="Body Text" value={s.body} onChange={v=>setSec(i,'body',v)} type="textarea" rows={3} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,sections:[...p.sections,{_id:Date.now(),heading:'New Section',body:'Content here.'}]}))} label="Add Section" />
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── COLLABORATIONS EDITOR ────────────────────────────────────────────────────
const CollaborationsEditor = () => {
  const {data,setData,save,reset,saved} = useSave('collaborations');
  if(!data) return null;
  const setHero =(k,v)=>setData(p=>({...p,hero:{...p.hero,[k]:v}}));
  const setMet  =(i,k,v)=>setData(p=>({...p,metrics:(p.metrics||[]).map((m,j)=>j===i?{...m,[k]:v}:m)}));
  const setTier =(i,k,v)=>setData(p=>({...p,tiers:(p.tiers||[]).map((t,j)=>j===i?{...t,[k]:v}:t)}));
  const setNode =(i,k,v)=>setData(p=>({...p,frameworkNodes:(p.frameworkNodes||[]).map((n,j)=>j===i?{...n,[k]:v}:n)}));
  const setFaq  =(i,k,v)=>setData(p=>({...p,faqs:(p.faqs||[]).map((f,j)=>j===i?{...f,[k]:v}:f)}));
  const nodes = data.frameworkNodes || [];
  return (
    <div>
      <SectionHeader title="Collaborations Page" iconD={IC.handshake} desc="Edit every section of the Collaborations page." color="#0056D2" />
      <Sub text="Hero Section" />
      <Card className="mb-5">
        <Field label="Badge" value={data.hero?.badge} onChange={v=>setHero('badge',v)} />
        <Field label="Headline" value={data.hero?.headline} onChange={v=>setHero('headline',v)} type="textarea" rows={2} />
        <Field label="Description" value={data.hero?.description} onChange={v=>setHero('description',v)} type="textarea" rows={2} />
        <Field label="Primary Button" value={data.hero?.primaryBtn} onChange={v=>setHero('primaryBtn',v)} />
      </Card>
      <Sub text={`Key Metrics (${(data.metrics||[]).length})`} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
        {(data.metrics||[]).map((m,i) => (
          <Card key={m._id||i} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,metrics:(p.metrics||[]).filter((_,j)=>j!==i)}))} />
            <div className="pr-8">
              <Field label="Label" value={m.label} onChange={v=>setMet(i,'label',v)} />
              <Field label="Count" value={m.count} onChange={v=>setMet(i,'count',v)} />
            </div>
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,metrics:[...(p.metrics||[]),{_id:Date.now(),label:'New Metric',count:'0+'}]}))} label="Add Metric" />
      <Sub text={`Partnership Tiers (${(data.tiers||[]).length})`} />
      <div className="space-y-3 mb-2">
        {(data.tiers||[]).map((t,i) => (
          <Card key={t._id||i} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,tiers:(p.tiers||[]).filter((_,j)=>j!==i)}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 pr-10">Tier {i+1}</p>
            <Field label="Title" value={t.title} onChange={v=>setTier(i,'title',v)} />
            <Field label="Description" value={t.desc} onChange={v=>setTier(i,'desc',v)} type="textarea" rows={3} />
            <div>
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Features (one per line)</label>
              <textarea value={t.features?.join('\n')??''} onChange={e=>setTier(i,'features',e.target.value.split('\n').map(s=>s.trim()).filter(Boolean))} rows={4}
                className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0056D2]/30 focus:border-[#0056D2] resize-none shadow-sm" />
            </div>
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,tiers:[...(p.tiers||[]),{_id:Date.now(),title:'New Tier',desc:'Description.',features:['Feature 1','Feature 2']}]}))} label="Add Tier" />
      <Sub text={`Framework Nodes (${nodes.length})`} />
      <div className="space-y-3 mb-2">
        {nodes.map((n,i) => (
          <Card key={n._id||i} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,frameworkNodes:(p.frameworkNodes||[]).filter((_,j)=>j!==i)}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 pr-10">Node {i+1}</p>
            <Field label="Title" value={n.title} onChange={v=>setNode(i,'title',v)} />
            <Field label="Detail" value={n.detail} onChange={v=>setNode(i,'detail',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,frameworkNodes:[...(p.frameworkNodes||[]),{_id:Date.now(),title:'New Node',detail:'Detail description.'}]}))} label="Add Framework Node" />
      <Sub text="FAQs" />
      <div className="space-y-3">
        {(data.faqs||[]).map((f,i) => (
          <Card key={f._id||i} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,faqs:(p.faqs||[]).filter((_,j)=>j!==i)}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3">FAQ {i+1}</p>
            <Field label="Question" value={f.question} onChange={v=>setFaq(i,'question',v)} />
            <Field label="Answer" value={f.answer} onChange={v=>setFaq(i,'answer',v)} type="textarea" rows={2} />
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,faqs:[...(p.faqs||[]),{_id:Date.now(),question:'New question?',answer:'Answer.'}]}))} label="Add FAQ" />
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── CAREER HUB EDITOR ────────────────────────────────────────────────────────
const CareerHubEditor = () => {
  const {data,setData,save,reset,saved} = useSave('careerHub');
  if(!data) return null;
  const setH  =(k,v)=>setData(p=>({...p,hero:{...p.hero,[k]:v}}));
  const setSS =(k,v)=>setData(p=>({...p,successStory:{...p.successStory,[k]:v}}));
  const setDNA=(k,v)=>setData(p=>({...p,dna:{...p.dna,[k]:v}}));
  const setDot=(i,k,v)=>setData(p=>({...p,dna:{...p.dna,dots:(p.dna?.dots||[]).map((d,j)=>j===i?{...d,[k]:v}:d)}}));
  const setCtc=(k,v)=>setData(p=>({...p,contact:{...p.contact,[k]:v}}));
  const setPanel=(i,k,v)=>setData(p=>({...p,panels:(p.panels||[]).map((pl,j)=>j===i?{...pl,[k]:v}:pl)}));
  const panels = data.panels||[];
  const dots   = data.dna?.dots||[];
  return (
    <div>
      <SectionHeader title="Career Hub Page" iconD={IC.about} desc="Edit every section of the Career Hub page." color="#6366F1" />
      <Sub text="Hero Section" />
      <Card className="mb-5">
        <Field label="Badge" value={data.hero?.badge} onChange={v=>setH('badge',v)} />
        <Field label="Heading" value={data.hero?.heading} onChange={v=>setH('heading',v)} />
        <Field label="Description" value={data.hero?.description} onChange={v=>setH('description',v)} type="textarea" rows={2} />
      </Card>
      <Sub text={`Recruitment Panels (${panels.length})`} />
      <div className="space-y-3 mb-2">
        {panels.map((pl,i)=>(
          <Card key={pl._id||i} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,panels:(p.panels||[]).filter((_,j)=>j!==i)}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 pr-10">Panel {i+1}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Tag (small label)" value={pl.tag} onChange={v=>setPanel(i,'tag',v)} />
              <Field label="Heading" value={pl.heading} onChange={v=>setPanel(i,'heading',v)} />
            </div>
            <Field label="Description" value={pl.description} onChange={v=>setPanel(i,'description',v)} type="textarea" rows={2} />
            <ImageField label="Panel Image (URL / Upload / asset filename)" value={pl.image} onChange={v=>setPanel(i,'image',v)} placeholder="client-img.jpg or https://..." />
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,panels:[...(p.panels||[]),{_id:Date.now(),tag:'NEW TAG',heading:'Recruitments',description:'Description here.',image:''}]}))} label="Add Panel" />
      <Sub text="Success Story Section" />
      <Card className="mb-5">
        <Field label="Heading" value={data.successStory?.heading} onChange={v=>setSS('heading',v)} />
        <Field label="Description" value={data.successStory?.description} onChange={v=>setSS('description',v)} type="textarea" rows={3} />
      </Card>
      <Sub text="Our DNA Section" />
      <Card className="mb-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Badge" value={data.dna?.badge} onChange={v=>setDNA('badge',v)} />
          <Field label="Heading" value={data.dna?.heading} onChange={v=>setDNA('heading',v)} />
        </div>
      </Card>
      <div className="space-y-3 mb-2">
        {dots.map((dot,i)=>(
          <Card key={dot._id||i} className="relative">
            <DelBtn onClick={()=>setData(p=>({...p,dna:{...p.dna,dots:(p.dna?.dots||[]).filter((_,j)=>j!==i)}}))} />
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-3 pr-10">DNA Step {i+1}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Label" value={dot.label} onChange={v=>setDot(i,'label',v)} />
              <Field label="Description" value={dot.desc} onChange={v=>setDot(i,'desc',v)} />
            </div>
          </Card>
        ))}
      </div>
      <AddBtn onClick={()=>setData(p=>({...p,dna:{...p.dna,dots:[...(p.dna?.dots||[]),{_id:Date.now(),label:'STEP',desc:'Description.'}]}}))} label="Add DNA Step" />
      <Sub text="Contact / WhatsApp Section" />
      <Card>
        <Field label="Heading" value={data.contact?.heading} onChange={v=>setCtc('heading',v)} />
        <Field label="Description" value={data.contact?.description} onChange={v=>setCtc('description',v)} type="textarea" rows={2} />
        <Field label="Button Text" value={data.contact?.buttonText} onChange={v=>setCtc('buttonText',v)} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="WhatsApp Number (with country code, no +)" value={data.contact?.whatsappNumber} onChange={v=>setCtc('whatsappNumber',v)} />
          <Field label="WhatsApp Message" value={data.contact?.whatsappMessage} onChange={v=>setCtc('whatsappMessage',v)} />
        </div>
      </Card>
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── CLIENTS EDITOR ───────────────────────────────────────────────────────────
const ClientsEditor = () => {
  const {data,setData,save,reset,saved} = useSave('clients');
  if(!data) return null;
  const names = Array.isArray(data.names) ? data.names : [];
  return (
    <div>
      <SectionHeader title="Clients Ticker" iconD={IC.about} desc="Edit the scrolling client name ticker on the home page." color="#10B981" />
      <Card className="mb-4">
        <Field label="Section Heading" value={data.heading} onChange={v=>setData(p=>({...p,heading:v}))} />
      </Card>
      <Card>
        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Client Names (one per line)</label>
        <textarea
          value={names.join('\n')}
          onChange={e=>setData(p=>({...p,names:e.target.value.split('\n').map(s=>s.trim()).filter(Boolean)}))}
          rows={12}
          placeholder={"TechCorp Systems\nInnovate AI\nBuildIt Infra\n..."}
          className="w-full bg-white border border-gray-200 text-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#10B981]/30 focus:border-[#10B981] resize-none shadow-sm"
        />
        <p className="mt-2 text-[11px] text-gray-400">Each line becomes one client name in the scrolling ticker.</p>
      </Card>
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── CONTACT EDITOR ───────────────────────────────────────────────────────────
const ContactEditor = () => {
  const {data,setData,save,reset,saved} = useSave('contact');
  if(!data) return null;
  const set=(k,v)=>setData(p=>({...p,[k]:v}));
  return (
    <div>
      <SectionHeader title="Contact Page" iconD={IC.mail} desc="Edit headings, contact details, and form text." color="#059669" />
      <Card className="mb-4">
        <Field label="Badge" value={data.badge} onChange={v=>set('badge',v)} />
        <Field label="Headline" value={data.headline} onChange={v=>set('headline',v)} type="textarea" rows={2} />
        <Field label="Description" value={data.description} onChange={v=>set('description',v)} type="textarea" rows={2} />
      </Card>
      <Card className="mb-4">
        <p className="text-[11px] font-black text-[#059669] uppercase tracking-widest mb-3">Contact Details</p>
        <Field label="Address" value={data.address} onChange={v=>set('address',v)} type="textarea" rows={2} />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone" value={data.phone} onChange={v=>set('phone',v)} />
          <Field label="Email" value={data.email} onChange={v=>set('email',v)} />
        </div>
        <Field label="Office Hours" value={data.hours} onChange={v=>set('hours',v)} />
      </Card>
      <Card>
        <p className="text-[11px] font-black text-[#059669] uppercase tracking-widest mb-3">Contact Form</p>
        <Field label="Form Heading" value={data.formHeading} onChange={v=>set('formHeading',v)} />
        <Field label="Form Sub-heading" value={data.formSubheading} onChange={v=>set('formSubheading',v)} type="textarea" rows={2} />
        <Field label="Submit Button Text" value={data.submitBtn} onChange={v=>set('submitBtn',v)} />
      </Card>
      <SaveBar onSave={save} onReset={reset} saved={saved} />
    </div>
  );
};

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  { group: 'Home Page', items: [
    { key:'hero',         label:'Hero Slider',      d:IC.hero,      c:'#0056D2' },
    { key:'welcome',      label:'Welcome / About',  d:IC.about,     c:'#10B981' },
    { key:'stats',        label:'Stats',            d:IC.stats,     c:'#7C3AED' },
    { key:'howWeDo',      label:'How We Do It',     d:IC.process,   c:'#3B82F6' },
    { key:'whyChooseUs',  label:'Why Choose Us',    d:IC.star,      c:'#F59E0B' },
    { key:'testimonials', label:'Testimonials',     d:IC.star,      c:'#F59E0B' },
    { key:'meetTeam',     label:'Meet the Crew',    d:IC.about,     c:'#06B6D4' },
    { key:'clients',      label:'Clients Ticker',   d:IC.about,     c:'#10B981' },
    { key:'footer',       label:'Footer',           d:IC.map,       c:'#10B981' },
  ]},
  { group: 'Service Pages', items: [
    { key:'softwareSolutions', label:'Software Solutions', d:IC.code,  c:'#7C3AED' },
    { key:'courses',           label:'Courses / Academy',  d:IC.book,  c:'#DB2777' },
  ]},
  { group: 'Other Pages', items: [
    { key:'internships',    label:'Internships',     d:IC.grad,      c:'#2563EB' },
    { key:'products',       label:'Products',        d:IC.box,       c:'#6366F1' },
    { key:'studentProjects',label:'Student Projects',d:IC.flask,     c:'#0891B2' },
    { key:'ourStory',       label:'Our Story',       d:IC.story,     c:'#0891B2' },
    { key:'collaborations', label:'Collaborations',  d:IC.handshake, c:'#0056D2' },
    { key:'careerHub',      label:'Career Hub',      d:IC.about,     c:'#6366F1' },
    { key:'contact',        label:'Contact Page',    d:IC.mail,      c:'#059669' },
  ]},
];

const EDITORS = {
  hero: HeroEditor, welcome: WelcomeEditor, stats: StatsEditor,
  howWeDo: HowWeDoEditor, whyChooseUs: WhyChooseEditor, testimonials: TestimonialsEditor,
  meetTeam: MeetTeamEditor, clients: ClientsEditor, footer: FooterEditor,
  internships: InternshipsEditor, products: ProductsEditor,
  studentProjects: StudentProjectsEditor, softwareSolutions: SoftwareSolutionsEditor,
  courses: CoursesEditor, ourStory: OurStoryEditor, collaborations: CollaborationsEditor,
  careerHub: CareerHubEditor, contact: ContactEditor,
};

// ─── MAIN PANEL ──────────────────────────────────────────────────────────────────────────────
const CMSPanel = () => {
  const navigate = useNavigate();
  const { resetAll } = useContent();
  const [active, setActive] = useState('hero');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('adminToken')) navigate('/admin/login?redirect=/admin/cms');
  }, [navigate]);

  const handleLogout = () => { localStorage.removeItem('adminToken'); navigate('/admin/login'); };
  const activeInfo = NAV_GROUPS.flatMap(g => g.items).find(n => n.key === active);
  const Editor = EDITORS[active] || null;

  return (
    <div className="min-h-screen bg-[#F7F8FC] flex flex-col">
      {/* TOP BAR */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}>
            <Icon d={mobileOpen ? IC.close : IC.menu} size={15} />
          </button>
          <div className="p-1.5 rounded-xl bg-[#F0F6FF]">
            <img src={logo} alt="DVein" className="h-7 w-auto object-contain" />
          </div>
          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-gray-100">
            <span className="text-gray-900 font-bold text-sm">Content Manager</span>
            <span className="bg-[#0056D2]/10 text-[#0056D2] text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest">CMS</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-600 px-3.5 py-2 rounded-xl font-bold text-xs transition-all">
            <Icon d={IC.eye} size={11} /> Preview Site
          </a>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-500 border border-red-100 px-3.5 py-2 rounded-xl font-bold text-xs transition-all">
            <Icon d={IC.logout} size={11} /><span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        {mobileOpen && <div className="fixed inset-0 bg-black/20 z-30 lg:hidden" onClick={() => setMobileOpen(false)} />}

        {/* SIDEBAR */}
        <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-100 flex flex-col transition-transform duration-300 lg:translate-x-0 pt-16 lg:pt-0 ${mobileOpen?'translate-x-0 shadow-xl':'-translate-x-full'}`}>
          <div className="px-4 py-3.5 border-b border-gray-50 bg-[#0B1120]">
            <p className="text-[10px] font-black text-[#00C49F] uppercase tracking-[0.15em]">Website Sections</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{NAV_GROUPS.flatMap(g=>g.items).length} editable sections</p>
          </div>
          <nav className="flex-1 overflow-y-auto p-3 space-y-5">
            {NAV_GROUPS.map(({ group, items }) => (
              <div key={group}>
                <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest px-3 mb-1.5">{group}</p>
                <div className="space-y-0.5">
                  {items.map(({ key, label, d, c }) => (
                    <button key={key} onClick={() => { setActive(key); setMobileOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${active===key?'text-white shadow-md':'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                      style={active===key ? { backgroundColor: c, boxShadow: `0 4px 14px ${c}30` } : {}}>
                      <Icon d={d} size={13} /> {label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
          <div className="p-3 border-t border-gray-50">
            <button onClick={() => { if(window.confirm('Reset ALL content to defaults?')) resetAll(); }}
              className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-400 border border-red-100 px-4 py-2.5 rounded-xl font-bold text-xs transition-all">
              <Icon d={IC.reset} size={10} /> Reset All to Default
            </button>
          </div>
        </aside>

        {/* MAIN EDITOR */}
        <main className="flex-1 overflow-y-auto min-w-0">
          <div className="bg-white border-b border-gray-100 px-6 lg:px-10 py-3 flex items-center gap-2.5 sticky top-0 z-10">
            {activeInfo && (
              <>
                <Icon d={activeInfo.d} size={13} className="text-gray-400" />
                <span className="text-sm font-bold text-gray-700">{activeInfo.label}</span>
                <span className="ml-auto text-[10px] font-bold text-gray-300 uppercase tracking-widest hidden sm:block">Auto-saved · Synced to Server</span>
              </>
            )}
          </div>
          <div className="px-6 lg:px-10 py-8 max-w-5xl mx-auto w-full">
            {Editor && <Editor />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default CMSPanel;
