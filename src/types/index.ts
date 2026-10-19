export type PageId =
  | 'dashboard'
  | 'calls-to-make'
  | 'incoming'
  | 'recent'
  | 'practise-call'
  | 'calendar'
  | 'pulse'
  | 'pulse-channel';

export interface LeadSignal {
  id: string;
  category: string;
  icon: 'currency' | 'document' | 'shield';
  description: string;
}

export interface Lead {
  id: string;
  name: string;
  initials: string;
  phone: string;
  product: string;
  expectedValue: number;
  score: number;
  icpScore: number;
  leadIntentScore: number;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'MISSED';
  slaHoursLeft: number;
  quoteStatus: string;
  storeName: string;
  notes: string;
  signals: LeadSignal[];
  cumulativeMissed: number;
  timeline: {
    time: string;
    action: string;
    detail: string;
  }[];
  badge?: string;
  badgeBg?: string;
  badgeColor?: string;
  statusLabel?: string;
  statusColor?: string;
  slaNote?: string | null;
  quoteOn?: boolean;
  subscores?: {
    label: string;
    pct: number;
    color: string;
  }[];
  preCallNotes?: string[];
  journey?: {
    date: string;
    channel: string;
    icon: string;
    color: string;
    text: string;
  }[];
  actionsType?: 'open' | 'ageing' | 'cold';
}

export interface MissedCall {
  id: string;
  callerName: string;
  phone: string;
  timeContext: string;
  statusTag: string;
  expectedValue: number | null;
  isNewContact?: boolean;
}

export interface RecentCallRecord {
  id: string;
  callerName: string;
  phone: string;
  timestamp: string;
  duration: string;
  durationSeconds: number;
  type: 'incoming' | 'outgoing' | 'missed' | 'practice';
  outcome?: string;
  product?: string;
  qaScore?: number;
  csatScore?: number;
  sopCompliance?: {
    greetingIn10s: boolean;
    problemIdentified: boolean;
    objectionHandled: boolean;
    closingAttempted: boolean;
  };
  transcript?: {
    speaker: 'Agent' | 'Customer' | 'Coach';
    text: string;
    time: string;
  }[];
  coachingNotes?: string[];
}

export interface WaitingCaller {
  id: string;
  name: string;
  issue: string;
  waitTime: string;
  priority: 'high' | 'medium';
}

export interface DashboardTask {
  id: string;
  title: string;
  badge: string;
  type: 'callbacks' | 'hot-leads' | 'outcome';
  count: number;
}

export interface CalendarEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  type: 'visit' | 'coaching' | 'meeting' | 'callback';
  attendees: string;
  notes?: string;
  sharedWith?: string[];
}

export interface ChatMessage {
  id: string;
  sender: string;
  senderInitials: string;
  timestamp: string;
  isAgent: boolean;
  type?: 'regular' | 'stakeholder' | 'issue' | 'resolution' | 'kudos';
  badgeTitle?: string;
  content: string;
  kudosText?: string;
}

export interface PulseAgent {
  id: string;
  name: string;
  type: 'role' | 'task';
  category: string;
  description: string;
  metricLabel?: string;
  metricValue?: string;
  membersCount?: number;
}

export interface ActiveCallSession {
  leadName: string;
  leadPhone: string;
  product?: string;
  type: 'in-app' | 'phone' | 'practice';
  status: 'connecting' | 'connected' | 'on-hold' | 'ended';
  startedAt: number;
  durationSeconds: number;
  isMuted: boolean;
  isHold: boolean;
  aiPersona?: string;
  transcript: {
    speaker: 'Agent' | 'Customer';
    text: string;
    timestamp: string;
  }[];
}

export interface PlanOutgoingLead {
  id: string;
  name: string;
  initials: string;
  avatarBg: string;
  avatarColor: string;
  interest: string;
  product: string;
  crossSell: string;
  emi: string;
  attractivenessScore: number;
  expectedValue: number;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  phone: string;
  notes: string[];
  journey: {
    date: string;
    channel: string;
    icon: string;
    color: string;
    text: string;
  }[];
}

export interface PractiseSOP {
  id: string;
  icon: string;
  name: string;
  category: 'objection' | 'technology' | 'pitch' | 'closing' | 'general';
  tip: string;
  example: string;
  watch: string[];
  isFocus?: boolean;
}

export interface RoleplayPersona {
  id: string;
  name: string;
  avatar: string;
  title: string;
  difficulty: 'Medium' | 'Hard' | 'Expert';
  productInterest: string;
  budget: string;
  keyObjection: string;
  openingCustomerLine: string;
  dialogueTree: {
    customerLine: string;
    suggestedResponses: {
      label: string;
      text: string;
      isRecommended?: boolean;
    }[];
  }[];
}


