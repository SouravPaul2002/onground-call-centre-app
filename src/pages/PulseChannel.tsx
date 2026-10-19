import React, { useState, useRef, useEffect } from 'react';
import type { PageId } from '../types';
import {
  ArrowLeft,
  Pin,
  ChevronUp,
  ChevronDown,
  Send,
  CheckCircle2,
  Smile,
  Hash,
} from 'lucide-react';

interface PulseChannelProps {
  onNavigate?: (page: PageId) => void;
}

interface MessageItem {
  id: string;
  sender: string;
  senderInitials: string;
  avatarBg: string;
  avatarColor: string;
  time: string;
  isUser: boolean;
  content: string;
  tag?: string;
}

export const PulseChannel: React.FC<PulseChannelProps> = ({ onNavigate }) => {
  // Pinned "Needs your input" card state
  const [pinnedOpen, setPinnedOpen] = useState(true);
  const [pinnedResolved, setPinnedResolved] = useState(false);
  const [pinnedInput, setPinnedInput] = useState('');

  // Messages thread state
  const [messages, setMessages] = useState<MessageItem[]>([
    {
      id: 'msg-1',
      sender: 'Sunita Rao',
      senderInitials: 'SR',
      avatarBg: '#faeeda',
      avatarColor: '#854f0b',
      time: '2:05pm',
      isUser: false,
      tag: 'STAKEHOLDERS',
      content: '👥 STAKEHOLDERS: @You (Arvind R.), whole call centre shift',
    },
    {
      id: 'msg-2',
      sender: 'Sunita Rao',
      senderInitials: 'SR',
      avatarBg: '#faeeda',
      avatarColor: '#854f0b',
      time: '2:05pm',
      isUser: false,
      tag: 'ISSUE DEFINITION',
      content: '📋 ISSUE DEFINITION: Greeting-in-first-10s QA score is at 71% this week, below our 85% target.',
    },
    {
      id: 'msg-3',
      sender: 'Sunita Rao',
      senderInitials: 'SR',
      avatarBg: '#faeeda',
      avatarColor: '#854f0b',
      time: '2:05pm',
      isUser: false,
      tag: 'SUGGESTED RESOLUTION',
      content: "💡 SUGGESTED RESOLUTION: Let's push that up 🦾 — open every call with the greeting script. I'll check back Friday.",
    },
    {
      id: 'msg-4',
      sender: 'You',
      senderInitials: 'AR',
      avatarBg: '#0f6e56',
      avatarColor: '#ffffff',
      time: '2:10pm',
      isUser: true,
      content: 'On it! Will make sure I open every call with the greeting script 🙌',
    },
    {
      id: 'msg-5',
      sender: 'Sunita Rao',
      senderInitials: 'SR',
      avatarBg: '#faeeda',
      avatarColor: '#854f0b',
      time: '2:14pm',
      isUser: false,
      content: 'Great attitude Arvind ⭐',
    },
  ]);

  // Message composer input state
  const [composerText, setComposerText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle resolving pinned task
  const handleResolvePinned = (decision: string) => {
    if (pinnedResolved) return;
    setPinnedResolved(true);

    const newMsg: MessageItem = {
      id: `user-${Date.now()}`,
      sender: 'You',
      senderInitials: 'AR',
      avatarBg: '#0f6e56',
      avatarColor: '#ffffff',
      time: 'Just now',
      isUser: true,
      content: `${decision} — I'll handle the 4:30pm priority callback with Priya Iyer.`,
    };

    setMessages((prev) => [...prev, newMsg]);

    setTimeout(() => {
      const ackMsg: MessageItem = {
        id: `ack-${Date.now()}`,
        sender: 'Sunita Rao',
        senderInitials: 'SR',
        avatarBg: '#faeeda',
        avatarColor: '#854f0b',
        time: 'Just now',
        isUser: false,
        content: `Thanks Arvind! Marked as confirmed on the shift board. Let's resolve her billing concern smoothly.`,
      };
      setMessages((prev) => [...prev, ackMsg]);
    }, 1200);
  };

  // Handle sending a new message in the chat
  const handleSendMessage = () => {
    if (!composerText.trim()) return;

    const userMsg: MessageItem = {
      id: `msg-${Date.now()}`,
      sender: 'You',
      senderInitials: 'AR',
      avatarBg: '#0f6e56',
      avatarColor: '#ffffff',
      time: 'Just now',
      isUser: true,
      content: composerText.trim(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setComposerText('');

    // Simulate supportive reply
    setTimeout(() => {
      const autoReply: MessageItem = {
        id: `reply-${Date.now()}`,
        sender: 'Sunita Rao',
        senderInitials: 'SR',
        avatarBg: '#faeeda',
        avatarColor: '#854f0b',
        time: 'Just now',
        isUser: false,
        content: `Got it Arvind. Keep up the high momentum on today's calls! 🚀`,
      };
      setMessages((prev) => [...prev, autoReply]);
    }, 1500);
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto pb-14 min-h-[calc(100vh-64px)] flex flex-col">
      {/* 1. Channel Header with Back Navigation */}
      <div
        style={{
          background: '#ffffff',
          borderBottom: '1px solid #e5e5ea',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          position: 'sticky',
          top: 0,
          zIndex: 10,
        }}
      >
        <button
          onClick={() => {
            if (onNavigate) onNavigate('pulse');
          }}
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: '#f2f2f7',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#1a1a1a',
            transition: 'all 0.15s ease',
          }}
          className="hover:bg-slate-200"
          title="Back to Pulse Home"
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: 1 }}>
          <Hash size={19} color="#6d28d9" strokeWidth={2.5} />
          <div>
            <div style={{ fontSize: '16.5px', fontWeight: 800, color: '#1a1a1a', lineHeight: 1.2 }}>
              callcentre-team
            </div>
            <div style={{ fontSize: '12px', color: '#8e8e93' }}>
              6 members · Call Centre shift channel
            </div>
          </div>
        </div>
      </div>

      {/* 2. Pinned "Needs your input" Card */}
      {!pinnedResolved ? (
        <div
          style={{
            background: '#fffaf0',
            borderBottom: '1.5px solid #f59e0b',
            padding: '10px 14px 12px',
            boxShadow: '0 2px 6px rgba(146, 64, 14, 0.08)',
            position: 'relative',
            zIndex: 5,
          }}
        >
          {/* Top Bar with Pin & Toggle */}
          <div
            onClick={() => setPinnedOpen(!pinnedOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              cursor: 'pointer',
            }}
          >
            <Pin size={16} color="#b45309" />
            <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#7a4a00' }}>
              Needs your input
            </span>
            <span
              style={{
                background: '#ef4444',
                color: '#ffffff',
                fontSize: '11px',
                fontWeight: 800,
                padding: '1px 7px',
                borderRadius: 9,
              }}
            >
              1
            </span>
            <span style={{ fontSize: '12px', color: '#a16207', fontWeight: 600 }}>pinned</span>
            <span style={{ marginLeft: 'auto', color: '#b45309' }}>
              {pinnedOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </div>

          {/* Expanded Pinned Content */}
          {pinnedOpen && (
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #fde3b0',
                borderRadius: 12,
                padding: '12px 14px',
                marginTop: 10,
              }}
            >
              <div style={{ fontSize: '14.5px', fontWeight: 700, color: '#1a1a1a' }}>
                Confirm the 4:30pm callback
              </div>
              <div style={{ fontSize: '12.5px', color: '#6b7280', marginTop: 2 }}>
                Priya Iyer · likely billing dispute
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleResolvePinned('Confirmed')}
                  style={{
                    border: '1px solid #d6d6db',
                    background: '#ffffff',
                    color: '#1a1a1a',
                    fontSize: '13px',
                    fontWeight: 700,
                    borderRadius: 8,
                    padding: '6px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  className="hover:border-amber-500 hover:bg-amber-50"
                >
                  Confirmed
                </button>
                <button
                  onClick={() => handleResolvePinned('Rescheduled')}
                  style={{
                    border: '1px solid #d6d6db',
                    background: '#ffffff',
                    color: '#1a1a1a',
                    fontSize: '13px',
                    fontWeight: 700,
                    borderRadius: 8,
                    padding: '6px 14px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  className="hover:border-amber-500 hover:bg-amber-50"
                >
                  Reschedule
                </button>
              </div>

              {/* Typed Input */}
              <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                <input
                  type="text"
                  value={pinnedInput}
                  onChange={(e) => setPinnedInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && pinnedInput.trim()) {
                      handleResolvePinned(pinnedInput.trim());
                      setPinnedInput('');
                    }
                  }}
                  placeholder="Or type your answer"
                  style={{
                    flex: 1,
                    minWidth: 0,
                    border: '1px solid #e5e5ea',
                    borderRadius: 8,
                    padding: '7px 10px',
                    fontSize: '13px',
                    outline: 'none',
                  }}
                />
                <button
                  onClick={() => {
                    if (pinnedInput.trim()) {
                      handleResolvePinned(pinnedInput.trim());
                      setPinnedInput('');
                    }
                  }}
                  style={{
                    border: 'none',
                    background: '#92400e',
                    color: '#ffffff',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    borderRadius: 8,
                    padding: '7px 14px',
                    cursor: 'pointer',
                  }}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          style={{
            background: '#e1f5ee',
            borderBottom: '1px solid #a7e4cf',
            padding: '8px 14px',
            fontSize: '12.5px',
            color: '#0f6e56',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <CheckCircle2 size={15} color="#0f6e56" />
          <span>Task resolved · Priya Iyer callback confirmed for 4:30 PM</span>
        </div>
      )}

      {/* 3. Messages Stream Body */}
      <div style={{ flex: 1, padding: '16px 14px', overflowY: 'auto' }}>
        {/* Date Divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '8px 0 16px',
            position: 'relative',
          }}
        >
          <div style={{ height: 1, background: '#e5e5ea', position: 'absolute', inset: '0 0', zIndex: 0 }} />
          <span
            style={{
              background: '#f2f2f7',
              padding: '2px 14px',
              borderRadius: 12,
              fontSize: '12px',
              fontWeight: 700,
              color: '#8e8e93',
              position: 'relative',
              zIndex: 1,
            }}
          >
            Today · Call Centre Team
          </span>
        </div>

        {/* Message Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {messages.map((m) => {
            if (m.isUser) {
              return (
                <div key={m.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                  <div style={{ fontSize: '11.5px', color: '#8e8e93', marginBottom: 2, marginRight: 4 }}>
                    You {m.time}
                  </div>
                  <div
                    style={{
                      maxWidth: '75%',
                      background: '#0f6e56',
                      color: '#ffffff',
                      padding: '10px 14px',
                      borderRadius: '16px 16px 4px 16px',
                      fontSize: '14px',
                      lineHeight: 1.45,
                      boxShadow: '0 2px 8px rgba(15, 110, 86, 0.25)',
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              );
            }

            return (
              <div key={m.id} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: m.avatarBg,
                    color: m.avatarColor,
                    fontSize: '13px',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                  }}
                >
                  {m.senderInitials}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 7, marginBottom: 3 }}>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>
                      {m.sender}
                    </span>
                    <span style={{ fontSize: '11.5px', color: '#8e8e93' }}>{m.time}</span>
                  </div>

                  <div
                    style={{
                      background: '#ffffff',
                      border: '1px solid #ece7fa',
                      borderRadius: '4px 16px 16px 16px',
                      padding: '10px 14px',
                      fontSize: '14px',
                      color: '#1a1a1a',
                      lineHeight: 1.5,
                      boxShadow: '0 1px 3px rgba(16,24,40,0.04)',
                      display: 'inline-block',
                      maxWidth: '85%',
                    }}
                  >
                    {m.content}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* 4. Bottom Message Composer */}
      <div
        style={{
          background: '#ffffff',
          borderTop: '1px solid #e5e5ea',
          padding: '12px 16px',
          position: 'sticky',
          bottom: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            background: '#fafafc',
            border: '1.5px solid #e5e5ea',
            borderRadius: 14,
            padding: '6px 12px',
          }}
        >
          <input
            type="text"
            value={composerText}
            onChange={(e) => setComposerText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            placeholder="Message #callcentre-team..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '14px',
              color: '#1a1a1a',
              padding: '6px 0',
            }}
          />

          <button
            style={{
              background: 'none',
              border: 'none',
              color: '#8e8e93',
              cursor: 'pointer',
              padding: 4,
            }}
            title="Emoji"
          >
            <Smile size={18} />
          </button>

          <button
            onClick={handleSendMessage}
            disabled={!composerText.trim()}
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: composerText.trim() ? '#6d28d9' : '#e5e5ea',
              border: 'none',
              color: '#ffffff',
              cursor: composerText.trim() ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s ease',
            }}
            title="Send Message"
          >
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
