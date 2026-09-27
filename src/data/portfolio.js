/*
  Single source of truth for the portfolio's content.
  To add a project: import its screenshot(s) below and append an entry to `projects`.
  Everything else (index, command palette, stack explorer links) picks it up automatically.
*/
import skillXchangeLanding from "../assets/work/skillxchange-landing.webp";
import skillXchangeDashboard from "../assets/work/skillxchange-dashboard.webp";
import shopChatbot from "../assets/work/shop-chatbot.webp";
import anihub from "../assets/work/anihub.webp";
import animatedPortfolio from "../assets/work/animated-portfolio.webp";

export const profile = {
  name: "Muhammed Nihal VK",
  shortName: "Nihal",
  role: "MERN Stack & Next.js Developer",
  location: "Kerala, India",
  timeZone: "Asia/Kolkata",
  status: "Open to thoughtful builds",
  headline: ["Digital builder", "with intent."],
  intro:
    "I build scalable, responsive, and performance-focused web applications — from interface systems to REST APIs, with enough personality to make the experience memorable.",
  statement: "I turn complex product ideas into interfaces people can feel.",
  about: [
    "Motivated by the space where good engineering meets good taste, I build responsive web applications with modern stacks and clear interaction patterns.",
    "I have a strong interest in thoughtful interface design, reliable data workflows, and shipping production-ready products — and I like understanding how the whole thing connects.",
  ],
  email: "nihalvk01@gmail.com",
  phone: "+91 7592853835",
  resume: "/muhammed-nihal-vk-resume.pdf",
  socials: {
    github: { label: "GitHub", handle: "nihal-spec", url: "https://github.com/nihal-spec" },
    linkedin: {
      label: "LinkedIn",
      handle: "Muhammed Nihal VK",
      url: "https://linkedin.com/in/muhammed-nihal-vk-a43a4b359",
    },
  },
};

export const projects = [
  {
    id: "skillxchange",
    title: "SkillXchange",
    subtitle: "Platform",
    role: "Full-Stack Developer",
    descriptor: "Matching learners with momentum.",
    description:
      "An AI-powered skill exchange platform connecting learners and mentors through smart matching and real-time interaction.",
    highlights: ["Integrated MERN, Cloud Functions, AI matching workflows, and real-time chat capabilities."],
    tags: ["MERN", "AI Matching", "Cloud Functions", "Real-time Chat"],
    images: [
      { src: skillXchangeLanding, alt: "SkillXchange landing page", label: "Landing" },
      { src: skillXchangeDashboard, alt: "SkillXchange learner dashboard", label: "Dashboard" },
    ],
    liveUrl: "https://skillxchange-now.vercel.app/",
    accent: "#e8c35c",
  },
  {
    id: "shop-chatbot",
    title: "AI Shop Chatbot",
    subtitle: "Conversational commerce",
    role: "Full-Stack Developer",
    descriptor: "Search, decide, checkout.",
    description:
      "A chat-led e-commerce experience where users find products and place orders through natural-language intent detection.",
    highlights: ["Integrated AI intent detection, Stripe payments, and Cloudinary media workflows."],
    tags: ["MERN", "AI Chatbot", "Stripe", "Cloudinary"],
    images: [{ src: shopChatbot, alt: "AI Shop Chatbot sign-in screen" }],
    liveUrl: "https://shop-chatbot.vercel.app/",
    accent: "#7b6cff",
  },
  {
    id: "anihub",
    title: "AniHub",
    subtitle: "Anime explorer",
    role: "Frontend Developer",
    descriptor: "A calmer way to browse culture.",
    description:
      "A responsive anime discovery platform with trending listings, character information, and news powered by the Jikan API.",
    highlights: ["Integrated the Jikan API and Axios for responsive data-driven browsing."],
    tags: ["React.js", "Jikan API", "Axios"],
    images: [{ src: anihub, alt: "AniHub home page with featured anime news" }],
    liveUrl: "https://anihub-six.vercel.app/",
    accent: "#ff3d8b",
  },
  {
    id: "animated-portfolio",
    title: "Animated Portfolio",
    subtitle: "Website",
    role: "Frontend Developer",
    descriptor: "A first experiment in cinematic scroll.",
    description:
      "A scroll-based portfolio with a cinematic loading sequence, canvas atmosphere, and responsive layout decisions.",
    highlights: ["Built a motion-led presentation with Next.js, Canvas, and Framer Motion."],
    tags: ["Next.js", "Canvas", "Framer Motion"],
    images: [{ src: animatedPortfolio, alt: "Animated portfolio website loading scene" }],
    liveUrl: "https://animated-portfolio-xi-six.vercel.app/",
    accent: "#ff7a45",
  },
];

export const experience = [
  {
    id: "tecnots",
    role: "Next.js Developer",
    company: "Tecnots",
    period: "2026 — Present",
    location: "Kerala, India",
    current: true,
    points: [
      "Developed scalable Next.js applications using the App Router and server-side rendering (SSR).",
      "Built Supabase data workflows and integrated Prisma ORM for reliable application data access.",
      "Worked with Dockerized development and deployment environments.",
    ],
  },
  {
    id: "futura-labs",
    role: "MERN Stack Developer Intern",
    company: "Futura Labs",
    period: "2025 — 2026",
    location: "Kerala, India",
    current: false,
    points: [
      "Developed full-stack applications using MongoDB, Express.js, React, and Node.js.",
      "Built responsive user interfaces with React and Tailwind CSS.",
      "Implemented REST APIs and JWT authentication for secure application workflows.",
      "Collaborated with Git-based development workflows.",
    ],
  },
];

export const education = {
  degree: "B.Sc Computer Science",
  school: "Kannur University",
  year: "2025",
  location: "Kerala, India",
};

/*
  Skills, grouped as on the resume. `usedIn` lists project / experience ids where the
  skill is explicitly part of the work described above — it powers the stack explorer.
*/
const MERN_PROJECTS = ["skillxchange", "shop-chatbot"];

export const skillGroups = [
  {
    id: "frontend",
    label: "Frontend",
    skills: [
      { name: "Next.js", usedIn: ["tecnots", "animated-portfolio"] },
      { name: "React.js", usedIn: ["futura-labs", ...MERN_PROJECTS, "anihub"] },
      { name: "App Router", usedIn: ["tecnots"] },
      { name: "Server-Side Rendering", usedIn: ["tecnots"] },
      { name: "Tailwind CSS", usedIn: ["futura-labs"] },
    ],
  },
  {
    id: "backend",
    label: "Backend & Data",
    skills: [
      { name: "Node.js", usedIn: ["futura-labs", ...MERN_PROJECTS] },
      { name: "Express.js", usedIn: ["futura-labs", ...MERN_PROJECTS] },
      { name: "MongoDB", usedIn: ["futura-labs", ...MERN_PROJECTS] },
      { name: "Mongoose", usedIn: [] },
      { name: "REST APIs", usedIn: ["futura-labs"] },
      { name: "JWT Authentication", usedIn: ["futura-labs"] },
      { name: "Supabase", usedIn: ["tecnots"] },
      { name: "Prisma ORM", usedIn: ["tecnots"] },
    ],
  },
  {
    id: "tools",
    label: "Tools & Delivery",
    skills: [
      { name: "Docker", usedIn: ["tecnots"] },
      { name: "Git & GitHub", usedIn: ["futura-labs"] },
      { name: "Vercel", usedIn: ["skillxchange", "shop-chatbot", "anihub", "animated-portfolio"] },
      { name: "Cloud Functions", usedIn: ["skillxchange"] },
      { name: "Stripe", usedIn: ["shop-chatbot"] },
      { name: "Cloudinary", usedIn: ["shop-chatbot"] },
      { name: "Postman", usedIn: [] },
    ],
  },
  {
    id: "languages",
    label: "Languages",
    skills: [
      { name: "JavaScript (ES6+)", usedIn: [] },
      { name: "HTML", usedIn: [] },
      { name: "CSS", usedIn: [] },
    ],
  },
];

export const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function hostname(url) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
