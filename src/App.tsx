import React, { useState } from 'react';
import { TeacherNavbar } from './components/layout/TeacherNavbar';
import { RoomHeaderCard } from './components/dashboard/RoomHeaderCard';
import { LiveStudentTable } from './components/dashboard/LiveStudentTable';
import { CreateExamModal } from './components/dashboard/CreateExamModal';
import { playViolationBeep } from './services/audio/beepAlert';
import type { ExamConfig } from './types/exam';
import type { StudentSession } from './types/student';
import './index.css';

const INITIAL_EXAM: ExamConfig = {
  roomCode: 'NAVI-8392',
  title: 'Pengecekan Bilangan Prima (Prime Numbers)',
  description:
    'Siswa diminta membuat fungsi is_prime(n) yang menguji apakah n prima atau bukan dengan efisiensi memadai.',
  starterCode: 'def is_prime(n):\n    pass\n',
  maxHints: 5,
  allowSyntaxHints: true,
  allowLogicHints: true,
  testCases: [],
};

const INITIAL_STUDENTS: StudentSession[] = [
  {
    id: 'std-1',
    name: 'Willy Gregory',
    studentId: '215150200111001',
    startTime: '10:02:15',
    status: 'coding',
    hintsUsed: 1,
    violationCount: 0,
    isViolating: false,
  },
  {
    id: 'std-2',
    name: 'Ahmad Fauzi',
    studentId: '215150200111045',
    startTime: '10:01:40',
    status: 'error',
    hintsUsed: 2,
    violationCount: 1,
    isViolating: false,
  },
  {
    id: 'std-3',
    name: 'Siti Rahma',
    studentId: '215150200111082',
    startTime: '10:00:10',
    status: 'passed',
    hintsUsed: 0,
    violationCount: 0,
    isViolating: false,
  },
];

export const App: React.FC = () => {
  const [exam, setExam] = useState<ExamConfig>(INITIAL_EXAM);
  const [students, setStudents] = useState<StudentSession[]>(INITIAL_STUDENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Demo tool: simulate student Alt+Tab violation
  const handleSimulateViolation = () => {
    playViolationBeep();

    setStudents((prev) =>
      prev.map((s, idx) => {
        if (idx === 0) {
          return {
            ...s,
            violationCount: s.violationCount + 1,
            isViolating: true,
            status: 'error',
          };
        }
        return s;
      })
    );

    // Auto-reset the active flashing siren after 3 seconds
    setTimeout(() => {
      setStudents((prev) =>
        prev.map((s, idx) => (idx === 0 ? { ...s, isViolating: false } : s))
      );
    }, 3000);
  };

  const totalViolations = students.reduce((acc, curr) => acc + curr.violationCount, 0);

  return (
    <div className="teacher-app-container">
      <TeacherNavbar
        onNewExam={() => setIsModalOpen(true)}
        activeCount={students.length}
        violationCount={totalViolations}
      />

      <main className="dashboard-content">
        <RoomHeaderCard
          exam={exam}
          studentCount={students.length}
          onSimulateViolation={handleSimulateViolation}
        />

        <LiveStudentTable students={students} />
      </main>

      <CreateExamModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={(newConfig) => setExam(newConfig)}
      />
    </div>
  );
};

export default App;
