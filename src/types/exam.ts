export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
}

export interface ExamConfig {
  roomCode: string;
  title: string;
  description: string;
  starterCode: string;
  maxHints: number;
  allowSyntaxHints: boolean;
  allowLogicHints: boolean;
  testCases: TestCase[];
}
