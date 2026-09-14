import { SectionTitle } from "./Skills";
import type { ResumeData } from "../data/resume";

type Certifications = NonNullable<ResumeData["certifications"]>;

export default function Certifications({ data }: { data: Certifications }) {
  return (
    <section className="section">
      <SectionTitle>资质认证</SectionTitle>
      <div className="cert-list">
        {data.map((cert) => (
          <div key={cert.name} className="cert-item">
            <span className="cert-name">{cert.name}</span>
            <span className="cert-level">{cert.level}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
