import { GraduationCap } from "lucide-react";
import { education, experience } from "../data/portfolio.js";

export default function Experience() {
  return (
    <section className="section experience" id="experience" aria-labelledby="experience-title">
      <div className="shell">
        <header className="section-head" data-reveal>
          <p className="eyebrow mono">
            <span className="accent">04</span> / Experience
          </p>
          <h2 id="experience-title" className="section-title">
            Still early. <em className="serif">Already moving.</em>
          </h2>
        </header>

        <ol className="timeline">
          {experience.map((job) => (
            <li key={job.id} className={`job ${job.current ? "is-current" : ""}`} data-reveal>
              <div className="job-when mono">
                <span>{job.period}</span>
                <span className="muted">{job.location}</span>
              </div>
              <div className="job-what">
                <h3>
                  {job.role} <span className="muted">at</span> <span className="job-company">{job.company}</span>
                  {job.current && (
                    <span className="now-badge mono">
                      <span className="pulse" aria-hidden="true" /> Now
                    </span>
                  )}
                </h3>
                <ul>
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
          <li className="job job-edu" data-reveal>
            <div className="job-when mono">
              <span>{education.year}</span>
              <span className="muted">{education.location}</span>
            </div>
            <div className="job-what">
              <h3>
                <GraduationCap size={20} className="accent" aria-hidden="true" /> {education.degree}{" "}
                <span className="muted">at</span> <span className="job-company">{education.school}</span>
              </h3>
            </div>
          </li>
        </ol>
      </div>
    </section>
  );
}
