import React, { useState } from 'react';
import { MOCK_LEADS } from '../mock/data';
import type { Lead } from '../types';
import {
  Users,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  X,
  FileText,
  Shield,
  IndianRupee,
  PhoneCall,
  Check,
  Building2,
  Sparkles,
  MessageCircle,
  PhoneOutgoing,
  Package,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

interface LeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialIndex?: number;
  onStartCall?: (leadName: string, phone: string) => void;
}

// Pre-call SOP Pitch data for retail leads
const LEAD_SOP_PITCH_DATA: Record<
  string,
  {
    productName: string;
    price: string;
    origPrice: string;
    why: string;
    pitch: string;
    crossName: string;
    crossLine: string;
    emiPlan: string;
    emiLine: string;
    items: { title: string; sub: string; hit: boolean }[];
  }
> = {
  'lead-1': {
    productName: 'Smart Ortho GRID Mattress',
    price: '₹8,490',
    origPrice: '₹14,490',
    why: "Highest-intent product in this thread and he's price-sensitive — lead with GRID technology and value, not the luxury range.",
    pitch:
      '"Since back support and budget both matter here, the Ortho GRID is built exactly for that — GRID tech for spinal alignment, and it\'s ₹6,000 lighter on the wallet than the Hybrid, with the same 10-year warranty and 100-night trial."',
    crossName: 'Smart Pillow · ₹1,499',
    crossLine:
      '"Pair it with our Smart Pillow — it aligns the neck the same way the GRID aligns the spine. Most Ortho GRID buyers add it at checkout."',
    emiPlan: '12-month zero-interest EMI (₹708/mo)',
    emiLine:
      '"That\'s just ₹708 a month, zero interest — lock today\'s price before the offer ends."',
    items: [
      { title: 'Quotation Demanded', sub: 'Asked for pricing / EMI breakdown on Ortho GRID', hit: true },
      { title: 'Financing Related', sub: 'Price-sensitive, compared with competitor — lead with 12m zero-interest', hit: true },
      { title: 'Product Related', sub: 'No open questions on firmness or fit', hit: false },
      { title: 'Warranty Related', sub: 'Mention 100-night trial proactively — reduces risk', hit: true },
      { title: 'In-Store Experience', sub: "Hasn't asked to visit a store yet", hit: false },
    ],
  },
  'lead-2': {
    productName: 'SmartGRID Hybrid Mattress',
    price: '₹24,990',
    origPrice: '₹34,990',
    why: "Already warm on the Hybrid from the last call — she needs confidence on financing, not a fresh pitch.",
    pitch:
      '"You were right to like the Hybrid — it\'s our best-rated for firmness plus pressure relief, with the 10-year warranty and 100-night trial."',
    crossName: 'Mattress Protector · ₹1,999',
    crossLine:
      '"I\'d also add the Mattress Protector — it keeps the warranty valid and protects the investment from day one."',
    emiPlan: '24-month zero-interest EMI (₹1,041/mo)',
    emiLine:
      '"On 24-month EMI that\'s ₹1,041 a month — I can start it from next month so today\'s price is locked in."',
    items: [
      { title: 'Quotation Demanded', sub: 'No open pricing question right now', hit: false },
      { title: 'Financing Related', sub: 'Budget concern flagged early in conversation', hit: true },
      { title: 'Product Related', sub: 'Undecided between Hybrid and firmer option — confirm fit', hit: true },
      { title: 'Warranty Related', sub: 'No open question', hit: false },
      { title: 'In-Store Experience', sub: 'SLA already missed — open with apology, not pitch', hit: true },
    ],
  },
};

export const LeadsModal: React.FC<LeadsModalProps> = ({
  isOpen,
  onClose,
  initialIndex = 0,
  onStartCall,
}) => {
  const [currentIdx, setCurrentIdx] = useState(initialIndex);

  // Collapsible sections state
  const [icpBreakdownOpen, setIcpBreakdownOpen] = useState(false);
  const [howWeGotHereOpen, setHowWeGotHereOpen] = useState(false);
  const [signalsOpen, setSignalsOpen] = useState(true);

  // Interactive quote toggle state
  const [quoteToggles, setQuoteToggles] = useState<{ [id: string]: boolean }>({
    'lead-1': true,
    'lead-2': false,
    'lead-3': true,
    'lead-4': true,
    'lead-5': false,
  });

  // Action feedback toast
  const [actionToast, setActionToast] = useState<string | null>(null);

  // Pre-call Lead SOP checklist modal state
  const [showSopChecklist, setShowSopChecklist] = useState(false);

  // "No Interest" reason sheet state
  const [showNoInterestSheet, setShowNoInterestSheet] = useState(false);
  const [noInterestReason, setNoInterestReason] = useState('Price too high');

  if (!isOpen) return null;

  const lead: Lead = MOCK_LEADS[currentIdx] || MOCK_LEADS[0];
  const isQuoteOn = quoteToggles[lead.id] !== undefined ? quoteToggles[lead.id] : !!lead.quoteOn;

  const handleToggleQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQuoteToggles((prev) => ({
      ...prev,
      [lead.id]: !isQuoteOn,
    }));
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleNext = () => {
    if (currentIdx < MOCK_LEADS.length - 1) setCurrentIdx(currentIdx + 1);
  };

  const triggerToast = (msg: string) => {
    setActionToast(msg);
    setTimeout(() => setActionToast(null), 3000);
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('Financing')) return <IndianRupee size={14} color="#c8860a" />;
    if (category.includes('Warranty')) return <Shield size={14} color="#c8860a" />;
    if (category.includes('Quotation')) return <FileText size={14} color="#c8860a" />;
    if (category.includes('Experience') || category.includes('Store'))
      return <Building2 size={14} color="#c8860a" />;
    if (category.includes('Product')) return <Package size={14} color="#c8860a" />;
    return <Sparkles size={14} color="#c8860a" />;
  };

  // Status badge styling
  const statusLabel = lead.statusLabel || lead.status;
  const statusColor = lead.statusColor || (lead.status === 'OPEN' ? '#1d9e75' : '#c8860a');
  const badgeText = lead.badge || `${lead.slaHoursLeft}h left`;
  const badgeBg = lead.badgeBg || (lead.status === 'OPEN' ? '#e1f5ee' : '#fff8e1');
  const badgeColor = lead.badgeColor || (lead.status === 'OPEN' ? '#0f6e56' : '#c8860a');

  // ICP progress color
  const icpPct = lead.icpScore;
  const icpColor = icpPct >= 80 ? '#1d9e75' : icpPct >= 60 ? '#c8860a' : '#e24b4a';

  // Lead intent pill styling
  const intentScore = lead.leadIntentScore;
  const intentBg = intentScore >= 80 ? '#e1f5ee' : intentScore >= 55 ? '#fff3d6' : '#fdecec';
  const intentColor = intentScore >= 80 ? '#0f6e56' : intentScore >= 55 ? '#c8860a' : '#e24b4a';

  // Lead actions type
  const isActionOpen = lead.actionsType !== 'cold' && lead.actionsType !== 'ageing';

  // Pre-call pitch data for current lead
  const sopPitch = LEAD_SOP_PITCH_DATA[lead.id] || LEAD_SOP_PITCH_DATA['lead-1'];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(5px)',
        zIndex: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: 22,
          width: '100%',
          maxWidth: 440,
          maxHeight: '86vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden',
          animation: 'modalRise 0.2s ease',
        }}
      >
        {/* Toast Alert */}
        {actionToast && (
          <div
            style={{
              position: 'absolute',
              top: 58,
              left: 16,
              right: 16,
              zIndex: 30,
              background: 'linear-gradient(120deg, #0a2a1e, #0f6e56)',
              color: '#ffffff',
              padding: '9px 14px',
              borderRadius: 12,
              fontSize: '13px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              boxShadow: '0 6px 18px rgba(15, 110, 86, 0.4)',
              animation: 'modalRise 0.15s ease',
            }}
          >
            <Check size={16} color="#5dcaa5" />
            <span>{actionToast}</span>
          </div>
        )}

        {/* 1. Header with purple gradient matching mock HTML */}
        <div
          style={{
            background: 'linear-gradient(135deg, #3b1254, #6b2fa0)',
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              background: 'rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#c084fc',
              flexShrink: 0,
            }}
          >
            <Users size={18} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '16.5px', fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
              Leads
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)' }}>
              Lead {currentIdx + 1} of {MOCK_LEADS.length} · SLA to close
            </div>
          </div>
          <button
            onClick={onClose}
            title="Close modal"
            style={{
              background: 'rgba(255, 255, 255, 0.16)',
              border: 'none',
              borderRadius: '50%',
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'background 0.15s',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* 2. Pagination bar matching mock HTML */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '9px 14px',
            borderBottom: '1px solid #f0f0f0',
            flexShrink: 0,
            background: '#fafafc',
          }}
        >
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid #e5e5ea',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentIdx === 0 ? 'default' : 'pointer',
              color: '#3b1254',
              opacity: currentIdx === 0 ? 0.35 : 1,
              flexShrink: 0,
            }}
            title="Previous lead"
          >
            <ChevronLeft size={16} />
          </button>

          {/* Dots Dock */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: 5 }}>
            {MOCK_LEADS.map((_, i) => (
              <span
                key={i}
                onClick={() => setCurrentIdx(i)}
                style={{
                  display: 'inline-block',
                  width: i === currentIdx ? 16 : 6,
                  height: 6,
                  borderRadius: 3,
                  background: i === currentIdx ? '#6b2fa0' : '#e5e5ea',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentIdx === MOCK_LEADS.length - 1}
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              border: '1px solid #e5e5ea',
              background: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: currentIdx === MOCK_LEADS.length - 1 ? 'default' : 'pointer',
              color: '#3b1254',
              opacity: currentIdx === MOCK_LEADS.length - 1 ? 0.35 : 1,
              flexShrink: 0,
            }}
            title="Next lead"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* 3. Scrollable Page Content */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '14px' }}>
          {/* Status Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: statusColor,
                }}
              />
              <span
                style={{
                  fontSize: '12.5px',
                  fontWeight: 800,
                  color: statusColor,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                {statusLabel}
              </span>
            </div>

            <span
              style={{
                fontSize: '12.5px',
                background: badgeBg,
                color: badgeColor,
                padding: '2px 8px',
                borderRadius: 6,
                fontWeight: 700,
              }}
            >
              {badgeText}
            </span>
          </div>

          {/* Customer Identity Card */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 10,
              background: '#f9f9fb',
              border: '1px solid #ece7fa',
              borderRadius: 14,
              padding: '10px 12px',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: badgeBg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '15px',
                fontWeight: 800,
                color: badgeColor,
                flexShrink: 0,
              }}
            >
              {lead.initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '15.5px', fontWeight: 800, color: '#1a1a1a' }}>
                {lead.name}
              </div>
              <div style={{ fontSize: '13px', color: '#6b6b74' }}>
                Interested: {lead.product}
              </div>
            </div>
          </div>

          {/* Quote Toggle Box */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 8,
              background: '#fdf3e0',
              border: '1px solid #f3dfa8',
              borderRadius: 10,
              padding: '7px 11px',
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: '13px',
                color: '#7c4a00',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <FileText size={15} color="#c8860a" />
              <span>Quote to be given to customer</span>
            </span>

            {/* Toggle Switch */}
            <div
              onClick={handleToggleQuote}
              style={{
                width: 34,
                height: 19,
                borderRadius: 10,
                background: isQuoteOn ? '#0f6e56' : '#d4d4d8',
                cursor: 'pointer',
                position: 'relative',
                transition: 'background 0.2s ease',
              }}
            >
              <div
                style={{
                  width: 15,
                  height: 15,
                  borderRadius: '50%',
                  background: '#ffffff',
                  position: 'absolute',
                  top: 2,
                  left: isQuoteOn ? 17 : 2,
                  transition: 'left 0.2s ease',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                }}
              />
            </div>
          </div>

          {/* SLA Alert Note (e.g. for Kavitha R.) */}
          {lead.slaNote && (
            <div
              style={{
                fontSize: '13px',
                color: '#92400e',
                background: '#fef3c7',
                border: '1px solid #fde68a',
                borderRadius: 8,
                padding: '6px 10px',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                fontWeight: 600,
              }}
            >
              <AlertTriangle size={15} color="#b45309" />
              <span>{lead.slaNote}</span>
            </div>
          )}

          {/* ICP Progress Row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 0 8px' }}>
            <div style={{ fontSize: '12.5px', color: '#555555', fontWeight: 700, minWidth: 42 }}>
              🎯 ICP
            </div>
            <div
              style={{
                flex: 1,
                height: 6,
                background: '#e5e5ea',
                borderRadius: 3,
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  width: `${lead.icpScore}%`,
                  height: '100%',
                  background: icpColor,
                  borderRadius: 3,
                  transition: 'width 0.4s ease',
                }}
              />
            </div>
            <div
              style={{
                fontSize: '14.5px',
                fontWeight: 800,
                color: icpColor,
                minWidth: 36,
                textAlign: 'right',
              }}
            >
              {lead.icpScore}%
            </div>
          </div>

          {/* Lead Intent Score Banner */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: intentBg,
              borderRadius: 10,
              padding: '7px 12px',
              marginBottom: 10,
            }}
          >
            <span style={{ fontSize: '13px', fontWeight: 700, color: intentColor }}>
              🎯 Lead Intent Score
            </span>
            <span style={{ fontSize: '16px', fontWeight: 800, color: intentColor }}>
              {lead.leadIntentScore}
            </span>
          </div>

          {/* Collapsible Section 1: ICP Fit Breakdown */}
          <div
            style={{
              background: '#f9f9fb',
              borderRadius: 12,
              border: '1px solid #ece7fa',
              marginBottom: 8,
              overflow: 'hidden',
            }}
          >
            <div
              onClick={() => setIcpBreakdownOpen(!icpBreakdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#6b6b74',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                }}
              >
                ICP Fit Breakdown
              </span>
              {icpBreakdownOpen ? (
                <ChevronUp size={16} color="#8e8e93" />
              ) : (
                <ChevronDown size={16} color="#8e8e93" />
              )}
            </div>

            {icpBreakdownOpen && (
              <div style={{ padding: '4px 12px 10px', borderTop: '1px solid #f0f0f4' }}>
                {(lead.subscores && lead.subscores.length > 0
                  ? lead.subscores
                  : [
                      { label: 'Budget Fit', pct: lead.icpScore, color: icpColor },
                      { label: 'Need Match', pct: 72, color: '#c8860a' },
                      { label: 'Decision Stage', pct: 60, color: '#7c3aed' },
                    ]
                ).map((sub, i) => (
                  <div key={i} style={{ marginTop: 6 }}>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 12,
                        marginBottom: 2,
                      }}
                    >
                      <span style={{ color: '#555555' }}>{sub.label}</span>
                      <span style={{ fontWeight: 700, color: sub.color }}>{sub.pct}%</span>
                    </div>
                    <div
                      style={{
                        height: 4,
                        background: '#e5e5ea',
                        borderRadius: 2,
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{ width: `${sub.pct}%`, height: '100%', background: sub.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Collapsible Section 2: Where We Picked Up Signals (Expanded by Default) */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: 12,
              border: '1.5px solid #f0e6ff',
              marginBottom: 8,
              overflow: 'hidden',
            }}
          >
            <div
              onClick={() => setSignalsOpen(!signalsOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                background: '#fcfaff',
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={14} color="#7c3aed" />
                <span
                  style={{
                    fontSize: '12px',
                    fontWeight: 800,
                    color: '#4c1d95',
                    textTransform: 'uppercase',
                    letterSpacing: '0.4px',
                  }}
                >
                  Where We Picked Up Signals
                </span>
              </div>
              {signalsOpen ? (
                <ChevronUp size={16} color="#7c3aed" />
              ) : (
                <ChevronDown size={16} color="#7c3aed" />
              )}
            </div>

            {signalsOpen && (
              <div
                style={{
                  padding: '8px 12px 10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 7,
                }}
              >
                {lead.signals.map((sig) => (
                  <div
                    key={sig.id}
                    style={{
                      background: '#fffdf7',
                      border: '1px solid #f5e4b8',
                      borderRadius: 10,
                      padding: '8px 10px',
                    }}
                  >
                    <div
                      style={{
                        fontSize: '12.5px',
                        fontWeight: 800,
                        color: '#92400e',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 5,
                        marginBottom: 2,
                      }}
                    >
                      {getCategoryIcon(sig.category)}
                      <span>{sig.category}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: '#451a03', lineHeight: 1.4 }}>
                      {sig.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Collapsible Section 3: How We Got Here */}
          <div
            style={{
              background: '#fafafc',
              borderRadius: 12,
              border: '1px solid #ece7fa',
              marginBottom: 8,
              overflow: 'hidden',
            }}
          >
            <div
              onClick={() => setHowWeGotHereOpen(!howWeGotHereOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '9px 12px',
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#6b6b74',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                }}
              >
                How We Got Here
              </span>
              {howWeGotHereOpen ? (
                <ChevronUp size={16} color="#8e8e93" />
              ) : (
                <ChevronDown size={16} color="#8e8e93" />
              )}
            </div>

            {howWeGotHereOpen && (
              <div style={{ padding: '8px 12px 10px', borderTop: '1px solid #f0f0f4' }}>
                {lead.journey && lead.journey.length > 0 ? (
                  lead.journey.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: 10,
                        marginBottom: 8,
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: 22,
                          height: 22,
                          borderRadius: '50%',
                          background: step.color,
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 11,
                          marginTop: 2,
                          flexShrink: 0,
                        }}
                      >
                        {step.icon}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a' }}>
                          {step.date}{' '}
                          <span
                            style={{
                              fontSize: 11,
                              color: '#7c3aed',
                              background: '#f1ecff',
                              padding: '1px 6px',
                              borderRadius: 4,
                              marginLeft: 4,
                            }}
                          >
                            {step.channel}
                          </span>
                        </div>
                        <div style={{ fontSize: 12.5, color: '#6b6b74', lineHeight: 1.35, marginTop: 2 }}>
                          {step.text}
                        </div>
                      </div>
                    </div>
                  ))
                ) : lead.timeline && lead.timeline.length > 0 ? (
                  lead.timeline.map((step, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: 10,
                        marginBottom: 8,
                        position: 'relative',
                      }}
                    >
                      <div
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: '#7c3aed',
                          marginTop: 5,
                          flexShrink: 0,
                        }}
                      />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a1a' }}>
                          {step.action} ·{' '}
                          <span style={{ color: '#8e8e93', fontWeight: 500 }}>{step.time}</span>
                        </div>
                        <div style={{ fontSize: 12.5, color: '#6b6b74', lineHeight: 1.35 }}>
                          {step.detail}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div style={{ fontSize: 12.5, color: '#8e8e93' }}>
                    No prior touchpoints logged.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pre-call Notes (if available) */}
          {lead.preCallNotes && lead.preCallNotes.length > 0 && (
            <div
              style={{
                background: '#fafafc',
                border: '1px solid #ece7fa',
                borderRadius: 10,
                padding: '8px 10px',
                marginBottom: 6,
              }}
            >
              <div
                style={{
                  fontSize: '11.5px',
                  fontWeight: 800,
                  color: '#6b6b74',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                  marginBottom: 4,
                }}
              >
                Pre-call Notes
              </div>
              {lead.preCallNotes.map((note, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '12px',
                    color: '#4b5563',
                    lineHeight: 1.35,
                    marginBottom: 3,
                    display: 'flex',
                    alignItems: 'baseline',
                    gap: 5,
                  }}
                >
                  <span style={{ color: '#7c3aed' }}>•</span>
                  <span>{note}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Persistent Footer: Cumulative Missed */}
        <div
          style={{
            padding: '8px 14px',
            borderTop: '1px solid #f0f0f0',
            flexShrink: 0,
            background: '#fff9f9',
          }}
        >
          <div
            style={{
              fontSize: '11.5px',
              fontWeight: 800,
              color: '#e24b4a',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#e24b4a',
                animation: 'blink 1.2s infinite ease-in-out',
              }}
            />
            <span>Cumulative Missed: {lead.cumulativeMissed || 2}</span>
            <span
              style={{
                fontWeight: 500,
                color: '#a32d2d',
                textTransform: 'none',
                letterSpacing: 0,
              }}
            >
              — expired without close, visible to manager
            </span>
          </div>
        </div>

        {/* 5. Persistent Footer: Action Buttons */}
        <div
          style={{
            padding: '10px 14px 14px',
            background: '#ffffff',
            borderTop: '1px solid #f0f0f0',
            display: 'flex',
            gap: 7,
            flexShrink: 0,
          }}
        >
          {isActionOpen ? (
            <>
              <button
                onClick={() => setShowNoInterestSheet(true)}
                style={{
                  flex: 1,
                  padding: '9px 6px',
                  border: '1px solid #e24b4a',
                  borderRadius: 10,
                  fontSize: '13px',
                  color: '#e24b4a',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  transition: 'all 0.15s ease',
                }}
                className="hover:bg-red-50"
              >
                No Interest
              </button>

              <button
                onClick={() =>
                  triggerToast(`Opening WhatsApp chat with ${lead.name} (${lead.phone})`)
                }
                style={{
                  flex: 1,
                  padding: '9px 6px',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: '13px',
                  color: '#ffffff',
                  background: '#25D366',
                  cursor: 'pointer',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  transition: 'all 0.15s ease',
                }}
                className="hover:brightness-95"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => setShowSopChecklist(true)}
                style={{
                  flex: 1.3,
                  padding: '9px 7px',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: '13px',
                  color: '#ffffff',
                  background: '#0f6e56',
                  cursor: 'pointer',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  boxShadow: '0 2px 8px rgba(15, 110, 86, 0.35)',
                  transition: 'all 0.15s ease',
                }}
                className="hover:brightness-110"
              >
                <PhoneCall size={14} />
                <span>On-ground Call</span>
              </button>

              <button
                onClick={() => triggerToast(`Marked ${lead.name} as Came Back ✓`)}
                style={{
                  flex: 1,
                  padding: '9px 5px',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: '13px',
                  color: '#ffffff',
                  background: '#1d9e75',
                  cursor: 'pointer',
                  fontWeight: 700,
                  transition: 'all 0.15s ease',
                }}
                className="hover:brightness-105"
              >
                Came Back ✓
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => triggerToast(`Lead ${lead.name} marked as Closed · No Sale`)}
                style={{
                  flex: 1,
                  padding: '9px 6px',
                  border: '1px solid #e24b4a',
                  borderRadius: 10,
                  fontSize: '13px',
                  color: '#e24b4a',
                  background: '#ffffff',
                  cursor: 'pointer',
                  fontWeight: 700,
                  transition: 'all 0.15s ease',
                }}
                className="hover:bg-red-50"
              >
                Close · No Sale
              </button>

              <button
                onClick={() =>
                  triggerToast(`Opening WhatsApp chat with ${lead.name} (${lead.phone})`)
                }
                style={{
                  flex: 1,
                  padding: '9px 6px',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: '13px',
                  color: '#ffffff',
                  background: '#25D366',
                  cursor: 'pointer',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  transition: 'all 0.15s ease',
                }}
                className="hover:brightness-95"
              >
                <MessageCircle size={15} />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => setShowSopChecklist(true)}
                style={{
                  flex: 1.2,
                  padding: '9px 8px',
                  border: 'none',
                  borderRadius: 10,
                  fontSize: '13px',
                  color: '#ffffff',
                  background: '#0f6e56',
                  cursor: 'pointer',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                  boxShadow: '0 2px 8px rgba(15, 110, 86, 0.35)',
                  transition: 'all 0.15s ease',
                }}
                className="hover:brightness-110"
              >
                <PhoneCall size={14} />
                <span>On-ground Call</span>
              </button>
            </>
          )}
        </div>

        {/* 6. SUB-MODAL: "Before you call..." Lead SOP Checklist Sheet */}
        {showSopChecklist && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#ffffff',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              animation: 'modalRise 0.2s ease',
            }}
          >
            {/* SOP Header */}
            <div
              style={{
                background: 'linear-gradient(135deg, #0a1a14, #0f6e56)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: 800,
                  color: '#ffffff',
                  flexShrink: 0,
                }}
              >
                {lead.initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '16.5px', fontWeight: 800, lineHeight: 1.2 }}>
                  Before you call {lead.name}
                </div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.75)' }}>
                  Lead SOP parameters · review, then place the call
                </div>
              </div>
              <button
                onClick={() => setShowSopChecklist(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.16)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* SOP Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '14px 16px' }}>
              {/* Product Pitch Recommendation Card (.pc-card) */}
              <div
                style={{
                  borderRadius: 14,
                  overflow: 'hidden',
                  marginBottom: 14,
                  border: '1px solid #f3dfa8',
                  boxShadow: '0 2px 10px rgba(200, 134, 10, 0.1)',
                }}
              >
                <div
                  style={{
                    background: 'linear-gradient(135deg, #c8860a, #e0a52f)',
                    padding: '11px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'rgba(255, 255, 255, 0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 19,
                      flexShrink: 0,
                    }}
                  >
                    🛏️
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        color: 'rgba(255, 255, 255, 0.85)',
                      }}
                    >
                      Coached Recommendation
                    </div>
                    <div style={{ fontSize: '15px', fontWeight: 800, color: '#ffffff' }}>
                      {sopPitch.productName}
                    </div>
                    <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.95)', fontWeight: 700 }}>
                      {sopPitch.price}{' '}
                      <s style={{ color: 'rgba(255, 255, 255, 0.65)', fontWeight: 500 }}>
                        {sopPitch.origPrice}
                      </s>
                    </div>
                  </div>
                </div>

                <div style={{ background: '#fffdf7', padding: '12px' }}>
                  {/* Why */}
                  <div
                    style={{
                      fontSize: '12.5px',
                      color: '#8a6410',
                      background: '#fff3d9',
                      borderRadius: 8,
                      padding: '7px 9px',
                      lineHeight: 1.45,
                      marginBottom: 10,
                    }}
                  >
                    💡 <b>Why:</b> {sopPitch.why}
                  </div>

                  {/* Coached pitch line */}
                  <div style={{ marginBottom: 9 }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        color: '#92400e',
                        marginBottom: 2,
                      }}
                    >
                      Recommended Opening Line
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#1a1a1a', fontStyle: 'italic', lineHeight: 1.4 }}>
                      {sopPitch.pitch}
                    </div>
                  </div>

                  {/* Cross-sell */}
                  <div style={{ marginBottom: 9 }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        color: '#92400e',
                        marginBottom: 2,
                      }}
                    >
                      Cross-Sell: {sopPitch.crossName}
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#1a1a1a', fontStyle: 'italic', lineHeight: 1.4 }}>
                      {sopPitch.crossLine}
                    </div>
                  </div>

                  {/* EMI Plan */}
                  <div>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.4px',
                        color: '#92400e',
                        marginBottom: 2,
                      }}
                    >
                      Financing: {sopPitch.emiPlan}
                    </div>
                    <div style={{ fontSize: '12.5px', color: '#1a1a1a', fontStyle: 'italic', lineHeight: 1.4 }}>
                      {sopPitch.emiLine}
                    </div>
                  </div>
                </div>
              </div>

              {/* 5 SOP Checkpoints */}
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#6b6b74',
                  textTransform: 'uppercase',
                  letterSpacing: '0.4px',
                  marginBottom: 8,
                }}
              >
                Lead SOP Parameters
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {sopPitch.items.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                      background: item.hit ? '#fff8e9' : '#f9f9fb',
                      borderRadius: 11,
                      border: item.hit ? '1px solid #f3dfa8' : '0.5px solid #e5e5ea',
                      padding: '9px 11px',
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        background: item.hit ? '#c8860a' : '#c5c5c5',
                        color: '#ffffff',
                        fontSize: 12,
                        marginTop: 1,
                      }}
                    >
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13.5px', fontWeight: 700, color: '#1a1a1a' }}>
                        {item.title}
                      </div>
                      <div style={{ fontSize: '12px', color: '#6b6b74', lineHeight: 1.35 }}>
                        {item.sub}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SOP Footer */}
            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid #f0f0f0',
                background: '#fafafc',
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => {
                  setShowSopChecklist(false);
                  onClose();
                  if (onStartCall) {
                    onStartCall(lead.name, lead.phone);
                  } else {
                    triggerToast(`Connecting call to ${lead.name}...`);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '11px',
                  borderRadius: 12,
                  border: 'none',
                  background: '#0f6e56',
                  color: '#ffffff',
                  fontSize: '14.5px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(15, 110, 86, 0.35)',
                }}
                className="hover:brightness-110"
              >
                <PhoneOutgoing size={16} />
                <span>Skip · Place the call</span>
              </button>
              <div
                style={{
                  fontSize: '11.5px',
                  color: '#8e8e93',
                  textAlign: 'center',
                  marginTop: 8,
                  lineHeight: 1.35,
                }}
              >
                These are the same Lead SOP checkpoints your manager set — reviewing them takes 10 seconds and keeps the call on-target.
              </div>
            </div>
          </div>
        )}

        {/* 7. SUB-MODAL: "Why did customer lose interest?" Sheet */}
        {showNoInterestSheet && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#ffffff',
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              animation: 'modalRise 0.2s ease',
            }}
          >
            <div
              style={{
                background: 'linear-gradient(135deg, #7f1d1d, #e24b4a)',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '16px', fontWeight: 800 }}>No Interest</div>
                <div style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                  Customer: {lead.name} · {lead.phone}
                </div>
              </div>
              <button
                onClick={() => setShowNoInterestSheet(false)}
                style={{
                  background: 'rgba(255, 255, 255, 0.16)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 28,
                  height: 28,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                <X size={15} />
              </button>
            </div>

            <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
              <div
                style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#1a1a1a',
                  marginBottom: 12,
                }}
              >
                Why did the customer lose interest?
              </div>

              {[
                'Price too high (competitor comparison)',
                'Bought from a competitor',
                'Just browsing / No purchase intent',
                'No requirement anymore',
                'Wrong contact / Unable to reach',
              ].map((reason) => (
                <label
                  key={reason}
                  onClick={() => setNoInterestReason(reason)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '10px 12px',
                    borderRadius: 10,
                    background: noInterestReason === reason ? '#fef2f2' : '#f9f9fb',
                    border: noInterestReason === reason ? '1px solid #fecaca' : '1px solid #ece7fa',
                    marginBottom: 8,
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="noInterestReason"
                    checked={noInterestReason === reason}
                    onChange={() => setNoInterestReason(reason)}
                    style={{ accentColor: '#e24b4a' }}
                  />
                  <span style={{ fontSize: '13.5px', fontWeight: 600, color: '#333333' }}>
                    {reason}
                  </span>
                </label>
              ))}
            </div>

            <div
              style={{
                padding: '12px 16px',
                borderTop: '1px solid #f0f0f0',
                background: '#fafafc',
                display: 'flex',
                gap: 10,
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setShowNoInterestSheet(false)}
                style={{
                  flex: 1,
                  padding: '10px',
                  borderRadius: 10,
                  border: '1px solid #d4d4d8',
                  background: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  color: '#555555',
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowNoInterestSheet(false);
                  triggerToast(`Logged "${noInterestReason}" for ${lead.name}`);
                }}
                style={{
                  flex: 1.5,
                  padding: '10px',
                  borderRadius: 10,
                  border: 'none',
                  background: '#e24b4a',
                  fontSize: '13.5px',
                  fontWeight: 700,
                  color: '#ffffff',
                  cursor: 'pointer',
                }}
              >
                Confirm & Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
