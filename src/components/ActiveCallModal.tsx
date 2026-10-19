import React, { useState } from 'react';
import type { UseCallReturn } from '../hooks/useCall';
import {
  Phone,
  PhoneOff,
  PhoneIncoming,
  Mic,
  MicOff,
  Pause,
  Play,
  Minimize2,
  Copy,
  Check,
  AlertCircle,
  Volume2,
} from 'lucide-react';

interface ActiveCallModalProps {
  call: UseCallReturn;
}

export const ActiveCallModal: React.FC<ActiveCallModalProps> = ({ call }) => {
  const {
    incomingCall,
    activeCall,
    modalViewOpen,
    setModalViewOpen,
    acceptCall,
    declineCall,
    toggleMute,
    toggleHold,
    endCall,
    errorMessage,
    clearError,
  } = call;

  const [copied, setCopied] = useState(false);

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // 1. Incoming Call Prompt Modal
  if (incomingCall) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(5px)',
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
            borderRadius: 22,
            padding: '24px 22px',
            maxWidth: 420,
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
            border: '2px solid #5dcaa5',
            animation: 'modalRise 0.25s ease',
          }}
        >
          {/* Pulsing Phone Icon */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0f6e56, #1d9e75)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
              boxShadow: '0 0 0 10px rgba(29, 158, 117, 0.2)',
              animation: 'notifBellPulseRing 1.5s infinite',
            }}
          >
            <PhoneIncoming size={34} />
          </div>

          <div style={{ fontSize: 13, fontWeight: 700, color: '#0f6e56', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Incoming WebRTC Audio Call
          </div>

          <div style={{ fontSize: 20, fontWeight: 800, color: '#1a1a1a', margin: '4px 0' }}>
            {incomingCall.callerName || 'Unknown Peer'}
          </div>

          <div
            style={{
              background: '#f4fbf8',
              borderRadius: 10,
              padding: '8px 12px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 12.5,
              fontFamily: 'monospace',
              color: '#0f6e56',
              border: '1px solid #d1fae5',
              margin: '8px 0 18px',
              maxWidth: '90%',
              wordBreak: 'break-all',
            }}
          >
            <span>ID: {incomingCall.callerPeerId}</span>
          </div>

          <div style={{ fontSize: 12.5, color: '#6b7280', marginBottom: 22 }}>
            Real browser-to-browser voice call request. Accept to enable microphone communication.
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={declineCall}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 12,
                border: 'none',
                background: '#fee2e2',
                color: '#dc2626',
                fontWeight: 700,
                fontSize: 14.5,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                transition: 'background 0.15s ease',
              }}
              className="hover:bg-red-200"
            >
              <PhoneOff size={18} />
              <span>Decline</span>
            </button>

            <button
              onClick={acceptCall}
              style={{
                flex: 1.2,
                padding: '12px',
                borderRadius: 12,
                border: 'none',
                background: 'linear-gradient(135deg, #0f6e56, #1d9e75)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 14.5,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                boxShadow: '0 4px 14px rgba(15, 110, 86, 0.4)',
                transition: 'opacity 0.15s ease',
              }}
              className="hover:opacity-90"
            >
              <Phone size={18} />
              <span>Accept Call</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Call Modal (when modalViewOpen is true)
  if (!activeCall || !modalViewOpen) return null;

  const isConnecting = activeCall.status === 'connecting';
  const isHold = activeCall.isOnHold;
  const isMuted = activeCall.isMuted;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.55)',
        backdropFilter: 'blur(4px)',
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
          borderRadius: 24,
          padding: 0,
          maxWidth: 440,
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          animation: 'modalRise 0.25s ease',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header with Dark Green Gradient */}
        <div
          style={{
            background: 'linear-gradient(135deg, #0a1a14, #123c30)',
            padding: '20px 22px 24px',
            color: '#ffffff',
            position: 'relative',
            textAlign: 'center',
          }}
        >
          {/* Minimize / Collapse Button */}
          <button
            onClick={() => setModalViewOpen(false)}
            title="Minimize call bar"
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              background: 'rgba(255, 255, 255, 0.15)',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'background 0.15s',
            }}
            className="hover:bg-white/25"
          >
            <Minimize2 size={16} />
          </button>

          {/* Avatar with Sound Pulse */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #1d9e75, #5dcaa5)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              fontWeight: 800,
              margin: '6px auto 14px',
              boxShadow: !isConnecting && !isHold ? '0 0 0 8px rgba(93, 202, 165, 0.25)' : 'none',
              animation: !isConnecting && !isHold ? 'notifBellPulseRing 2s infinite' : 'none',
            }}
          >
            {activeCall.callerName ? activeCall.callerName.charAt(0).toUpperCase() : 'P'}
          </div>

          <div style={{ fontSize: 19, fontWeight: 800, color: '#ffffff' }}>
            {activeCall.callerName || 'Remote Peer'}
          </div>

          {/* Peer ID with copy */}
          <div
            onClick={() => handleCopyId(activeCall.remotePeerId)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              background: 'rgba(255, 255, 255, 0.12)',
              borderRadius: 8,
              padding: '4px 10px',
              fontSize: 12,
              fontFamily: 'monospace',
              color: '#a9c4ba',
              margin: '6px auto 10px',
              cursor: 'pointer',
            }}
            title="Click to copy peer ID"
          >
            <span>ID: {activeCall.remotePeerId.slice(0, 14)}...</span>
            {copied ? <Check size={12} color="#5dcaa5" /> : <Copy size={12} />}
          </div>

          {/* Status Badge & Duration */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                padding: '3px 9px',
                borderRadius: 6,
                background: isConnecting
                  ? 'rgba(234, 179, 8, 0.2)'
                  : isHold
                  ? 'rgba(59, 130, 246, 0.2)'
                  : 'rgba(93, 202, 165, 0.2)',
                color: isConnecting ? '#fde047' : isHold ? '#93c5fd' : '#7ee0bb',
              }}
            >
              {isConnecting ? '● Connecting...' : isHold ? '⏸ On Hold' : '● In Call (WebRTC)'}
            </span>

            {!isConnecting && (
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: '#ffffff',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {formatTimer(activeCall.durationSeconds)}
              </span>
            )}
          </div>
        </div>

        {/* Body Info / Notification */}
        <div style={{ padding: '20px 22px' }}>
          {errorMessage && (
            <div
              style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: 12,
                padding: '10px 14px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                fontSize: 12.5,
                color: '#b91c1c',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span style={{ flex: 1 }}>{errorMessage}</span>
              <button
                onClick={clearError}
                style={{ background: 'none', border: 'none', color: '#b91c1c', cursor: 'pointer', fontWeight: 700 }}
              >
                ✕
              </button>
            </div>
          )}

          <div
            style={{
              background: '#fafafc',
              borderRadius: 14,
              padding: '12px 14px',
              border: '1px solid #e5e5ea',
              marginBottom: 20,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: '#e1f5ee',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#0f6e56',
                flexShrink: 0,
              }}
            >
              <Volume2 size={18} />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a1a' }}>
                Direct WebRTC Audio Stream
              </div>
              <div style={{ fontSize: 11.5, color: '#6b7280' }}>
                {isConnecting
                  ? 'Waiting for remote peer to answer...'
                  : isHold
                  ? 'Your microphone audio is paused for the remote user.'
                  : isMuted
                  ? 'Your microphone is currently muted.'
                  : 'Microphone & speaker connected with two-way audio.'}
              </div>
            </div>
          </div>

          {/* In-Call Controls Row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
            {/* Mute Button */}
            <button
              onClick={toggleMute}
              disabled={isConnecting}
              style={{
                flex: 1,
                padding: '12px 10px',
                borderRadius: 14,
                border: isMuted ? '2px solid #ef4444' : '1px solid #e5e5ea',
                background: isMuted ? '#fef2f2' : '#ffffff',
                color: isMuted ? '#ef4444' : '#374151',
                fontWeight: 700,
                fontSize: 13,
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                opacity: isConnecting ? 0.6 : 1,
                transition: 'all 0.15s ease',
              }}
            >
              {isMuted ? <MicOff size={22} color="#ef4444" /> : <Mic size={22} />}
              <span>{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>

            {/* Hold Button */}
            <button
              onClick={toggleHold}
              disabled={isConnecting}
              style={{
                flex: 1,
                padding: '12px 10px',
                borderRadius: 14,
                border: isHold ? '2px solid #3b82f6' : '1px solid #e5e5ea',
                background: isHold ? '#eff6ff' : '#ffffff',
                color: isHold ? '#2563eb' : '#374151',
                fontWeight: 700,
                fontSize: 13,
                cursor: isConnecting ? 'not-allowed' : 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                opacity: isConnecting ? 0.6 : 1,
                transition: 'all 0.15s ease',
              }}
            >
              {isHold ? <Play size={22} color="#2563eb" /> : <Pause size={22} />}
              <span>{isHold ? 'Resume' : 'Hold'}</span>
            </button>

            {/* End Call Button */}
            <button
              onClick={() => endCall('Completed')}
              style={{
                flex: 1.2,
                padding: '12px 10px',
                borderRadius: 14,
                border: 'none',
                background: '#dc2626',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 6,
                boxShadow: '0 4px 14px rgba(220, 38, 38, 0.4)',
                transition: 'all 0.15s ease',
              }}
              className="hover:bg-red-700"
            >
              <PhoneOff size={22} />
              <span>End Call</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
