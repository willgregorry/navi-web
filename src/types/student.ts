export type StudentStatus = 'idle' | 'coding' | 'error' | 'passed' | 'submitted';

export interface StudentSession {
  id: string;
  name: string;
  studentId: string; // NIM
  startTime: string;
  status: StudentStatus;
  statusRaw: string;
  hintsUsed: number;
  violationCount: number;
  totalScore: number;
  isSubmitted: boolean;
  submittedAt?: string | null;
  isViolating?: boolean;
}
