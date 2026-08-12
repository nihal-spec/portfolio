/*
  Editorial Scrollstage reminder: build a light-led portfolio with mineral surfaces,
  near-black type, ember signals, offset chapters, and motion that explains the story.
*/
import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Code2,
  Github,
  Linkedin,
  Mail,
  Menu,
  MoveUpRight,
  X,
} from "lucide-react";
import orbitMark from "./assets/nihal-orbit-mark.webp";
import profileImage from "./assets/profile.jpg";
import heroField from "./assets/nihal-hero-ember-field.webp";
import paperTexture from "./assets/nihal-paper-cutout-texture.webp";
import projectTexture from "./assets/nihal-project-ember-texture.webp";
import skillXchangeImage from "./assets/skillxchangelanding.png";
import shopbotImage from "./assets/shopbotScreenshot.png";
import anihubImage from "./assets/anihub-screenshot.png";
import portfolioImage from "./assets/portfolio-screenshot.jpg";

const assets = {
  logo: orbitMark,
  profile: profileImage,
  hero: heroField,
  paper: paperTexture,
  texture: projectTexture,
};

const projects = [
  {
    number: "01",
    title: "SkillXchange Platform",
    descriptor: "Matching learners with momentum.",
    description:
      "An AI-powered skill exchange platform connecting learners and mentors through smart matching and real-time interaction.",
    tags: ["MERN", "AI Matching", "Cloud Functions", "Real-time Chat"],
    image: skillXchangeImage,
    liveUrl: "https://skillxchange-now.vercel.app/",
    accent: "ember",
  },
  {
    number: "02",
    title: "AI Shop Chatbot",
    descriptor: "Search, decide, checkout.",
    description:
      "A chat-led e-commerce experience where users find products and place orders through natural-language intent detection.",
    tags: ["MERN", "AI Chatbot", "Stripe", "Cloudinary"],
    image: shopbotImage,
    liveUrl: "https://shop-chatbot.vercel.app/",
    accent: "cobalt",
  },
  {
    number: "03",
    title: "AniHub — Anime Explorer",
    descriptor: "A calmer way to browse culture.",
    description:
      "A responsive anime discovery platform with trending listings, character information, and news powered by the Jikan API.",
    tags: ["React.js", "Jikan API", "Axios"],
    image: anihubImage,
    liveUrl: "https://anihub-six.vercel.app/",
    accent: "violet",
  },
  {
    number: "04",
    title: "Animated Portfolio Website",
    descriptor: "A first experiment in cinematic scroll.",
    description:
      "A scroll-based portfolio with a cinematic loading sequence, canvas atmosphere, and responsive layout decisions.",
    tags: ["Next.js", "Canvas", "Framer Motion"],
    image: portfolioImage,
    liveUrl: "https://animated-portfolio-xi-six.vercel.app/",
    accent: "graphite",
  },
];

const navItems = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const skillGroups = [
  {
    label: "Build",
    title: "Frontend / Backend",
    items: ["React.js", "Next.js", "JavaScript (ES6+)", "Tailwind CSS", "Node.js", "Express.js"],
  },
  {
    label: "Connect",
    title: "Data / APIs",
    items: ["REST APIs", "JWT Authentication", "MongoDB", "Mongoose", "AI integrations", "Cloud Functions"],
  },
  {
    label: "Ship",
    title: "Tools / Delivery",
    items: ["Git & GitHub", "Vercel", "Postman", "Responsive UI", "Performance", "Team workflows"],
  },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function useScrollStage() {
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(maxScroll > 0 ? Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100)) : 0);
      setScrolled(window.scrollY > 32);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = ["hero", ...navItems.map((item) => item.id)]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")),
      { threshold: 0.12 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return { progress, scrolled, activeSection };
}

export default function Home() {
  const { progress, scrolled, activeSection } = useScrollStage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [activeSkills, setActiveSkills] = useState(0);
  const currentProject = projects[activeProject];
  const progressStyle = { "--progress": `${progress}%` };

  return (
    <div className="portfolio-shell" style={progressStyle}>
      <div className="scroll-progress" aria-hidden="true"><span /></div>

      <header className={`site-nav ${scrolled ? "is-scrolled" : ""}`}>
        <button className="brand-lockup" onClick={() => scrollToSection("hero")} aria-label="Back to top">
          <img src={assets.logo} alt="" className="brand-mark" />
          <span>NIHAL <em>/ VK</em></span>
        </button>
        <nav className={`nav-links ${menuOpen ? "is-open" : ""}`} aria-label="Primary navigation">
          {navItems.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? "is-active" : ""}
              onClick={() => { scrollToSection(item.id); setMenuOpen(false); }}
            >
              <span>0{navItems.findIndex((entry) => entry.id === item.id) + 1}</span>{item.label}
            </button>
          ))}
        </nav>
        <div className="nav-actions">
          <a href="https://github.com/nihal-spec" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a>
          <a href="https://linkedin.com/in/muhammed-nihal-vk-a43a4b359" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a>
          <a className="nav-cta" href="mailto:nihalvk01@gmail.com">Hire me <ArrowUpRight size={15} /></a>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>

      <aside className="chapter-index" aria-label="Page progress">
        <span className="chapter-index-label">Scroll to explore</span>
        <div className="chapter-index-line"><span style={{ height: `${progress}%` }} /></div>
        <span className="chapter-index-number">{activeSection === "hero" ? "00" : `0${Math.max(1, navItems.findIndex((item) => item.id === activeSection) + 1)}`}</span>
      </aside>

      <main>
        <section className="hero-stage" id="hero">
          <div className="hero-art" style={{ backgroundImage: `url(${assets.hero})` }} />
          <div className="hero-grain" />
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow" data-reveal><span className="eyebrow-dot" /> Available for thoughtful builds · Kerala, India</p>
            <h1 className="hero-title" data-reveal>
              <span>Digital</span>
              <span className="hero-title-accent">builder</span>
              <span>with intent.</span>
            </h1>
            <p className="hero-intro" data-reveal>I’m Muhammed Nihal VK — a junior MERN Stack and React developer building scalable, interactive, performance-driven web experiences.</p>
            <div className="hero-actions" data-reveal>
              <button className="button button-dark" onClick={() => scrollToSection("projects")}>Explore the work <ArrowDownRight size={17} /></button>
              <a className="text-link" href="mailto:nihalvk01@gmail.com">Start a conversation <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="hero-portrait" data-reveal>
            <div className="portrait-orbit orbit-one" />
            <div className="portrait-orbit orbit-two" />
            <div className="portrait-frame"><img src={assets.profile} alt="Muhammed Nihal VK" /></div>
            <span className="annotation annotation-top">MERN / React</span>
            <span className="annotation annotation-bottom">made to move ↗</span>
          </div>
          <div className="hero-note" data-reveal>
            <span className="hero-note-index">01 — / 04</span>
            <strong>Less decoration.<br />More direction.</strong>
            <span className="hero-note-rule" />
            <span>Scroll the work.<br />Notice the details.</span>
          </div>
          <div className="hero-footer-line"><span>Portfolio / 2026</span><span>Designing from curiosity to shipped product</span><span>↓ keep going</span></div>
        </section>

        <section className="chapter chapter-about" id="about">
          <div className="section-shell split-layout">
            <div className="chapter-label" data-reveal><span>01</span><span>About</span></div>
            <div className="about-statement">
              <p className="eyebrow" data-reveal>Introduction / The short version</p>
              <h2 data-reveal>I turn complex product ideas into interfaces people can <span className="ink-highlight">feel.</span></h2>
              <p className="body-copy" data-reveal>Motivated by the space where good engineering meets good taste, I build responsive web applications with modern stacks, clear interaction patterns, and enough personality to make the experience memorable.</p>
              <div className="stat-row" data-reveal>
                <div><strong>04+</strong><span>Projects shipped</span></div>
                <div><strong>05+</strong><span>Core technologies</span></div>
                <div><strong>01</strong><span>Industry internship</span></div>
              </div>
            </div>
            <div className="about-card" data-reveal>
              <div className="about-card-image" style={{ backgroundImage: `url(${assets.paper})` }}>
                <img src={assets.profile} alt="Portrait of Muhammed Nihal VK" />
                <span className="about-card-stamp">N / VK</span>
              </div>
              <div className="about-card-meta"><span>Currently</span><strong>Building, learning,<br />looking closer.</strong></div>
            </div>
          </div>
        </section>

        <section className="chapter chapter-skills" id="skills">
          <div className="section-shell">
            <div className="chapter-heading-row">
              <div className="chapter-label" data-reveal><span>02</span><span>Skills</span></div>
              <p className="eyebrow" data-reveal>What I know / And how I use it</p>
            </div>
            <div className="skills-intro" data-reveal><h2>The stack is a tool.<br /><span>The feeling is the craft.</span></h2><p>From interface systems to REST APIs, I like understanding how the whole thing connects.</p></div>
            <div className="skill-tabs" role="tablist" aria-label="Skill categories">
              {skillGroups.map((group, index) => (
                <button key={group.label} className={activeSkills === index ? "is-active" : ""} onClick={() => setActiveSkills(index)} role="tab" aria-selected={activeSkills === index}>
                  <span>0{index + 1}</span>{group.label}<ArrowUpRight size={15} />
                </button>
              ))}
            </div>
            <div className="skill-panel" data-reveal>
              <div><span className="skill-panel-kicker">Current toolkit</span><h3>{skillGroups[activeSkills].title}</h3></div>
              <ul>{skillGroups[activeSkills].items.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>
              <div className="skill-panel-index">{String(activeSkills + 1).padStart(2, "0")} / 03</div>
            </div>
          </div>
        </section>

        <section className="chapter chapter-projects" id="projects">
          <div className="section-shell">
            <div className="chapter-heading-row">
              <div className="chapter-label" data-reveal><span>03</span><span>Selected work</span></div>
              <p className="eyebrow" data-reveal>My work / A few things I’ve built</p>
            </div>
            <div className="projects-intro" data-reveal><h2>Projects with a point<br /><span>of view.</span></h2><p>Every build is a chance to make the next interaction a little clearer, faster, or more useful.</p></div>
            <div className="project-stage">
              <div className="project-list" role="list">
                {projects.map((project, index) => (
                  <button key={project.title} className={`project-list-item ${activeProject === index ? "is-active" : ""}`} onClick={() => setActiveProject(index)} role="listitem">
                    <span className="project-list-number">{project.number}</span><span className="project-list-name">{project.title}</span><ArrowUpRight size={16} />
                  </button>
                ))}
              </div>
              <article className={`featured-project featured-${currentProject.accent}`} data-reveal>
                <div className="featured-project-image"><img src={currentProject.image} alt={`${currentProject.title} interface preview`} /><div className="featured-project-overlay" /><span className="featured-project-note">Selected frame / {currentProject.number}</span><span className="featured-project-arrow"><ArrowUpRight size={25} /></span></div>
                <div className="featured-project-content"><div><span className="eyebrow">{currentProject.descriptor}</span><h3>{currentProject.title}</h3><p>{currentProject.description}</p></div><div className="featured-project-bottom"><div className="tag-row">{currentProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a className="button button-dark" href={currentProject.liveUrl} target="_blank" rel="noreferrer">View live <MoveUpRight size={16} /></a></div></div>
              </article>
            </div>
          </div>
        </section>

        <section className="chapter chapter-experience" id="experience">
          <div className="section-shell split-layout experience-layout">
            <div className="chapter-label" data-reveal><span>04</span><span>Experience</span></div>
            <div className="experience-copy"><p className="eyebrow" data-reveal>Career / The work behind the work</p><h2 data-reveal>Still early.<br /><span>Already moving.</span></h2><div className="timeline-entry" data-reveal><div className="timeline-meta"><span>2025 — Present</span><span>Kerala, IN</span></div><h3>MERN Stack Developer Intern</h3><p className="timeline-company">Futura Labs</p><ul><li>Developed full-stack applications using the MERN stack.</li><li>Built responsive UIs with React and Tailwind.</li><li>Implemented REST APIs and JWT authentication.</li><li>Collaborated using Git workflows.</li></ul></div><div className="education-entry" data-reveal><div><span className="eyebrow">Academic foundation</span><h3>B.Sc Computer Science</h3><p>Kannur University · 2025</p></div><Code2 size={28} /></div></div>
            <div className="experience-art" data-reveal style={{ backgroundImage: `url(${assets.texture})` }}><span className="experience-art-label">Learn / make / repeat</span><span className="experience-art-number">05</span></div>
          </div>
        </section>

        <section className="contact-stage" id="contact">
          <div className="contact-stage-art" />
          <div className="section-shell contact-inner">
            <div className="chapter-label light" data-reveal><span>05</span><span>Contact</span></div>
            <div className="contact-main"><p className="eyebrow light" data-reveal>Get in touch / The next move</p><h2 data-reveal>Have a good idea?<br /><em>Let’s make it real.</em></h2><a className="contact-email" href="mailto:nihalvk01@gmail.com" data-reveal>nihalvk01@gmail.com <ArrowUpRight size={23} /></a></div>
            <div className="contact-links" data-reveal><a href="tel:+917592853835"><span>Phone</span>+91 7592853835<ArrowUpRight size={16} /></a><a href="https://github.com/nihal-spec" target="_blank" rel="noreferrer"><span>GitHub</span>nihal-spec<ArrowUpRight size={16} /></a><a href="https://linkedin.com/in/muhammed-nihal-vk-a43a4b359" target="_blank" rel="noreferrer"><span>LinkedIn</span>Muhammed Nihal VK<ArrowUpRight size={16} /></a></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="section-shell"><span>© 2026 Muhammed Nihal VK</span><span>Built with curiosity / Shipped with care</span><button onClick={() => scrollToSection("hero")} aria-label="Back to top"><ArrowUpRight size={16} /> Back to top</button></div></footer>
    </div>
  );
}
