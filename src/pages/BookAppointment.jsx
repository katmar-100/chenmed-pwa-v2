import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useSunny } from '../context/SunnyContext';
import { doctors } from '../data/mockData';
import PageShell from '../components/ui/PageShell';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import ReturnCapsules from '../components/ui/ReturnCapsules';
import DoctorAvatar from '../components/features/DoctorAvatar';
import StarRating from '../components/ui/StarRating';
import { formatDate } from '../utils/helpers';
import { ArrowLeft, ChevronLeft, ChevronRight, Check, Calendar, Share2, MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const STEPS = ['Choose Doctor', 'Pick a Date', 'Pick a Time', 'Add Notes', 'Confirmed'];

function SimpleCalendar({ selected, onSelect }) {
  const [month, setMonth] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const today = new Date(); today.setHours(0,0,0,0);

  const year = month.getFullYear();
  const mo = month.getMonth();
  const daysInMonth = new Date(year, mo + 1, 0).getDate();
  const firstDay = new Date(year, mo, 1).getDay();
  const monthName = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const days = [];
  for (let i = 0; i < firstDay; i++) days.push(null);
  for (let d = 1; d <= daysInMonth; d++) days.push(d);

  const prevMonth = () => setMonth(new Date(year, mo - 1, 1));
  const nextMonth = () => setMonth(new Date(year, mo + 1, 1));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="w-12 h-12 min-h-[48px] flex items-center justify-center rounded-full" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
          <ChevronLeft size={20} />
        </button>
        <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{monthName}</p>
        <button onClick={nextMonth} className="w-12 h-12 min-h-[48px] flex items-center justify-center rounded-full" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
          <ChevronRight size={20} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['S','M','T','W','T','F','S'].map((d,i) => (
          <div key={i} className="font-semibold py-1" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((d, i) => {
          if (!d) return <div key={i} />;
          const date = new Date(year, mo, d);
          const iso = date.toISOString().split('T')[0];
          const isPast = date < today;
          const isToday = date.getTime() === today.getTime();
          const isSelected = selected === iso;
          // Mock: weekends unavailable
          const isWeekend = date.getDay() === 0 || date.getDay() === 6;
          const disabled = isPast || isWeekend;

          return (
            <button
              key={i}
              onClick={() => !disabled && onSelect(iso)}
              disabled={disabled}
              className="w-full aspect-square flex items-center justify-center rounded-full min-h-[40px] font-semibold transition-colors"
              style={{
                fontSize: '15px',
                backgroundColor: isSelected ? 'var(--color-teal)' : 'transparent',
                color: isSelected ? 'white' : disabled ? 'var(--color-surface-muted)' : 'var(--color-text)',
                border: isToday && !isSelected ? '2px solid var(--color-teal)' : '2px solid transparent',
              }}
            >
              {d}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function BookAppointment() {
  const navigate = useNavigate();
  const { bookAppointment } = useApp();
  const { triggerCelebration } = useSunny();
  const [step, setStep] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [notes, setNotes] = useState('');

  const doc = doctors.find(d => d.id === selectedDoc);

  const handleConfirm = () => {
    bookAppointment({
      id: `booked-${Date.now()}`,
      doctorId: selectedDoc,
      date: selectedDate,
      time: selectedTime,
      location: doc.location,
      address: doc.address,
      prep: notes || 'No special preparation needed for this visit.',
    });
    setStep(4);
    triggerCelebration('big');
  };

  return (
    <PageShell>
      <button onClick={() => step > 0 && step < 4 ? setStep(step - 1) : navigate('/appointments')} className="flex items-center gap-2 mb-4 min-h-[48px]" style={{ color: 'var(--color-teal)', fontSize: 'var(--font-size-base)' }}>
        <ArrowLeft size={20} /> {step === 0 || step === 4 ? 'Back' : 'Previous'}
      </button>

      {/* Progress */}
      {step < 4 && (
        <div className="flex gap-2 mb-6">
          {STEPS.slice(0, 4).map((s, i) => (
            <div key={i} className="flex-1 h-1.5 rounded-full" style={{ backgroundColor: i <= step ? 'var(--color-teal)' : 'var(--color-surface-muted)' }} />
          ))}
        </div>
      )}

      <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.2 }}>
        {/* Step 1: Choose Doctor */}
        {step === 0 && (
          <div>
            <h2 className="font-semibold mb-4" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Choose Your&nbsp;Doctor</h2>
            <div className="space-y-3">
              {doctors.map(d => (
                <Card key={d.id} onClick={() => { setSelectedDoc(d.id); setStep(1); }} padding="p-4">
                  <div className="flex items-center gap-3">
                    <DoctorAvatar type={d.avatar} size={56} />
                    <div className="flex-1">
                      <StarRating rating={d.rating} size={12} />
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{d.name}</p>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{d.specialty}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin size={12} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{d.location}</p>
                      </div>
                      <a
                        href={`https://maps.google.com/?q=${encodeURIComponent(d.address)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full min-h-[32px]"
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 600,
                          backgroundColor: 'var(--color-teal-pale)',
                          color: 'var(--color-teal)',
                          textDecoration: 'none',
                        }}
                      >
                        <Navigation size={12} /> Get Directions
                      </a>
                    </div>
                    <ChevronRight size={20} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Pick Date */}
        {step === 1 && (
          <div>
            <h2 className="font-semibold mb-4" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Pick a&nbsp;Date</h2>
            <Card animate={false} padding="p-4">
              <SimpleCalendar selected={selectedDate} onSelect={(d) => { setSelectedDate(d); setStep(2); }} />
            </Card>
          </div>
        )}

        {/* Step 3: Pick Time */}
        {step === 2 && doc && (
          <div>
            <h2 className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Pick a&nbsp;Time</h2>
            <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              Available times for {formatDate(selectedDate)}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {doc.availableSlots.map(time => (
                <motion.button
                  key={time}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setSelectedTime(time); setStep(3); }}
                  className="rounded-xl py-3 px-2 font-semibold min-h-[48px] transition-colors"
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    backgroundColor: selectedTime === time ? 'var(--color-teal)' : 'var(--color-card)',
                    color: selectedTime === time ? 'white' : 'var(--color-text)',
                    border: `2px solid ${selectedTime === time ? 'var(--color-teal)' : 'var(--color-surface-muted)'}`,
                  }}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Notes */}
        {step === 3 && (
          <div>
            <h2 className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Anything for your&nbsp;doctor?</h2>
            <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              Is there anything you'd like {doc?.name} to&nbsp;know?
            </p>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Any symptoms, questions, or concerns..."
              className="w-full rounded-xl p-4 min-h-[120px] mb-4 resize-none"
              style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', border: 'none', outline: 'none' }}
            />
            <Button fullWidth onClick={handleConfirm}>Confirm Appointment</Button>
            <button onClick={handleConfirm} className="w-full mt-2 min-h-[48px] text-center" style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
              Skip
            </button>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {step === 4 && (
          <div className="text-center py-4">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 10, stiffness: 200 }}
            >
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                <svg viewBox="0 0 40 40" width="40" height="40">
                  <motion.path
                    d="M10 20 L17 27 L30 14"
                    fill="none" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  />
                </svg>
              </div>
            </motion.div>
            <h2 className="font-semibold" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>Your appointment is&nbsp;booked!</h2>
            <Card animate={false} className="mt-4 text-left">
              <p className="font-semibold" style={{ color: 'var(--color-text-heading)' }}>{doc?.name}</p>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{doc?.specialty}</p>
              <p className="mt-1 font-semibold" style={{ color: 'var(--color-text)' }}>{formatDate(selectedDate)} at {selectedTime}</p>
              <div className="flex items-center gap-1 mt-1">
                <MapPin size={14} style={{ color: 'var(--color-text-muted)', flexShrink: 0 }} />
                <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>{doc?.location}</p>
              </div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-xs)' }}>{doc?.address}</p>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(doc?.address || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full min-h-[32px]"
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  backgroundColor: 'var(--color-teal-pale)',
                  color: 'var(--color-teal)',
                  textDecoration: 'none',
                }}
              >
                <Navigation size={12} /> Get Directions
              </a>
            </Card>
            <div className="mt-4 space-y-3">
              <Button fullWidth variant="soft"><Calendar size={18} className="mr-2" /> Add to Calendar</Button>
              <Button fullWidth variant="ghost"><Share2 size={18} className="mr-2" /> Share with a Loved One</Button>
              <Button fullWidth onClick={() => navigate('/appointments')}>Done</Button>
            </div>
          </div>
        )}
      </motion.div>

      <ReturnCapsules sectionName="Appointments" sectionPath="/appointments" />
    </PageShell>
  );
}
