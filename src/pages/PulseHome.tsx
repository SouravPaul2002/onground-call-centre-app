import React, { useState } from 'react';
import type { PageId } from '../types';
import { PULSE_AGENTS_DATA } from '../mock/data';
import {
  Search,
  Plus,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Trophy,
  Target,
  ArrowRight,
} from 'lucide-react';

interface PulseHomeProps {
  onNavigate?: (page: PageId) => void;
}

export const PulseHome: React.FC<PulseHomeProps> = ({ onNavigate }) => {
  // Collapsible custom agents fold
  const [agentsFoldOpen, setAgentsFoldOpen] = useState(true);

  // New message dropdown menu
  const [newMsgMenuOpen, setNewMsgMenuOpen] = useState(false);

  return (
    <div className="w-full max-w-[1180px] mx-auto pb-14">
      {/* 1. Header with Plum Gradient */}
      <div
        style={{
          background: 'linear-gradient(135deg, #3b1a5a, #6b2fa0)',
          padding: '12px 16px 14px',
          borderRadius: '0 0 18px 18px',
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Slack / Pulse 4-color Icon */}
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
            }}
          >
            <svg width="17" height="17" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="5" height="5" rx="1.5" fill="#E01E5A" />
              <rect x="10" y="1" width="5" height="5" rx="1.5" fill="#36C5F0" />
              <rect x="1" y="10" width="5" height="5" rx="1.5" fill="#2EB67D" />
              <rect x="10" y="10" width="5" height="5" rx="1.5" fill="#ECB22E" />
            </svg>
          </div>

          <div style={{ flex: 1, minWidth: 0, display: 'flex', alignItems: 'baseline', gap: 7 }}>
            <span style={{ fontSize: '17px', fontWeight: 800, color: '#ffffff' }}>Pulse</span>
            <span style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.7)' }}>
              The Sleep Company · Koramangala
            </span>
          </div>

          {/* New message '+' button with static dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setNewMsgMenuOpen(!newMsgMenuOpen)}
              title="New message"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#ffffff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#3b1a5a',
                transition: 'all 0.15s ease',
              }}
            >
              <Plus size={18} strokeWidth={2.5} />
            </button>

            {/* Floating New Message Dropdown (Static items, clicking does nothing) */}
            {newMsgMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: 40,
                  right: 0,
                  background: '#ffffff',
                  borderRadius: 14,
                  boxShadow: '0 12px 32px rgba(0,0,0,0.22)',
                  minWidth: 210,
                  overflow: 'hidden',
                  zIndex: 400,
                  border: '1px solid #eceef2',
                  animation: 'modalRise 0.15s ease',
                }}
              >
                <div
                  style={{
                    padding: '10px 14px 6px',
                    fontSize: '11.5px',
                    fontWeight: 700,
                    color: '#8e8e93',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                  }}
                >
                  New direct message
                </div>
                {[
                  { name: 'Sunita Rao', initials: 'SR', role: 'Store Manager', bg: '#FFD700', color: '#3a2a00' },
                  { name: 'Priya Krishnan', initials: 'PK', role: 'Shift Peer', bg: '#fdecec', color: '#c23331' },
                  { name: 'Raju Kumar', initials: 'RK', role: 'Operations', bg: '#e1f5ee', color: '#0f6e56' },
                ].map((u) => (
                  <div
                    key={u.name}
                    style={{
                      padding: '10px 14px',
                      fontSize: '13.5px',
                      fontWeight: 600,
                      color: '#1a1a1a',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      borderTop: '1px solid #f7f7f9',
                    }}
                  >
                    <span
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: '50%',
                        background: u.bg,
                        color: u.color,
                        fontSize: '11px',
                        fontWeight: 800,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {u.initials}
                    </span>
                    <div>
                      <div>{u.name}</div>
                      <div style={{ fontSize: '11px', color: '#8e8e93', fontWeight: 500 }}>{u.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 2. Search Bar: UI Only (No modal) */}
      <div
        style={{
          margin: '12px 14px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          background: '#ffffff',
          border: '1.5px solid #e5e5ea',
          borderRadius: 12,
          padding: '10px 14px',
          boxShadow: '0 1px 3px rgba(16,24,40,0.05)',
        }}
      >
        <div
          style={{
            width: 26,
            height: 26,
            borderRadius: 8,
            background: '#7c3aed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            color: '#ffffff',
          }}
        >
          <Sparkles size={14} />
        </div>
        <span style={{ fontSize: '13.5px', color: '#8e8e93', flex: 1 }}>
          Ask AvaniBot or search Pulse...
        </span>
        <Search size={16} color="#c5c5c5" />
      </div>

      {/* 3. AvaniBot Hero Card: UI Only (No modal) */}
      <div className="avani-hero-card">
        <div className="avani-hero-shine" />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            position: 'relative',
            zIndex: 1,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              flexShrink: 0,
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
              color: '#ffffff',
            }}
          >
            <Sparkles size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: '16px', fontWeight: 800, color: '#ffffff' }}>AvaniBot</span>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#ffffff',
                  background: 'rgba(255,255,255,0.22)',
                  padding: '2px 8px',
                  borderRadius: 8,
                  letterSpacing: '0.4px',
                }}
              >
                ALWAYS ON
              </span>
            </div>
            <div style={{ fontSize: '12.5px', color: '#e4d9fc', marginTop: 2, lineHeight: 1.35 }}>
              Ask me about anything happening in Pulse — daily briefs, action items, quick answers
            </div>
          </div>
        </div>

        {/* Action Buttons: UI Only (No modal) */}
        <div style={{ display: 'flex', gap: 8, position: 'relative', zIndex: 1 }}>
          <div
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.18)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <Sparkles size={14} />
            <span>Daily Brief</span>
          </div>

          <div
            style={{
              flex: 1,
              padding: '8px 12px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.18)',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
            }}
          >
            <MessageCircle size={14} />
            <span>Ask a question</span>
          </div>
        </div>
      </div>

      {/* 4. Custom Agents Directory */}
      <div
        style={{
          margin: '10px 14px 4px',
          background: '#ffffff',
          border: '1.5px solid #ece2fb',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '0 1px 4px rgba(124, 58, 237, 0.05)',
        }}
      >
        {/* Collapsible Header */}
        <div
          onClick={() => setAgentsFoldOpen(!agentsFoldOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 14px',
            cursor: 'pointer',
          }}
        >
          <span
            style={{
              width: 32,
              height: 32,
              borderRadius: 9,
              background: '#f1ecff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              color: '#7c3aed',
            }}
          >
            <Target size={17} />
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1a1a1a' }}>
              Custom Agents
            </div>
            <div style={{ fontSize: '12.5px', color: '#8e8e93' }}>
              Set up by your manager — already live, tap to open
            </div>
          </div>
          {agentsFoldOpen ? (
            <ChevronUp size={18} color="#8e8e93" />
          ) : (
            <ChevronDown size={18} color="#8e8e93" />
          )}
        </div>

        {/* Directory Content */}
        {agentsFoldOpen && (
          <div style={{ padding: '0 12px 12px' }}>
            {/* ROLE AGENTS (opens chat) */}
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#7c3aed',
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
                padding: '8px 4px 4px',
              }}
            >
              Role Agents (runs as team)
            </div>
            {PULSE_AGENTS_DATA.filter((a) => a.type === 'role').map((agent) => (
              <div
                key={agent.id}
                onClick={() => {
                  if (onNavigate) onNavigate('pulse-channel');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#fafafc',
                  border: '1px solid #ece7fa',
                  borderRadius: 12,
                  padding: '9px 12px',
                  marginBottom: 6,
                  cursor: 'pointer',
                }}
                className="hover:border-purple-300 transition-all"
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #185fa5, #1d4ed8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  #
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>
                    #{agent.name}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#8e8e93' }}>{agent.description}</div>
                </div>
                <ArrowRight size={14} color="#8e8e93" />
              </div>
            ))}

            {/* TASK AGENTS (UI Only, No modal) */}
            <div
              style={{
                fontSize: '11px',
                fontWeight: 800,
                color: '#7c3aed',
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
                padding: '10px 4px 4px',
              }}
            >
              Task Agents (move one metric)
            </div>
            {PULSE_AGENTS_DATA.filter((a) => a.type === 'task').map((agent) => (
              <div
                key={agent.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  background: '#fafafc',
                  border: '1px solid #ece7fa',
                  borderRadius: 12,
                  padding: '9px 12px',
                  marginBottom: 6,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 8,
                    background: 'linear-gradient(135deg, #5b21b6, #7c3aed)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontSize: '13px',
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  #
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>
                    #{agent.name}
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#8e8e93' }}>{agent.description}</div>
                </div>
                {agent.metricValue && (
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 800,
                      color: '#0f6e56',
                      background: '#e1f5ee',
                      padding: '2px 8px',
                      borderRadius: 6,
                    }}
                  >
                    {agent.metricValue}
                  </span>
                )}
                <ArrowRight size={14} color="#8e8e93" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. General Section */}
      <div
        style={{
          padding: '12px 14px 4px',
          fontSize: '11.5px',
          fontWeight: 700,
          color: '#8e8e93',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        General
      </div>
      <div className="slack-ch-row mx-3.5">
        <span className="slack-ch-hash">
          <MessageCircle size={16} color="#25D366" />
        </span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">customer-discussions</span>
          <span className="slack-ch-meta">Relayed via WhatsApp Business</span>
        </div>
        <span className="slack-ch-badge">2</span>
      </div>

      {/* 6. Kudos Hero Card (UI only, no modal) */}
      <div className="kudos-hero-card">
        <div className="kudos-hero-shine" />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 1 }}>
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.3)',
              color: '#ffffff',
            }}
          >
            <Trophy size={20} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: '15.5px', fontWeight: 800, color: '#ffffff' }}>Kudos</span>
              <span
                style={{
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#7c4a00',
                  background: '#ffffff',
                  padding: '2px 8px',
                  borderRadius: 8,
                }}
              >
                3 NEW
              </span>
            </div>
            <div
              style={{
                fontSize: '12.5px',
                color: '#fff3d6',
                marginTop: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              "Great work with Mukunda — closed that objection beautifully!" · Sunita Rao
            </div>
          </div>
          <div style={{ textAlign: 'center', flexShrink: 0 }}>
            <div style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>12</div>
            <div style={{ fontSize: '10.5px', color: '#fff3d6', fontWeight: 700, textTransform: 'uppercase' }}>
              All-time
            </div>
          </div>
        </div>
      </div>

      {/* 7. Channels Section (keeps opening chats) */}
      <div
        style={{
          padding: '12px 14px 4px',
          fontSize: '11.5px',
          fontWeight: 700,
          color: '#8e8e93',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Channels
      </div>

      {/* #callcentre-team (routes to Screen 7) */}
      <div
        className="slack-ch-row mx-3.5"
        onClick={() => {
          if (onNavigate) onNavigate('pulse-channel');
        }}
      >
        <span className="slack-ch-hash">#</span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">callcentre-team</span>
          <span className="slack-ch-meta">Manager: Review call QA scores this week!</span>
        </div>
        <span className="slack-ch-badge">1</span>
      </div>

      <div
        className="slack-ch-row mx-3.5"
        onClick={() => {
          if (onNavigate) onNavigate('pulse-channel');
        }}
      >
        <span className="slack-ch-hash">#</span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">all-stores</span>
          <span className="slack-ch-meta">New Ortho Grid campaign from 1 June!</span>
        </div>
        <span className="slack-ch-time">10:22am</span>
        <span className="slack-ch-badge">4</span>
      </div>

      <div
        className="slack-ch-row mx-3.5"
        onClick={() => {
          if (onNavigate) onNavigate('pulse-channel');
        }}
      >
        <span className="slack-ch-hash">
          <Sparkles size={15} color="#7c3aed" />
        </span>
        <div className="slack-ch-body">
          <span className="slack-ch-name">avani-coaching</span>
          <span className="slack-ch-meta">Your warranty score dropped 12% this week</span>
        </div>
        <span className="slack-ch-time">9:01am</span>
        <span className="slack-ch-badge">1</span>
      </div>

      {/* 8. Direct Messages Section (UI only, no modal) */}
      <div
        style={{
          padding: '14px 14px 4px',
          fontSize: '11.5px',
          fontWeight: 700,
          color: '#8e8e93',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        Direct Messages
      </div>

      {[
        {
          name: 'Sunita Rao',
          badge: 'MGR',
          badgeBg: '#FFD700',
          badgeColor: '#3a2a00',
          msg: '🌟 Great work with Mukunda — keep it up',
          time: '12:40pm',
          avatarBg: '#faeeda',
          avatarColor: '#854f0b',
          initials: 'SR',
        },
        {
          name: 'Priya Krishnan',
          msg: 'Can you cover my shift Friday afternoon?',
          time: '11:15am',
          avatarBg: '#fcebeb',
          avatarColor: '#a32d2d',
          initials: 'PK',
        },
        {
          name: 'Raju Kumar',
          msg: 'Thanks for sending over the quote template!',
          time: 'Yesterday',
          avatarBg: '#e1f5ee',
          avatarColor: '#0f6e56',
          initials: 'RK',
        },
      ].map((dm) => (
        <div
          key={dm.name}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '9px 14px',
            borderRadius: 10,
            margin: '0 10px 2px',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '50%',
              background: dm.avatarBg,
              color: dm.avatarColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '13.5px',
              fontWeight: 800,
              flexShrink: 0,
            }}
          >
            {dm.initials}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '14px', fontWeight: 700, color: '#1a1a1a' }}>{dm.name}</span>
              {dm.badge && (
                <span
                  style={{
                    fontSize: '10.5px',
                    fontWeight: 800,
                    background: dm.badgeBg,
                    color: dm.badgeColor,
                    padding: '1px 5px',
                    borderRadius: 4,
                  }}
                >
                  {dm.badge}
                </span>
              )}
            </div>
            <div style={{ fontSize: '12.5px', color: '#8e8e93', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {dm.msg}
            </div>
          </div>
          <span style={{ fontSize: '12px', color: '#a8a8ad', flexShrink: 0 }}>{dm.time}</span>
        </div>
      ))}
    </div>
  );
};
