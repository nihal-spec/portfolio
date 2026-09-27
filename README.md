# Muhammed Nihal VK — Portfolio

Personal portfolio of Muhammed Nihal VK, MERN Stack & Next.js developer.
Live: [portfolio-nihalvk.vercel.app](https://portfolio-nihalvk.vercel.app/)

Built with **React 19 + Vite 7**, plain CSS (design tokens, light/dark themes), and `lucide-react` icons.
Fonts (Geist, Geist Mono, Instrument Serif) are self-hosted via Fontsource, with no third-party requests.

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
npm run preview  # serve the production build
npm run lint     # eslint over src/
```

## Editing content

All content lives in **`src/data/portfolio.js`**: profile, projects, experience, education and skills.

### Adding a project

1. Drop a screenshot into `src/assets/work/` (WebP around 1600px wide keeps it light).
2. Import it at the top of `src/data/portfolio.js`.
3. Append an entry to `projects`:

```js
{
  id: "my-project",                 // used for the #anchor and stack links
  title: "My Project",
  subtitle: "Short category",
  role: "Full-Stack Developer",
  descriptor: "One-line hook.",
  description: "What it is and who it's for.",
  highlights: ["What you built or integrated."],
  tags: ["Next.js", "Supabase"],
  images: [{ src: myProjectShot, alt: "My Project dashboard", label: "Dashboard" }],
  liveUrl: "https://…",
  accent: "#4f8cff",                // tints the card glow and descriptor
}
```

The hero index, the stacked case studies, and the ⌘K command menu pick it up automatically.
To link a skill in the Stack explorer to the project, add the project `id` to that skill's `usedIn` list.

## Structure

```
src/
  data/portfolio.js      content (single source of truth)
  hooks/useSite.js       theme, scroll state, reveal, local time helpers
  components/            Nav, CommandPalette, Hero (+ DotField canvas), Work,
                         About, Stack, Experience, Contact, Mark (logo)
  index.css              design tokens + all styles
public/                  favicon, résumé PDF
```

## Interaction notes

- **⌘K / Ctrl+K or `/`** opens the command menu (jump to sections, open projects, copy email, download résumé, toggle theme).
- The theme follows the system preference until toggled, and the choice is remembered.
- All motion respects `prefers-reduced-motion`.
