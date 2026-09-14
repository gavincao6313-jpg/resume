import type { ResumeData } from "../data/resume";

type Skills = ResumeData["skills"];

export default function Skills({ data }: { data: Skills }) {
  return (
    <section className="section">
      <SectionTitle>技能栈</SectionTitle>
      <div className="skills-grid">
        {data.map((group) => (
          <div key={group.category} className="skill-group">
            <h3 className="skill-category">{group.category}</h3>
            <div className="skill-tags">
              {group.items.map((item) => (
                <span key={item} className="skill-tag">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-title-wrap">
      <h2 className="section-title">{children}</h2>
      <div className="section-divider" />
    </div>
  );
}
