import { useState, useEffect, useCallback } from 'react';
import type { ExamConfig } from '../types/exam';
import type { StudentSession, StudentStatus } from '../types/student';
import {
  fetchExamRoomApi,
  createExamRoomApi,
  type BackendRoomCreatePayload,
  type BackendStudentSummary,
} from '../services/api/teacherRoomService';

export function useTeacherDashboard(initialRoomCode: string = 'NAVI-7RX5') {
  const [roomCode, setRoomCode] = useState<string>(initialRoomCode);
  const [exam, setExam] = useState<ExamConfig>({
    roomCode: initialRoomCode,
    title: 'Pengecekan Bilangan Prima (Prime Numbers)',
    description: 'Siswa diminta membuat fungsi is_prime(n) yang menguji apakah n prima atau bukan dengan efisiensi memadai.',
    starterCode: 'def is_prime(n):\n    pass\n',
    maxHints: 5,
    allowSyntaxHints: true,
    allowLogicHints: true,
    testCases: [],
  });

  const [students, setStudents] = useState<StudentSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mapStatus = (rawStatus: string): StudentStatus => {
    const s = (rawStatus || '').toLowerCase();
    if (s === 'passed' || s === 'accepted') return 'passed';
    if (s === 'error' || s === 'wrong_answer') return 'error';
    if (s === 'coding' || s === 'running') return 'coding';
    return 'idle';
  };

  const mapStudents = (backendStudents: BackendStudentSummary[] = []): StudentSession[] => {
    return backendStudents.map((s) => ({
      id: String(s.id),
      name: s.student_name,
      studentId: s.student_id_number,
      startTime: s.started_at ? new Date(s.started_at).toLocaleTimeString() : '10:00:00',
      status: mapStatus(s.last_status),
      hintsUsed: s.hints_used,
      violationCount: s.violation_count,
      isViolating: false,
    }));
  };

  // Fetch live room data from backend
  const refreshRoom = useCallback(async (codeToFetch?: string) => {
    const targetCode = codeToFetch || roomCode;
    if (!targetCode) return;

    try {
      const data = await fetchExamRoomApi(targetCode);
      if (data) {
        setExam({
          roomCode: data.room_code,
          title: data.title,
          description: data.problems?.[0]?.description || 'Ujian Pemrograman Python',
          starterCode: data.problems?.[0]?.starter_code || 'def solution():\n    pass\n',
          maxHints: data.hint_quota,
          allowSyntaxHints: data.allow_syntax_hints,
          allowLogicHints: data.allow_logic_hints,
          testCases: [],
        });

        setStudents(mapStudents(data.students));
        setError(null);
      }
    } catch (err: any) {
      console.warn(`[useTeacherDashboard] Room ${targetCode} not found on backend.`, err.message);
      setError(err.message || 'Room tidak ditemukan.');
    }
  }, [roomCode]);

  // Periodic poll every 5 seconds for live student roster updates
  useEffect(() => {
    refreshRoom();
    const interval = setInterval(() => {
      refreshRoom();
    }, 5000);

    return () => clearInterval(interval);
  }, [refreshRoom]);

  // Create new exam room via backend POST /api/v1/rooms
  const handleCreateRoom = useCallback(async (newConfig: ExamConfig) => {
    setIsLoading(true);
    try {
      const payload: BackendRoomCreatePayload = {
        title: newConfig.title,
        duration_minutes: 90,
        hint_quota: newConfig.maxHints,
        allow_syntax_hints: newConfig.allowSyntaxHints,
        allow_logic_hints: newConfig.allowLogicHints,
        problems: [
          {
            title: newConfig.title,
            difficulty: 'Easy',
            points: 20,
            category: 'Algorithmic Problem',
            description: newConfig.description,
            constraints: ['1 <= n <= 10^6'],
            starter_code: newConfig.starterCode,
            test_cases: newConfig.testCases.map((tc) => ({
              input_data: tc.input,
              expected_output: tc.expectedOutput,
              is_hidden: false,
            })),
          },
        ],
      };

      const res = await createExamRoomApi(payload);
      if (res && res.room_code) {
        const createdCode = res.room_code;
        setRoomCode(createdCode);
        await refreshRoom(createdCode);
        return res;
      }
    } catch (err: any) {
      console.error('[useTeacherDashboard] Failed to create room on backend', err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [refreshRoom]);

  return {
    roomCode,
    setRoomCode,
    exam,
    setExam,
    students,
    setStudents,
    isLoading,
    error,
    refreshRoom,
    handleCreateRoom,
  };
}
