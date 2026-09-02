import "./styles/globals.css";
import { useActiveSection } from "./hooks/useAnimations";
import { NAV_IDS } from "./constants/nav";
import Navbar    from "./components/Navbar";
import Hero      from "./components/Hero";
import Formation  from "./components/Formation";
import Experience from "./components/Experience";
import Skills    from "./components/Skills";
import Projects  from "./components/Projects";
import Contact   from "./components/Contact";
import Footer    from "./components/Footer";

export default function App() {
  const active = useActiveSection(NAV_IDS);
  return (
    <>
      <Navbar active={active} />
      <main id="main-content">
        <Hero />
        <Formation />
        <Experience />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
