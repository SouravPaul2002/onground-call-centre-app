import React, { useState, useEffect, useRef } from 'react';
import { MISSED_CALLS_DATA } from '../mock/data';
import type { MissedCall } from '../types';
import {
  PhoneOff,
  Phone,
  PhoneCall,
  Mic,
  MicOff,
  Pause,
  Play,
  Sparkles,
  Trophy,
  Target,
  CheckCircle2,
  Send,
  Database,
  X,
  PhoneIncoming,
} from 'lucide-react';

export const IncomingCalls: React.FC = () => {
  const [missedCalls, setMissedCalls] = useState<MissedCall[]>(MISSED_CALLS_DATA);

  // Active call state
  const [activeCallCaller, setActiveCallCaller] = useState<MissedCall | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [askAiQuery, setAskAiQuery] = useState('');
  const [askAiResponse, setAskAiResponse] = useState<string | null>(null);

  // Incoming simulated call state
  const [simulatedIncoming, setSimulatedIncoming] = useState<{
    name: string;
    phone: string;
    intentScore: number;
  } | null>(null);

  // Call wrap-up modal state
  const [wrapupOpen, setWrapupOpen] = useState(false);
  const [wrapupCaller, setWrapupCaller] = useState<MissedCall | null>(null);
  const [wrapupDuration, setWrapupDuration] = useState('00:00');
  const [wrapupSummary, setWrapupSummary] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState('Callback Completed');
  const [savedToast, setSavedToast] = useState<string | null>(null);

  // SOP items state during call
  const [sopChecked, setSopChecked] = useState<{ [key: string]: boolean }>({
    opening: true,
    needs: true,
    pitch: true,
    financing: false,
    warranty: false,
    closing: false,
  });

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (activeCallCaller) {
      setCallDuration(0);
      setTranscriptIndex(1);
      timerRef.current = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeCallCaller]);

  const transcriptScript = [
    { speaker: 'agent', text: `Hello ${activeCallCaller?.callerName || 'there'}! This is Arvind returning your call from The Sleep Company. I saw we missed you earlier — how can I help you today?` },
    { speaker: 'customer', text: 'Hi Arvind, thanks for calling back so quickly! I visited your store and wanted to confirm the quotation and delivery schedule.' },
    { speaker: 'agent', text: 'Glad I caught you! We have express delivery ready for you, plus our 6 & 12 month no-cost EMI options.' },
    { speaker: 'customer', text: 'Perfect. Does this include the mattress protector and 100-night trial as well?' },
    { speaker: 'agent', text: 'Yes, 100-night trial included with zero return friction. Let me lock in the order for you now.' },
  ];

  useEffect(() => {
    if (!activeCallCaller) return;
    const transcriptTimer = setInterval(() => {
      setTranscriptIndex((prev) => {
        if (prev < transcriptScript.length) {
          if (prev === 2) setSopChecked((s) => ({ ...s, financing: true }));
          if (prev === 4) setSopChecked((s) => ({ ...s, warranty: true, closing: true }));
          return prev + 1;
        }
        return prev;
      });
    }, 4500);
    return () => clearInterval(transcriptTimer);
  }, [activeCallCaller]);

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleStartCallback = (caller: MissedCall) => {
    setActiveCallCaller(caller);
    setIsMuted(false);
    setIsOnHold(false);
    setAskAiResponse(null);
    setSopChecked({
      opening: true,
      needs: true,
      pitch: true,
      financing: false,
      warranty: false,
      closing: false,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEndCall = () => {
    const finalDur = formatTimer(callDuration);
    const caller = activeCallCaller;
    setActiveCallCaller(null);
    if (caller) {
      setWrapupCaller(caller);
      setWrapupDuration(finalDur);
      setWrapupSummary(
        `Returned missed call from ${caller.callerName}. Discussed purchase requirement and confirmed delivery timeline. Customer appreciated quick callback.`
      );
      setWrapupOpen(true);
    }
  };

  const handleSaveWrapup = () => {
    setWrapupOpen(false);
    if (wrapupCaller) {
      // Remove or mark as resolved
      setMissedCalls((prev) => prev.filter((c) => c.id !== wrapupCaller.id));
      setSavedToast(`Callback with ${wrapupCaller.callerName} resolved & saved to CRM (${selectedOutcome})`);
      setTimeout(() => setSavedToast(null), 4000);
    }
  };

  // Total value calculation
  const totalValueAtStake = missedCalls.reduce((acc, curr) => acc + (curr.expectedValue || 0), 0);

  return (
    <div className="w-full max-w-[1180px] mx-auto pb-14">
      {/* 1. Subheader: Planner (.cc-greeting / .cc-name) */}
      <div
        style={{
          padding: '14px 16px 12px',
          background: 'linear-gradient(135deg, #1a1a2e, #2d2d5f)',
          borderRadius: '0 0 18px 18px',
          marginBottom: 14,
        }}
      >
        <div className="flex items-center justify-between">
          <div>
            <div style={{ fontSize: '15.5px', color: '#a5b4fc' }}>Today's calling plan</div>
            <div style={{ fontSize: '17px', fontWeight: 700, color: '#ffffff' }}>Planner</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSimulatedIncoming({
                  name: 'Ritu S.',
                  phone: '+91 98450 xxxxx',
                  intentScore: 96,
                });
              }}
              style={{
                fontSize: '12px',
                fontWeight: 700,
                color: '#9fe1cb',
                background: 'rgba(29, 158, 117, 0.25)',
                border: '1px solid rgba(93, 202, 165, 0.35)',
                padding: '5px 10px',
                borderRadius: 9,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
              title="Simulate an incoming phone call"
            >
              <PhoneIncoming size={13} />
              <span>Simulate incoming</span>
            </button>

            <div
              style={{
                fontSize: '13.5px',
                fontWeight: 800,
                color: '#ffffff',
                background: 'rgba(255, 255, 255, 0.12)',
                padding: '5px 10px',
                borderRadius: 9,
              }}
            >
              Fri, 9 Oct
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Incoming Call Banner */}
      {simulatedIncoming && !activeCallCaller && (
        <div
          style={{
            background: 'linear-gradient(135deg, #7c2d12, #c2410c)',
            margin: '0 12px 14px',
            borderRadius: 16,
            padding: 16,
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 6px 20px rgba(194, 65, 18, 0.45)',
            animation: 'incomingPulse 1.4s ease-in-out infinite',
          }}
        >
          <div style={{ fontSize: '12.5px', color: '#fed7aa', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
            Incoming call
          </div>
          <div style={{ fontSize: '18px', fontWeight: 800, marginBottom: 2 }}>{simulatedIncoming.name}</div>
          <div style={{ fontSize: '12.5px', color: '#fed7aa', marginBottom: 14 }}>
            🎯 Intent {simulatedIncoming.intentScore} · calling from {simulatedIncoming.phone}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 22 }}>
            <button
              onClick={() => setSimulatedIncoming(null)}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#e24b4a',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Decline"
            >
              <PhoneOff size={20} />
            </button>
            <button
              onClick={() => {
                const caller = MISSED_CALLS_DATA.find((m) => m.callerName === simulatedIncoming.name) || {
                  id: 'sim-1',
                  callerName: simulatedIncoming.name,
                  phone: simulatedIncoming.phone,
                  timeContext: 'Incoming now',
                  statusTag: 'Live inbound caller',
                  expectedValue: 13390,
                };
                setSimulatedIncoming(null);
                handleStartCallback(caller);
              }}
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#1d9e75',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Accept Call"
            >
              <Phone size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Success Notification Toast */}
      {savedToast && (
        <div
          style={{
            margin: '0 14px 12px',
            background: 'linear-gradient(120deg, #0a2a1e, #0f6e56)',
            border: '1px solid #1d9e75',
            borderRadius: 12,
            padding: '10px 14px',
            color: '#ffffff',
            fontSize: '13.5px',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            boxShadow: '0 4px 14px rgba(15, 110, 86, 0.3)',
            animation: 'modalRise 0.2s ease',
          }}
        >
          <CheckCircle2 size={16} color="#5dcaa5" />
          <span>{savedToast}</span>
        </div>
      )}

      {/* 2. ACTIVE CALL VIEW (When callback is in progress) */}
      {activeCallCaller && (
        <div style={{ margin: '0 12px 16px' }}>
          {/* Active Call Control Banner */}
          <div
            style={{
              background: 'linear-gradient(135deg, #0a2e1a, #0f6e56)',
              borderRadius: 16,
              padding: 16,
              color: '#ffffff',
              textAlign: 'center',
              boxShadow: '0 6px 20px rgba(15, 110, 86, 0.4)',
              marginBottom: 12,
            }}
          >
            <div style={{ fontSize: 12.5, color: '#a8dcc4', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>
              Call in progress
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 2 }}>{activeCallCaller.callerName}</div>
            <div style={{ fontSize: 12.5, color: '#c9ede0', marginBottom: 6 }}>{activeCallCaller.phone} · Returning missed call</div>
            <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: 'tabular-nums', marginBottom: 10 }}>
              {formatTimer(callDuration)}
            </div>

            {/* Sentiment Meter */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 12.5, color: '#c9ede0' }}>Sentiment</span>
              <div style={{ width: 70, height: 5, borderRadius: 3, background: 'rgba(255, 255, 255, 0.18)', overflow: 'hidden' }}>
                <div style={{ width: '65%', height: '100%', background: '#5dcaa5', borderRadius: 3 }} />
              </div>
              <span style={{ fontSize: 12.5, fontWeight: 700, color: '#5dcaa5' }}>Positive</span>
            </div>

            {/* In-Call Controls */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
              <button
                onClick={() => setIsMuted(!isMuted)}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: isMuted ? '#e24b4a' : 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <MicOff size={18} /> : <Mic size={18} />}
              </button>

              <button
                onClick={() => setIsOnHold(!isOnHold)}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: isOnHold ? '#c8860a' : 'rgba(255, 255, 255, 0.15)',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.15s ease',
                }}
                title={isOnHold ? 'Resume' : 'Hold'}
              >
                {isOnHold ? <Play size={18} /> : <Pause size={18} />}
              </button>

              <button
                onClick={handleEndCall}
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: '#e24b4a',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 3px 10px rgba(226, 75, 74, 0.45)',
                }}
                title="End Call"
              >
                <PhoneOff size={18} />
              </button>
            </div>
          </div>

          {/* Two-Column Side-by-Side: Live Transcript (Left) + AI Assist (Right) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 12 }}>
            {/* Live Transcript Stream */}
            <div
              style={{
                background: '#12151c',
                borderRadius: 16,
                border: '1px solid #262b38',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 7, borderBottom: '1px solid #262b38' }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5dcaa5', animation: 'blink 1.2s ease-in-out infinite' }} />
                <span style={{ fontSize: 12.5, fontWeight: 800, color: '#e5e5ea', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                  Live transcript
                </span>
              </div>

              <div style={{ padding: '12px 14px', maxHeight: 440, minHeight: 220, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {transcriptScript.slice(0, transcriptIndex).map((line, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: 700,
                        color: line.speaker === 'agent' ? '#5dcaa5' : '#c8860a',
                        textTransform: 'uppercase',
                        minWidth: 54,
                        paddingTop: 3,
                      }}
                    >
                      {line.speaker === 'agent' ? 'Arvind' : 'Cust'}
                    </span>
                    <div
                      style={{
                        fontSize: 14,
                        color: line.speaker === 'agent' ? '#e1f5ee' : '#ffffff',
                        background: line.speaker === 'agent' ? 'rgba(29, 158, 117, 0.2)' : 'rgba(255, 255, 255, 0.08)',
                        borderRadius: 10,
                        padding: '7px 11px',
                        lineHeight: 1.45,
                        flex: 1,
                      }}
                    >
                      {line.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assist Live Side Panel */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: 18,
                border: '1px solid #e5e5ea',
                boxShadow: '0 4px 20px rgba(76, 29, 149, 0.1)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  background: 'linear-gradient(120deg, #4c1d95, #6d28d9 60%, #8b5cf6)',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 9, background: 'rgba(255,255,255,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <Sparkles size={16} />
                </div>
                <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>AI Assist</span>
                <span
                  style={{
                    marginLeft: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontSize: 12.5,
                    color: '#fff',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: 0.4,
                    background: 'rgba(255,255,255,.16)',
                    padding: '4px 9px',
                    borderRadius: 20,
                  }}
                >
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#5dcaa5', animation: 'blink 1.2s ease-in-out infinite' }} />
                  Live
                </span>
              </div>

              {/* Gamify Strip */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '9px 16px',
                  background: 'linear-gradient(120deg, #0a1a14, #0f3d2f 55%, #0f6e56)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <Trophy size={16} color="#FFD700" style={{ flexShrink: 0 }} />
                <div style={{ display: 'flex', gap: 16, flex: 1 }}>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>₹{(activeCallCaller.expectedValue || 15000).toLocaleString()}</span>
                    <span style={{ fontSize: 12, color: '#9fe1cb', fontWeight: 600, marginLeft: 4 }}>recovered</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#FFD700' }}>+7</span>
                    <span style={{ fontSize: 12, color: '#9fe1cb', fontWeight: 600, marginLeft: 4 }}>OG Score™</span>
                  </div>
                </div>
              </div>

              {/* What to Pitch */}
              <div style={{ padding: '12px 16px 6px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: '#a3660a', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Target size={14} />
                  Callback objective
                </div>
                <div style={{ background: '#fffdf7', border: '1px solid #f3dfa8', borderRadius: 10, padding: '8px 10px', fontSize: 13.5, color: '#2b2b2b', lineHeight: 1.4 }}>
                  Acknowledge missed call warmly. Re-anchor product warranty and offer immediate WhatsApp invoice copy.
                </div>
              </div>

              {/* SOP Checklist */}
              <div style={{ padding: '8px 16px 6px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: '#3a3a42', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8 }}>
                  SOP checklist — this call
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                  {[
                    { key: 'opening', label: 'Opening & Intent' },
                    { key: 'needs', label: 'Needs Discovery' },
                    { key: 'pitch', label: 'Product Pitch' },
                    { key: 'financing', label: 'EMI Mention' },
                    { key: 'warranty', label: '100-Night Trial' },
                    { key: 'closing', label: 'Closing Ask' },
                  ].map((sop) => (
                    <button
                      key={sop.key}
                      onClick={() => setSopChecked((prev) => ({ ...prev, [sop.key]: !prev[sop.key] }))}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '6px 8px',
                        borderRadius: 8,
                        fontSize: 12,
                        fontWeight: 600,
                        background: sopChecked[sop.key] ? '#e1f5ee' : '#f9f9fb',
                        color: sopChecked[sop.key] ? '#0f6e56' : '#6b6b74',
                        border: sopChecked[sop.key] ? '1px solid #a7e4cf' : '1px solid #e5e5ea',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <span
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 3,
                          background: sopChecked[sop.key] ? '#0f6e56' : '#d4d4d8',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          fontSize: 10,
                          flexShrink: 0,
                        }}
                      >
                        {sopChecked[sop.key] ? '✓' : ''}
                      </span>
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{sop.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Ask AI Input */}
              <div style={{ padding: '10px 16px 14px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 }}>
                  Ask AI about this lead
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <input
                    type="text"
                    value={askAiQuery}
                    onChange={(e) => setAskAiQuery(e.target.value)}
                    placeholder="e.g. check previous showroom notes"
                    style={{
                      flex: 1,
                      fontSize: 13,
                      color: '#1a1a1a',
                      background: '#faf9f6',
                      border: '1px solid #e4d9fc',
                      borderRadius: 9,
                      padding: '8px 10px',
                      outline: 'none',
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        setAskAiResponse(`Customer visited showroom last week; test-drove Ortho GRID 6-inch model and requested payment plan.`);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setAskAiResponse(`Customer visited showroom last week; test-drove Ortho GRID 6-inch model and requested payment plan.`);
                    }}
                    style={{
                      background: '#6d28d9',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: 9,
                      padding: '0 12px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Send size={14} />
                  </button>
                </div>

                {askAiResponse && (
                  <div style={{ fontSize: 13, color: '#4c1d95', background: '#f7f4ff', border: '1px solid #e4d9fc', borderRadius: 9, padding: '8px 10px' }}>
                    {askAiResponse}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. SECTION TITLE & SUBTITLE */}
      <div style={{ padding: '0 14px 4px' }}>
        <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1a1a1a' }}>Missed calls</div>
        <div style={{ fontSize: '12.5px', color: '#8e8e93', marginTop: 1 }}>
          Ranked by expected value — call the highest-value leads back first
        </div>
      </div>

      {/* 4. SUMMARY KPI STRIP (#planIncomingSummary) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          margin: '8px 14px 10px',
          background: '#faf9f6',
          borderRadius: 12,
          padding: '11px 14px',
          border: '1px solid #f0f0f2',
        }}
      >
        <div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#1a1a1a' }}>{missedCalls.length}</div>
          <div style={{ fontSize: 12, color: '#8e8e93', fontWeight: 700, textTransform: 'uppercase' }}>
            Missed today
          </div>
        </div>

        <div style={{ width: 1, height: 28, background: '#ece7fa' }} />

        <div>
          <div style={{ fontSize: 19, fontWeight: 800, color: '#0f6e56' }}>
            ₹{totalValueAtStake.toLocaleString('en-IN')}
          </div>
          <div style={{ fontSize: 12, color: '#8e8e93', fontWeight: 700, textTransform: 'uppercase' }}>
            Expected value at stake
          </div>
        </div>
      </div>

      {/* 5. MISSED CALLS LIST */}
      <div style={{ padding: '0 12px' }}>
        {missedCalls.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 14px', color: '#a8a8ad', background: '#ffffff', borderRadius: 14, border: '1px solid #ece7fa' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#6b6b74' }}>No missed calls remaining</div>
            <div style={{ fontSize: 13, color: '#8e8e93', marginTop: 2 }}>All inbound enquiries have been addressed</div>
          </div>
        ) : (
          missedCalls.map((call) => {
            const hasExpected = call.expectedValue !== null;
            const valueLabel = hasExpected
              ? `₹${call.expectedValue?.toLocaleString('en-IN')} expected`
              : 'New contact';

            return (
              <div
                key={call.id}
                style={{
                  background: '#ffffff',
                  border: '1px solid #ece7fa',
                  borderRadius: 13,
                  marginBottom: 8,
                  boxShadow: '0 1px 4px rgba(16, 24, 40, 0.05)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                  }}
                >
                  {/* Red Missed Call Icon Circle */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#fdecec',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <PhoneOff size={16} color="#e24b4a" />
                  </div>

                  {/* Caller Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: '#1a1a1a' }}>
                      {call.callerName}
                    </div>
                    <div style={{ fontSize: 12.5, color: '#8e8e93', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {call.timeContext}
                    </div>
                  </div>

                  {/* Value Tag & Call Back Button */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 800, color: hasExpected ? '#0f6e56' : '#8e8e93' }}>
                      {valueLabel}
                    </div>
                    <button
                      onClick={() => handleStartCallback(call)}
                      style={{
                        marginTop: 4,
                        fontSize: 12.5,
                        fontWeight: 700,
                        color: '#ffffff',
                        background: '#0f6e56',
                        border: 'none',
                        borderRadius: 7,
                        padding: '4px 9px',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 4,
                        boxShadow: '0 2px 6px rgba(15, 110, 86, 0.25)',
                      }}
                    >
                      <Phone size={12} />
                      <span>Call back</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 6. CALL WRAP-UP MODAL OVERLAY */}
      {wrapupOpen && wrapupCaller && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8, 10, 14, 0.58)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              width: '100%',
              maxWidth: 480,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.35)',
              position: 'relative',
              animation: 'modalRise 0.2s ease',
            }}
          >
            {/* Close X */}
            <button
              onClick={() => setWrapupOpen(false)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: '#f0f0f0',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#555',
              }}
            >
              <X size={15} />
            </button>

            <div style={{ padding: '20px 22px' }}>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: '50%',
                    background: '#e1f5ee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0f6e56',
                    flexShrink: 0,
                  }}
                >
                  <PhoneCall size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 16.5, fontWeight: 700, color: '#1a1a1a' }}>Callback wrapped up</div>
                  <div style={{ fontSize: 13, color: '#8e8e93' }}>
                    {wrapupCaller.callerName} · Duration: {wrapupDuration}
                  </div>
                </div>
              </div>

              {/* AI Drafted Summary Label */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '14px 0 6px' }}>
                <Sparkles size={14} color="#7c3aed" />
                <span style={{ fontSize: 12.5, fontWeight: 700, color: '#7c3aed', textTransform: 'uppercase', letterSpacing: 0.4 }}>
                  AI-drafted summary — edit if needed
                </span>
              </div>

              {/* Summary Textarea */}
              <textarea
                value={wrapupSummary}
                onChange={(e) => setWrapupSummary(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: 80,
                  border: '1.5px solid #e5e5ea',
                  borderRadius: 12,
                  padding: '10px 11px',
                  fontSize: 13.5,
                  color: '#1a1a1a',
                  lineHeight: 1.5,
                  resize: 'vertical',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />

              {/* Outcome Tag Picker */}
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: 0.4, margin: '14px 0 6px' }}>
                Outcome
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {[
                  'Callback Completed',
                  'Sale Closed',
                  'Demo Scheduled',
                  'Follow-up Needed',
                  'Could Not Connect',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedOutcome(tag)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: 20,
                      fontSize: 12.5,
                      fontWeight: 700,
                      cursor: 'pointer',
                      border: 'none',
                      background: selectedOutcome === tag ? '#0f6e56' : '#f2f2f7',
                      color: selectedOutcome === tag ? '#ffffff' : '#555555',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setWrapupOpen(false)}
                  style={{
                    flex: 1,
                    padding: 12,
                    border: '1.5px solid #1d9e75',
                    borderRadius: 100,
                    fontSize: 14.5,
                    color: '#1d9e75',
                    background: '#ffffff',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Skip
                </button>
                <button
                  onClick={handleSaveWrapup}
                  style={{
                    flex: 2,
                    padding: 12,
                    border: 'none',
                    borderRadius: 100,
                    fontSize: 14.5,
                    color: '#ffffff',
                    background: '#0f6e56',
                    cursor: 'pointer',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(15, 110, 86, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <Database size={15} />
                  <span>Save to CRM</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
