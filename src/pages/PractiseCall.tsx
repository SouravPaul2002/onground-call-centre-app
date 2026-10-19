import React, { useState } from 'react';
import type { UseCallReturn } from '../hooks/useCall';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { formatDuration } from '../utils/formatters';
import { CallControls } from '../components/CallControls';
import { PeerStatusBadge } from '../components/PeerStatusBadge';
import {
  Phone,
  Copy,
  Check,
  RefreshCw,
  AlertCircle,
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
  const [isCalling, setIsCalling] = useState(false);

  // Reusable clipboard hook
  const { copied, copy } = useCopyToClipboard();

  const handleCall = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!remotePeerInput.trim()) return;
    setIsCalling(true);
    await startCall(remotePeerInput.trim());
    setIsCalling(false);
  };

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '24px 16px' }}>
      {/* Title */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, margin: '0 0 6px', color: '#1a1a1a' }}>
          Practise Voice Calling (PeerJS + WebRTC)
        </h1>
        <p style={{ fontSize: 13.5, color: '#666', margin: 0 }}>
          Connect two browser windows and test real microphone and speaker audio.
        </p>
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div
          style={{
            background: '#fee2e2',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: 8,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 13,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
          <button
            onClick={clearError}
            style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Two Column Grid: My ID & Call Someone */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, marginBottom: 24 }}>
        {/* Card 1: My Peer ID */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e5ea',
            borderRadius: 14,
            padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, color: '#1a1a1a' }}>
              Your Local Peer ID
            </h3>
            {/* Reusable status badge */}
            <PeerStatusBadge status={peerStatus} />
          </div>

          <p style={{ fontSize: 12.5, color: '#666', margin: '0 0 12px' }}>
            Share this ID with the other person or open another browser tab and call it:
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: '#f4f4f6',
              padding: '10px 12px',
              borderRadius: 8,
              fontFamily: 'monospace',
              fontSize: 13,
              color: '#333',
              marginBottom: 12,
              wordBreak: 'break-all',
            }}
          >
            <span style={{ flex: 1 }}>{myPeerId || 'Connecting to PeerJS...'}</span>
            <button
              onClick={() => copy(myPeerId)}
              disabled={!myPeerId}
              style={{
                border: 'none',
                background: copied ? '#0f6e56' : '#ffffff',
                color: copied ? '#fff' : '#333',
                borderRadius: 6,
                padding: '5px 10px',
                fontSize: 12,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              {copied ? <Check size={13} /> : <Copy size={13} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>

          <button
            onClick={reconnectPeer}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#0f6e56',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: 0,
            }}
          >
            <RefreshCw size={12} /> Reconnect PeerJS
          </button>
        </div>

        {/* Card 2: Dial Another Peer */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e5ea',
            borderRadius: 14,
            padding: 20,
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px', color: '#1a1a1a' }}>
            Call Another User
          </h3>

          <p style={{ fontSize: 12.5, color: '#666', margin: '0 0 12px' }}>
            Paste the other browser tab's Peer ID below to start an audio call:
          </p>

          <form onSubmit={handleCall}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
              <input
                type="text"
                placeholder="e.g. 52c9db84-4822-4a0b-..."
                value={remotePeerInput}
                onChange={(e) => setRemotePeerInput(e.target.value)}
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: 8,
                  border: '1px solid #d1d5db',
                  fontSize: 13,
                  fontFamily: 'monospace',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={isCalling || !remotePeerInput.trim() || !!activeCall}
                style={{
                  padding: '9px 16px',
                  borderRadius: 8,
                  border: 'none',
                  background: isCalling || !!activeCall ? '#9ca3af' : '#0f6e56',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: isCalling || !!activeCall ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <Phone size={14} /> Call
              </button>
            </div>
          </form>

          <div style={{ fontSize: 12, color: '#888' }}>
            Note: Both users must click "Allow" on the microphone prompt.
          </div>
        </div>
      </div>

      {/* Active Call In-Page Console (if call is ongoing) */}
      {activeCall && (
        <div
          style={{
            background: '#e1f5ee',
            border: '1px solid #5dcaa5',
            borderRadius: 14,
            padding: 20,
            marginBottom: 24,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#0f6e56', textTransform: 'uppercase' }}>
              Active Voice Call
            </div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a1a', marginTop: 2 }}>
              {activeCall.callerName || activeCall.remotePeerId}
            </div>
            <div style={{ fontSize: 13, color: '#555', marginTop: 2 }}>
              Status: {activeCall.status === 'connecting' ? 'Connecting...' : activeCall.isOnHold ? 'On Hold' : 'Connected'} · Duration: {formatDuration(activeCall.durationSeconds)}
            </div>
          </div>

          {/* Reusable Pill Call Controls */}
          <CallControls
            isMuted={activeCall.isMuted}
            isOnHold={activeCall.isOnHold}
            onToggleMute={toggleMute}
            onToggleHold={toggleHold}
            onEndCall={() => endCall('Completed')}
            variant="pill"
          />
        </div>
      )}

      {/* Session Call History */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e5e5ea',
          borderRadius: 14,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 12px', color: '#1a1a1a' }}>
          Session Call Log ({callLogs.length})
        </h3>

        {callLogs.length === 0 ? (
          <div style={{ fontSize: 13, color: '#888', fontStyle: 'italic', padding: '12px 0' }}>
            No calls made yet in this session. Start a call above to test.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {callLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 12px',
                  background: '#f9f9fb',
                  borderRadius: 8,
                  fontSize: 13,
                }}
              >
                <div>
                  <span style={{ fontWeight: 600, color: '#1a1a1a' }}>
                    {log.direction === 'outgoing' ? '↗ Outgoing to ' : '↙ Incoming from '}
                    {log.callerName}
                  </span>
                  <div style={{ fontSize: 11.5, color: '#777', marginTop: 2 }}>
                    {log.startedAt} · Duration: {log.durationText}
                  </div>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '2px 8px',
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
                        ? '#d97706'
                        : '#dc2626',
                  }}
                >
                  {log.outcome}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
