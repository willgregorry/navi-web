import React, { useState } from 'react';
import { LandingPageView } from './components/landing/LandingPageView';
import { TeacherNavbar } from './components/layout/TeacherNavbar';
import { RoomHeaderCard } from './components/dashboard/RoomHeaderCard';
import { LiveStudentTable } from './components/dashboard/LiveStudentTable';
import { CreateExamModal } from './components/dashboard/CreateExamModal';
import { playViolationBeep } from './services/audio/beepAlert';
import { useTeacherDashboard } from './hooks/useTeacherDashboard';
import './index.css';

export const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Real backend connection hook for Teacher Console
  const {
    exam,
    setExam,
    students,
    setStudents,
    handleCreateRoom,
  } = useTeacherDashboard('NAVI-7RX5');

  // Demo audio tool: simulate student Alt+Tab violation locally if testing siren
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

    setTimeout(() => {
      setStudents((prev) =>
        prev.map((s, idx) => (idx === 0 ? { ...s, isViolating: false } : s))
      );
    }, 3000);
  };

  if (view === 'landing') {
    return <LandingPageView onOpenDashboard={() => setView('dashboard')} />;
  }

  const totalViolations = students.reduce((acc, curr) => acc + curr.violationCount, 0);

  return (
    <div className="teacher-app-container">
      <TeacherNavbar
        onNewExam={() => setIsModalOpen(true)}
        onBackToLanding={() => setView('landing')}
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
        onCreate={async (newConfig) => {
          try {
            await handleCreateRoom(newConfig);
          } catch {
            setExam(newConfig);
          }
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default App;
