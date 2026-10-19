import React, { useState } from 'react';
import {
  AGENT_PROFILE,
  WHO_IS_WAITING,
  CALLS_HANDLED_7DAYS,
  CSAT_TREND_7DAYS,
} from '../mock/data';
import {
  ChevronRight,
  ChevronDown,
  Calendar,
  Headset,
  PhoneCall,
  Users,
  FileText,
  CheckSquare,
} from 'lucide-react';
import type { PageId } from '../types';

interface DashboardProps {
  onNavigate?: (page: PageId) => void;
  onOpenLeadModal?: (leadId?: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onNavigate,
  onOpenLeadModal,
}) => {
  const [timeRange, setTimeRange] = useState('This Week');
  const [currentStatus, setCurrentStatus] = useState(AGENT_PROFILE.status);
  const [dateRangeOpen, setDateRangeOpen] = useState(false);

  const toggleStatus = () => {
    setCurrentStatus((prev) => (prev === 'On Queue' ? 'On Break' : 'On Queue'));
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto pb-10">
      {/* 1. Command Center Hero (.cc-hero) */}
      <div
        style={{
          background:
            'radial-gradient(circle at 15% -10%, #2a3a8f 0%, transparent 45%), linear-gradient(160deg, #0b0f2e 0%, #151b4d 55%, #1e2764 100%)',
          padding: '16px 16px 14px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '-40%',
            right: '-15%',
            width: 220,
            height: 220,
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35), transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />

        {/* Hero Topbar */}
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div style={{ fontSize: '15.5px', color: '#a5b4fc' }}>Good afternoon 👋</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff', marginTop: '2px' }}>
              {AGENT_PROFILE.name}
            </div>
            <div style={{ fontSize: '14px', color: '#8b93d9', marginTop: '1px' }}>
              {AGENT_PROFILE.store} · Call Centre
            </div>
          </div>

          <div className="flex flex-col items-end gap-1.5">
            {/* Status Pill */}
            <button
              onClick={toggleStatus}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: currentStatus === 'On Queue' ? 'rgba(52, 211, 153, 0.15)' : 'rgba(251, 191, 36, 0.15)',
                border: currentStatus === 'On Queue' ? '1px solid rgba(52, 211, 153, 0.35)' : '1px solid rgba(251, 191, 36, 0.35)',
                color: currentStatus === 'On Queue' ? '#6ee7b7' : '#fcd34d',
                fontSize: 14,
                fontWeight: 700,
                padding: '6px 11px',
                borderRadius: 20,
                cursor: 'pointer',
              }}
              title="Click to toggle status"
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: currentStatus === 'On Queue' ? '#34d399' : '#fbbf24',
                  boxShadow: currentStatus === 'On Queue' ? '0 0 6px #34d399' : '0 0 6px #fbbf24',
                  animation: 'blink 1.3s ease-in-out infinite',
                }}
              />
              <span>{currentStatus}</span>
            </button>

            {/* Date filter button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setDateRangeOpen((prev) => !prev)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: 10,
                  padding: '5px 10px',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: 500,
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                <Calendar size={14} color="#9fe1cb" />
                <span>{timeRange}</span>
                <ChevronDown size={14} color="#9fe1cb" />
              </button>

              {dateRangeOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '32px',
                    right: 0,
                    background: '#ffffff',
                    borderRadius: 10,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    padding: '4px 0',
                    zIndex: 50,
                    minWidth: 120,
                  }}
                >
                  {['Today', 'This Week', 'This Month', 'Last 30 Days'].map((range) => (
                    <button
                      key={range}
                      onClick={() => {
                        setTimeRange(range);
                        setDateRangeOpen(false);
                      }}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '6px 12px',
                        fontSize: 13,
                        fontWeight: timeRange === range ? 700 : 500,
                        color: timeRange === range ? '#0f6e56' : '#333333',
                        background: timeRange === range ? 'rgba(93, 202, 165, 0.12)' : 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Row 1 — 4 Top KPI Cards (.cc-kpi-row) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 7,
            marginTop: 14,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Card 1: OG Score™ */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: 13,
              padding: '9px 7px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>76</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#9ca3e8', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              OG Score™
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 12.5,
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: 7,
                marginTop: 5,
                background: 'rgba(52, 211, 153, 0.18)',
                color: '#6ee7b7',
              }}
            >
              ▲13
            </div>
          </div>

          {/* Card 2: Avg Handle Time */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: 13,
              padding: '9px 7px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>4m 12s</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#9ca3e8', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              Avg Handle Time
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 12.5,
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: 7,
                marginTop: 5,
                background: 'rgba(52, 211, 153, 0.18)',
                color: '#6ee7b7',
              }}
            >
              ▼8%
            </div>
          </div>

          {/* Card 3: CSAT Today */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: 13,
              padding: '9px 7px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>94%</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#9ca3e8', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              CSAT Today
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 12.5,
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: 7,
                marginTop: 5,
                background: 'rgba(52, 211, 153, 0.18)',
                color: '#6ee7b7',
              }}
            >
              ▲2pt
            </div>
          </div>

          {/* Card 4: In Queue (Clickable tab jump to calls) */}
          <div
            onClick={() => onNavigate && onNavigate('calls-to-make')}
            style={{
              background: 'rgba(255, 255, 255, 0.07)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.09)',
              borderRadius: 13,
              padding: '9px 7px',
              textAlign: 'center',
              cursor: 'pointer',
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', lineHeight: 1.1 }}>2</div>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: '#9ca3e8', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
              In Queue
            </div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 12.5,
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: 7,
                marginTop: 5,
                background: 'rgba(96, 165, 250, 0.18)',
                color: '#93c5fd',
              }}
            >
              ● live
            </div>
          </div>
        </div>
      </div>

      {/* 2. Row 2: Grid 1fr 1fr (Left: My Progress + Who's Waiting; Right: Earnings + My Tasks) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 12,
          margin: '10px 12px 0',
          alignItems: 'start',
        }}
      >
        {/* Left Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          {/* My Progress · today (.prog-banner) */}
          <div
            style={{
              background: 'linear-gradient(120deg, #0a1a14, #0f3d2f 40%, #0f6e56 75%, #1d9e75 100%)',
              borderRadius: 18,
              padding: '14px 15px',
              color: '#ffffff',
              boxShadow: '0 10px 28px rgba(15, 110, 86, 0.3)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient circle glow */}
            <div
              style={{
                position: 'absolute',
                top: '-40%',
                right: '-10%',
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(93, 202, 165, 0.25), transparent 70%)',
                pointerEvents: 'none',
              }}
            />

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 800,
                color: '#9fe1cb',
                textTransform: 'uppercase',
                letterSpacing: '0.6px',
                marginBottom: 10,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: '#5dcaa5',
                  animation: 'blink 1.1s ease-in-out infinite',
                }}
              />
              <span>My Progress · today</span>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 7,
                position: 'relative',
                zIndex: 1,
              }}
            >
              {/* Metric 1 */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  borderRadius: 12,
                  padding: '8px 6px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.1 }}>3</div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: 12.5,
                    fontWeight: 800,
                    padding: '1px 5px',
                    borderRadius: 7,
                    marginTop: 4,
                    background: 'rgba(251, 191, 36, 0.22)',
                    color: '#fbbf24',
                  }}
                >
                  ▲ +1
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#c9dcd5', marginTop: 4, lineHeight: 1.3 }}>
                  Leads Created
                </div>
              </div>

              {/* Metric 2 */}
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.07)',
                  borderRadius: 12,
                  padding: '8px 6px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 800, lineHeight: 1.1 }}>2</div>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 2,
                    fontSize: 12.5,
                    fontWeight: 800,
                    padding: '1px 5px',
                    borderRadius: 7,
                    marginTop: 4,
                    background: 'rgba(93, 202, 165, 0.22)',
                    color: '#5dcaa5',
                  }}
                >
                  ▲ +2
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: '#c9dcd5', marginTop: 4, lineHeight: 1.3 }}>
                  Leads Called
                </div>
              </div>
            </div>
          </div>

          {/* Who's Waiting Header & List */}
          <div style={{ margin: '4px 2px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '12.5px', fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Who's waiting
            </span>
            <span
              onClick={() => onNavigate && onNavigate('calls-to-make')}
              style={{ fontSize: '12.5px', fontWeight: 700, color: '#0f6e56', cursor: 'pointer' }}
            >
              Open planner →
            </span>
          </div>

          {/* Who's Waiting Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {WHO_IS_WAITING.map((caller) => {
              const isHi = caller.waitLevel === 'hi' || caller.waitTime.includes('1m 20s');
              const levelColor = isHi ? '#e24b4a' : '#c8860a';
              const levelBg = isHi ? '#fdecec' : '#fff3d6';

              return (
                <div
                  key={caller.id}
                  onClick={() => onNavigate && onNavigate('calls-to-make')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    background: '#ffffff',
                    border: '1px solid #ece7fa',
                    borderRadius: 12,
                    padding: '9px 11px',
                    cursor: 'pointer',
                    transition: 'all 0.12s ease',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#f2f2f7',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Headset size={15} color="#6b6b74" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>{caller.name}</div>
                    <div style={{ fontSize: 12.5, color: '#8e8e93' }}>{caller.issue}</div>
                  </div>
                  <span
                    style={{
                      fontSize: 12.5,
                      fontWeight: 800,
                      color: levelColor,
                      background: levelBg,
                      padding: '3px 8px',
                      borderRadius: 8,
                      flexShrink: 0,
                    }}
                  >
                    {caller.waitTime}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
          {/* My Earnings this month (#hcEarn) */}
          <div
            style={{
              background: '#ffffff',
              border: '1px solid #ececef',
              borderRadius: 16,
              padding: '12px 14px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#1a1a1a' }}>💰 My earnings this month</div>
              <div style={{ fontSize: 12.5, color: '#6b7280' }}>₹800 to ₹6,000 slab</div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 4 }}>
              <div style={{ fontSize: 26, fontWeight: 800, color: '#0f6e56', lineHeight: 1.1 }}>₹5,200</div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>₹1,700 from coached moves</div>
            </div>

            <div style={{ height: 7, background: '#eef0f2', borderRadius: 4, overflow: 'hidden', marginTop: 8 }}>
              <div
                style={{
                  width: '87%',
                  height: '100%',
                  background: 'linear-gradient(90deg, #1d9e75, #5dcaa5)',
                  borderRadius: 4,
                }}
              />
            </div>
          </div>

          {/* My Tasks (#hcMyTasks) */}
          <div
            style={{
              background: 'linear-gradient(135deg, #3b2304, #92400e)',
              borderRadius: 16,
              padding: '11px 12px',
              boxShadow: '0 4px 14px rgba(146, 64, 14, 0.25)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <CheckSquare size={17} color="#fcd34d" />
              <div style={{ fontSize: 15, fontWeight: 800, color: '#ffffff' }}>My Tasks</div>
              <span
                style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: 12.5,
                  fontWeight: 800,
                  padding: '1px 8px',
                  borderRadius: 10,
                }}
              >
                2
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {/* Task 1 */}
              <div
                onClick={() => onOpenLeadModal && onOpenLeadModal()}
                style={{
                  background: '#ffffff',
                  borderRadius: 11,
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: '#e0f2fe',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <PhoneCall size={15} color="#0369a1" />
                </div>
                <div style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>2 callbacks</span>{' '}
                  <span style={{ fontSize: 12.5, color: '#8e8e93' }}>next 4:30pm</span>
                </div>
                <ChevronRight size={15} color="#c0c0c0" />
              </div>

              {/* Task 2 */}
              <div
                onClick={() => onOpenLeadModal && onOpenLeadModal()}
                style={{
                  background: '#ffffff',
                  borderRadius: 11,
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 8,
                    background: '#f1ecff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Users size={15} color="#7c3aed" />
                </div>
                <div style={{ flex: 1, minWidth: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a1a' }}>2 hot leads</span>{' '}
                  <span style={{ fontSize: 12.5, color: '#8e8e93' }}>untouched 24h</span>
                </div>
                <ChevronRight size={15} color="#c0c0c0" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GRAPHS — exact mock styling (.dash-chart-card) */}
      <div style={{ margin: '14px 12px 4px', fontSize: 12.5, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        Calls handled · last 7 days
      </div>
      <div
        className="dash-chart-card"
        style={{
          margin: '6px 12px 4px',
          background: '#ffffff',
          border: '1px solid #ece7fa',
          borderRadius: 14,
          padding: '14px 12px 10px',
          boxShadow: '0 1px 4px rgba(16,24,40,.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 }}>
          {CALLS_HANDLED_7DAYS.map((item) => (
            <div
              key={item.day}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '100%',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6b6b74' }}>{item.calls}</span>
              <div
                style={{
                  width: '100%',
                  background: item.isCurrent ? '#0f6e56' : '#5dcaa5',
                  borderRadius: '4px 4px 0 0',
                  minHeight: 4,
                  height: `${Math.round((item.calls / 28) * 100)}%`,
                  transition: 'height 0.4s ease',
                }}
              />
              <span style={{ fontSize: 11, color: '#a8a8ad', fontWeight: 600 }}>{item.day}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: '16px 12px 4px', fontSize: 12.5, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        CSAT trend · last 7 days
      </div>
      <div
        className="dash-chart-card"
        style={{
          margin: '6px 12px 4px',
          background: '#ffffff',
          border: '1px solid #ece7fa',
          borderRadius: 14,
          padding: '14px 12px 10px',
          boxShadow: '0 1px 4px rgba(16,24,40,.05)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 90 }}>
          {CSAT_TREND_7DAYS.map((item) => (
            <div
              key={item.day}
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                height: '100%',
                gap: 4,
              }}
            >
              <span style={{ fontSize: 11, fontWeight: 700, color: '#6b6b74' }}>{item.csat}%</span>
              <div
                style={{
                  width: '100%',
                  background: item.isCurrent ? '#185fa5' : '#8fb3f5',
                  borderRadius: '4px 4px 0 0',
                  minHeight: 4,
                  height: `${Math.round((item.csat / 100) * 100)}%`,
                  transition: 'height 0.4s ease',
                }}
              />
              <span style={{ fontSize: 11, color: '#a8a8ad', fontWeight: 600 }}>{item.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
