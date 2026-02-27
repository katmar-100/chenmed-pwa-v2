import React, { useState, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import PageShell from '../components/ui/PageShell';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import ProgressRing from '../components/ui/ProgressRing';
import ReturnCapsules from '../components/ui/ReturnCapsules';
import PillIcon from '../components/features/PillIcon';
import Confetti from '../components/features/Confetti';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Info, Sun, Sunset, Moon, Phone, MapPin, Clock, RefreshCw, ChevronRight, ChevronUp, Volume2 } from 'lucide-react';
import { useSunny } from '../context/SunnyContext';
import { patient as mockPatient, medications as mockMedications } from '../data/mockData';

const timeIcons = { morning: Sun, afternoon: Sun, evening: Moon };

function isPharmacyOpen(hoursStr) {
  if (!hoursStr) return null;
  const now = new Date();
  const day = now.getDay(); // 0=Sun, 1=Mon...6=Sat
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Parse "Mon–Fri 8am–9pm, Sat 9am–6pm, Sun 10am–5pm"
  const parseTime = (t) => {
    const match = t.match(/(\d+)(am|pm)/i);
    if (!match) return 0;
    let h = parseInt(match[1], 10);
    if (match[2].toLowerCase() === 'pm' && h !== 12) h += 12;
    if (match[2].toLowerCase() === 'am' && h === 12) h = 0;
    return h * 60;
  };

  const segments = hoursStr.split(',').map(s => s.trim());
  for (const seg of segments) {
    const timeMatch = seg.match(/(\d+\s*(?:am|pm))\s*[–-]\s*(\d+\s*(?:am|pm))/i);
    if (!timeMatch) continue;
    const open = parseTime(timeMatch[1]);
    const close = parseTime(timeMatch[2]);
    const lower = seg.toLowerCase();

    let applies = false;
    if (lower.startsWith('mon') && lower.includes('fri') && day >= 1 && day <= 5) applies = true;
    else if (lower.startsWith('sat') && day === 6) applies = true;
    else if (lower.startsWith('sun') && day === 0) applies = true;

    if (applies) return currentMinutes >= open && currentMinutes < close;
  }
  return null;
}

export default function Medications() {
  const { medications, toggleMedTaken, patient } = useApp();
  const [refillOpen, setRefillOpen] = useState(false);

  // Use mockData as fallback if localStorage doesn't have pharmacy/rxNumber yet
  const pharmacy = patient?.pharmacy || mockPatient.pharmacy;
  const pharmacyOpen = isPharmacyOpen(pharmacy.hours);
  const { triggerCelebration } = useSunny();
  const [infoMed, setInfoMed] = useState(null);
  const [pillPopupId, setPillPopupId] = useState(null);
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = (text) => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85;
    utterance.onend = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const handlePillTap = useCallback((e, medId) => {
    e.stopPropagation();
    setPillPopupId(prev => prev === medId ? null : medId);
  }, []);

  const takenCount = medications.filter(m => m.takenToday).length;
  const allTaken = takenCount === medications.length && medications.length > 0;
  const [confettiKey, setConfettiKey] = useState(0);

  const handleToggle = (id) => {
    const med = medications.find(m => m.id === id);
    toggleMedTaken(id);
    if (!med.takenToday) {
      // Marking as taken
      if (takenCount + 1 === medications.length) {
        // All meds taken — big celebration!
        setConfettiKey(k => k + 1);
        triggerCelebration('big');
      } else {
        // Single med taken — small celebration
        triggerCelebration('small');
      }
    }
  };

  return (
    <PageShell title="Your Medications" subtitle="Take care of yourself today — one pill at a&nbsp;time!">
      <Confetti trigger={confettiKey} />

      {/* Dismiss pill popup backdrop */}
      {pillPopupId && (
        <div className="fixed inset-0 z-40" onClick={() => setPillPopupId(null)} />
      )}

      {/* Progress Ring */}
      <div className="flex justify-center mb-6">
        <ProgressRing value={takenCount} max={medications.length} size={130} strokeWidth={12} complete={allTaken}>
          <span className="font-semibold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-teal)' }}>{takenCount}/{medications.length}</span>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>taken today</span>
        </ProgressRing>
      </div>

      {allTaken && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl p-4 mb-4 text-center"
          style={{ backgroundColor: 'var(--color-teal-pale)' }}
        >
          <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-teal)' }}>
            You've taken all your medications today! Great&nbsp;job!
          </p>
        </motion.div>
      )}

      <div className="space-y-3">
        {medications.map((med, i) => {
          const TimeIcon = timeIcons[med.timeOfDay] || Sun;
          return (
            <motion.div key={med.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Card animate={false} padding="p-0" className="relative overflow-visible">
                <div
                  className="p-4 transition-colors duration-300 rounded-2xl"
                  style={{ backgroundColor: med.takenToday ? 'var(--color-teal-pale)' : 'var(--color-card)' }}
                >
                  {/* Pill illustration centered above */}
                  <div className="flex justify-center mb-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => handlePillTap(e, med.id)}
                      className="flex items-center justify-center"
                      style={{ background: 'none', border: 'none', padding: 0, minHeight: 'auto' }}
                      aria-label={`See what ${med.name} looks like`}
                    >
                      <PillIcon type={med.pillType} size={48} />
                    </motion.button>
                  </div>
                  {/* Medication details + Take button in a row */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                        {med.name} <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>{med.dose}</span>
                      </p>
                      <div className="flex items-center gap-2">
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{med.timeLabel}</p>
                        <div className="flex items-center gap-1">
                          <TimeIcon size={14} style={{ color: 'var(--color-text-muted)' }} />
                          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{med.timeOfDay}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => handleToggle(med.id)}
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-semibold min-h-[48px]"
                        style={{
                          backgroundColor: med.takenToday ? 'var(--color-teal)' : 'var(--color-surface-muted)',
                          color: med.takenToday ? 'white' : 'var(--color-text)',
                          fontSize: 'var(--font-size-sm)',
                        }}
                        aria-pressed={med.takenToday}
                        aria-label={`${med.name} — ${med.takenToday ? 'Taken' : 'Mark as taken'}`}
                      >
                        {med.takenToday ? <><Check size={18} /> Taken</> : 'Take'}
                      </motion.button>
                      <button
                        onClick={() => setInfoMed(med)}
                        className="w-8 h-8 min-h-[32px] min-w-[32px] rounded-full flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-surface-muted)' }}
                        aria-label={`Info about ${med.name}`}
                      >
                        <Info size={14} style={{ color: 'var(--color-text-muted)' }} />
                      </button>
                    </div>
                  </div>
                </div>
                <AnimatePresence>
                  {pillPopupId === med.id && med.physicalDescription && (
                    <motion.div
                      initial={{ opacity: 0, y: -4, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -4, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-50 rounded-xl shadow-md p-4"
                      style={{
                        top: '100%',
                        left: '16px',
                        marginTop: '4px',
                        width: '260px',
                        backgroundColor: 'white',
                        color: 'var(--color-text)',
                        fontSize: 'var(--font-size-base)',
                        lineHeight: '1.5',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                      }}
                    >
                      {/* Arrow pointing up */}
                      <div
                        className="absolute -top-2 left-5 w-0 h-0"
                        style={{
                          borderLeft: '8px solid transparent',
                          borderRight: '8px solid transparent',
                          borderBottom: '8px solid white',
                        }}
                      />
                      <p className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>
                        What it looks like:
                      </p>
                      <p>{med.physicalDescription}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Refill a Prescription Capsule */}
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
        onClick={() => setRefillOpen(!refillOpen)}
        className="w-full rounded-2xl p-4 mt-5 text-left"
        style={{
          background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light, #2EC4B6))',
          boxShadow: '0 4px 12px rgba(13, 124, 124, 0.25)',
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
              <RefreshCw size={20} style={{ color: 'white' }} />
            </div>
            <div>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'white' }}>Refill a Prescription</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.8)' }}>
                {pharmacy.name}
              </p>
            </div>
          </div>
          {refillOpen ? <ChevronUp size={20} style={{ color: 'rgba(255,255,255,0.8)' }} /> : <ChevronRight size={20} style={{ color: 'rgba(255,255,255,0.8)' }} />}
        </div>
      </motion.button>

      <AnimatePresence>
        {refillOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden mt-2"
          >
            <Card animate={false} padding="p-4">
              {/* Pharmacy Info */}
              <p className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                Your Pharmacy
              </p>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <MapPin size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-teal)' }} />
                  <div>
                    <p className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{pharmacy.name}</p>
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{pharmacy.address}</p>
                  </div>
                </div>
                <a href={`tel:${pharmacy.phone.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 min-h-[44px]" style={{ textDecoration: 'none' }}>
                  <Phone size={16} style={{ color: 'var(--color-teal)' }} />
                  <span className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-teal)' }}>{pharmacy.phone}</span>
                  <span className="px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal)' }}>Tap to call</span>
                </a>
                <div className="flex items-center gap-2 flex-wrap">
                  <Clock size={16} className="flex-shrink-0" style={{ color: 'var(--color-teal)' }} />
                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{pharmacy.hours}</span>
                  {pharmacyOpen !== null && (
                    <span className="px-2 py-0.5 rounded-full font-semibold" style={{
                      fontSize: 'var(--font-size-xs)',
                      backgroundColor: 'var(--color-teal-pale)',
                      color: 'var(--color-teal)',
                    }}>
                      {pharmacyOpen ? 'Open Now' : 'Closed Now'}
                    </span>
                  )}
                </div>
              </div>

              {/* Rx Numbers */}
              <div className="border-t pt-3" style={{ borderColor: 'var(--color-surface-muted)' }}>
                <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                  Your Rx Numbers
                </p>
                <p className="mb-3" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                  Have these ready when you call to&nbsp;refill
                </p>
                <div className="space-y-1.5">
                  {medications.map(med => {
                    const rx = med.rxNumber || mockMedications.find(m => m.id === med.id)?.rxNumber || '—';
                    const pillType = med.pillType || mockMedications.find(m => m.id === med.id)?.pillType;
                    const refillAvailable = med.id === 'med-1' || med.id === 'med-3';
                    return (
                      <div key={med.id} className="flex items-center gap-2.5 py-2 px-1">
                        {pillType && <PillIcon type={pillType} size={28} />}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{med.name}</span>
                            {refillAvailable && (
                              <span className="px-2 py-0.5 rounded-full font-semibold whitespace-nowrap" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal)' }}>
                                Refill Available
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="font-semibold flex-shrink-0" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-teal)', fontFamily: 'monospace' }}>{rx}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info Modal */}
      <Modal isOpen={!!infoMed} onClose={() => setInfoMed(null)} title={infoMed ? `${infoMed.name} ${infoMed.dose}` : ''}>
        {infoMed && (
          <div className="space-y-4" style={{ textAlign: 'center' }}>
            <div className="flex justify-center"><PillIcon type={infoMed.pillType} size={64} /></div>
            <div className="flex justify-center">
              <button
                onClick={() => handleSpeak(`${infoMed.name} ${infoMed.dose}. ${infoMed.purpose}. ${infoMed.howToTake}. ${infoMed.sideEffects}`)}
                className="flex flex-col items-center gap-1.5 min-h-[48px]"
                style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, background: 'none', border: 'none' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: speaking ? 'var(--color-teal)' : 'var(--color-teal-pale)' }}>
                  <Volume2 size={22} style={{ color: speaking ? 'white' : 'var(--color-teal)' }} />
                </div>
                <span style={{ color: 'var(--color-teal)' }}>{speaking ? 'Stop' : 'Read Aloud'}</span>
              </button>
            </div>
            {[
              ...(infoMed.physicalDescription ? [{ title: 'What it looks like', text: infoMed.physicalDescription }] : []),
              { title: 'What is this medication for?', text: infoMed.purpose },
              { title: 'How to take it', text: infoMed.howToTake },
              { title: 'Things to watch for', text: infoMed.sideEffects },
              { title: 'Talk to your doctor if...', text: infoMed.talkToDoctor },
            ].map(({ title, text }) => (
              <div key={title}>
                <p className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-teal)' }}>{title}</p>
                <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{text}</p>
              </div>
            ))}
          </div>
        )}
      </Modal>

      <ReturnCapsules sectionPath="/" />
    </PageShell>
  );
}
