import React, { useState } from 'react';
import { CALENDAR_EVENTS } from '../mock/data';
import type { CalendarEvent } from '../types';
import {
  Calendar as CalendarIcon,
  Mail,
  ChevronLeft,
  ChevronRight,
  Users,
  Share2,
} from 'lucide-react';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const Calendar: React.FC = () => {
  // Calendar month state (defaults to October 2026 to match mock data)
  const [viewMonth, setViewMonth] = useState(9); // 0-indexed: 9 = October
  const [viewYear, setViewYear] = useState(2026);

  // Selected day (default to 9 for Today)
  const [selectedDay, setSelectedDay] = useState<number | null>(9);

  // Events state
  const [events] = useState<CalendarEvent[]>(CALENDAR_EVENTS);

  // Navigation handlers
  const handleMonthNav = (delta: number) => {
    let nextMonth = viewMonth + delta;
    let nextYear = viewYear;
    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    } else if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    }
    setViewMonth(nextMonth);
    setViewYear(nextYear);
    setSelectedDay(null);
  };

  const handleJumpToday = () => {
    setViewMonth(9); // October
    setViewYear(2026);
    setSelectedDay(9);
  };

  // Days calculations
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  // Find which days have events in this month
  const monthString = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
  const daysWithEvents = new Set(
    events
      .filter((ev) => ev.date.startsWith(monthString))
      .map((ev) => parseInt(ev.date.split('-')[2], 10))
  );

  // Filter events for the upcoming list
  const filteredEvents = selectedDay !== null
    ? events.filter((ev) => ev.date === `${monthString}-${String(selectedDay).padStart(2, '0')}`)
    : events.filter((ev) => ev.date.startsWith(monthString));


  return (
    <div className="w-full max-w-[1180px] mx-auto pb-14">
      {/* 1. Top Section Header */}
      <div style={{ padding: '14px 14px 0' }}>
        <div
          style={{
            fontSize: '16.5px',
            fontWeight: 800,
            color: '#1a1a1a',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <CalendarIcon size={18} color="#185fa5" />
          <span>Calendar</span>
        </div>
        <div style={{ fontSize: '12.5px', color: '#8e8e93', marginTop: 2 }}>
          Mirrored from your mailbox — invites created here land there too
        </div>
      </div>

      {/* 2. Mailbox Sync Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #e8f0fe, #eef3fd)',
          borderRadius: 14,
          padding: '11px 14px',
          margin: '12px 12px 6px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          border: '1px solid #dbe7fb',
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 9,
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 1px 3px rgba(24, 95, 165, 0.15)',
          }}
        >
          <Mail size={16} color="#185fa5" />
        </div>
        <div style={{ fontSize: '13px', color: '#0c2b52', lineHeight: 1.4 }}>
          Store visits, coaching sessions, and meeting invites all show up here — and in your mailbox.
        </div>
      </div>

      {/* 3. Calendar Grid Card */}
      <div className="cal-card">
        {/* Month Navigation Header */}
        <div
          style={{
            margin: '14px 14px 4px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          <button
            onClick={() => handleMonthNav(-1)}
            style={{
              background: '#f2f2f7',
              border: 'none',
              borderRadius: 10,
              width: 32,
              height: 32,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#555555',
            }}
            title="Previous month"
          >
            <ChevronLeft size={16} />
          </button>

          <div
            style={{
              fontSize: '16.5px',
              fontWeight: 800,
              color: '#1a1a1a',
              letterSpacing: '-0.2px',
              flex: 1,
              textAlign: 'center',
            }}
          >
            {MONTH_NAMES[viewMonth]} {viewYear}
          </div>

          <button
            onClick={handleJumpToday}
            title="Jump to today"
            style={{
              background: '#e8f0fe',
              border: '1px solid #d3e3fc',
              borderRadius: 10,
              padding: '0 12px',
              height: 28,
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 700,
              color: '#185fa5',
              whiteSpace: 'nowrap',
            }}
          >
            Today
          </button>

          <button
            onClick={() => handleMonthNav(1)}
            style={{
              background: '#f2f2f7',
              border: 'none',
              borderRadius: 10,
              width: 32,
              height: 32,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#555555',
            }}
            title="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Weekday Abbreviations (S M T W T F S) */}
        <div className="cal-month-weekdays">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, idx) => (
            <div key={idx} className="cal-weekday-cell">
              {day}
            </div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="cal-month-grid">
          {/* Empty cells before 1st of month */}
          {Array.from({ length: firstDayOfMonth }).map((_, idx) => (
            <div key={`empty-${idx}`} className="cal-day-cell empty" />
          ))}

          {/* Day Numbers */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const isToday = viewMonth === 9 && viewYear === 2026 && dayNum === 9;
            const isSelected = selectedDay === dayNum;
            const hasEvent = daysWithEvents.has(dayNum);

            let cellClass = 'cal-day-cell';
            if (isToday) cellClass += ' today';
            if (isSelected) cellClass += ' selected';

            return (
              <div
                key={dayNum}
                className={cellClass}
                onClick={() => setSelectedDay(selectedDay === dayNum ? null : dayNum)}
              >
                <span>{dayNum}</span>
                {hasEvent && <div className="cal-day-cell-dot" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Upcoming / Selected Day Invites Section */}
      <div
        style={{
          padding: '16px 14px 6px',
          fontSize: '12.5px',
          fontWeight: 700,
          color: '#8e8e93',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span>
          {selectedDay !== null
            ? `Schedule for ${MONTH_NAMES[viewMonth]} ${selectedDay}, ${viewYear}`
            : 'Upcoming Schedule'}
        </span>
        {selectedDay !== null && (
          <button
            onClick={() => setSelectedDay(null)}
            style={{
              fontSize: '12px',
              color: '#185fa5',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            View all month
          </button>
        )}
      </div>

      {/* Invites List Body */}
      <div style={{ paddingBottom: '24px' }}>
        {filteredEvents.length === 0 ? (
          <div
            style={{
              margin: '0 12px 8px',
              padding: '24px 14px',
              textAlign: 'center',
              background: '#fafbfc',
              border: '1px dashed #e5e5ea',
              borderRadius: 14,
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 6 }}>📅</div>
            <div style={{ fontSize: '14px', color: '#6b6b74', fontWeight: 700 }}>
              No invites on this day
            </div>
            <div style={{ fontSize: '12.5px', color: '#8e8e93', marginTop: 2 }}>
              Select another date or view all upcoming events
            </div>
          </div>
        ) : (
          filteredEvents.map((ev) => (
            <div key={ev.id} className="cal-invite-item">
              {/* Time Column */}
              <div className="cal-invite-time-col">
                <div className="cal-invite-time">{ev.time.replace(' - ', '\n')}</div>
              </div>

              {/* Body */}
              <div className="cal-invite-body">
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="cal-invite-title">{ev.title}</div>
                    <div className="cal-invite-meta">
                      <Users size={13} color="#8e8e93" />
                      <span>{ev.attendees}</span>
                    </div>

                    {/* Shared Chips */}
                    {ev.sharedWith && ev.sharedWith.length > 0 && (
                      <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 6 }}>
                        {ev.sharedWith.map((recipient, rIdx) => (
                          <span
                            key={rIdx}
                            style={{
                              fontSize: '11.5px',
                              fontWeight: 700,
                              color: '#0f6e56',
                              background: '#e1f5ee',
                              padding: '2px 7px',
                              borderRadius: 6,
                            }}
                          >
                            Shared with {recipient}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Share Action Icon (Static UI only) */}
                  <div
                    title="Share invite"
                    style={{
                      flexShrink: 0,
                      background: '#f1ecff',
                      border: 'none',
                      borderRadius: 8,
                      width: 28,
                      height: 28,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#7c3aed',
                    }}
                  >
                    <Share2 size={14} />
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
