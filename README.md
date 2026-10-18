# On-Ground.ai Call Centre Web Application

A reproduction and functional implementation of the **On-Ground.ai Call Centre Agent Application**, built for shift-long call centre agents handling walk-out recovery, telesales, coaching, and omnichannel follow-ups.

---

## 🛠️ Stack & Why

- **React 19 & TypeScript**: Provides rock-solid type safety, component modularity, and smooth reactive state management for real-time shift workflows.
- **Vite**: Ultra-fast build and development server with instant Hot Module Replacement (HMR).
- **Lucide React**: Clean, minimalist vector iconography aligned with the dark modern theme.
- **Recharts**: Responsive SVG charts for 7-day calls handled and CSAT trend analytics.
- **Vanilla CSS (Design System)**: Bespoke styling and CSS custom properties providing exact fidelity to the reference mocks, responsive breakpoints, dark sidebar/topbar styling, and micro-interactions without heavy CSS framework bloat.
- **Web Audio API & Web Speech API**: Implements the required interactive calling feature directly in browser runtime with simulated tones, audio waveform animation, and live voice synthesis.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### Installation & Launch
```bash
# Clone the repository
git clone <your-repo-url>
cd onground-call-centre

# Install dependencies
npm install

# Start development server
npm run dev
```

Open your browser at `http://localhost:5173` to interact with the application.

### Build for Production
```bash
npm run build
```

---

## 📱 What is Done (All 8 Core Screens + Bonus Items)

### 1. App Shell
- **Sidebar**: Dark charcoal navigation with collapsible `Plan` menu (`Calls to make`, `Incoming`, `Recent`, `Practise a call`), `Calendar`, `Pulse`, and footer profile capsule for **Arvind Rajan** with real-time status indicator (`● On Queue`).
- **Topbar**: On-Ground.ai capsule badge (`[OG] On-Ground.ai`), notification alert with unread badge, live score badge (`76 ★ #3`), and agent status dropdown (`On Queue`, `On Break`, `Offline`).
- **Floating Demo Dock**: Fixed bottom demo controller (`DEMO | 📞 In-app call | 📞 Phone call | Practise call | 🔄 Reset`) available across all screens.

### 2. Screen 1 — Dashboard
- **Welcome & Agent Subtitle**: `Good afternoon Arvind Rajan`, `The Sleep Company · Call Centre`, status pill, and time-range selector (`This Week`).
- **4 Key KPI Cards**:
  - `OG SCORE™`: **76** (▲ 13, Top 10% on shift)
  - `AVG HANDLE TIME`: **4m 12s** (▼ 51s, Target < 5m)
  - `CSAT TODAY`: **94%** (▲ 2pt, Target 90%)
  - `IN QUEUE`: **2** (● live, Avg wait: 3m 13s)
- **Left Column**:
  - `MY PROGRESS · TODAY`: Dual dark metric blocks (`3 Leads Created`, `2 Leads Called`).
  - `WHO'S WAITING`: Live waiting queue (`Priya Iyer`, `Suresh Nair`) with wait timers and direct dial triggers.
  - `CALLS HANDLED · LAST 7 DAYS`: Interactive Recharts bar chart highlighting current shift volume.
  - `CSAT TREND · LAST 7 DAYS`: 7-day CSAT progression (88% to 94%).
- **Right Column**:
  - `My earnings this month`: **₹5,200** with **₹1,700** from coached moves and progress bar towards ₹6,000.
  - `My Tasks (3)`: Interactive checklist (`2 callbacks`, `2 hot leads`, `1 outcome to log`). Clicking any task opens the **Leads Modal**.

### 3. Screen 2 — Calls to Make (Plan View)
- Leads ranked by lead attractiveness score:
  - **Ritu S.** (Score 96, Smart Luxe Mattress · ₹13,280)
  - **Mukunda** (Score 90, Ortho GRID · ₹8,490)
  - **Faizan A.** (Score 88, Elev8 Smart Bed · ₹24,000)
- Expandable drawer on each lead revealing showroom visit context, contact number, and direct dial buttons.
- Next/Previous page pagination dock (`Page 1 of 3`).

### 4. Screen 3 — Incoming (Plan View)
- Summary counters: **5 Missed Today** with **₹81,860 Expected Value at Stake**.
- Ranked missed calls table with caller names, CRM/store visit context, and expected deal sizes.
- Instant `📞 Call back` button on every row that launches the working calling feature.

### 5. Screen 4 — Recent (Plan View)
- Comprehensive recent calls log with call type icons (incoming, outgoing, missed), duration timestamps, and QA score badges.
- **Tap a Call to Review**: Clicking any row opens the **Call SOP Review Modal** complete with:
  - QA Adherence score (`92 / 100`) and Predicted CSAT (`★ 5.0 / 5.0`).
  - Audio playback scrubber simulation.
  - SOP protocol checklist (`Greeting in first 10s`, `Problem identified`, `Value proposition`, `CTA sent`).
  - ASM AI Coach feedback and synchronized call transcript.

### 6. Screen 5 — Calendar
- Mirrored mailbox calendar banner with notification notice.
- Interactive month grid for **October 2026** with weekday headers, today button, and event indicator dots on scheduled dates.
- Active date selector (`Oct 9` selected) showing daily schedule:
  - 11:00 AM: Store Visit & Experience Tour (Mukunda R.)
  - 02:30 PM: Weekly 1:1 Coaching with Sunita Rao (Greeting SOP review)
  - 04:30 PM: Priority Callback (Priya Iyer - Billing dispute)

### 7. Screen 6 — Pulse Home
- Header with store location (`The Sleep Company · Koramangala`) and search bar for AvaniBot.
- **AvaniBot Hero Banner**: Dark gradient card with `ALWAYS ON` status and interactive buttons:
  - `📋 Daily Brief`: Opens shift priorities modal and action checklist.
  - `💬 Ask a question`: Interactive Q&A dialog with AvaniBot.
- **Custom Agents Directory**:
  - Role Agents: `# callcentre-agent`
  - Task Agents with live metric tracking: `# cross-sell-agent` (Attach rate 24%), `# sop-agent` (SOP adherence 81%), `# lead-conversion-agent`, `# capture-agent` (Coverage 78%).
  - General: `# customer-discussions` (Relayed via WhatsApp Business).
- **Kudos Card**: Real-time feedback recognition banner (`12 ALL →`).

### 8. Screen 7 — Pulse Channel Chat (`#callcentre-team`)
- Channel header with back navigation button.
- **Pinned "Needs your input" Card**:
  - Title: `Confirm the 4:30pm callback (Priya Iyer · likely billing dispute)`.
  - Action buttons: `Confirmed` and `Reschedule` (updates active state and posts notification into chat).
  - Quick reply text input with `Send` button.
- **Live Chat Stream**:
  - Structured manager messages with badges (`👥 STAKEHOLDERS`, `📋 ISSUE DEFINITION`, `💡 SUGGESTED RESOLUTION`).
  - Right-aligned agent messages with timestamps.
  - Interactive bottom chat input supporting message sending and auto-replies.

### 9. Screen 8 — Leads Modal
- Opens from Dashboard tasks or planner lead items.
- Top bar with SLA countdown (`2h left`), status badge (`● OPEN`), and next/previous lead pagination dots (`1 of 5`).
- Customer profile (**Mukunda**, Ortho GRID · ₹8,490) with highlighted instruction: `Quote to be given to customer`.
- Score indicators: **ICP (87%)** and **Lead Intent Score (91)**.
- Collapsible Accordions:
  - `ICP FIT BREAKDOWN`
  - `HOW WE GOT HERE` (Walk-in timeline)
  - `WHERE WE PICKED UP SIGNALS` (Financing Related, Quotation Demanded, Warranty Related).
- Manager visibility alert: `CUMULATIVE MISSED: 2`.
- Direct call action buttons (`In-app call`, `Phone call`, `Practise call`).

---

## 📞 Calling Feature Implementation ("REQUIRED: BUILD A WORKING PRODUCT")

To fulfill the explicit mandate on Page 1 of Annexure-II, this app implements a functional in-app calling experience:
1. **Audio Synthesis & Ringtones**: Uses the native browser **Web Audio API** (`OscillatorNode` & `GainNode`) to produce realistic connection beeps without external MP3 files.
2. **AI Voice Synthesis**: Leverages the browser's **Web Speech API** (`window.speechSynthesis`) so the customer actually speaks aloud during the call.
3. **Real-time Audio Waveform**: Animated dynamic waveform bars reflecting active voice activity.
4. **Live Transcript Streaming**: Speech transcript automatically feeds in real-time as the customer and agent converse.
5. **Interactive Coached Responses**: Quick-pitch response buttons allowing the agent to handle EMI objections, pitch the 100-night trial, and dispatch quote links.
6. **Call Controls**: Mute toggle, Hold/Resume, and End Call with duration counter.
7. **Automatic Call Logging**: When a call concludes, it is dynamically prepended to **Recent Calls** with QA evaluation and coaching insights.

---

## 🤖 AI Tools Used

- **Google Antigravity IDE (Gemini 3.8 Flash High)**: Used for architecture planning, component scaffolding, design system implementation, and code generation.
- **Web Speech API & Web Audio API**: Used for in-browser speech synthesis and audio simulation.
