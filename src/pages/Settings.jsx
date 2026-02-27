import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { THEMES, FONT_SIZES } from '../styles/themes';
import PageShell from '../components/ui/PageShell';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Toggle from '../components/ui/Toggle';
import Modal from '../components/ui/Modal';
import ReturnCapsules from '../components/ui/ReturnCapsules';
import { AvatarDisplay } from '../components/features/AvatarPicker';
import AvatarPicker from '../components/features/AvatarPicker';
import { User, Type, Palette, Smile, Bell, Shield, RotateCcw, Info, ChevronRight, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Settings() {
  const navigate = useNavigate();
  const { patient, updatePatient, settings, updateSettings, resetData } = useApp();
  const [showReset, setShowReset] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [editPatient, setEditPatient] = useState(null);

  const openProfile = () => { setEditPatient({ ...patient }); setShowProfile(true); };
  const saveProfile = () => { updatePatient(editPatient); setShowProfile(false); };

  const handleReset = () => { resetData(); setShowReset(false); };

  return (
    <PageShell title="Settings" subtitle="Customize your&nbsp;experience">
      <div className="space-y-4">
        {/* Profile Link */}
        <Card onClick={openProfile} padding="p-4">
          <div className="flex items-center gap-3">
            <AvatarDisplay avatarKey={patient?.avatar} size={56} />
            <div className="flex-1">
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{patient?.name}</p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Member ID: {patient?.memberId}</p>
            </div>
            <ChevronRight size={20} style={{ color: 'var(--color-text-muted)' }} />
          </div>
        </Card>

        {/* Font Size */}
        <Card animate={false}>
          <div className="flex items-center gap-3 mb-3">
            <Type size={20} style={{ color: 'var(--color-teal)' }} />
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>Text Size</p>
          </div>
          <div className="flex gap-2">
            {Object.values(FONT_SIZES).map(f => (
              <motion.button
                key={f.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSettings({ ...settings, fontSizeMode: f.id })}
                className="flex-1 rounded-xl py-3 min-h-[48px] font-semibold transition-all"
                style={{
                  fontSize: f.size,
                  backgroundColor: settings.fontSizeMode === f.id ? 'var(--color-teal)' : 'var(--color-surface-muted)',
                  color: settings.fontSizeMode === f.id ? 'white' : 'var(--color-text)',
                  border: `2px solid ${settings.fontSizeMode === f.id ? 'var(--color-teal)' : 'transparent'}`,
                }}
              >
                {f.label}
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Color Mode */}
        <Card animate={false}>
          <div className="flex items-center gap-3 mb-3">
            <Palette size={20} style={{ color: 'var(--color-teal)' }} />
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>Color Mode</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(THEMES).map(t => (
              <motion.button
                key={t.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => updateSettings({ ...settings, theme: t.id })}
                className="rounded-xl p-3 min-h-[48px] text-left transition-all"
                style={{
                  backgroundColor: settings.theme === t.id ? 'var(--color-teal-pale)' : 'var(--color-surface-muted)',
                  border: `2px solid ${settings.theme === t.id ? 'var(--color-teal)' : 'transparent'}`,
                }}
              >
                <div className="flex gap-1 mb-1.5">
                  {t.swatch.map((c, i) => (
                    <div key={i} className="w-5 h-5 rounded-full" style={{ backgroundColor: c, border: '1px solid rgba(0,0,0,0.1)' }} />
                  ))}
                </div>
                <p className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{t.name}</p>
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Sunny */}
        <Card animate={false}>
          <div className="flex items-center gap-3 mb-3">
            <Smile size={20} style={{ color: 'var(--color-teal)' }} />
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>Your Guide</p>
          </div>
          <Toggle
            label="Show Sunny"
            description="Sunny is your friendly guide who pops up with helpful tips."
            checked={settings.showSunny}
            onChange={(val) => updateSettings({ ...settings, showSunny: val })}
          />
        </Card>

        {/* Notifications */}
        <Card animate={false}>
          <div className="flex items-center gap-3 mb-3">
            <Bell size={20} style={{ color: 'var(--color-teal)' }} />
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>Notifications</p>
          </div>
          <div className="space-y-3">
            <Toggle
              label="Medication Reminders"
              checked={settings.medicationReminders}
              onChange={(val) => updateSettings({ ...settings, medicationReminders: val })}
            />
            <Toggle
              label="Appointment Reminders"
              checked={settings.appointmentReminders}
              onChange={(val) => updateSettings({ ...settings, appointmentReminders: val })}
            />
          </div>
        </Card>

        {/* Privacy */}
        <Card animate={false}>
          <div className="flex items-center gap-3 mb-3">
            <Shield size={20} style={{ color: 'var(--color-teal)' }} />
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>Privacy</p>
          </div>
          <div className="space-y-3">
            <div>
              <p className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Community display name</p>
              <div className="flex gap-2">
                {['real', 'anonymous'].map(opt => (
                  <button
                    key={opt}
                    onClick={() => updateSettings({ ...settings, communityDisplayName: opt })}
                    className="flex-1 rounded-xl py-2.5 min-h-[48px] font-semibold"
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      backgroundColor: settings.communityDisplayName === opt ? 'var(--color-teal)' : 'var(--color-surface-muted)',
                      color: settings.communityDisplayName === opt ? 'white' : 'var(--color-text)',
                    }}
                  >
                    {opt === 'real' ? `${patient?.firstName || 'Name'} J.` : 'Anonymous'}
                  </button>
                ))}
              </div>
            </div>
            <Toggle
              label="Share vitals in groups"
              description="Default: off"
              checked={settings.shareVitals}
              onChange={(val) => updateSettings({ ...settings, shareVitals: val })}
            />
          </div>
        </Card>

        {/* Reset */}
        <Card animate={false}>
          <div className="flex items-center gap-3 mb-3">
            <RotateCcw size={20} style={{ color: 'var(--color-danger)' }} />
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>Data</p>
          </div>
          {!showReset ? (
            <Button variant="danger" fullWidth onClick={() => setShowReset(true)}>Reset All App Data</Button>
          ) : (
            <div className="space-y-3">
              <p className="text-center font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-danger)' }}>
                This will reset all your data to the demo defaults. Are you sure?
              </p>
              <div className="flex gap-3">
                <Button variant="danger" fullWidth onClick={handleReset}>Yes, Reset</Button>
                <Button variant="ghost" fullWidth onClick={() => setShowReset(false)}>Cancel</Button>
              </div>
            </div>
          )}
        </Card>

        {/* Engagement Metrics — Easter egg for demo */}
        <Card onClick={() => navigate('/engagement-metrics')} padding="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
              <BarChart3 size={20} style={{ color: 'var(--color-purple)' }} />
            </div>
            <div className="flex-1">
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-purple)' }}>Engagement Metrics</p>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>View patient engagement data</p>
            </div>
            <ChevronRight size={20} style={{ color: 'var(--color-text-muted)' }} />
          </div>
        </Card>

        {/* About */}
        <Card animate={false}>
          <div className="flex items-center gap-3 mb-3">
            <Info size={20} style={{ color: 'var(--color-teal)' }} />
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>About</p>
          </div>
          <div className="text-center" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            <p className="font-semibold">MyChenMed v2.0&nbsp;— Demo</p>
            <p>Designed by Katherine&nbsp;Atmar</p>
            <p>Powered by&nbsp;ChenMed</p>
            <p className="mt-1">This app uses mock data&nbsp;only.</p>
          </div>
        </Card>
      </div>

      {/* Profile Modal */}
      <Modal isOpen={showProfile} onClose={() => setShowProfile(false)} title="Edit Your Profile">
        {editPatient && (
          <div className="space-y-4">
            <div>
              <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Choose an Avatar</p>
              <AvatarPicker selected={editPatient.avatar} onSelect={(key) => setEditPatient({ ...editPatient, avatar: key })} />
            </div>
            {[
              { key: 'name', label: 'Display Name' },
              { key: 'phone', label: 'Phone Number', type: 'tel' },
              { key: 'about', label: 'About Me', multi: true },
            ].map(({ key, label, multi, type }) => (
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
                    type={type || 'text'}
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
                type="text" value={editPatient.emergencyContact?.name || ''}
                onChange={e => setEditPatient({ ...editPatient, emergencyContact: { ...editPatient.emergencyContact, name: e.target.value } })}
                placeholder="Contact name"
                className="w-full rounded-xl p-3 min-h-[48px] mb-2"
                style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text)', fontSize: 'var(--font-size-base)', border: 'none', outline: 'none' }}
              />
              <input
                type="tel" value={editPatient.emergencyContact?.phone || ''}
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

      <ReturnCapsules sectionPath="/" />
    </PageShell>
  );
}
