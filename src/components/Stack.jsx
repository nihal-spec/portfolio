import { useMemo, useState } from "react";
import { ArrowUpRight, BriefcaseBusiness, FolderGit2 } from "lucide-react";
import { experience, projects, skillGroups } from "../data/portfolio.js";

const lookup = Object.fromEntries([
  ...projects.map((p) => [
    p.id,
    { kind: "project", title: p.title, meta: p.role, href: `#${p.id}`, image: p.images[0].src },
  ]),
  ...experience.map((e) => [
    e.id,
    { kind: "role", title: e.company, meta: `${e.role} · ${e.period}`, href: "#experience" },
  ]),
]);

export default function Stack() {
  const [selected, setSelected] = useState("Next.js");
  const [pinned, setPinned] = useState("Next.js");

  const skill = useMemo(() => skillGroups.flatMap((g) => g.skills).find((s) => s.name === selected), [selected]);
  const places = skill.usedIn.map((id) => lookup[id]).filter(Boolean);
  const totalSkills = skillGroups.reduce((sum, g) => sum + g.skills.length, 0);

  return (
    <section className="section stack" id="stack" aria-labelledby="stack-title">
      <div className="shell">
        <header className="section-head" data-reveal>
          <p className="eyebrow mono">
            <span className="accent">03</span> / Stack
          </p>
          <h2 id="stack-title" className="section-title">
            The stack is a tool. <em className="serif">The feeling is the craft.</em>
          </h2>
          <p className="section-lede">
            {totalSkills} tools I work with. Pick one to see where it shows up in the work.
          </p>
        </header>

        <div className="stack-grid">
          <div className="stack-groups" data-reveal onMouseLeave={() => setSelected(pinned)}>
            {skillGroups.map((group) => (
              <div className="stack-group" key={group.id} role="group" aria-labelledby={`sg-${group.id}`}>
                <h3 id={`sg-${group.id}`} className="mono muted">
                  {group.label}
                </h3>
                <ul>
                  {group.skills.map((s) => (
                    <li key={s.name}>
                      <button
                        className={`chip ${selected === s.name ? "is-active" : ""} ${s.usedIn.length ? "" : "is-quiet"}`}
                        aria-pressed={pinned === s.name}
                        onMouseEnter={() => setSelected(s.name)}
                        onFocus={() => setSelected(s.name)}
                        onClick={() => {
                          setPinned(s.name);
                          setSelected(s.name);
                        }}
                      >
                        {s.name}
                        {s.usedIn.length > 0 && <span className="chip-count">{s.usedIn.length}</span>}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <aside className="stack-panel" data-reveal aria-live="polite">
            <p className="mono muted">Where it shows up</p>
            <p className="stack-skill">{skill.name}</p>
            {places.length > 0 ? (
              <ul className="stack-places">
                {places.map((place) => (
                  <li key={place.title}>
                    <a href={place.href}>
                      {place.image ? (
                        <img src={place.image} alt="" loading="lazy" />
                      ) : (
                        <span className="stack-place-icon">
                          <BriefcaseBusiness size={16} />
                        </span>
                      )}
                      <span>
                        <strong>{place.title}</strong>
                        <span className="muted">
                          {place.kind === "project" ? <FolderGit2 size={12} /> : null} {place.meta}
                        </span>
                      </span>
                      <ArrowUpRight size={14} />
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="stack-empty muted">Part of the everyday toolkit rather than tied to one listed project.</p>
            )}
          </aside>
        </div>
      </div>
    </section>
  );
}
