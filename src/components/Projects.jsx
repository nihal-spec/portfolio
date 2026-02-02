import { useState } from 'react'
import anihubScreenshot from '../assets/anihub-screenshot.png'
import portfolioScreenshot from '../assets/portfolio-screenshot.jpg'

const projectsData = [
    {
        title: 'AniHub – Anime Explorer',
        description: 'Anime browsing platform with trending listings, character info, and news using Jikan API.',
        tags: ['React.js', 'Jikan API', 'Axios'],
        liveUrl: 'https://anihub-six.vercel.app/',
        screenshot: anihubScreenshot,
        overlayStyle: 'dark'
    },
    {
        title: 'Animated Portfolio Website',
        description: 'Scroll-based animated portfolio with cinematic loading and responsive layout.',
        tags: ['Next.js', 'Canvas', 'Framer Motion'],
        liveUrl: 'https://animated-portfolio-xi-six.vercel.app/',
        screenshot: portfolioScreenshot,
        overlayStyle: 'cinematic'
    }
]

function ProjectCard({ project, index }) {
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <article
            className="project-card glass-card reveal"
            style={{ '--delay': `${index * 0.15}s` }}
        >
            {/* Image Container */}
            <div className="project-image-container">
                {/* Blur placeholder */}
                {!imageLoaded && (
                    <div className="project-image-placeholder">
                        <div className="placeholder-shimmer"></div>
                    </div>
                )}

                {/* Actual screenshot */}
                <img
                    src={project.screenshot}
                    alt={`${project.title} screenshot`}
                    className={`project-screenshot ${imageLoaded ? 'loaded' : ''}`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Gradient overlay for visual effect */}
                <div className={`project-overlay-gradient ${project.overlayStyle}`}></div>

                {/* Hover overlay with link - only visible on hover */}
                <div className="project-hover-overlay">
                    <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-view-btn"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                            <polyline points="15 3 21 3 21 9" />
                            <line x1="10" y1="14" x2="21" y2="3" />
                        </svg>
                        <span>View Live</span>
                    </a>
                </div>
            </div>

            {/* Project Content - always visible */}
            <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                    {project.tags.map((tag, tagIndex) => (
                        <span key={tagIndex} className="tag">{tag}</span>
                    ))}
                </div>
                <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-small"
                >
                    <span>View Live</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                </a>
            </div>
        </article>
    )
}

function Projects() {
    return (
        <section className="section projects" id="projects">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">My Work</span>
                    <h2 className="section-title">Featured <span className="highlight">Projects</span></h2>
                </div>
                <div className="projects-grid">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={index} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Projects
