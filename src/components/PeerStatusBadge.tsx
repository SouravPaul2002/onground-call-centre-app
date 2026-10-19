import React from 'react';
import type { PeerStatus } from '../hooks/useCall';

export interface PeerStatusBadgeProps {
  status: PeerStatus;
}

/**
 * Reusable badge showing PeerJS connection status with color-coded dot and background.
 */
export const PeerStatusBadge: React.FC<PeerStatusBadgeProps> = ({ status }) => {
  const config = {
    initialising: { bg: '#fef3c7', text: '#d97706', label: 'Initialising' },
    ready: { bg: '#e1f5ee', text: '#0f6e56', label: 'Ready' },
    connecting: { bg: '#fef3c7', text: '#d97706', label: 'Connecting' },
    'in-call': { bg: '#dcfce7', text: '#15803d', label: 'In Call' },
    disconnected: { bg: '#fee2e2', text: '#dc2626', label: 'Disconnected' },
    error: { bg: '#fee2e2', text: '#dc2626', label: 'Error' },
  }[status] || { bg: '#f3f4f6', text: '#4b5563', label: status };

  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: '3px 8px',
        borderRadius: 12,
        background: config.bg,
        color: config.text,
        textTransform: 'capitalize',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
      }}
    >
      <span
        style={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: config.text,
        }}
      />
      {config.label}
    </span>
  );
};
