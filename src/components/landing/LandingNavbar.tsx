import React, { useState } from 'react';
import { LayoutDashboard, Download, Menu, X } from 'lucide-react';

interface LandingNavbarProps {
  onOpenDashboard: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onOpenDashboard }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="cs-header">
      <div className="cs-header-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <a
            href="#"
            className="cs-brand-link"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          >
            <div className="cs-brand-icon">
              <img src="/navi-favicon.png" alt="Navi" className="cs-brand-favicon-img" />
            </div>
            <span className="cs-brand-title">Navi</span>
          </a>

          <nav className="cs-nav-links">
            <a
              href="#features"
              className="cs-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >
              Features
            </a>
            <a
              href="#socratic"
              className="cs-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('socratic');
              }}
            >
              Socratic AI
            </a>
            <a
              href="#workflow"
              className="cs-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('workflow');
              }}
            >
              Workflow
            </a>
            <a
              href="#download"
              className="cs-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('download');
              }}
            >
              Download
            </a>
          </nav>
        </div>

        <div className="cs-header-actions">
          <button
            type="button"
            className="cs-teacher-btn"
            onClick={onOpenDashboard}
            title="Open Teacher Console"
          >
            <LayoutDashboard size={14} />
            <span>Teacher Console</span>
          </button>

          <button
            type="button"
            className="cs-btn-download-nav"
            onClick={() => scrollToSection('download')}
          >
            <Download size={14} />
            <span>Download</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            className="cs-mobile-toggle-btn"
            onClick={() => setIsMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="cs-mobile-menu">
          <nav className="cs-mobile-nav-links">
            <a
              href="#features"
              className="cs-mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            >
              Features
            </a>
            <a
              href="#socratic"
              className="cs-mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('socratic');
              }}
            >
              Socratic AI
            </a>
            <a
              href="#workflow"
              className="cs-mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('workflow');
              }}
            >
              Workflow
            </a>
            <a
              href="#download"
              className="cs-mobile-nav-link"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('download');
              }}
            >
              Download
            </a>
          </nav>

          <div className="cs-mobile-menu-actions">
            <button
              type="button"
              className="cs-teacher-btn"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => {
                setIsMobileOpen(false);
                onOpenDashboard();
              }}
            >
              <LayoutDashboard size={15} />
              <span>Teacher Console</span>
            </button>

            <button
              type="button"
              className="cs-hero-btn-primary"
              style={{ width: '100%', justifyContent: 'center', height: '42px', fontSize: '13px' }}
              onClick={() => scrollToSection('download')}
            >
              <Download size={15} />
              <span>Download for Windows (.exe)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
