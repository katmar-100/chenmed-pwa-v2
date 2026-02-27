# MyChenMed v2 — Senior-Friendly PWA

A beautiful, modern demo PWA prototype for ChenMed. Built with React 18, Vite, Tailwind CSS, Framer Motion, and Recharts.

**This is a demo application using mock data only. No real patient data or PHI.**

Designed by Katherine Atmar. Powered by ChenMed.

## Features

### Core Screens
- **Home** — Personalized greeting, profile card with avatar, care team, summary cards with animations
- **Appointments** — Doctor cards with SVG avatars and star ratings, tap-to-expand details, 5-step booking flow with calendar and time picker, "Share with a Loved One" feature
- **Medications** — Pill illustrations per medication, animated progress ring, "Mark as Taken" with spring animation, medication info modals with plain-language explanations, confetti on completion
- **Vitals** — Blood pressure, weight, blood sugar, heart rate tabs with Recharts trend charts, conversational health summaries, tips, and community group join
- **Explore** — 6-section wellness toolkit:
  - Nutrition (recipes with search, video mockups)
  - Games (Sudoku, Word Search, Trivia, Memory Match — all playable!)
  - Community (groups, mock feeds, events, privacy controls)
  - Exercise (step tracker, chair exercises, walking programs)
  - Longevity (wellness score, habit tracker, daily tips, articles)
  - AI Assistant (chat interface with pre-built responses)

### Special Features
- **Sunny** — Animated guide character with idle detection (15s) and contextual tips
- **4 Color Modes** — ChenMed Classic, Ocean Calm, Sunset Warm, High Contrast
- **3 Font Sizes** — Normal (18px), Large (22px), Extra Large (26px)
- **Profile Editing** — 8 SVG avatar options, editable fields, emergency contact
- **Frosted Glass Nav** — Bottom navigation with blur effect

### Senior-Friendly Design
- Base font 18px+ with larger options
- All tap targets 48px minimum
- Icon + text labels on navigation
- Conversational, warm language throughout
- No hover-dependent interactions
- High contrast option for maximum readability

## Tech Stack

- React 18 + Vite
- Tailwind CSS
- Framer Motion (animations)
- Recharts (vitals charts)
- Lucide React (icons)
- vite-plugin-pwa (installability)
- localStorage (all persistence)

## Getting Started

```bash
cd chenmed-pwa-v2
npm install
npm run dev
```

Open http://localhost:5173

### Build for Production

```bash
npm run build
npm run preview
```

## Deploy

### Netlify
1. Push to GitHub
2. Connect in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel
1. Push to GitHub
2. Import in Vercel
3. Framework: Vite
4. Deploy

## Project Structure

```
src/
├── components/
│   ├── ui/          Button, Card, Modal, Toggle, ProgressRing, StarRating, BottomNav, PageShell
│   ├── features/    DoctorAvatar, PillIcon, AvatarPicker, Confetti
│   └── sunny/       SunnyCharacter, SunnyGuide
├── pages/           Home, Appointments, AppointmentDetail, BookAppointment, Medications, Vitals, Explore, Settings
│   └── explore/     Nutrition, Games, Community, Exercise, Longevity, AIAssistant
├── games/           Sudoku, WordSearch, Trivia, MemoryMatch
├── context/         AppContext
├── data/            mockData
├── utils/           seedData, helpers
├── styles/          themes
└── hooks/           useLocalStorage
```

## License

Demo prototype — not for production use.
