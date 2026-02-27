import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/ui/PageShell';
import ReturnCapsules from '../components/ui/ReturnCapsules';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Puzzle, Users, Dumbbell, Sprout, Bot, BookOpen, Newspaper } from 'lucide-react';

const sections = [
  { path: '/explore/nutrition', label: 'Nutrition', tagline: 'Eat well, feel well', Icon: UtensilsCrossed, gradient: 'linear-gradient(135deg, #D5EDD6, #C8E6C9)', iconColor: '#43A047' },
  { path: '/explore/games', label: 'Games', tagline: 'Keep your mind sharp', Icon: Puzzle, gradient: 'linear-gradient(135deg, #CEEAE7, #B2DFDB)', iconColor: '#0D7C7C' },
  { path: '/explore/community', label: 'Community', tagline: "You're not alone", Icon: Users, gradient: 'linear-gradient(135deg, #FADDE6, #F8BBD0)', iconColor: '#C2185B' },
  { path: '/explore/exercise', label: 'Exercise', tagline: 'Move a little more', Icon: Dumbbell, gradient: 'linear-gradient(135deg, #E2D5F0, #D1C4E9)', iconColor: '#7E57C2' },
  { path: '/explore/longevity', label: 'Longevity', tagline: 'Small habits, big impact', Icon: Sprout, gradient: 'linear-gradient(135deg, #CEEAE7, #B2DFDB)', iconColor: '#0D7C7C' },
  { path: '/explore/health-news', label: 'Health News', tagline: 'Good news in senior care', Icon: Newspaper, gradient: 'linear-gradient(135deg, #D5EDD6, #C8E6C9)', iconColor: '#43A047' },
  { path: '/explore/blogs', label: 'Blogs & Articles', tagline: 'Stories & tips from ChenMed', Icon: BookOpen, gradient: 'linear-gradient(135deg, #E2D5F0, #D1C4E9)', iconColor: '#7E57C2' },
  { path: '/explore/ai-assistant', label: 'AI Assistant', tagline: 'Your health helper', Icon: Bot, gradient: 'linear-gradient(135deg, #FADDE6, #F8BBD0)', iconColor: '#C2185B' },
];

export default function Explore() {
  const navigate = useNavigate();
  return (
    <PageShell title="Explore" subtitle="Your wellness toolkit — discover something&nbsp;new today.">
      <div className="grid grid-cols-2 gap-3">
        {sections.map(({ path, label, tagline, Icon, gradient, iconColor }, i) => (
          <motion.button
            key={path}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(path)}
            className="rounded-2xl p-4 text-left min-h-[140px] flex flex-col justify-between"
            style={{ background: gradient, boxShadow: '0 2px 8px var(--color-shadow)' }}
          >
            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-2" style={{ backgroundColor: 'rgba(255,255,255,0.75)' }}>
              <Icon size={28} style={{ color: iconColor }} />
            </div>
            <div>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>{label}</p>
            </div>
          </motion.button>
        ))}
      </div>

      <ReturnCapsules sectionPath="/" />
    </PageShell>
  );
}
