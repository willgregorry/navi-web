import React, { useState } from 'react';
import { Shield, Check } from 'lucide-react';

interface LandingFooterProps {
  onOpenDashboard: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onOpenDashboard }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer className="cs-footer">
      <div className="cs-footer-inner">
        {/* Newsletter Row */}
        <div className="cs-newsletter-row">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div className="cs-brand-icon" style={{ width: '28px', height: '28px', borderRadius: '8px' }}>
                <Shield size={16} />
              </div>
              <span style={{ fontSize: '18px', fontWeight: 800, color: '#ffffff' }}>Navi Dispatch</span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>
              Get notified of new security patch releases, Python sandbox updates, and algorithmic challenge packs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="cs-newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="academic@university.ac.id"
              className="cs-newsletter-input"
              required
            />
            <button type="submit" className="cs-newsletter-btn">
              {subscribed ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Check size={16} /> Subscribed
                </span>
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
        </div>

        {/* Links Grid (CleanShot X style) */}
        <div className="cs-footer-links-grid">
          <div className="cs-footer-col">
            <h4>Product</h4>
            <ul>
              <li><a href="#features">Kiosk Engine</a></li>
              <li><a href="#socratic">Socratic AI Guidance</a></li>
              <li><a href="#workflow">Exam Workflow</a></li>
              <li><a href="#download">Windows Download (.exe)</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onOpenDashboard(); }}>Teacher Live Console</a></li>
            </ul>
          </div>

          <div className="cs-footer-col">
            <h4>Security & Sandboxing</h4>
            <ul>
              <li><a href="#features">Win32 Hook Specification</a></li>
              <li><a href="#features">Alt+Tab Interception</a></li>
              <li><a href="#features">Process Memory Clamping</a></li>
              <li><a href="#download">SHA-256 Verification</a></li>
              <li><a href="#download">Active Directory GPO Guide</a></li>
            </ul>
          </div>

          <div className="cs-footer-col">
            <h4>Pedagogy</h4>
            <ul>
              <li><a href="#socratic">Socratic Questioning Philosophy</a></li>
              <li><a href="#socratic">Cognitive Scaffolding</a></li>
              <li><a href="#features">Hint Quota Enforcement</a></li>
              <li><a href="#socratic">Syntax vs Logic Hints</a></li>
            </ul>
          </div>

          <div className="cs-footer-col">
            <h4>Consortium & Legal</h4>
            <ul>
              <li><a href="#">Privacy & Telemetry Policy</a></li>
              <li><a href="#">Terms of Academic Use</a></li>
              <li><a href="#">Fakultas Ilmu Komputer UB</a></li>
              <li><a href="#">GitHub Repository</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="cs-footer-bottom">
          <div>
            © {new Date().getFullYear()} Navi Systems. Built for competitive programming excellence and academic integrity.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--cs-success-green)' }} />
              All Systems Operational
            </span>
            <span>v1.0.4-rc</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
