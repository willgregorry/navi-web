import React, { useState } from 'react';
import type { ExamConfig } from '../../types/exam';
import { X, Sparkles } from 'lucide-react';

interface CreateExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (config: ExamConfig) => void;
}

export const CreateExamModal: React.FC<CreateExamModalProps> = ({
  isOpen,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState('Pengecekan Bilangan Prima');
  const [description, setDescription] = useState(
    'Buatlah fungsi is_prime(n) yang mengembalikan True jika n adalah bilangan prima, dan False jika bukan.'
  );
  const [starterCode, setStarterCode] = useState(
    'def is_prime(n):\n    # Tulis logika di sini\n    pass\n'
  );
  const [maxHints, setMaxHints] = useState(5);
  const [allowSyntax, setAllowSyntax] = useState(true);
  const [allowLogic, setAllowLogic] = useState(true);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const randomCode = `NAVI-${Math.floor(1000 + Math.random() * 9000)}`;
    onCreate({
      roomCode: randomCode,
      title,
      description,
      starterCode,
      maxHints,
      allowSyntaxHints: allowSyntax,
      allowLogicHints: allowLogic,
      testCases: [
        { id: '1', input: 'n = 7', expectedOutput: 'True' },
        { id: '2', input: 'n = 4', expectedOutput: 'False' },
      ],
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-dialog">
        <div className="modal-header">
          <h2>Buat Sesi Ujian Koding Baru</h2>
          <button onClick={onClose} className="close-btn"><X size={18} /></button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Judul Soal</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Deskripsi Masalah</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Starter Code (Python 3)</label>
            <textarea
              rows={4}
              className="code-textarea"
              value={starterCode}
              onChange={(e) => setStarterCode(e.target.value)}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Batas Kuota Hint Siswa</label>
              <input
                type="number"
                min={0}
                max={10}
                value={maxHints}
                onChange={(e) => setMaxHints(Number(e.target.value))}
              />
            </div>

            <div className="checkbox-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={allowSyntax}
                  onChange={(e) => setAllowSyntax(e.target.checked)}
                />
                <span>Aktifkan Hint Sintaks (AST)</span>
              </label>

              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={allowLogic}
                  onChange={(e) => setAllowLogic(e.target.checked)}
                />
                <span>Aktifkan Hint Logika Sokratik</span>
              </label>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="cancel-btn">Batal</button>
            <button type="submit" className="submit-exam-btn">
              <Sparkles size={14} />
              <span>Generate Ruangan Ujian</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
