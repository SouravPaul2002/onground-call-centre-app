import type {
  Lead,
  MissedCall,
  RecentCallRecord,
  WaitingCaller,
  DashboardTask,
  CalendarEvent,
  ChatMessage,
  PulseAgent,
  PlanOutgoingLead,
  PractiseSOP,
  RoleplayPersona,
} from '../types';

export const AGENT_PROFILE = {
  name: 'Arvind Rajan',
  initials: 'AR',
  role: 'Call Centre Specialist',
  store: 'The Sleep Company · Call Centre',
  location: 'Koramangala, Bengaluru',
  score: 76,
  scoreDelta: '+13',
  rank: '#3',
  status: 'On Queue' as const,
  earningsMonth: 5200,
  earningsCoached: 1700,
  earningsTarget: 6000,
};

export const KPI_DATA = [
  {
    id: 'score',
    label: 'OG SCORE™',
    value: '76',
    delta: '▲ 13',
    deltaType: 'positive' as const,
    subtext: 'Top 10% on shift',
  },
  {
    id: 'aht',
    label: 'AVG HANDLE TIME',
    value: '4m 12s',
    delta: '▼ 51s',
    deltaType: 'positive' as const,
    subtext: 'Within target < 5m',
  },
  {
    id: 'csat',
    label: 'CSAT TODAY',
    value: '94%',
    delta: '▲ 2pt',
    deltaType: 'positive' as const,
    subtext: 'Target 90%',
  },
  {
    id: 'queue',
    label: 'IN QUEUE',
    value: '2',
    delta: '● live',
    deltaType: 'neutral' as const,
    subtext: 'Avg wait: 3m 13s',
  },
];

export const WHO_IS_WAITING: WaitingCaller[] = [
  {
    id: 'w1',
    name: 'Priya Iyer',
    issue: 'Likely billing dispute — flagged before',
    waitTime: '4m 29s',
    priority: 'high',
  },
  {
    id: 'w2',
    name: 'Suresh Nair',
    issue: 'Plan upgrade enquiry',
    waitTime: '1m 58s',
    priority: 'medium',
  },
];

export const CALLS_HANDLED_7DAYS = [
  { day: 'Mon', calls: 12, target: 20 },
  { day: 'Tue', calls: 22, target: 20 },
  { day: 'Wed', calls: 16, target: 20 },
  { day: 'Thu', calls: 26, target: 20 },
  { day: 'Fri', calls: 20, target: 20 },
  { day: 'Sat', calls: 12, target: 20 },
  { day: 'Today', calls: 14, target: 20, isCurrent: true },
];

export const CSAT_TREND_7DAYS = [
  { day: 'Mon', csat: 88 },
  { day: 'Tue', csat: 90 },
  { day: 'Wed', csat: 89 },
  { day: 'Thu', csat: 92 },
  { day: 'Fri', csat: 89 },
  { day: 'Sat', csat: 92 },
  { day: 'Today', csat: 94, isCurrent: true },
];

export const DASHBOARD_TASKS: DashboardTask[] = [
  {
    id: 'task-callbacks',
    title: '2 callbacks',
    badge: 'next 4:30pm',
    type: 'callbacks',
    count: 2,
  },
  {
    id: 'task-hot-leads',
    title: '2 hot leads',
    badge: 'untouched 24h',
    type: 'hot-leads',
    count: 2,
  },
  {
    id: 'task-outcome',
    title: '1 outcome',
    badge: 'to log',
    type: 'outcome',
    count: 1,
  },
];

export const MOCK_LEADS: Lead[] = [
  {
    id: 'lead-1',
    name: 'Mukunda',
    initials: 'MK',
    phone: '+91 98765 43210',
    product: 'Ortho GRID · ₹8,490',
    expectedValue: 8490,
    score: 90,
    icpScore: 87,
    leadIntentScore: 91,
    status: 'OPEN',
    slaHoursLeft: 2,
    badge: '2h left',
    badgeBg: '#e1f5ee',
    badgeColor: '#0f6e56',
    statusLabel: 'Open',
    statusColor: '#1d9e75',
    quoteOn: true,
    quoteStatus: 'Quote to be given to customer',
    storeName: 'Koramangala Experience Store',
    notes: 'Inquired about back-support firmness for lower back pain. Very responsive.',
    cumulativeMissed: 2,
    subscores: [
      { label: 'Budget Fit', pct: 87, color: '#1d9e75' },
      { label: 'Need Match', pct: 72, color: '#c8860a' },
      { label: 'Decision Stage', pct: 60, color: '#7c3aed' },
    ],
    slaNote: null,
    preCallNotes: [
      'Asked about EMI on the Ortho GRID — lead with the 12-month zero-interest plan.',
      'Price-sensitive — compared us with a competitor, so mention the 100-night trial to reduce risk.',
      'Prefers evening calls, after 6pm.',
    ],
    signals: [
      {
        id: 's1',
        category: 'Financing Related',
        icon: 'currency',
        description:
          'Asked specifically about EMI options on the Ortho GRID — budget is a live concern, not a blocker',
      },
      {
        id: 's2',
        category: 'Quotation Demanded',
        icon: 'document',
        description:
          'Compared pricing with a competitor before reaching out — price-anchored, expects a competitive number',
      },
      {
        id: 's3',
        category: 'Warranty Related',
        icon: 'shield',
        description:
          "Hasn't raised this yet — worth proactively mentioning the 100-night trial to reduce perceived risk",
      },
    ],
    journey: [
      {
        date: '18 May',
        channel: 'Meta Ad',
        icon: '📘',
        color: '#1877f2',
        text: 'Clicked our "0% EMI on Ortho GRID" retargeting ad — first touch',
      },
      {
        date: '20 May',
        channel: 'AI Agent',
        icon: '🤖',
        color: '#7c3aed',
        text: 'WhatsApp opt-in — shared preferred size',
      },
      {
        date: '22 May',
        channel: 'Voice AI',
        icon: '📞',
        color: '#7c3aed',
        text: '4m 12s qualifying call — asked if pillows come bundled',
      },
      {
        date: '24 May',
        channel: 'WhatsApp',
        icon: '💬',
        color: '#25D366',
        text: 'Asked for a quote with pillows bundled in',
      },
    ],
    timeline: [
      {
        time: 'Today 10:15 AM',
        action: 'Store Walk-in Logged',
        detail: 'Tested Ortho GRID 6-inch variant. Spent 18 mins on store floor.',
      },
      {
        time: 'Today 10:45 AM',
        action: 'AI Voice Follow-up Sent',
        detail: 'Requested WhatsApp quote breakdown with no-cost EMI options.',
      },
      {
        time: 'Today 11:30 AM',
        action: 'SLA Alert Triggered',
        detail: '2h SLA deadline active. High purchase intent score of 91.',
      },
    ],
    actionsType: 'open',
  },
  {
    id: 'lead-2',
    name: 'Kavitha R.',
    initials: 'KR',
    phone: '+91 97654 32109',
    product: 'SmartGRID Hybrid · ₹24,990',
    expectedValue: 24990,
    score: 55,
    icpScore: 61,
    leadIntentScore: 63,
    status: 'IN_PROGRESS',
    slaHoursLeft: 0,
    badge: '+3d ageing',
    badgeBg: '#fff8e1',
    badgeColor: '#c8860a',
    statusLabel: 'Ageing',
    statusColor: '#c8860a',
    quoteOn: false,
    quoteStatus: 'WhatsApp quote sent 3 days ago',
    storeName: 'Whitefield Store',
    notes: 'Budget borderline — a payment plan or bundle discount could tip this.',
    cumulativeMissed: 2,
    subscores: [
      { label: 'Budget Fit', pct: 61, color: '#c8860a' },
      { label: 'Need Match', pct: 42, color: '#e24b4a' },
      { label: 'Decision Stage', pct: 35, color: '#7c3aed' },
    ],
    slaNote: 'SLA missed · 5 days grace left to close',
    preCallNotes: [
      'SLA already missed — open with an apology for the delay, not a sales pitch.',
      'Low Need Match (42%) — re-confirm the SmartGRID Hybrid is still the right fit before pushing further.',
      "Hasn't responded to the last 2 WhatsApp messages — try a call instead.",
    ],
    signals: [
      {
        id: 's4',
        category: 'Product Related',
        icon: 'document',
        description:
          'Uncertain whether SmartGRID Hybrid actually fits her need — Need Match score is low (42%), worth re-confirming fit',
      },
      {
        id: 's5',
        category: 'In-Store Experience Needed',
        icon: 'shield',
        description:
          "Hasn't responded to WhatsApp — may prefer to see/feel the product before deciding, worth inviting her back in",
      },
      {
        id: 's6',
        category: 'Financing Related',
        icon: 'currency',
        description:
          'Budget fit is borderline (61%) — a payment plan or bundle discount could tip this',
      },
    ],
    journey: [
      {
        date: '12 May',
        channel: 'Google Ad',
        icon: '🔍',
        color: '#ea4335',
        text: 'Searched "cooling gel mattress bangalore", clicked top search ad',
      },
      {
        date: '15 May',
        channel: 'AI Agent',
        icon: '🤖',
        color: '#7c3aed',
        text: 'WhatsApp auto-reply engaged — confirmed interest in cooling gel layer',
      },
      {
        date: '19 May',
        channel: 'WhatsApp',
        icon: '💬',
        color: '#25D366',
        text: 'Asked to hold the price for 2 days, went quiet since',
      },
    ],
    timeline: [
      {
        time: 'Yesterday 4:40 PM',
        action: 'Inbound Missed Call',
        detail: 'Missed call during shift changeover.',
      },
    ],
    actionsType: 'ageing',
  },
  {
    id: 'lead-3',
    name: 'Faizan A.',
    initials: 'FA',
    phone: '+91 96543 21098',
    product: 'Tranquo Massager Chair · ₹24,990',
    expectedValue: 24990,
    score: 88,
    icpScore: 82,
    leadIntentScore: 85,
    status: 'OPEN',
    slaHoursLeft: 3,
    badge: 'Confirmed date',
    badgeBg: '#e1f5ee',
    badgeColor: '#0f6e56',
    statusLabel: 'Open',
    statusColor: '#1d9e75',
    quoteOn: true,
    quoteStatus: 'Demo appointment requested',
    storeName: 'Jayanagar Hub',
    notes: 'Interested in motorized zero-gravity incline feature.',
    cumulativeMissed: 0,
    subscores: [
      { label: 'Budget Fit', pct: 82, color: '#1d9e75' },
      { label: 'Need Match', pct: 78, color: '#1d9e75' },
      { label: 'Decision Stage', pct: 70, color: '#c8860a' },
    ],
    slaNote: null,
    preCallNotes: [
      "Confirmed Monday as the day he'll decide — call back then, don't let this go quiet.",
      'Wants the 6-month no-cost EMI plan — have the paperwork ready.',
      'Already compared with a competitor and preferred our warranty terms.',
    ],
    signals: [
      {
        id: 's7',
        category: 'Financing Related',
        icon: 'currency',
        description:
          'Explicitly asked for the no-cost EMI plan — ready to commit if financing is confirmed',
      },
      {
        id: 's8',
        category: 'Warranty Related',
        icon: 'shield',
        description:
          'Compared warranty terms with a competitor and preferred ours — reinforce this on the call',
      },
    ],
    journey: [
      {
        date: '2 Jun',
        channel: 'Store Visit',
        icon: '🏬',
        color: '#0f6e56',
        text: 'Tried the chair in-store, asked detailed questions on massage programs',
      },
      {
        date: '4 Jun',
        channel: 'Call',
        icon: '📞',
        color: '#185fa5',
        text: '6m 40s call — confirmed budget and asked about EMI',
      },
    ],
    timeline: [
      {
        time: 'Today 10:05 AM',
        action: 'Missed Call Logged',
        detail: 'Follow up on showroom visit quote.',
      },
    ],
    actionsType: 'open',
  },
  {
    id: 'lead-4',
    name: 'Ritu S.',
    initials: 'RS',
    phone: '+91 98450 00001',
    product: 'Smart Luxe Mattress · ₹13,390',
    expectedValue: 13390,
    score: 96,
    icpScore: 94,
    leadIntentScore: 96,
    status: 'OPEN',
    slaHoursLeft: 1,
    badge: 'Hot lead',
    badgeBg: '#e1f5ee',
    badgeColor: '#0f6e56',
    statusLabel: 'Open',
    statusColor: '#1d9e75',
    quoteOn: true,
    quoteStatus: 'Discount voucher pending approval',
    storeName: 'Indiranagar Flagship',
    notes: 'High conversion probability. Looking for king-size luxury mattress.',
    cumulativeMissed: 1,
    subscores: [
      { label: 'Budget Fit', pct: 90, color: '#1d9e75' },
      { label: 'Need Match', pct: 88, color: '#1d9e75' },
      { label: 'Decision Stage', pct: 85, color: '#1d9e75' },
    ],
    slaNote: null,
    preCallNotes: [
      'Asked "how soon can this be delivered" — very high buying signal, close fast.',
      'Already visited the RT Nagar store last week.',
      'Has this lead in CRM from a prior visit — high expected value.',
    ],
    signals: [
      {
        id: 's9',
        category: 'Quotation Demanded',
        icon: 'document',
        description:
          'Asked for delivery timeline immediately — ready to commit once price is confirmed',
      },
    ],
    journey: [
      {
        date: '28 May',
        channel: 'Store Visit',
        icon: '🏬',
        color: '#0f6e56',
        text: 'Visited RT Nagar store, tried the Smart Luxe in person',
      },
      {
        date: '30 May',
        channel: 'Missed Call',
        icon: '📞',
        color: '#e24b4a',
        text: 'Called back after store visit, missed — needs a callback',
      },
    ],
    timeline: [
      {
        time: 'Today 11:20 AM',
        action: 'Call Inbound Missed',
        detail: 'Tried calling call centre while driving, left callback request.',
      },
    ],
    actionsType: 'open',
  },
  {
    id: 'lead-5',
    name: 'Divya P.',
    initials: 'DP',
    phone: '+91 90000 44556',
    product: 'Aura Executive Chair · ₹18,490',
    expectedValue: 18490,
    score: 38,
    icpScore: 34,
    leadIntentScore: 38,
    status: 'CLOSED',
    slaHoursLeft: 0,
    badge: 'Low signal',
    badgeBg: '#f2f2f7',
    badgeColor: '#6b6b74',
    statusLabel: 'Cold',
    statusColor: '#8e8e93',
    quoteOn: false,
    quoteStatus: 'Cold lead revival attempt',
    storeName: 'HSR Layout Store',
    notes: 'Visited 2 weeks ago, price sensitive.',
    cumulativeMissed: 2,
    subscores: [
      { label: 'Budget Fit', pct: 40, color: '#e24b4a' },
      { label: 'Need Match', pct: 35, color: '#e24b4a' },
      { label: 'Decision Stage', pct: 20, color: '#e24b4a' },
    ],
    slaNote: null,
    preCallNotes: [
      'Gave one-word replies on the last call — low engagement.',
      'Said she\'s "just looking around" — treat as low priority this week.',
    ],
    signals: [
      {
        id: 's10',
        category: 'In-Store Experience Needed',
        icon: 'shield',
        description:
          'Vague, non-committal answers — may need to see the product before engaging further',
      },
    ],
    journey: [
      {
        date: '1 Jun',
        channel: 'Website',
        icon: '🌐',
        color: '#8e8e93',
        text: 'Browsed chair category, no form filled',
      },
    ],
    timeline: [
      {
        time: 'Yesterday 2:15 PM',
        action: 'System Re-engagement',
        detail: 'Triggered festive season discount nudge.',
      },
    ],
    actionsType: 'cold',
  },
];

export const MISSED_CALLS_DATA: MissedCall[] = [
  {
    id: 'mc-1',
    callerName: 'Faizan A.',
    phone: '+91 97401 98765',
    timeContext: 'Missed Today 10:05 AM · Visited store / In CRM',
    statusTag: 'Visited store / In CRM',
    expectedValue: 24990,
  },
  {
    id: 'mc-2',
    callerName: 'Kavitha R.',
    phone: '+91 99000 55443',
    timeContext: 'Missed Yesterday 4:40 PM · Warm lead',
    statusTag: 'Warm lead',
    expectedValue: 24990,
  },
  {
    id: 'mc-3',
    callerName: 'Divya P.',
    phone: '+91 98860 11223',
    timeContext: 'Missed Yesterday 2:15 PM · Cold lead',
    statusTag: 'Cold lead',
    expectedValue: 18490,
  },
  {
    id: 'mc-4',
    callerName: 'Ritu S.',
    phone: '+91 98112 34567',
    timeContext: 'Missed Today 11:20 AM · Visited store / In CRM',
    statusTag: 'Visited store / In CRM',
    expectedValue: 13390,
  },
  {
    id: 'mc-5',
    callerName: 'Unknown',
    phone: '+91 98200 00000',
    timeContext: 'Missed Yesterday · No prior record',
    statusTag: 'No prior record',
    expectedValue: null,
    isNewContact: true,
  },
];

export const RECENT_CALLS_DATA: RecentCallRecord[] = [
  {
    id: 'rc-1',
    callerName: 'Mukunda R.',
    phone: '+91 98450 12345',
    timestamp: '10:42 AM',
    duration: '4m 12s',
    durationSeconds: 252,
    type: 'outgoing',
    outcome: 'Sale Closed',
    product: 'Ortho GRID Mattress',
    qaScore: 92,
    csatScore: 5,
    sopCompliance: {
      greetingIn10s: true,
      problemIdentified: true,
      objectionHandled: true,
      closingAttempted: true,
    },
    coachingNotes: [
      'Strong opening with brand greeting within 6s (Target < 10s).',
      'Proactively anchored EMI option before customer questioned total price.',
      'Recommended: Follow up with digital quotation within 30 minutes.',
    ],
    transcript: [
      {
        speaker: 'Agent',
        text: 'Good morning Mukunda! This is Arvind from The Sleep Company, Koramangala. How are you doing today?',
        time: '00:05',
      },
      {
        speaker: 'Customer',
        text: 'Hi Arvind, I visited your store earlier and was looking at the Ortho GRID mattress for my parents. Just wanted to clarify the delivery timeline and EMI.',
        time: '00:22',
      },
      {
        speaker: 'Agent',
        text: 'Wonderful choice! The Ortho GRID uses our patented Japanese SmartGRID technology which adapts dynamically to body contours. We can deliver it within 48 hours, and we have 6-month no-cost EMI starting at ₹1,415 per month.',
        time: '00:48',
      },
      {
        speaker: 'Customer',
        text: 'That sounds very reasonable. What about the warranty and trial period?',
        time: '01:30',
      },
      {
        speaker: 'Agent',
        text: 'You get a full 10-year warranty along with our risk-free 100-night sleep trial right at home. If your parents don’t fall in love with it, we pick it up with zero questions asked.',
        time: '02:05',
      },
      {
        speaker: 'Customer',
        text: 'Perfect! Please send the quote on WhatsApp and let’s finalize it.',
        time: '03:45',
      },
    ],
  },
  {
    id: 'rc-2',
    callerName: 'Kavitha R.',
    phone: '+91 99000 55443',
    timestamp: 'Yesterday',
    duration: '2m 05s',
    durationSeconds: 125,
    type: 'incoming',
    product: 'Cervical Spine Support Pillow',
    qaScore: 88,
    csatScore: 4,
  },
  {
    id: 'rc-3',
    callerName: 'Unknown',
    phone: '+91 98200 00000',
    timestamp: 'Yesterday',
    duration: '—',
    durationSeconds: 0,
    type: 'missed',
  },
  {
    id: 'rc-4',
    callerName: 'Ritu S.',
    phone: '+91 98112 34567',
    timestamp: 'Today 11:20 AM',
    duration: '—',
    durationSeconds: 0,
    type: 'missed',
  },
  {
    id: 'rc-5',
    callerName: 'Faizan A.',
    phone: '+91 97401 98765',
    timestamp: 'Today 10:05 AM',
    duration: '—',
    durationSeconds: 0,
    type: 'missed',
  },
  {
    id: 'rc-6',
    callerName: 'Kavitha R.',
    phone: '+91 99000 55443',
    timestamp: 'Yesterday 4:40 PM',
    duration: '—',
    durationSeconds: 0,
    type: 'missed',
  },
  {
    id: 'rc-7',
    callerName: 'Divya P.',
    phone: '+91 98860 11223',
    timestamp: 'Yesterday 2:15 PM',
    duration: '—',
    durationSeconds: 0,
    type: 'missed',
  },
  {
    id: 'rc-8',
    callerName: 'Faizan A.',
    phone: '+91 97401 98765',
    timestamp: 'Mon',
    duration: '6m 40s',
    durationSeconds: 400,
    type: 'outgoing',
    product: 'Elev8 Smart Bed',
    qaScore: 95,
    csatScore: 5,
  },
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    date: '2026-10-09',
    time: '11:00 AM - 11:45 AM',
    title: 'Store Visit & Experience Tour',
    type: 'visit',
    attendees: 'Mukunda R. (Koramangala Store)',
    notes: 'Walk-in demo of Smart Luxe & Ortho GRID 8-inch',
  },
  {
    id: 'ev-2',
    date: '2026-10-09',
    time: '02:30 PM - 03:00 PM',
    title: 'Weekly 1:1 Coaching with Sunita Rao',
    type: 'coaching',
    attendees: 'Sunita Rao (Team Lead)',
    notes: 'Review greeting SOP & first-10s adherence targets',
  },
  {
    id: 'ev-3',
    date: '2026-10-09',
    time: '04:30 PM - 04:45 PM',
    title: 'Priority Callback: Priya Iyer',
    type: 'callback',
    attendees: 'Priya Iyer',
    notes: 'Billing dispute resolution and card transaction re-verification',
  },
  {
    id: 'ev-4',
    date: '2026-10-12',
    time: '10:00 AM - 10:30 AM',
    title: 'New Product Launch: Gen-3 SmartGRID Recliner',
    type: 'meeting',
    attendees: 'Central Product Team & Retail Agents',
  },
  {
    id: 'ev-5',
    date: '2026-10-14',
    time: '03:15 PM - 03:45 PM',
    title: 'VIP Customer Demo: Elev8 Motorized Base',
    type: 'visit',
    attendees: 'Faizan A.',
  },
  {
    id: 'ev-6',
    date: '2026-10-18',
    time: '12:00 PM - 12:30 PM',
    title: 'Mid-month Shift CSAT & Conversion Review',
    type: 'coaching',
    attendees: 'Mukunda Dwarkanath, Rashmi Sehgal',
  },
  {
    id: 'ev-7',
    date: '2026-10-22',
    time: '04:00 PM - 04:30 PM',
    title: 'Closing Pipeline Review',
    type: 'meeting',
    attendees: 'South Zone Sales Pod',
  },
  {
    id: 'ev-8',
    date: '2026-10-23',
    time: '11:00 AM - 11:30 AM',
    title: 'SOP coaching session',
    type: 'coaching',
    attendees: 'With Sunita Rao (Manager) — via #callcentre-team',
    notes: 'Script-adherence review on opening 10s',
  },
  {
    id: 'ev-9',
    date: '2026-10-26',
    time: '02:30 PM - 03:00 PM',
    title: 'Warranty pitch refresher',
    type: 'coaching',
    attendees: 'With L&D team — flagged from your last 3 calls',
    notes: '100-night trial objection handling refresher',
  },
  {
    id: 'ev-10',
    date: '2026-10-27',
    time: '02:00 PM - 02:45 PM',
    title: 'Festive Season SOP Workshop',
    type: 'meeting',
    attendees: 'All Call Centre Agents',
  },
  {
    id: 'ev-11',
    date: '2026-10-28',
    time: '10:00 AM - 10:45 AM',
    title: 'Weekly team huddle',
    type: 'meeting',
    attendees: 'With Call Centre team — #callcentre-team',
  },
];

export const PULSE_AGENTS_DATA: PulseAgent[] = [
  {
    id: 'callcentre-agent',
    name: 'callcentre-agent',
    type: 'role',
    category: 'ROLE AGENTS (runs as team)',
    description: 'Call Centre Agent',
  },
  {
    id: 'cross-sell-agent',
    name: 'cross-sell-agent',
    type: 'task',
    category: 'TASK AGENTS (move one metric)',
    description: 'Your Attach rate · 5 members',
    metricLabel: 'Attach rate',
    metricValue: '24%',
    membersCount: 5,
  },
  {
    id: 'sop-agent',
    name: 'sop-agent',
    type: 'task',
    category: 'TASK AGENTS (move one metric)',
    description: 'Your SOP adherence · 5 members',
    metricLabel: 'SOP adherence',
    metricValue: '81%',
    membersCount: 5,
  },
  {
    id: 'lead-conversion-agent',
    name: 'lead-conversion-agent',
    type: 'task',
    category: 'TASK AGENTS (move one metric)',
    description: 'Lead Conversion Agent',
  },
  {
    id: 'capture-agent',
    name: 'capture-agent',
    type: 'task',
    category: 'TASK AGENTS (move one metric)',
    description: 'Your Capture coverage · 6 members',
    metricLabel: 'Capture coverage',
    metricValue: '78%',
    membersCount: 6,
  },
];

export const PULSE_CHANNELS = [
  {
    id: 'callcentre-team',
    name: '#callcentre-team',
    description: 'Main coordination channel for shift operations & coaching',
    unreadCount: 1,
  },
  {
    id: 'customer-discussions',
    name: '#customer-discussions',
    description: 'Relayed via WhatsApp Business',
    unreadCount: 0,
  },
];

export const INITIAL_CHANNEL_MESSAGES: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'Sunita Rao',
    senderInitials: 'SR',
    timestamp: '2:05pm',
    isAgent: false,
    type: 'stakeholder',
    badgeTitle: 'STAKEHOLDERS',
    content: '@You (Arvind R.), whole call centre shift',
  },
  {
    id: 'm-2',
    sender: 'Sunita Rao',
    senderInitials: 'SR',
    timestamp: '2:05pm',
    isAgent: false,
    type: 'issue',
    badgeTitle: 'ISSUE DEFINITION',
    content:
      'Greeting-in-first-10s QA score is at 71% this week, below our 85% target.',
  },
  {
    id: 'm-3',
    sender: 'Sunita Rao',
    senderInitials: 'SR',
    timestamp: '2:05pm',
    isAgent: false,
    type: 'resolution',
    badgeTitle: 'SUGGESTED RESOLUTION',
    content:
      "Let's push that up 💪 — open every call with the greeting script. I'll check back Friday.",
  },
  {
    id: 'm-4',
    sender: 'You',
    senderInitials: 'AR',
    timestamp: '2:10pm',
    isAgent: true,
    content:
      'On it! Will make sure I open every call with the greeting script 🙌',
  },
  {
    id: 'm-5',
    sender: 'Sunita Rao',
    senderInitials: 'SR',
    timestamp: '2:14pm',
    isAgent: false,
    type: 'kudos',
    content: 'Great attitude Arvind ⭐',
  },
];

export const PLAN_OUTGOING_LEADS: PlanOutgoingLead[] = [
  {
    id: 'out-1',
    name: 'Ritu S.',
    initials: 'RS',
    avatarBg: '#fdf1e0',
    avatarColor: '#c2410c',
    interest: 'Interested: Smart Luxe Mattress · ₹13,390',
    product: 'Smart Luxe Mattress',
    crossSell: 'Mattress Protector · ₹1,999',
    emi: 'Not yet discussed — surface it early, she asked about total cost',
    attractivenessScore: 96,
    expectedValue: 13390,
    badge: 'Hot lead',
    badgeBg: '#e1f5ee',
    badgeColor: '#0f6e56',
    phone: '+91 98450 00001',
    notes: [
      'Asked "how soon can this be delivered" — very high buying signal, close fast.',
      'Already visited the RT Nagar store last week.',
      'Has this lead in CRM from a prior visit — high expected value.',
    ],
    journey: [
      {
        date: '28 May',
        channel: 'Store Visit',
        icon: '🏬',
        color: '#0f6e56',
        text: 'Visited RT Nagar store, tried the Smart Luxe in person',
      },
      {
        date: '30 May',
        channel: 'Missed Call',
        icon: '📵',
        color: '#e24b4a',
        text: 'Called back after store visit, missed — needs a callback',
      },
    ],
  },
  {
    id: 'out-2',
    name: 'Mukunda',
    initials: 'MK',
    avatarBg: '#e1f5ee',
    avatarColor: '#0f6e56',
    interest: 'Interested: Ortho GRID · ₹8,490',
    product: 'Ortho GRID Mattress',
    crossSell: 'Mattress Protector · ₹1,999',
    emi: 'Asked about EMI — quote the 12-month zero-interest plan',
    attractivenessScore: 90,
    expectedValue: 8490,
    badge: '2h left',
    badgeBg: '#e1f5ee',
    badgeColor: '#0f6e56',
    phone: '+91 98765 43210',
    notes: [
      'Asked about EMI on the Ortho GRID — lead with the 12-month zero-interest plan.',
      'Price-sensitive — compared us with a competitor, so mention the 100-night trial to reduce risk.',
      'Prefers evening calls, after 6pm.',
    ],
    journey: [
      {
        date: '18 May',
        channel: 'Meta Ad',
        icon: '📢',
        color: '#1877f2',
        text: 'Clicked our "0% EMI on Ortho GRID" retargeting ad — first touch',
      },
      {
        date: '20 May',
        channel: 'AI Agent',
        icon: '🤖',
        color: '#7c3aed',
        text: 'WhatsApp opt-in — shared preferred size',
      },
      {
        date: '22 May',
        channel: 'Voice AI',
        icon: '🎙️',
        color: '#7c3aed',
        text: '4m 12s qualifying call — asked if pillows come bundled',
      },
      {
        date: '24 May',
        channel: 'WhatsApp',
        icon: '💬',
        color: '#25D366',
        text: 'Asked for a quote with pillows bundled in',
      },
    ],
  },
  {
    id: 'out-3',
    name: 'Faizan A.',
    initials: 'FA',
    avatarBg: '#e8f0fe',
    avatarColor: '#185fa5',
    interest: 'Interested: Tranquo Massager Chair · ₹24,990',
    product: 'Tranquo Massager Chair',
    crossSell: 'Ergo Seat Cushion · ₹1,299',
    emi: 'Confirmed he wants the 6-month no-cost EMI plan',
    attractivenessScore: 88,
    expectedValue: 24990,
    badge: 'Confirmed date',
    badgeBg: '#e1f5ee',
    badgeColor: '#0f6e56',
    phone: '+91 96543 21098',
    notes: [
      "Confirmed Monday as the day he'll decide — call back then, don't let this go quiet.",
      'Wants the 6-month no-cost EMI plan — have the paperwork ready.',
      'Already compared with a competitor and preferred our warranty terms.',
    ],
    journey: [
      {
        date: '2 Jun',
        channel: 'Store Visit',
        icon: '🏬',
        color: '#0f6e56',
        text: 'Tried the chair in-store, asked detailed questions on massage programs',
      },
      {
        date: '4 Jun',
        channel: 'Call',
        icon: '📞',
        color: '#185fa5',
        text: '6m 40s call — confirmed budget and asked about EMI',
      },
    ],
  },
  {
    id: 'out-4',
    name: 'Kavitha R.',
    initials: 'KR',
    avatarBg: '#fff8e1',
    avatarColor: '#c8860a',
    interest: 'Interested: SmartGRID Hybrid · ₹24,990',
    product: 'SmartGRID Hybrid Mattress',
    crossSell: 'Cooling Pillow Set · ₹2,499',
    emi: 'Budget borderline — a payment plan could tip this',
    attractivenessScore: 55,
    expectedValue: 24990,
    badge: '+3d ageing',
    badgeBg: '#fff8e1',
    badgeColor: '#c8860a',
    phone: '+91 97654 32109',
    notes: [
      'SLA already missed — open with an apology for the delay, not a sales pitch.',
      'Low Need Match (42%) — re-confirm the SmartGRID Hybrid is still the right fit before pushing further.',
      "Hasn't responded to the last 2 WhatsApp messages — try a call instead.",
    ],
    journey: [
      {
        date: '12 May',
        channel: 'Google Ad',
        icon: '🔍',
        color: '#ea4335',
        text: 'Searched "cooling gel mattress bangalore", clicked our top search ad',
      },
      {
        date: '15 May',
        channel: 'AI Agent',
        icon: '🤖',
        color: '#7c3aed',
        text: 'WhatsApp auto-reply engaged — confirmed interest in the cooling gel layer',
      },
      {
        date: '19 May',
        channel: 'WhatsApp',
        icon: '💬',
        color: '#25D366',
        text: 'Asked to hold the price for 2 days, went quiet since',
      },
    ],
  },
  {
    id: 'out-5',
    name: 'Divya P.',
    initials: 'DP',
    avatarBg: '#f2f2f7',
    avatarColor: '#6b6b74',
    interest: 'Browsing: Aura Executive Chair · ₹18,490',
    product: 'Aura Executive Chair',
    crossSell: 'Ergo Seat Cushion · ₹1,299',
    emi: 'Not discussed — low priority to raise financing yet',
    attractivenessScore: 38,
    expectedValue: 18490,
    badge: 'Low signal',
    badgeBg: '#f2f2f7',
    badgeColor: '#6b6b74',
    phone: '+91 90000 44556',
    notes: [
      'Gave one-word replies on the last call — low engagement.',
      'Said she\'s "just looking around" — treat as low priority this week.',
    ],
    journey: [
      {
        date: '1 Jun',
        channel: 'Website',
        icon: '🌐',
        color: '#8e8e93',
        text: 'Browsed chair category, no form filled',
      },
    ],
  },
];

export const PRACTISE_SOPS: PractiseSOP[] = [
  {
    id: 'warranty',
    icon: '🛡️',
    name: 'Warranty Objection Handling',
    category: 'objection',
    isFocus: true,
    tip: 'Give a confident, complete answer to any warranty question — coverage, duration, and how claims work.',
    example:
      '"That\'s a great question! Our mattresses come with an industry-leading 10-year warranty covering sagging over 1 inch and structural integrity. Plus, with our 100-night risk-free trial, you test it in your own home with zero risk."',
    watch: [
      'Was the answer complete (duration + what is covered)?',
      'Did you mention the 100-night risk-free trial to de-risk the purchase?',
      'Did you sound confident without hesitation?',
      'Did you offer written proof or instant WhatsApp warranty document?',
    ],
  },
  {
    id: 'greet',
    icon: '🤝',
    name: 'Greeting & Assistance',
    category: 'pitch',
    isFocus: true,
    tip: 'Introduce yourself by name and role, welcome the customer, and ask how you can help — all within the first 10 to 15 seconds.',
    example:
      '"Good afternoon! My name is Arvind Rajan, your certified Sleep Specialist from The Sleep Company. How may I assist with your comfort today?"',
    watch: [
      'Did you state your name clearly?',
      'Did you mention your role as a certified Sleep Specialist?',
      'Did you warmly welcome the customer?',
      'Did you ask an engaging open question to start the conversation?',
    ],
  },
  {
    id: 'foam',
    icon: '🛏️',
    name: 'Memory Foam Comparison',
    category: 'technology',
    tip: 'Explain that memory foam is 60-year-old technology, name its real issues (heat, sinking, delayed rebound), and show how SmartGRID solves each.',
    example:
      '"Traditional memory foam traps body heat, makes turning difficult because of delayed bounce, and sags over time. Our patented SmartGRID solves all three: 2,500+ air channels keep you 4° cooler, while the hyper-elastic polymer gives instant ergonomic support."',
    watch: [
      'Did you name at least 2 memory foam pain points (heat, sinking)?',
      'Did you map each pain point directly to a SmartGRID solution?',
      'Did you emphasize 2,500+ air channels?',
    ],
  },
  {
    id: 'smartgrid',
    icon: '🔬',
    name: 'SmartGRID Technology',
    category: 'technology',
    tip: 'Introduce the SmartGRID engineering — cover adaptive column support, AIHA medical endorsement, sweat resistance, and sagging resilience.',
    example:
      '"Our SmartGRID uses Japanese hyper-elastic gel technology that is soft on pressure points like shoulders and hips, but firm on the lumbar spine. It is AIHA medically certified and sagging-resistant for over 10 years."',
    watch: [
      'Did you mention AIHA orthopedic certification?',
      'Did you explain the soft-on-shoulders, firm-on-spine dual action?',
      'Did you mention sagging resistance and 10-year lifespan?',
    ],
  },
  {
    id: 'price',
    icon: '💰',
    name: 'Price Objection Handling',
    category: 'objection',
    tip: 'Acknowledge the budget concern with empathy, re-anchor cost over a 10-year lifespan, and present 0% interest monthly financing.',
    example:
      '"I completely appreciate that ₹8,490 feels higher than basic foam. But over a 10-year warranty, that is just ₹2.30 per day for pain-free sleep. Plus, with our zero-interest EMI, you only pay ₹708 a month with no extra fees."',
    watch: [
      'Did you acknowledge price with empathy rather than defensive argument?',
      'Did you break down the daily investment over 10 years?',
      'Did you introduce the 0% interest EMI plan early?',
    ],
  },
  {
    id: 'closing',
    icon: '✅',
    name: 'Closing the Sale',
    category: 'closing',
    tip: 'Once objections are handled, ask directly for the sale with confidence. Offer a clear next step (booking today\'s offer, lock-in price).',
    example:
      '"It looks like the Ortho GRID fits your requirement for back relief and fits within the ₹708/month EMI. Shall I lock in today\'s promotional pricing and book your delivery for Friday?"',
    watch: [
      'Did you ask directly for the sale with confidence?',
      'Did you summarize agreed benefits (back relief + EMI)?',
      'Did you give a specific call-to-action (delivery by Friday)?',
    ],
  },
  {
    id: 'crosssell',
    icon: '🎁',
    name: 'Cross-Sell (Add-ons)',
    category: 'closing',
    tip: 'Recommend a relevant accessory — Smart Pillow or Mattress Protector — timed naturally before checkout.',
    example:
      '"Since you are investing in spinal alignment with the Ortho GRID, I highly recommend adding our SmartGRID Pillow. It aligns the cervical spine the exact same way the mattress aligns the lower back, and buyers get 30% off when bundled today."',
    watch: [
      'Was the recommendation relevant to the primary mattress purchase?',
      'Did you explain the medical/ergonomic benefit of pairing both?',
      'Did you highlight the bundle discount advantage?',
    ],
  },
  {
    id: 'motivation',
    icon: '💡',
    name: 'Purchase Motivation',
    category: 'pitch',
    tip: 'Ask probing questions to uncover why the customer is shopping today — back pain, old mattress sag, relocation, or gifting.',
    example:
      '"What prompted your search today — are you waking up with stiffness, or looking to upgrade an existing bedroom setup?"',
    watch: [
      'Did you ask an open diagnostic question?',
      'Did you listen actively to identify pain points?',
      'Did you reference their reason in your product pitch?',
    ],
  },
  {
    id: 'pressure',
    icon: '✋',
    name: 'Pressure Test Demo',
    category: 'technology',
    tip: 'Guide the caller or walk-in through a sensory test — explain how the grid buckling mechanism cushions heavy zones.',
    example:
      '"If you press firmly with your fist, you\'ll feel the walls buckle gently to cradle the knuckle, while the surrounding walls stay firm. That is how your shoulders get relief while your back stays flat."',
    watch: [
      'Did you explain the wall buckling mechanism clearly?',
      'Did you use sensory language (cradle, firm, contour)?',
    ],
  },
  {
    id: 'preference',
    icon: '📋',
    name: 'Product Preference',
    category: 'pitch',
    tip: 'Uncover current mattress brand, preferred firmness level (medium-firm vs firm), and sleeping posture.',
    example:
      '"May I check what brand you currently sleep on, and do you sleep on your side, back, or stomach? That helps me pinpoint the exact firmness grade."',
    watch: [
      'Did you ask sleeping position (side/back/stomach)?',
      'Did you check current mattress brand and complaints?',
    ],
  },
  {
    id: 'recommend',
    icon: '⭐',
    name: 'Tailored Recommendations',
    category: 'pitch',
    tip: 'Map the customer\'s explicit pain point to a specific model — never give a vague catalog dump.',
    example:
      '"Because you mentioned lower back discomfort after 6 hours of sleep, the Ortho GRID 6-inch is our highest rated medical variant for spinal decompression."',
    watch: [
      'Did you name a specific model and thickness?',
      'Did you connect it to their specific pain point?',
    ],
  },
  {
    id: 'retail2',
    icon: '☕',
    name: 'Retail 2.0 Experience',
    category: 'general',
    tip: 'Offer showroom experiential touchpoints: sleep mask, noise-canceling headphones, and guided relaxation.',
    example:
      '"If you visit our Koramangala experience centre, our Sleep Lab provides noise-canceling headphones with white noise and an ergonomic relaxation trial."',
    watch: [
      'Did you invite them to the local experience store?',
      'Did you describe the sensory Sleep Lab setup?',
    ],
  },
  {
    id: 'knowledge',
    icon: '📚',
    name: 'Product Knowledge',
    category: 'technology',
    tip: 'Explain density, cover fabric (SnowTec cooling), and non-toxic food-grade polymer safety.',
    example:
      '"Our grid is crafted from food-grade, non-toxic polymer that never off-gasses or harbors dust mites, wrapped in a SnowTec cooling breathable cover."',
    watch: [
      'Did you mention food-grade non-toxic material safety?',
      'Did you highlight hypoallergenic and anti-dust mite properties?',
    ],
  },
  {
    id: 'afterservice',
    icon: '🔧',
    name: 'After-Service & Delivery',
    category: 'objection',
    tip: 'Reassure on door delivery, unboxing support, old mattress removal, and hassle-free returns.',
    example:
      '"Delivery is 100% free right to your bedroom floor. Our logistics executive unboxes it, and if you ever need service, our store team dispatches a specialist within 48 hours."',
    watch: [
      'Did you confirm bedroom floor delivery is free?',
      'Did you mention unboxing and fast 48-hour technician SLA?',
    ],
  },
  {
    id: 'other',
    icon: '💬',
    name: 'Comfort & Firmness Hesitation',
    category: 'objection',
    tip: 'Emphasize the 100-night trial as a zero-risk policy so they do not feel trapped.',
    example:
      '"It takes 21 nights for your body to adapt to true orthopedic alignment. That is why we give you 100 full nights at home — if you do not love it, we arrange 100% full refund pick-up."',
    watch: [
      'Did you explain the 21-night body adaptation window?',
      'Did you highlight the 100% no-questions-asked refund policy?',
    ],
  },
  {
    id: 'discount',
    icon: '🏷️',
    name: 'Discount Presentation',
    category: 'closing',
    tip: 'State the original MRP first, highlight the limited festival discount, and lock today\'s quote.',
    example:
      '"The regular price is ₹14,490, but during our festive sale, it is discounted to ₹8,490 — saving you a flat ₹6,000 if confirmed today."',
    watch: [
      'Did you anchor the original MRP first (₹14,490)?',
      'Was the savings amount (₹6,000) explicitly stated?',
    ],
  },
  {
    id: 'referral',
    icon: '👥',
    name: 'Referral & Lead Capture',
    category: 'general',
    tip: 'Capture secondary phone number or family member sleep requirement politely.',
    example:
      '"Would your spouse or family member also like to test firmness? I can dispatch an extra sample swatch with your order."',
    watch: [
      'Did you ask about family members?',
      'Was the tone helpful rather than pushy?',
    ],
  },
  {
    id: 'googlereview',
    icon: '⭐',
    name: 'Customer Feedback & Review',
    category: 'closing',
    tip: 'Wrap up with high warmth and request review rating.',
    example:
      '"Thank you so much! Once your Ortho GRID arrives, I will personally check in. If you loved our consultation today, a quick Google review for our Koramangala team would mean the world!"',
    watch: [
      'Did you commit to a post-delivery follow-up?',
      'Did you ask for a Google review with warmth?',
    ],
  },
];

export const ROLEPLAY_PERSONAS: RoleplayPersona[] = [
  {
    id: 'persona-1',
    name: 'Ramesh V.',
    avatar: '👨🏽',
    title: 'Price-Anchored Skeptic',
    difficulty: 'Medium',
    productInterest: 'Smart Ortho GRID (₹8,490)',
    budget: '₹6,000 - ₹9,000',
    keyObjection: 'Why spend ₹8,490 when local memory foam is ₹6,000?',
    openingCustomerLine:
      'Hello Arvind, I saw your ad for Ortho GRID. But frankly, I can get a memory foam mattress from a local store for ₹6,000. Why should I spend ₹2,500 extra on your brand?',
    dialogueTree: [
      {
        customerLine:
          'Hello Arvind, I saw your ad for Ortho GRID. But frankly, I can get a memory foam mattress from a local store for ₹6,000. Why should I spend ₹2,500 extra on your brand?',
        suggestedResponses: [
          {
            label: 'Lead with 0% EMI & Daily Cost',
            text:
              'I completely understand budget is key, Mr. Ramesh! Over our 10-year warranty, that ₹2,500 difference is just 68 paise a day. Plus, memory foam traps body heat and sags in 2 years, whereas our SmartGRID stays 4° cooler and is sagging-resistant. And with 0% EMI, it is only ₹708/month!',
            isRecommended: true,
          },
          {
            label: 'Challenge the cheap foam',
            text:
              'Local foam will sink in 6 months and cause severe backache. You get what you pay for, so you should buy SmartGRID instead.',
          },
          {
            label: 'Offer instant discount',
            text:
              'I can ask my manager for a special ₹500 discount if you book right now.',
          },
        ],
      },
      {
        customerLine:
          'Okay, but does your SmartGRID really not sink? My last mattress had a permanent dent right in the middle where I sleep.',
        suggestedResponses: [
          {
            label: 'Explain Hyper-elastic Polymer & 100-Night Trial',
            text:
              'That dent happens because foam degrades under body heat. SmartGRID is made of food-grade hyper-elastic polymer that springs back instantly, cycle after cycle. We back that up with a 100-night trial: if it develops body impression or does not relieve your back, we give you a 100% full refund.',
            isRecommended: true,
          },
          {
            label: 'Give warranty reassurance',
            text:
              'Don\'t worry, we have a 10-year warranty, so if it dents you can claim a replacement.',
          },
        ],
      },
      {
        customerLine:
          'Alright, that sounds fair. What are the delivery charges and how soon can you get it to Koramangala?',
        suggestedResponses: [
          {
            label: 'Close with Free Express Delivery',
            text:
              'Delivery is completely free right to your bedroom! Since our warehouse is in Bengaluru, I can schedule priority delivery for tomorrow morning. Shall I send the zero-interest payment link to your WhatsApp right now?',
            isRecommended: true,
          },
          {
            label: 'Standard delivery answer',
            text:
              'Delivery usually takes 4 to 5 working days depending on courier.',
          },
        ],
      },
    ],
  },
  {
    id: 'persona-2',
    name: 'Pooja M.',
    avatar: '👩🏽',
    title: 'Urgent Luxury Shopper',
    difficulty: 'Hard',
    productInterest: 'Smart Luxe King Mattress (₹13,390)',
    budget: '₹15,000 - ₹25,000',
    keyObjection: 'Urgent delivery by Friday for arriving guests + wants bundled pillows.',
    openingCustomerLine:
      'Hi Arvind! I am furnishing my guest room for visiting in-laws who land this Friday. I want the Smart Luxe King mattress, but only if you guarantee delivery by Thursday evening. Can you do that?',
    dialogueTree: [
      {
        customerLine:
          'Hi Arvind! I am furnishing my guest room for visiting in-laws who land this Friday. I want the Smart Luxe King mattress, but only if you guarantee delivery by Thursday evening. Can you do that?',
        suggestedResponses: [
          {
            label: 'Confirm Express Slot & Cross-sell Pillows',
            text:
              'Welcome Mrs. Pooja! Yes, we have the Smart Luxe King in stock at our local Bengaluru hub. I can flag this as an Express Dispatch order for guaranteed Thursday 2 PM delivery. Since it is for your in-laws, shall I bundle two complimentary Ortho Pillows so their setup is 100% complete?',
            isRecommended: true,
          },
          {
            label: 'Hesitant delivery confirmation',
            text:
              'We can try our best for Thursday, but courier delays can sometimes happen so no guarantee.',
          },
        ],
      },
      {
        customerLine:
          'That would be perfect! Can you give me a discount on the pillows, and will your team unbox it?',
        suggestedResponses: [
          {
            label: 'White-glove unboxing & Bundle pricing',
            text:
              'Absolutely! Our delivery crew will carry it directly to the guest bedroom, unbox it, and remove the packaging material. I will also apply our 30% bundle voucher on the pillows. Total is ₹14,889 all inclusive. May I lock this slot for you?',
            isRecommended: true,
          },
          {
            label: 'Tell customer to unbox themselves',
            text:
              'The pillows are regular price, and the mattress is roll-packed so it is easy to cut open yourself.',
          },
        ],
      },
    ],
  },
  {
    id: 'persona-3',
    name: 'Dr. Anand K.',
    avatar: '👨🏻‍⚕️',
    title: 'Ergonomics & Orthopedic Need',
    difficulty: 'Expert',
    productInterest: 'SmartGRID Hybrid Mattress (₹24,990)',
    budget: '₹25,000 - ₹35,000',
    keyObjection: 'Medical skepticism on L4-L5 herniation claims + demands clinical validation.',
    openingCustomerLine:
      'Arvind, I am a spine surgeon. I suffer from mild L4-L5 lumbar disc compression. Every commercial mattress claims to be "orthopedic". What scientific proof does The Sleep Company have that your SmartGRID actually decompresses the spine?',
    dialogueTree: [
      {
        customerLine:
          'Arvind, I am a spine surgeon. I suffer from mild L4-L5 lumbar disc compression. Every commercial mattress claims to be "orthopedic". What scientific proof does The Sleep Company have that your SmartGRID actually decompresses the spine?',
        suggestedResponses: [
          {
            label: 'Lead with AIHA Certification & Pressure Mapping',
            text:
              'Doctor Anand, wonderful to speak with you! We are India\'s only mattress certified by the All India Health Association (AIHA). In clinical pressure-mapping studies, SmartGRID demonstrated an 80% reduction in peak lumbar contact pressure because the grid walls buckle selectively under the pelvic zone while maintaining natural lordotic curvature.',
            isRecommended: true,
          },
          {
            label: 'Generic sales claim',
            text:
              'Doctor, lots of doctors buy our mattress and they all say their back pain disappeared in a week.',
          },
        ],
      },
      {
        customerLine:
          'Interesting. Most hybrid mattresses use stiff pocket springs that push back too aggressively. How do your pocket coils interact with the grid layer?',
        suggestedResponses: [
          {
            label: 'Explain Dual-Zone Independent Coils',
            text:
              'In the Hybrid, we isolate the coils beneath a high-resilience transition layer. The top SmartGRID absorbs body contours silently, so the pocket springs provide buoyant lift rather than harsh push-back. We also encourage you to take the 100-night trial — sleep on it for 3 weeks and evaluate your morning lumbar flexion.',
            isRecommended: true,
          },
          {
            label: 'Vague mechanical response',
            text:
              'The springs are high carbon steel so they last long and don\'t make squeaking noises.',
          },
        ],
      },
    ],
  },
];


