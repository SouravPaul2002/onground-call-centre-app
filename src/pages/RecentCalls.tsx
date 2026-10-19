import React, { useState, useEffect, useRef } from 'react';
import { RECENT_CALLS_DATA } from '../mock/data';
import type { RecentCallRecord } from '../types';
import type { CallLogItem } from '../hooks/useCall';

interface RecentCallsProps {
  webrtcLogs?: CallLogItem[];
}
import {
  PhoneIncoming,
  PhoneForwarded,
  PhoneOff,
  ChevronRight,
  X,
  Play,
  Pause,
  Check,
  X as XMark,
  ClipboardCheck,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface SopResult {
  label: string;
  pass: boolean;
  evidence: string;
}

const CALL_SOP_ITEMS = [
  { label: 'Opening & Intent Confirm' },
  { label: 'Needs Discovery' },
  { label: 'Product Pitch' },
  { label: 'EMI / Financing Mention' },
  { label: 'Warranty Mention' },
  { label: 'Closing / Callback Booking' },
];

const SOP_REVIEW_TEMPLATES = [
  [true, true, true, true, false, true], // 83%
  [true, true, false, true, false, false], // 50%
  [true, false, true, false, false, true], // 50%
  [true, true, true, false, true, true], // 83%
];

const SOP_REVIEW_EVIDENCE = [
  [
    '"This is Arvind calling from The Sleep Company, is now an okay time?"',
    '"Can I ask what matters most to you — firmness or price?"',
    '"The GRID layer gives pressure relief exactly where you need it."',
    '"We do have a 6-month no-cost EMI plan if that helps."',
    'No mention of the warranty period anywhere in the call.',
    '"I\'ll send the quote over and follow up Thursday, does that work?"',
  ],
  [
    '"Hi, calling about your enquiry — good time to talk?"',
    '"So tell me, what are you looking for exactly?"',
    'Jumped to price before confirming the customer\'s actual need.',
    '"There\'s an EMI option starting at ₹1,200/month."',
    'No warranty details were shared.',
    'Call ended without confirming a next step or callback time.',
  ],
  [
    '"This is Arvind, is this an alright time to talk?"',
    'Moved straight to pitching without asking what the customer needs.',
    '"This model is our best-seller for back support."',
    'EMI never came up even though the customer asked about total cost.',
    'No warranty mention.',
    '"I\'ll note this down and call you back tomorrow at the same time."',
  ],
  [
    '"Hello, this is Arvind from The Sleep Company."',
    '"What\'s brought this on — any specific concern with sleep or back pain?"',
    '"Given what you described, the Ortho GRID would be the right fit."',
    'Customer asked about payment plans but it wasn\'t addressed on the call.',
    '"It comes with a 10-year warranty, so you\'re covered either way."',
    '"Let\'s lock in delivery for this Friday, I\'ll send the confirmation."',
  ],
];

export const RecentCalls: React.FC<RecentCallsProps> = ({ webrtcLogs = [] }) => {
  const [selectedCallIndex, setSelectedCallIndex] = useState<number | null>(null);

  // Audio player simulation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSeconds, setAudioSeconds] = useState(38);
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);
  const [showFullTranscript, setShowFullTranscript] = useState(false);

  const audioTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Merge real WebRTC call logs with mock historical data
  const mergedCalls: RecentCallRecord[] = [
    ...webrtcLogs.map((log) => ({
      id: log.id,
      callerName: log.callerName,
      phone: log.remotePeerId,
      timestamp: log.startedAt,
      duration: log.durationText,
      durationSeconds: log.durationSeconds,
      type: (log.direction === 'incoming' ? 'incoming' : 'outgoing') as 'incoming' | 'outgoing',
      outcome: log.outcome,
      product: 'In-App WebRTC Call',
      qaScore: log.outcome === 'Completed' ? 92 : 0,
      csatScore: log.outcome === 'Completed' ? 95 : 0,
      sopCompliance: {
        greetingIn10s: log.outcome === 'Completed',
        problemIdentified: log.outcome === 'Completed',
        objectionHandled: log.outcome === 'Completed',
        closingAttempted: log.outcome === 'Completed',
      },
      transcript: [
        {
          speaker: (log.direction === 'outgoing' ? 'Agent' : 'Customer') as 'Agent' | 'Customer',
          text: `Voice channel established with ${log.remotePeerId}`,
          time: '0:01',
        },
        {
          speaker: (log.direction === 'outgoing' ? 'Customer' : 'Agent') as 'Agent' | 'Customer',
          text: `Call completed with outcome: ${log.outcome}`,
          time: log.durationText,
        },
      ],
      coachingNotes: [
        `Local Peer ID: ${log.localPeerId}`,
        `Remote Peer ID: ${log.remotePeerId}`,
        `Outcome: ${log.outcome}`,
        `Duration: ${log.durationText}`,
      ],
    })),
    ...RECENT_CALLS_DATA,
  ];

  const selectedCall: RecentCallRecord | null =
    selectedCallIndex !== null ? mergedCalls[selectedCallIndex] || null : null;

  const totalCallSeconds = selectedCall ? (selectedCall.durationSeconds || 252) : 252;

  // Handle audio simulation playback
  useEffect(() => {
    if (isPlaying) {
      audioTimerRef.current = setInterval(() => {
        setAudioSeconds((prev) => {
          if (prev >= totalCallSeconds) {
            setIsPlaying(false);
            return totalCallSeconds;
          }
          return prev + 1;
        });
      }, 1000 / audioSpeed);
    } else {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    }
    return () => {
      if (audioTimerRef.current) clearInterval(audioTimerRef.current);
    };
  }, [isPlaying, audioSpeed, totalCallSeconds]);

  const handleOpenReview = (idx: number) => {
    setSelectedCallIndex(idx);
    setIsPlaying(false);
    setAudioSeconds(38);
    setShowFullTranscript(false);
  };

  const handleCloseReview = () => {
    setSelectedCallIndex(null);
    setIsPlaying(false);
    if (audioTimerRef.current) clearInterval(audioTimerRef.current);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Generate SOP results based on call index
  const getCallSopResults = (idx: number): SopResult[] => {
    const call = mergedCalls[idx];
    if (call && call.id.startsWith('webrtc-')) {
      const isCompleted = call.outcome === 'Completed';
      return [
        { label: 'WebRTC P2P Handshake', pass: true, evidence: 'Signalling connection established via PeerJS cloud server.' },
        { label: 'Microphone Stream Active', pass: true, evidence: 'Local audio track captured and transmitted.' },
        { label: 'Remote Audio Playback', pass: isCompleted, evidence: isCompleted ? 'Two-way audio verified.' : 'Call ended or disconnected.' },
        { label: 'Call Duration', pass: isCompleted, evidence: `Recorded duration: ${call.duration}.` },
        { label: 'Call Outcome', pass: isCompleted, evidence: `Outcome status: ${call.outcome}.` },
        { label: 'Clean Resource Tear-down', pass: true, evidence: 'Microphone tracks released cleanly upon hangup.' },
      ];
    }

    if (idx === 0) {
      // First call (Mukunda R. - 92% QA score)
      return [
        {
          label: 'Opening & Intent Confirm',
          pass: true,
          evidence: '"Good morning Mukunda! This is Arvind from The Sleep Company, Koramangala."',
        },
        {
          label: 'Needs Discovery',
          pass: true,
          evidence: '"Understood, looking for firm spinal support for parents who test-drove the Ortho GRID."',
        },
        {
          label: 'Product Pitch',
          pass: true,
          evidence: '"The Ortho GRID dynamically adapts to body contours with patented SmartGRID technology."',
        },
        {
          label: 'EMI / Financing Mention',
          pass: true,
          evidence: '"We have 6-month no-cost EMI options starting at ₹1,415 per month."',
        },
        {
          label: 'Warranty Mention',
          pass: true,
          evidence: '"Full 10-year warranty along with our risk-free 100-night sleep trial."',
        },
        {
          label: 'Closing / Callback Booking',
          pass: true,
          evidence: '"Quote dispatched on WhatsApp; order locked for Friday express delivery."',
        },
      ];
    }

    const t = SOP_REVIEW_TEMPLATES[idx % SOP_REVIEW_TEMPLATES.length];
    const ev = SOP_REVIEW_EVIDENCE[idx % SOP_REVIEW_EVIDENCE.length];
    return CALL_SOP_ITEMS.map((item, i) => ({
      label: item.label,
      pass: t[i],
      evidence: ev[i],
    }));
  };

  const results: SopResult[] = selectedCallIndex !== null ? getCallSopResults(selectedCallIndex) : [];
  const passCount = results.filter((r) => r.pass).length;
  const pct = results.length > 0 ? Math.round((100 * passCount) / results.length) : 0;
  const scoreColor = pct >= 80 ? '#0f6e56' : pct >= 50 ? '#c8860a' : '#e24b4a';

  return (
    <div className="w-full max-w-[1180px] mx-auto pb-14">
      {/* 1. Header Banner */}
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

      {/* 2. Section Title & Subtitle */}
      <div style={{ padding: '0 14px 4px' }}>
        <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1a1a1a' }}>Recent calls</div>
        <div style={{ fontSize: '12.5px', color: '#8e8e93', marginTop: 1 }}>
          Tap a call to review it against SOP
        </div>
      </div>

      {/* 3. Recent Calls List */}
      <div style={{ padding: '8px 12px' }}>
        {mergedCalls.map((call, idx) => {
          const isIncoming = call.type === 'incoming';
          const isOutgoing = call.type === 'outgoing';

          const iconConfig = isIncoming
            ? { bg: '#e1f5ee', color: '#0f6e56', icon: <PhoneIncoming size={16} /> }
            : isOutgoing
            ? { bg: '#e8f0fe', color: '#185fa5', icon: <PhoneForwarded size={16} /> }
            : { bg: '#fdecec', color: '#e24b4a', icon: <PhoneOff size={16} /> };

          return (
            <div
              key={call.id}
              onClick={() => handleOpenReview(idx)}
              style={{
                background: '#ffffff',
                border: '1px solid #ece7fa',
                borderRadius: 13,
                marginBottom: 8,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                boxShadow: '0 1px 4px rgba(16, 24, 40, 0.05)',
              }}
              className="hover:border-indigo-300 hover:shadow-md transition-all"
            >
              {/* Direction Circle */}
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: iconConfig.bg,
                  color: iconConfig.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {iconConfig.icon}
              </div>

              {/* Title & Metadata */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 14.5,
                    fontWeight: 700,
                    color: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: 6,
                  }}
                >
                  <span>{call.callerName}</span>
                  {call.outcome && (
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: '#0f6e56',
                        background: '#e1f5ee',
                        padding: '1px 7px',
                        borderRadius: 6,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {call.outcome}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12.5, color: '#8e8e93', marginTop: 1 }}>
                  {call.timestamp} · {call.duration}
                </div>
              </div>

              {/* Chevron Arrow */}
              <ChevronRight size={16} color="#c5c5c5" style={{ flexShrink: 0 }} />
            </div>
          );
        })}
      </div>

      {/* 4. Call SOP Review Modal Sheet */}
      {selectedCallIndex !== null && selectedCall && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.45)',
            backdropFilter: 'blur(3px)',
            zIndex: 450,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) handleCloseReview();
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              padding: '18px 20px 22px',
              width: '100%',
              maxWidth: 540,
              maxHeight: '88vh',
              overflowY: 'auto',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
              position: 'relative',
              animation: 'modalRise 0.2s ease',
            }}
          >
            {/* Sheet Handle */}
            <div
              style={{
                width: 38,
                height: 4,
                background: '#e5e5ea',
                borderRadius: 2,
                margin: '0 auto 14px',
              }}
            />

            {/* Close Button */}
            <button
              onClick={handleCloseReview}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#f2f2f7',
                border: 'none',
                color: '#6b6b74',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title="Close modal"
            >
              <X size={16} />
            </button>

            {/* Modal Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: '#f1ecff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ClipboardCheck size={18} color="#7c3aed" />
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
                  Call with {selectedCall.callerName}
                </div>
                <div style={{ fontSize: 13, color: '#8e8e93' }}>
                  {selectedCall.timestamp} · {selectedCall.duration}
                </div>
              </div>
            </div>

            {/* SOP Adherence Score Banner */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                background: '#faf9f6',
                borderRadius: 12,
                padding: '12px 14px',
                margin: '12px 0',
                border: '1px solid #f0f0f2',
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#6b6b74' }}>
                  SOP adherence on this call
                </div>
                <div
                  style={{
                    height: 6,
                    background: '#eeeeee',
                    borderRadius: 3,
                    marginTop: 6,
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: '100%',
                      background: scoreColor,
                      borderRadius: 3,
                      transition: 'width 0.4s ease',
                    }}
                  />
                </div>
              </div>
              <div style={{ fontSize: 20, fontWeight: 800, color: scoreColor }}>{pct}%</div>
            </div>

            {/* Audio Playback Scrubber Simulation */}
            <div
              style={{
                background: 'linear-gradient(135deg, #181d28, #232936)',
                borderRadius: 14,
                padding: '11px 14px',
                color: '#ffffff',
                marginBottom: 14,
                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Play/Pause Toggle */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: '#0f6e56',
                    border: 'none',
                    color: '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    transition: 'all 0.15s ease',
                  }}
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: 2 }} />}
                </button>

                {/* Progress bar / scrub */}
                <div style={{ flex: 1 }}>
                  <div className="flex justify-between text-[11.5px] text-[#9ca3af] font-mono mb-1">
                    <span>{formatTimer(audioSeconds)}</span>
                    <span>{selectedCall.duration !== '—' ? selectedCall.duration : '04:12'}</span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={totalCallSeconds}
                    value={audioSeconds}
                    onChange={(e) => setAudioSeconds(Number(e.target.value))}
                    style={{
                      width: '100%',
                      accentColor: '#5dcaa5',
                      height: 4,
                      cursor: 'pointer',
                    }}
                  />
                </div>

                {/* Speed Switcher */}
                <button
                  onClick={() => setAudioSpeed((prev) => (prev === 1.0 ? 1.5 : 1.0))}
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: '#9fe1cb',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    borderRadius: 6,
                    padding: '3px 7px',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {audioSpeed}x
                </button>
              </div>
            </div>

            {/* 6 SOP Review Items */}
            <div style={{ marginTop: 6 }}>
              {results.map((r, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 0',
                    borderBottom: '1px solid #f2f2f5',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {r.pass ? (
                      <Check size={16} color="#1d9e75" style={{ flexShrink: 0 }} />
                    ) : (
                      <XMark size={16} color="#e24b4a" style={{ flexShrink: 0 }} />
                    )}
                    <span
                      style={{
                        fontSize: 14,
                        color: '#1a1a1a',
                        fontWeight: r.pass ? 500 : 700,
                      }}
                    >
                      {r.label}
                    </span>
                    {!r.pass && (
                      <span
                        style={{
                          marginLeft: 'auto',
                          fontSize: 11.5,
                          fontWeight: 700,
                          color: '#e24b4a',
                          background: '#fdecec',
                          padding: '2px 6px',
                          borderRadius: 6,
                        }}
                      >
                        Missed
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      fontSize: 12.5,
                      color: r.pass ? '#6b6b74' : '#a3311f',
                      margin: '4px 0 0 24px',
                      lineHeight: 1.45,
                      fontStyle: r.pass ? 'italic' : 'normal',
                    }}
                  >
                    {r.evidence}
                  </div>
                </div>
              ))}
            </div>

            {/* ASM / AI Coach Note Box */}
            <div
              style={{
                marginTop: 14,
                background: '#fffdf7',
                border: '1px solid #f3dfa8',
                borderRadius: 12,
                padding: '11px 13px',
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: '#92400e',
                  textTransform: 'uppercase',
                  letterSpacing: 0.4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                  marginBottom: 4,
                }}
              >
                <Sparkles size={13} color="#b45309" />
                ASM AI Coaching Feedback
              </div>
              <div style={{ fontSize: 13, color: '#3b2304', lineHeight: 1.45 }}>
                {selectedCall.coachingNotes && selectedCall.coachingNotes.length > 0
                  ? selectedCall.coachingNotes[0]
                  : 'Strong customer connection and quick problem discovery. Focus next time on confirming the 100-night trial earlier in the discussion to reduce hesitation.'}
              </div>
            </div>

            {/* Collapsible Dialogue Transcript (if available) */}
            {selectedCall.transcript && selectedCall.transcript.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <button
                  onClick={() => setShowFullTranscript(!showFullTranscript)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: 9,
                    background: '#f9f9fb',
                    border: '1px solid #e5e5ea',
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#4c1d95',
                    cursor: 'pointer',
                  }}
                >
                  <span>Full dialogue transcript ({selectedCall.transcript.length} turns)</span>
                  {showFullTranscript ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>

                {showFullTranscript && (
                  <div
                    style={{
                      marginTop: 8,
                      background: '#12151c',
                      borderRadius: 12,
                      padding: '12px 14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 8,
                      maxHeight: 220,
                      overflowY: 'auto',
                    }}
                  >
                    {selectedCall.transcript.map((line, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: line.speaker === 'Agent' ? '#5dcaa5' : '#c8860a',
                            textTransform: 'uppercase',
                            minWidth: 48,
                            paddingTop: 2,
                          }}
                        >
                          {line.speaker === 'Agent' ? 'Arvind' : 'Cust'}
                        </span>
                        <div
                          style={{
                            fontSize: 13,
                            color: line.speaker === 'Agent' ? '#e1f5ee' : '#ffffff',
                            lineHeight: 1.4,
                            flex: 1,
                          }}
                        >
                          {line.text}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
