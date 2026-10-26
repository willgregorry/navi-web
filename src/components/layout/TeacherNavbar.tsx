import { ShieldAlert, PlusCircle, ArrowLeft } from 'lucide-react';

interface TeacherNavbarProps {
  onNewExam: () => void;
  onBackToLanding?: () => void;
  activeCount: number;
  violationCount: number;
}

export const TeacherNavbar: React.FC<TeacherNavbarProps> = ({
  onNewExam,
  onBackToLanding,
  activeCount,
  violationCount,
}) => {
  return (
    <nav className="teacher-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {onBackToLanding && (
          <button
            onClick={onBackToLanding}
            className="new-exam-btn"
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
            }}
            title="Kembali ke Landing Page"
          >
            <ArrowLeft size={15} />
            <span>Beranda</span>
          </button>
        )}

        <div className="nav-brand">
          <div className="brand-icon">
            <img src="/navi-favicon.png" alt="Navi" className="nav-logo-img" />
          </div>
          <div>
            <span className="brand-name">Navi Educator</span>
            <span className="brand-sub">Dasbor Pengawas Ujian</span>
          </div>
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
