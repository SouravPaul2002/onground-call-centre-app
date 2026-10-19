/**
 * Utility functions for formatting call durations, peer IDs, and timestamps.
 */

/**
 * Formats a duration in seconds into MM:SS format (e.g. 75 -> "01:15")
 */
export const formatDuration = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
};

/**
 * Truncates a long Peer ID for display (e.g. "52c9db84-4822..." -> "52c9db84...")
 */
export const truncatePeerId = (id: string, maxLength = 8): string => {
  if (!id) return '';
  if (id.length <= maxLength) return id;
  return `${id.slice(0, maxLength)}...`;
};
