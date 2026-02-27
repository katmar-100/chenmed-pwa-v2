import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Smartphone, Pill, CalendarCheck, Heart, TrendingUp, Clock, Users } from 'lucide-react';

const stats = [
  { icon: Smartphone, label: 'App Opens This Week', value: '14', change: '+23%', color: 'var(--color-teal)' },
  { icon: Pill, label: 'Medication Adherence', value: '94%', change: '+27% vs. avg', color: '#E0598B' },
  { icon: CalendarCheck, label: 'Appointment No-Show Rate', value: '0%', change: 'Down from 12%', color: 'var(--color-purple)' },
  { icon: Clock, label: 'Avg. Session Duration', value: '4.2 min', change: '+1.8 min vs. avg', color: '#FF8A65' },
  { icon: Heart, label: 'Health Goals Completed', value: '12', change: 'This month', color: 'var(--color-teal)' },
  { icon: TrendingUp, label: 'Vitals Check-ins', value: '8', change: 'This month', color: 'var(--color-purple)' },
  { icon: Users, label: 'Community Interactions', value: '6', change: 'This week', color: '#E0598B' },
];

export default function EngagementMetrics() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="px-4 pt-6 pb-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 min-h-[48px] mb-2"
          style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}
        >
          <ArrowLeft size={18} /> Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-5 mb-5"
          style={{
            background: 'linear-gradient(135deg, #2D2B55, #0D7C7C)',
            boxShadow: '0 4px 12px rgba(45, 43, 85, 0.3)',
          }}
        >
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.6)', letterSpacing: '0.1em', fontWeight: 600 }}>
            ENGAGEMENT DASHBOARD
          </p>
          <p className="font-bold mt-1" style={{ fontSize: 'var(--font-size-xl)', color: 'white' }}>
            Margaret Johnson
          </p>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
            Member since 2024 &bull; Active patient
          </p>
          <div className="flex gap-4 mt-4">
            <div className="px-3 py-1.5 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>RISK LEVEL</p>
              <p className="font-bold" style={{ fontSize: 'var(--font-size-sm)', color: '#4ADE80' }}>Low</p>
            </div>
            <div className="px-3 py-1.5 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>RETENTION</p>
              <p className="font-bold" style={{ fontSize: 'var(--font-size-sm)', color: '#4ADE80' }}>High</p>
            </div>
            <div className="px-3 py-1.5 rounded-xl" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>NPS</p>
              <p className="font-bold" style={{ fontSize: 'var(--font-size-sm)', color: 'white' }}>91</p>
            </div>
          </div>
        </motion.div>

        <p className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
          Patient Engagement Metrics
        </p>

        <div className="space-y-2.5">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06 }}
                className="rounded-2xl p-4 flex items-center gap-3"
                style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 1px 3px var(--color-shadow)' }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: s.color + '18' }}
                >
                  <Icon size={20} style={{ color: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{s.label}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="font-bold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>{s.value}</span>
                    <span className="px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: '10px', backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal)' }}>
                      {s.change}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center py-6" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', opacity: 0.6 }}>
          Mock data for demo purposes only
        </p>
      </div>
    </div>
  );
}
