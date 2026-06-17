import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultContent } from '../lib/contentUtils';
import { getCmsContent, saveCmsContent, getCurrentUser } from '../lib/firebaseService';

// ─── PERSISTENT STORAGE (localStorage + IndexedDB fallback) ──────────────────
const IDB_NAME  = 'dvein_cms_db';
const IDB_STORE = 'content';
const IDB_KEY   = 'dvein_cms_content';

const idbSave = (data) => new Promise((resolve) => {
  try {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = (e) => e.target.result.createObjectStore(IDB_STORE);
    req.onsuccess = (e) => {
      const tx = e.target.result.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).put(data, IDB_KEY);
      tx.oncomplete = () => resolve(true);
      tx.onerror    = () => resolve(false);
    };
    req.onerror = () => resolve(false);
  } catch (err) { console.error('[idbSave]', err); resolve(false); }
});

const idbLoad = () => new Promise((resolve) => {
  try {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onupgradeneeded = (e) => e.target.result.createObjectStore(IDB_STORE);
    req.onsuccess = (e) => {
      const tx  = e.target.result.transaction(IDB_STORE, 'readonly');
      const get = tx.objectStore(IDB_STORE).get(IDB_KEY);
      get.onsuccess = () => resolve(get.result ?? null);
      get.onerror   = () => resolve(null);
    };
    req.onerror = () => resolve(null);
  } catch (err) { console.error('[idbLoad]', err); resolve(null); }
});

const idbClear = () => new Promise((resolve) => {
  try {
    const req = indexedDB.open(IDB_NAME, 1);
    req.onsuccess = (e) => {
      const tx = e.target.result.transaction(IDB_STORE, 'readwrite');
      tx.objectStore(IDB_STORE).delete(IDB_KEY);
      tx.oncomplete = () => resolve(true);
      tx.onerror    = () => resolve(false);
    };
    req.onerror = () => resolve(false);
  } catch (err) { console.error('[idbClear]', err); resolve(false); }
});

const safeStringify = (data) => {
  const seen = new WeakSet();
  return JSON.stringify(data, (key, value) => {
    if (value instanceof Node || value instanceof Window) return undefined;
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return undefined;
      seen.add(value);
    }
    return value;
  });
};

const persistContent = (data) => {
  const json = safeStringify(data);
  // ── 1. Local cache ──────────────────────────────────────────────────────────
  try {
    localStorage.setItem('dvein_cms_content', json);
  } catch (err) {
    // localStorage full (likely large base64 images) — fall back to IndexedDB
    console.warn('[ContentContext] localStorage full, falling back to IndexedDB:', err);
    try { localStorage.removeItem('dvein_cms_content'); } catch {}
    idbSave(data);
  }
  // ── 2. Firestore sync (only when logged in as admin) ───────────────────────
  try {
    if (getCurrentUser()) {
      saveCmsContent(data).catch((err) => console.warn('[ContentContext] Firestore sync failed:', err));
    }
  } catch (err) {
    console.error('[ContentContext] persistContent sync error:', err);
  }
};

// ─── BUILD MERGED CONTENT ─────────────────────────────────────────────────────
const buildContent = (p) => {
  if (!p) return defaultContent;
  const merge = (key) => {
    if (!p[key]) return defaultContent[key];
    if (Array.isArray(defaultContent[key])) return p[key];
    return { ...defaultContent[key], ...p[key] };
  };
  return {
    hero:              { slides: p.hero?.slides || defaultContent.hero.slides },
    welcome:           merge('welcome'),
    stats:             p.stats || defaultContent.stats,
    howWeDo:           { ...merge('howWeDo'), steps: p.howWeDo?.steps || defaultContent.howWeDo.steps },
    whyChooseUs:       { ...merge('whyChooseUs'), features: p.whyChooseUs?.features || defaultContent.whyChooseUs.features },
    testimonials:      { ...merge('testimonials'), reviews: p.testimonials?.reviews || defaultContent.testimonials.reviews },
    footer:            merge('footer'),
    meetTeam:          p.meetTeam ? { ...defaultContent.meetTeam, ...p.meetTeam, members: Array.isArray(p.meetTeam.members) ? p.meetTeam.members : defaultContent.meetTeam.members } : defaultContent.meetTeam,
    internships:       p.internships       ? { ...defaultContent.internships,       ...p.internships       } : defaultContent.internships,
    products:          p.products          ? { ...defaultContent.products,          ...p.products          } : defaultContent.products,
    studentProjects:   p.studentProjects   ? { ...defaultContent.studentProjects,   ...p.studentProjects   } : defaultContent.studentProjects,
    softwareSolutions: p.softwareSolutions ? { ...defaultContent.softwareSolutions, ...p.softwareSolutions } : defaultContent.softwareSolutions,
    courses:           p.courses           ? { ...defaultContent.courses,           ...p.courses           } : defaultContent.courses,
    ourStory:          p.ourStory          ? { ...defaultContent.ourStory,          ...p.ourStory          } : defaultContent.ourStory,
    collaborations:    p.collaborations    ? {
      ...defaultContent.collaborations,
      ...p.collaborations,
      metrics:        p.collaborations.metrics        || defaultContent.collaborations.metrics,
      tiers:          p.collaborations.tiers          || defaultContent.collaborations.tiers,
      frameworkNodes: p.collaborations.frameworkNodes || defaultContent.collaborations.frameworkNodes,
      faqs:           p.collaborations.faqs           || defaultContent.collaborations.faqs,
    } : defaultContent.collaborations,
    careerHub:         p.careerHub ? {
      ...defaultContent.careerHub,
      ...p.careerHub,
      panels: p.careerHub.panels || defaultContent.careerHub.panels,
      // Merge successStory including the new images[] and videos[] arrays
      successStory: p.careerHub.successStory ? {
        ...defaultContent.careerHub.successStory,
        ...p.careerHub.successStory,
        images: Array.isArray(p.careerHub.successStory.images) ? p.careerHub.successStory.images : defaultContent.careerHub.successStory.images,
        videos: Array.isArray(p.careerHub.successStory.videos) ? p.careerHub.successStory.videos : defaultContent.careerHub.successStory.videos,
      } : defaultContent.careerHub.successStory,
      dna: p.careerHub.dna ? { ...defaultContent.careerHub.dna, ...p.careerHub.dna, dots: p.careerHub.dna.dots || defaultContent.careerHub.dna.dots } : defaultContent.careerHub.dna,
    } : defaultContent.careerHub,
    clients:           defaultContent.clients,
    contact:           merge('contact'),
  };
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────
const ContentContext = createContext(null);

export const ContentProvider = ({ children }) => {
  const [content, setContent] = useState(() => {
    // Synchronous first load from localStorage
    try {
      const saved = localStorage.getItem('dvein_cms_content');
      if (saved) return buildContent(JSON.parse(saved));
    } catch (err) {
      console.error('[ContentContext] localStorage initial load failed:', err);
    }
    return defaultContent;
  });

  // On mount: Firestore is the authoritative source → fall back to IndexedDB
  useEffect(() => {
    (async () => {
      // ── Firestore is source of truth ────────────────────────────────────────
      try {
        const data = await getCmsContent();
        if (data && Object.keys(data).length > 0) {
          setContent(buildContent(data));
          // Update local cache so next page load is instant
          try { localStorage.setItem('dvein_cms_content', safeStringify(data)); } catch {}
          return;
        }
      } catch (err) {
        console.error('[ContentContext] Firestore load failed:', err);
      }
      // ── IndexedDB fallback (localStorage already loaded in useState) ────────
      try {
        const ls = localStorage.getItem('dvein_cms_content');
        if (ls) return;
      } catch (err) {
        console.warn('[ContentContext] localStorage read failed, checking IndexedDB:', err);
      }
      const idb = await idbLoad();
      if (idb) setContent(buildContent(idb));
    })();
  }, []);

  const updateSection = (section, data) => {
    setContent(prev => {
      const updated = { ...prev, [section]: data };
      persistContent(updated);
      return updated;
    });
  };

  const resetSection = (section) => updateSection(section, defaultContent[section]);

  const resetAll = () => {
    try { localStorage.removeItem('dvein_cms_content'); } catch {}
    idbClear();
    setContent(defaultContent);
    // Also clear Firestore so all visitors see defaults
    try {
      if (getCurrentUser()) {
        saveCmsContent({}).catch((err) => console.error('[ContentContext] resetAll Firestore sync failed:', err));
      }
    } catch (err) {
      console.error('[ContentContext] resetAll error:', err);
    }
  };

  return (
    <ContentContext.Provider value={{ content, updateSection, resetSection, resetAll, defaultContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const ctx = useContext(ContentContext);
  if (!ctx) throw new Error('useContent must be used within <ContentProvider>');
  return ctx;
};
