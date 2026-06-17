// ─── Firebase Configuration ───────────────────────────────────────────────────
// All values come from Vite env vars (VITE_ prefix required for browser exposure).
// Create a .env file in /frontend with these values after setting up Firebase.
//
// See FIREBASE_SETUP_GUIDE.md in the project root for full setup instructions.

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey:            import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain:        import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_FIREBASE_APP_ID,
};

// Guard: warn clearly in dev if env vars are missing
const missingVars = Object.entries(firebaseConfig)
  .filter(([, v]) => !v)
  .map(([k]) => k);

if (missingVars.length > 0) {
  console.warn(
    '[Firebase] Missing env vars:', missingVars.join(', '),
    '\nCreate frontend/.env with your Firebase project credentials.',
    '\nSee FIREBASE_SETUP_GUIDE.md for instructions.',
  );
}

export const app  = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);
