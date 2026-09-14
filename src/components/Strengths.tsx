import { SectionTitle } from "./Skills";
import type { ResumeData } from "../data/resume";

type Strengths = NonNullable<ResumeData["strengths"]>;

export default function Strengths({ data }: { data: Strengths }) {
  return (
    <section className="section section-strengths">
      <SectionTitle>核心能力</SectionTitle>
      <div className="strengths-grid">
        {data.map((item) => (
          <div key={item.title} className="strength-card">
            <h3 className="strength-title">{item.title}</h3>
            <p className="strength-title-en">{item.titleEn}</p>
            <p className="strength-desc">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
