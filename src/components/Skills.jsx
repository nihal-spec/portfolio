const skillsData = [
    {
        title: 'Frontend',
        icon: 'frontend',
        iconPath: (
            <>
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                <line x1="12" y1="22" x2="12" y2="15.5" />
                <polyline points="22 8.5 12 15.5 2 8.5" />
            </>
        ),
        skills: ['React.js', 'Next.js', 'JavaScript (ES6+)', 'Tailwind CSS']
    },
    {
        title: 'Backend',
        icon: 'backend',
        iconPath: (
            <>
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
            </>
        ),
        skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication']
    },
    {
        title: 'Database',
        icon: 'database',
        iconPath: (
            <>
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </>
        ),
        skills: ['MongoDB', 'Mongoose']
    },
    {
        title: 'Tools',
        icon: 'tools',
        iconPath: (
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        ),
        skills: ['Git & GitHub', 'Vercel', 'Postman']
    }
]

function Skills() {
    return (
        <section className="section skills" id="skills">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">What I Know</span>
                    <h2 className="section-title">My <span className="highlight">Skills</span></h2>
                </div>
                <div className="skills-grid">
                    {skillsData.map((category, index) => (
                        <div key={index} className="skill-category glass-card reveal">
                            <div className="skill-header">
                                <div className={`skill-icon ${category.icon}`}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        {category.iconPath}
                                    </svg>
                                </div>
                                <h3>{category.title}</h3>
                            </div>
                            <ul className="skill-list">
                                {category.skills.map((skill, skillIndex) => (
                                    <li key={skillIndex}>
                                        <span className="skill-dot"></span>
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
