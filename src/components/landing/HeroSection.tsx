import React, { useState } from 'react';
import { Download, ChevronRight, Lock, Cpu, ChevronLeft } from 'lucide-react';

interface HeroSectionProps {
  onOpenDashboard: () => void;
  onDownloadClick: () => void;
}

const TESTIMONIALS = [
  {
    quote:
      '“Navi transformed our programming lab exams. The Socratic AI guides students through SyntaxErrors without spoon-feeding answers, and the kiosk lock-in stopped window-switching completely.”',
    author: 'Dr. Hendra Wijaya',
    role: 'Head of Informatics Lab, Faculty of Computer Science',
    initials: 'HW',
  },
  {
    quote:
      '“Before Navi, we spent 80% of exam time answering simple syntax questions. Now the guided Socratic hints handle the cognitive unblocking while our TAs monitor the live dashboard.”',
    author: 'Sarah Kurniawan, M.Kom.',
    role: 'Lead Teaching Assistant, Data Structures & Algorithms',
    initials: 'SK',
  },
  {
    quote:
      '“The native Win32 kiosk engine is rock-solid. Students cannot bypass it with Alt+Tab or WinKey. Truly the highest engineering standard of proctoring software.”',
    author: 'Bambang Pratama, S.T.',
    role: 'System Administrator, National Competitive Coding Olympiad',
    initials: 'BP',
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenDashboard, onDownloadClick }) => {
  const [activeTab, setActiveTab] = useState<'editor' | 'socratic' | 'telemetry'>('editor');
  const [testimonialIdx, setTestimonialIdx] = useState(0);

  const currentTestimonial = TESTIMONIALS[testimonialIdx];

  const handleNextTestimonial = () => {
    setTestimonialIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="cs-hero">
      <div className="cs-ambient-glow" />

      <div className="cs-hero-container">
        {/* Announcement Badge */}
        <div className="cs-badge-wrapper">
          <a href="#download" className="cs-announcement-badge">
            <span className="cs-badge-favicon-box">
              <img src="/navi-favicon.png" alt="Navi" className="cs-badge-favicon-img" />
            </span>
            <span>Navi 1.0.4 is live — Native Win32 Kiosk & Socratic AI Engine</span>
            <ChevronRight size={14} />
          </a>
        </div>

        {/* Title & Desc */}
        <div className="cs-hero-title-box">
          <h1 className="cs-hero-title">
            The Pro Exam Environment for <br />
            <span className="cs-monochrome-title">Competitive Programming</span>
          </h1>
          <p className="cs-hero-desc">
            Navi combines a high-security locked-down kiosk client with a pedagogical Socratic AI assistant. Students get real-time conceptual guidance while instructors maintain complete academic integrity.
          </p>
        </div>

        {/* CTA Group */}
        <div className="cs-hero-cta-group">
          <button type="button" className="cs-hero-btn-primary" onClick={onDownloadClick}>
            <Download size={18} />
            <span>Download for Windows (.exe)</span>
          </button>

          <button type="button" className="cs-hero-btn-secondary" onClick={onOpenDashboard}>
            <span>Open Teacher Console</span>
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="cs-hero-guarantee">
          <span>Free for universities and schools · Native 64-bit Win32 · Zero telemetry leakage</span>
        </div>

        {/* Dual Showcase Grid: Mockup + Testimonial */}
        <div className="cs-showcase-grid">
          {/* Mockup Frame */}
          <div className="cs-mockup-frame">
            <div className="cs-mockup-titlebar">
              <div className="cs-traffic-lights">
                <span className="cs-dot cs-dot-red" />
                <span className="cs-dot cs-dot-yellow" />
                <span className="cs-dot cs-dot-green" />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="cs-kiosk-pill">
                  <Lock size={10} />
                  KIOSK ACTIVE · ALT+TAB DISABLED
                </span>
                <span style={{ fontSize: '11px', color: 'var(--cs-text-muted)', fontFamily: 'Fira Code, monospace' }}>
                  NAVI-MID1
                </span>
              </div>
              <div style={{ width: '48px' }} />
            </div>

            <div className="cs-mockup-body">
              {/* Mockup Tabs */}
              <div className="cs-mockup-tabs">
                <button
                  type="button"
                  className={`cs-tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
                  onClick={() => setActiveTab('editor')}
                >
                  solution.py
                </button>
                <button
                  type="button"
                  className={`cs-tab-btn ${activeTab === 'socratic' ? 'active' : ''}`}
                  onClick={() => setActiveTab('socratic')}
                >
                  navi_socratic.ai [Hint 2/5]
                </button>
                <button
                  type="button"
                  className={`cs-tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
                  onClick={() => setActiveTab('telemetry')}
                >
                  kiosk_telemetry.log
                </button>
              </div>

              {/* Code Box Display */}
              <div className="cs-mockup-codebox">
                {activeTab === 'editor' && (
                  <pre style={{ margin: 0 }}>
                    <code>{`def is_prime(n):
    if n <= 1:
        return False
    if n <= 3:
        return True`}
                    </code>
                    <div className="cs-flagged-line">
                      {`    if n % 2 == 0 or n % 3 == 0:  # flagged: step efficiency`}
                    </div>
                    <code>{`        return False
    i = 5
    while i * i <= n:
        if n % i == 0 or n % (i + 2) == 0:
            return False
        i += 6
    return True

# Test case running: is_prime(104729) -> PASS (0.4ms)`}</code>
                  </pre>
                )}

                {activeTab === 'socratic' && (
                  <pre style={{ margin: 0 }}>
                    <code style={{ color: '#fafafa' }}>{`[NAVI SOCRATIC REASONER v1.0.4]
Question from student: "Why did test case #4 hit Time Limit Exceeded (TLE)?"

Analysis:
- Complexity detected: O(n) linear primality check
- Target constraint: n <= 10^9

Socratic Guidance (Pedagogical - No direct answer):
"Consider the divisors of a composite number n.
If a number n can be divided by factor p, could its complementary
factor q = n / p ever be strictly greater than sqrt(n)?
Reflect on the maximum upper bound for variable i in your loop!"`}</code>
                  </pre>
                )}

                {activeTab === 'telemetry' && (
                  <pre style={{ margin: 0 }}>
                    <code style={{ color: '#a1a1aa' }}>{`[10:02:15] Session initialized: Willy Gregory (NIM: 245150207111089)
[10:02:15] Win32 SetWindowsHookEx(WH_KEYBOARD_LL) attached: SUCCESS
[10:02:15] Alt+Tab, WinKey, TaskMgr disabled: ACTIVE
[10:05:32] Run Tests executed: 4/4 passed (Memory: 14.2MB)
[10:06:10] Hint request dispatched: "Algorithmic step efficiency" (Hint 2/5)
[10:06:12] Telemetry synchronized with Teacher Console (Room: NAVI-MID1)`}</code>
                  </pre>
                )}
              </div>

              <div className="cs-mockup-footer">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Cpu size={12} />
                  Python 3.11 Kernel · 0.2% CPU
                </span>
                <span style={{ color: 'var(--cs-success-green)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  ● Kiosk Secured
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial Hero */}
          <div className="cs-testimonial-hero">
            <div>
              <div className="cs-testimonial-stars">★★★★★</div>
              <p className="cs-testimonial-quote">{currentTestimonial.quote}</p>
            </div>

            <div className="cs-author-row">
              <div className="cs-author-info">
                <div className="cs-author-avatar">{currentTestimonial.initials}</div>
                <div>
                  <div className="cs-author-name">{currentTestimonial.author}</div>
                  <div className="cs-author-role">{currentTestimonial.role}</div>
                </div>
              </div>

              <div className="cs-slider-arrows">
                <button
                  type="button"
                  className="cs-slider-btn"
                  onClick={handlePrevTestimonial}
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  className="cs-slider-btn"
                  onClick={handleNextTestimonial}
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
