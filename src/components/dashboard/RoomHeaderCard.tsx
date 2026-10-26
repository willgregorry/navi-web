import React, { useState } from 'react';
import type { ExamConfig } from '../../types/exam';
import {
  Copy,
  Users,
  Check,
  Sparkles,
  RefreshCw,
  Clock,
  Layers,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
} from 'lucide-react';

interface RoomHeaderCardProps {
  exam: ExamConfig;
  studentCount: number;
  violationCount: number;
  isRefreshing: boolean;
  onRefresh: () => void;
  onSwitchRoom: (newCode: string) => void;
}

export const RoomHeaderCard: React.FC<RoomHeaderCardProps> = ({
  exam,
  studentCount,
  violationCount,
  isRefreshing,
  onRefresh,
  onSwitchRoom,
}) => {
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [isSwitching, setIsSwitching] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(exam.roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleApplySwitch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inputCode.trim().toUpperCase();
    if (clean) {
      onSwitchRoom(clean);
      setIsSwitching(false);
      setInputCode('');
    }
  };

  return (
    <div className="room-header-card">
      <div className="room-meta">
        <div className="meta-badge-row">
          <span className="live-status-pill">
            <span className="pulse-dot green" />
            LIVE ACTIVE SESSION
          </span>
          <span className="platform-tag">Python 3.11 Runtime</span>
        </div>

        <h1 className="exam-title">{exam.title}</h1>

        <div className="exam-stat-chips">
          <span className="stat-chip">
            <Clock size={13} />
            <span>{exam.durationMinutes} Mins Duration</span>
          </span>
          <span className="stat-chip">
            <Layers size={13} />
            <span>{exam.problems.length} Challenges</span>
          </span>
          <span className="stat-chip">
            <Sparkles size={13} />
            <span>Max {exam.maxHints} Hints</span>
          </span>
          {exam.allowSyntaxHints && <span className="stat-chip accent">✓ AST Syntax</span>}
          {exam.allowLogicHints && <span className="stat-chip accent">✓ Socratic Logic</span>}
        </div>
      </div>

      <div className="room-actions-pane">
        {/* Room Code Display Box */}
        <div className="room-code-box">
          <div className="code-header">
            <span className="label">STUDENT ACCESS CODE</span>
            <button
              type="button"
              onClick={() => setIsSwitching(!isSwitching)}
              className="switch-toggle-btn"
            >
              {isSwitching ? 'Cancel' : 'Switch Room'}
            </button>
          </div>

          {isSwitching ? (
            <form onSubmit={handleApplySwitch} className="switch-room-form">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="e.g. NAVI-SU5Y"
                className="switch-room-input"
                autoFocus
              />
              <button type="submit" className="switch-submit-btn">
                <ArrowRight size={14} />
              </button>
            </form>
          ) : (
            <div className="code-display">
              <strong className="code-text">{exam.roomCode}</strong>
              <button onClick={handleCopy} className="copy-btn" title="Copy Room Code">
                {copied ? <Check size={14} color="#22c55e" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          )}
          <span className="code-hint">Students enter this code in Navi App kiosk</span>
        </div>

        {/* Live Metrics & Quick Tools */}
        <div className="room-metrics-grid">
          <div className="metric-box">
            <div className="metric-icon">
              <Users size={16} />
            </div>
            <div className="metric-info">
              <span className="metric-num">{studentCount}</span>
              <span className="metric-lbl">Active Students</span>
            </div>
          </div>

          <div className={`metric-box ${violationCount > 0 ? 'violation' : ''}`}>
            <div className="metric-icon">
              {violationCount > 0 ? <ShieldAlert size={16} /> : <ShieldCheck size={16} />}
            </div>
            <div className="metric-info">
              <span className="metric-num">{violationCount}</span>
              <span className="metric-lbl">Total Violations</span>
            </div>
          </div>

          <button
            onClick={onRefresh}
            className={`refresh-room-btn ${isRefreshing ? 'spinning' : ''}`}
            title="Refresh room telemetry from backend"
          >
            <RefreshCw size={14} />
            <span>Sync</span>
          </button>
        </div>
      </div>
    </div>
  );
};
