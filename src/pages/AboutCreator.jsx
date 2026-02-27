import React from 'react';
import { useNavigate } from 'react-router-dom';
import PageShell from '../components/ui/PageShell';
import Card from '../components/ui/Card';
import ReturnCapsules from '../components/ui/ReturnCapsules';
import { ArrowLeft, Eye, Hammer, Rocket, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutCreator() {
  const navigate = useNavigate();

  return (
    <PageShell>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-2 mb-6 min-h-[48px]"
        style={{ color: 'var(--color-teal)', fontSize: 'var(--font-size-base)' }}
      >
        <ArrowLeft size={20} /> Back
      </button>

      <div className="text-center mb-6">
        {/* Photo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="inline-block mb-4"
        >
          <div
            className="mx-auto rounded-full overflow-hidden"
            style={{
              width: 140,
              height: 140,
              border: '4px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, var(--color-teal), var(--color-purple)) border-box',
              padding: '4px',
              borderRadius: '50%',
            }}
          >
            <img
              src="/katherine-atmar.png"
              alt="Katherine Atmar"
              className="w-full h-full object-cover"
              style={{ borderRadius: '50%' }}
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <h1 className="font-bold" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>
            Katherine Atmar
          </h1>
          <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
            Creative Director
          </p>
        </motion.div>
      </div>

      <div className="space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card animate={false}>
            <div className="text-center">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: 'var(--color-teal-pale)' }}
              >
                <Eye size={20} style={{ color: 'var(--color-teal)' }} />
              </div>
              <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                The Vision
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', lineHeight: '1.7' }}>
                MyChenMed was born from a simple observation: the people who need the most help managing their health often have the fewest tools designed for them. Our seniors deserve more than clunky portals and confusing interfaces. They deserve something that feels warm, intuitive, and genuinely helpful.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          <Card animate={false}>
            <div className="text-center">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: 'var(--color-purple-pale)' }}
              >
                <Hammer size={20} style={{ color: 'var(--color-purple)' }} />
              </div>
              <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                Why I Built This
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', lineHeight: '1.7' }}>
                I believe that great design has the power to change health outcomes. When a patient actually enjoys using their health app, they check their medications, they show up to appointments, and they feel more connected to their care team. I built this prototype to prove that we can create a digital experience seniors love — one that doesn't talk down to them, but meets them where they are with beauty, clarity, and care.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Card animate={false}>
            <div className="text-center">
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: '#FFF1F2' }}
              >
                <Rocket size={20} style={{ color: '#E0598B' }} />
              </div>
              <p className="font-semibold mb-2" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>
                What I Hope This Accomplishes
              </p>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)', lineHeight: '1.7' }}>
                My hope is that MyChenMed becomes more than an app — it becomes a differentiator for ChenMed. A reason patients stay, a reason they tell their friends, and a reason they feel genuinely cared for beyond the walls of the clinic. If we can improve medication adherence, reduce missed appointments, and make our seniors feel seen and supported every single day, then this app will have done its job. The technology is just the vehicle. The real product is trust.
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center pt-2 pb-6"
          style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)', fontStyle: 'italic' }}
        >
          Built with heart, designed for our seniors.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex justify-center pb-8"
        >
          <button
            onClick={() => navigate('/end-demo')}
            className="px-4 py-1.5 rounded-full"
            style={{
              fontSize: '10px',
              letterSpacing: '0.12em',
              fontWeight: 600,
              color: 'var(--color-text-muted)',
              backgroundColor: 'var(--color-surface-muted)',
              opacity: 0.5,
            }}
          >
            END DEMO
          </button>
        </motion.div>
      </div>

      <ReturnCapsules sectionName="Settings" sectionPath="/settings" />
    </PageShell>
  );
}
