"use client";

import { useState } from "react";

/* ---------- inline line-icons (always load, no CDN) ---------- */

const ICONS: Record<string, string[]> = {
  code: ["m18 16 4-4-4-4", "m6 8-4 4 4 4", "m14.5 4-5 16"],
  cloud: ["M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"],
  sparkles: [
    "M9.9 15.5A2 2 0 0 0 8.5 14.1l-6.1-1.6a.5.5 0 0 1 0-1L8.5 9.9A2 2 0 0 0 9.9 8.5l1.6-6.1a.5.5 0 0 1 1 0l1.6 6.1a2 2 0 0 0 1.4 1.4l6.1 1.6a.5.5 0 0 1 0 1l-6.1 1.6a2 2 0 0 0-1.4 1.4l-1.6 6.1a.5.5 0 0 1-1 0z",
    "M20 3v4", "M22 5h-4",
  ],
  database: [
    "M3 5v14a9 3 0 0 0 18 0V5",
    "M3 12a9 3 0 0 0 18 0",
    "M12 8c4.97 0 9-1.34 9-3s-4.03-3-9-3-9 1.34-9 3 4.03 3 9 3Z",
  ],
  cpu: [
    "M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    "M9 9h6v6H9z", "M9 1v3", "M15 1v3", "M9 20v3", "M15 20v3",
    "M20 9h3", "M20 14h3", "M1 9h3", "M1 14h3",
  ],
  chat: ["M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
  bot: [
    "M12 8V4H8",
    "M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Z",
    "M2 14h2", "M20 14h2", "M15 13v2", "M9 13v2",
  ],
  terminal: ["m4 17 6-6-6-6", "M12 19h8"],
  workflow: [
    "M5 3h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z",
    "M7 11v4a2 2 0 0 0 2 2h4",
    "M15 13h4a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2Z",
  ],
  network: [
    "M18 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    "M6 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    "M18 16a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z",
    "m8.6 13.5 6.8 4", "m15.4 6.5-6.8 4",
  ],
  braces: [
    "M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5a2 2 0 0 0 2 2h1",
    "M16 21h1a2 2 0 0 0 2-2v-5a2 2 0 0 1 2-2 2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1",
  ],
  cap: [
    "M22 10 12 5 2 10l10 5 10-5Z",
    "M6 12v5c3 3 9 3 12 0v-5",
    "M22 10v6",
  ],
  calendar: [
    "M8 2v4", "M16 2v4",
    "M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z",
    "M3 10h18",
  ],
  briefcase: [
    "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
    "M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z",
  ],
  check: ["M20 6 9 17l-5-5"],
  award: [
    "m15.48 12.89 1.52 8.11-5-3-5 3 1.52-8.11",
    "M12 14a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z",
  ],
  shield: [
    "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
    "m9 12 2 2 4-4",
  ],
};

function LineIcon({ name }: { name: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {(ICONS[name] || []).map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}

/* ---------- skills data ---------- */

const DEV = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

type Skill = {
  name: string;
  logo?: string; // CDN logo
  icon?: string; // inline fallback icon
  invert?: boolean; // dark logo -> make it white
};

const skillGroups: {
  title: string;
  desc: string;
  icon: string;
  span: number;
  skills: Skill[];
}[] = [
  {
    title: "Languages",
    desc: "The languages I write and think in.",
    icon: "code",
    span: 2,
    skills: [
      { name: "Java", logo: DEV + "java/java-original.svg" },
      { name: "Python", logo: DEV + "python/python-original.svg" },
      { name: "C", logo: DEV + "c/c-original.svg" },
      { name: "JavaScript", logo: DEV + "javascript/javascript-original.svg" },
      { name: "HTML", logo: DEV + "html5/html5-original.svg" },
      { name: "CSS", logo: DEV + "css3/css3-original.svg" },
      { name: "SQL", logo: DEV + "mysql/mysql-original.svg", invert: true },
    ],
  },
  {
    title: "Cloud & DevOps",
    desc: "Ship, scale and automate infrastructure.",
    icon: "cloud",
    span: 2,
    skills: [
      { name: "AWS", logo: DEV + "amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
      { name: "Docker", logo: DEV + "docker/docker-original.svg" },
      { name: "Kubernetes", logo: DEV + "kubernetes/kubernetes-plain.svg" },
      { name: "Terraform", logo: DEV + "terraform/terraform-original.svg" },
      { name: "Jenkins", logo: DEV + "jenkins/jenkins-original.svg" },
      { name: "GitHub Actions", logo: DEV + "githubactions/githubactions-original.svg" },
      { name: "Git", logo: DEV + "git/git-original.svg" },
      { name: "GitHub", logo: DEV + "github/github-original.svg", invert: true },
    ],
  },
  {
    title: "AI / LLM",
    desc: "Building with generative AI.",
    icon: "sparkles",
    span: 2,
    skills: [
      { name: "LLM Integration", icon: "sparkles" },
      { name: "Conversational AI", icon: "chat" },
      { name: "Chatbots", icon: "bot" },
      { name: "Prompt Engineering", icon: "terminal" },
      { name: "Automation", icon: "workflow" },
    ],
  },
  {
    title: "Databases",
    desc: "Storing and querying data reliably.",
    icon: "database",
    span: 3,
    skills: [
      { name: "MySQL", logo: DEV + "mysql/mysql-original.svg", invert: true },
      { name: "Oracle SQL", logo: DEV + "oracle/oracle-original.svg" },
    ],
  },
  {
    title: "Core CS",
    desc: "Fundamentals behind every system.",
    icon: "cpu",
    span: 3,
    skills: [
      { name: "Data Structures", icon: "network" },
      { name: "Algorithms", icon: "braces" },
      { name: "Software Testing", logo: DEV + "selenium/selenium-original.svg" },
      { name: "System Reliability", icon: "shield" },
    ],
  },
];

function SkillTile({ skill }: { skill: Skill }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="skill-tile">
      <div className="skill-logo">
        {skill.logo && !failed ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={skill.logo}
            alt={skill.name}
            loading="lazy"
            className={skill.invert ? "invert" : ""}
            onError={() => setFailed(true)}
          />
        ) : (
          <LineIcon name={skill.icon || "code"} />
        )}
      </div>
      <p>{skill.name}</p>
    </div>
  );
}


const certificates = [
  {
    title: "Red Hat for AWS Foundation",
    issuer: "Red Hat",
    logo: DEV + "redhat/redhat-original.svg",
  },
  {
    title: "AWS Foundation Certificate",
    issuer: "AWS Academy",
    logo: DEV + "amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    title: "AWS Certified Developer – Associate",
    issuer: "Amazon Web Services",
    logo: DEV + "amazonwebservices/amazonwebservices-original-wordmark.svg",
  },
  {
    title: "Google Cloud Practitioner",
    issuer: "Google Cloud",
    logo: DEV + "googlecloud/googlecloud-original.svg",
  },
];

function CertCard({
  cert,
  index,
}: {
  cert: (typeof certificates)[number];
  index: number;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="cert-card">
      <div className="cert-top">
        <div className="cert-logo">
          {!failed ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cert.logo}
              alt={cert.issuer}
              loading="lazy"
              onError={() => setFailed(true)}
            />
          ) : (
            <LineIcon name="award" />
          )}
        </div>

        <span className="cert-num">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3>{cert.title}</h3>

      <div className="cert-bottom">
        <p>{cert.issuer}</p>

        <span className="cert-badge">
          <LineIcon name="award" />
          Certified
        </span>
      </div>
    </div>
  );
}

/* ---------- small organisation logo ----------
   Put a real logo in /public/logos/ and set `logo` below
   (e.g. "/logos/technical-hub.png"). Until then, a clean
   monogram badge is shown. */

function OrgLogo({ src, initials }: { src?: string; initials: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="org-logo">
      {src && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={initials} onError={() => setFailed(true)} />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
}

const aboutFacts = [
  { icon: "cap", label: "Degree", value: "B.Tech CSE" },
  { icon: "calendar", label: "Graduating", value: "2027" },
  { icon: "cloud", label: "Focus", value: "Cloud & DevOps" },
  { icon: "briefcase", label: "Looking for", value: "Internships" },
];

const experienceTech = [
  { name: "AWS", logo: DEV + "amazonwebservices/amazonwebservices-plain-wordmark.svg", invert: true },
  { name: "Docker", logo: DEV + "docker/docker-original.svg" },
  { name: "Kubernetes", logo: DEV + "kubernetes/kubernetes-plain.svg" },
  { name: "Terraform", logo: DEV + "terraform/terraform-original.svg" },
];

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio Contact - ${form.name}`
    );
    const body = encodeURIComponent(
      `Hi Brishti,\n\n${form.message}\n\nName: ${form.name}\nEmail: ${form.email}`
    );

    window.location.href = `mailto:kundu.brishtig@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <main>
      {/* ================= NAVBAR ================= */}

      <nav className="navbar">
        <div className="nav-inner">
          <a href="#home" className="brand">BRISHTI KUNDU<span>.</span>
          </a>

          <div className={`nav-links ${menu ? "show" : ""}`}>
            <a href="#home" onClick={() => setMenu(false)}>
              Home
            </a>

            <a href="#about" onClick={() => setMenu(false)}>
              About
            </a>

            <a href="#skills" onClick={() => setMenu(false)}>
              Skills
            </a>

            <a href="#projects" onClick={() => setMenu(false)}>
              Projects
            </a>

            <a href="#experience" onClick={() => setMenu(false)}>
              Experience
            </a>

            <a href="#contact" onClick={() => setMenu(false)}>
              Contact
            </a>
          </div>

          <a href="#contact" className="nav-button">
            Let&apos;s Talk →
          </a>

          <button
            className="mobile-menu"
            onClick={() => setMenu(!menu)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </nav>

      {/* ================= HERO ================= */}

      <section id="home" className="hero">
        <div className="hero-wrapper">
          {/* LEFT */}

          <div className="hero-left">
            <div className="available">
              <span></span>
              AVAILABLE FOR OPPORTUNITIES
            </div>

            <p className="intro">Hello, I&apos;m</p>

            <h1>
              BRISHTI
              <strong>KUNDU</strong>
            </h1>

            <div className="hero-role">
              Computer Science Engineering Student
            </div>

            <div className="role-line">
              <span>Software Developer</span>
              <b>•</b>
              <span>DevOps Enthusiast</span>
              <b>•</b>
              <span>AI / LLM Explorer</span>
            </div>

            <p className="hero-text">
              I build reliable software, cloud infrastructure and
              AI-powered applications. Passionate about turning ideas
              into practical technology solutions.
            </p>

            <div className="hero-actions">
              <a href="#projects" className="main-btn">
                View My Work
                <span>→</span>
              </a>

              <a href="/resume.pdf" download className="outline-btn">
                Download Resume
                <span>↓</span>
              </a>
            </div>
          </div>

          {/* RIGHT PHOTO */}

          <div className="hero-right">
            <div className="glow"></div>

            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="photo">
              <img src="/profile.jpg" alt="Brishti Kundu" />
            </div>

            {/* AWS CARD */}

            <div className="floating-card aws-card">
              <div className="card-icon">☁</div>

              <div>
                <small>FOCUS</small>
                <h3>AWS + DevOps</h3>
              </div>
            </div>

            {/* EDUCATION CARD */}

            <div className="floating-card edu-card">
              <div className="card-icon">🎓</div>

              <div>
                <small>EDUCATION</small>
                <h3>B.Tech CSE</h3>
                <p>Aditya Engineering College</p>
              </div>
            </div>

            <div className="dot-pattern"></div>

          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}

      <section id="about" className="section about">
        <div className="section-title">
          <p className="skills-eyebrow left">ABOUT ME</p>
          <h2>
            Building with
            <br />
            <em>purpose.</em>
          </h2>

          <div className="about-facts">
            {aboutFacts.map((f) => (
              <div className="fact" key={f.label}>
                <div className="fact-icon">
                  <LineIcon name={f.icon} />
                </div>
                <div>
                  <small>{f.label}</small>
                  <strong>{f.value}</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-content">
          <p>
            I am a <b>Computer Science Engineering</b> undergraduate
            passionate about software development, cloud computing,
            DevOps and Generative AI.
          </p>

          <p>
            I have hands-on experience working with <b>AWS</b>,{" "}
            <b>Docker</b>, <b>Kubernetes</b>, <b>Terraform</b> and{" "}
            <b>CI/CD pipelines</b>, while also exploring AI and
            LLM-powered applications.
          </p>

          <p>
            I enjoy solving problems, learning new technologies and
            building systems that are reliable, scalable and useful.
          </p>
        </div>
      </section>

   {/* ================= SKILLS ================= */}

      <section id="skills" className="section skills-section">
        <div className="section-title center">
          <p className="skills-eyebrow">WHAT I WORK WITH</p>
          <h2>Skills &amp; Technologies</h2>
        </div>

        <div className="skills">
          {skillGroups.map((group, i) => (
            <div
              className="skill-card"
              key={group.title}
            >
              <div className="skill-card-side">
              <div className="skill-card-head">
                <div className="skill-card-icon">
                  <LineIcon name={group.icon} />
                </div>

                <div>
                  <span className="skill-card-num">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{group.title}</h3>
                </div>

                <span className="skill-count">{group.skills.length}</span>
              </div>

              <p className="skill-card-desc">{group.desc}</p>
              </div>

              <div className="skill-grid">
                {group.skills.map((skill) => (
                  <SkillTile key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= PROJECTS ================= */}

      <section id="projects" className="section projects">
        <div className="section-title">
         <h2>
         My
       <br />
      <em>Projects.</em>
        </h2>
      </div>

        {/* PROJECT 1 */}

        <a
          href="https://github.com/brishtikundu/FoundIt"
          target="_blank"
          rel="noreferrer"
          className="project"
        >
          <div className="project-number">01</div>

          <div className="project-info">
            <p>AI + CLOUD</p>

            <h3>FoundIt</h3>

            <h4>Cloud-Based Lost &amp; Found Platform</h4>

            <p className="project-description">
              An AI-powered lost-and-found platform designed to
              intelligently match reported items and automate owner
              notifications.
            </p>

            <div className="tags">
              <span>AI</span>
              <span>Cloud</span>
              <span>Chatbot</span>
              <span>Automation</span>
            </div>

            <span className="github-project">
              View on GitHub →
            </span>
          </div>
        </a>

        {/* PROJECT 2 */}

        <a
          href="https://github.com/brishtikundu/AgentK"
          target="_blank"
          rel="noreferrer"
          className="project"
        >
          <div className="project-number">02</div>

          <div className="project-info">
            <p>GENERATIVE AI</p>

            <h3>AgentK</h3>

            <h4>Intelligent Assistant</h4>

            <p className="project-description">
              An intelligent assistant using LLM-powered features to
              answer user queries and automate tasks through
              conversational workflows.
            </p>

            <div className="tags">
              <span>LLM</span>
              <span>AI</span>
              <span>Chatbot</span>
              <span>Automation</span>
            </div>

            <span className="github-project">
              View on GitHub →
            </span>
          </div>
        </a>

        {/* PROJECT 3 */}

        <a
          href="https://github.com/brishtikundu/DevOpsGPT_Phoenix"
          target="_blank"
          rel="noreferrer"
          className="project"
        >
          <div className="project-number">03</div>

          <div className="project-info">
            <p>AI + DEVOPS</p>

            <h3>DevOpsGPT Phoenix</h3>

            <h4>AI-Powered Self-Healing System</h4>

            <p className="project-description">
              An AI-based DevOps platform for infrastructure monitoring
              and automated recovery using AWS and self-healing
              workflows.
            </p>

            <div className="tags">
              <span>AWS</span>
              <span>DevOps</span>
              <span>AI</span>
              <span>Automation</span>
            </div>

            <span className="github-project">
              View on GitHub →
            </span>
          </div>
        </a>
      </section>

      {/* ================= EXPERIENCE ================= */}

      <section id="experience" className="section experience">
        <div className="section-title center">
          <p className="skills-eyebrow">EXPERIENCE</p>
          <h2>My journey.</h2>
        </div>

        <div className="timeline">
          <div className="timeline-dot"></div>

          <div className="exp-card">
            <div className="exp-head">
              <OrgLogo initials="TH" /* src="/logos/technical-hub.png" */ />

              <div className="exp-title">
                <h3>AWS &amp; DevOps Trainee</h3>
                <h4>Technical Hub Pvt Ltd.</h4>
              </div>

              <div className="exp-date">MAY 2025 — JUNE 2026</div>
            </div>

            <ul className="exp-list">
              {[
                "Hands-on training in AWS cloud services and DevOps practices.",
                "Worked with Docker, Kubernetes and Terraform for deployment and infrastructure automation.",
                "Built automation scripts for build, deployment and monitoring workflows.",
              ].map((t) => (
                <li key={t}>
                  <span className="tick">
                    <LineIcon name="check" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>

            <div className="exp-tech">
              {experienceTech.map((t) => (
                <div className="tech-chip" key={t.name}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.logo}
                    alt={t.name}
                    className={t.invert ? "invert" : ""}
                  />
                  {t.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= EDUCATION ================= */}

      <section id="education" className="section education">
        <div className="section-title">
          <p className="skills-eyebrow left">EDUCATION</p>
          <h2>
            Academic
            <br />
            <em>background.</em>
          </h2>
        </div>

        <div className="edu-box">
          <div className="edu-head">
            <OrgLogo initials="AEC" /* src="/logos/aditya-engineering-college.png" */ />

            <div>
              <h4>Aditya Engineering College</h4>
              <span className="edu-status">
                <span className="live-dot"></span>
                Currently pursuing
              </span>
            </div>
          </div>

          <h3>Bachelor of Technology</h3>

          <p className="edu-branch">Computer Science &amp; Engineering</p>

          <div className="edu-meta">
            <div>
              <LineIcon name="calendar" />
              2023 — 2027
            </div>

            <div>
              <LineIcon name="cap" />
              B.Tech · CSE
            </div>
          </div>
        </div>
      </section>

      {/* ================= CERTIFICATES ================= */}

      <section id="certificates" className="section certifications">
        <div className="section-title center">
          <h2>Certificates.</h2>
        </div>

        <div className="cert-grid">
          {certificates.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} />
          ))}
        </div>
      </section>

      {/* ================= CONTACT ================= */}

      <section id="contact" className="contact">
        <div className="contact-inner">
          <p className="contact-eyebrow">GET IN TOUCH</p>

          <h2>
            Let&apos;s build
            <br />
            <em>something great.</em>
          </h2>

          <div className="contact-card">
            {/* LEFT: INFO + LINKS */}

            <div className="contact-info">
              <h3>Connect with me</h3>

              <p>
                I am actively seeking internships, collaborative
                projects, and software engineering opportunities to
                build modern, highly-efficient and scalable
                applications.
              </p>

              <div className="contact-pills">
                <a
                  href="mailto:kundu.brishtig@gmail.com"
                  className="pill pill-email"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7.2L4.6 7 4 8.3l8 5.6 8-5.6-.6-1.3L12 12.2Z" />
                  </svg>
                  Email
                </a>

                <a
                  href="https://www.linkedin.com/in/brishti-kundu-103928290/"
                  target="_blank"
                  rel="noreferrer"
                  className="pill pill-linkedin"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.05c.55-1 1.9-1.95 3.9-1.95 4.1 0 4.75 2.55 4.75 5.85V21h-4v-5.1c0-1.2 0-2.8-1.75-2.8s-2 1.35-2 2.7V21h-4V9.75Z" />
                  </svg>
                  LinkedIn
                </a>

                <a
                  href="https://github.com/brishtikundu"
                  target="_blank"
                  rel="noreferrer"
                  className="pill pill-github"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.9 1.52 2.34 1.08 2.9.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.9-1.29 2.74-1.02 2.74-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
                  GitHub
                </a>

              </div>
            </div>

            {/* RIGHT: FORM */}

            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                required
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />

              <input
                type="email"
                placeholder="Your Email"
                required
                value={form.email}
                onChange={(e) =>
                  setForm({ ...form, email: e.target.value })
                }
              />

              <textarea
                placeholder="How can we collaborate?"
                rows={5}
                required
                value={form.message}
                onChange={(e) =>
                  setForm({ ...form, message: e.target.value })
                }
              />

              <button type="submit" className="contact-button">
                Send Direct Message
                <span>↗</span>
              </button>

              {sent && (
                <p className="form-note">
                  Your email app should open with the message ready
                  to send.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}

      <footer>
        <span>© {new Date().getFullYear()} BRISHTI KUNDU</span>

        <span>BUILT WITH NEXT.JS</span>
      </footer>
    </main>
  );
}