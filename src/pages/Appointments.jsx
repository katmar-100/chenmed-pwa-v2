import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { doctors } from '../data/mockData';
import PageShell from '../components/ui/PageShell';
import Card from '../components/ui/Card';
import Modal from '../components/ui/Modal';
import ReturnCapsules from '../components/ui/ReturnCapsules';
import DoctorAvatar from '../components/features/DoctorAvatar';
import StarRating from '../components/ui/StarRating';
import { formatDate, dayLabel } from '../utils/helpers';
import { Plus, ChevronRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

function ReviewStars({ rating, size = 14 }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const fill = i <= Math.floor(rating) ? 1 : (i - 1 < rating ? 0.5 : 0);
    stars.push(
      <Star
        key={i}
        size={size}
        fill={fill > 0 ? 'var(--color-star)' : 'none'}
        stroke={fill > 0 ? 'var(--color-star)' : 'var(--color-surface-muted)'}
        strokeWidth={1.5}
      />
    );
  }
  return <div className="flex items-center gap-0.5">{stars}</div>;
}

export default function Appointments() {
  const { appointments, bookedAppointments } = useApp();
  const navigate = useNavigate();
  const [reviewDoc, setReviewDoc] = useState(null);

  const allAppts = [...appointments, ...bookedAppointments].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <PageShell title="Your Appointments" subtitle="Let's keep you on track with your care&nbsp;team.">
      {/* Schedule CTA */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={() => navigate('/book-appointment')}
        className="w-full flex items-center justify-center gap-2 rounded-2xl shadow-sm mb-4 cursor-pointer"
        style={{
          padding: '14px 20px',
          background: 'linear-gradient(135deg, var(--color-teal), var(--color-teal-light))',
          color: 'white',
          fontSize: 'var(--font-size-base)',
          fontWeight: 600,
          border: 'none',
        }}
        aria-label="Schedule a new appointment"
      >
        <Plus size={20} />
        Schedule a New Appointment
      </motion.button>

      <div className="space-y-4">
        {allAppts.map((appt, i) => {
          const doc = doctors.find(d => d.id === appt.doctorId);
          const dl = dayLabel(appt.date);
          return (
            <Card key={appt.id} to={`/appointments/${appt.id}`} delay={i * 0.08} padding="p-4">
              {/* Top line: avatar + star rating, vertically centered */}
              <div className="flex items-center gap-3 mb-2">
                <DoctorAvatar type={doc?.avatar || 'female-1'} size={64} />
                <div className="flex-1 min-w-0">
                  {dl && (
                    <span className="inline-block mb-1 px-2 py-0.5 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal)' }}>
                      {dl}
                    </span>
                  )}
                  <StarRating
                    rating={doc?.rating || 5}
                    size={14}
                    onClick={doc?.reviews ? () => setReviewDoc(doc) : undefined}
                  />
                </div>
                <ChevronRight size={20} className="flex-shrink-0" style={{ color: 'var(--color-text-muted)' }} />
              </div>
              {/* Doctor details below, full width */}
              <div>
                <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{doc?.name || 'Doctor'}</p>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{doc?.specialty}</p>
                <p className="mt-1 font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>
                  {formatDate(appt.date)} at {appt.time}
                </p>
                <p className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{appt.location}</p>
              </div>
            </Card>
          );
        })}
      </div>

      {allAppts.length === 0 && (
        <p className="text-center mt-8" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-muted)' }}>
          No upcoming visits. Schedule one&nbsp;above!
        </p>
      )}

      {/* Reviews Modal */}
      <Modal isOpen={!!reviewDoc} onClose={() => setReviewDoc(null)} title={reviewDoc ? `${reviewDoc.name}` : ''}>
        {reviewDoc && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <DoctorAvatar type={reviewDoc.avatar} size={48} />
              <div>
                <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{reviewDoc.specialty}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <ReviewStars rating={reviewDoc.rating} size={16} />
                  <span className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{reviewDoc.rating}</span>
                  <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                    ({reviewDoc.reviews.length} {reviewDoc.reviews.length === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {reviewDoc.reviews.map((review, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.08 }}
                  className="rounded-xl p-3"
                  style={{ backgroundColor: 'var(--color-bg)' }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-semibold" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-heading)' }}>
                      {review.author}
                    </span>
                    <ReviewStars rating={review.rating} size={12} />
                  </div>
                  <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)', lineHeight: '1.5' }}>
                    {review.text}
                  </p>
                  <p className="mt-1.5" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    {new Date(review.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <ReturnCapsules sectionPath="/" />
    </PageShell>
  );
}
