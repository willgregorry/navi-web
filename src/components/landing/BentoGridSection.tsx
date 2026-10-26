import React from 'react';
import { Lock, Cpu, Eye, Volume2, Zap, Sparkles } from 'lucide-react';

export const BentoGridSection: React.FC = () => {
  return (
    <section id="features" className="cs-section">
      <div className="cs-section-inner">
        <div className="cs-section-header">
          <div>
            <span className="cs-section-tag">Core Architecture</span>
            <h2 className="cs-section-title">
              Engineered with <br />
              <span className="cs-gradient-text">Uncompromising Precision.</span>
            </h2>
          </div>
          <p className="cs-section-desc">
            Every layer of Navi is built to eliminate proctor fatigue, neutralize unauthorized collaboration, and foster authentic student mastery.
          </p>
        </div>

        {/* 4-Column CleanShot Bento Grid */}
        <div className="cs-bento-grid">
          {/* Card 1 (Span 2): Native Win32 Low-Level Hook Engine */}
          <div className="cs-bento-card cs-bento-span-2">
            <div>
              <div className="cs-bento-icon-box" style={{ color: '#ef4444' }}>
                <Lock size={22} />
              </div>
              <h3 className="cs-bento-title">Native Win32 Low-Level Kiosk Lock-In</h3>
              <p className="cs-bento-desc">
                Unlike web-based exam portals that only listen to HTML blur events, Navi hooks into the Windows OS kernel via <code>SetWindowsHookEx(WH_KEYBOARD_LL)</code>. Shortcut keystrokes including <kbd>Alt+Tab</kbd>, <kbd>Win+D</kbd>, <kbd>Ctrl+Esc</kbd>, and multi-monitor switching are physically intercepted before reaching any external app.
              </p>
            </div>
            <div
              style={{
                marginTop: '24px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'var(--cs-canvas)',
                border: '1px solid var(--cs-divider)',
                fontFamily: 'Fira Code, monospace',
                fontSize: '11.5px',
                color: 'var(--cs-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span>Hook status: KBD_HOOK_SUCCESS</span>
              <span style={{ color: 'var(--cs-alarm-red)' }}>● Zero-Bypass Active</span>
            </div>
          </div>

          {/* Card 2: Dual Alert System */}
          <div className="cs-bento-card">
            <div>
              <div className="cs-bento-icon-box" style={{ color: '#f59e0b' }}>
                <Volume2 size={22} />
              </div>
              <h3 className="cs-bento-title">Audio & Visual Siren Alert</h3>
              <p className="cs-bento-desc">
                When an unauthorized window blur or hook tamper occurs, Navi plays an acoustic warning sound and flashes a high-visibility badge to alert nearby proctors instantly.
              </p>
            </div>
            <div style={{ marginTop: '20px', fontSize: '12px', color: 'var(--cs-text-muted)' }}>
              WebAudio API synthesized alerts · Zero external media dependencies
            </div>
          </div>

          {/* Card 3: Socratic Hint Allowance Quota */}
          <div className="cs-bento-card">
            <div>
              <div className="cs-bento-icon-box" style={{ color: '#38bdf8' }}>
                <Sparkles size={22} />
              </div>
              <h3 className="cs-bento-title">Instructor-Controlled Quotas</h3>
              <p className="cs-bento-desc">
                Instructors configure maximum hint allowances (e.g. 5 hints per exam). The AI tracks hint consumption and deducts points transparently.
              </p>
            </div>
            <div style={{ marginTop: '20px', fontSize: '12px', color: 'var(--cs-text-muted)' }}>
              Configurable syntax and logic hint gating per room
            </div>
          </div>

          {/* Card 4: Real-time Teacher Web Console */}
          <div className="cs-bento-card">
            <div>
              <div className="cs-bento-icon-box" style={{ color: '#22c55e' }}>
                <Eye size={22} />
              </div>
              <h3 className="cs-bento-title">Live Teacher Dashboard</h3>
              <p className="cs-bento-desc">
                Proctors monitor all student test runs, current line execution, violation counts, and hint requests live with sub-second WebSocket updates.
              </p>
            </div>
            <div style={{ marginTop: '20px', fontSize: '12px', color: 'var(--cs-text-muted)' }}>
              Integrated Room PIN system: <code>NAVI-XXXX</code>
            </div>
          </div>

          {/* Card 5: Offline First Execution Engine */}
          <div className="cs-bento-card">
            <div>
              <div className="cs-bento-icon-box" style={{ color: '#a855f7' }}>
                <Cpu size={22} />
              </div>
              <h3 className="cs-bento-title">Local Python 3.11 Sandboxing</h3>
              <p className="cs-bento-desc">
                Code execution runs locally in an isolated sub-process with memory clamps and timeout triggers. Exams proceed seamlessly even if university internet drops.
              </p>
            </div>
            <div style={{ marginTop: '20px', fontSize: '12px', color: 'var(--cs-text-muted)' }}>
              Isolated process execution · Sub-millisecond benchmarking
            </div>
          </div>

          {/* Card 6 (Span 2): Zero-Slop Monochrome Brutalist UI */}
          <div className="cs-bento-card cs-bento-span-2">
            <div>
              <div className="cs-bento-icon-box" style={{ color: '#ffffff' }}>
                <Zap size={22} />
              </div>
              <h3 className="cs-bento-title">Monochrome Brutalist Precision</h3>
              <p className="cs-bento-desc">
                No distracting animations, no low-contrast text, no AI slop. Built on an obsidian black canvas (<code>#09090b</code>) with high-legibility typography (Plus Jakarta Sans and Fira Code), offering optimal visual focus during high-stress exams.
              </p>
            </div>
            <div
              style={{
                marginTop: '24px',
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}
            >
              <span className="cs-version-pill">Accessible WCAG AAA</span>
              <span className="cs-version-pill">Keyboard-First Shortcuts</span>
              <span className="cs-version-pill">Instant Dark/Light Shift</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
