import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { communityGroups, communityEvents } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { useSunny } from '../../context/SunnyContext';
import PageShell from '../../components/ui/PageShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import ReturnCapsules from '../../components/ui/ReturnCapsules';
import { ArrowLeft, Users, Calendar, Shield, Footprints, UtensilsCrossed, BookOpen, Baby, Heart, CalendarPlus, Check } from 'lucide-react';

const groupIcons = {
  walking: { Icon: Footprints, color: '#2E7D32', bg: '#E8F5E9' },
  cooking: { Icon: UtensilsCrossed, color: '#E65100', bg: '#FFF3E0' },
  book: { Icon: BookOpen, color: '#7B1FA2', bg: '#F3E5F5' },
  family: { Icon: Baby, color: '#0097A7', bg: '#CCF0F6' },
  heart: { Icon: Heart, color: '#C2185B', bg: '#FADDE6' },
};

export default function Community() {
  const navigate = useNavigate();
  const { joinedGroups, joinGroup } = useApp();
  const { triggerCelebration } = useSunny();
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [calendarAdded, setCalendarAdded] = useState([]);

  const handleRegister = (eventId) => {
    setRegisteredEvents(prev => [...prev, eventId]);
    triggerCelebration('small');
  };

  const handleAddToCalendar = (event) => {
    setCalendarAdded(prev => [...prev, event.id]);
    // Generate a simple calendar download
    const startDate = new Date();
    const dayMap = { Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 5, Saturday: 6 };
    const targetDay = dayMap[event.day];
    if (targetDay !== undefined) {
      const currentDay = startDate.getDay();
      const daysUntil = ((targetDay - currentDay) + 7) % 7 || 7;
      startDate.setDate(startDate.getDate() + daysUntil);
    }
    const [time, period] = event.time.split(' ');
    const [hours, minutes] = time.split(':');
    let h = parseInt(hours);
    if (period === 'PM' && h !== 12) h += 12;
    if (period === 'AM' && h === 12) h = 0;
    startDate.setHours(h, parseInt(minutes), 0, 0);

    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000);
    const fmt = (d) => d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `DTSTART:${fmt(startDate)}`,
      `DTEND:${fmt(endDate)}`,
      `SUMMARY:${event.name}`,
      `DESCRIPTION:Hosted by ${event.host}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${event.name.replace(/\s+/g, '-')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <PageShell>
      <button onClick={() => navigate('/explore')} className="flex items-center gap-2 mb-4 min-h-[48px]" style={{ color: 'var(--color-teal)' }}>
        <ArrowLeft size={20} /> Back to Explore
      </button>
      <h1 className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>Community</h1>
      <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>You're not alone on this&nbsp;journey.</p>

      <div className="flex items-center gap-2 mb-5 p-3 rounded-xl" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
        <Shield size={18} style={{ color: 'var(--color-purple)' }} />
        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>Your privacy matters. You choose what to&nbsp;share.</p>
      </div>

      <h2 className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Groups</h2>
      <div className="space-y-3 mb-6">
        {communityGroups.map(group => {
          const iconData = groupIcons[group.icon];
          const GroupIcon = iconData?.Icon || Users;
          const iconColor = iconData?.color || 'var(--color-teal)';
          const iconBg = iconData?.bg || 'var(--color-teal-pale)';
          return (
            <Card key={group.id} onClick={() => setSelectedGroup(group)} animate={false} padding="p-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: iconBg }}>
                  <GroupIcon size={22} style={{ color: iconColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{group.name}</p>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>
                    <Users size={14} className="inline mr-1" />{group.members}&nbsp;members
                  </p>
                  <p className="mt-1" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text)' }}>{group.description}&nbsp;</p>
                </div>
                <div className="flex-shrink-0">
                  {joinedGroups.includes(group.id) ? (
                    <span className="px-3 py-1 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal)' }}>Joined</span>
                  ) : (
                    <Button size="small" onClick={(e) => { e.stopPropagation(); joinGroup(group.id); triggerCelebration('small'); }}>Join</Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <h2 className="font-semibold mb-3" style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-heading)' }}>Upcoming Events</h2>
      <div className="space-y-3">
        {communityEvents.map(event => {
          const isRegistered = registeredEvents.includes(event.id);
          const isAddedToCal = calendarAdded.includes(event.id);
          return (
            <Card key={event.id} animate={false} padding="p-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#E2D5F0' }}>
                  <Calendar size={22} style={{ color: '#7B1FA2' }} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold" style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-heading)' }}>{event.name}</p>
                  <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>{event.day} at {event.time}&nbsp;</p>
                  <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>Hosted by {event.host}&nbsp;</p>
                  <div className="flex items-center gap-2 mt-2">
                    {!isRegistered ? (
                      <Button size="small" onClick={() => handleRegister(event.id)}>Register Now</Button>
                    ) : (
                      <>
                        <span className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-teal-pale)', color: 'var(--color-teal)' }}>
                          <Check size={14} /> Registered
                        </span>
                        {!isAddedToCal ? (
                          <button
                            onClick={() => handleAddToCalendar(event)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full font-semibold min-h-[36px]"
                            style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-purple-pale)', color: 'var(--color-purple)', border: 'none' }}
                          >
                            <CalendarPlus size={14} /> Add to Calendar
                          </button>
                        ) : (
                          <span className="flex items-center gap-1 px-3 py-1 rounded-full font-semibold" style={{ fontSize: 'var(--font-size-xs)', backgroundColor: 'var(--color-purple-pale)', color: 'var(--color-purple)' }}>
                            <Check size={14} /> Added
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <ReturnCapsules sectionName="Explore" sectionPath="/explore" />

      {/* Group Detail Modal */}
      <Modal isOpen={!!selectedGroup} onClose={() => setSelectedGroup(null)} title={selectedGroup?.name || ''}>
        {selectedGroup && (
          <div className="space-y-4">
            <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text)' }}>{selectedGroup.description}&nbsp;</p>
            {!joinedGroups.includes(selectedGroup.id) && (
              <Button fullWidth onClick={() => { joinGroup(selectedGroup.id); triggerCelebration('small'); }}>Join Group</Button>
            )}
            {joinedGroups.includes(selectedGroup.id) && selectedGroup.posts && (
              <div className="space-y-3">
                {selectedGroup.posts.map((post, i) => (
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
    </PageShell>
  );
}
