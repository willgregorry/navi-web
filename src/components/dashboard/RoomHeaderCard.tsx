import React from 'react';
import type { ExamConfig } from '../../types/exam';
import { Copy, Users, Check, Sparkles, AlertTriangle } from 'lucide-react';

interface RoomHeaderCardProps {
  exam: ExamConfig;
  studentCount: number;
  onSimulateViolation: () => void;
}

export const RoomHeaderCard: React.FC<RoomHeaderCardProps> = ({
  exam,
  studentCount,
  onSimulateViolation,
}) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(exam.roomCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="room-header-card">
      <div className="room-meta">
        <span className="exam-tag">Python 3 Exam Session</span>
        <h1 className="exam-title">{exam.title}</h1>
        <p className="exam-desc">{exam.description.slice(0, 120)}...</p>

        <div className="rule-badges">
          <span className="badge">
            <Sparkles size={12} /> Max {exam.maxHints} Hint
          </span>
          {exam.allowSyntaxHints && <span className="badge">✓ Bantuan Sintaks</span>}
          {exam.allowLogicHints && <span className="badge">✓ Bantuan Logika</span>}
        </div>
      </div>

      <div className="room-actions">
        <div className="room-code-box">
          <span className="label">KODE RUANGAN SISWA</span>
          <div className="code-display">
            <strong>{exam.roomCode}</strong>
            <button onClick={handleCopy} className="copy-btn" title="Salin Kode">
              {copied ? <Check size={14} color="#10b981" /> : <Copy size={14} />}
            </button>
          </div>
          <span className="code-hint">Bagikan kode ini ke siswa di kelas</span>
        </div>

        <div className="quick-tools">
          <div className="tool-stat">
            <Users size={16} />
            <span>{studentCount} Terhubung</span>
          </div>

          <button
            onClick={onSimulateViolation}
            className="simulate-btn"
            title="Simulasikan siswa melakukan Alt+Tab untuk demo juri"
          >
            <AlertTriangle size={14} />
            <span>Simulasi Alt+Tab</span>
          </button>
        </div>
      </div>
    </div>
  );
};
