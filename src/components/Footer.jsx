import { NAV_ITEMS } from "../constants/nav";

export default function Footer() {
  return (
    <footer role="contentinfo" style={{ borderTop:"1px solid rgba(56,189,248,.08)", background:"rgba(5,8,16,.8)", padding:"1.75rem clamp(1.5rem,5vw,4.5rem)", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:".75rem" }}>
      <span style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"1rem", background:"linear-gradient(135deg,#38bdf8,#c9a84c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>NY.</span>
      <nav aria-label="Navigation secondaire" style={{ display:"flex", gap:"1.5rem", flexWrap:"wrap" }}>
        {NAV_ITEMS.map(({ id, label }) => (
          <a key={id} href={`#${id}`}
            style={{ fontFamily:"var(--font-mono)", fontSize:".65rem", letterSpacing:".07em", textTransform:"uppercase", color:"var(--muted)", textDecoration:"none", transition:"color .25s" }}
            onMouseEnter={e=>e.currentTarget.style.color="var(--gold-light)"}
            onMouseLeave={e=>e.currentTarget.style.color="var(--muted)"}
          >{label}</a>
        ))}
      </nav>
      <span style={{ fontFamily:"var(--font-mono)", fontSize:".62rem", color:"var(--muted)" }}>© 2025 Naji Youssef</span>
    </footer>
  );
}