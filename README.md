# Navi Web & Teacher Console (`navi-web`)

<div align="center">
  <img src="public/navi-favicon.png" alt="Navi Logo" width="80" height="80" />
  <h3>Web Portal, Live Educator Console & Exam Builder Studio</h3>
  <p>Centralized examination telemetries, candidate monitoring, and curriculum authoring for computer science faculties.</p>
</div>

---

## 🌐 Navi Ecosystem Architecture

Navi operates as an interconnected three-tier examination platform:

| Component | Repository | Technology | Description |
| :--- | :--- | :--- | :--- |
| **Web Portal & Console** | [willgregorry/navi-web](https://github.com/willgregorry/navi-web) | React 19, TypeScript, Vite, Glassmorphism | Real-time proctor dashboard, exam studio, telemetry feeds, and official download station |
| **Desktop Client** | [willgregorry/navi-app](https://github.com/willgregorry/navi-app) | Electron, React 19, TypeScript, Vite | Native locked-down kiosk client with low-level keyboard interception & Socratic tutor |
| **Backend API Engine** | [sulthonaw/navi-api](https://github.com/sulthonaw/navi-api) | FastAPI, Python 3.11, PostgreSQL, Gemini AI | Socratic AI reasoning engine, room management, violation logging, and evaluation services |

---

## ⚡ Core Features

- **📊 Live Candidate Telemetry Dashboard**:
  Live proctoring table providing real-time oversight of all connected students:
  - Candidate identity and university student ID (NIM)
  - Code status indicators (*Accepted*, *Coding*, *Syntax Error*, *Wrong Answer*, *Submitted*)
  - Real-time score tallies and Socratic hint quota consumption
  - Instant security violation counters tracking unauthorized Alt+Tab attempts
  - Search and filter by name, NIM, violation status, or submission state
- **📝 Multi-Problem Exam Authoring Studio**:
  Comprehensive educator workbench to create structured programming assessments:
  - Room metadata configuration (duration, hint allowances, AST & Socratic logic policies)
  - Multi-problem sidebar navigator with difficulty tags (*Easy*, *Medium*, *Hard*) and custom score weights
  - Markdown problem statement editor with live preview
  - Interactive chip manager for execution constraints
  - High-contrast Python 3 starter code boilerplate editor
  - Dynamic verification test suite with public (sample) vs hidden (grading) toggles
- **🔄 Instant Room Switcher & Sync**:
  Seamlessly monitor or jump between live rooms (e.g. `NAVI-SU5Y`) directly from the header without browser reloads.
- **✨ Obsidian Brutalist Dark Mode Design System**:
  Engineered with high-contrast surfaces (`#09090b` canvas, `#121215` elevated panels, `rgba(24, 24, 27, 0.65)` glassmorphic cards with `backdrop-filter: blur(16px)`), zero AI slop, and crisp Plus Jakarta Sans + Fira Code typography.
- **💾 Official Windows Distribution Station**:
  Public portal for distributing production Windows binaries (`.exe`, portable `.zip`, and enterprise `.msi`) alongside SHA-256 checksum verifications.

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: Vanilla CSS Design System (Monochrome Brutalist Glassmorphism)
- **Icons**: [Lucide React](https://lucide.dev/)
- **API Target**: [Navi Backend API (v1)](https://navi.willygregory.site/api/v1)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/willgregorry/navi-web.git
   cd navi-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (`.env`):
   ```env
   VITE_API_URL=https://navi.willygregory.site/api/v1
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` (or the port specified by Vite) in your browser.

5. Build for production:
   ```bash
   npm run build
   ```

---

## 👥 Related Repositories

- Desktop Kiosk Client: **[https://github.com/willgregorry/navi-app](https://github.com/willgregorry/navi-app)**
- Backend API & Socratic Engine: **[https://github.com/sulthonaw/navi-api](https://github.com/sulthonaw/navi-api)**

---

## 📄 License

Academic and institutional use licensed under the MIT License.
Developed for Universitas Brawijaya and computer science education institutions.
