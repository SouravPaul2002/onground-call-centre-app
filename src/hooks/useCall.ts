import { useState, useEffect, useRef, useCallback } from 'react';
import Peer from 'peerjs';
import type { MediaConnection } from 'peerjs';

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
  connectedAt: number | null;
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

const formatSeconds = (secs: number) => {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
};

export const useCall = (): UseCallReturn => {
  const [myPeerId, setMyPeerId] = useState<string>('');
  const [peerStatus, setPeerStatus] = useState<PeerStatus>('initialising');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [incomingCall, setIncomingCall] = useState<IncomingCallInfo | null>(null);
  const [activeCall, setActiveCall] = useState<ActiveCallState | null>(null);
  const [callLogs, setCallLogs] = useState<CallLogItem[]>([]);
  const [modalViewOpen, setModalViewOpen] = useState(false);

  // Audio & media refs
  const peerRef = useRef<Peer | null>(null);
  const currentCallRef = useRef<MediaConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const remoteStreamRef = useRef<MediaStream | null>(null);
  const remoteAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audio.autoplay = true;
    remoteAudioRef.current = audio;
    return () => {
      audio.srcObject = null;
    };
  }, []);

  // Timer refs
  const durationTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const callStartTimeRef = useRef<number | null>(null);

  // Active call state ref for callbacks
  const activeCallRef = useRef<ActiveCallState | null>(null);
  useEffect(() => {
    activeCallRef.current = activeCall;
  }, [activeCall]);

  // Add a call record to call logs
  const logCall = useCallback(
    (
      remoteId: string,
      direction: 'incoming' | 'outgoing',
      outcome: CallOutcome,
      durationSecs: number,
      name?: string,
      phone?: string
    ) => {
      const now = new Date();
      const startTime = callStartTimeRef.current ? new Date(callStartTimeRef.current) : now;
      const newLog: CallLogItem = {
        id: `webrtc-${Date.now()}`,
        localPeerId: peerRef.current?.id || '',
        remotePeerId: remoteId,
        callerName: name || `Peer (${remoteId.slice(0, 8)})`,
        phone: phone || remoteId,
        direction,
        startedAt: startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        endedAt: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        durationSeconds: durationSecs,
        durationText: formatSeconds(durationSecs),
        outcome,
        notes: `WebRTC Voice Call · ${outcome} · Local: ${peerRef.current?.id || 'n/a'}`,
      };

      setCallLogs((prev) => [newLog, ...prev]);
    },
    []
  );

  // Stop local media tracks
  const stopLocalStream = useCallback(() => {
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        track.stop();
      });
      localStreamRef.current = null;
    }
  }, []);

  // Stop timer and clean call
  const cleanUpCallResources = useCallback(() => {
    if (durationTimerRef.current) {
      clearInterval(durationTimerRef.current);
      durationTimerRef.current = null;
    }

    if (currentCallRef.current) {
      try {
        currentCallRef.current.close();
      } catch {
        // ignore close errors
      }
      currentCallRef.current = null;
    }

    stopLocalStream();

    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = null;
    }
    remoteStreamRef.current = null;
    callStartTimeRef.current = null;
  }, [stopLocalStream]);

  // End an active call cleanly
  const endCall = useCallback(
    (outcome: CallOutcome = 'Completed') => {
      const current = activeCallRef.current;
      const durationSecs = current?.durationSeconds || 0;

      if (current) {
        logCall(
          current.remotePeerId,
          current.direction,
          outcome,
          durationSecs,
          current.callerName,
          current.phone
        );
      }

      cleanUpCallResources();
      setActiveCall(null);
      setPeerStatus('ready');
    },
    [cleanUpCallResources, logCall]
  );

  // Attach remote stream to audio element
  const playRemoteStream = useCallback((stream: MediaStream) => {
    remoteStreamRef.current = stream;
    if (remoteAudioRef.current) {
      remoteAudioRef.current.srcObject = stream;
      remoteAudioRef.current
        .play()
        .catch((err) => {
          console.warn('[useCall] Autoplay was prevented by browser:', err);
          setErrorMessage('Audio autoplay blocked by browser. Click anywhere on the page to enable sound.');
        });
    }
  }, []);

  // Start duration timer once connected
  const startTimer = useCallback(() => {
    if (durationTimerRef.current) clearInterval(durationTimerRef.current);
    callStartTimeRef.current = Date.now();

    durationTimerRef.current = setInterval(() => {
      setActiveCall((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          durationSeconds: prev.durationSeconds + 1,
        };
      });
    }, 1000);
  }, []);

  // Initialize PeerJS instance
  const initPeer = useCallback(() => {
    // If an existing instance exists, destroy it first
    if (peerRef.current && !peerRef.current.destroyed) {
      peerRef.current.destroy();
    }

    setPeerStatus('initialising');
    setErrorMessage(null);

    try {
      const peer = new Peer({
        config: {
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:global.stun.twilio.com:3478' },
          ],
        },
      });

      peerRef.current = peer;

      peer.on('open', (id) => {
        setMyPeerId(id);
        setPeerStatus('ready');
        setErrorMessage(null);
      });

      peer.on('disconnected', () => {
        setPeerStatus('disconnected');
      });

      peer.on('close', () => {
        setPeerStatus('disconnected');
      });

      peer.on('error', (err: any) => {
        console.error('[PeerJS Error]', err);
        const errType = err.type || '';
        let msg = err.message || 'An error occurred with PeerJS signalling';

        if (errType === 'peer-unavailable') {
          msg = 'The remote peer ID was not found or is currently offline. Please verify the Peer ID.';
        } else if (errType === 'network') {
          msg = 'Network connection to PeerJS cloud server lost. Check your internet connection.';
        } else if (errType === 'unavailable-id') {
          msg = 'Peer ID is already in use. Please reconnect.';
        } else if (errType === 'browser-incompatible') {
          msg = 'Your browser does not support WebRTC voice calls.';
        }

        setErrorMessage(msg);

        // If an active call is ongoing and fails
        if (activeCallRef.current) {
          endCall('Failed');
        }
      });

      // Listen for incoming voice calls
      peer.on('call', (mediaConn) => {
        // If already in a call, reject subsequent incoming calls
        if (activeCallRef.current) {
          mediaConn.close();
          return;
        }

        setIncomingCall({
          callerPeerId: mediaConn.peer,
          callerName: `Peer: ${mediaConn.peer.slice(0, 8)}...`,
          callObject: mediaConn,
        });
      });
    } catch (e: any) {
      console.error('[useCall] Peer init error:', e);
      setPeerStatus('error');
      setErrorMessage(e?.message || 'Failed to initialize PeerJS WebRTC client');
    }
  }, [endCall]);

  // Initialise on mount
  useEffect(() => {
    initPeer();

    return () => {
      cleanUpCallResources();
      if (peerRef.current && !peerRef.current.destroyed) {
        peerRef.current.destroy();
      }
    };
  }, [cleanUpCallResources, initPeer]);

  // Decline incoming call
  const declineCall = useCallback(() => {
    if (incomingCall) {
      logCall(incomingCall.callerPeerId, 'incoming', 'Declined', 0, incomingCall.callerName);
      try {
        incomingCall.callObject.close();
      } catch {
        // ignore
      }
      setIncomingCall(null);
    }
  }, [incomingCall, logCall]);

  // Accept incoming call
  const acceptCall = useCallback(async (): Promise<boolean> => {
    if (!incomingCall) return false;

    try {
      setErrorMessage(null);
      // 1. Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
        video: false,
      });

      localStreamRef.current = stream;

      const mediaConn = incomingCall.callObject;
      currentCallRef.current = mediaConn;

      // 2. Answer with local microphone stream
      mediaConn.answer(stream);

      setActiveCall({
        remotePeerId: incomingCall.callerPeerId,
        callerName: incomingCall.callerName,
        direction: 'incoming',
        connectedAt: null,
        durationSeconds: 0,
        isMuted: false,
        isOnHold: false,
        status: 'connecting',
      });

      setIncomingCall(null);
      setPeerStatus('in-call');
      setModalViewOpen(true);

      // 3. Listen for remote audio stream
      mediaConn.on('stream', (remoteStream) => {
        playRemoteStream(remoteStream);
        setActiveCall((prev) => (prev ? { ...prev, status: 'connected', connectedAt: Date.now() } : null));
        startTimer();
      });

      // 4. Remote hang-up or disconnect
      mediaConn.on('close', () => {
        endCall('Completed');
      });

      mediaConn.on('error', (err) => {
        console.error('[useCall] Call error:', err);
        setErrorMessage('Voice connection dropped or encountered an error.');
        endCall('Failed');
      });

      return true;
    } catch (err: any) {
      console.error('[useCall] Accept error:', err);
      let msg = 'Failed to access microphone. Please allow microphone permissions.';
      if (err.name === 'NotFoundError') {
        msg = 'No microphone device found on your system.';
      } else if (err.name === 'NotAllowedError') {
        msg = 'Microphone permission was denied. Please allow microphone access in your browser settings.';
      }
      setErrorMessage(msg);
      declineCall();
      return false;
    }
  }, [declineCall, endCall, incomingCall, playRemoteStream, startTimer]);

  // Make an outgoing voice call
  const startCall = useCallback(
    async (
      remotePeerId: string,
      leadInfo?: { name?: string; phone?: string }
    ): Promise<boolean> => {
      const cleanRemoteId = remotePeerId.trim();

      if (!cleanRemoteId) {
        setErrorMessage('Please enter a valid remote Peer ID.');
        return false;
      }

      if (cleanRemoteId === myPeerId) {
        setErrorMessage('Cannot call your own Peer ID. Open the app in another browser/window to test.');
        return false;
      }

      if (!peerRef.current || peerStatus !== 'ready') {
        setErrorMessage('Peer client is not ready. Please wait or click Reconnect.');
        return false;
      }

      try {
        setErrorMessage(null);

        // 1. Request microphone permission
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: true,
            noiseSuppression: true,
            autoGainControl: true,
          },
          video: false,
        });

        localStreamRef.current = stream;

        // 2. Place call to remote peer
        const mediaConn = peerRef.current.call(cleanRemoteId, stream);
        currentCallRef.current = mediaConn;

        setActiveCall({
          remotePeerId: cleanRemoteId,
          callerName: leadInfo?.name || `Peer: ${cleanRemoteId.slice(0, 8)}...`,
          phone: leadInfo?.phone || cleanRemoteId,
          direction: 'outgoing',
          connectedAt: null,
          durationSeconds: 0,
          isMuted: false,
          isOnHold: false,
          status: 'connecting',
        });

        setPeerStatus('connecting');
        setModalViewOpen(true);

        // 3. Listen for remote audio stream
        mediaConn.on('stream', (remoteStream) => {
          playRemoteStream(remoteStream);
          setActiveCall((prev) =>
            prev ? { ...prev, status: 'connected', connectedAt: Date.now() } : null
          );
          setPeerStatus('in-call');
          startTimer();
        });

        // 4. Remote hang-up or disconnect
        mediaConn.on('close', () => {
          endCall('Completed');
        });

        mediaConn.on('error', (err) => {
          console.error('[useCall] Outgoing call error:', err);
          setErrorMessage('Connection failed or was rejected by remote peer.');
          endCall('Failed');
        });

        return true;
      } catch (err: any) {
        console.error('[useCall] Start call error:', err);
        let msg = 'Failed to access microphone. Please allow microphone permissions.';
        if (err.name === 'NotFoundError') {
          msg = 'No microphone device found on your system.';
        } else if (err.name === 'NotAllowedError') {
          msg = 'Microphone permission was denied. Please allow microphone access in your browser settings.';
        }
        setErrorMessage(msg);
        cleanUpCallResources();
        setActiveCall(null);
        setPeerStatus('ready');
        return false;
      }
    },
    [cleanUpCallResources, endCall, myPeerId, peerStatus, playRemoteStream, startTimer]
  );

  // Toggle Mute
  const toggleMute = useCallback(() => {
    if (!localStreamRef.current) return;
    const audioTracks = localStreamRef.current.getAudioTracks();
    if (audioTracks.length === 0) return;

    setActiveCall((prev) => {
      if (!prev) return null;
      const nextMuted = !prev.isMuted;
      audioTracks.forEach((t) => {
        t.enabled = !nextMuted;
      });
      return { ...prev, isMuted: nextMuted };
    });
  }, []);

  // Toggle Hold
  const toggleHold = useCallback(() => {
    if (!localStreamRef.current) return;
    const audioTracks = localStreamRef.current.getAudioTracks();

    setActiveCall((prev) => {
      if (!prev) return null;
      const nextHold = !prev.isOnHold;
      audioTracks.forEach((t) => {
        // When on hold, disable mic track; when resumed, respect mute state
        t.enabled = nextHold ? false : !prev.isMuted;
      });
      return {
        ...prev,
        isOnHold: nextHold,
        status: nextHold ? 'on-hold' : 'connected',
      };
    });
  }, []);

  // Reconnect PeerJS
  const reconnectPeer = useCallback(() => {
    initPeer();
  }, [initPeer]);

  // Clear error message
  const clearError = useCallback(() => {
    setErrorMessage(null);
  }, []);

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
    reconnectPeer,
    clearError,
    modalViewOpen,
    setModalViewOpen,
  };
};
