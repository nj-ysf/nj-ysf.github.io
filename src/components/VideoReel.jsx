import { useRef, useState } from "react";
import { FadeIn } from "./UI";

export default function VideoReel() {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(v => !v);
    }
  };

  return (
    <section
      aria-label="Vidéo de présentation"
      style={{ padding: "5rem 0", background: "var(--bg)", borderTop: "1px solid rgba(56,189,248,.05)" }}
    >
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 clamp(1.25rem,6vw,4.5rem)" }}>

        <FadeIn>
          {/* Label */}
          <p style={{
            fontFamily: "var(--font-mono)", fontSize: ".65rem", letterSpacing: ".18em",
            textTransform: "uppercase", color: "var(--muted)", marginBottom: ".6rem",
            display: "flex", alignItems: "center", gap: ".6rem",
          }}>
            <span style={{ display: "inline-block", width: 16, height: 1, background: "var(--accent)", opacity: .4 }} />
            Présentation
          </p>

          {/* Video card */}
          <div style={{
            position: "relative",
            borderRadius: "var(--radius)",
            overflow: "hidden",
            border: "1px solid rgba(56,189,248,.12)",
            boxShadow: "0 0 60px rgba(56,189,248,.06)",
            background: "#000",
            aspectRatio: "16/9",
          }}>
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              aria-label="Vidéo de présentation de Naji Youssef"
            >
              <source src="/intro.mp4" type="video/mp4" />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>

            {/* Dark gradient overlay — bottom */}
            <div aria-hidden="true" style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, transparent 40%, rgba(5,8,16,.75) 100%)",
              pointerEvents: "none",
            }} />

            {/* Bottom info bar */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              padding: "1.25rem 1.5rem",
              display: "flex", alignItems: "flex-end", justifyContent: "space-between",
            }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
                  background: "linear-gradient(135deg,#38bdf8,#c9a84c)",
                  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  lineHeight: 1.1, marginBottom: ".2rem",
                }}>
                  Naji Youssef
                </p>
                <p style={{
                  fontFamily: "var(--font-mono)", fontSize: ".65rem",
                  letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.5)",
                }}>
                  Étudiant Ingénieur · Big Data & AI
                </p>
              </div>

              {/* Mute toggle */}
              <button
                onClick={toggleMute}
                aria-label={muted ? "Activer le son" : "Couper le son"}
                style={{
                  background: "rgba(255,255,255,.1)",
                  border: "1px solid rgba(255,255,255,.15)",
                  borderRadius: "50%", width: 38, height: 38,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "#fff", flexShrink: 0,
                  transition: "background .2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(56,189,248,.25)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,.1)"}
              >
                {muted ? (
                  /* muted icon */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
                  </svg>
                ) : (
                  /* unmuted icon */
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                    <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/>
                  </svg>
                )}
              </button>
            </div>

            {/* Live badge top-left */}
            <div aria-hidden="true" style={{
              position: "absolute", top: "1rem", left: "1rem",
              display: "flex", alignItems: "center", gap: ".4rem",
              background: "rgba(5,8,16,.7)", border: "1px solid rgba(56,189,248,.2)",
              borderRadius: "99px", padding: ".25rem .7rem",
              fontFamily: "var(--font-mono)", fontSize: ".6rem",
              letterSpacing: ".1em", textTransform: "uppercase", color: "var(--accent)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#ef4444", animation: "pulse 2s infinite", display: "inline-block" }} />
              INTRO
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}