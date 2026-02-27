import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import BottomNav from './components/ui/BottomNav';
import SunnyGuide from './components/sunny/SunnyGuide';
import IntroSlides from './components/IntroSlides';
import TitleScreen from './components/TitleScreen';
import Home from './pages/Home';
import Appointments from './pages/Appointments';
import AppointmentDetail from './pages/AppointmentDetail';
import BookAppointment from './pages/BookAppointment';
import Medications from './pages/Medications';
import Vitals from './pages/Vitals';
import Explore from './pages/Explore';
import Nutrition from './pages/explore/Nutrition';
import Games from './pages/explore/Games';
import Community from './pages/explore/Community';
import Exercise from './pages/explore/Exercise';
import Longevity from './pages/explore/Longevity';
import AIAssistant from './pages/explore/AIAssistant';
import Blogs from './pages/explore/Blogs';
import HealthNews from './pages/explore/HealthNews';
import Settings from './pages/Settings';
import AboutCreator from './pages/AboutCreator';
import RecipeBook from './pages/explore/RecipeBook';
import ClosingSlide from './components/ClosingSlide';
import EngagementMetrics from './pages/EngagementMetrics';
import Today from './pages/Today';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppContent() {
  const { pathname } = useLocation();
  const isClosingSlide = pathname === '/end-demo';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/appointments" element={<Appointments />} />
        <Route path="/appointments/:id" element={<AppointmentDetail />} />
        <Route path="/book-appointment" element={<BookAppointment />} />
        <Route path="/medications" element={<Medications />} />
        <Route path="/vitals" element={<Vitals />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/explore/nutrition" element={<Nutrition />} />
        <Route path="/explore/nutrition/recipe-book" element={<RecipeBook />} />
        <Route path="/explore/games" element={<Games />} />
        <Route path="/explore/community" element={<Community />} />
        <Route path="/explore/exercise" element={<Exercise />} />
        <Route path="/explore/longevity" element={<Longevity />} />
        <Route path="/explore/ai-assistant" element={<AIAssistant />} />
        <Route path="/explore/blogs" element={<Blogs />} />
        <Route path="/explore/health-news" element={<HealthNews />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/about-creator" element={<AboutCreator />} />
        <Route path="/end-demo" element={<ClosingSlide onBack={() => window.history.back()} />} />
        <Route path="/engagement-metrics" element={<EngagementMetrics />} />
        <Route path="/today" element={<Today />} />
      </Routes>
      {!isClosingSlide && <BottomNav />}
      {!isClosingSlide && <SunnyGuide />}
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('title'); // 'title' → 'intro' → 'app'

  // Listen for restart-demo event from anywhere in the app
  useEffect(() => {
    const handleRestart = () => setScreen('intro');
    window.addEventListener('restart-demo', handleRestart);
    return () => window.removeEventListener('restart-demo', handleRestart);
  }, []);

  if (screen === 'title') {
    return <TitleScreen onContinue={() => setScreen('intro')} />;
  }

  if (screen === 'intro') {
    return <IntroSlides onComplete={() => {
      // Reset Sunny intro so it shows fresh after the pitch deck
      localStorage.removeItem('sunnyIntroSeen');
      setScreen('app');
    }} />;
  }

  return <AppContent />;
}
