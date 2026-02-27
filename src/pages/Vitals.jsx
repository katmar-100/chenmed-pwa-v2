import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { communityGroups } from '../data/mockData';
import { useSunny } from '../context/SunnyContext';
import PageShell from '../components/ui/PageShell';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import ReturnCapsules from '../components/ui/ReturnCapsules';
import { getBPStatus, getGlucoseStatus, getCholesterolStatus, formatDateShort, formatDateMedium } from '../utils/helpers';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Users, TrendingDown, TrendingUp, Minus, Heart, Weight, Droplets, Activity, Share2, Volume2, FlaskConical, Pill } from 'lucide-react';

const tabs = [
  { key: 'bp', label: 'Blood Pressure', icon: Heart },
  { key: 'weight', label: 'Weight', icon: Weight },
  { key: 'glucose', label: 'Blood Sugar', icon: Droplets },
  { key: 'hr', label: 'Heart Rate', icon: Activity },
  { key: 'cholesterol', label: 'Cholesterol', icon: FlaskConical },
  { key: 'vitamins', label: 'Vitamins', icon: Pill },
];

const bpTips = [
  "Try to walk for 15-20 minutes after lunch. Even a gentle stroll makes a big\u00A0difference!",
  "Cut back on salty snacks — try unsalted nuts or fresh fruit\u00A0instead.",
  "Practice slow, deep breathing for 5 minutes before bed. It can help your heart\u00A0relax.",
  "Stay hydrated! Aim for 6-8 glasses of water a\u00A0day.",
];

const glucoseTips = [
  "Taking a 10-minute walk after meals can help lower blood sugar\u00A0naturally.",
  "Try to eat your vegetables first at each meal — it slows sugar\u00A0absorption.",
  "Stay consistent with meal times. Your body likes a regular\u00A0schedule!",
  "Choose whole grains over white bread and rice when you\u00A0can.",
];

const bpSummary = (s, d) => `Your blood pressure is ${s} over ${d}. The top number (${s}) shows the pressure when your heart beats, and the bottom number (${d}) shows the pressure when your heart rests. ${s < 130 ? "Your numbers are in a pretty good range — keep doing what you're\u00A0doing!" : "Your numbers are a\u00A0little elevated. Let's look at some tips that might help."}`;
const weightSummary = (v, trend) => `You weigh ${v} pounds. Over the past month, your weight has been ${trend}, which ${trend === 'steady' ? "is a great sign that your nutrition and activity are balanced." : trend === 'decreasing' ? "shows you're making progress. Keep up the great work!" : "is something to keep an eye\u00A0on. Let's look at nutrition tips."}`;
const glucoseSummary = (v) => `Your fasting blood sugar was ${v} mg/dL. ${v <= 130 ? "That's in a good range — your body is managing well!" : "For someone managing diabetes, your doctor typically likes this number between 80\u00A0and 130. You're a little above that, so let's look at some tips that might help."}`;
const hrSummary = (v) => `Your resting heart rate is ${v} beats per minute. ${v >= 60 && v <= 100 ? "That's right in the normal range! A steady heart rate is a great sign." : v < 60 ? "That's on the lower side. If you're very active, this can be normal. Ask your doctor if you have questions." : "That's a bit elevated. Rest, hydration, and stress management can help."}`;

function getTrend(data) {
  if (data.length < 2) return 'steady';
  const recent = data[0].value || data[0].systolic;
  const older = data[data.length - 1].value || data[data.length - 1].systolic;
  if (recent < older - 2) return 'decreasing';
  if (recent > older + 2) return 'increasing';
  return 'steady';
}

const TrendIcon = ({ trend, white }) => {
  const colors = white
    ? { down: 'rgba(255,255,255,0.9)', up: 'rgba(255,255,255,0.9)', steady: 'rgba(255,255,255,0.9)' }
    : { down: 'var(--color-success)', up: 'var(--color-warning)', steady: 'var(--color-teal)' };
  if (trend === 'decreasing') return <TrendingDown size={18} style={{ color: colors.down }} />;
  if (trend === 'increasing') return <TrendingUp size={18} style={{ color: colors.up }} />;
  return <Minus size={18} style={{ color: colors.steady }} />;
};

export default function Vitals() {
  const { vitals, joinedGroups, joinGroup } = useApp();
  const { triggerCelebration } = useSunny();
  const [activeTab, setActiveTab] = useState('bp');
  const [showTips, setShowTips] = useState(false);
  const [showGroup, setShowGroup] = useState(false);
  const [shared, setShared] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  const handleShare = (message) => {
    setShared(true);
    setTimeout(() => setShared(false), 2500);
    // In a real app this would open native share sheet
    if (navigator.share) {
      navigator.share({ text: message }).catch(() => {});
    }
  };

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

  if (!vitals) return <PageShell title="Your Health Numbers"><p>No data yet.</p></PageShell>;

  const heartGroup = communityGroups.find(g => g.id === 'grp-5');

  const renderContent = () => {
    if (activeTab === 'bp') {
      const latest = vitals.bloodPressure[0];
      const status = getBPStatus(latest.systolic);
      const chartData = [...vitals.bloodPressure].reverse().map(r => ({ date: formatDateShort(r.date), Systolic: r.systolic, Diastolic: r.diastolic }));

      return (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl p-5 text-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light, #2EC4B6))',
              boxShadow: '0 4px 12px rgba(13, 124, 124, 0.25)',
            }}
          >
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-2xl)', color: 'white' }}>
              {latest.systolic}/{latest.diastolic} <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 400, color: 'rgba(255,255,255,0.8)' }}>mmHg</span>
            </p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
              {status.label}
            </span>
            <p className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.8)' }}>Recorded {formatDateMedium(latest.date)}</p>
          </motion.div>

          <Card animate={false}>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{bpSummary(latest.systolic, latest.diastolic)}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleSpeak(bpSummary(latest.systolic, latest.diastolic))}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full min-h-[36px]"
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  backgroundColor: speaking ? 'var(--color-teal)' : 'var(--color-teal-pale)',
                  color: speaking ? 'white' : 'var(--color-teal)',
                }}
              >
                <Volume2 size={14} /> {speaking ? 'Stop' : 'Read Aloud'}
              </button>
              <button
                onClick={() => handleShare(`My blood pressure: ${latest.systolic}/${latest.diastolic} mmHg — ${status.label}. Recorded ${formatDateMedium(latest.date)}.`)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full min-h-[36px]"
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  backgroundColor: shared ? 'var(--color-teal)' : 'var(--color-purple-pale)',
                  color: shared ? 'white' : 'var(--color-purple)',
                }}
              >
                <Share2 size={14} /> {shared ? 'Shared!' : 'Share with Family'}
              </button>
            </div>
          </Card>

          <Card animate={false} padding="p-3">
            <p className="font-semibold mb-2 px-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Blood Pressure Trend</p>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="bpGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-teal)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--color-teal)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-muted)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                  <YAxis domain={[60, 160]} width={40} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                  <Tooltip contentStyle={{ fontSize: 'var(--font-size-xs)', borderRadius: '12px', border: '1px solid var(--color-surface-muted)' }} />
                  <Area type="monotone" dataKey="Systolic" stroke="var(--color-teal)" strokeWidth={2.5} fill="url(#bpGrad)" dot={{ r: 4, fill: 'var(--color-teal)' }} />
                  <Line type="monotone" dataKey="Diastolic" stroke="var(--color-purple-soft)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-purple-soft)' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card onClick={() => setShowTips(true)} padding="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                <Lightbulb size={20} style={{ color: 'var(--color-teal)' }} />
              </div>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-teal)' }}>Tips to improve your blood&nbsp;pressure</p>
            </div>
          </Card>

          <Card onClick={() => setShowGroup(true)} padding="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
                <Users size={20} style={{ color: 'var(--color-purple)' }} />
              </div>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-purple)' }}>Join others working on healthier&nbsp;BP</p>
            </div>
          </Card>
        </div>
      );
    }

    // Cholesterol tab
    if (activeTab === 'cholesterol') {
      const cholData = vitals.cholesterol || [];
      const latest = cholData[0];
      if (!latest) return <p>No cholesterol data yet.</p>;
      const status = getCholesterolStatus(latest.total);
      const chartData = [...cholData].reverse().map(r => ({ date: formatDateShort(r.date), Total: r.total, LDL: r.ldl, HDL: r.hdl }));
      const summary = `Your total cholesterol is ${latest.total} mg/dL. ${latest.total < 200 ? "That's in the desirable range — your Atorvastatin and healthy eating are working well!" : "That's borderline high, but the good news is your numbers have been trending down. Keep up with your Atorvastatin and heart-healthy diet!"} Your HDL (good cholesterol) is ${latest.hdl}, and your LDL (bad cholesterol) is ${latest.ldl}.`;

      return (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl p-5 text-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light, #2EC4B6))',
              boxShadow: '0 4px 12px rgba(13, 124, 124, 0.25)',
            }}
          >
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-2xl)', color: 'white' }}>
              {latest.total} <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 400, color: 'rgba(255,255,255,0.8)' }}>mg/dL</span>
            </p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
              {status.label}
            </span>
            <p className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.8)' }}>Recorded {formatDateMedium(latest.date)}</p>
          </motion.div>

          {/* Breakdown */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: 'LDL', value: latest.ldl, desc: 'Bad', ideal: '< 100' },
              { label: 'HDL', value: latest.hdl, desc: 'Good', ideal: '> 60' },
              { label: 'Triglycerides', value: latest.triglycerides, desc: '', ideal: '< 150' },
            ].map(item => (
              <Card key={item.label} animate={false} padding="p-3">
                <p className="font-bold text-center" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>{item.value}</p>
                <p className="font-semibold text-center" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text)' }}>
                  {item.label} {item.desc && <span style={{ color: 'var(--color-text-muted)', fontWeight: 400 }}>({item.desc})</span>}
                </p>
                <p className="text-center" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}>Ideal: {item.ideal}</p>
              </Card>
            ))}
          </div>

          <Card animate={false}>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{summary}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleSpeak(summary)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full min-h-[36px]"
                style={{
                  fontSize: 'var(--font-size-xs)', fontWeight: 600,
                  backgroundColor: speaking ? 'var(--color-teal)' : 'var(--color-teal-pale)',
                  color: speaking ? 'white' : 'var(--color-teal)',
                }}
              >
                <Volume2 size={14} /> {speaking ? 'Stop' : 'Read Aloud'}
              </button>
            </div>
          </Card>

          <Card animate={false} padding="p-3">
            <p className="font-semibold mb-2 px-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Cholesterol Trend</p>
            <div style={{ width: '100%', height: 200 }}>
              <ResponsiveContainer>
                <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                  <defs>
                    <linearGradient id="cholGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--color-teal)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="var(--color-teal)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-muted)" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                  <YAxis width={40} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                  <Tooltip contentStyle={{ fontSize: 'var(--font-size-xs)', borderRadius: '12px', border: '1px solid var(--color-surface-muted)' }} />
                  <Area type="monotone" dataKey="Total" stroke="var(--color-teal)" strokeWidth={2.5} fill="url(#cholGrad)" dot={{ r: 4, fill: 'var(--color-teal)' }} />
                  <Line type="monotone" dataKey="LDL" stroke="var(--color-danger)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-danger)' }} />
                  <Line type="monotone" dataKey="HDL" stroke="var(--color-success)" strokeWidth={2} dot={{ r: 3, fill: 'var(--color-success)' }} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              <span className="flex items-center gap-1" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}><span className="w-3 h-0.5 inline-block rounded" style={{ backgroundColor: 'var(--color-teal)' }} /> Total</span>
              <span className="flex items-center gap-1" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}><span className="w-3 h-0.5 inline-block rounded" style={{ backgroundColor: 'var(--color-danger)' }} /> LDL</span>
              <span className="flex items-center gap-1" style={{ fontSize: '11px', color: 'var(--color-text-muted)' }}><span className="w-3 h-0.5 inline-block rounded" style={{ backgroundColor: 'var(--color-success)' }} /> HDL</span>
            </div>
          </Card>
        </div>
      );
    }

    // Vitamins & Minerals tab
    if (activeTab === 'vitamins') {
      const vitData = vitals.vitaminsAndMinerals || [];
      if (!vitData.length) return <p>No vitamin data yet.</p>;
      const lowCount = vitData.filter(v => v.status === 'low').length;
      const summary = lowCount === 0
        ? "All your vitamin and mineral levels are in the normal range. Your supplements and balanced diet are paying off!"
        : `Most of your levels look good, but ${lowCount === 1 ? "one nutrient is" : `${lowCount} nutrients are`} a little low. These are highlighted below — talk to Dr. Chen about whether a supplement adjustment might help.`;

      const statusStyles = {
        normal: { bg: '#E8F5E9', text: '#2E7D32', label: 'Normal' },
        low: { bg: '#FFF3E0', text: '#E65100', label: 'Low' },
        high: { bg: '#FDE8E8', text: '#C62828', label: 'High' },
      };

      return (
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="rounded-2xl p-5 text-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light, #2EC4B6))',
              boxShadow: '0 4px 12px rgba(13, 124, 124, 0.25)',
            }}
          >
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-2xl)', color: 'white' }}>
              {vitData.length - lowCount}/{vitData.length}
            </p>
            <span className="inline-block mt-1 px-3 py-1 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
              In Normal Range
            </span>
            <p className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.8)' }}>Last tested {formatDateMedium(vitData[0].date)}</p>
          </motion.div>

          <Card animate={false}>
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{summary}</p>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => handleSpeak(summary)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full min-h-[36px]"
                style={{
                  fontSize: 'var(--font-size-xs)', fontWeight: 600,
                  backgroundColor: speaking ? 'var(--color-teal)' : 'var(--color-teal-pale)',
                  color: speaking ? 'white' : 'var(--color-teal)',
                }}
              >
                <Volume2 size={14} /> {speaking ? 'Stop' : 'Read Aloud'}
              </button>
            </div>
          </Card>

          <div className="space-y-2">
            {vitData.map((v, i) => {
              const style = statusStyles[v.status] || statusStyles.normal;
              return (
                <motion.div
                  key={v.name}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Card animate={false} padding="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                          {v.name}
                        </p>
                        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                          Normal: {v.normalRange} {v.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>
                          {v.value} <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 400, color: 'var(--color-text-muted)' }}>{v.unit}</span>
                        </p>
                        <span
                          className="inline-block px-2 py-0.5 rounded-full font-semibold"
                          style={{ fontSize: '11px', backgroundColor: style.bg, color: style.text }}
                        >
                          {style.label}
                        </span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      );
    }

    // Weight, Glucose, Heart Rate
    const dataMap = { weight: vitals.weight, glucose: vitals.bloodGlucose, hr: vitals.heartRate };
    const data = dataMap[activeTab] || [];
    const latest = data[0];
    if (!latest) return <p>No data yet.</p>;
    const trend = getTrend(data);
    const chartData = [...data].reverse().map(r => ({ date: formatDateShort(r.date), value: r.value }));

    const summaries = {
      weight: weightSummary(latest.value, trend),
      glucose: glucoseSummary(latest.value),
      hr: hrSummary(latest.value),
    };
    const units = { weight: 'lbs', glucose: 'mg/dL', hr: 'bpm' };
    const statusFn = activeTab === 'glucose' ? getGlucoseStatus(latest.value) : { label: trend === 'steady' ? 'Steady' : trend === 'decreasing' ? 'Trending down' : 'Trending up', color: 'var(--color-teal)' };

    return (
      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="rounded-2xl p-5 text-center"
          style={{
            background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light, #2EC4B6))',
            boxShadow: '0 4px 12px rgba(13, 124, 124, 0.25)',
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <p className="font-semibold" style={{ fontSize: 'var(--font-size-2xl)', color: 'white' }}>
              {latest.value} <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 400, color: 'rgba(255,255,255,0.8)' }}>{units[activeTab]}</span>
            </p>
            <TrendIcon trend={trend} white />
          </div>
          <span className="inline-block mt-1 px-3 py-1 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'rgba(255,255,255,0.2)', color: 'white' }}>
            {statusFn.label}
          </span>
          <p className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.8)' }}>Recorded {formatDateMedium(latest.date)}</p>
        </motion.div>

        <Card animate={false}>
          <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{summaries[activeTab]}</p>
          <div className="flex gap-2 mt-3">
            <button
              onClick={() => handleSpeak(summaries[activeTab])}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full min-h-[36px]"
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                backgroundColor: speaking ? 'var(--color-teal)' : 'var(--color-teal-pale)',
                color: speaking ? 'white' : 'var(--color-teal)',
              }}
            >
              <Volume2 size={14} /> {speaking ? 'Stop' : 'Read Aloud'}
            </button>
            <button
              onClick={() => handleShare(`My ${tabs.find(t => t.key === activeTab)?.label}: ${latest.value} ${units[activeTab]} — ${statusFn.label}. Recorded ${formatDateMedium(latest.date)}.`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full min-h-[36px]"
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                backgroundColor: shared ? 'var(--color-teal)' : 'var(--color-purple-pale)',
                color: shared ? 'white' : 'var(--color-purple)',
              }}
            >
              <Share2 size={14} /> {shared ? 'Shared!' : 'Share with Family'}
            </button>
          </div>
        </Card>

        <Card animate={false} padding="p-3">
          <p className="font-semibold mb-2 px-2" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Trend</p>
          <div style={{ width: '100%', height: 180 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="valGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-teal)" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="var(--color-teal)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-surface-muted)" />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                <YAxis width={40} tick={{ fontSize: 12, fill: 'var(--color-text-muted)' }} />
                <Tooltip contentStyle={{ fontSize: 'var(--font-size-xs)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="value" stroke="var(--color-teal)" strokeWidth={2.5} fill="url(#valGrad)" dot={{ r: 4, fill: 'var(--color-teal)' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {activeTab === 'glucose' && (
          <Card onClick={() => setShowTips(true)} padding="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                <Lightbulb size={20} style={{ color: 'var(--color-teal)' }} />
              </div>
              <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-teal)' }}>Tips to manage your blood&nbsp;sugar</p>
            </div>
          </Card>
        )}
      </div>
    );
  };

  return (
    <PageShell title="Your Health Numbers" subtitle="Understanding your body, one number at a&nbsp;time.">
      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="flex flex-col items-center justify-center gap-1 rounded-xl font-semibold min-h-[64px] transition-all"
              style={{
                fontSize: 'var(--font-size-sm)',
                backgroundColor: isActive ? 'var(--color-teal)' : 'var(--color-card)',
                color: isActive ? '#fff' : 'var(--color-text)',
                boxShadow: isActive ? 'none' : '0 1px 3px var(--color-shadow)',
              }}
            >
              <Icon size={20} />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
          {renderContent()}
        </motion.div>
      </AnimatePresence>

      {/* Tips Modal */}
      <Modal isOpen={showTips} onClose={() => setShowTips(false)} title={activeTab === 'glucose' ? 'Blood Sugar Tips' : 'Blood Pressure Tips'}>
        <div className="space-y-3">
          {(activeTab === 'glucose' ? glucoseTips : bpTips).map((tip, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--color-teal-pale)' }}>
                <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-teal)' }}>{i + 1}</span>
              </div>
              <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{tip}</p>
            </div>
          ))}
        </div>
      </Modal>

      {/* Group Modal */}
      <Modal isOpen={showGroup} onClose={() => setShowGroup(false)} title={heartGroup?.name || 'Community Group'}>
        {heartGroup && (
          <div className="space-y-4">
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{heartGroup.description}</p>
            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{heartGroup.members} members</p>

            {!joinedGroups.includes(heartGroup.id) ? (
              <div className="space-y-3">
                <p className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>Privacy options</p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Your privacy matters. Choose how you appear in the group.</p>
                <Button fullWidth onClick={() => { joinGroup(heartGroup.id); triggerCelebration('small'); }}>Join Group</Button>
              </div>
            ) : (
              <div className="space-y-3">
                {heartGroup.posts.map((post, i) => (
                  <div key={i} className="rounded-xl p-3" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
                    <p className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>{post.author}</p>
                    <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{post.text}</p>
                    <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>{post.time}</p>
                  </div>
                ))}
                <div className="flex gap-2">
                  <input placeholder="Share an update..." className="flex-1 rounded-xl p-3 min-h-[48px]" style={{ backgroundColor: 'var(--color-surface-muted)', fontSize: 'var(--font-size-sm)', border: 'none', outline: 'none', color: 'var(--color-text)' }} />
                  <Button size="small">Post</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>

      <ReturnCapsules sectionPath="/" />
    </PageShell>
  );
}
