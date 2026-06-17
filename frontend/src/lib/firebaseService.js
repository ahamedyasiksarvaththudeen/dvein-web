// ─── Firebase Service Layer ───────────────────────────────────────────────────
// All database / storage / auth operations go through this file.
// Components and context import from here — never from firebase.js directly.

import {
  collection, doc, getDocs, getDoc, setDoc, addDoc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged as _onAuthStateChanged,
} from 'firebase/auth';
import { db, auth } from './firebase';

// ─── CMS Content ──────────────────────────────────────────────────────────────

/** Fetch the full CMS content document. Returns {} if nothing saved yet. */
export const getCmsContent = async () => {
  try {
    const snap = await getDoc(doc(db, 'cms', 'content'));
    return snap.exists() ? snap.data() : {};
  } catch (err) {
    console.error('[firebaseService] getCmsContent failed:', err);
    return {};
  }
};

/** Save the full CMS content document. Admin must be signed in. */
export const saveCmsContent = async (data) => {
  try {
    await setDoc(doc(db, 'cms', 'content'), data);
    return true;
  } catch (err) {
    console.error('[firebaseService] saveCmsContent failed:', err);
    return false;
  }
};

// ─── Jobs ─────────────────────────────────────────────────────────────────────

/** Fetch all jobs ordered by newest first. */
export const getJobs = async () => {
  try {
    const q = query(collection(db, 'jobs'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
  } catch (err) {
    // Fallback: unordered fetch (index may not exist yet)
    try {
      const snap = await getDocs(collection(db, 'jobs'));
      return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
    } catch (e) {
      console.error('[firebaseService] getJobs failed:', e);
      return [];
    }
  }
};

// ─── Success Stories ──────────────────────────────────────────────────────────

/** Fetch all success stories ordered by newest first. */
export const getSuccessStories = async () => {
  try {
    const q = query(collection(db, 'success_stories'), orderBy('createdAt', 'desc'));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
  } catch {
    try {
      const snap = await getDocs(collection(db, 'success_stories'));
      return snap.docs.map(d => ({ _id: d.id, ...d.data() }));
    } catch (e) {
      console.error('[firebaseService] getSuccessStories failed:', e);
      return [];
    }
  }
};

// ─── Job Applications ─────────────────────────────────────────────────────────

/**
 * Submit a job application.
 * If a resume File is provided, it is uploaded to Firebase Storage first.
 * Returns { success: boolean, message: string }.
 */
export const submitApplication = async ({
  firstName, lastName, email, phone, portfolio, jobTitle, resume,
}) => {
  // Validate email format (BE-15 fix)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { success: false, message: 'Invalid email address.' };
  }

  try {
    // BE-23: Validate resume type + size (file is not uploaded — name is stored only)
    if (resume) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      ];
      const maxSize = 5 * 1024 * 1024; // 5 MB

      if (!allowedTypes.includes(resume.type)) {
        return { success: false, message: 'Resume must be a PDF, DOC, or DOCX file.' };
      }
      if (resume.size > maxSize) {
        return { success: false, message: 'Resume must be smaller than 5 MB.' };
      }
    }

    await addDoc(collection(db, 'applications'), {
      firstName, lastName, email, phone,
      portfolio: portfolio || null,
      jobTitle,
      resumeName: resume ? resume.name : null,
      status: 'Pending',
      createdAt: serverTimestamp(),
    });

    return { success: true, message: 'Application submitted successfully!' };
  } catch (err) {
    console.error('[firebaseService] submitApplication failed:', err);
    return { success: false, message: 'Failed to submit. Please try WhatsApp instead.' };
  }
};

// ─── Contact Form ─────────────────────────────────────────────────────────────

/** Save a contact form submission to Firestore. */
export const submitContact = async ({ name, email, service, message }) => {
  try {
    await addDoc(collection(db, 'contacts'), {
      name, email, service, message,
      createdAt: serverTimestamp(),
    });
    return { success: true, message: 'Message received! We will get back to you soon.' };
  } catch (err) {
    console.error('[firebaseService] submitContact failed:', err);
    return { success: false, message: 'Failed to send. Please reach us on WhatsApp.' };
  }
};

// ─── Admin Authentication ─────────────────────────────────────────────────────

/** Sign in with Firebase email/password auth. Returns { user } or throws. */
export const adminSignIn = async (email, password) => {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  return cred.user;
};

/** Sign out the current admin user. */
export const adminSignOut = () => firebaseSignOut(auth);

/** Subscribe to auth state changes. Returns unsubscribe function. */
export const onAuthStateChanged = (callback) => _onAuthStateChanged(auth, callback);

/** Returns the current Firebase user (or null if not signed in). */
export const getCurrentUser = () => auth.currentUser;
