import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  AtSign,
  CornerDownLeft,
  Download,
  ExternalLink,
  Github,
  Hash,
  Linkedin,
  Search,
  SunMoon,
} from "lucide-react";
import { profile, projects, sections } from "../data/portfolio.js";
import { copyText, scrollToId } from "../hooks/useSite.js";

function buildCommands({ onToggleTheme, notify }) {
  return [
    ...sections.map((s) => ({
      id: `go-${s.id}`,
      group: "Navigate",
      label: `Go to ${s.label}`,
      icon: Hash,
      run: () => scrollToId(s.id),
    })),
    ...projects.map((p) => ({
      id: `open-${p.id}`,
      group: "Projects",
      label: `${p.title} — live site`,
      hint: p.tags.join(" "),
      icon: ExternalLink,
      run: () => window.open(p.liveUrl, "_blank", "noopener"),
    })),
    {
      id: "copy-email",
      group: "Actions",
      label: "Copy email address",
      hint: profile.email,
      icon: AtSign,
      run: async () => notify((await copyText(profile.email)) ? "Email copied to clipboard" : profile.email),
    },
    {
      id: "resume",
      group: "Actions",
      label: "Download résumé",
      hint: "pdf cv",
      icon: Download,
      run: () => {
        const link = document.createElement("a");
        link.href = profile.resume;
        link.download = "";
        link.click();
      },
    },
    { id: "theme", group: "Actions", label: "Toggle light / dark theme", icon: SunMoon, run: onToggleTheme },
    {
      id: "github",
      group: "Elsewhere",
      label: "GitHub",
      hint: profile.socials.github.handle,
      icon: Github,
      run: () => window.open(profile.socials.github.url, "_blank", "noopener"),
    },
    {
      id: "linkedin",
      group: "Elsewhere",
      label: "LinkedIn",
      icon: Linkedin,
      run: () => window.open(profile.socials.linkedin.url, "_blank", "noopener"),
    },
  ];
}

export default function CommandPalette({ onClose, onToggleTheme, notify }) {
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const restoreRef = useRef(null);

  const commands = useMemo(() => buildCommands({ onToggleTheme, notify }), [onToggleTheme, notify]);
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => `${c.group} ${c.label} ${c.hint ?? ""}`.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    restoreRef.current = document.activeElement;
    document.body.style.overflow = "hidden";
    const id = requestAnimationFrame(() => inputRef.current?.focus());
    return () => {
      cancelAnimationFrame(id);
      document.body.style.overflow = "";
      restoreRef.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [index]);

  const run = (command) => {
    onClose();
    // Let the dialog unmount (and body scroll unlock) before navigating.
    requestAnimationFrame(() => command.run());
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setIndex((i) => (i + 1) % Math.max(results.length, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setIndex((i) => (i - 1 + results.length) % Math.max(results.length, 1));
    } else if (event.key === "Enter" && results[index]) {
      event.preventDefault();
      run(results[index]);
    } else if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "Tab") {
      event.preventDefault();
    }
  };

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command menu"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={onKeyDown}
      >
        <div className="palette-search">
          <Search size={16} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIndex(0);
            }}
            placeholder="Jump to a section, open a project, copy email…"
            aria-label="Search commands"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
          />
          <kbd>esc</kbd>
        </div>
        <ul className="palette-list" id="palette-list" role="listbox" ref={listRef}>
          {results.length === 0 && <li className="palette-empty">No matches for “{query}”</li>}
          {results.map((command, i) => {
            const header = command.group !== results[i - 1]?.group ? command.group : null;
            const Icon = command.icon;
            return (
              <li key={command.id} role="presentation">
                {header && <div className="palette-group">{header}</div>}
                <div
                  id={`cmd-${command.id}`}
                  role="option"
                  aria-selected={i === index}
                  className="palette-item"
                  onMouseMove={() => setIndex(i)}
                  onClick={() => run(command)}
                >
                  <Icon size={15} />
                  <span>{command.label}</span>
                  {i === index ? (
                    <CornerDownLeft size={14} className="palette-enter" />
                  ) : (
                    <ArrowRight size={14} className="palette-arrow" />
                  )}
                </div>
              </li>
            );
          })}
        </ul>
        <div className="palette-foot">
          <span>
            <kbd>↑</kbd>
            <kbd>↓</kbd> navigate
          </span>
          <span>
            <kbd>↵</kbd> select
          </span>
        </div>
      </div>
    </div>
  );
}
