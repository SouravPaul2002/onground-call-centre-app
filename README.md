# On-Ground.ai Call Centre Web Application

A fully functional, high-fidelity implementation of the **On-Ground.ai Call Centre Agent Application**, built for shift-long call centre agents handling walk-out recovery, telesales, coaching, and omnichannel follow-ups.

This project was built following the requirements outlined in **Annexure-II** for the **On-Ground.ai Engineering Hiring Shortlist**. It includes all mandatory screens, bonus interactions, and a **real, fully working browser-to-browser voice calling feature** powered by **PeerJS** and **WebRTC**.

---

## 🚀 How to Run Locally

### Prerequisites

- **Node.js**: v18.0.0 or higher recommended

- **npm**: v9.0.0 or higher

- A modern web browser (Google Chrome, Microsoft Edge, Brave, or Firefox) with microphone access enabled.

### 1. Installation & Launch

```bash
# 1. Clone the repository

git clone https://github.com/SouravPaul2002/onground-call-centre-app.git
cd onground-call-centre-app
# 2. Install dependencies

npm install
# 3. Start development server

npm run dev
```

Open your browser and navigate to:

```
http://localhost:5173
```

### 2. Verify Production Build & Linting

```bash
# Type check and build bundle

npm run build
# Run linter

npm run lint
```

Both `npm run build` and `npm run lint` compile cleanly with **0 errors**.

---

## 🛠️ Stack & Why

| Technology | Why It Was Chosen |
| :--- | :--- |
| **React 19** | Industry-standard declarative UI library with fast component re-renders, clean hook composition, and native support for modern UI workflows. |
| **TypeScript** | Strict type safety for complex call states, customer lead models, chat streams, and WebRTC media streams, preventing runtime errors. |
| **Vite** | Lightning-fast development server with instant Hot Module Replacement (HMR) and optimized Rolldown/Rollup production bundling. |
| **PeerJS & WebRTC** | Simplifies peer-to-peer WebRTC audio communication using PeerJS's free cloud signalling service (`0.peerjs.com`). Enables real browser-to-browser microphone and speaker communication without paid telephony APIs or custom backend infrastructure. |
| **Recharts** | Lightweight, responsive SVG charting library used to render the 7-day calls volume bar chart and CSAT trend analytics on the Dashboard. |
| **Lucide React** | Clean, consistent vector iconography matching the design theme of the reference mock. |
| **Vanilla CSS** | Direct CSS and modular design tokens for pixel-accurate styling, custom animations (pulsing indicators, ringing modals), and dark sidebar/topbar themes without framework bloat. |

---

## 📱 What is Done (Implemented Features)

### 1. App Shell

- **Sidebar**: Dark navigation shell with active state indicators, collapsible `Plan` section (`Calls to make`, `Incoming`, `Recent`, `Practise a call`), `Calendar`, and `Pulse`. Includes the agent profile capsule for **Arvind Rajan** with a real-time status pill (`● On Queue`).

- **Topbar**: On-Ground.ai brand pill (`[OG] On-Ground.ai`), notification alert with unread badge, live score badge (`76 ★ #3`), and agent status selector (`On Queue`, `On Break`, `Offline`).

### 2. Screen 1 — Dashboard

- **Welcome & Context**: `Good afternoon Arvind Rajan`, `The Sleep Company · Call Centre`, status pill, and time-range selector (`This Week`).

- **4 Key KPI Cards**:
  - `OG SCORE™`: **76** (▲ 13, Top 10% on shift)
  - `AVG HANDLE TIME`: **4m 12s** (▼ 51s, Target < 5m)
  - `CSAT TODAY`: **94%** (▲ 2pt, Target 90%)
  - `IN QUEUE`: **2** (● live, Avg wait: 3m 13s)

- **Left Column**:
  - `MY PROGRESS · TODAY`: Shift metrics (`3 Leads Created`, `2 Leads Called`).
  - `WHO'S WAITING`: Live waiting queue (`Priya Iyer`, `Suresh Nair`) with wait timers and direct dial triggers.
  - `CALLS HANDLED · LAST 7 DAYS`: Interactive Recharts bar chart highlighting shift volume.
  - `CSAT TREND · LAST 7 DAYS`: 7-day trend chart showing progression from 88% to 94%.

- **Right Column**:
  - `My earnings this month`: **₹5,200** with **₹1,700** from coached moves and animated progress bar towards ₹6,000.
  - `My Tasks (3)`: Interactive task checklist (`2 callbacks`, `2 hot leads`, `1 outcome to log`). Clicking any task opens the **Leads Modal**.

### 3. Screen 2 — Calls to Make (Plan View)

- Customer leads ranked by lead attractiveness score:
  - **Ritu S.** (Score 96, Smart Luxe Mattress · ₹13,280)
  - **Mukunda** (Score 90, Ortho GRID · ₹8,490)
  - **Faizan A.** (Score 88, Elev8 Smart Bed · ₹24,000)

- Expandable accordion rows revealing showroom visit history, CRM notes, contact details, and direct call action buttons.

- Pagination controls (`Page 1 of 3`).

- Integrated WebRTC prompt dialog allowing direct in-app audio calling via Peer ID alongside simulated practice calls.

### 4. Screen 3 — Incoming (Plan View)

- Summary counters: **5 Missed Today** with **₹81,860 Expected Value at Stake**.

- Ranked missed calls table with caller names, CRM store visit context, and expected deal sizes.

- Instant `📞 Call back` button on every row that launches either real WebRTC browser calling or simulated practice calling.

### 5. Screen 4 — Recent (Plan View)

- Comprehensive recent calls log with call direction icons (incoming, outgoing, missed), duration timestamps, and QA score badges.

- **Real WebRTC Call History**: Real browser-to-browser calls made during the session are automatically prepended at the top of the list with accurate durations, timestamps, and outcome badges (`Completed`, `Declined`, `Failed`).

- **Tap a Call to Review**: Clicking any row opens the **Call SOP Review Modal** with:
  - QA Adherence score (`92%`) and score progress bar.
  - Interactive audio scrubber simulation with play/pause and 1x / 1.5x / 2x speed controls.
  - SOP compliance checklist (`Opening & Intent Confirm`, `Needs Discovery`, `Product Pitch`, `EMI / Financing`, `Warranty`, `Closing`).
  - Call coaching notes, evidence quotes, and full call transcript.

### 6. Screen 5 — Calendar

- Month grid for **October 2026** with weekday headers, today button, and event indicator dots on scheduled dates.

- Active date selector (`Oct 9` selected) showing daily agenda items:
  - 11:00 AM: Store Visit & Experience Tour (Mukunda R.)
  - 02:30 PM: Weekly 1:1 Coaching with Sunita Rao (Greeting SOP review)
  - 04:30 PM: Priority Callback (Priya Iyer - Billing dispute)

### 7. Screen 6 — Pulse Home

- Store location header (`The Sleep Company · Koramangala`) with AvaniBot search bar UI.

- **AvaniBot Hero Banner**: Dark card with `ALWAYS ON` status, `Daily Brief`, and `Ask a question` triggers.

- **Custom Agents Directory**:
  - Role Agents: `# callcentre-agent`
  - Task Agents with live metric tracking: `# cross-sell-agent` (Attach rate 24%), `# sop-agent` (SOP adherence 81%), `# lead-conversion-agent`, `# capture-agent` (Coverage 78%).
  - General: `# customer-discussions` (Relayed via WhatsApp Business).

- **Kudos Card**: Team feedback recognition banner (`12 ALL →`).

### 8. Screen 7 — Pulse Channel Chat (`#callcentre-team`)

- Channel header with back button to Pulse Home.

- **Pinned "Needs your input" Card**:
  - Title: `Confirm the 4:30pm callback (Priya Iyer · likely billing dispute)`.
  - Action buttons: `Confirmed` and `Reschedule` (updates active state and posts notification into chat).
  - Quick reply text input with `Send` button.

- **Interactive Chat Stream**:
  - Manager messages with structured tags (`👥 STAKEHOLDERS`, `📋 ISSUE DEFINITION`, `💡 SUGGESTED RESOLUTION`).
  - Right-aligned agent bubbles with message timestamps.
  - Working bottom chat input supporting user message sending with automatic replies.

### 9. Screen 8 — Leads Modal

- Accessible directly from the Dashboard task list or planner lead items.

- Top bar with SLA countdown (`2h left`), status badge (`● OPEN`), and pagination dots (`1 of 5`).

- Customer profile (**Mukunda**, Ortho GRID · ₹8,490) with highlighted instruction: `Quote to be given to customer`.

- Score indicators: **ICP (87%)** and **Lead Intent Score (91)**.

- Collapsible Accordions:
  - `ICP FIT BREAKDOWN`
  - `HOW WE GOT HERE` (Walk-in timeline)
  - `WHERE WE PICKED UP SIGNALS` (Financing, Quotation, Warranty).

- Direct call action buttons (`In-app call`, `Phone call`, `Practise call`).

---

## 🎙️ The Working Calling Feature (PeerJS + WebRTC)

Per **Annexure-II Page 1 requirement**:

\> *\*"Your product demo must include the CALLING FEATURE working. Mock screens alone are not enough. Explain how you got calling working. Where possible, show human-to-human and AI-to-human calling."\**

### 1. How It Works

- **PeerJS Cloud Signalling**: When the application loads, a PeerJS client connects to PeerJS's free cloud signalling server (`0.peerjs.com`) to exchange SDP offers/answers and ICE candidates.

- **Two-Way Audio WebRTC**: Once connected, audio streams directly peer-to-peer between the two browsers using the browser's native `MediaDevices.getUserMedia({ audio: true })` and `RTCPeerConnection`.

- **Zero Backend / Serverless**: No Express server, Socket.IO, database, or paid telephony subscription is needed.

- **Audio Output**: Remote audio is routed through an HTML5 `Audio` element with automatic playback and graceful autoplay handling. Local audio feedback is prevented by never echoing the local stream through local speakers.

### 2. Functional In-Call Controls

- **Mute / Unmute**: Directly toggles `audioTrack.enabled = false / true` on the active microphone track.

- **Hold / Resume**: Disables local microphone transmission, updates call status to `"On Hold"`, and visually alerts the user.

- **End Call**: Closes the active media connection, stops all local microphone tracks to release hardware, clears duration timers, and logs the call record.

- **Call Duration**: The timer starts only when the connection is established (not when initially dialing).

- **Floating Call Bar**: Minimizing the active call window docks a floating bar at the bottom right. The agent can freely navigate between pages (`Dashboard`, `Calendar`, `Pulse`, `Leads`) while the voice call continues uninterrupted.

- **Call Logging**: Completed, declined, or failed calls are automatically appended to in-memory state and displayed in **Recent Calls** with accurate timestamps and durations.

### 3. Step-by-Step: How to Test Real Calls Between Two Browsers

To test two-way voice communication on your computer:

1\. **Open Session 1**:
   - Open Chrome or Edge and go to `http://localhost:5173`.
   - Click **Practise a Call** in the left sidebar.
   - Look at the **Your Local Peer ID** card and click **Copy**.

2\. **Open Session 2**:
   - Open an **Incognito / Private window** or a second browser (e.g. Firefox) and visit `http://localhost:5173`.
   - Navigate to **Practise a Call**.
   - Note that Session 2 has its own unique Peer ID.

3\. **Initiate the Call**:
   - In Session 2, paste Session 1's Peer ID into the **Call Another User** input field.
   - Click **Call**.
   - Grant microphone permission when prompted by your browser.

4\. **Accept the Call**:
   - In Session 1, an **Incoming Voice Call** modal will ring displaying Session 2's Peer ID.
   - Click **Accept**.
   - Speak into your microphone: audio will stream between both browser sessions.
   - Test **Mute**, **Hold**, and **Resume** buttons.
   - Click **End Call** in either tab.
   - Open **Recent Calls** to see the call logged with duration and `Completed` status.

\> 💡 **Tip to Avoid Audio Feedback**: Because both browser tabs run on the same computer, testing with headphones or lowering speaker volume prevents acoustic feedback loops.

---

## 🧱 Modular & Reusable Architecture

To ensure the codebase remains clean, maintainable, and beginner-friendly, shared logic has been modularized:

- **`src/hooks/useCall.ts`**: Reusable calling hook encapsulating PeerJS lifecycle, incoming/outgoing call logic, microphone track management, and session call logging.

- **`src/components/CallControls.tsx`**: Reusable Mute, Hold, and End Call controls supporting three variants:
  - `circle`: Large circular action buttons for full modals (`ActiveCallModal`).
  - `compact`: Minimal square buttons for docked floating bars (`FloatingCallBar`).
  - `pill`: Labelled buttons for console testing (`PractiseCall`).

- **`src/hooks/useCopyToClipboard.ts`**: Reusable custom hook providing temporary success indicators for copying Peer IDs.

- **`src/components/PeerStatusBadge.tsx`**: Color-coded connection status pill for PeerJS states (`initialising`, `ready`, `in-call`, `disconnected`).

- **`src/utils/formatters.ts`**: Shared utilities for formatting durations (`formatDuration(secs) => "MM:SS"`) and shortening Peer IDs.

---

## 🚫 What Was Skipped & Intentional Design Decisions

Per the ground rules in **Annexure-II Page 3 & Page 6**:

- **No Backend / Database**: The project strictly adheres to *\*"Data: a local JSON file or small mock module. No backend."\** All state, leads, and call logs live in memory and typed mock data modules.

- **No Paid Cellular PSTN Gateway**: Calling cellular mobile numbers (+91...) requires a paid telecom carrier gateway (e.g. Twilio Voice, Exotel) and SIP trunks. The application uses WebRTC Peer IDs for browser-to-browser calling, and clearly informs the agent when a cellular number is clicked.

- **STUN vs. TURN Relay**: Standard Google STUN (`stun:stun.l.google.com:19302`) is used for free NAT traversal. Paid TURN relays (required by restrictive corporate symmetric firewalls) were omitted to maintain a zero-cost demonstration.

- **Placeholder UI Modals**: Secondary mock features such as Calendar share actions and Pulse search modal popups are kept as UI-only elements to keep the codebase focused, lightweight, and performant.

---

## 🤖 AI Tools Used & Attribution

- **Google Antigravity IDE (Gemini 3.8 Flash High)**:
  - **Usage**: I used **Antigravity** as an AI pair-programmer to boost development speed, scaffold initial component boilerplates, and assist with CSS layout alignment.
  - **Personal Verification**: Rather than blindly accepting AI suggestions, I actively reviewed, tested, and manually refactored the code to fit my own architectural standards. When the initial calling implementation became overly complex with excessive hooks and refs, I restructured the code into clean, beginner-friendly components, extracted reusable utilities (`useCall`, `CallControls`, `useCopyToClipboard`), and verified every user interaction manually in the browser.

---
