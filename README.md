# Nuoi Lucifer

Next.js app for a donation/overlay website with a blog, status page, and OBS overlays.

## Requirements
- Node.js 18+ (recommended)
- Firebase project (Auth + Firestore)
- (Optional) Cloudinary for image uploads

## Setup
1) Install dependencies:
```bash
npm install
```

2) Create `.env.local` (see `.env.example`):
```bash
cp .env.example .env.local
```

3) Run dev server:
```bash
npm run dev
```
Open `http://localhost:3000`.

## Environment Variables
These are public (client) Firebase config values:
```
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

Cloudinary (used in the blog page):
```
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

Donate webhook poller (24/7 via cron):
```
DISCORD_DONATE_WEBHOOK_URL=
DONATE_SHEET_CSV_URL=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
DONATE_STATE_KEY=
```

## Key Pages
- `/` Home page
- `/donate` Donation page + VietQR
- `/overlay` QR overlay for OBS
- `/overlay/alert` Alert overlay for OBS
- `/status` Live status check
- `/blog` Blog with admin posting (Firestore)
- `/admin` Admin login
- `/docs` Setup documentation
- `/help` Support page

## Firebase Notes
Firebase config is loaded from public env vars in `src/lib/firebase.ts`. These values are **not secret** and must be exposed to the client.

## Scripts
```bash
npm run dev
npm run build
npm run start
npm run lint
```
