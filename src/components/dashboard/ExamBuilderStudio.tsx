import React, { useState } from 'react';
import type { BackendRoomCreatePayload, BackendProblemCreate } from '../../services/api/teacherRoomService';
import {
  X,
  Plus,
  Trash2,
  Copy,
  Sparkles,
  Code,
  FileText,
  Sliders,
  CheckCircle2,
  Eye,
  EyeOff,
  AlertCircle,
  Wand2,
} from 'lucide-react';

interface ExamBuilderStudioProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (payload: BackendRoomCreatePayload) => Promise<any>;
}

interface EditableTestCase {
  id: string;
  input_data: string;
  expected_output: string;
  is_hidden: boolean;
}

interface EditableProblem {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  points: number;
  category: string;
  description: string;
  constraints: string[];
  starter_code: string;
  test_cases: EditableTestCase[];
}

export const ExamBuilderStudio: React.FC<ExamBuilderStudioProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  // Global Exam Config
  const [examTitle, setExamTitle] = useState('Algorithms & Data Structures Examination');
  const [durationMinutes, setDurationMinutes] = useState(120);
  const [hintQuota, setHintQuota] = useState(5);
  const [allowSyntax, setAllowSyntax] = useState(true);
  const [allowLogic, setAllowLogic] = useState(true);

  // Multi-problem state
  const [problems, setProblems] = useState<EditableProblem[]>([
    {
      id: 'prob-1',
      title: 'Prime Number Verification',
      difficulty: 'Easy',
      points: 20,
      category: 'Number Theory',
      description:
        'Write a function named `is_prime(n)` that accepts a positive integer `n` and returns `True` if `n` is a prime number, or `False` otherwise.\n\nA prime number is a natural number greater than 1 that has no positive divisors other than 1 and itself.',
      constraints: ['1 <= n <= 10^6', 'Time complexity: O(sqrt(N))', 'Return a boolean (True / False)'],
      starter_code:
        'def is_prime(n: int) -> bool:\n    # Implement prime verification logic below\n    pass\n\nif __name__ == "__main__":\n    n = int(input())\n    print(is_prime(n))\n',
      test_cases: [
        { id: 'tc-1', input_data: '7\n', expected_output: 'True\n', is_hidden: false },
        { id: 'tc-2', input_data: '1\n', expected_output: 'False\n', is_hidden: false },
        { id: 'tc-3', input_data: '12\n', expected_output: 'False\n', is_hidden: true },
        { id: 'tc-4', input_data: '97\n', expected_output: 'True\n', is_hidden: true },
      ],
    },
  ]);

  const [activeProblemIndex, setActiveProblemIndex] = useState(0);
  const [constraintInput, setConstraintInput] = useState('');
  const [previewDescription, setPreviewDescription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const currentProblem = problems[activeProblemIndex] || problems[0];

  const updateCurrentProblem = (patch: Partial<EditableProblem>) => {
    setProblems((prev) =>
      prev.map((p, idx) => (idx === activeProblemIndex ? { ...p, ...patch } : p))
    );
  };

  const handleAddProblem = () => {
    const newProb: EditableProblem = {
      id: `prob-${Date.now()}`,
      title: `Challenge ${problems.length + 1}`,
      difficulty: 'Easy',
      points: 25,
      category: 'Algorithms',
      description: 'Describe the problem statement, inputs, outputs, and edge cases here.',
      constraints: ['1 <= n <= 10^5'],
      starter_code:
        'def solution():\n    # Write your solution here\n    pass\n\nif __name__ == "__main__":\n    solution()\n',
      test_cases: [
        { id: `tc-${Date.now()}-1`, input_data: '', expected_output: '', is_hidden: false },
      ],
    };
    const nextProblems = [...problems, newProb];
    setProblems(nextProblems);
    setActiveProblemIndex(nextProblems.length - 1);
  };

  const handleDuplicateProblem = (idx: number) => {
    const source = problems[idx];
    const copy: EditableProblem = {
      ...source,
      id: `prob-${Date.now()}`,
      title: `${source.title} (Copy)`,
      test_cases: source.test_cases.map((tc, tcIdx) => ({
        ...tc,
        id: `tc-${Date.now()}-${tcIdx}`,
      })),
    };
    const nextProblems = [...problems.slice(0, idx + 1), copy, ...problems.slice(idx + 1)];
    setProblems(nextProblems);
    setActiveProblemIndex(idx + 1);
  };

  const handleDeleteProblem = (idx: number) => {
    if (problems.length <= 1) {
      alert('An exam session must contain at least 1 challenge problem.');
      return;
    }
    const nextProblems = problems.filter((_, i) => i !== idx);
    setProblems(nextProblems);
    setActiveProblemIndex(Math.max(0, idx - 1));
  };

  const handleAddConstraint = () => {
    const trimmed = constraintInput.trim();
    if (!trimmed) return;
    if (!currentProblem.constraints.includes(trimmed)) {
      updateCurrentProblem({
        constraints: [...currentProblem.constraints, trimmed],
      });
    }
    setConstraintInput('');
  };

  const handleRemoveConstraint = (cIndex: number) => {
    updateCurrentProblem({
      constraints: currentProblem.constraints.filter((_, i) => i !== cIndex),
    });
  };

  const handleAddTestCase = () => {
    const newTc: EditableTestCase = {
      id: `tc-${Date.now()}`,
      input_data: '',
      expected_output: '',
      is_hidden: false,
    };
    updateCurrentProblem({
      test_cases: [...currentProblem.test_cases, newTc],
    });
  };

  const handleUpdateTestCase = (tcIdx: number, patch: Partial<EditableTestCase>) => {
    const updated = currentProblem.test_cases.map((tc, i) =>
      i === tcIdx ? { ...tc, ...patch } : tc
    );
    updateCurrentProblem({ test_cases: updated });
  };

  const handleRemoveTestCase = (tcIdx: number) => {
    if (currentProblem.test_cases.length <= 1) {
      alert('Each problem must have at least one test case.');
      return;
    }
    updateCurrentProblem({
      test_cases: currentProblem.test_cases.filter((_, i) => i !== tcIdx),
    });
  };

  // Preset Template Loader
  const handleLoadExamPreset = () => {
    setExamTitle('Algorithms & Data Structures Examination');
    setDurationMinutes(120);
    setHintQuota(5);
    setAllowSyntax(true);
    setAllowLogic(true);
    setProblems([
      {
        id: 'p1',
        title: 'Prime Number Verification',
        difficulty: 'Easy',
        points: 20,
        category: 'Number Theory',
        description:
          'Write a function `is_prime(n)` that accepts a positive integer `n` and returns `True` if `n` is prime, or `False` otherwise.',
        constraints: ['1 <= n <= 10^6', 'O(sqrt(N)) time complexity expected'],
        starter_code:
          'def is_prime(n):\n    # Implement prime check\n    pass\n\nif __name__ == "__main__":\n    print(is_prime(int(input())))\n',
        test_cases: [
          { id: 'p1-1', input_data: '7\n', expected_output: 'True\n', is_hidden: false },
          { id: 'p1-2', input_data: '4\n', expected_output: 'False\n', is_hidden: false },
          { id: 'p1-3', input_data: '97\n', expected_output: 'True\n', is_hidden: true },
        ],
      },
      {
        id: 'p2',
        title: 'Two Sum: Target Pair Index',
        difficulty: 'Easy',
        points: 25,
        category: 'Arrays & Hash Maps',
        description:
          'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.',
        constraints: ['2 <= len(nums) <= 10^4', '-10^9 <= target <= 10^9'],
        starter_code:
          'def two_sum(nums, target):\n    # Return [idx1, idx2]\n    pass\n',
        test_cases: [
          { id: 'p2-1', input_data: 'nums = [2, 7, 11, 15], target = 9\n', expected_output: '[0, 1]\n', is_hidden: false },
          { id: 'p2-2', input_data: 'nums = [3, 2, 4], target = 6\n', expected_output: '[1, 2]\n', is_hidden: false },
        ],
      },
      {
        id: 'p3',
        title: 'Valid Parentheses Sequence',
        difficulty: 'Medium',
        points: 30,
        category: 'Stack & Parsing',
        description:
          'Given a string `s` containing `(`, `)`, `{`, `}`, `[` and `]`, determine if the bracket sequence is valid and balanced.',
        constraints: ['1 <= len(s) <= 10^4', 's consists of brackets only'],
        starter_code:
          'def is_valid_brackets(s):\n    # Use stack parsing\n    pass\n',
        test_cases: [
          { id: 'p3-1', input_data: '()[]{}\n', expected_output: 'True\n', is_hidden: false },
          { id: 'p3-2', input_data: '(]\n', expected_output: 'False\n', is_hidden: false },
          { id: 'p3-3', input_data: '{[]}\n', expected_output: 'True\n', is_hidden: true },
        ],
      },
    ]);
    setActiveProblemIndex(0);
  };

  const handleFinalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
    if (!examTitle.trim()) {
      setErrorMessage('Exam Title cannot be empty.');
      return;
    }

    for (let i = 0; i < problems.length; i++) {
      const p = problems[i];
      if (!p.title.trim()) {
        setErrorMessage(`Problem #${i + 1} is missing a title.`);
        setActiveProblemIndex(i);
        return;
      }
      if (!p.description.trim()) {
        setErrorMessage(`Problem #${i + 1} "${p.title}" requires a problem description.`);
        setActiveProblemIndex(i);
        return;
      }
      if (!p.test_cases.length) {
        setErrorMessage(`Problem #${i + 1} must have at least one test case.`);
        setActiveProblemIndex(i);
        return;
      }
    }

    const payload: BackendRoomCreatePayload = {
      title: examTitle.trim(),
      duration_minutes: durationMinutes,
      hint_quota: hintQuota,
      allow_syntax_hints: allowSyntax,
      allow_logic_hints: allowLogic,
      problems: problems.map((p): BackendProblemCreate => ({
        title: p.title.trim(),
        difficulty: p.difficulty,
        points: p.points,
        category: p.category.trim() || 'Algorithms',
        description: p.description.trim(),
        constraints: p.constraints,
        starter_code: p.starter_code,
        test_cases: p.test_cases.map((tc) => ({
          input_data: tc.input_data,
          expected_output: tc.expected_output,
          is_hidden: tc.is_hidden,
        })),
      })),
    };

    setIsSubmitting(true);
    try {
      await onSubmit(payload);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to publish exam session to server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPoints = problems.reduce((acc, curr) => acc + (curr.points || 0), 0);

  return (
    <div className="studio-overlay">
      <div className="studio-container">
        {/* Top Studio Navbar */}
        <header className="studio-header">
          <div className="studio-brand">
            <div className="studio-badge-icon">
              <img src="/navi-favicon.png" alt="Navi" className="studio-favicon-img" />
            </div>
            <div>
              <div className="studio-title-row">
                <span className="studio-title">Exam & Problem Builder Studio</span>
                <span className="studio-tag">PROCTOR ENGINE</span>
              </div>
              <span className="studio-sub">
                Create structured coding assessments, multi-challenge test suites, and Socratic hints
              </span>
            </div>
          </div>

          <div className="studio-top-actions">
            <button
              type="button"
              onClick={handleLoadExamPreset}
              className="studio-btn preset-btn"
              title="Load standard 3-problem exam template"
            >
              <Wand2 size={14} />
              <span>Load Preset Template</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="studio-btn close-studio-btn"
              title="Close without saving"
            >
              <X size={16} />
            </button>
          </div>
        </header>

        {errorMessage && (
          <div className="studio-alert-banner">
            <AlertCircle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Global Exam Configuration Row */}
        <section className="studio-global-meta">
          <div className="meta-field title-field">
            <label>EXAM / ROOM TITLE</label>
            <input
              type="text"
              value={examTitle}
              onChange={(e) => setExamTitle(e.target.value)}
              placeholder="e.g. Data Structures & Algorithms Midterm 2026"
              className="studio-input"
              required
            />
          </div>

          <div className="meta-field small-field">
            <label>DURATION (MINUTES)</label>
            <input
              type="number"
              min={15}
              max={360}
              value={durationMinutes}
              onChange={(e) => setDurationMinutes(Number(e.target.value))}
              className="studio-input"
            />
          </div>

          <div className="meta-field small-field">
            <label>HINT QUOTA / STUDENT</label>
            <input
              type="number"
              min={0}
              max={20}
              value={hintQuota}
              onChange={(e) => setHintQuota(Number(e.target.value))}
              className="studio-input"
            />
          </div>

          <div className="meta-policy-switches">
            <label className="policy-switch">
              <input
                type="checkbox"
                checked={allowSyntax}
                onChange={(e) => setAllowSyntax(e.target.checked)}
              />
              <span className="switch-text">AST Syntax Hints</span>
            </label>

            <label className="policy-switch">
              <input
                type="checkbox"
                checked={allowLogic}
                onChange={(e) => setAllowLogic(e.target.checked)}
              />
              <span className="switch-text">Socratic Logic Hints</span>
            </label>
          </div>
        </section>

        {/* Main Body: Split Sidebar & Active Problem Workspace */}
        <div className="studio-body">
          {/* Left Problem Navigator Sidebar */}
          <aside className="studio-sidebar">
            <div className="sidebar-top">
              <div className="sidebar-label-row">
                <span className="sidebar-label">CHALLENGES ({problems.length})</span>
                <span className="points-summary">{totalPoints} Total Pts</span>
              </div>
              <button
                type="button"
                onClick={handleAddProblem}
                className="add-problem-btn"
                title="Add another problem"
              >
                <Plus size={14} />
                <span>New Problem</span>
              </button>
            </div>

            <div className="problem-list-scroll">
              {problems.map((prob, idx) => {
                const isActive = idx === activeProblemIndex;
                return (
                  <div
                    key={prob.id}
                    className={`problem-item-card ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveProblemIndex(idx)}
                  >
                    <div className="item-top">
                      <span className="item-num">#{idx + 1}</span>
                      <span className={`diff-pill ${prob.difficulty.toLowerCase()}`}>
                        {prob.difficulty}
                      </span>
                      <span className="item-pts">{prob.points} pts</span>
                    </div>

                    <div className="item-title">{prob.title || 'Untitled Problem'}</div>

                    <div className="item-footer">
                      <span className="item-tc-count">{prob.test_cases.length} test cases</span>
                      <div className="item-quick-actions" onClick={(e) => e.stopPropagation()}>
                        <button
                          type="button"
                          onClick={() => handleDuplicateProblem(idx)}
                          className="item-action-icon"
                          title="Duplicate Problem"
                        >
                          <Copy size={12} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteProblem(idx)}
                          className="item-action-icon delete"
                          title="Delete Problem"
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* Right Active Problem Studio Editor */}
          <main className="studio-editor-pane">
            <div className="editor-content-scroll">
              {/* Problem Metadata Header */}
              <div className="problem-meta-card">
                <div className="meta-grid">
                  <div className="form-cell title-cell">
                    <label>PROBLEM TITLE</label>
                    <input
                      type="text"
                      value={currentProblem.title}
                      onChange={(e) => updateCurrentProblem({ title: e.target.value })}
                      placeholder="e.g. Two Sum: Target Pair Index"
                      className="studio-input"
                    />
                  </div>

                  <div className="form-cell">
                    <label>CATEGORY</label>
                    <input
                      type="text"
                      value={currentProblem.category}
                      onChange={(e) => updateCurrentProblem({ category: e.target.value })}
                      placeholder="e.g. Dynamic Programming"
                      className="studio-input"
                    />
                  </div>

                  <div className="form-cell">
                    <label>DIFFICULTY</label>
                    <div className="difficulty-segmented">
                      {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
                        <button
                          key={diff}
                          type="button"
                          onClick={() => updateCurrentProblem({ difficulty: diff })}
                          className={`diff-opt ${diff.toLowerCase()} ${
                            currentProblem.difficulty === diff ? 'active' : ''
                          }`}
                        >
                          {diff}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-cell">
                    <label>POINTS</label>
                    <input
                      type="number"
                      min={1}
                      max={500}
                      value={currentProblem.points}
                      onChange={(e) => updateCurrentProblem({ points: Number(e.target.value) })}
                      className="studio-input"
                    />
                  </div>
                </div>
              </div>

              {/* Problem Statement & Description */}
              <div className="editor-section-card">
                <div className="section-header">
                  <div className="section-title">
                    <FileText size={15} />
                    <span>Problem Statement (Markdown Supported)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreviewDescription(!previewDescription)}
                    className="preview-toggle-btn"
                  >
                    {previewDescription ? <Code size={13} /> : <Eye size={13} />}
                    <span>{previewDescription ? 'Editor Mode' : 'Preview Statement'}</span>
                  </button>
                </div>

                {previewDescription ? (
                  <div className="markdown-preview-box">
                    <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>
                      {currentProblem.description || 'No description written yet.'}
                    </p>
                  </div>
                ) : (
                  <textarea
                    rows={6}
                    value={currentProblem.description}
                    onChange={(e) => updateCurrentProblem({ description: e.target.value })}
                    placeholder="Provide a clear specification of the task, input formats, output expectations, and mathematical definitions..."
                    className="studio-textarea"
                  />
                )}
              </div>

              {/* Constraints Tag Manager */}
              <div className="editor-section-card">
                <div className="section-header">
                  <div className="section-title">
                    <Sliders size={15} />
                    <span>Execution Constraints & Limits</span>
                  </div>
                </div>

                <div className="constraints-box">
                  <div className="chips-list">
                    {currentProblem.constraints.map((c, cIdx) => (
                      <span key={cIdx} className="constraint-chip">
                        <span>{c}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveConstraint(cIdx)}
                          className="chip-remove-btn"
                        >
                          <X size={11} />
                        </button>
                      </span>
                    ))}
                  </div>

                  <div className="add-constraint-row">
                    <input
                      type="text"
                      value={constraintInput}
                      onChange={(e) => setConstraintInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddConstraint();
                        }
                      }}
                      placeholder="Add constraint (e.g. 1 <= len(nums) <= 10^5) and press Enter"
                      className="studio-input"
                    />
                    <button
                      type="button"
                      onClick={handleAddConstraint}
                      className="studio-btn small-btn"
                    >
                      <Plus size={13} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Starter Code Template */}
              <div className="editor-section-card">
                <div className="section-header">
                  <div className="section-title">
                    <Code size={15} />
                    <span>Python 3 Starter Code Boilerplate</span>
                  </div>
                  <span className="code-hint-tag">Students will receive this initial code</span>
                </div>

                <div className="code-editor-shell">
                  <div className="code-editor-toolbar">
                    <span className="toolbar-lang">PYTHON 3.11</span>
                    <button
                      type="button"
                      onClick={() =>
                        updateCurrentProblem({
                          starter_code:
                            'def solution():\n    # Write logic here\n    pass\n\nif __name__ == "__main__":\n    solution()\n',
                        })
                      }
                      className="toolbar-btn"
                    >
                      Reset Boilerplate
                    </button>
                  </div>
                  <textarea
                    rows={8}
                    value={currentProblem.starter_code}
                    onChange={(e) => updateCurrentProblem({ starter_code: e.target.value })}
                    className="studio-code-textarea"
                    spellCheck={false}
                  />
                </div>
              </div>

              {/* Test Cases Manager */}
              <div className="editor-section-card">
                <div className="section-header">
                  <div className="section-title">
                    <CheckCircle2 size={15} />
                    <span>Verification Test Suite ({currentProblem.test_cases.length})</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleAddTestCase}
                    className="studio-btn small-btn primary"
                  >
                    <Plus size={13} />
                    <span>Add Test Case</span>
                  </button>
                </div>

                <div className="test-cases-list">
                  {currentProblem.test_cases.map((tc, tcIdx) => (
                    <div key={tc.id} className="test-case-item">
                      <div className="tc-header">
                        <span className="tc-index">CASE #{tcIdx + 1}</span>
                        <div className="tc-header-actions">
                          <button
                            type="button"
                            onClick={() =>
                              handleUpdateTestCase(tcIdx, { is_hidden: !tc.is_hidden })
                            }
                            className={`tc-visibility-btn ${tc.is_hidden ? 'hidden-case' : 'public-case'}`}
                            title="Toggle whether students can see this case in the playground or if it is reserved for grading"
                          >
                            {tc.is_hidden ? <EyeOff size={12} /> : <Eye size={12} />}
                            <span>{tc.is_hidden ? 'Hidden (Grading)' : 'Public (Sample)'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveTestCase(tcIdx)}
                            className="tc-delete-btn"
                            title="Remove test case"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </div>

                      <div className="tc-inputs-grid">
                        <div className="tc-input-cell">
                          <label>INPUT DATA (STDIN / ARGUMENTS)</label>
                          <textarea
                            rows={3}
                            value={tc.input_data}
                            onChange={(e) =>
                              handleUpdateTestCase(tcIdx, { input_data: e.target.value })
                            }
                            placeholder="e.g. 7\n or nums = [2, 7, 11, 15], target = 9"
                            className="studio-code-input"
                            spellCheck={false}
                          />
                        </div>

                        <div className="tc-input-cell">
                          <label>EXPECTED OUTPUT</label>
                          <textarea
                            rows={3}
                            value={tc.expected_output}
                            onChange={(e) =>
                              handleUpdateTestCase(tcIdx, { expected_output: e.target.value })
                            }
                            placeholder="e.g. True\n or [0, 1]\n"
                            className="studio-code-input"
                            spellCheck={false}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sticky Bottom Actions Bar */}
            <div className="studio-bottom-bar">
              <div className="bottom-summary">
                <span className="summary-pill">{problems.length} Challenges</span>
                <span className="summary-pill">{totalPoints} Pts</span>
                <span className="summary-pill">{durationMinutes} Mins</span>
              </div>

              <div className="bottom-btns">
                <button
                  type="button"
                  onClick={onClose}
                  className="studio-btn cancel-btn"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="studio-btn publish-btn"
                  disabled={isSubmitting}
                >
                  <Sparkles size={14} />
                  <span>{isSubmitting ? 'Publishing Room...' : 'Launch Live Exam Room'}</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
