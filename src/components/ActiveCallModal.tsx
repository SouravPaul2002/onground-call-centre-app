import React from 'react';
import type { UseCallReturn } from '../hooks/useCall';
import { useCopyToClipboard } from '../hooks/useCopyToClipboard';
import { formatDuration } from '../utils/formatters';
import { CallControls } from './CallControls';
import {
  Phone,
  PhoneOff,
  PhoneIncoming,
  Minimize2,
  Copy,
  Check,
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

  // Reusable clipboard hook
  const { copied, copy } = useCopyToClipboard();

  // 1. Incoming Call Screen
  if (incomingCall) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
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
            borderRadius: 18,
            padding: '24px 20px',
            maxWidth: 380,
            width: '100%',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}
        >
          {/* Incoming Call Icon */}
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              background: '#e1f5ee',
              color: '#0f6e56',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 14px',
            }}
          >
            <PhoneIncoming size={32} />
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 6px', color: '#1a1a1a' }}>
            Incoming Voice Call
          </h3>
          <p style={{ fontSize: 13, color: '#666', margin: '0 0 16px' }}>
            A remote peer is calling your browser via WebRTC:
          </p>

          {/* Caller Peer ID */}
          <div
            style={{
              background: '#f4f4f6',
              borderRadius: 8,
              padding: '10px 12px',
              fontSize: 13,
              fontFamily: 'monospace',
              color: '#333',
              marginBottom: 20,
              wordBreak: 'break-all',
            }}
          >
            {incomingCall.callerPeerId}
          </div>

          {/* Accept / Decline buttons */}
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={declineCall}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 10,
                border: 'none',
                background: '#fee2e2',
                color: '#dc2626',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <PhoneOff size={16} /> Decline
            </button>
            <button
              onClick={acceptCall}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: 10,
                border: 'none',
                background: '#0f6e56',
                color: '#ffffff',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
              }}
            >
              <Phone size={16} /> Accept
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. Active Call Screen
  if (activeCall && modalViewOpen) {
    const isConnecting = activeCall.status === 'connecting';
    const isOnHold = activeCall.isOnHold;

    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
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
            borderRadius: 18,
            padding: '24px 20px',
            maxWidth: 420,
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
          }}
        >
          {/* Minimize button */}
          <button
            onClick={() => setModalViewOpen(false)}
            title="Minimize call bar"
            style={{
              position: 'absolute',
              top: 14,
              right: 14,
              border: 'none',
              background: '#f2f2f7',
              borderRadius: '50%',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#555',
            }}
          >
            <Minimize2 size={16} />
          </button>

          {/* Caller Details */}
          <div style={{ textAlign: 'center', marginBottom: 20 }}>
            <div
              style={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                background: isOnHold ? '#fef3c7' : '#e1f5ee',
                color: isOnHold ? '#d97706' : '#0f6e56',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}
            >
              <Phone size={28} />
            </div>

            <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 4px', color: '#1a1a1a' }}>
              {activeCall.callerName}
            </h3>

            {/* Peer ID badge with reusable clipboard copy */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                background: '#f4f4f6',
                borderRadius: 6,
                padding: '4px 8px',
                fontSize: 12,
                fontFamily: 'monospace',
                color: '#555',
                marginBottom: 10,
              }}
            >
              <span>{activeCall.remotePeerId}</span>
              <button
                onClick={() => copy(activeCall.remotePeerId)}
                style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0 }}
                title="Copy Peer ID"
              >
                {copied ? <Check size={13} color="#0f6e56" /> : <Copy size={13} color="#888" />}
              </button>
            </div>

            {/* Status & Timer (using reusable formatDuration) */}
            <div style={{ fontSize: 14, fontWeight: 600, color: isOnHold ? '#d97706' : '#0f6e56' }}>
              {isConnecting
                ? 'Connecting...'
                : isOnHold
                ? 'Call On Hold'
                : `Connected · ${formatDuration(activeCall.durationSeconds)}`}
            </div>
          </div>

          {/* Error notice if any */}
          {errorMessage && (
            <div
              style={{
                background: '#fee2e2',
                color: '#dc2626',
                padding: '8px 12px',
                borderRadius: 8,
                fontSize: 12,
                marginBottom: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>{errorMessage}</span>
              <button
                onClick={clearError}
                style={{ border: 'none', background: 'transparent', color: '#dc2626', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
          )}

          {/* Reusable Call Controls (Mute, Hold, End Call) */}
          <div style={{ marginTop: 10 }}>
            <CallControls
              isMuted={activeCall.isMuted}
              isOnHold={activeCall.isOnHold}
              onToggleMute={toggleMute}
              onToggleHold={toggleHold}
              onEndCall={() => endCall('Completed')}
              variant="circle"
              disabled={isConnecting}
            />
          </div>
        </div>
      </div>
    );
  }

  return null;
};
