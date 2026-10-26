import React, { useState } from 'react';
import { Sparkles, AlertTriangle, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ErrorDemoCase {
  id: string;
  name: string;
  lang: string;
  codeSnippet: string;
  errorSnippet: string;
  socraticQuestion: string;
  socraticHint: string;
  takeaway: string;
}

const DEMO_CASES: ErrorDemoCase[] = [
  {
    id: 'off-by-one',
    name: 'IndexError / Off-by-one',
    lang: 'Python',
    codeSnippet: `def get_cumulative_sum(arr):
    n = len(arr)
    prefix = [0] * (n + 1)
    for i in range(1, n + 2): # <-- Error here!
        prefix[i] = prefix[i-1] + arr[i]
    return prefix`,
    errorSnippet: 'IndexError: list index out of range on line 5: arr[i]',
    socraticQuestion: 'Bagaimana cara memperbaiki IndexError ini tanpa mengulang perulangan?',
    socraticHint:
      'Perhatikan panjang list `arr` adalah `n`. Jika indeks list berbasis 0, berapakah indeks maksimum yang valid untuk `arr`? Bandingkan dengan nilai akhir dari `range(1, n + 2)`.',
    takeaway: 'Membimbing pemahaman batas indeks (bounds safety) tanpa menuliskan ulang loop for.',
  },
  {
    id: 'recursion',
    name: 'RecursionError / Stack Overflow',
    lang: 'Python',
    codeSnippet: `def fibonacci(n):
    # Missing base case check for n <= 0!
    if n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)`,
    errorSnippet: 'RecursionError: maximum recursion depth exceeded while calling a Python object',
    socraticQuestion: 'Kenapa fungsi fibonacci saya hang / crash saat dicoba dengan n=0?',
    socraticHint:
      'Pikirkan tentang Base Case (kondisi berhenti) rekursi. Apa yang terjadi jika nilai `n` yang dimasukkan adalah `0` atau angka negatif? Kapan fungsinya akan berhenti memanggil dirinya sendiri?',
    takeaway: 'Menumbuhkan insting identifikasi basis rekursi secara mandiri.',
  },
  {
    id: 'type-coercion',
    name: 'TypeError / Implicit Conversion',
    lang: 'Python',
    codeSnippet: `def calculate_average(scores_input):
    total = sum(scores_input)
    count = len(scores_input)
    return "Nilai rata-rata: " + (total / count)`,
    errorSnippet: 'TypeError: can only concatenate str (not "float") to str',
    socraticQuestion: 'Bagaimana cara menampilkan hasil perhitungan bersama teks?',
    socraticHint:
      'Python adalah bahasa yang strongly-typed. Operasi `+` antara teks (`str`) dan angka (`float`) tidak otomatis mengkonversi tipe data. Bagaimana cara kamu mengubah ekspresi numerik tersebut menjadi teks sebelum digabungkan?',
    takeaway: 'Memperkuat konsep Strong vs Weak Typing pada runtime Python.',
  },
];

export const SocraticFeatureSection: React.FC = () => {
  const [activeCaseId, setActiveCaseId] = useState<string>('off-by-one');

  const activeCase = DEMO_CASES.find((c) => c.id === activeCaseId) || DEMO_CASES[0];

  return (
    <section id="socratic" className="cs-section">
      <div className="cs-section-inner">
        <div className="cs-section-header">
          <div>
            <span className="cs-section-tag">Proprietary AI Architecture</span>
            <h2 className="cs-section-title">
              Socratic Guidance. <br />
              <span className="cs-gradient-text">Never Spoon-Feeding.</span>
            </h2>
          </div>
          <p className="cs-section-desc">
            Standard AI chatbots ruin academic assessment by directly generating code solutions. Navi's pedagogical engine interrogates the student's cognitive blindspots, asking thoughtful guiding questions that spark genuine understanding.
          </p>
        </div>

        {/* Interactive Demo Box */}
        <div className="cs-socratic-demo-box">
          <div className="cs-demo-tab-bar">
            {DEMO_CASES.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`cs-tab-btn ${activeCaseId === item.id ? 'active' : ''}`}
                onClick={() => setActiveCaseId(item.id)}
              >
                {item.name}
              </button>
            ))}
          </div>

          <div className="cs-demo-grid">
            {/* Left Column: Student Code & Runtime Error */}
            <div className="cs-demo-left">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--cs-text-muted)', fontFamily: 'Fira Code, monospace' }}>
                  STUDENT CODE SUBMISSION
                </span>
                <span style={{ fontSize: '11px', color: 'var(--cs-text-dim)', fontFamily: 'Fira Code, monospace' }}>
                  {activeCase.lang} 3.11
                </span>
              </div>

              <div className="cs-mockup-codebox">
                <pre style={{ margin: 0 }}>
                  <code>{activeCase.codeSnippet}</code>
                </pre>
              </div>

              <div className="cs-exception-alert">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', fontWeight: 700 }}>
                  <AlertTriangle size={15} />
                  <span>RUNTIME EXCEPTION CAPTURED</span>
                </div>
                <div>{activeCase.errorSnippet}</div>
              </div>
            </div>

            {/* Right Column: Socratic AI Guidance */}
            <div className="cs-demo-right">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '8px',
                      background: 'rgba(13, 68, 232, 0.2)',
                      color: 'var(--cs-brand-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--cs-text-main)' }}>
                      NAVI SOCRATIC PROMPT
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--cs-text-muted)' }}>
                      Context-Aware Cognitive Tutor
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '12px', color: 'var(--cs-text-secondary)', marginBottom: '8px' }}>
                  <strong>Student asks:</strong> "{activeCase.socraticQuestion}"
                </div>

                <div className="cs-prompt-card">
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <HelpCircle size={18} style={{ color: 'var(--cs-brand-blue)', flexShrink: 0, marginTop: '2px' }} />
                    <div>
                      <p style={{ margin: 0 }}>{activeCase.socraticHint}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: 'var(--cs-surface-elevated)',
                  border: '1px solid var(--cs-divider)',
                  borderRadius: '12px',
                  padding: '12px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontSize: '12px',
                  color: 'var(--cs-text-secondary)',
                }}
              >
                <CheckCircle2 size={16} style={{ color: 'var(--cs-success-green)', flexShrink: 0 }} />
                <span><strong>Pedagogical Outcome:</strong> {activeCase.takeaway}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
