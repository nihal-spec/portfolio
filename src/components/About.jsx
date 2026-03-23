function About() {
    return (
        <section className="section about" id="about">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">Introduction</span>
                    <h2 className="section-title">About <span className="highlight">Me</span></h2>
                </div>
                <div className="about-content">
                    <div className="about-card glass-card reveal">
                        <div className="about-icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                        </div>
                        <p className="about-text">
                            Motivated <span className="highlight">MERN Stack</span> and <span className="highlight">React Developer</span> with hands-on experience in building responsive and performance-optimized web applications using modern web technologies. Skilled in REST APIs, JWT authentication, cloud deployment, and animated UI design.
                        </p>
                        <div className="about-stats">
                            <div className="stat">
                                <span className="stat-number">3+</span>
                                <span className="stat-label">Projects</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">5+</span>
                                <span className="stat-label">Technologies</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">1</span>
                                <span className="stat-label">Internship</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
