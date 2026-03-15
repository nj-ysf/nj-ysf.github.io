import { useState, useRef } from "react";
import { useFadeIn, useCounter } from "../hooks/useAnimations";

/* ── FadeIn ─────────────────────────────────────────────────────── */
export function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, v] = useFadeIn(delay);
  return (
    <div ref={ref} style={{ opacity:v?1:0, transform:v?"translateY(0)":"translateY(20px)", transition:`opacity .65s cubic-bezier(.25,.46,.45,.94) ${delay}ms, transform .65s cubic-bezier(.25,.46,.45,.94) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ── Animated counter ───────────────────────────────────────────── */
export function Counter({ to, suffix = "" }) {
  const [ref, v] = useFadeIn();
  const val = useCounter(to, v);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Gold-blue shimmer pill ─────────────────────────────────────── */
const PILL_MAP = {
  default: { bg:"rgba(56,189,248,.08)",  bd:"rgba(56,189,248,.2)",   tx:"#7dd3fc" },
  blue:    { bg:"rgba(56,189,248,.1)",   bd:"rgba(56,189,248,.28)",  tx:"#38bdf8" },
  green:   { bg:"rgba(52,211,153,.08)",  bd:"rgba(52,211,153,.22)",  tx:"#34d399" },
  violet:  { bg:"rgba(129,140,248,.08)", bd:"rgba(129,140,248,.25)", tx:"#818cf8" },
  gold:    { bg:"rgba(201,168,76,.1)",   bd:"rgba(201,168,76,.28)",  tx:"#f0c96e" },
};
export function Pill({ label, color = "default" }) {
  const [h, setH] = useState(false);
  const c = PILL_MAP[color] ?? PILL_MAP.default;
  const hoverC = PILL_MAP.gold;
  const cur = h ? hoverC : c;
  return (
    <span style={{ display:"inline-block", fontFamily:"var(--font-mono)", fontSize:".7rem", fontWeight:500, background:cur.bg, border:`1px solid ${cur.bd}`, color:cur.tx, padding:".22rem .65rem", borderRadius:"99px", cursor:"default", transition:"all .25s cubic-bezier(.34,1.56,.64,1)", transform:h?"scale(1.08)":"scale(1)" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    >{label}</span>
  );
}

/* ── Eyebrow label ──────────────────────────────────────────────── */
export function Eyebrow({ children }) {
  return <p style={{ fontFamily:"var(--font-mono)", fontSize:".65rem", letterSpacing:".18em", textTransform:"uppercase", color:"var(--muted)", marginBottom:".6rem" }}>{children}</p>;
}

/* ── Section heading ────────────────────────────────────────────── */
export function SectionHeading({ children, id }) {
  return <h2 id={id} style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"clamp(1.8rem,3.2vw,2.6rem)", letterSpacing:"-.025em", color:"var(--text)", marginBottom:"2rem" }}>{children}</h2>;
}

/* ── Gold-blue CTA button ───────────────────────────────────────── */
export function PrimaryBtn({ href, children }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} style={{ display:"inline-flex", alignItems:"center", gap:".5rem", fontFamily:"var(--font-mono)", fontSize:".72rem", fontWeight:700, letterSpacing:".08em", textTransform:"uppercase", color:h?"#050810":"#050810", background:h?"linear-gradient(135deg,#f0c96e,#c9a84c)":"linear-gradient(135deg,#38bdf8,#0ea5e9)", padding:".7rem 1.5rem", borderRadius:"var(--radius-sm)", textDecoration:"none", transition:"all .3s cubic-bezier(.34,1.56,.64,1)", transform:h?"translateY(-2px) scale(1.03)":"none", boxShadow:h?"0 8px 32px rgba(201,168,76,.35)":"0 4px 20px rgba(56,189,248,.25)" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    >{children}</a>
  );
}

/* ── Ghost button (blue → gold on hover) ───────────────────────── */
export function GhostBtn({ href, children, external=false, onClick, download }) {
  const [h, setH] = useState(false);
  const Tag = href ? "a" : "button";
  const extra = href ? { href, target:external?"_blank":undefined, rel:external?"noopener noreferrer":undefined, download:download||undefined } : { onClick };
  return (
    <Tag {...extra} style={{ display:"inline-flex", alignItems:"center", gap:".5rem", fontFamily:"var(--font-mono)", fontSize:".72rem", fontWeight:500, letterSpacing:".07em", textTransform:"uppercase", color:h?"var(--gold-light)":"var(--accent)", background:h?"rgba(201,168,76,.06)":"rgba(56,189,248,.06)", border:`1px solid ${h?"rgba(201,168,76,.4)":"rgba(56,189,248,.25)"}`, padding:".6rem 1.25rem", borderRadius:"var(--radius-sm)", textDecoration:"none", cursor:"pointer", transition:"all .3s", transform:h?"translateY(-1px)":"none", boxShadow:h?"0 4px 20px rgba(201,168,76,.15)":"none" }}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
    >{children}</Tag>
  );
}

/* ── Interactive card (blue outline → gold glow on hover) ───────── */
export function GlowCard({ children, onClick, active=false, style={} }) {
  const [h, setH] = useState(false);
  const isLit = active || h;
  return (
    <div onClick={onClick}
      onMouseEnter={()=>setH(true)} onMouseLeave={()=>setH(false)}
      style={{ background:isLit?"rgba(201,168,76,.04)":"rgba(56,189,248,.02)", border:`1px solid ${active?"rgba(201,168,76,.45)":h?"rgba(201,168,76,.25)":"rgba(56,189,248,.1)"}`, borderRadius:"var(--radius)", boxShadow:active?"0 0 40px rgba(201,168,76,.12),0 0 0 1px rgba(201,168,76,.2)":h?"0 0 24px rgba(201,168,76,.08)":"none", transition:"all .3s cubic-bezier(.25,.46,.45,.94)", cursor:onClick?"pointer":"default", ...style }}
    >{children}</div>
  );
}