import React, { useState, useEffect, useRef } from 'react';
import { PLAN_OUTGOING_LEADS } from '../mock/data';
import type { PlanOutgoingLead } from '../types';
import { formatDuration } from '../utils/formatters';
import {
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Pause,
  Play,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Trophy,
  Target,
  CheckCircle2,
  Send,
  Database,
  X,
} from 'lucide-react';

interface CallsToMakeProps {
  onStartWebRtcCall?: (remotePeerId: string, lead: { name: string; phone: string }) => void;
}

export const CallsToMake: React.FC<CallsToMakeProps> = ({ onStartWebRtcCall }) => {
  // WebRTC call prompt state
  const [webrtcPromptLead, setWebrtcPromptLead] = useState<PlanOutgoingLead | null>(null);
  const [targetPeerId, setTargetPeerId] = useState('');

  // Pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 2;
  const totalPages = Math.ceil(PLAN_OUTGOING_LEADS.length / itemsPerPage);

  // Expandable row index
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Active call state
  const [activeCallLead, setActiveCallLead] = useState<PlanOutgoingLead | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isOnHold, setIsOnHold] = useState(false);
  const [transcriptIndex, setTranscriptIndex] = useState(0);
  const [askAiQuery, setAskAiQuery] = useState('');
  const [askAiResponse, setAskAiResponse] = useState<string | null>(null);

  // Call wrap-up modal state
  const [wrapupOpen, setWrapupOpen] = useState(false);
  const [wrapupLead, setWrapupLead] = useState<PlanOutgoingLead | null>(null);
  const [wrapupDuration, setWrapupDuration] = useState('00:00');
  const [wrapupSummary, setWrapupSummary] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState('Sale Closed');
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

  // Call timer interval
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (activeCallLead) {
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
  }, [activeCallLead]);

  // Dialogue lines for transcript streaming simulation
  const transcriptScript = [
    { speaker: 'agent', text: `Namaste! This is Arvind from The Sleep Company, calling regarding your interest in the ${activeCallLead?.product || 'Mattress'}. Is now an okay time to speak?` },
    { speaker: 'customer', text: 'Yes, hi Arvind! I was actually checking how soon it could be delivered and if there is zero-cost EMI available.' },
    { speaker: 'agent', text: 'Absolutely! We offer 48-hour express delivery in Bengaluru, along with our 12-month zero-interest financing plan.' },
    { speaker: 'customer', text: 'That sounds great. And does it come with the 100-night trial as well?' },
    { speaker: 'agent', text: 'Yes, full 100-night trial with zero return fees plus a 10-year warranty. Should I reserve the order for you now?' },
  ];

  // Auto-stream transcript bubbles every 4 seconds during active call
  useEffect(() => {
    if (!activeCallLead) return;
    const transcriptTimer = setInterval(() => {
      setTranscriptIndex((prev) => {
        if (prev < transcriptScript.length) {
          // Check off related SOP item
          if (prev === 2) setSopChecked((s) => ({ ...s, financing: true }));
          if (prev === 4) setSopChecked((s) => ({ ...s, warranty: true, closing: true }));
          return prev + 1;
        }
        return prev;
      });
    }, 4500);
    return () => clearInterval(transcriptTimer);
  }, [activeCallLead]);

  const formatTimer = formatDuration;

  const handleStartCall = (lead: PlanOutgoingLead) => {
    setActiveCallLead(lead);
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
    // Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEndCall = () => {
    const finalDur = formatTimer(callDuration);
    const lead = activeCallLead;
    setActiveCallLead(null);
    if (lead) {
      setWrapupLead(lead);
      setWrapupDuration(finalDur);
      setWrapupSummary(
        `Spoke with ${lead.name} regarding ${lead.product}. Customer inquired about delivery timelines and confirmed preference for 12-month zero-interest EMI. Proactively highlighted 100-night risk-free trial and recommended bundling ${lead.crossSell}.`
      );
      setWrapupOpen(true);
    }
  };

  const handleSaveWrapup = () => {
    setWrapupOpen(false);
    setSavedToast(`Call with ${wrapupLead?.name} saved to CRM (${selectedOutcome})`);
    setTimeout(() => setSavedToast(null), 4000);
  };

  const currentLeads = PLAN_OUTGOING_LEADS.slice(
    currentPage * itemsPerPage,
    currentPage * itemsPerPage + itemsPerPage
  );

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
          <div>
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
              Today
            </div>
          </div>
        </div>
      </div>

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

      {/* 2. ACTIVE CALL VIEW (When call is placed) */}
      {activeCallLead && (
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
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 2 }}>{activeCallLead.name}</div>
            <div style={{ fontSize: 12.5, color: '#c9ede0', marginBottom: 6 }}>{activeCallLead.phone} · {activeCallLead.product}</div>
            <div style={{ fontSize: 24, fontWeight: 800, fontVariantNumeric: 'tabular-nums', marginBottom: 10 }}>
              {formatTimer(callDuration)}
            </div>

            {/* Sentiment Meter */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 14 }}>
              <span style={{ fontSize: 12.5, color: '#c9ede0' }}>Sentiment</span>
              <div style={{ width: 70, height: 5, borderRadius: 3, background: 'rgba(255, 255, 255, 0.18)', overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', background: '#5dcaa5', borderRadius: 3 }} />
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
              {/* Header */}
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
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>₹{activeCallLead.expectedValue.toLocaleString()}</span>
                    <span style={{ fontSize: 12, color: '#9fe1cb', fontWeight: 600, marginLeft: 4 }}>unlock</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#FFD700' }}>+8</span>
                    <span style={{ fontSize: 12, color: '#9fe1cb', fontWeight: 600, marginLeft: 4 }}>OG Score™</span>
                  </div>
                  <div>
                    <span style={{ fontSize: 15, fontWeight: 800, color: '#fff' }}>#1</span>
                    <span style={{ fontSize: 12, color: '#9fe1cb', fontWeight: 600, marginLeft: 4 }}>if closed</span>
                  </div>
                </div>
              </div>

              {/* What to Sell Objective */}
              <div style={{ padding: '12px 16px 6px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: '#a3660a', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6, display: 'flex', alignItems: 'center', gap: 5 }}>
                  <Target size={14} />
                  Main objective — what to offer
                </div>
                <div style={{ background: '#fffdf7', border: '1px solid #f3dfa8', borderRadius: 10, padding: '8px 10px', fontSize: 13.5, color: '#2b2b2b', lineHeight: 1.4 }}>
                  Lead with <b>{activeCallLead.product}</b>. Pitch bundle with <b>{activeCallLead.crossSell}</b> and mention zero-cost EMI early.
                </div>
              </div>

              {/* SOP Checklist */}
              <div style={{ padding: '8px 16px 6px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 800, color: '#3a3a42', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 5 }}>
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

              {/* Ask AI Input & Quick Suggestions */}
              <div style={{ padding: '10px 16px 14px' }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#6d28d9', textTransform: 'uppercase', letterSpacing: 0.4, marginBottom: 6 }}>
                  Ask AI about this call
                </div>
                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
                  <input
                    type="text"
                    value={askAiQuery}
                    onChange={(e) => setAskAiQuery(e.target.value)}
                    placeholder="e.g. what's return policy? delivery timeline?"
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
                        setAskAiResponse(`AI Answer: 100-night sleep trial with 10-year comprehensive warranty. Free delivery in Bengaluru within 48h.`);
                      }
                    }}
                  />
                  <button
                    onClick={() => {
                      setAskAiResponse(`AI Answer: 100-night sleep trial with 10-year comprehensive warranty. Free delivery in Bengaluru within 48h.`);
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
                  <div
                    style={{
                      fontSize: 13,
                      color: '#4c1d95',
                      lineHeight: 1.45,
                      background: '#f7f4ff',
                      border: '1px solid #e4d9fc',
                      borderRadius: 9,
                      padding: '8px 10px',
                      marginBottom: 8,
                    }}
                  >
                    {askAiResponse}
                  </div>
                )}

                {/* Quick replies */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Check 0% EMI', 'Check 100-night trial', 'Bundle discount'].map((pill) => (
                    <button
                      key={pill}
                      onClick={() => {
                        setAskAiQuery(pill);
                        setAskAiResponse(`AI Answer for "${pill}": Available across all major credit cards. 6 & 12 month no-cost tenures active.`);
                      }}
                      style={{
                        padding: '4px 8px',
                        background: '#f2f2f7',
                        border: '1px solid #e5e5ea',
                        borderRadius: 14,
                        fontSize: 11.5,
                        color: '#4b4b52',
                        cursor: 'pointer',
                        fontWeight: 600,
                      }}
                    >
                      {pill}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. PLANNED OUTGOING CALLS LIST & DETAILS */}
      <div style={{ padding: '0 14px 4px' }}>
        <div style={{ fontSize: '14.5px', fontWeight: 800, color: '#1a1a1a' }}>Planned outgoing calls</div>
        <div style={{ fontSize: '12.5px', color: '#8e8e93', marginTop: 1 }}>
          Ranked by lead attractiveness score — tap a lead for the full picture
        </div>
      </div>

      <div style={{ padding: '8px 12px' }}>
        {currentLeads.map((lead) => {
          const isExpanded = expandedId === lead.id;
          const scoreColor =
            lead.attractivenessScore >= 80 ? '#0f6e56' : lead.attractivenessScore >= 55 ? '#c8860a' : '#e24b4a';
          const storySummary = lead.journey.map((j) => j.text).join(' → ');

          return (
            <div
              key={lead.id}
              style={{
                background: '#ffffff',
                border: '1px solid #ece7fa',
                borderRadius: 13,
                marginBottom: 8,
                overflow: 'hidden',
                boxShadow: '0 1px 4px rgba(16, 24, 40, 0.05)',
              }}
            >
              {/* Row Header */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : lead.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 12px',
                  cursor: 'pointer',
                }}
              >
                {/* Avatar Initial Circle */}
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: lead.avatarBg,
                    color: lead.avatarColor,
                    fontSize: 14.5,
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {lead.initials}
                </div>

                {/* Name & Interest */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 700, color: '#1a1a1a' }}>{lead.name}</div>
                  <div style={{ fontSize: 12.5, color: '#8e8e93', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {lead.interest}
                  </div>
                </div>

                {/* Score badge */}
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontSize: 14.5, fontWeight: 800, color: scoreColor }}>
                    {lead.attractivenessScore}
                  </div>
                  <div style={{ fontSize: 11, color: '#a8a8ad', textTransform: 'uppercase' }}>score</div>
                </div>

                {/* Chevron */}
                <div style={{ color: '#c5c5c5', marginLeft: 4, flexShrink: 0 }}>
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </div>

              {/* Expandable Detail Drawer */}
              {isExpanded && (
                <div style={{ padding: '0 13px 14px', borderTop: '1px solid #f2eef9' }}>
                  {/* Story so far */}
                  <div style={{ fontSize: 12.5, fontWeight: 800, color: '#8e8e93', textTransform: 'uppercase', letterSpacing: 0.4, margin: '10px 0 4px' }}>
                    Story so far
                  </div>
                  <div style={{ fontSize: 13.5, color: '#3a3a42', lineHeight: 1.5 }}>
                    {storySummary || 'No prior journey logged yet.'}
                  </div>

                  {/* 2-Column Product / Cross-sell Grid */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 10 }}>
                    <div style={{ background: '#f7f7f9', borderRadius: 9, padding: '8px 10px' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#8e8e93', textTransform: 'uppercase' }}>
                        Preferred product
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginTop: 2 }}>
                        {lead.product}
                      </div>
                    </div>
                    <div style={{ background: '#f7f7f9', borderRadius: 9, padding: '8px 10px' }}>
                      <div style={{ fontSize: 11, fontWeight: 800, color: '#8e8e93', textTransform: 'uppercase' }}>
                        Cross-sell
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a', marginTop: 2 }}>
                        {lead.crossSell}
                      </div>
                    </div>
                  </div>

                  {/* EMI / Financing Note */}
                  <div style={{ background: '#fff8e1', border: '1px solid #f5cf94', borderRadius: 9, padding: '8px 10px', marginTop: 8 }}>
                    <div style={{ fontSize: 11, fontWeight: 800, color: '#a16207', textTransform: 'uppercase' }}>
                      EMI / financing
                    </div>
                    <div style={{ fontSize: 13, color: '#7c4a00', marginTop: 2 }}>{lead.emi}</div>
                  </div>

                  {/* Place Call Action Button */}
                  <button
                    onClick={() => {
                      if (onStartWebRtcCall) {
                        setWebrtcPromptLead(lead);
                        setTargetPeerId('');
                      } else {
                        handleStartCall(lead);
                      }
                    }}
                    style={{
                      width: '100%',
                      marginTop: 12,
                      padding: 11,
                      border: 'none',
                      borderRadius: 10,
                      fontSize: 14.5,
                      fontWeight: 700,
                      color: '#ffffff',
                      background: '#0f6e56',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 6,
                      boxShadow: '0 2px 8px rgba(15, 110, 86, 0.3)',
                    }}
                  >
                    <Phone size={15} />
                    <span>In-app Call</span>
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Pagination Dock */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, padding: '10px 12px 4px' }}>
        <button
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: '1px solid #e5e5ea',
            background: '#ffffff',
            cursor: currentPage === 0 ? 'default' : 'pointer',
            opacity: currentPage === 0 ? 0.4 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronLeft size={15} color="#555" />
        </button>

        <span style={{ fontSize: 12.5, fontWeight: 700, color: '#6b6b74' }}>
          Page {currentPage + 1} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={currentPage >= totalPages - 1}
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            border: '1px solid #e5e5ea',
            background: '#ffffff',
            cursor: currentPage >= totalPages - 1 ? 'default' : 'pointer',
            opacity: currentPage >= totalPages - 1 ? 0.4 : 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ChevronRight size={15} color="#555" />
        </button>
      </div>

      {/* 5. CALL WRAP-UP MODAL OVERLAY */}
      {wrapupOpen && wrapupLead && (
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
                  <div style={{ fontSize: 16.5, fontWeight: 700, color: '#1a1a1a' }}>Call wrapped up</div>
                  <div style={{ fontSize: 13, color: '#8e8e93' }}>
                    {wrapupLead.name} · Duration: {wrapupDuration}
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
                Call Outcome
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                {[
                  'Sale Closed',
                  'Callback Booked',
                  'Follow-up Needed',
                  'Price Objection',
                  'Lost / No Intent',
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

      {/* WebRTC Call Option Prompt Modal */}
      {webrtcPromptLead && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(3px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 16,
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setWebrtcPromptLead(null);
          }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              padding: '20px 22px',
              maxWidth: 440,
              width: '100%',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              position: 'relative',
              animation: 'modalRise 0.2s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: '#e1f5ee',
                    color: '#0f6e56',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PhoneCall size={18} />
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: '#1a1a1a' }}>
                    Call {webrtcPromptLead.name}
                  </div>
                  <div style={{ fontSize: 12, color: '#8e8e93' }}>
                    {webrtcPromptLead.phone} · {webrtcPromptLead.product}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setWebrtcPromptLead(null)}
                style={{
                  background: '#f2f2f7',
                  border: 'none',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#6b6b74',
                  cursor: 'pointer',
                }}
              >
                <X size={15} />
              </button>
            </div>

            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: 12,
                padding: '12px 14px',
                fontSize: 12.5,
                color: '#475569',
                lineHeight: 1.45,
                marginBottom: 14,
              }}
            >
              💡 <b>In-App WebRTC Calling:</b> Direct browser-to-browser audio requires the customer's Peer ID. (Ordinary cellular phone calls require an external telephony gateway).
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                Customer's Peer ID:
              </label>
              <input
                type="text"
                value={targetPeerId}
                onChange={(e) => setTargetPeerId(e.target.value)}
                placeholder="Paste Peer ID from second browser..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: 10,
                  border: '1.5px solid #d1d5db',
                  fontSize: 13.5,
                  fontFamily: 'monospace',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <button
                onClick={() => {
                  if (onStartWebRtcCall && targetPeerId.trim()) {
                    onStartWebRtcCall(targetPeerId.trim(), {
                      name: webrtcPromptLead.name,
                      phone: webrtcPromptLead.phone,
                    });
                    setWebrtcPromptLead(null);
                  }
                }}
                disabled={!targetPeerId.trim()}
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: 10,
                  border: 'none',
                  background: targetPeerId.trim() ? '#0f6e56' : '#9ca3af',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: targetPeerId.trim() ? 'pointer' : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Phone size={16} />
                <span>Start Real WebRTC Call</span>
              </button>

              <button
                onClick={() => {
                  const l = webrtcPromptLead;
                  setWebrtcPromptLead(null);
                  handleStartCall(l);
                }}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: 10,
                  border: '1px solid #e5e5ea',
                  background: '#fafafa',
                  color: '#374151',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                }}
              >
                <Sparkles size={15} color="#7c3aed" />
                <span>Simulate SOP Practice Call</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
