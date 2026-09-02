import { useState } from "react";
import { FadeIn, Eyebrow, SectionHeading, GlowCard } from "./UI";
import { experience } from "../data/portfolio";

export default function Experience() {
  const [active, setActive] = useState(null);

  return (
    <section id="experience" aria-labelledby="experience-heading">
      <div className="section-wrap experience-wrap">
        <FadeIn>
          <Eyebrow>03 - Work Experience</Eyebrow>
          <SectionHeading id="experience-heading">Professional experience</SectionHeading>
        </FadeIn>

        <div className="experience-list">
          {experience.map((item, i) => {
            const isActive = active === i;

            return (
              <FadeIn key={`${item.role}-${item.period}`} delay={i * 90}>
                <GlowCard
                  active={isActive}
                  onClick={() => setActive(isActive ? null : i)}
                  style={{ padding: "1.35rem 1.5rem" }}
                >
                  <article className="experience-card" aria-expanded={isActive}>
                    <div className="experience-card-header">
                      <div className="experience-card-copy">
                        <p className="experience-role">{item.role}</p>
                        <p className="experience-org">{item.organization}</p>
                      </div>
                      <div className="experience-meta">
                        <span>{item.period}</span>
                        <span aria-hidden="true" className="experience-toggle">{isActive ? "-" : "+"}</span>
                      </div>
                    </div>

                    <ul className="experience-points">
                      {item.points.map(point => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </article>
                </GlowCard>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
