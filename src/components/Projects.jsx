import { useState } from "react";
import { FadeIn, Eyebrow, SectionHeading, Pill } from "./UI";
import { projects } from "../data/portfolio";

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

function RepoBtn({ url, isHov, isActive }) {
  const [h, setH] = useState(false);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir le dépôt GitHub (nouvel onglet)"
      onClick={e => e.stopPropagation()}
      onMouseEnter={e => { e.stopPropagation(); setH(true); }}
      onMouseLeave={e => { e.stopPropagation(); setH(false); }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: ".35rem",
        fontFamily: "var(--font-mono)",
        fontSize: ".62rem",
        letterSpacing: ".06em",
        textTransform: "uppercase",
        color: h ? "var(--bg)" : isActive ? "var(--gold-light)" : "var(--muted)",
        background: h ? "linear-gradient(135deg, var(--accent), var(--gold))" : "rgba(255,255,255,.04)",
        border: `1px solid ${h ? "transparent" : isActive ? "rgba(201,168,76,.3)" : "rgba(255,255,255,.08)"}`,
        padding: ".28rem .65rem",
        borderRadius: "99px",
        textDecoration: "none",
        flexShrink: 0,
        transition: "all .25s cubic-bezier(.34,1.56,.64,1)",
        transform: h ? "translateY(-1px)" : "none",
        boxShadow: h ? "0 4px 16px rgba(56,189,248,.2)" : "none",
      }}
    >
      <GitHubIcon />
      Repo
    </a>
  );
}

export default function Projects() {
  const [active, setActive] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="section-wrap">
        <FadeIn>
          <Eyebrow>05 — Projets</Eyebrow>
          <SectionHeading id="projects-heading">Projets académiques</SectionHeading>
        </FadeIn>

        <ul style={{ listStyle:"none", display:"flex", flexDirection:"column", gap:0 }} aria-label="Projets">
          {projects.map((p, i) => {
            const isActive = active === i;
            const isHov = hovered === i;
            return (
              <FadeIn key={i} delay={i * 65}>
                <li
                  onClick={() => setActive(isActive ? null : i)}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  tabIndex={0}
                  onKeyDown={e => e.key === "Enter" && setActive(isActive ? null : i)}
                  aria-expanded={isActive}
                  style={{ borderBottom:"1px solid rgba(56,189,248,.07)", cursor:"pointer", outline:"none", transition:"background .25s", background:isHov||isActive?"rgba(201,168,76,.03)":"transparent" }}
                >
                  <div style={{ display:"flex", alignItems:"center", gap:"1.25rem", padding:"1.4rem 0" }}>

                    {/* Number */}
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:".65rem", color:isActive?"var(--gold-light)":isHov?"var(--accent)":"var(--muted)", flexShrink:0, width:24, transition:"color .25s" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Content */}
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:".75rem", marginBottom:".5rem" }}>
                        <h3 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(1rem,2vw,1.25rem)", fontWeight:700, color:isActive?"var(--gold-light)":isHov?"var(--accent)":"var(--text)", transition:"color .25s", lineHeight:1.2 }}>{p.title}</h3>
                        <div style={{ display:"flex", alignItems:"center", gap:".6rem", flexShrink:0 }}>
                          {p.repo && <RepoBtn url={p.repo} isHov={isHov} isActive={isActive} />}
                          <span style={{ fontFamily:"var(--font-mono)", fontSize:".65rem", color:"var(--muted)" }}>{p.year}</span>
                        </div>
                      </div>

                      {/* Animated expand */}
                      <div style={{ maxHeight:isActive?"140px":"0", overflow:"hidden", transition:"max-height .38s cubic-bezier(.25,.46,.45,.94)" }}>
                        <p style={{ fontFamily:"var(--font-body)", fontWeight:400, fontSize:".875rem", color:"var(--sub)", lineHeight:1.7, marginBottom:".85rem" }}>{p.desc}</p>
                      </div>

                      <ul style={{ listStyle:"none", display:"flex", flexWrap:"wrap", gap:".35rem" }}>
                        {p.tags.map(t => <li key={t}><Pill label={t} color={isActive?"gold":isHov?"blue":"default"} /></li>)}
                      </ul>
                    </div>

                    {/* +/- icon */}
                    <span aria-hidden="true" style={{ fontFamily:"var(--font-mono)", fontSize:"1.1rem", fontWeight:300, color:isActive?"var(--gold-light)":isHov?"var(--accent)":"var(--muted)", flexShrink:0, width:20, textAlign:"center", transform:isActive?"rotate(45deg)":"none", transition:"all .3s cubic-bezier(.34,1.56,.64,1)" }}>+</span>
                  </div>
                </li>
              </FadeIn>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
