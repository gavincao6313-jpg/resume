import { SectionTitle } from "./Skills";
import type { ResumeData } from "../data/resume";

type Projects = ResumeData["projects"];

export default function Projects({ data }: { data: Projects }) {
  return (
    <section className="section">
      <SectionTitle>项目经历</SectionTitle>
      <div className="projects-grid">
        {data.map((proj, i) => (
          <div key={i} className="project-card">
            <div className="project-header">
              <div>
                <h3 className="project-name">{proj.name}</h3>
                <span className="entry-period">{proj.period}</span>
                {proj.org && <p className="project-org">{proj.org}</p>}
              </div>
              {proj.link && (
                <a href={proj.link} target="_blank" rel="noreferrer" className="project-link" title="查看项目">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              )}
            </div>
            <p className="project-desc">{proj.description}</p>
            <div className="project-tech">
              {proj.tech.map((t) => (
                <span key={t} className="tech-tag">{t}</span>
              ))}
            </div>
            {proj.highlights.length > 0 && (
              <ul className="entry-bullets project-highlights">
                {proj.highlights.map((h, j) => (
                  <li key={j}>
                    {typeof h === "string" ? (
                      h
                    ) : (
                      <>
                        <span className="highlight-label">{h.label}</span>
                        {h.text}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
