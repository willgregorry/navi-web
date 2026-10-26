import React from 'react';
import type { StudentSession } from '../../types/student';
import { AlertCircle, CheckCircle, Clock, ShieldAlert } from 'lucide-react';

interface LiveStudentTableProps {
  students: StudentSession[];
}

export const LiveStudentTable: React.FC<LiveStudentTableProps> = ({ students }) => {
  const getStatusBadge = (status: StudentSession['status']) => {
    switch (status) {
      case 'passed':
        return <span className="status-tag passed"><CheckCircle size={12} /> Lolos (Accepted)</span>;
      case 'error':
        return <span className="status-tag error"><AlertCircle size={12} /> Mengalami Eror</span>;
      case 'coding':
        return <span className="status-tag coding"><Clock size={12} /> Sedang Mengetik</span>;
      default:
        return <span className="status-tag idle">Belum Memulai</span>;
    }
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h2>Pemantauan Siswa Real-Time</h2>
        <span className="live-indicator">
          <span className="pulse-dot" /> LIVE WEBSOCKET
        </span>
      </div>

      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>Nama Siswa & NIM</th>
              <th>Waktu Mulai</th>
              <th>Status Kode</th>
              <th>Hint Terpakai</th>
              <th>Pelanggaran Alt+Tab</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-table">
                  Belum ada siswa yang bergabung ke ruangan ini.
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr
                  key={student.id}
                  className={student.isViolating ? 'row-violating' : ''}
                >
                  <td className="student-cell">
                    <div className="student-avatar">{student.name.charAt(0)}</div>
                    <div>
                      <div className="name">{student.name}</div>
                      <div className="nim">{student.studentId}</div>
                    </div>
                  </td>
                  <td className="time-cell">{student.startTime}</td>
                  <td>{getStatusBadge(student.status)}</td>
                  <td className="hint-cell">
                    <span className="hint-pill">{student.hintsUsed} hint</span>
                  </td>
                  <td>
                    {student.violationCount > 0 ? (
                      <div className={`violation-pill ${student.isViolating ? 'active-siren' : ''}`}>
                        <ShieldAlert size={14} />
                        <span>{student.violationCount}x {student.isViolating ? '(SEDANG BLUR!)' : ''}</span>
                      </div>
                    ) : (
                      <span className="clean-pill">0x Bersih</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
