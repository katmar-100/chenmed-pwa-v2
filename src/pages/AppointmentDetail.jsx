import React, { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { doctors } from '../data/mockData';
import PageShell from '../components/ui/PageShell';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ReturnCapsules from '../components/ui/ReturnCapsules';
import DoctorAvatar from '../components/features/DoctorAvatar';
import StarRating from '../components/ui/StarRating';
import { formatDate } from '../utils/helpers';
import { ArrowLeft, MapPin, Clock, Calendar, Share2, CheckCircle, ChevronLeft, ChevronRight, AlertTriangle, GraduationCap, Briefcase, Languages, Heart, Sparkles, Info } from 'lucide-react';
import { motion } from 'framer-motion';

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

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={() => setMonth(new Date(year, mo - 1, 1))} className="w-12 h-12 min-h-[48px] flex items-center justify-center rounded-full" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
          <ChevronLeft size={20} />
        </button>
        <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{monthName}</p>
        <button onClick={() => setMonth(new Date(year, mo + 1, 1))} className="w-12 h-12 min-h-[48px] flex items-center justify-center rounded-full" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
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

export default function AppointmentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { appointments, bookedAppointments, patient, cancelAppointment, bookAppointment, rescheduleAppointment } = useApp();
  const [showShare, setShowShare] = useState(false);
  const [shared, setShared] = useState(false);
  const [calendarAdded, setCalendarAdded] = useState(false);

  // Cancel state
  const [showCancel, setShowCancel] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const cancelledApptRef = useRef(null);

  // Doctor bio state
  const [showDocBio, setShowDocBio] = useState(false);

  // Reschedule state
  const [rescheduleStep, setRescheduleStep] = useState(null); // null = not rescheduling, 'date', 'time', 'done'
  const [newDate, setNewDate] = useState(null);
  const [newTime, setNewTime] = useState(null);

  const allAppts = [...appointments, ...bookedAppointments];
  const appt = allAppts.find(a => a.id === id);
  const doc = appt ? doctors.find(d => d.id === appt.doctorId) : null;

  // Save doc info for cancelled state (before appt is removed from state)
  const cancelledDoc = cancelledApptRef.current ? doctors.find(d => d.id === cancelledApptRef.current.doctorId) : null;

  const handleCancel = () => {
    cancelledApptRef.current = { ...appt };
    cancelAppointment(id);
    setShowCancel(false);
    setCancelled(true);
  };

  const handleUndo = () => {
    if (cancelledApptRef.current) {
      bookAppointment(cancelledApptRef.current);
      cancelledApptRef.current = null;
      setCancelled(false);
    }
  };

  // Show cancelled confirmation as full page
  if (cancelled) {
    return (
      <PageShell>
        <div className="text-center py-12">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10, stiffness: 200 }}>
            <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
              <CheckCircle size={40} style={{ color: 'var(--color-teal)' }} />
            </div>
          </motion.div>
          <h2 className="font-semibold" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>Appointment Cancelled</h2>
          <p className="mt-2" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)' }}>
            You've successfully cancelled your appointment.
          </p>
          <Button fullWidth className="mt-8" onClick={() => navigate('/appointments')}>
            Back to Appointments
          </Button>
          <button
            onClick={handleUndo}
            className="w-full mt-3 min-h-[48px] text-center"
            style={{ color: 'var(--color-teal)', fontSize: 'var(--font-size-sm)' }}
          >
            Cancelled by mistake? Tap here to undo.
          </button>
        </div>
      </PageShell>
    );
  }

  if (!appt || !doc) {
    return (
      <PageShell title="Appointment">
        <p style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-base)' }}>Appointment not found.</p>
        <Button onClick={() => navigate('/appointments')} className="mt-4">Back to Appointments</Button>
      </PageShell>
    );
  }

  const shareText = `Hi! Just wanted to let you know I have an appointment with ${doc.name} on ${formatDate(appt.date)} at ${appt.time} at ${appt.location}. — ${patient?.firstName || 'Margaret'}`;

  return (
    <PageShell>
      <button onClick={() => navigate('/appointments')} className="flex items-center gap-2 mb-4 min-h-[48px]" style={{ color: 'var(--color-teal)', fontSize: 'var(--font-size-base)' }}>
        <ArrowLeft size={20} /> Back
      </button>

      <div className="text-center mb-6">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowDocBio(true)}
          className="inline-block mb-2 relative"
          style={{ background: 'none', border: 'none', padding: 0 }}
          aria-label={`View ${doc.name}'s bio`}
        >
          <div style={{
            border: '3px solid transparent',
            borderRadius: '50%',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, var(--color-teal), var(--color-purple)) border-box',
            padding: '3px',
          }}>
            <DoctorAvatar type={doc.avatar} size={96} />
          </div>
          <div
            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-teal)', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}
          >
            <Info size={14} style={{ color: 'white' }} />
          </div>
        </motion.button>
        <div className="flex justify-center mb-2">
          <StarRating rating={doc.rating} size={18} />
        </div>
        <h2 className="font-semibold" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>{doc.name}</h2>
        <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)' }}>{doc.specialty} &bull; {doc.credentials}</p>
        <button
          onClick={() => setShowDocBio(true)}
          className="mt-1 font-semibold"
          style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-teal)', background: 'none', border: 'none' }}
        >
          Tap to see their bio
        </button>
      </div>

      <div className="space-y-4">
        <Card animate={false}>
          <div className="space-y-4" style={{ textAlign: 'center' }}>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                <Calendar size={20} style={{ color: 'var(--color-teal)' }} />
              </div>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{formatDate(appt.date)}</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{appt.time}</p>
            </div>
            <div className="flex flex-col items-center gap-1.5">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                <MapPin size={20} style={{ color: 'var(--color-teal)' }} />
              </div>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{appt.location}</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{appt.address}</p>
            </div>
          </div>
        </Card>

        {appt.prep && (
          <Card animate={false}>
            <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-teal)', textAlign: 'center' }}>How to Prepare</p>
            <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--color-teal-pale)', textAlign: 'center' }}>
              <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{appt.prep}</p>
            </div>
          </Card>
        )}

        <div className="space-y-3">
          <Button fullWidth onClick={() => setCalendarAdded(true)} variant={calendarAdded ? 'soft' : 'primary'}>
            {calendarAdded ? <><CheckCircle size={20} className="mr-2" /> Added to Calendar</> : <><Calendar size={20} className="mr-2" /> Add to Calendar</>}
          </Button>
          <Button fullWidth variant="secondary" onClick={() => setShowShare(true)}>
            <Share2 size={20} className="mr-2" /> Share with a Loved One
          </Button>
          <div className="flex gap-3">
            <Button fullWidth variant="ghost" className="text-sm" onClick={() => { setRescheduleStep('date'); setNewDate(null); setNewTime(null); }}>Reschedule</Button>
            <Button fullWidth variant="ghost" className="text-sm" style={{ color: 'var(--color-text-muted)' }} onClick={() => setShowCancel(true)}>Cancel</Button>
          </div>
        </div>
      </div>

      {/* Cancel Modal */}
      <Modal isOpen={showCancel} onClose={() => setShowCancel(false)} title="Cancel Appointment">
        <div className="space-y-4">
          <div className="flex items-center gap-3 rounded-xl p-3" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
            <AlertTriangle size={24} style={{ color: 'var(--color-warning, #e5a100)' }} className="flex-shrink-0" />
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>
              Are you sure you want to cancel your appointment with <strong>{doc?.name}</strong> on <strong>{formatDate(appt?.date)}</strong> at <strong>{appt?.time}</strong>?
            </p>
          </div>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            If you change your mind, you can always schedule a new appointment.
          </p>
          <Button fullWidth onClick={handleCancel} style={{ backgroundColor: 'var(--color-error, #d64545)', color: 'white' }}>
            Yes, Cancel Appointment
          </Button>
          <Button fullWidth variant="ghost" onClick={() => setShowCancel(false)}>
            Keep Appointment
          </Button>
        </div>
      </Modal>

      {/* Reschedule Modal */}
      <Modal isOpen={rescheduleStep !== null} onClose={() => setRescheduleStep(null)} title={rescheduleStep === 'done' ? '' : rescheduleStep === 'time' ? 'Pick a New Time' : 'Pick a New Date'}>
        {rescheduleStep === 'date' && (
          <div>
            <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              Choose a new date for your appointment with {doc?.name}.
            </p>
            <SimpleCalendar selected={newDate} onSelect={(d) => { setNewDate(d); setRescheduleStep('time'); }} />
          </div>
        )}

        {rescheduleStep === 'time' && doc && (
          <div>
            <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              Available times for {formatDate(newDate)}
            </p>
            <div className="grid grid-cols-3 gap-3">
              {doc.availableSlots.map(time => (
                <motion.button
                  key={time}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setNewTime(time);
                    rescheduleAppointment(id, newDate, time);
                    setRescheduleStep('done');
                  }}
                  className="rounded-xl py-3 px-2 font-semibold min-h-[48px] transition-colors"
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    backgroundColor: 'var(--color-card)',
                    color: 'var(--color-text)',
                    border: '2px solid var(--color-surface-muted)',
                  }}
                >
                  {time}
                </motion.button>
              ))}
            </div>
            <button onClick={() => setRescheduleStep('date')} className="w-full mt-4 min-h-[48px] text-center" style={{ color: 'var(--color-teal)', fontSize: 'var(--font-size-sm)' }}>
              ← Pick a different date
            </button>
          </div>
        )}

        {rescheduleStep === 'done' && (
          <div className="text-center py-6">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', damping: 10, stiffness: 200 }}>
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
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Appointment Rescheduled!</p>
            <p className="mt-2" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)' }}>
              Your new appointment is on <strong style={{ color: 'var(--color-text-heading)' }}>{formatDate(newDate)}</strong> at <strong style={{ color: 'var(--color-text-heading)' }}>{newTime}</strong>.
            </p>
            <Button fullWidth className="mt-6" onClick={() => { setRescheduleStep(null); }}>
              Done
            </Button>
          </div>
        )}
      </Modal>

      {/* Doctor Bio Modal */}
      <Modal isOpen={showDocBio} onClose={() => setShowDocBio(false)} title={`About ${doc?.name}`}>
        {doc && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div style={{
                border: '3px solid transparent',
                borderRadius: '50%',
                background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, var(--color-teal), var(--color-purple)) border-box',
                padding: '3px',
              }}>
                <DoctorAvatar type={doc.avatar} size={80} />
              </div>
            </div>

            <div className="text-center">
              <p className="font-bold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>{doc.name}</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{doc.specialty} &bull; {doc.credentials}</p>
              <div className="flex justify-center mt-1"><StarRating rating={doc.rating} size={16} /></div>
            </div>

            {doc.bio && (
              <>
                <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                  <div className="flex items-start gap-2.5">
                    <Heart size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-teal)' }} />
                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', lineHeight: 1.6, fontStyle: 'italic' }}>
                      "{doc.bio.philosophy}"
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
                      <GraduationCap size={16} style={{ color: 'var(--color-purple)' }} />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Education</p>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{doc.bio.education}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                      <Briefcase size={16} style={{ color: 'var(--color-teal)' }} />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Residency / Fellowship</p>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{doc.bio.residency}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
                      <Briefcase size={16} style={{ color: 'var(--color-purple)' }} />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>With ChenMed</p>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{doc.bio.yearsWithChenMed} years</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                      <Languages size={16} style={{ color: 'var(--color-teal)' }} />
                    </div>
                    <div>
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Languages</p>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{doc.bio.languages.join(', ')}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
                  <div className="flex items-start gap-2.5">
                    <Sparkles size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--color-purple)' }} />
                    <div>
                      <p className="font-semibold" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Fun Fact</p>
                      <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>{doc.bio.funFact}</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>

      {/* Share Modal */}
      <Modal isOpen={showShare} onClose={() => { setShowShare(false); setShared(false); }} title="Share with a Loved One">
        {!shared ? (
          <div className="space-y-4">
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>
              Want someone to help you remember? Send the details to a family member or friend!
            </p>
            <div>
              <label className="block font-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Their phone number</label>
              <input
                type="tel"
                defaultValue={patient?.emergencyContact?.phone || ''}
                className="w-full rounded-xl p-3 min-h-[48px]"
                style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', border: 'none', outline: 'none' }}
              />
            </div>
            <div className="rounded-xl p-3" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>{shareText}</p>
            </div>
            <Button fullWidth onClick={() => setShared(true)}>Send Text</Button>
            <Button fullWidth variant="ghost" onClick={() => { navigator.clipboard?.writeText(shareText); }}>Copy Details</Button>
          </div>
        ) : (
          <div className="text-center py-6">
            <CheckCircle size={48} style={{ color: 'var(--color-success)', margin: '0 auto' }} />
            <p className="font-semibold mt-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Message sent!</p>
          </div>
        )}
      </Modal>

      <ReturnCapsules sectionName="Appointments" sectionPath="/appointments" />
    </PageShell>
  );
}
