import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { hostname, projects } from "../data/portfolio.js";

function BrowserFrame({ project }) {
  const [shown, setShown] = useState(0);
  const frameRef = useRef(null);

  const onMove = (event) => {
    const node = frameRef.current;
    if (!node || event.pointerType !== "mouse") return;
    const rect = node.getBoundingClientRect();
    node.style.setProperty("--rx", `${((event.clientY - rect.top) / rect.height - 0.5) * -5}deg`);
    node.style.setProperty("--ry", `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`);
  };
  const onLeave = () => {
    frameRef.current?.style.setProperty("--rx", "0deg");
    frameRef.current?.style.setProperty("--ry", "0deg");
  };

  return (
    <div className="browser" ref={frameRef} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="browser-bar">
        <span className="browser-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <a className="browser-url mono" href={project.liveUrl} target="_blank" rel="noreferrer" tabIndex={-1}>
          {hostname(project.liveUrl)}
        </a>
        {project.images.length > 1 ? (
          <div className="browser-tabs" role="tablist" aria-label={`${project.title} screens`}>
            {project.images.map((image, i) => (
              <button
                key={image.alt}
                role="tab"
                aria-selected={shown === i}
                className={shown === i ? "is-active" : ""}
                onClick={() => setShown(i)}
              >
                {image.label ?? `Screen ${i + 1}`}
              </button>
            ))}
          </div>
        ) : (
          <span className="browser-spacer" />
        )}
      </div>
      <div className="browser-view">
        {project.images.map((image, i) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            loading="lazy"
            decoding="async"
            className={shown === i ? "is-shown" : ""}
            aria-hidden={shown !== i}
          />
        ))}
      </div>
    </div>
  );
}

export default function Work() {
  const listRef = useRef(null);

  // As a case study gets covered by the next one, let it recede slightly.
  useEffect(() => {
    const list = listRef.current;
    const cards = [...list.querySelectorAll(".case")];
    const desktop = window.matchMedia("(min-width: 960px) and (prefers-reduced-motion: no-preference)");
    let frame = 0;

    const update = () => {
      frame = 0;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next || !desktop.matches) {
          card.style.setProperty("--cover", 0);
          return;
        }
        const rect = card.getBoundingClientRect();
        const distance = next.getBoundingClientRect().top - rect.top;
        const cover = Math.min(1, Math.max(0, 1 - distance / rect.height));
        card.style.setProperty("--cover", cover.toFixed(3));
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", update);
    };
  }, []);

  const total = String(projects.length).padStart(2, "0");

  return (
    <section className="section work" id="work" aria-labelledby="work-title">
      <div className="shell">
        <header className="section-head" data-reveal>
          <p className="eyebrow mono">
            <span className="accent">01</span> / Selected work
          </p>
          <h2 id="work-title" className="section-title">
            Projects with a point <em className="serif">of view.</em>
            <sup className="mono muted">({total})</sup>
          </h2>
          <p className="section-lede">
            Every build is a chance to make the next interaction a little clearer, faster, or more useful.
          </p>
        </header>

        <ol className="case-list" ref={listRef}>
          {projects.map((project, i) => (
            <li key={project.id} id={project.id} className="case" style={{ "--case-accent": project.accent, "--i": i }}>
              <article className="case-card" aria-labelledby={`${project.id}-title`}>
                <div className="case-info">
                  <div className="case-top mono">
                    <span>
                      <span className="accent">{String(i + 1).padStart(2, "0")}</span>
                      <span className="muted"> / {total}</span>
                    </span>
                    <span className="muted">{project.role}</span>
                  </div>

                  <div className="case-body">
                    <p className="case-descriptor serif">{project.descriptor}</p>
                    <h3 id={`${project.id}-title`} className="case-title">
                      {project.title}
                      <span className="muted"> {project.subtitle}</span>
                    </h3>
                    <p className="case-desc">{project.description}</p>
                    <ul className="case-highlights">
                      {project.highlights.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="case-foot">
                    <ul className="tags" aria-label="Built with">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                    <a className="btn btn-primary btn-sm" href={project.liveUrl} target="_blank" rel="noreferrer">
                      Visit live site <ArrowUpRight size={15} />
                      <span className="sr-only"> for {project.title} (opens in a new tab)</span>
                    </a>
                  </div>
                </div>

                <div className="case-media">
                  <BrowserFrame project={project} />
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
