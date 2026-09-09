import "./Hero.css";
import { experience } from "../data/experience";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

export default function Hero() {
  return (
    <div className="hero-panel">
      <div className="hero-grain" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      <div className="hero-panel-inner">
        <div className="hero-identity">
          <div className="hero-identity-left">
            <div className="hero-badge">
              <span className="badge-dot" />
              {profile.availabilityBadge}
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="hero-name">{profile.firstName}</span>
              <br />
              {profile.title}
            </h1>
          </div>

          <div className="hero-photo-wrap">
            <img
              src={profile.photo}
              alt={profile.fullName}
              className="hero-photo"
              fetchPriority="high"
            />
          </div>
        </div>

        <p className="hero-sub">
          {profile.tagline}
        </p>

        <div className="hero-actions">
          <a href="#projects" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-ghost">
            Get In Touch
          </a>
        </div>

        <div className="hero-divider" />

        <div className="hero-about">
          <p className="hero-section-label">About Me</p>
          {profile.bios.map((bio) => (
            <p className="hero-bio" key={bio.slice(0, 32)}>
              {bio}
            </p>
          ))}

          <div className="hero-details">
            <div className="hero-detail">
              <span className="hero-detail-key">Location</span>
              <span className="hero-detail-val">{profile.location}</span>
            </div>
            <div className="hero-detail">
              <span className="hero-detail-key">Email</span>
              <span className="hero-detail-val">{profile.email}</span>
            </div>
            <div className="hero-detail">
              <span className="hero-detail-key">LinkedIn</span>
              <span className="hero-detail-val">{profile.linkedinLabel}</span>
            </div>
            <div className="hero-detail">
              <span className="hero-detail-key">Availability</span>
              <span className="hero-detail-val hero-detail-available">
                {profile.availabilityDetail}
              </span>
            </div>
          </div>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <span className="hero-stat-num">{profile.yearsLabel}</span>
            <span className="hero-stat-label">Years</span>
          </div>
          <div className="hero-strip-div" />
          <div className="hero-stat">
            <span className="hero-stat-num">{experience.length}</span>
            <span className="hero-stat-label">Companies</span>
          </div>
          <div className="hero-strip-div" />
          <div className="hero-stat">
            <span className="hero-stat-num">{projects.length}</span>
            <span className="hero-stat-label">Personal Projects</span>
          </div>
        </div>
      </div>
    </div>
  );
}
