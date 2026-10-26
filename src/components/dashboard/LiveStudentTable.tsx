import React, { useState, useMemo } from 'react';
import type { StudentSession } from '../../types/student';
import {
  AlertCircle,
  CheckCircle,
  Clock,
  ShieldAlert,
  ShieldCheck,
  Search,
  CheckCheck,
  Radio,
} from 'lucide-react';

interface LiveStudentTableProps {
  students: StudentSession[];
  maxHints: number;
}

export const LiveStudentTable: React.FC<LiveStudentTableProps> = ({ students, maxHints }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'violating' | 'submitted'>('all');

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchesSearch =
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.studentId.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterType === 'violating') {
        return s.violationCount > 0;
      }
      if (filterType === 'submitted') {
        return s.isSubmitted;
      }
      return true;
    });
  }, [students, searchQuery, filterType]);

  const getStatusBadge = (student: StudentSession) => {
    if (student.isSubmitted) {
      return (
        <span className="status-tag submitted">
          <CheckCheck size={12} />
          <span>Submitted</span>
        </span>
      );
    }

    const raw = (student.statusRaw || '').toLowerCase();

    if (raw === 'passed' || raw === 'accepted') {
      return (
        <span className="status-tag passed">
          <CheckCircle size={12} />
          <span>Accepted</span>
        </span>
      );
    }
    if (raw === 'syntax_error') {
      return (
        <span className="status-tag error">
          <AlertCircle size={12} />
          <span>Syntax Error</span>
        </span>
      );
    }
    if (raw === 'wrong_answer' || raw === 'error') {
      return (
        <span className="status-tag error">
          <AlertCircle size={12} />
          <span>Wrong Answer</span>
        </span>
      );
    }
    if (raw === 'in_progress' || raw === 'coding' || raw === 'running') {
      return (
        <span className="status-tag coding">
          <Clock size={12} />
          <span>Coding</span>
        </span>
      );
    }

    return <span className="status-tag idle">Idle</span>;
  };

  return (
    <div className="table-container">
      {/* Table Top Controls */}
      <div className="table-header">
        <div className="header-left">
          <div className="table-title-group">
            <h2 className="table-title">Live Candidate Telemetry</h2>
            <span className="student-count-badge">{students.length} Total Registered</span>
          </div>
          <span className="live-feed-pill">
            <Radio size={12} className="pulse-icon" />
            <span>POLLING 5S BACKEND</span>
          </span>
        </div>

        <div className="header-right">
          {/* Search Box */}
          <div className="search-box">
            <Search size={14} className="search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidate name or NIM..."
              className="search-input"
            />
          </div>

          {/* Filter Segmented Control */}
          <div className="filter-segmented">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
            >
              All ({students.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('violating')}
              className={`filter-btn ${filterType === 'violating' ? 'active' : ''}`}
            >
              Violations ({students.filter((s) => s.violationCount > 0).length})
            </button>
            <button
              type="button"
              onClick={() => setFilterType('submitted')}
              className={`filter-btn ${filterType === 'submitted' ? 'active' : ''}`}
            >
              Submitted ({students.filter((s) => s.isSubmitted).length})
            </button>
          </div>
        </div>
      </div>

      {/* Table Table-Wrapper */}
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>CANDIDATE</th>
              <th>CONNECTED AT</th>
              <th>CODE STATUS</th>
              <th>SCORE</th>
              <th>HINTS USED</th>
              <th>SECURITY VIOLATIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr>
                <td colSpan={6} className="empty-table-cell">
                  <div className="empty-state-box">
                    <ShieldCheck size={28} className="empty-icon" />
                    <p className="empty-title">
                      {students.length === 0
                        ? 'Waiting for candidates to connect...'
                        : 'No candidates matched the current filter.'}
                    </p>
                    <p className="empty-sub">
                      Candidates will automatically appear here once they input the room code in Navi App.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => {
                const hasViolated = student.violationCount > 0;
                return (
                  <tr
                    key={student.id}
                    className={`student-row ${hasViolated ? 'row-alert' : ''}`}
                  >
                    {/* Student Identity */}
                    <td className="student-cell">
                      <div className="student-avatar">
                        {student.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="student-text">
                        <span className="candidate-name">{student.name}</span>
                        <span className="candidate-nim">{student.studentId}</span>
                      </div>
                    </td>

                    {/* Time */}
                    <td className="time-cell">
                      <span className="time-text">{student.startTime}</span>
                    </td>

                    {/* Status Badge */}
                    <td className="status-cell">{getStatusBadge(student)}</td>

                    {/* Score */}
                    <td className="score-cell">
                      <span className="score-badge">{student.totalScore} pts</span>
                    </td>

                    {/* Hints Used */}
                    <td className="hint-cell">
                      <span className="hint-pill">
                        {student.hintsUsed} / {maxHints}
                      </span>
                    </td>

                    {/* Violations */}
                    <td className="violation-cell">
                      {hasViolated ? (
                        <div className="violation-badge active">
                          <ShieldAlert size={13} />
                          <span>{student.violationCount}x Alt+Tab</span>
                        </div>
                      ) : (
                        <div className="violation-badge clean">
                          <ShieldCheck size={13} />
                          <span>0 Clean</span>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
