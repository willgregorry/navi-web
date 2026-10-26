export interface TestCaseConfig {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface ProblemConfig {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  category: string;
  description: string;
  constraints: string[];
  starterCode: string;
  testCases: TestCaseConfig[];
}

export interface ExamConfig {
  roomCode: string;
  title: string;
  durationMinutes: number;
  maxHints: number;
  allowSyntaxHints: boolean;
  allowLogicHints: boolean;
  isActive: boolean;
  problems: ProblemConfig[];
}
