# Firebase Setup Guide for DVein Innovations Website

This guide walks you through connecting the DVein frontend to Firebase from scratch. Follow each step in order.

---

## Step 1 — Create a Firebase Project

1. Go to **https://console.firebase.google.com**
2. Click **"Add project"**
3. Enter project name: `dvein-web` (or any name you prefer)
4. Disable Google Analytics (optional — not needed for this project)
5. Click **"Create project"** and wait ~30 seconds

---

## Step 2 — Register a Web App

1. From the Firebase project dashboard, click the **`</>`** (Web) icon
2. App nickname: `DVein Frontend`
3. Check **"Also set up Firebase Hosting"** (you can skip this and set it up later)
4. Click **"Register app"**
5. You will see an `firebaseConfig` object like this:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "dvein-web.firebaseapp.com",
  projectId: "dvein-web",
  storageBucket: "dvein-web.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};
```

6. **Copy these values** — you will need them in Step 4

---

## Step 3 — Enable Firebase Services

### 3a — Firestore Database
1. In the left sidebar, click **"Firestore Database"**
2. Click **"Create database"**
3. Choose **"Start in test mode"** (we will add security rules later)
4. Select a region close to your users (e.g. `asia-south1` for India)
5. Click **"Enable"**

### 3b — Firebase Authentication
1. In the left sidebar, click **"Authentication"**
2. Click **"Get started"**
3. Under **"Sign-in method"**, click **"Email/Password"**
4. Toggle **"Enable"** → Save

#### Create the Admin User
1. Go to **Authentication → Users tab**
2. Click **"Add user"**
3. Email: `admin@dveininnovations.com`
4. Password: choose a strong password (save it securely!)
5. Click **"Add user"**

> This is the account you will use to log in to the Admin CMS panel.

### 3c — Firebase Storage

> **Not required.** The project runs on the Spark (free, no-billing) plan which does not include Storage.
> Images and videos are managed via pasted URLs (ImgBB, Cloudinary, or any image CDN).
> Skip this step entirely.

---

## Step 4 — Configure the Frontend

1. In your project folder, navigate to `frontend/`
2. Copy the example env file:
   ```
   copy .env.example .env
   ```
   (On Mac/Linux: `cp .env.example .env`)

3. Open `frontend/.env` in a text editor and fill in your values from Step 2:
   ```
   VITE_FIREBASE_API_KEY=AIzaSy...
   VITE_FIREBASE_AUTH_DOMAIN=dvein-web.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=dvein-web
   VITE_FIREBASE_MESSAGING_SENDER_ID=1234567890
   VITE_FIREBASE_APP_ID=1:1234567890:web:abcdef123456
   ```

4. Save the file

---

## Step 5 — Install Dependencies and Run

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:5173** — the site should load.

Open the browser console (F12). If Firebase is connected correctly, you will NOT see any `[Firebase] Missing env vars` warnings.

---

## Step 6 — Set Firestore Security Rules

Once you have confirmed the site works, change Firestore from "test mode" (open access) to secure rules.

In **Firestore → Rules**, replace the contents with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // CMS content — anyone can read, only authenticated admins can write
    match /cms/content {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Jobs — public read, admin write
    match /jobs/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Success stories — public read, admin write
    match /success_stories/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Applications & contacts — admin only
    match /applications/{doc} {
      allow read, write: if request.auth != null;
    }
    match /contacts/{doc} {
      allow read, write: if request.auth != null;
    }
  }
}
```

Click **"Publish"**.

---

## Step 7 — Set Firebase Storage Rules

In **Storage → Rules**, replace the contents with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Resumes — admin can read; anyone can write (for job applications)
    match /resumes/{file} {
      allow read: if request.auth != null;
      allow write: if request.resource.size < 5 * 1024 * 1024
                   && request.resource.contentType.matches('application/(pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)');
    }

    // Career Hub media — admin only
    match /career-hub/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // General uploads — admin only
    match /uploads/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

Click **"Publish"**.

---

## Step 8 — Log In to the Admin Panel

1. Open your site at **http://localhost:5173/admin/login**
2. Enter the admin email and password you created in Step 3b
3. You should be redirected to the CMS panel
4. Any content you save will now sync to Firestore and be visible to all visitors immediately

---

## Step 9 — Upload Career Hub Photos & Videos

In the Admin CMS Panel:

1. Click **"Career Hub"** in the left sidebar
2. Scroll to **"Success Story Section"**
3. Under **"Success Story Images"**: click **"Add Image"** and either paste a URL or click **"Upload"** to upload a photo
4. Under **"Success Story Videos"**: click **"Add Video URL"** and paste a direct `.mp4` URL

**How to get a Firebase Storage video URL:**
- Go to **Firebase Console → Storage**
- Click **"Upload file"** and select your video
- After upload, click the file → copy the **Download URL**
- Paste that URL into the video field in the CMS

5. Click **"Save Changes"** — the carousel on the Career Hub page will update live

---

## Step 10 — Deploy to Firebase Hosting (Optional)

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# In the project root
firebase init hosting
# When asked "What do you want to use as your public directory?" → enter: frontend/dist
# Single-page app? → Yes
# Overwrite index.html? → No

# Build and deploy
cd frontend && npm run build
firebase deploy --only hosting
```

Your site will be live at `https://your-project-id.web.app`

---

## Quick Reference — Common Issues

| Problem | Fix |
|---|---|
| `[Firebase] Missing env vars` in console | Check `frontend/.env` — all 6 VITE_ vars must be filled in |
| Login fails with "Firebase: Error (auth/user-not-found)" | Create the admin user in Firebase Console → Authentication → Users |
| Login fails with "Firebase: Error (auth/operation-not-allowed)" | Enable Email/Password sign-in in Firebase Console → Authentication → Sign-in method |
| Firestore writes fail with "permission-denied" | Check security rules — user must be authenticated (Step 6) |
| Storage upload fails | Check Storage rules (Step 7) and file size/type |
| Site loads but CMS shows default content | Check browser console for Firestore errors; verify security rules allow reads |

---

*Last updated: June 2026 — DVein Innovations*
