import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaFileAlt, FaExternalLinkAlt } from 'react-icons/fa';
import clientImg from '../assets/client-img.jpg';
import dveinLogo from '../assets/logo.png';
import { useContent } from '../context/ContentContext';

const panelAssets = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true, import: 'default' });
const resolveImg = (img) => {
  if (!img) return '';
  if (/^(data:|https?:|\/)/.test(img)) return img;
  return panelAssets[`../assets/${img}`] || img;
};

const CareerHubRequirementDetails = () => {
  const { id } = useParams();
  const { content } = useContent();
  const panels = content?.careerHub?.panels || [];
  const index = panels.findIndex((p, i) => String(p._id ?? i) === String(id));
  const panel = index !== -1 ? panels[index] : null;

  if (!panel) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-2xl font-black text-slate-900 mb-4">Requirement not found</h1>
        <Link to="/career-hub" className="text-indigo-600 font-bold text-sm">&larr; Back to Career Hub</Link>
      </div>
    );
  }

  const posters = (panel.posters || []).filter(Boolean);
  const documents = (panel.documents || []).filter(d => d.url);

  return (
    <div className="font-sans text-slate-900 bg-gradient-to-br from-blue-50 via-white to-indigo-50 min-h-screen pt-24 pb-20 selection:bg-purple-600 selection:text-white overflow-x-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <Link to="/career-hub" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 text-xs font-bold uppercase tracking-widest mb-8 transition-colors">
          <FaArrowLeft /> Back to the Career Hub
        </Link>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="relative h-72 md:h-96 overflow-hidden rounded-[2rem] shadow-xl border border-slate-100 mb-10">
          <img
            src={resolveImg(panel.image) || (index === 0 ? clientImg : dveinLogo)}
            alt={panel.tag}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = index === 0 ? clientImg : dveinLogo; }}
          />
        </motion.div>

        <span className="text-[11px] font-black uppercase tracking-[0.35em] text-indigo-600 mb-3 block">{panel.tag}</span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-6 font-heading">{panel.heading} — Requirements</h1>
        <p className="text-slate-600 text-base leading-relaxed max-w-3xl mb-14">{panel.description}</p>

        {posters.length > 0 && (
          <div className="mb-14">
            <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Posters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {posters.map((poster, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="rounded-[1.5rem] overflow-hidden border border-slate-100 shadow-sm bg-white">
                  <img src={resolveImg(poster)} alt={`${panel.heading} poster ${i + 1}`} className="w-full h-72 object-cover" />
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {documents.length > 0 && (
          <div>
            <h2 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tight">Documentation</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {documents.map((doc, i) => (
                <a
                  key={doc._id || i}
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-lg hover:border-indigo-200 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg shrink-0">
                    <FaFileAlt />
                  </div>
                  <span className="flex-1 text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">{doc.label}</span>
                  <FaExternalLinkAlt className="text-slate-300 group-hover:text-indigo-500 transition-colors text-xs" />
                </a>
              ))}
            </div>
          </div>
        )}

        {posters.length === 0 && documents.length === 0 && (
          <p className="text-slate-400 text-sm italic">No posters or documentation have been added for this track yet.</p>
        )}
      </div>
    </div>
  );
};

export default CareerHubRequirementDetails;
