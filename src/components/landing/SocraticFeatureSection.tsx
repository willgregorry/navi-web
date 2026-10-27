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
    socraticQuestion: 'How can I fix this IndexError without rewriting the whole loop?',
    socraticHint:
      'Consider that the length of list `arr` is `n`. For a 0-indexed list, what is the maximum valid accessible index? Compare that with the termination limit produced by `range(1, n + 2)`.',
    takeaway: 'Guides index bounds safety without writing the loop for the student.',
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
    socraticQuestion: 'Why does my fibonacci function crash or hang when evaluated at n=0?',
    socraticHint:
      'Reflect on the base cases (halting conditions) of your recursive definition. What happens when the input argument `n` is `0` or negative? Under what condition does the function terminate?',
    takeaway: 'Develops student instinct for identifying recursive termination conditions.',
  },
  {
    id: 'type-coercion',
    name: 'TypeError / Implicit Conversion',
    lang: 'Python',
    codeSnippet: `def calculate_average(scores_input):
    total = sum(scores_input)
    count = len(scores_input)
    return "Average score: " + (total / count)`,
    errorSnippet: 'TypeError: can only concatenate str (not "float") to str',
    socraticQuestion: 'How can I format numeric calculation results alongside descriptive text?',
    socraticHint:
      'Python is a strongly typed language. The `+` operator between strings and floats does not implicitly coerce types. How might you convert the numerical expression into string format or use f-string interpolation?',
    takeaway: 'Reinforces strong type system mechanics on Python 3 runtime.',
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
            <h2 className="cs-section-title">
              Socratic Guidance. <br />
              <span className="cs-monochrome-title">Never Spoon-Feeding.</span>
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
                <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--cs-text-muted)', fontFamily: 'Fira Code, monospace', letterSpacing: '0.05em' }}>
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
                  <AlertTriangle size={14} />
                  <span>RUNTIME EXCEPTION CAPTURED</span>
                </div>
                <div>{activeCase.errorSnippet}</div>
              </div>
            </div>

            {/* Right Column: Socratic AI Guidance */}
            <div className="cs-demo-right">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '8px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      border: '1px solid var(--cs-divider)',
                      color: 'var(--cs-text-main)',
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

                <div style={{ fontSize: '12.5px', color: 'var(--cs-text-secondary)', marginBottom: '10px' }}>
                  <strong style={{ color: 'var(--cs-text-main)' }}>Student asks:</strong> "{activeCase.socraticQuestion}"
                </div>

                <div className="cs-prompt-card">
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <HelpCircle size={16} style={{ color: 'var(--cs-text-main)', flexShrink: 0, marginTop: '2px' }} />
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
                <span><strong style={{ color: 'var(--cs-text-main)' }}>Pedagogical Outcome:</strong> {activeCase.takeaway}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
