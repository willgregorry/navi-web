export type StudentStatus = 'idle' | 'coding' | 'error' | 'passed';

export interface StudentSession {
  id: string;
  name: string;
  studentId: string; // NIM
  startTime: string;
  status: StudentStatus;
  hintsUsed: number;
  violationCount: number;
  isViolating: boolean; // true during active alt-tab blur
  lastViolationTime?: string;
}
