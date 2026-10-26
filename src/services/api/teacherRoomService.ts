import { ENV } from '../../config/env';

export interface BackendProblemCreate {
  title: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  points?: number;
  category?: string;
  description: string;
  constraints?: string[];
  starter_code?: string;
  test_cases: {
    input_data?: string;
    expected_output: string;
    is_hidden?: boolean;
  }[];
}

export interface BackendRoomCreatePayload {
  title: string;
  duration_minutes?: number;
  hint_quota?: number;
  allow_syntax_hints?: boolean;
  allow_logic_hints?: boolean;
  problems: BackendProblemCreate[];
}

export interface BackendStudentSummary {
  id: number;
  student_name: string;
  student_id_number: string;
  hints_used: number;
  violation_count: number;
  total_score: number;
  last_status: string;
  is_submitted: boolean;
  started_at: string;
  submitted_at: string | null;
}

export interface BackendRoomDetailResponse {
  id: number;
  room_code: string;
  title: string;
  duration_minutes: number;
  started_at: string;
  expires_at: string | null;
  hint_quota: number;
  allow_syntax_hints: boolean;
  allow_logic_hints: boolean;
  is_active: boolean;
  problems: any[];
  students: BackendStudentSummary[];
}

const BASE_URL = ENV.API_URL.replace(/\/+$/, '');

export async function createExamRoomApi(payload: BackendRoomCreatePayload) {
  const res = await fetch(`${BASE_URL}/rooms`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || 'Gagal membuat room ujian di server backend.');
  }

  return res.json();
}

export async function fetchExamRoomApi(roomCode: string): Promise<BackendRoomDetailResponse> {
  const res = await fetch(`${BASE_URL}/rooms/${roomCode}`, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Room ${roomCode} tidak ditemukan di server backend.`);
  }

  return res.json();
}

export async function closeExamRoomApi(roomCode: string) {
  const res = await fetch(`${BASE_URL}/rooms/${roomCode}/close`, {
    method: 'PATCH',
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `Gagal menutup room ${roomCode}.`);
  }

  return res.json();
}
