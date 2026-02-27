import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { aiResponses } from '../../data/mockData';
import { ArrowLeft, Send, Bot } from 'lucide-react';
import { motion } from 'framer-motion';
import ReturnCapsules from '../../components/ui/ReturnCapsules';

const quickQuestions = [
  "What does my blood pressure mean?",
  "Can I take Metformin with food?",
  "How can I sleep better?",
  "What exercises are safe for me?",
];

export default function AIAssistant() {
  const navigate = useNavigate();
  const { chatMessages, addChatMessage } = useApp();
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (chatMessages.length === 0) {
      addChatMessage({ role: 'ai', text: "Hi there! I'm your MyChenMed AI assistant. Ask me anything about your health, medications, or wellness — I'm here to\u00A0help!" });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!scrollRef.current) return;
    const lastMsg = chatMessages[chatMessages.length - 1];
    if (lastMsg?.role === 'ai' && chatMessages.length >= 2) {
      // Scroll so the user's question is at the top of the chat area
      const container = scrollRef.current;
      const messageEls = container.querySelectorAll('[data-msg]');
      // Find the last user message element (the one before this AI response)
      for (let i = messageEls.length - 1; i >= 0; i--) {
        if (messageEls[i].getAttribute('data-msg') === 'user') {
          messageEls[i].scrollIntoView({ behavior: 'smooth', block: 'start' });
          break;
        }
      }
    } else {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleSend = (text) => {
    const q = text || input.trim();
    if (!q) return;
    addChatMessage({ role: 'user', text: q });
    setInput('');

    setTimeout(() => {
      const response = aiResponses[q] || "That's a great question! In the full version of MyChenMed, I'll be able to answer that for you. For now, try one of the quick questions above, or ask your care team at your next\u00A0appointment!";
      addChatMessage({ role: 'ai', text: response });
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Main chat layout — exactly fills viewport above nav */}
      <div
        className="flex flex-col max-w-lg mx-auto px-4"
        style={{ height: 'calc(100dvh - var(--nav-height, 80px))' }}
      >
        {/* Header */}
        <div className="pt-4 flex-shrink-0">
          <button onClick={() => navigate('/explore')} className="flex items-center gap-2 mb-3 min-h-[48px]" style={{ color: 'var(--color-teal)' }}>
            <ArrowLeft size={20} /> Back to Explore
          </button>
          <h1 className="font-semibold mb-1" style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-text-heading)' }}>AI Assistant</h1>
          <p className="mb-4" style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-muted)' }}>Your personal health&nbsp;helper</p>
        </div>

        {/* Chat area — fills remaining space, scrolls internally */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto min-h-0"
        >
          <div className="space-y-3 pb-2">
            {chatMessages.map((msg, i) => (
              <motion.div
                key={i}
                data-msg={msg.role}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} items-end gap-2`}
              >
                {msg.role === 'ai' && (
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'var(--color-purple-pale)' }}>
                    <Bot size={16} style={{ color: 'var(--color-purple)' }} />
                  </div>
                )}
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-3"
                  style={{
                    backgroundColor: msg.role === 'user' ? 'var(--color-teal)' : 'var(--color-purple-pale)',
                    color: msg.role === 'user' ? 'white' : 'var(--color-text)',
                    fontSize: 'var(--font-size-sm)',
                    borderBottomRightRadius: msg.role === 'user' ? '4px' : undefined,
                    borderBottomLeftRadius: msg.role === 'ai' ? '4px' : undefined,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {msg.text}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom section — pinned at bottom of viewport */}
        <div className="flex-shrink-0 pt-2 pb-1">
          {/* Quick Questions */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {quickQuestions.map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="rounded-full px-3 py-1.5 min-h-[36px] font-semibold"
                style={{
                  fontSize: 'var(--font-size-xs)',
                  backgroundColor: 'var(--color-card)',
                  color: 'var(--color-teal)',
                  border: '1.5px solid var(--color-teal)',
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div className="flex gap-2 mb-1">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
              placeholder="Type your question..."
              className="flex-1 rounded-xl px-4 py-3 min-h-[48px]"
              style={{ backgroundColor: 'var(--color-card)', fontSize: 'var(--font-size-sm)', border: 'none', outline: 'none', color: 'var(--color-text)', boxShadow: '0 1px 3px var(--color-shadow)' }}
            />
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSend()}
              className="w-12 h-12 min-h-[48px] min-w-[48px] rounded-xl flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-teal)', color: 'white' }}
              aria-label="Send"
            >
              <Send size={20} />
            </motion.button>
          </div>

          <p className="text-center pb-1" style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>
            Not a replacement for your doctor. Always consult your care&nbsp;team.
          </p>
        </div>
      </div>

      {/* Return capsules — below the fold, user scrolls to see them */}
      <div className="max-w-lg mx-auto px-4">
        <ReturnCapsules sectionName="Explore" sectionPath="/explore" compact />
      </div>
    </motion.div>
  );
}
