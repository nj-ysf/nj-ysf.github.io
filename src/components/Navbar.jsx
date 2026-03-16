import { useState, useEffect } from "react";
import { NAV_ITEMS } from "../constants/nav";

export default function Navbar({ active }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on link click
  const handleNav = () => setOpen(false);

  return (
    <>
      <header role="banner" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(5,8,16,.92)" : "rgba(5,8,16,.6)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(56,189,248,.12)" : "1px solid transparent",
        transition: "all .4s",
      }}>
        <div style={{
          maxWidth: 1040, margin: "0 auto",
          padding: "0 clamp(1.25rem,5vw,4.5rem)",
          height: 58, display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          {/* Logo */}
          <a href="#about" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem",
              background: "linear-gradient(135deg,#38bdf8,#c9a84c)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              letterSpacing: "-.02em",
            }}>NY.</span>
          </a>

          {/* Desktop nav */}
          <nav aria-label="Navigation principale" style={{ display: "flex", gap: ".05rem" }}
            className="desktop-nav">
            {NAV_ITEMS.map(({ id, label }) => {
              const isActive = active === id;
              return (
                <a key={id} href={`#${id}`} style={{
                  fontFamily: "var(--font-mono)", fontSize: ".68rem", letterSpacing: ".07em",
                  textTransform: "uppercase",
                  color: isActive ? "var(--gold-light)" : "var(--muted)",
                  textDecoration: "none", padding: ".38rem .72rem", borderRadius: "var(--radius-sm)",
                  background: isActive ? "rgba(201,168,76,.08)" : "transparent",
                  border: `1px solid ${isActive ? "rgba(201,168,76,.25)" : "transparent"}`,
                  transition: "all .25s",
                }}>{label}</a>
              );
            })}
          </nav>

          {/* Hamburger (mobile only) */}
          <button
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="hamburger"
            style={{
              display: "none",
              background: "none", border: "none", cursor: "pointer",
              padding: ".5rem", flexDirection: "column", gap: "5px",
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: "block", width: 22, height: 1.5,
                background: open
                  ? (i === 1 ? "transparent" : "var(--accent)")
                  : "var(--text)",
                borderRadius: 2,
                transition: "all .3s",
                transform: open
                  ? (i === 0 ? "rotate(45deg) translate(4.5px, 4.5px)"
                    : i === 2 ? "rotate(-45deg) translate(4.5px, -4.5px)"
                    : "none")
                  : "none",
              }} />
            ))}
          </button>
        </div>

        {/* Progress bar */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, height: "1px", width: "100%",
          background: "linear-gradient(90deg, transparent, rgba(56,189,248,.5) 30%, rgba(201,168,76,.6) 70%, transparent)",
          opacity: scrolled ? 1 : 0, transition: "opacity .4s",
        }} />
      </header>

      {/* Mobile drawer */}
      <div style={{
        position: "fixed", top: 58, left: 0, right: 0, zIndex: 99,
        background: "rgba(5,8,16,.97)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(56,189,248,.12)",
        overflow: "hidden",
        maxHeight: open ? "400px" : "0",
        transition: "max-height .35s cubic-bezier(.25,.46,.45,.94)",
      }} className="mobile-menu">
        <nav aria-label="Navigation mobile" style={{ padding: "1rem 1.5rem 1.5rem", display: "flex", flexDirection: "column", gap: ".25rem" }}>
          {NAV_ITEMS.map(({ id, label }) => {
            const isActive = active === id;
            return (
              <a key={id} href={`#${id}`} onClick={handleNav} style={{
                fontFamily: "var(--font-mono)", fontSize: ".8rem", letterSpacing: ".1em",
                textTransform: "uppercase",
                color: isActive ? "var(--gold-light)" : "var(--sub)",
                textDecoration: "none", padding: ".75rem 1rem", borderRadius: "var(--radius-sm)",
                background: isActive ? "rgba(201,168,76,.07)" : "transparent",
                border: `1px solid ${isActive ? "rgba(201,168,76,.2)" : "rgba(255,255,255,.05)"}`,
                transition: "all .2s",
              }}>{label}</a>
            );
          })}
        </nav>
      </div>

      {/* CSS for show/hide */}
      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger   { display: flex !important; }
        }
      `}</style>
    </>
  );
}