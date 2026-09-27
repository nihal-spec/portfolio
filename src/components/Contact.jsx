import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Github, Linkedin, Phone } from "lucide-react";
import { profile } from "../data/portfolio.js";
import { copyText, scrollToId, useLocalTime } from "../hooks/useSite.js";
import Mark from "./Mark.jsx";

export default function Contact({ notify }) {
  const [copied, setCopied] = useState(false);
  const time = useLocalTime(profile.timeZone);
  const { github, linkedin } = profile.socials;

  const copyEmail = async () => {
    if (await copyText(profile.email)) {
      setCopied(true);
      notify("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const links = [
    { label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}`, icon: Phone },
    { label: github.label, value: github.handle, href: github.url, icon: Github, external: true },
    { label: linkedin.label, value: linkedin.handle, href: linkedin.url, icon: Linkedin, external: true },
    { label: "Résumé", value: "Download PDF", href: profile.resume, icon: Download, download: true },
  ];

  return (
    <section className="section contact" id="contact" aria-labelledby="contact-title">
      <div className="contact-glow" aria-hidden="true" />
      <div className="shell">
        <p className="eyebrow mono" data-reveal>
          <span className="accent">05</span> / Contact
        </p>
        <h2 id="contact-title" className="contact-title" data-reveal>
          Have a good idea?
          <br />
          <em className="serif">Let’s make it real.</em>
        </h2>

        <div className="contact-email" data-reveal>
          <a href={`mailto:${profile.email}`} className="contact-mail">
            {profile.email}
            <ArrowUpRight size={28} />
          </a>
          <button className="btn btn-ghost btn-sm" onClick={copyEmail}>
            {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <ul className="contact-links" data-reveal>
          {links.map(({ label, value, href, icon, external, download }) => {
            const Icon = icon;
            return (
              <li key={label}>
                <a
                  href={href}
                  {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
                  {...(download ? { download: true } : {})}
                >
                  <Icon size={16} />
                  <span className="mono muted">{label}</span>
                  <span className="contact-value">{value}</span>
                  <ArrowUpRight size={15} className="contact-arrow" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="footer shell">
        <div className="footer-brand">
          <Mark size={22} />
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
        </div>
        <span className="mono muted">Built with curiosity / Shipped with care</span>
        <span className="mono muted">
          {profile.location} · {time} IST
        </span>
        <button className="btn btn-link" onClick={() => scrollToId(null)}>
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
