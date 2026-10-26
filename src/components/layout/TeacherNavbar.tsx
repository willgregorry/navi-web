import React from 'react';
import { ShieldAlert, Plus, ArrowLeft, Radio } from 'lucide-react';

interface TeacherNavbarProps {
  onNewExam: () => void;
  onBackToLanding?: () => void;
  activeCount: number;
  violationCount: number;
  roomCode: string;
}

export const TeacherNavbar: React.FC<TeacherNavbarProps> = ({
  onNewExam,
  onBackToLanding,
  activeCount,
  violationCount,
  roomCode,
}) => {
  return (
    <nav className="teacher-navbar">
      <div className="nav-left">
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="nav-back-btn"
            title="Return to Landing Page"
          >
            <ArrowLeft size={14} />
            <span>Portal</span>
          </button>
        )}

        <div className="nav-brand">
          <div className="brand-logo-frame">
            <img src="/navi-favicon.png" alt="Navi" className="brand-logo-img" />
          </div>
          <div className="brand-titles">
            <div className="brand-heading-row">
              <span className="brand-title">Navi Educator</span>
              <span className="brand-badge-proctor">PROCTOR</span>
            </div>
            <span className="brand-sub">Real-Time Examination Telemetry</span>
          </div>
        </div>
      </div>

      <div className="nav-center">
        <div className="room-indicator-pill">
          <span className="indicator-label">ROOM</span>
          <span className="indicator-code">{roomCode}</span>
        </div>

        <div className="nav-stat-pill">
          <span className="stat-dot pulse-dot green" />
          <span>{activeCount} Active Candidates</span>
        </div>

        {violationCount > 0 ? (
          <div className="nav-stat-pill violation-alert">
            <ShieldAlert size={14} />
            <span>{violationCount} Violations Logged</span>
          </div>
        ) : (
          <div className="nav-stat-pill clean-status">
            <Radio size={12} />
            <span>Integrity Guard 100%</span>
          </div>
        )}
      </div>

      <div className="nav-right">
        <button onClick={onNewExam} className="create-exam-btn">
          <Plus size={15} />
          <span>New Exam Session</span>
        </button>
      </div>
    </nav>
  );
};
