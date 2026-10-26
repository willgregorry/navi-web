import React, { useState } from 'react';
import { LandingPageView } from './components/landing/LandingPageView';
import { TeacherNavbar } from './components/layout/TeacherNavbar';
import { RoomHeaderCard } from './components/dashboard/RoomHeaderCard';
import { LiveStudentTable } from './components/dashboard/LiveStudentTable';
import { ExamBuilderStudio } from './components/dashboard/ExamBuilderStudio';
import { useTeacherDashboard } from './hooks/useTeacherDashboard';
import './index.css';

export const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [isStudioOpen, setIsStudioOpen] = useState(false);

  // Real backend connection hook for Teacher Console
  const {
    roomCode,
    setRoomCode,
    exam,
    students,
    isRefreshing,
    refreshRoom,
    handleCreateRoom,
  } = useTeacherDashboard('NAVI-SU5Y');

  if (view === 'landing') {
    return <LandingPageView onOpenDashboard={() => setView('dashboard')} />;
  }

  const totalViolations = students.reduce((acc, curr) => acc + curr.violationCount, 0);

  return (
    <div className="teacher-app-container">
      <TeacherNavbar
        onNewExam={() => setIsStudioOpen(true)}
        onBackToLanding={() => setView('landing')}
        activeCount={students.length}
        violationCount={totalViolations}
        roomCode={roomCode}
      />

      <main className="dashboard-content">
        <RoomHeaderCard
          exam={exam}
          studentCount={students.length}
          violationCount={totalViolations}
          isRefreshing={isRefreshing}
          onRefresh={() => refreshRoom()}
          onSwitchRoom={(newCode) => {
            setRoomCode(newCode);
            refreshRoom(newCode);
          }}
        />

        <LiveStudentTable students={students} maxHints={exam.maxHints} />
      </main>

      {/* UX-Friendly Multi-Problem Exam & Problem Builder Studio */}
      <ExamBuilderStudio
        isOpen={isStudioOpen}
        onClose={() => setIsStudioOpen(false)}
        onSubmit={async (payload) => {
          await handleCreateRoom(payload);
          setIsStudioOpen(false);
        }}
      />
    </div>
  );
};

export default App;
