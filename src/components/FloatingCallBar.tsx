import React from 'react';
import type { UseCallReturn } from '../hooks/useCall';
import { formatDuration } from '../utils/formatters';
import { CallControls } from './CallControls';
import { Maximize2, Phone } from 'lucide-react';

interface FloatingCallBarProps {
  call: UseCallReturn;
}

export const FloatingCallBar: React.FC<FloatingCallBarProps> = ({ call }) => {
  const { activeCall, modalViewOpen, setModalViewOpen, toggleMute, toggleHold, endCall } = call;

  if (!activeCall || modalViewOpen) return null;

  const isConnecting = activeCall.status === 'connecting';
  const isHold = activeCall.isOnHold;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        zIndex: 9000,
        background: '#123c30',
        color: '#ffffff',
        borderRadius: 14,
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Icon & Caller Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: isConnecting ? '#eab308' : isHold ? '#d97706' : '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <Phone size={15} />
        </div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 700 }}>
            {activeCall.callerName || activeCall.remotePeerId.slice(0, 8)}
          </div>
          <div style={{ fontSize: 11, color: '#a9c4ba' }}>
            {isConnecting ? 'Connecting...' : isHold ? 'On Hold' : formatDuration(activeCall.durationSeconds)}
          </div>
        </div>
      </div>

      {/* Reusable compact Call Controls */}
      <CallControls
        isMuted={activeCall.isMuted}
        isOnHold={activeCall.isOnHold}
        onToggleMute={toggleMute}
        onToggleHold={toggleHold}
        onEndCall={() => endCall('Completed')}
        variant="compact"
        disabled={isConnecting}
      />

      {/* Expand button */}
      <button
        onClick={() => setModalViewOpen(true)}
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: 'none',
          borderRadius: 8,
          width: 30,
          height: 30,
          color: '#fff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="Expand full call modal"
      >
        <Maximize2 size={14} />
      </button>
    </div>
  );
};
