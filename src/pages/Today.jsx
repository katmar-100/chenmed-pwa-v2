import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { doctors } from '../data/mockData';
import { AvatarDisplay } from '../components/features/AvatarPicker';
import DoctorAvatar from '../components/features/DoctorAvatar';
import ProgressRing from '../components/ui/ProgressRing';
import { getGreeting, todayString, formatDate, dayLabel, getBPStatus } from '../utils/helpers';
import { Calendar, Pill, Heart, Sun, ArrowRight, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Today() {
  const navigate = useNavigate();
  const { patient, appointments, medications, vitals } = useApp();
  const [speaking, setSpeaking] = React.useState(false);

  const takenCount = medications.filter(m => m.takenToday).length;
  const allTaken = takenCount === medications.length && medications.length > 0;
  const today = new Date().toISOString().split('T')[0];
  const upcoming = [...appointments].filter(a => a.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const nextAppt = upcoming[0];
  const nextDoc = nextAppt ? doctors.find(d => d.id === nextAppt.doctorId) : null;
  const latestBP = vitals?.bloodPressure?.[0];
  const bpStatus = latestBP ? getBPStatus(latestBP.systolic) : null;

  const morningBrief = `${getGreeting()}, ${patient?.firstName}. Today is ${todayString()}. You've taken ${takenCount} of ${medications.length} medications so far. ${nextAppt ? `Your next appointment is ${formatDate(nextAppt.date)} at ${nextAppt.time} with ${nextDoc?.name}.` : 'You have no upcoming appointments.'} ${latestBP ? `Your latest blood pressure was ${latestBP.systolic} over ${latestBP.diastolic}, which is ${bpStatus?.label?.toLowerCase()}.` : ''}`;

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(morningBrief);
    utterance.rate = 0.85;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const hour = new Date().getHours();
  const timeEmoji = hour < 12 ? 'Rise and shine!' : hour < 17 ? 'Keep it going!' : 'Winding down!';

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header gradient */}
      <div
        className="px-5 pt-8 pb-6 rounded-b-3xl"
        style={{
          background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light, #2EC4B6))',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 min-h-[48px]"
            style={{ color: 'rgba(255,255,255,0.8)', fontSize: 'var(--font-size-sm)' }}
          >
            <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Home
          </button>
          <button
            onClick={handleSpeak}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full min-h-[36px]"
            style={{
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              backgroundColor: speaking ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.15)',
              color: 'white',
            }}
          >
            <Volume2 size={14} /> {speaking ? 'Stop' : 'Read to me'}
          </button>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <AvatarDisplay avatarKey={patient?.avatar} size={56} />
          <div>
            <p className="font-bold" style={{ fontSize: 'var(--font-size-xl)', color: 'white' }}>
              {getGreeting()}, {patient?.firstName}!
            </p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.8)' }}>
              {todayString()}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl p-3"
          style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)' }}
        >
          <div className="flex items-center gap-2">
            <Sun size={18} style={{ color: 'rgba(255,255,255,0.9)' }} />
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>
              {timeEmoji} Here's&nbsp;your daily summary.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="px-5 -mt-4 space-y-3 pb-28">
        {/* Medications Card */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          onClick={() => navigate('/medications')}
          className="w-full rounded-2xl p-4 text-left"
          style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 2px 8px var(--color-shadow)' }}
        >
          <div className="flex items-center gap-4">
            <ProgressRing value={takenCount} max={medications.length} size={64} strokeWidth={10} complete={allTaken}>
              <span className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-teal)' }}>{takenCount}/{medications.length}</span>
            </ProgressRing>
            <div className="flex-1">
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                Medications
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                {allTaken ? 'All taken — great job!' : `${medications.length - takenCount} remaining today`}
              </p>
              {!allTaken && (
                <p className="mt-1 font-semibold" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-teal)' }}>
                  Tap to check them off →
                </p>
              )}
            </div>
          </div>
        </motion.button>

        {/* Appointment Card */}
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          onClick={() => navigate('/appointments')}
          className="w-full rounded-2xl p-4 text-left"
          style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 2px 8px var(--color-shadow)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
              {nextDoc ? <DoctorAvatar type={nextDoc.avatar} size={40} /> : <Calendar size={24} style={{ color: 'var(--color-purple)' }} />}
            </div>
            <div className="flex-1">
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                {nextAppt ? 'Next Appointment' : 'No Upcoming Visits'}
              </p>
              {nextAppt ? (
                <>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                    {nextDoc?.name} — {nextAppt.time}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-purple-pale)', color: 'var(--color-purple)' }}>
                      {dayLabel(nextAppt.date) || formatDate(nextAppt.date)}
                    </span>
                  </div>
                </>
              ) : (
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                  You're all clear! Enjoy your day.
                </p>
              )}
            </div>
          </div>
        </motion.button>

        {/* Vitals Card */}
        {latestBP && (
          <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            onClick={() => navigate('/vitals')}
            className="w-full rounded-2xl p-4 text-left"
            style={{ backgroundColor: 'var(--color-card)', boxShadow: '0 2px 8px var(--color-shadow)' }}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                <Heart size={24} style={{ color: 'var(--color-teal)' }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                  Blood Pressure
                </p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                  {latestBP.systolic}/{latestBP.diastolic} mmHg
                </p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal)' }}>
                  {bpStatus?.label}
                </span>
              </div>
            </div>
          </motion.button>
        )}

        {/* Motivational footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-2"
          style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}
        >
          Every healthy choice&nbsp;counts. You're doing&nbsp;great!
        </motion.p>
      </div>
    </div>
  );
}
