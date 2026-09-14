import type { ResumeData } from "../data/resume";

type Personal = ResumeData["personal"];

export default function Header({ data, stats }: { data: Personal; stats?: ResumeData["stats"] }) {
  const initials = data.name.includes(' ')
    ? data.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : data.name.slice(0, 2);

  return (
    <header className="header">
      <div className="header-inner">
        <div className="avatar-wrap">
          {data.avatar ? (
            <img src={data.avatar} alt={data.name} className="avatar-img" />
          ) : (
            <div className="avatar-placeholder">{initials}</div>
          )}
        </div>

        <div className="header-info">
          <h1 className="header-name">{data.name}</h1>
          <p className="header-title">{data.title}</p>
          {data.titleEn && <p className="header-title-en">{data.titleEn}</p>}
          <p className="header-summary">{data.tagline || data.summary}</p>

          <div className="contact-links">
            {data.email && (
              <a href={`mailto:${data.email}`} className="contact-item">
                <ContactIcon type="email" />
                {data.email}
              </a>
            )}
            {data.phone && (
              <span className="contact-item">
                <ContactIcon type="phone" />
                {data.phone}
              </span>
            )}
            {data.location && (
              <span className="contact-item">
                <ContactIcon type="location" />
                {data.location}
              </span>
            )}
            {data.github && (
              <a href={data.github} target="_blank" rel="noreferrer" className="contact-item">
                <ContactIcon type="github" />
                GitHub
              </a>
            )}
            {data.linkedin && (
              <a href={data.linkedin} target="_blank" rel="noreferrer" className="contact-item">
                <ContactIcon type="linkedin" />
                LinkedIn
              </a>
            )}
            {data.website && (
              <a href={data.website} target="_blank" rel="noreferrer" className="contact-item">
                <ContactIcon type="website" />
                {data.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        </div>
      </div>

      {stats && stats.length > 0 && (
        <div className="stats-row">
          {stats.map((s) => (
            <div key={s.label} className="stat-item">
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

function ContactIcon({ type }: { type: string }) {
  const icons: Record<string, string> = {
    email: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    phone: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    location: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z",
    github: "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22",
    linkedin: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z M2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z",
    website: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9",
  };
  return (
    <svg className="contact-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      {icons[type]?.split(" M").map((d, i) => (
        <path key={i} d={i === 0 ? d : "M" + d} />
      ))}
    </svg>
  );
}
