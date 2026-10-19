import { useState, useEffect, useRef } from 'react';
import Peer from 'peerjs';
import type { MediaConnection } from 'peerjs';
import { formatDuration } from '../utils/formatters';

export type PeerStatus = 'initialising' | 'ready' | 'connecting' | 'in-call' | 'disconnected' | 'error';
export type CallOutcome = 'Completed' | 'Declined' | 'Failed' | 'Disconnected';

export interface CallLogItem {
  id: string;
  localPeerId: string;
  remotePeerId: string;
  callerName: string;
  phone: string;
  direction: 'incoming' | 'outgoing';
  startedAt: string;
  endedAt: string;
  durationSeconds: number;
  durationText: string;
  outcome: CallOutcome;
  notes?: string;
}

export interface IncomingCallInfo {
  callerPeerId: string;
  callerName?: string;
  callObject: MediaConnection;
}

export interface ActiveCallState {
  remotePeerId: string;
  callerName?: string;
  phone?: string;
  direction: 'incoming' | 'outgoing';
  durationSeconds: number;
  isMuted: boolean;
  isOnHold: boolean;
  status: 'connecting' | 'connected' | 'on-hold';
}

export interface UseCallReturn {
  myPeerId: string;
  peerStatus: PeerStatus;
  errorMessage: string | null;
  incomingCall: IncomingCallInfo | null;
  activeCall: ActiveCallState | null;
  remoteAudioRef: React.RefObject<HTMLAudioElement | null>;
  callLogs: CallLogItem[];
  startCall: (remotePeerId: string, leadInfo?: { name?: string; phone?: string }) => Promise<boolean>;
  acceptCall: () => Promise<boolean>;
  declineCall: () => void;
  toggleMute: () => void;
  toggleHold: () => void;
  endCall: (outcome?: CallOutcome) => void;
  reconnectPeer: () => void;
  clearError: () => void;
  modalViewOpen: boolean;
  setModalViewOpen: (open: boolean) => void;
}

export const useCall = (): UseCallReturn => {
  // Simple state variables
  const [myPeerId, setMyPeerId] = useState('');
  const [peerStatus, setPeerStatus] = useState<PeerStatus>('initialising');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [incomingCall, setIncomingCall] = useState<IncomingCallInfo | null>(null);
  const [activeCall, setActiveCall] = useState<ActiveCallState | null>(null);
  const [callLogs, setCallLogs] = useState<CallLogItem[]>([]);
  const [modalViewOpen, setModalViewOpen] = useState(false);

  // References to hold WebRTC objects
  const peerRef = useRef<Peer | null>(null);
  const currentCallRef = useRef<MediaConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Setup hidden audio element for remote audio playback
  useEffect(() => {
    const audio = new Audio();
    audio.autoplay = true;
    remoteAudioRef.current = audio;
    return () => {
      audio.srcObject = null;
    };
  }, []);

  // Helper to stop microphone tracks
  const stopMicrophone = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }
  };

  // Helper to start the duration timer
  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveCall((prev) => {
        if (!prev) return null;
        return { ...prev, durationSeconds: prev.durationSeconds + 1 };
      });
    }, 1000);
  };

  // Helper to stop timer
  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  // Log a call to recent history
  const addCallLog = (
    remoteId: string,
    direction: 'incoming' | 'outgoing',
    outcome: CallOutcome,
    durationSecs: number,
    name?: string,
    phone?: string
  ) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newLog: CallLogItem = {
      id: `call-${Date.now()}`,
      localPeerId: myPeerId || peerRef.current?.id || '',
      remotePeerId: remoteId,
      callerName: name || `Peer: ${remoteId.slice(0, 8)}`,
      phone: phone || remoteId,
      direction,
      startedAt: timeStr,
      endedAt: timeStr,
      durationSeconds: durationSecs,
      durationText: formatDuration(durationSecs),
      outcome,
      notes: `WebRTC Voice Call · ${outcome}`,
    };
    setCallLogs((prev) => [newLog, ...prev]);
  };

  // Initialize PeerJS client
  const initPeer = () => {
    if (peerRef.current && !peerRef.current.destroyed) {
      peerRef.current.destroy();
    }

    // Simple new Peer() using PeerJS free cloud signalling
    const peer = new Peer();
    peerRef.current = peer;

    peer.on('open', (id) => {
      setMyPeerId(id);
      setPeerStatus('ready');
      setErrorMessage(null);
    });

    peer.on('call', (call) => {
      // If already in a call, ignore incoming call
      if (currentCallRef.current) {
        call.close();
        return;
      }
      setIncomingCall({
        callerPeerId: call.peer,
        callerName: `Peer: ${call.peer.slice(0, 8)}`,
        callObject: call,
      });
    });

    peer.on('error', (err: any) => {
      console.error('PeerJS error:', err);
      let msg = err.message || 'PeerJS connection error';
      if (err.type === 'peer-unavailable') {
        msg = 'Peer not found. Make sure the other user is online with that Peer ID.';
      }
      setErrorMessage(msg);
    });

    peer.on('disconnected', () => setPeerStatus('disconnected'));
    peer.on('close', () => setPeerStatus('disconnected'));
  };

  // Run on mount
  useEffect(() => {
    initPeer();
    return () => {
      stopMicrophone();
      stopTimer();
      if (peerRef.current && !peerRef.current.destroyed) {
        peerRef.current.destroy();
      }
    };
  }, []);

  // End active call
  const endCall = (outcome: CallOutcome = 'Completed') => {
    stopTimer();
    stopMicrophone();

    if (currentCallRef.current) {
      try {
        currentCallRef.current.close();
      } catch {
        // ignore
      }
      currentCallRef.current = null;
    }

    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null;
    }

    if (activeCall) {
      addCallLog(
        activeCall.remotePeerId,
        activeCall.direction,
        outcome,
        activeCall.durationSeconds,
        activeCall.callerName,
        activeCall.phone
      );
    }

    setActiveCall(null);
    setPeerStatus('ready');
    setModalViewOpen(false);
  };

  // Make an outgoing call
  const startCall = async (remotePeerId: string, leadInfo?: { name?: string; phone?: string }) => {
    const targetId = remotePeerId.trim();
    if (!targetId) {
      setErrorMessage('Please enter a Peer ID.');
      return false;
    }
    if (targetId === myPeerId) {
      setErrorMessage('You cannot call your own Peer ID. Open another browser tab/window to test.');
      return false;
    }

    try {
      setErrorMessage(null);
      // Ask for microphone
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;

      // Start call
      const call = peerRef.current!.call(targetId, stream);
      currentCallRef.current = call;

      setActiveCall({
        remotePeerId: targetId,
        callerName: leadInfo?.name || `Peer: ${targetId.slice(0, 8)}`,
        phone: leadInfo?.phone || targetId,
        direction: 'outgoing',
        durationSeconds: 0,
        isMuted: false,
        isOnHold: false,
        status: 'connecting',
      });

      setPeerStatus('connecting');
      setModalViewOpen(true);

      // When the other person answers and streams audio
      call.on('stream', (remoteStream) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play().catch(() => {});
        }
        setActiveCall((prev) => (prev ? { ...prev, status: 'connected' } : null));
        setPeerStatus('in-call');
        startTimer();
      });

      // When call ends or disconnects
      call.on('close', () => endCall('Completed'));
      call.on('error', () => {
        setErrorMessage('Call disconnected or rejected.');
        endCall('Failed');
      });

      return true;
    } catch (err: any) {
      setErrorMessage(err.message || 'Could not access microphone.');
      endCall('Failed');
      return false;
    }
  };

  // Answer an incoming call
  const acceptCall = async () => {
    if (!incomingCall) return false;

    try {
      setErrorMessage(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      localStreamRef.current = stream;

      const call = incomingCall.callObject;
      currentCallRef.current = call;

      // Answer call with local microphone stream
      call.answer(stream);

      setActiveCall({
        remotePeerId: incomingCall.callerPeerId,
        callerName: incomingCall.callerName || `Peer: ${incomingCall.callerPeerId.slice(0, 8)}`,
        direction: 'incoming',
        durationSeconds: 0,
        isMuted: false,
        isOnHold: false,
        status: 'connecting',
      });

      setIncomingCall(null);
      setPeerStatus('in-call');
      setModalViewOpen(true);

      call.on('stream', (remoteStream) => {
        if (remoteAudioRef.current) {
          remoteAudioRef.current.srcObject = remoteStream;
          remoteAudioRef.current.play().catch(() => {});
        }
        setActiveCall((prev) => (prev ? { ...prev, status: 'connected' } : null));
        startTimer();
      });

      call.on('close', () => endCall('Completed'));
      call.on('error', () => {
        setErrorMessage('Call error.');
        endCall('Failed');
      });

      return true;
    } catch (err: any) {
      setErrorMessage(err.message || 'Microphone permission denied.');
      declineCall();
      return false;
    }
  };

  // Decline incoming call
  const declineCall = () => {
    if (incomingCall) {
      addCallLog(incomingCall.callerPeerId, 'incoming', 'Declined', 0, incomingCall.callerName);
      try {
        incomingCall.callObject.close();
      } catch {
        // ignore
      }
      setIncomingCall(null);
    }
  };

  // Toggle Mute (turn microphone track on/off)
  const toggleMute = () => {
    if (!localStreamRef.current) return;
    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setActiveCall((prev) => (prev ? { ...prev, isMuted: !audioTrack.enabled } : null));
    }
  };

  // Toggle Hold (stop sending audio while on hold)
  const toggleHold = () => {
    if (!localStreamRef.current) return;
    const audioTrack = localStreamRef.current.getAudioTracks()[0];
    if (audioTrack) {
      const nextHold = !activeCall?.isOnHold;
      audioTrack.enabled = !nextHold;
      setActiveCall((prev) =>
        prev
          ? {
              ...prev,
              isOnHold: nextHold,
              status: nextHold ? 'on-hold' : 'connected',
            }
          : null
      );
    }
  };

  return {
    myPeerId,
    peerStatus,
    errorMessage,
    incomingCall,
    activeCall,
    remoteAudioRef,
    callLogs,
    startCall,
    acceptCall,
    declineCall,
    toggleMute,
    toggleHold,
    endCall,
    reconnectPeer: initPeer,
    clearError: () => setErrorMessage(null),
    modalViewOpen,
    setModalViewOpen,
  };
};
