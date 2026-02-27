import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { doctors } from '../data/mockData';
import PageShell from '../components/ui/PageShell';
import Card from '../components/ui/Card';
import ProgressRing from '../components/ui/ProgressRing';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { AvatarDisplay } from '../components/features/AvatarPicker';
import AvatarPicker from '../components/features/AvatarPicker';
import { getGreeting, todayString, formatDate, dayLabel } from '../utils/helpers';
import { Calendar, Heart, Pencil, Sun } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {
  const { patient, updatePatient, appointments, medications, vitals } = useApp();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  const takenCount = medications.filter(m => m.takenToday).length;
  const today = new Date().toISOString().split('T')[0];
  const upcoming = [...appointments].filter(a => a.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const nextAppt = upcoming[0];
  const nextDoc = nextAppt ? doctors.find(d => d.id === nextAppt.doctorId) : null;
  const latestBP = vitals?.bloodPressure?.[0];

  const openEdit = () => { setEditPatient({ ...patient }); setShowProfile(true); };
  const saveProfile = () => { updatePatient(editPatient); setShowProfile(false); };

  return (
    <PageShell noPadTop>
      {/* Full-page gradient background */}
      <div className="fixed inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, var(--color-teal-pale) 0%, var(--color-bg) 50%)', zIndex: 0 }} />

      {/* Profile Section */}
      <div className="relative pt-6 pb-4 px-4 text-center" style={{ zIndex: 1 }}>
        <div className="relative inline-block mb-3">
          <div style={{ border: '3px solid transparent', borderRadius: '50%', background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, var(--color-teal), var(--color-purple)) border-box', padding: '3px' }}>
            <AvatarDisplay avatarKey={patient?.avatar} size={100} />
          </div>
          <button
            onClick={openEdit}
            className="absolute -bottom-1 -right-1 w-10 h-10 min-h-[40px] min-w-[40px] rounded-full flex items-center justify-center shadow-md"
            style={{ backgroundColor: 'var(--color-teal)', color: 'white' }}
            aria-label="Edit profile"
          >
            <Pencil size={16} />
          </button>
        </div>
        <h1 className="font-semibold" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>
          {getGreeting()}, {patient?.firstName}!
        </h1>
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
          {todayString()}
        </p>
        <p className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
          Member since {patient?.memberSince} &bull; {patient?.center}
        </p>
      </div>

      <div className="relative px-4 space-y-4" style={{ zIndex: 1 }}>
        {/* About Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="rounded-2xl p-5"
          style={{
            background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light))',
            boxShadow: '0 4px 12px rgba(13, 124, 124, 0.25)',
          }}
        >
          <p className="font-semibold mb-3 text-center" style={{ fontSize: 'var(--font-size-lg)', color: 'white' }}>Welcome to&nbsp;MyChenMed!</p>
          <p className="text-center" style={{ fontSize: 'var(--font-size-base)', color: 'rgba(255,255,255,0.9)', lineHeight: '1.7' }}>
            MyChenMed is your personal health companion. We're here to help you stay on top of your appointments, medications, and overall wellness — all in one place. Think of us as your friendly health helper that fits in&nbsp;your&nbsp;pocket.
          </p>
        </motion.div>

        {/* Today's Summary */}
        <Card to="/today" delay={0.05}>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, var(--color-purple), var(--color-teal))' }}>
              <Sun size={22} style={{ color: 'white' }} />
            </div>
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>Today's Summary</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Your daily health&nbsp;snapshot</p>
          </div>
        </Card>

        {/* Next Appointment */}
        <Card to="/appointments" delay={0.1}>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
              <Calendar size={22} style={{ color: 'var(--color-teal)' }} />
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              {nextAppt ? `You're seeing ${nextDoc?.name?.split(' ').slice(0,2).join(' ')} soon!` : 'No upcoming\u00A0visits'}
            </p>
            {nextAppt && (
              <>
                <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                  {formatDate(nextAppt.date)} at {nextAppt.time}
                </p>
                {dayLabel(nextAppt.date) && (
                  <span className="inline-block mt-1 px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal)' }}>
                    {dayLabel(nextAppt.date)}
                  </span>
                )}
              </>
            )}
          </div>
        </Card>

        {/* Medications Progress */}
        <Card to="/medications" delay={0.2}>
          <div className="flex flex-col items-center text-center gap-2">
            <ProgressRing value={takenCount} max={medications.length} size={64} strokeWidth={12}>
              <span className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-teal)' }}>{takenCount}/{medications.length}</span>
            </ProgressRing>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Medications today</p>
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: takenCount === medications.length ? 'var(--color-success)' : 'var(--color-text-heading)' }}>
              {takenCount === medications.length ? "All taken — great\u00A0job!" : `${medications.length - takenCount} still to take — let's check them\u00A0off!`}
            </p>
          </div>
        </Card>

        {/* Latest Vitals */}
        <Card to="/vitals" delay={0.3}>
          <div className="flex flex-col items-center text-center gap-2">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
              <Heart size={22} style={{ color: 'var(--color-purple)' }} />
            </div>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
              {latestBP ? 'Your latest blood pressure looks\u00A0good!' : 'No readings\u00A0yet'}
            </p>
            {latestBP && (
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                {latestBP.systolic}/{latestBP.diastolic} mmHg
              </p>
            )}
          </div>
        </Card>

        <p className="text-center pt-2 pb-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
          We're here to help you stay&nbsp;healthy.
        </p>

        <button
          onClick={() => navigate('/about-creator')}
          className="w-full text-center pb-4 pt-2"
          style={{ fontSize: '11px', color: 'var(--color-text-muted)', opacity: 0.6, letterSpacing: '0.05em', lineHeight: '1.5' }}
        >
          IMAGINED, DESIGNED, &amp; DEVELOPED BY<br />
          <span className="font-semibold">KATHERINE ATMAR</span> | CREATIVE DIRECTOR
        </button>

        <div className="pb-8" />
      </div>

      {/* Profile Edit Modal */}
      <Modal isOpen={showProfile} onClose={() => setShowProfile(false)} title="Edit Your Profile">
        {editPatient && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Choose an Avatar</p>
              <AvatarPicker selected={editPatient.avatar} onSelect={(key) => setEditPatient({ ...editPatient, avatar: key })} />
            </div>
            {[
              { key: 'name', label: 'Display Name' },
              { key: 'phone', label: 'Phone Number' },
              { key: 'about', label: 'About Me', multi: true },
            ].map(({ key, label, multi }) => (
              <div key={key}>
                <label className="block font-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{label}</label>
                {multi ? (
                  <textarea
                    value={editPatient[key] || ''}
                    onChange={e => setEditPatient({ ...editPatient, [key]: e.target.value })}
                    className="w-full rounded-xl p-3 min-h-[48px] resize-none"
                    style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', border: 'none', outline: 'none' }}
                    rows={3}
                  />
                ) : (
                  <input
                    type="text"
                    value={editPatient[key] || ''}
                    onChange={e => setEditPatient({ ...editPatient, [key]: e.target.value })}
                    className="w-full rounded-xl p-3 min-h-[48px]"
                    style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', border: 'none', outline: 'none' }}
                  />
                )}
              </div>
            ))}
            <div>
              <label className="block font-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Emergency Contact</label>
              <input
                type="text"
                value={editPatient.emergencyContact?.name || ''}
                onChange={e => setEditPatient({ ...editPatient, emergencyContact: { ...editPatient.emergencyContact, name: e.target.value } })}
                placeholder="Contact name"
                className="w-full rounded-xl p-3 min-h-[48px] mb-2"
                style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', border: 'none', outline: 'none' }}
              />
              <input
                type="tel"
                value={editPatient.emergencyContact?.phone || ''}
                onChange={e => setEditPatient({ ...editPatient, emergencyContact: { ...editPatient.emergencyContact, phone: e.target.value } })}
                placeholder="Contact phone"
                className="w-full rounded-xl p-3 min-h-[48px]"
                style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', border: 'none', outline: 'none' }}
              />
            </div>
            <div>
              <label className="block font-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Preferred Language</label>
              <select
                value={editPatient.language || 'English'}
                onChange={e => setEditPatient({ ...editPatient, language: e.target.value })}
                className="w-full rounded-xl p-3 min-h-[48px]"
                style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', border: 'none', outline: 'none' }}
              >
                <option>English</option>
                <option>Spanish</option>
                <option>Creole</option>
              </select>
            </div>
            <Button onClick={saveProfile} fullWidth>Save Changes</Button>
          </div>
        )}
      </Modal>
    </PageShell>
  );
}
