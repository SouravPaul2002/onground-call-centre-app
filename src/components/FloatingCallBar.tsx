import React from 'react';
import type { UseCallReturn } from '../hooks/useCall';
import {
  Mic,
  MicOff,
  Pause,
  Play,
  PhoneOff,
  Maximize2,
  Phone,
} from 'lucide-react';

interface FloatingCallBarProps {
  call: UseCallReturn;
}

export const FloatingCallBar: React.FC<FloatingCallBarProps> = ({ call }) => {
  const {
    activeCall,
    modalViewOpen,
    setModalViewOpen,
    toggleMute,
    toggleHold,
    endCall,
  } = call;

  if (!activeCall || modalViewOpen) return null;

  const isConnecting = activeCall.status === 'connecting';
  const isHold = activeCall.isOnHold;
  const isMuted = activeCall.isMuted;

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 9000,
        background: '#123c30',
        color: '#ffffff',
        borderRadius: 18,
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.35)',
        border: '1px solid rgba(93, 202, 165, 0.4)',
        animation: 'modalRise 0.2s ease',
      }}
    >
      {/* Status Pulsing Dot */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: '50%',
            background: isConnecting
              ? '#eab308'
              : isHold
              ? '#3b82f6'
              : '#10b981',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            boxShadow: !isConnecting && !isHold ? '0 0 10px rgba(16, 185, 129, 0.6)' : 'none',
          }}
        >
          <Phone size={16} />
        </div>

        <div>
          <div style={{ fontSize: 13.5, fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>
            {activeCall.callerName || `Peer: ${activeCall.remotePeerId.slice(0, 8)}...`}
          </div>
          <div style={{ fontSize: 11.5, color: '#a9c4ba', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>{isConnecting ? 'Connecting...' : isHold ? 'On Hold' : 'In Call'}</span>
            {!isConnecting && (
              <>
                <span>•</span>
                <span style={{ fontWeight: 700, color: '#7ee0bb' }}>
                  {formatTimer(activeCall.durationSeconds)}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Control Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        {/* Mute */}
        <button
          onClick={toggleMute}
          disabled={isConnecting}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
          style={{
            background: isMuted ? '#ef4444' : 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: 10,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: isConnecting ? 'not-allowed' : 'pointer',
            opacity: isConnecting ? 0.5 : 1,
          }}
          className="hover:opacity-90"
        >
          {isMuted ? <MicOff size={15} /> : <Mic size={15} />}
        </button>

        {/* Hold */}
        <button
          onClick={toggleHold}
          disabled={isConnecting}
          title={isHold ? 'Resume call' : 'Hold call'}
          style={{
            background: isHold ? '#2563eb' : 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: 10,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: isConnecting ? 'not-allowed' : 'pointer',
            opacity: isConnecting ? 0.5 : 1,
          }}
          className="hover:opacity-90"
        >
          {isHold ? <Play size={15} /> : <Pause size={15} />}
        </button>

        {/* End Call */}
        <button
          onClick={() => endCall('Completed')}
          title="End Call"
          style={{
            background: '#dc2626',
            border: 'none',
            borderRadius: 10,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
          }}
          className="hover:bg-red-700"
        >
          <PhoneOff size={15} />
        </button>

        {/* Expand to Modal */}
        <button
          onClick={() => setModalViewOpen(true)}
          title="Expand to Full Modal"
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: 10,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            cursor: 'pointer',
            marginLeft: 4,
          }}
          className="hover:bg-white/25"
        >
          <Maximize2 size={15} />
        </button>
      </div>
    </div>
  );
};
