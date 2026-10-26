import { Lock, Cpu, Eye, Volume2, Sparkles } from 'lucide-react';

export const BentoGridSection: React.FC = () => {
  return (
    <section id="features" className="cs-section">
      <div className="cs-section-inner">
        <div className="cs-section-header">
          <div>
            <span className="cs-section-tag">ARCHITECTURAL BLUEPRINT</span>
            <h2 className="cs-section-title">
              Engineered with <br />
              <span className="cs-monochrome-title">Monochrome Brutalist Precision.</span>
            </h2>
          </div>
          <p className="cs-section-desc">
            Every layer of Navi is built to eliminate proctor fatigue, neutralize unauthorized collaboration, and foster authentic student mastery without distractions or AI slop.
          </p>
        </div>

        {/* 4-Column Bento Grid matching navi-app design system */}
        <div className="cs-bento-grid">
          {/* Card 1 (Span 2): Native Win32 Low-Level Hook Engine */}
          <div className="cs-bento-card cs-bento-span-2">
            <div>
              <div className="cs-bento-icon-box">
                <Lock size={20} />
              </div>
              <h3 className="cs-bento-title">Native Win32 Low-Level Kiosk Lock-In</h3>
              <p className="cs-bento-desc">
                Unlike web-based exam portals that only listen to HTML blur events, Navi hooks into the Windows OS kernel via <code>SetWindowsHookEx(WH_KEYBOARD_LL)</code>. Shortcut keystrokes including <kbd>Alt+Tab</kbd>, <kbd>Win+D</kbd>, <kbd>Ctrl+Esc</kbd>, and multi-monitor switching are physically intercepted before reaching any external app.
              </p>
            </div>
            <div className="cs-card-footer-metric">
              <span className="cs-mono-label">HOOK STATUS: KBD_HOOK_SUCCESS</span>
              <span className="cs-active-tag">● ZERO-BYPASS ACTIVE</span>
            </div>
          </div>

          {/* Card 2: Dual Alert System */}
          <div className="cs-bento-card">
            <div>
              <div className="cs-bento-icon-box">
                <Volume2 size={20} />
              </div>
              <h3 className="cs-bento-title">Acoustic & Visual Alarm</h3>
              <p className="cs-bento-desc">
                When an unauthorized window blur or hook tamper occurs, Navi plays a synthesized acoustic warning and flags a high-visibility badge to alert nearby proctors instantly.
              </p>
            </div>
            <div className="cs-card-sub-hint">
              WebAudio API synthesized alerts · Zero external media dependencies
            </div>
          </div>

          {/* Card 3: Socratic Hint Allowance Quota */}
          <div className="cs-bento-card">
            <div>
              <div className="cs-bento-icon-box">
                <Sparkles size={20} />
              </div>
              <h3 className="cs-bento-title">Instructor-Controlled Quotas</h3>
              <p className="cs-bento-desc">
                Instructors configure maximum hint allowances (e.g. 5 hints per exam). The Socratic engine tracks consumption and logs usage to the live roster.
              </p>
            </div>
            <div className="cs-card-sub-hint">
              Configurable syntax (AST) and logic Socratic hint gating per room
            </div>
          </div>

          {/* Card 4: Real-time Teacher Web Console */}
          <div className="cs-bento-card">
            <div>
              <div className="cs-bento-icon-box">
                <Eye size={20} />
              </div>
              <h3 className="cs-bento-title">Live Telemetry Dashboard</h3>
              <p className="cs-bento-desc">
                Proctors monitor all student test runs, current line execution, violation counts, and hint requests live with sub-second polling from the server.
              </p>
            </div>
            <div className="cs-card-sub-hint">
              Integrated Room PIN system: <code>NAVI-MID1</code>
            </div>
          </div>

          {/* Card 5: Offline First Execution Engine */}
          <div className="cs-bento-card">
            <div>
              <div className="cs-bento-icon-box">
                <Cpu size={20} />
              </div>
              <h3 className="cs-bento-title">Local Python 3.11 Sandboxing</h3>
              <p className="cs-bento-desc">
                Code execution runs locally in an isolated sub-process with memory clamps and timeout triggers. Exams proceed seamlessly even if university internet drops.
              </p>
            </div>
            <div className="cs-card-sub-hint">
              Isolated process execution · Sub-millisecond benchmarking
            </div>
          </div>

          {/* Card 6 (Span 2): Zero-Slop Monochrome Brutalist UI */}
          <div className="cs-bento-card cs-bento-span-2">
            <div>
              <div className="cs-bento-icon-box brand-accent">
                <img src="/navi-favicon.png" alt="Navi" className="cs-card-favicon" />
              </div>
              <h3 className="cs-bento-title">Zero-Slop Obsidian Interface</h3>
              <p className="cs-bento-desc">
                No distracting neon gradients, no low-contrast text, no AI slop. Built on an obsidian black canvas (<code>#09090b</code>) with high-legibility typography (Plus Jakarta Sans and Fira Code), offering optimal visual focus during high-stress exams.
              </p>
            </div>
            <div className="cs-tag-row">
              <span className="cs-spec-pill">Accessible WCAG AAA</span>
              <span className="cs-spec-pill">Keyboard-First Shortcuts</span>
              <span className="cs-spec-pill">Fast Offline Mode</span>
              <span className="cs-spec-pill">Zero Data Mining</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
