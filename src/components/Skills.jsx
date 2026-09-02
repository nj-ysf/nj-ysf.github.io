import { useState } from "react";
import { FadeIn, Eyebrow, SectionHeading, Pill } from "./UI";
import { skills, skillColors, languages } from "../data/portfolio";

export default function Skills() {
  const cats = Object.keys(skills);
  const [tab, setTab] = useState(cats[0]);
  const [langHover, setLangHover] = useState(null);

  return (
    <section id="skills" aria-labelledby="skills-heading">
      <div className="section-wrap">
        <FadeIn>
          <Eyebrow>04 — Compétences</Eyebrow>
          <SectionHeading id="skills-heading">Savoir-faire techniques</SectionHeading>
        </FadeIn>

        {/* Category tabs — blue selected → gold hover */}
        <FadeIn delay={80}>
          <div role="tablist" style={{ display:"flex", gap:".4rem", flexWrap:"wrap", marginBottom:"2rem" }}>
            {cats.map(cat => {
              const isActive = tab === cat;
              return (
                <button key={cat} role="tab" aria-selected={isActive} onClick={() => setTab(cat)}
                  style={{ fontFamily:"var(--font-mono)", fontSize:".68rem", fontWeight:500, letterSpacing:".06em", border:`1px solid ${isActive?"rgba(201,168,76,.45)":"rgba(56,189,248,.15)"}`, cursor:"pointer", padding:".38rem .9rem", borderRadius:"99px", background:isActive?"linear-gradient(135deg,rgba(201,168,76,.15),rgba(240,201,110,.08))":"rgba(56,189,248,.05)", color:isActive?"var(--gold-light)":"var(--accent)", transition:"all .3s cubic-bezier(.34,1.56,.64,1)", transform:isActive?"scale(1.04)":"scale(1)", boxShadow:isActive?"0 2px 16px rgba(201,168,76,.12)":"none" }}
                >{cat}</button>
              );
            })}
          </div>
        </FadeIn>

        {/* Skills pills grid */}
        <FadeIn delay={140}>
          <div role="tabpanel" style={{ display:"flex", flexWrap:"wrap", gap:".45rem", minHeight:60, padding:"1.25rem", background:"rgba(56,189,248,.02)", border:"1px solid rgba(56,189,248,.08)", borderRadius:"var(--radius)" }}>
            {skills[tab].map((s, i) => (
              <div key={s} style={{ animation:"popIn .25s ease both", animationDelay:`${i*40}ms` }}>
                <Pill label={s} color={skillColors[tab] ?? "default"} />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Languages — interactive bars */}
        <FadeIn delay={220}>
          <div style={{ marginTop:"2.5rem", padding:"1.5rem 1.75rem", background:"rgba(56,189,248,.02)", border:"1px solid rgba(56,189,248,.08)", borderRadius:"var(--radius)" }}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:".65rem", letterSpacing:".14em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"1.25rem" }}>Langues</p>
            <table style={{ width:"100%", borderCollapse:"collapse" }} aria-label="Langues parlées">
              <tbody>
                {languages.map((l, i) => {
                  const h = langHover === i;
                  return (
                    <tr key={l.lang} style={{ borderBottom:"1px solid rgba(56,189,248,.05)", cursor:"default" }}
                      onMouseEnter={() => setLangHover(i)} onMouseLeave={() => setLangHover(null)}>
                      <td style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:"1.15rem", color:h?"var(--gold-light)":"var(--text)", padding:".75rem 0", width:110, transition:"color .25s" }}>{l.lang}</td>
                      <td style={{ fontFamily:"var(--font-mono)", fontSize:".68rem", color:h?"var(--gold)":"var(--muted)", padding:".75rem 0", transition:"color .25s" }}>{l.level}</td>
                      <td style={{ padding:".75rem 0", width:140 }}>
                        {/* Animated bar */}
                        <div style={{ display:"flex", gap:3, justifyContent:"flex-end" }}>
                          {[1,2,3,4,5].map(d => (
                            <div key={d} style={{ height:3, flex:1, borderRadius:2, background:d<=l.score?(h?"linear-gradient(90deg,#c9a84c,#f0c96e)":"linear-gradient(90deg,#38bdf8,#818cf8)"):"rgba(255,255,255,.07)", transition:"background .35s ease" }} />
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
