import React, { useState } from 'react';
import { Bell, Check, UserCheck, Settings, LogOut } from 'lucide-react';

interface TopbarProps {
  score?: number;
  rank?: string;
  initials?: string;
  onOpenNotifications?: () => void;
  onOpenScoreDetail?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  score = 76,
  rank = '#3',
  initials = 'AR',
  onOpenNotifications,
  onOpenScoreDetail,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [agentStatus, setAgentStatus] = useState<'On Queue' | 'On Break' | 'Offline'>('On Queue');

  return (
    <header className="app-topbar">
      {/* Brand left */}
      <div className="topbar-left">
        <div className="brand-logo-chip">OG</div>
        <span className="brand-title-text">On-Ground.ai</span>
      </div>

      {/* Actions right */}
      <div className="topbar-right">
        {/* Notification Bell */}
        <div
          className="notif-bell-btn"
          onClick={onOpenNotifications}
          title="Notifications"
          role="button"
          tabIndex={0}
        >
          <Bell size={17} color="#ffffff" strokeWidth={2.5} />
          <span className="notif-dot-badge" />
        </div>

        {/* Global persistent rank pills (gold OG Score ring + rank) */}
        <div className="grank-pill" onClick={onOpenScoreDetail} style={{ cursor: 'pointer' }}>
          <div className="og-ring-mini" title="OG Score™ — overall selling performance">
            <div className="og-ring-mini-inner">
              <span className="og-ring-mini-val">{score}</span>
            </div>
          </div>
          <span style={{ fontSize: 12, letterSpacing: '0.2px' }}>⭐{rank}</span>
        </div>

        {/* Avatar badge with animated conic ring */}
        <div
          className="ar-badge-wrapper"
          onClick={() => setDropdownOpen((prev) => !prev)}
          title="Account & Status"
          role="button"
          tabIndex={0}
        >
          <div className="ar-badge-conic-ring" />
          <div className="ar-badge-inner-core">
            <span className="ar-badge-emoji">🦸‍♂️</span>
            <span className="ar-badge-initials">{initials}</span>
          </div>
        </div>

        {/* Hamburger */}
        <button
          className="topbar-hamburger"
          onClick={() => setDropdownOpen((prev) => !prev)}
          title="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="user-dropdown">
            <div className="dd-header">
              <div className="dd-av">🦸‍♂️</div>
              <div>
                <div className="dd-name">Arvind Rajan</div>
                <div className="dd-store">Koramangala · The Sleep Company</div>
              </div>
            </div>

            <button className="dd-item" onClick={() => setDropdownOpen(false)}>
              <UserCheck size={16} color="#555" />
              <span>Avatar</span>
            </button>
            <button className="dd-item" onClick={() => setDropdownOpen(false)}>
              <Settings size={16} color="#555" />
              <span>Settings</span>
            </button>
            <button className="dd-item danger" onClick={() => setDropdownOpen(false)}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
