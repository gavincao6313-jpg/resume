import { SectionTitle } from "./Skills";
import type { ResumeData } from "../data/resume";

type Experience = ResumeData["experience"];

export default function Experience({ data }: { data: Experience }) {
  return (
    <section className="section">
      <SectionTitle>工作经历</SectionTitle>
      <div className="timeline">
        {data.map((job, i) => (
          <div key={i} className="timeline-item">
            <div className="timeline-dot" />
            <div className="timeline-content">
              <div className="entry-header">
                <div>
                  <h3 className="entry-title">{job.position}</h3>
                  <p className="entry-subtitle">
                    {job.company}
                    {job.location && <span className="entry-location"> · {job.location}</span>}
                  </p>
                </div>
                <span className="entry-period">{job.period}</span>
              </div>
              <ul className="entry-bullets">
                {job.description.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
