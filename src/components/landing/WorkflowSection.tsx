import React from 'react';
import { Settings, Lock, Sparkles, BarChart3 } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    title: 'Configure Room & Policy',
    desc: 'The instructor launches the Web Console, defines problem specifications, starter templates, hidden test cases, and sets max allowed Socratic hints.',
    icon: <Settings size={18} />,
    tag: 'Room Studio',
  },
  {
    num: '02',
    title: 'Client Kiosk Lock-In',
    desc: 'Students launch the Navi Windows app and enter the Room Code (e.g. NAVI-MID1). The Win32 native hook locks window focus immediately.',
    icon: <Lock size={18} />,
    tag: 'Win32 Hook',
  },
  {
    num: '03',
    title: 'Socratic Cognitive Flow',
    desc: 'When encountering compilation or logic roadblocks, students consult the built-in AI tutor. Navi guides their critical thinking without giving away answers.',
    icon: <Sparkles size={18} />,
    tag: 'Socratic Inquiry',
  },
  {
    num: '04',
    title: 'Real-time Proctor Audit',
    desc: 'Instructors observe live student test runs, execution times, hint usage, and any Alt+Tab tamper alerts in a centralized, real-time dashboard.',
    icon: <BarChart3 size={18} />,
    tag: 'Live Telemetry',
  },
];

export const WorkflowSection: React.FC = () => {
  return (
    <section id="workflow" className="cs-section">
      <div className="cs-section-inner">
        <div className="cs-section-header">
          <div>
            <span className="cs-section-tag">EXAMINATION LIFECYCLE</span>
            <h2 className="cs-section-title">
              From Room Setup to Final Grade <br />
              <span className="cs-monochrome-title">in Four Frictionless Steps.</span>
            </h2>
          </div>
          <p className="cs-section-desc">
            Designed for high-capacity university computer laboratories and competitive coding olympiads without complex server installations.
          </p>
        </div>

        <div className="cs-workflow-grid">
          {STEPS.map((step) => (
            <div key={step.num} className="cs-step-card">
              <div>
                <div className="cs-step-header">
                  <div className="cs-bento-icon-box" style={{ marginBottom: 0 }}>
                    {step.icon}
                  </div>
                  <span className="cs-step-num">{step.num}</span>
                </div>
                <h3 className="cs-bento-title" style={{ fontSize: '17px', marginTop: '16px' }}>
                  {step.title}
                </h3>
                <p className="cs-bento-desc" style={{ marginTop: '8px' }}>
                  {step.desc}
                </p>
              </div>

              <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid var(--cs-divider)' }}>
                <span className="cs-version-pill">{step.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
