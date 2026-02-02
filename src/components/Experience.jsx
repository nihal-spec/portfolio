function Experience() {
    const experienceData = {
        title: 'MERN Stack Developer Intern',
        company: 'Futura Labs, Kerala',
        date: '2025 – Present',
        points: [
            'Developed full-stack applications using MERN stack',
            'Built responsive UIs with React & Tailwind',
            'Implemented REST APIs & JWT authentication',
            'Collaborated using Git workflows'
        ]
    }

    return (
        <section className="section experience" id="experience">
            <div className="container">
                <div className="section-header reveal">
                    <span className="section-tag">Career</span>
                    <h2 className="section-title">Work <span className="highlight">Experience</span></h2>
                </div>
                <div className="timeline">
                    <div className="timeline-item glass-card reveal">
                        <div className="timeline-marker"></div>
                        <div className="timeline-content">
                            <div className="timeline-header">
                                <h3>{experienceData.title}</h3>
                                <span className="timeline-date">{experienceData.date}</span>
                            </div>
                            <p className="timeline-company">{experienceData.company}</p>
                            <ul className="timeline-list">
                                {experienceData.points.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Experience
