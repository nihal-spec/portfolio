import { useCallback, useEffect, useRef, useState } from "react";
import Nav from "./components/Nav.jsx";
import CommandPalette from "./components/CommandPalette.jsx";
import Hero from "./components/Hero.jsx";
import Work from "./components/Work.jsx";
import About from "./components/About.jsx";
import Stack from "./components/Stack.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import { sections } from "./data/portfolio.js";
import { useReducedMotion, useReveal, useScrollState, useTheme } from "./hooks/useSite.js";

const sectionIds = sections.map((s) => s.id);

export default function App() {
  const { theme, toggle } = useTheme();
  const reducedMotion = useReducedMotion();
  const { progress, scrolled, active } = useScrollState(sectionIds);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(0);

  useReveal();

  const notify = useCallback((message) => {
    clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    const onKey = (event) => {
      const typing = /input|textarea|select/i.test(event.target.tagName) || event.target.isContentEditable;
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setPaletteOpen((open) => !open);
      } else if (event.key === "/" && !typing) {
        event.preventDefault();
        setPaletteOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">
        Skip to content
      </a>
      <Nav
        active={active}
        scrolled={scrolled}
        progress={progress}
        theme={theme}
        onToggleTheme={toggle}
        onOpenPalette={() => setPaletteOpen(true)}
      />
      <main>
        <Hero reducedMotion={reducedMotion} notify={notify} />
        <Work />
        <About reducedMotion={reducedMotion} />
        <Stack />
        <Experience />
        <Contact notify={notify} />
      </main>
      {paletteOpen && <CommandPalette onClose={() => setPaletteOpen(false)} onToggleTheme={toggle} notify={notify} />}
      <div className={`toast ${toast ? "is-shown" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
