import React from 'react';
import { Download, Shield, LayoutDashboard } from 'lucide-react';

interface BottomCTAProps {
  onOpenDashboard: () => void;
  onDownloadClick: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onOpenDashboard, onDownloadClick }) => {
  return (
    <section className="cs-bottom-cta">
      <div className="cs-cosmic-glow" />

      <div className="cs-bottom-cta-inner">
        <div className="cs-app-badge-center">
          <Shield size={36} strokeWidth={2.2} />
        </div>

        <h2 className="cs-bottom-title">
          Ready to Elevate Your <br />
          Programming Lab Examinations?
        </h2>

        <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '640px', lineHeight: 1.6, marginBottom: '36px' }}>
          Equip your students with the pedagogical power of Socratic AI guidance while safeguarding complete academic honesty.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            type="button"
            className="cs-hero-btn-primary"
            onClick={onDownloadClick}
            style={{ height: '54px', padding: '0 32px' }}
          >
            <Download size={19} />
            <span>Download for Windows</span>
          </button>

          <button
            type="button"
            className="cs-hero-btn-secondary"
            onClick={onOpenDashboard}
            style={{
              height: '54px',
              padding: '0 24px',
              background: 'rgba(255, 255, 255, 0.08)',
              borderColor: 'rgba(255, 255, 255, 0.2)',
              color: '#ffffff',
            }}
          >
            <LayoutDashboard size={18} />
            <span>Open Teacher Console</span>
          </button>
        </div>

        <div style={{ marginTop: '28px', fontSize: '12.5px', color: 'rgba(255, 255, 255, 0.4)' }}>
          Compatible with Windows 10 & 11 · Zero installation required for portable mode
        </div>
      </div>
    </section>
  );
};
