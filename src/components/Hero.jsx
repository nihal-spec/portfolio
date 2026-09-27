import { ArrowDown, ArrowUpRight, Check, Copy, Download } from "lucide-react";
import { Fragment, useState } from "react";
import DotField from "./DotField.jsx";
import profileImage from "../assets/profile.webp";
import { experience, profile, projects } from "../data/portfolio.js";
import { copyText, scrollToId, useLocalTime } from "../hooks/useSite.js";

function SplitWords({ text, offset = 0 }) {
  // The space sits outside the clipping inline-block so it isn't collapsed.
  return text.split(" ").map((word, i) => (
    <Fragment key={`${word}-${i}`}>
      <span className="word">
        <span style={{ "--i": offset + i }}>{word}</span>
      </span>{" "}
    </Fragment>
  ));
}

export default function Hero({ reducedMotion, notify }) {
  const time = useLocalTime(profile.timeZone);
  const [copied, setCopied] = useState(false);
  const current = experience.find((job) => job.current);
  const [lineOne, lineTwo] = profile.headline;
  const lastSpace = lineTwo.lastIndexOf(" ");
  const lineTwoLead = lastSpace > 0 ? lineTwo.slice(0, lastSpace) : "";
  const lineTwoAccent = lineTwo.slice(lastSpace + 1);

  const copyEmail = async () => {
    if (await copyText(profile.email)) {
      setCopied(true);
      notify("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } else {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <DotField reducedMotion={reducedMotion} />
      <div className="hero-glow" aria-hidden="true" />

      <div className="shell hero-inner">
        <div className="hero-meta">
          <span className="status-pill">
            <span className="pulse" aria-hidden="true" />
            {profile.status}
          </span>
          <span className="mono muted">
            {profile.location} · <time>{time}</time> IST
          </span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-name mono">
              {profile.name} <span className="muted">— {profile.role}</span>
            </p>
            <h1 id="hero-title" className="hero-title">
              <span className="line">
                <SplitWords text={lineOne} />
              </span>
              <span className="line">
                {lineTwoLead && <SplitWords text={lineTwoLead} offset={2} />}
                <span className="word">
                  <em className="serif accent" style={{ "--i": 4 }}>
                    {lineTwoAccent}
                  </em>
                </span>
              </span>
            </h1>
            <p className="hero-intro">{profile.intro}</p>

            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollToId("work")}>
                See selected work <ArrowDown size={16} />
              </button>
              <a className="btn btn-ghost" href={profile.resume} download>
                Résumé <Download size={15} />
              </a>
              <button className="btn btn-link" onClick={copyEmail} aria-label={`Copy email address ${profile.email}`}>
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{profile.email}</span>
              </button>
            </div>
          </div>

          <figure className="hero-portrait">
            <div className="portrait-frame">
              <img
                src={profileImage}
                alt={`Portrait of ${profile.name}`}
                width="900"
                height="925"
                fetchPriority="high"
              />
            </div>
            {current && (
              <figcaption className="portrait-card">
                <span className="mono muted">Currently</span>
                <strong>{current.role}</strong>
                <span>
                  at {current.company} · {current.period.split(" ")[0]}
                </span>
              </figcaption>
            )}
          </figure>
        </div>

        <div className="hero-foot">
          <div className="hero-index mono" aria-label="Project index">
            {projects.map((project, i) => (
              <a key={project.id} href={`#${project.id}`}>
                <span className="muted">{String(i + 1).padStart(2, "0")}</span> {project.title}
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
          <span className="scroll-cue mono muted" aria-hidden="true">
            Scroll <span />
          </span>
        </div>
      </div>
    </section>
  );
}
