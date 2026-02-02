function Education() {
    return (
        <section className="section education" id="education">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">Academic</span>
                    <h2 className="section-title">My <span className="highlight">Education</span></h2>
                </div>
                <div className="education-card glass-card reveal">
                    <div className="education-icon">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                            <path d="M6 12v5c3 3 9 3 12 0v-5" />
                        </svg>
                    </div>
                    <div className="education-content">
                        <h3>B.Sc Computer Science</h3>
                        <p className="education-institution">Kannur University</p>
                        <span className="education-year">2025</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Education
