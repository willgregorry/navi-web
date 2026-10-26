import React from 'react';
import { Sun, Moon, LayoutDashboard, Download } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface LandingNavbarProps {
  onOpenDashboard: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({ onOpenDashboard }) => {
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (id: string) => {
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="cs-brand-title">Navi</span>
              <span className="cs-version-pill">v1.0.4-rc</span>
            </div>
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
            className="cs-theme-btn"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

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
            <span>Download for Windows</span>
          </button>
        </div>
      </div>
    </header>
  );
};
