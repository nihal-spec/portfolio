import { useEffect, useRef } from "react";
import { education, experience, profile } from "../data/portfolio.js";

export default function About({ reducedMotion }) {
  const statementRef = useRef(null);
  const words = profile.statement.split(" ");

  // Words ink in one by one as the statement travels up the viewport.
  useEffect(() => {
    const node = statementRef.current;
    if (reducedMotion) {
      node.style.setProperty("--p", 1);
      return undefined;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh * 0.85 - rect.top) / (vh * 0.55);
      node.style.setProperty("--p", Math.min(1, Math.max(0, progress)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reducedMotion]);

  const [current, previous] = experience;
  const facts = [
    { label: "Based in", value: profile.location },
    current && { label: "Currently", value: `${current.role}`, note: current.company },
    previous && { label: "Previously", value: previous.role, note: previous.company },
    { label: "Education", value: education.degree, note: `${education.school} · ${education.year}` },
    { label: "Interested in", value: "Interface design, data workflows, production-ready products" },
  ].filter(Boolean);

  return (
    <section className="section about" id="about" aria-labelledby="about-title">
      <div className="shell">
        <p className="eyebrow mono" data-reveal>
          <span className="accent">02</span> / About
        </p>
        <h2 id="about-title" className="statement" ref={statementRef} style={{ "--n": words.length }}>
          {words.map((word, i) => {
            const isLast = i === words.length - 1;
            return (
              <span key={`${word}-${i}`} style={{ "--i": i }} className={isLast ? "serif accent" : undefined}>
                {word}
                {isLast ? "" : " "}
              </span>
            );
          })}
        </h2>

        <div className="about-grid">
          <div className="about-copy" data-reveal>
            {profile.about.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <dl className="facts" data-reveal>
            {facts.map((fact) => (
              <div key={fact.label} className="fact">
                <dt className="mono muted">{fact.label}</dt>
                <dd>
                  {fact.value}
                  {fact.note && <span className="muted"> — {fact.note}</span>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
