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

---

## 🎙️ PeerJS + WebRTC In-App Voice Calling

This application includes a **real, fully working browser-to-browser voice calling feature** built with **PeerJS** and **WebRTC**. Two users (or two tabs/browser windows) can communicate in real time with two-way microphone audio and functional in-call controls.

### 1. How It Works
- **PeerJS Cloud Signalling**: When the app opens, PeerJS connects to the free PeerJS public cloud signalling server (`0.peerjs.com`) to exchange WebRTC session descriptions (SDP offers/answers) and ICE candidates.
- **Direct P2P WebRTC Audio**: Once signalling completes, audio streams directly peer-to-peer (P2P) between the two browsers using the browser's native `RTCPeerConnection` and `MediaDevices.getUserMedia()` API.
- **No Backend Server Required**: All signalling is handled by the free PeerJS service; no local Express/Socket.IO backend or database is needed.

---

### 2. How to Test Real Calls Between Two Browser Sessions

To test two-way voice calling on a single computer:

1. **Start the Dev Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173`.

2. **Session 1 (Caller or Receiver)**:
   - In your main browser window, navigate to **Plan** → **Practise a call** in the sidebar.
   - Look at the **Your Peer Identity** card. You will see an automatically generated Peer ID (e.g., `8d2f14ac-5e20-4a88-8123-3b1a29f8ce22`).
   - Click the **Copy ID** button.

3. **Session 2 (The Other Participant)**:
   - Open a **second browser window** (e.g., Google Chrome Incognito, Microsoft Edge, or Firefox) and visit `http://localhost:5173`.
   - Navigate to **Plan** → **Practise a call**. This second window will have its own unique Peer ID.

4. **Initiating the Call**:
   - In Session 2, paste the Peer ID from Session 1 into the **Remote Peer ID** input box.
   - Click **Call Peer**.
   - Your browser will request **Microphone Permission** (`Allow`).

5. **Accepting the Call**:
   - In Session 1, an **Incoming WebRTC Audio Call** modal will ring with the caller's Peer ID.
   - Click **Accept Call** and grant microphone access if prompted.

6. **In-Call Testing & Controls**:
   - **Two-way Audio**: Speak into your microphone; audio plays through the other browser window's speaker/headphones.
   - **Mute / Unmute**: Clicking Mute disables the local audio track (`track.enabled = false`); the other party cannot hear you until you unmute.
   - **Hold / Resume**: Pauses sending audio and updates the call status to "On Hold".
   - **Floating Call Bar**: Minimize the active call modal and navigate between pages (`Dashboard`, `Calendar`, `Pulse`); the call continues running uninterrupted with duration tracking.
   - **End Call**: Hanging up closes the WebRTC media connection, releases all microphone tracks, stops the duration timer, and records the call into **Recent Calls**.

---

### 3. Microphone Permissions and HTTPS Requirements

- **Localhost Exception**: WebRTC `getUserMedia()` operates over `http://localhost` without requiring an SSL certificate because browsers treat `localhost` as a secure origin.
- **Production / Network Hosting**: If hosting on a local network IP (e.g., `http://192.168.x.x:5173`) or deploying to the web, browsers **strictly require HTTPS** to access the microphone.
- **Audio Feedback**: When testing two browser windows on the same machine, use headphones or mute one tab to avoid acoustic feedback loops between your speaker and microphone.

---

### 4. Why This Calls Another Browser Rather Than a Mobile Number

- **WebRTC is Browser-to-Browser**: WebRTC provides encrypted, real-time peer-to-peer audio and video transmission between web browsers.
- **PSTN Telephony Gateway Required for Real Phone Numbers**: Cellular phones and landlines operate on the Public Switched Telephone Network (PSTN). Calling an ordinary mobile number (+91 98450...) requires a paid telecom carrier gateway (such as Twilio Programmable Voice, Exotel, or AWS Chime) and telecom SIP trunks.
- For in-app agent-to-customer or agent-to-peer communications, WebRTC provides instant, zero-cost, high-fidelity browser voice calling.

---

### 5. Signalling & Network Limitations

- **Free Public Signalling**: The app uses PeerJS's free community cloud server. It is ideal for demos, assignments, and testing. It does not provide enterprise SLAs.
- **NAT / Firewall Traversal (STUN vs. TURN)**:
  - The application includes public Google and Twilio STUN servers (`stun:stun.l.google.com:19302`) for direct P2P connection establishment across common residential and office NATs.
  - Highly restrictive corporate symmetric NATs or enterprise firewalls may block direct UDP packets and require a TURN relay server (which is a paid bandwidth service not included in free setups).
  - The application provides clear error notifications if a connection cannot be established or if a peer is unreachable.

---

## 🤖 AI Tools Used

- **Google Antigravity IDE (Gemini 3.8 Flash High)**: Used for architecture planning, component scaffolding, design system implementation, and code generation.

