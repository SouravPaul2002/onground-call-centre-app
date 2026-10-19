import React, { useState } from 'react';
import type { UseCallReturn } from '../hooks/useCall';
import {
  PhoneCall,
  Phone,
  PhoneOff,
  Copy,
  Check,
  RefreshCw,
  Mic,
  MicOff,
  Pause,
  Play,
  Volume2,
  AlertCircle,
  HelpCircle,
  Clock,
  ArrowDownLeft,
  ArrowUpRight,
} from 'lucide-react';

interface PractiseCallProps {
  call: UseCallReturn;
}

export const PractiseCall: React.FC<PractiseCallProps> = ({ call }) => {
  const {
    myPeerId,
    peerStatus,
    errorMessage,
    clearError,
    startCall,
    reconnectPeer,
    activeCall,
    toggleMute,
    toggleHold,
    endCall,
    callLogs,
  } = call;

  const [remotePeerInput, setRemotePeerInput] = useState('');
  const [copied, setCopied] = useState(false);
  const [callingInProgress, setCallingInProgress] = useState(false);

  const handleCopyId = () => {
    if (!myPeerId) return;
    navigator.clipboard.writeText(myPeerId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInitiateCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remotePeerInput.trim()) return;

    setCallingInProgress(true);
    await startCall(remotePeerInput.trim(), {
      name: `Peer (${remotePeerInput.trim().slice(0, 8)})`,
    });
    setCallingInProgress(false);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto p-4 sm:p-6 pb-20">
      {/* 1. Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #0f6e56, #1d9e75)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
            }}
          >
            <PhoneCall size={20} />
          </div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a1a', margin: 0 }}>
            In-App Calling & Practice Console
          </h1>
        </div>
        <p style={{ fontSize: 13.5, color: '#6b7280', margin: 0 }}>
          Real browser-to-browser voice calling powered by WebRTC & PeerJS cloud signalling.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 14,
            padding: '12px 16px',
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            color: '#b91c1c',
            fontSize: 13.5,
            animation: 'modalRise 0.2s ease',
          }}
        >
          <AlertCircle size={18} style={{ flexShrink: 0 }} />
          <span style={{ flex: 1, fontWeight: 500 }}>{errorMessage}</span>
          <button
            onClick={clearError}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#b91c1c',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Grid: 2 Columns on desktop */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
        {/* CARD 1: My Peer ID */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 18,
            padding: '20px 22px',
            border: '1.5px solid #ece7fa',
            boxShadow: '0 2px 10px rgba(16, 24, 40, 0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#0f6e56', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              Your Peer Identity
            </span>

            {/* Status Pill */}
            <span
              style={{
                fontSize: 12,
                fontWeight: 700,
                padding: '3px 10px',
                borderRadius: 9999,
                background:
                  peerStatus === 'ready'
                    ? '#e1f5ee'
                    : peerStatus === 'in-call'
                    ? '#eff6ff'
                    : peerStatus === 'connecting'
                    ? '#fef9c3'
                    : '#fee2e2',
                color:
                  peerStatus === 'ready'
                    ? '#0f6e56'
                    : peerStatus === 'in-call'
                    ? '#1d4ed8'
                    : peerStatus === 'connecting'
                    ? '#854d0e'
                    : '#b91c1c',
              }}
            >
              {peerStatus === 'ready' && '● Ready to Receive'}
              {peerStatus === 'in-call' && '● In Call'}
              {peerStatus === 'connecting' && '● Connecting...'}
              {peerStatus === 'initialising' && '● Initialising...'}
              {peerStatus === 'disconnected' && '● Disconnected'}
              {peerStatus === 'error' && '● Error'}
            </span>
          </div>

          <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 12px', lineHeight: 1.4 }}>
            Share this Peer ID with another person or another open browser window to receive incoming voice calls.
          </p>

          {/* Peer ID Display Box */}
          <div
            style={{
              background: '#f8fafc',
              borderRadius: 12,
              padding: '12px 14px',
              border: '1.5px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10,
              marginBottom: 14,
            }}
          >
            <span
              style={{
                fontFamily: 'monospace',
                fontSize: 14.5,
                fontWeight: 700,
                color: myPeerId ? '#0f172a' : '#94a3b8',
                wordBreak: 'break-all',
              }}
            >
              {myPeerId || 'Generating Peer ID...'}
            </span>

            <button
              onClick={handleCopyId}
              disabled={!myPeerId}
              style={{
                background: copied ? '#0f6e56' : '#1e293b',
                color: '#ffffff',
                border: 'none',
                borderRadius: 8,
                padding: '7px 12px',
                fontSize: 12.5,
                fontWeight: 700,
                cursor: myPeerId ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                flexShrink: 0,
                transition: 'all 0.15s ease',
              }}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied!' : 'Copy ID'}</span>
            </button>
          </div>

          {/* Reconnect button if disconnected or error */}
          {(peerStatus === 'disconnected' || peerStatus === 'error') && (
            <button
              onClick={reconnectPeer}
              style={{
                background: '#0f6e56',
                color: '#ffffff',
                border: 'none',
                borderRadius: 10,
                padding: '9px 14px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                alignSelf: 'flex-start',
              }}
            >
              <RefreshCw size={14} />
              <span>Reconnect Signalling</span>
            </button>
          )}

          {/* Quick instructions box */}
          <div
            style={{
              marginTop: 'auto',
              background: '#f4fbf8',
              border: '1px solid #d1fae5',
              borderRadius: 12,
              padding: '12px 14px',
              fontSize: 12.5,
              color: '#065f46',
              lineHeight: 1.45,
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
              <HelpCircle size={14} />
              <span>How to test two-browser calling:</span>
            </div>
            1. Copy your Peer ID above.<br />
            2. Open an Incognito / private window at <code>http://localhost:5173</code>.<br />
            3. Paste your Peer ID into the other window and click <b>Call Peer</b>.<br />
            4. Click <b>Accept Call</b> when the ringing popup appears!
          </div>
        </div>

        {/* CARD 2: Make Outgoing Call */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 18,
            padding: '20px 22px',
            border: '1.5px solid #ece7fa',
            boxShadow: '0 2px 10px rgba(16, 24, 40, 0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: '#185fa5', textTransform: 'uppercase', letterSpacing: '0.4px' }}>
              Make an Outgoing Call
            </span>
          </div>

          <p style={{ fontSize: 13, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.4 }}>
            Enter the Peer ID of another user/browser to establish a real-time WebRTC audio connection.
          </p>

          <form onSubmit={handleInitiateCall} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ display: 'block', fontSize: 12.5, fontWeight: 700, color: '#374151', marginBottom: 6 }}>
                Remote Peer ID:
              </label>
              <input
                type="text"
                value={remotePeerInput}
                onChange={(e) => setRemotePeerInput(e.target.value)}
                placeholder="e.g. 7f2a1b94-813c-4b57-a924..."
                disabled={activeCall !== null || peerStatus !== 'ready'}
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 12,
                  border: '1.5px solid #d1d5db',
                  fontSize: 13.5,
                  fontFamily: 'monospace',
                  outline: 'none',
                  background: activeCall !== null ? '#f3f4f6' : '#ffffff',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <button
              type="submit"
              disabled={
                !remotePeerInput.trim() ||
                remotePeerInput.trim() === myPeerId ||
                activeCall !== null ||
                callingInProgress ||
                peerStatus !== 'ready'
              }
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: 12,
                border: 'none',
                background:
                  !remotePeerInput.trim() ||
                  remotePeerInput.trim() === myPeerId ||
                  activeCall !== null ||
                  peerStatus !== 'ready'
                    ? '#9ca3af'
                    : 'linear-gradient(135deg, #0f6e56, #1d9e75)',
                color: '#ffffff',
                fontSize: 14.5,
                fontWeight: 700,
                cursor:
                  !remotePeerInput.trim() ||
                  remotePeerInput.trim() === myPeerId ||
                  activeCall !== null ||
                  peerStatus !== 'ready'
                    ? 'not-allowed'
                    : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow:
                  remotePeerInput.trim() && remotePeerInput.trim() !== myPeerId && !activeCall
                    ? '0 4px 14px rgba(15, 110, 86, 0.35)'
                    : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <Phone size={18} />
              <span>{callingInProgress ? 'Connecting...' : 'Call Peer'}</span>
            </button>
          </form>

          {/* Active Call Controls embedded in page if call is ongoing */}
          {activeCall && (
            <div
              style={{
                marginTop: 20,
                padding: '16px',
                borderRadius: 14,
                background: '#0a1a14',
                color: '#ffffff',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800 }}>In Active Call</div>
                  <div style={{ fontSize: 11.5, color: '#9fe1cb', fontFamily: 'monospace' }}>
                    {activeCall.remotePeerId.slice(0, 16)}...
                  </div>
                </div>

                <div style={{ fontSize: 18, fontWeight: 800, color: '#7ee0bb', fontVariantNumeric: 'tabular-nums' }}>
                  {formatTimer(activeCall.durationSeconds)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={toggleMute}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 8,
                    border: 'none',
                    background: activeCall.isMuted ? '#ef4444' : 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 12.5,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  {activeCall.isMuted ? <MicOff size={14} /> : <Mic size={14} />}
                  <span>{activeCall.isMuted ? 'Unmute' : 'Mute'}</span>
                </button>

                <button
                  onClick={toggleHold}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 8,
                    border: 'none',
                    background: activeCall.isOnHold ? '#2563eb' : 'rgba(255, 255, 255, 0.2)',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 12.5,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  {activeCall.isOnHold ? <Play size={14} /> : <Pause size={14} />}
                  <span>{activeCall.isOnHold ? 'Resume' : 'Hold'}</span>
                </button>

                <button
                  onClick={() => endCall('Completed')}
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: 8,
                    border: 'none',
                    background: '#dc2626',
                    color: '#ffffff',
                    fontWeight: 700,
                    fontSize: 12.5,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}
                >
                  <PhoneOff size={14} />
                  <span>End</span>
                </button>
              </div>
            </div>
          )}

          {/* Feature Specs */}
          <div style={{ marginTop: 'auto', paddingTop: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#6b7280' }}>
              <Volume2 size={14} color="#0f6e56" />
              <span>Full duplex WebRTC audio with echo cancellation & noise suppression.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Session Call History Card */}
      <div
        style={{
          marginTop: 24,
          background: '#ffffff',
          borderRadius: 18,
          padding: '20px 22px',
          border: '1.5px solid #ece7fa',
          boxShadow: '0 2px 10px rgba(16, 24, 40, 0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: '#1a1a1a' }}>Session WebRTC Calls Log</div>
            <div style={{ fontSize: 12.5, color: '#6b7280' }}>
              Recorded in-memory for this browser session. Automatically synced with Recent Calls.
            </div>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0f6e56', background: '#e1f5ee', padding: '3px 9px', borderRadius: 6 }}>
            {callLogs.length} calls
          </span>
        </div>

        {callLogs.length === 0 ? (
          <div
            style={{
              padding: '28px',
              textAlign: 'center',
              color: '#9ca3af',
              fontSize: 13.5,
              background: '#f9fafb',
              borderRadius: 12,
              border: '1px dashed #e5e7eb',
            }}
          >
            No WebRTC calls made yet in this session. Initiate or accept a call to see live logs here.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {callLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  background: '#f8fafc',
                  borderRadius: 12,
                  border: '1px solid #e2e8f0',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: log.direction === 'incoming' ? '#e1f5ee' : '#eff6ff',
                      color: log.direction === 'incoming' ? '#0f6e56' : '#1d4ed8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {log.direction === 'incoming' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                  </div>

                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: '#1a1a1a' }}>
                      {log.callerName}
                    </div>
                    <div style={{ fontSize: 11.5, color: '#64748b', fontFamily: 'monospace' }}>
                      Remote: {log.remotePeerId}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1a1a1a', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={12} color="#6b7280" />
                      <span>{log.durationText}</span>
                    </div>
                    <div style={{ fontSize: 11, color: '#94a3b8' }}>{log.startedAt}</div>
                  </div>

                  <span
                    style={{
                      fontSize: 11.5,
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 6,
                      background:
                        log.outcome === 'Completed'
                          ? '#e1f5ee'
                          : log.outcome === 'Declined'
                          ? '#fef3c7'
                          : '#fee2e2',
                      color:
                        log.outcome === 'Completed'
                          ? '#0f6e56'
                          : log.outcome === 'Declined'
                          ? '#b45309'
                          : '#b91c1c',
                    }}
                  >
                    {log.outcome}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
