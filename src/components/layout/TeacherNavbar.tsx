import React from 'react';
import { BookOpen, ShieldAlert, PlusCircle } from 'lucide-react';

interface TeacherNavbarProps {
  onNewExam: () => void;
  activeCount: number;
  violationCount: number;
}

export const TeacherNavbar: React.FC<TeacherNavbarProps> = ({
  onNewExam,
  activeCount,
  violationCount,
}) => {
  return (
    <nav className="teacher-navbar">
      <div className="nav-brand">
        <div className="brand-icon">
          <BookOpen size={20} />
        </div>
        <div>
          <span className="brand-name">Navi Educator</span>
          <span className="brand-sub">Dasbor Pengawas Ujian</span>
        </div>
      </div>

      <div className="nav-stats">
        <div className="stat-pill">
          <span className="stat-dot green" />
          <span>{activeCount} Siswa Aktif</span>
        </div>

        {violationCount > 0 && (
          <div className="stat-pill violation">
            <ShieldAlert size={14} />
            <span>{violationCount} Pelanggaran Terdeteksi</span>
          </div>
        )}
      </div>

      <button onClick={onNewExam} className="new-exam-btn">
        <PlusCircle size={15} />
        <span>Buat Sesi Ujian Baru</span>
      </button>
    </nav>
  );
};
