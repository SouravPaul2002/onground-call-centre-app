import React from 'react';
import { Mic, MicOff, Pause, Play, PhoneOff } from 'lucide-react';

export interface CallControlsProps {
  isMuted: boolean;
  isOnHold: boolean;
  onToggleMute: () => void;
  onToggleHold: () => void;
  onEndCall: () => void;
  variant?: 'circle' | 'compact' | 'pill';
  disabled?: boolean;
}

/**
 * Reusable call controls component providing Mute, Hold, and End Call buttons.
 * Used in ActiveCallModal, FloatingCallBar, and PractiseCall.
 */
export const CallControls: React.FC<CallControlsProps> = ({
  isMuted,
  isOnHold,
  onToggleMute,
  onToggleHold,
  onEndCall,
  variant = 'circle',
  disabled = false,
}) => {
  // 1. Compact variant (used in FloatingCallBar)
  if (variant === 'compact') {
    return (
      <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
        <button
          onClick={onToggleMute}
          disabled={disabled}
          style={{
            background: isMuted ? '#ef4444' : 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: 8,
            width: 30,
            height: 30,
            color: '#ffffff',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled ? 0.5 : 1,
          }}
          title={isMuted ? 'Unmute microphone' : 'Mute microphone'}
        >
          {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
        </button>

        <button
          onClick={onToggleHold}
          disabled={disabled}
          style={{
            background: isOnHold ? '#d97706' : 'rgba(255, 255, 255, 0.15)',
            border: 'none',
            borderRadius: 8,
            width: 30,
            height: 30,
            color: '#ffffff',
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: disabled ? 0.5 : 1,
          }}
          title={isOnHold ? 'Resume call' : 'Hold call'}
        >
          {isOnHold ? <Play size={14} /> : <Pause size={14} />}
        </button>

        <button
          onClick={onEndCall}
          style={{
            background: '#dc2626',
            border: 'none',
            borderRadius: 8,
            width: 30,
            height: 30,
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          title="End Call"
        >
          <PhoneOff size={14} />
        </button>
      </div>
    );
  }

  // 2. Pill variant with text labels (used in PractiseCall)
  if (variant === 'pill') {
    return (
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button
          onClick={onToggleMute}
          disabled={disabled}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid #0f6e56',
            background: isMuted ? '#fee2e2' : '#ffffff',
            color: isMuted ? '#dc2626' : '#0f6e56',
            fontSize: 13,
            fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {isMuted ? <MicOff size={14} /> : <Mic size={14} />}
          {isMuted ? 'Unmute' : 'Mute'}
        </button>

        <button
          onClick={onToggleHold}
          disabled={disabled}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: '1px solid #0f6e56',
            background: isOnHold ? '#fef3c7' : '#ffffff',
            color: isOnHold ? '#d97706' : '#0f6e56',
            fontSize: 13,
            fontWeight: 600,
            cursor: disabled ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          {isOnHold ? <Play size={14} /> : <Pause size={14} />}
          {isOnHold ? 'Resume' : 'Hold'}
        </button>

        <button
          onClick={onEndCall}
          style={{
            padding: '8px 14px',
            borderRadius: 8,
            border: 'none',
            background: '#dc2626',
            color: '#ffffff',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <PhoneOff size={14} /> End Call
        </button>
      </div>
    );
  }

  // 3. Default Circle variant (used in ActiveCallModal)
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 14 }}>
      <button
        onClick={onToggleMute}
        disabled={disabled}
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: '1px solid #e5e5ea',
          background: isMuted ? '#fee2e2' : '#f9f9fb',
          color: isMuted ? '#dc2626' : '#333333',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={isMuted ? 'Unmute' : 'Mute'}
      >
        {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
      </button>

      <button
        onClick={onToggleHold}
        disabled={disabled}
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: '1px solid #e5e5ea',
          background: isOnHold ? '#fef3c7' : '#f9f9fb',
          color: isOnHold ? '#d97706' : '#333333',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title={isOnHold ? 'Resume' : 'Hold'}
      >
        {isOnHold ? <Play size={20} /> : <Pause size={20} />}
      </button>

      <button
        onClick={onEndCall}
        style={{
          width: 46,
          height: 46,
          borderRadius: '50%',
          border: 'none',
          background: '#dc2626',
          color: '#ffffff',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        title="End Call"
      >
        <PhoneOff size={20} />
      </button>
    </div>
  );
};
