import { useState, useEffect, useRef } from "react";
import { FadeIn, Counter, PrimaryBtn, GhostBtn } from "./UI";
import { useTypewriter } from "../hooks/useAnimations";
import { profile, PHOTO } from "../data/portfolio";

function useMouseGlow() {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 50, y: 50 });
  useEffect(() => {
    const onMove = (e) => {
      const el = ref.current; if (!el) return;
      const r = el.getBoundingClientRect();
      setPos({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100 });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return [ref, pos];
}

export default function Hero() {
  const typed = useTypewriter(profile.role, 38);
  const [glowRef, mouse] = useMouseGlow();
  const [photoHover, setPhotoHover] = useState(false);

  return (
    <section id="about" aria-labelledby="hero-name" ref={glowRef}
      style={{ minHeight:"100vh", display:"flex", alignItems:"center", padding:"80px clamp(1.5rem,6vw,4.5rem) 5rem", position:"relative", overflow:"hidden" }}>

      {/* Dynamic cursor-following glow */}
      <div aria-hidden="true" style={{ position:"absolute", inset:0, background:`radial-gradient(600px circle at ${mouse.x}% ${mouse.y}%, rgba(56,189,248,.06) 0%, transparent 60%)`, pointerEvents:"none", transition:"background .1s" }} />

      {/* Static ambient blobs */}
      <div aria-hidden="true" style={{ position:"absolute", top:"10%", left:"5%", width:520, height:520, borderRadius:"50%", background:"radial-gradient(circle,rgba(56,189,248,.05) 0%,transparent 70%)", filter:"blur(60px)", animation:"float 8s ease-in-out infinite" }} />
      <div aria-hidden="true" style={{ position:"absolute", bottom:"15%", right:"5%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle,rgba(201,168,76,.06) 0%,transparent 70%)", filter:"blur(50px)", animation:"float 10s ease-in-out infinite reverse" }} />

      {/* Grid */}
      <div aria-hidden="true" style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(56,189,248,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(56,189,248,.03) 1px,transparent 1px)", backgroundSize:"60px 60px", maskImage:"radial-gradient(ellipse 80% 65% at 50% 35%,black 10%,transparent 100%)" }} />

      <div style={{ position:"relative", zIndex:1, width:"100%", maxWidth:1040, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr auto", gap:"4rem", alignItems:"center" }}>

        {/* Left */}
        <div>
          <FadeIn>
            <div role="status" style={{ display:"inline-flex", alignItems:"center", gap:".5rem", background:"rgba(52,211,153,.08)", border:"1px solid rgba(52,211,153,.22)", color:"#34d399", fontSize:".7rem", fontWeight:700, padding:".32rem .95rem", borderRadius:"99px", fontFamily:"var(--font-mono)", letterSpacing:".07em", marginBottom:"1.75rem" }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#34d399", display:"inline-block", animation:"pulse 2s infinite" }} />
              Disponible pour un stage
            </div>
          </FadeIn>

          <FadeIn delay={70}>
            <h1 id="hero-name" style={{ fontFamily:"var(--font-display)", fontWeight:800, lineHeight:.96, fontSize:"clamp(3rem,7.5vw,5.75rem)", letterSpacing:"-.035em", marginBottom:"1.1rem" }}>
              <span style={{ color:"var(--text)", display:"block" }}>Naji</span>
              <span style={{ background:"linear-gradient(135deg,#38bdf8 0%,#c9a84c 55%,#f0c96e 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", display:"block" }}>Youssef</span>
            </h1>
          </FadeIn>

          <FadeIn delay={140}>
            <p style={{ fontFamily:"var(--font-mono)", fontSize:".85rem", color:"var(--muted)", marginBottom:"1.25rem", minHeight:"1.4em", letterSpacing:".02em" }}>
              {typed}<span aria-hidden="true" style={{ borderRight:"2px solid var(--accent)", animation:"blink 1s infinite", marginLeft:2 }} />
            </p>
          </FadeIn>

          <FadeIn delay={210}>
            <p style={{ fontFamily:"var(--font-body)", color:"var(--sub)", fontSize:".9375rem", fontWeight:400, maxWidth:490, lineHeight:1.78, marginBottom:"2.25rem" }}>{profile.about}</p>
          </FadeIn>

          <FadeIn delay={280}>
            <div style={{ display:"flex", gap:".85rem", flexWrap:"wrap", marginBottom:"3rem" }}>
              <PrimaryBtn href="#projects">Voir mes projets</PrimaryBtn>
              <GhostBtn href="/cv-naji-youssef.pdf" download="CV-Naji-Youssef.pdf">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Télécharger le CV
              </GhostBtn>
              <GhostBtn href="#contact">Me contacter</GhostBtn>
            </div>
          </FadeIn>

          <FadeIn delay={360}>
            <div style={{ display:"flex", gap:"3rem", flexWrap:"wrap", paddingTop:"2rem", borderTop:"1px solid rgba(56,189,248,.08)" }}>
              {profile.stats.map(s => (
                <div key={s.label}>
                  <div style={{ fontFamily:"var(--font-display)", fontWeight:800, fontSize:"2.1rem", background:"linear-gradient(135deg,#38bdf8,#c9a84c)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1 }}>
                    <Counter to={s.n} suffix={s.suffix} />
                  </div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:".62rem", color:"var(--muted)", letterSpacing:".12em", textTransform:"uppercase", marginTop:".3rem" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>

        {/* Right — photo */}
        <FadeIn delay={160}>
          <div style={{ position:"relative", flexShrink:0 }}
            onMouseEnter={()=>setPhotoHover(true)} onMouseLeave={()=>setPhotoHover(false)}>
            {/* Outer glow ring — shifts blue→gold on hover */}
            <div aria-hidden="true" style={{ position:"absolute", inset:"-14px", borderRadius:"50%", background:photoHover?"conic-gradient(from 0deg,#c9a84c,#f0c96e,#c9a84c)":"conic-gradient(from 0deg,#38bdf8,#0ea5e9,#818cf8,#38bdf8)", animation:"spin 6s linear infinite", opacity:.5, filter:"blur(2px)", transition:"background .6s" }} />

            {/* Photo circle */}
            <div style={{ width:"clamp(180px,23vw,265px)", height:"clamp(180px,23vw,265px)", borderRadius:"50%", overflow:"hidden", border:"3px solid transparent", background:photoHover?"linear-gradient(#050810,#050810) padding-box,linear-gradient(135deg,#c9a84c,#f0c96e) border-box":"linear-gradient(#050810,#050810) padding-box,linear-gradient(135deg,#38bdf8,#818cf8) border-box", position:"relative", transition:"background .5s", boxShadow:photoHover?"0 0 60px rgba(201,168,76,.25)":"0 0 60px rgba(56,189,248,.15)" }}>
              <img src={PHOTO} alt="Portrait de Naji Youssef" style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center top", filter:photoHover?"brightness(1.06) contrast(1.04)":"brightness(1) contrast(1)", transition:"filter .4s" }} />
            </div>

            {/* Float tags */}
            <div aria-hidden="true" style={{ position:"absolute", top:"8%", right:"-8%", background:"rgba(5,8,16,.95)", border:"1px solid rgba(56,189,248,.3)", borderRadius:"8px", padding:".45rem .8rem", fontFamily:"var(--font-mono)", fontSize:".65rem", color:"var(--accent)", whiteSpace:"nowrap", boxShadow:"0 4px 16px rgba(56,189,248,.1)", animation:"float 5s ease-in-out infinite" }}>ENSET Mohammedia</div>
            <div aria-hidden="true" style={{ position:"absolute", bottom:"12%", left:"-12%", background:"rgba(5,8,16,.95)", border:"1px solid rgba(201,168,76,.35)", borderRadius:"8px", padding:".45rem .8rem", fontFamily:"var(--font-mono)", fontSize:".65rem", color:"var(--gold-light)", whiteSpace:"nowrap", boxShadow:"0 4px 16px rgba(201,168,76,.1)", animation:"float 7s ease-in-out infinite reverse" }}>Big Data · AI</div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}