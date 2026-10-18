import React from 'react';
import type { PageId } from '../types';
import {
  LayoutDashboard,
  Phone,
  PhoneForwarded,
  PhoneIncoming,
  RotateCwClock,
  PhoneCall,
  Calendar,
  MessagesSquare,
} from 'lucide-react';

interface SidebarProps {
  currentPage: PageId;
  onSelectPage: (page: PageId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPage, onSelectPage }) => {
  const isPlanActive =
    currentPage === 'calls-to-make' ||
    currentPage === 'incoming' ||
    currentPage === 'recent' ||
    currentPage === 'practise-call';

  return (
    <aside className="app-sidebar">
      {/* Top Brand Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          On-Ground.ai
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        {/* Dashboard */}
        <button
          className={`nav-item ${currentPage === 'dashboard' ? 'active' : ''}`}
          onClick={() => onSelectPage('dashboard')}
        >
          <span className="nav-icon-box">
            <LayoutDashboard size={16} />
          </span>
          <span>Dashboard</span>
        </button>

        {/* Plan Header (Non-collapsible) */}
        <div className={`nav-item nav-item-plan-header ${isPlanActive ? 'active' : ''}`}>
          <div className="nav-item-left">
            <span className="nav-icon-box">
              <Phone size={16} />
            </span>
            <span>Plan</span>
          </div>
        </div>

        {/* Plan Sub-items (Always visible) */}
        <div className="plan-subnav">
          <button
            className={`plan-sub-item ${
              currentPage === 'calls-to-make' ? 'active' : ''
            }`}
            onClick={() => onSelectPage('calls-to-make')}
          >
            <PhoneForwarded size={14} />
            <span>Calls to make</span>
          </button>

          <button
            className={`plan-sub-item ${
              currentPage === 'incoming' ? 'active' : ''
            }`}
            onClick={() => onSelectPage('incoming')}
          >
            <PhoneIncoming size={14} />
            <span>Incoming</span>
          </button>

          <button
            className={`plan-sub-item ${
              currentPage === 'recent' ? 'active' : ''
            }`}
            onClick={() => onSelectPage('recent')}
          >
            <RotateCwClock size={14} />
            <span>Recent</span>
          </button>

          <button
            className={`plan-sub-item ${
              currentPage === 'practise-call' ? 'active' : ''
            }`}
            onClick={() => onSelectPage('practise-call')}
          >
            <PhoneCall size={14} />
            <span>Practise a call</span>
          </button>
        </div>

        {/* Calendar */}
        <button
          className={`nav-item ${currentPage === 'calendar' ? 'active' : ''}`}
          onClick={() => onSelectPage('calendar')}
        >
          <span className="nav-icon-box">
            <Calendar size={16} />
          </span>
          <span>Calendar</span>
        </button>

        {/* Pulse */}
        <button
          className={`nav-item ${
            currentPage === 'pulse' || currentPage === 'pulse-channel' ? 'active' : ''
          }`}
          onClick={() => onSelectPage('pulse')}
        >
          <span className="nav-icon-box">
            <MessagesSquare size={16} />
          </span>
          <span>Pulse</span>
        </button>
      </nav>
    </aside>
  );
};
