import { useLayoutEffect, useRef, useState } from "react";
import { Command, Menu, Moon, Sun, X } from "lucide-react";
import Mark from "./Mark.jsx";
import { profile, sections } from "../data/portfolio.js";
import { scrollToId } from "../hooks/useSite.js";

export default function Nav({ active, scrolled, progress, theme, onToggleTheme, onOpenPalette }) {
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);
  const indicatorRef = useRef(null);

  // Slide the pill highlight under whichever section is in view.
  useLayoutEffect(() => {
    const indicator = indicatorRef.current;
    const button = active ? listRef.current?.querySelector(`[data-id="${active}"]`) : null;
    if (!indicator) return undefined;
    if (!button) {
      indicator.style.opacity = "0";
      return undefined;
    }
    const measure = () => {
      indicator.style.opacity = "1";
      indicator.style.left = `${button.offsetLeft}px`;
      indicator.style.width = `${button.offsetWidth}px`;
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const go = (id) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header className={`nav ${scrolled ? "is-scrolled" : ""} ${open ? "is-open" : ""}`}>
      <div className="nav-bar">
        <button className="nav-brand" onClick={() => go(null)} aria-label="Back to top">
          <Mark size={26} />
          <span>
            {profile.shortName}
            <em> VK</em>
          </span>
        </button>

        <nav aria-label="Sections">
          <ul className="nav-links" ref={listRef}>
            <li className="nav-indicator" aria-hidden="true" ref={indicatorRef} />
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  data-id={section.id}
                  className={active === section.id ? "is-active" : ""}
                  aria-current={active === section.id ? "true" : undefined}
                  onClick={() => go(section.id)}
                >
                  {section.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="nav-kbd" onClick={onOpenPalette} aria-label="Open command menu">
            <Command size={14} />
            <span>K</span>
          </button>
          <button
            className="icon-button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a className="nav-cta" href={`mailto:${profile.email}`}>
            Let’s talk
          </a>
          <button
            className="icon-button nav-menu"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
        <span className="nav-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
      </div>

      <div className="mobile-menu" id="mobile-menu" hidden={!open}>
        {sections.map((section, i) => (
          <button key={section.id} onClick={() => go(section.id)}>
            <span>0{i + 1}</span>
            {section.label}
          </button>
        ))}
        <a href={profile.resume} download>
          <span>↓</span>Résumé (PDF)
        </a>
      </div>
    </header>
  );
}
