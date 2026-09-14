import { SectionTitle } from "./Skills";
import type { ResumeData } from "../data/resume";

type Education = ResumeData["education"];

export default function Education({ data }: { data: Education }) {
  return (
    <section className="section">
      <SectionTitle>教育经历</SectionTitle>
      <div className="timeline">
        {data.map((edu, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="entry-header">
                <div>
                  <h3 className="entry-title">{edu.school}</h3>
                  <p className="entry-subtitle">{edu.degree}</p>
                </div>
                <div className="edu-meta">
                  <span className="entry-period">{edu.period}</span>
                  {edu.gpa && <span className="edu-gpa">GPA {edu.gpa}</span>}
                </div>
              </div>
              {edu.honors.length > 0 && (
                <div className="honor-tags">
                  {edu.honors.map((h) => (
                    <span key={h} className="honor-tag">{h}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
