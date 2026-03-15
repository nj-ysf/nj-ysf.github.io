import { useState } from "react";
import { FadeIn, Eyebrow, SectionHeading, GhostBtn, GlowCard } from "./UI";
import { profile, activities } from "../data/portfolio";

/* ── SVG Icons ──────────────────────────────────────────────────── */
const ICONS = {
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M2 7l10 7 10-7"/>
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 014.7 12a19.79 19.79 0 01-3.07-8.67A2 2 0 013.62 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
    </svg>
  ),
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="22" height="22" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r=".5" fill="currentColor" stroke="none"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
    </svg>
  ),
};

/* ── Color per platform ─────────────────────────────────────────── */
const PLATFORM_COLORS = {
  "E-mail":    { idle: "rgba(56,189,248,.12)",  active: "rgba(56,189,248,.22)",  border: "rgba(56,189,248,.35)",  text: "#38bdf8"  },
  "Téléphone": { idle: "rgba(52,211,153,.1)",   active: "rgba(52,211,153,.2)",   border: "rgba(52,211,153,.35)",  text: "#34d399"  },
  "GitHub":    { idle: "rgba(255,255,255,.07)",  active: "rgba(255,255,255,.14)", border: "rgba(255,255,255,.3)",  text: "#f1f5f9"  },
  "LinkedIn":  { idle: "rgba(56,119,242,.12)",  active: "rgba(56,119,242,.22)",  border: "rgba(56,119,242,.4)",   text: "#6b9fff"  },
  "Instagram": { idle: "rgba(240,96,144,.1)",   active: "rgba(240,96,144,.2)",   border: "rgba(240,96,144,.4)",   text: "#f06090"  },
  "Facebook":  { idle: "rgba(59,130,246,.1)",   active: "rgba(59,130,246,.2)",   border: "rgba(59,130,246,.4)",   text: "#60a5fa"  },
};

const LINKS = [
  { label:"E-mail",    icon:"email",    value:profile.email,           href:`mailto:${profile.email}`,  ext:false },
  { label:"Téléphone", icon:"phone",    value:profile.phone,            href:`tel:+212684706156`,         ext:false },
  { label:"GitHub",    icon:"github",   value:profile.github.label,     href:profile.github.url,          ext:true  },
  { label:"LinkedIn",  icon:"linkedin", value:profile.linkedin.label,   href:profile.linkedin.url,        ext:true  },
  { label:"Instagram", icon:"instagram",value:profile.instagram.label,  href:profile.instagram.url,       ext:true  },
  { label:"Facebook",  icon:"facebook", value:profile.Facebook.label,   href:profile.Facebook.url,        ext:true  },
];

/* ── Bubble icon card ───────────────────────────────────────────── */
function BubbleCard({ item }) {
  const [h, setH] = useState(false);
  const c = PLATFORM_COLORS[item.label] ?? PLATFORM_COLORS["E-mail"];

  return (
    <a
      href={item.href}
      target={item.ext ? "_blank" : undefined}
      rel={item.ext ? "noopener noreferrer" : undefined}
      aria-label={`${item.label} : ${item.value}${item.ext ? " (nouvel onglet)" : ""}`}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: ".65rem",
        padding: "1.5rem 1rem",
        textDecoration: "none",
        color: "inherit",
        transition: "all .3s cubic-bezier(.34,1.56,.64,1)",
        transform: h ? "translateY(-6px)" : "none",
      }}
    >
      {/* Bubble */}
      <div style={{
        width: 64,
        height: 64,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: h ? c.active : c.idle,
        border: `1px solid ${h ? c.border : "rgba(255,255,255,.06)"}`,
        color: c.text,
        transition: "all .3s cubic-bezier(.34,1.56,.64,1)",
        boxShadow: h ? `0 8px 32px ${c.idle}, 0 0 0 6px ${c.idle}` : "none",
        transform: h ? "scale(1.12)" : "scale(1)",
      }}>
        {ICONS[item.icon]}
      </div>

      {/* Label */}
      <div style={{ textAlign: "center" }}>
        <p style={{
          fontFamily: "var(--font-mono)",
          fontSize: ".65rem",
          letterSpacing: ".1em",
          textTransform: "uppercase",
          color: h ? c.text : "var(--muted)",
          transition: "color .25s",
          marginBottom: ".15rem",
        }}>
          {item.label}
        </p>
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: ".75rem",
          fontWeight: 500,
          color: h ? "var(--text)" : "var(--sub)",
          transition: "color .25s",
          maxWidth: 120,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        }}>
          {item.value}
        </p>
      </div>
    </a>
  );
}

/* ── Contact section ────────────────────────────────────────────── */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [actOpen, setActOpen] = useState(null);
  const copy = () => {
    try { navigator.clipboard?.writeText(profile.email); } catch (_) {}
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" aria-labelledby="contact-heading">
      <div className="section-wrap" style={{ paddingBottom: "7rem" }}>
        <FadeIn>
          <Eyebrow>05 — Contact</Eyebrow>
          <SectionHeading id="contact-heading">Prendre contact</SectionHeading>

        </FadeIn>

        {/* ── Bubble icons grid ── */}
        <FadeIn delay={80}>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gap: ".5rem",
            background: "rgba(56,189,248,.02)",
            border: "1px solid rgba(56,189,248,.08)",
            borderRadius: "var(--radius)",
            padding: ".75rem",
            marginBottom: "1.5rem",
          }}
          role="list"
          aria-label="Liens de contact et réseaux sociaux"
          >
            {LINKS.map((l, i) => (
              <FadeIn key={l.label} delay={i * 60} style={{ display:"contents" }}>
                <div role="listitem">
                  <BubbleCard item={l} />
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* Copy email */}
        <FadeIn delay={400}>
          <GhostBtn onClick={copy}>
            {copied ? "✓ Copié !" : "Copier l'e-mail"}
          </GhostBtn>
        </FadeIn>

        {/* Activities */}
        <FadeIn delay={480}>
          <div style={{ marginTop:"3.5rem", paddingTop:"2.5rem", borderTop:"1px solid rgba(56,189,248,.08)" }}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:".65rem", letterSpacing:".14em", textTransform:"uppercase", color:"var(--accent)", marginBottom:"1.25rem" }}>
              Activités &amp; distinctions
            </p>
            <div style={{ display:"flex", flexDirection:"column", gap:".65rem" }}>
              {activities.map((a, i) => (
                <FadeIn key={i} delay={i * 60}>
                  <GlowCard active={actOpen === i} onClick={() => setActOpen(actOpen === i ? null : i)} style={{ padding:"1.1rem 1.4rem" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"1rem" }}>
                      <div>
                        <p style={{ fontFamily:"var(--font-display)", fontWeight:700, fontSize:".95rem", color:"var(--text)", marginBottom:".2rem" }}>{a.title}</p>
                        <p style={{ fontFamily:"var(--font-mono)", fontSize:".68rem", color:actOpen===i?"var(--gold-light)":"var(--accent)", transition:"color .25s" }}>{a.org}</p>
                      </div>
                      <span aria-hidden="true" style={{ fontFamily:"var(--font-mono)", fontSize:"1rem", color:actOpen===i?"var(--gold-light)":"var(--muted)", transform:actOpen===i?"rotate(45deg)":"none", transition:"all .3s cubic-bezier(.34,1.56,.64,1)", flexShrink:0 }}>+</span>
                    </div>
                    <div style={{ maxHeight:actOpen===i?"80px":"0", overflow:"hidden", transition:"max-height .32s ease" }}>
                      <p style={{ fontFamily:"var(--font-body)", fontWeight:400, fontSize:".875rem", color:"var(--sub)", lineHeight:1.7, paddingTop:".75rem", borderTop:"1px solid rgba(201,168,76,.1)", marginTop:".75rem" }}>{a.desc}</p>
                    </div>
                  </GlowCard>
                </FadeIn>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}