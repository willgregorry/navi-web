import { useState, useEffect, useCallback, useRef } from 'react';
import type { ExamConfig, ProblemConfig } from '../types/exam';
import type { StudentSession, StudentStatus } from '../types/student';
import {
  fetchExamRoomApi,
  createExamRoomApi,
  type BackendRoomCreatePayload,
  type BackendStudentSummary,
  type BackendProblemResponse,
} from '../services/api/teacherRoomService';

export function useTeacherDashboard(initialRoomCode: string = 'NAVI-SU5Y') {
  const [roomCode, setRoomCode] = useState<string>(initialRoomCode);
  const [exam, setExam] = useState<ExamConfig>({
    roomCode: initialRoomCode,
    title: 'Algorithms & Data Structures Midterm Examination',
    durationMinutes: 120,
    maxHints: 5,
    allowSyntaxHints: true,
    allowLogicHints: true,
    isActive: true,
    problems: [],
  });

  const [students, setStudents] = useState<StudentSession[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isMountedRef = useRef<boolean>(true);

  const mapStatus = (rawStatus: string, isSubmitted: boolean): StudentStatus => {
    if (isSubmitted) return 'submitted';
    const s = (rawStatus || '').toLowerCase();
    if (s === 'passed' || s === 'accepted') return 'passed';
    if (s === 'error' || s === 'wrong_answer' || s === 'syntax_error') return 'error';
    if (s === 'coding' || s === 'running' || s === 'in_progress') return 'coding';
    return 'idle';
  };

  const mapStudents = (backendStudents: BackendStudentSummary[] = []): StudentSession[] => {
    return backendStudents.map((s) => ({
      id: String(s.id),
      name: s.student_name,
      studentId: s.student_id_number,
      startTime: s.started_at ? new Date(s.started_at).toLocaleTimeString() : 'Active',
      status: mapStatus(s.last_status, s.is_submitted),
      statusRaw: s.last_status || 'idle',
      hintsUsed: s.hints_used ?? 0,
      violationCount: s.violation_count ?? 0,
      totalScore: s.total_score ?? 0,
      isSubmitted: Boolean(s.is_submitted),
      submittedAt: s.submitted_at,
    }));
  };

  const mapProblems = (backendProblems: BackendProblemResponse[] = []): ProblemConfig[] => {
    return backendProblems.map((p, idx) => ({
      id: String(p.id ?? idx + 1),
      title: p.title,
      difficulty: (p.difficulty === 'Medium' || p.difficulty === 'Hard') ? p.difficulty : 'Easy',
      points: p.points ?? 25,
      category: p.category || 'Algorithms',
      description: p.description || '',
      constraints: p.constraints || [],
      starterCode: p.starter_code || 'def solution():\n    pass\n',
      testCases: (p.test_cases || []).map((tc, tcIdx) => ({
        id: String(tc.id ?? tcIdx + 1),
        input: tc.input_data || '',
        expectedOutput: tc.expected_output || '',
        isHidden: Boolean(tc.is_hidden),
      })),
    }));
  };

  // Fetch live room data from backend
  const refreshRoom = useCallback(async (codeToFetch?: string) => {
    const targetCode = (codeToFetch || roomCode).trim().toUpperCase();
    if (!targetCode) return;

    setIsRefreshing(true);
    try {
      const data = await fetchExamRoomApi(targetCode);
      if (!isMountedRef.current) return;

      if (data) {
        setRoomCode(data.room_code);
        setExam({
          roomCode: data.room_code,
          title: data.title,
          durationMinutes: data.duration_minutes ?? 120,
          maxHints: data.hint_quota ?? 5,
          allowSyntaxHints: data.allow_syntax_hints ?? true,
          allowLogicHints: data.allow_logic_hints ?? true,
          isActive: data.is_active ?? true,
          problems: mapProblems(data.problems),
        });

        setStudents(mapStudents(data.students));
        setError(null);
      }
    } catch (err: any) {
      if (!isMountedRef.current) return;
      console.warn(`[useTeacherDashboard] Room ${targetCode} fetch error:`, err.message);
      setError(err.message || 'Room tidak ditemukan.');
    } finally {
      if (isMountedRef.current) {
        setIsRefreshing(false);
      }
    }
  }, [roomCode]);

  // Periodic poll every 5 seconds for live student roster updates
  useEffect(() => {
    isMountedRef.current = true;
    refreshRoom();

    const interval = setInterval(() => {
      refreshRoom();
    }, 5000);

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
    };
  }, [refreshRoom]);

  // Create new exam room via backend POST /api/v1/rooms
  const handleCreateRoom = useCallback(async (payload: BackendRoomCreatePayload) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await createExamRoomApi(payload);
      if (res && res.room_code) {
        const createdCode = res.room_code;
        setRoomCode(createdCode);
        await refreshRoom(createdCode);
        return res;
      }
      throw new Error('Respons pembuatan room tidak valid dari server.');
    } catch (err: any) {
      console.error('[useTeacherDashboard] Failed to create room on backend', err);
      setError(err.message || 'Gagal membuat room ujian.');
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
    isRefreshing,
    error,
    refreshRoom,
    handleCreateRoom,
  };
}
