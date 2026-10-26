import React from 'react';
import { Download, LayoutDashboard } from 'lucide-react';

interface BottomCTAProps {
  onOpenDashboard: () => void;
  onDownloadClick: () => void;
}

export const BottomCTA: React.FC<BottomCTAProps> = ({ onOpenDashboard, onDownloadClick }) => {
  return (
    <section className="cs-bottom-cta">
      <div className="cs-bottom-ambient-glow" />

      <div className="cs-bottom-cta-inner">
        <div className="cs-app-badge-center">
          <img src="/navi-favicon.png" alt="Navi" className="cs-cta-favicon-img" />
        </div>

        <h2 className="cs-bottom-title">
          Ready to Elevate Your <br />
          Programming Lab Examinations?
        </h2>

        <p className="cs-bottom-desc">
          Equip your students with the pedagogical power of Socratic AI guidance while safeguarding complete academic honesty.
        </p>

        <div className="cs-cta-buttons-row">
          <button
            type="button"
            className="cs-hero-btn-primary"
            onClick={onDownloadClick}
          >
            <Download size={18} />
            <span>Download for Windows (.exe)</span>
          </button>

          <button
            type="button"
            className="cs-hero-btn-secondary"
            onClick={onOpenDashboard}
          >
            <LayoutDashboard size={16} />
            <span>Open Teacher Console</span>
          </button>
        </div>

        <div className="cs-bottom-meta">
          Compatible with Windows 10 & 11 · Zero installation required for portable mode
        </div>
      </div>
    </section>
  );
};
