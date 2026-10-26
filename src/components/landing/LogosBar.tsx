import React from 'react';
import { Award, GraduationCap, Building2, Terminal, Code2, ShieldCheck, Laptop2, Binary } from 'lucide-react';

const PARTNERS = [
  { name: 'Universitas Brawijaya', icon: <GraduationCap size={16} /> },
  { name: 'Academic Examination Board', icon: <Award size={16} /> },
  { name: 'Fakultas Ilmu Komputer (FILKOM)', icon: <Building2 size={16} /> },
  { name: 'Computer Science Laboratory', icon: <Code2 size={16} /> },
  { name: 'Cyber Security Lab UB', icon: <ShieldCheck size={16} /> },
  { name: 'Software Engineering Society', icon: <Binary size={16} /> },
  { name: 'Informatics Education Network', icon: <Laptop2 size={16} /> },
  { name: 'Python Academic Consortium', icon: <Terminal size={16} /> },
];

export const LogosBar: React.FC = () => {
  return (
    <section className="cs-marquee-section">
      <div className="cs-marquee-title">
        TRUSTED BY COMPUTER SCIENCE FACULTIES & ACADEMIC EXAMINATION CENTERS ACROSS INDONESIA
      </div>
      <div className="cs-marquee-track">
        {/* Render twice for continuous infinite loop */}
        {[...PARTNERS, ...PARTNERS].map((item, idx) => (
          <div key={idx} className="cs-partner-item">
            <div className="cs-partner-icon">{item.icon}</div>
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
};
