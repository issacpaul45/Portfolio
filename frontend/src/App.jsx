import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowDownRight, ArrowUpRight, Code2, Download, Bot, Database,
  Github, GraduationCap, Layers3, Linkedin, Mail, MapPin, Menu, Moon, Server,
  Sun, Workflow, X,
} from 'lucide-react'

const fallback = {
  projects: [
    {
      title: 'Route & Fuel Optimization API',
      summary: 'A route-aware API that finds practical fuel stops using fuel prices, vehicle range, efficiency, and journey distance.',
      details: [
        'Connected geocoding and routing services with geospatial processing to discover fuel stations along a route.',
        'Added caching, optimization logic, and structured error handling to keep route requests predictable.',
        'Containerized the service with PostgreSQL for a repeatable development setup.',
      ],
      stack: ['Django REST Framework', 'PostgreSQL', 'Geoapify', 'Shapely', 'Docker'], featured: true,
    },
    {
      title: 'College Management System',
      summary: 'A Django platform for academic records and course scheduling, with role-aware access for students, faculty, and administrators.',
      details: [
        'Designed REST endpoints for academic data, schedules, and student records.',
        'Implemented authentication and role-based access control across user types.',
        'Integrated Razorpay in demo mode as a payment proof of concept.',
      ],
      stack: ['Django', 'SQLite', 'REST APIs', 'Razorpay'], featured: true,
    },
    {
      title: 'LLM Chatbot',
      summary: 'A Python conversational assistant using the OpenAI API and multi-turn conversation history.',
      details: [
        'Maintained conversation context across turns for more coherent responses.',
        'Kept API credentials in environment variables and handled API errors explicitly.',
      ],
      stack: ['Python', 'OpenAI API', 'Conversation state'], featured: false,
    },
  ],
  experience: [
    {
      company: 'Indapp', role: 'Software Engineer Level 1', period: 'October 2025 — Present', location: 'India',
      highlights: [
        'Build and maintain production Django and PostgreSQL services for an application serving thousands of users.',
        'Design JWT-authenticated APIs with role-based access control, and build background workflows with Celery and RabbitMQ.',
        'Improve API and database performance, diagnose production issues, and ship preventive fixes.',
        'Containerize Django, worker, and database services; integrate AWS S3, SQS FIFO, and IAM.',
      ],
    },
    {
      company: 'Quest Innovative Solutions', role: 'Junior Software Engineer', period: 'March 2024 — April 2025', location: 'Kochi, Kerala',
      highlights: [
        'Developed full-stack applications with Django, Angular, Python, and REST APIs.',
        'Mentored interns in web development fundamentals and collaborated across teams to deliver software.',
      ],
    },
  ],
}

const skillGroups = [
  { icon: Server, label: 'Backend', items: ['Python', 'Django', 'Django REST Framework', 'Flask', 'REST APIs', 'JWT & RBAC'] },
  { icon: Database, label: 'Data & queues', items: ['PostgreSQL', 'MySQL', 'SQLite', 'Celery', 'RabbitMQ', 'Background jobs'] },
  { icon: Layers3, label: 'Cloud & delivery', items: ['Docker', 'AWS S3', 'AWS SQS', 'Git & GitHub', 'Linux', 'Production debugging'] },
]
const projectIcons = [MapPin, GraduationCap, Bot]

function SectionLabel({ number, children }) {
  return <div className="section-label"><span>{number}</span><span>{children}</span><i /></div>
}

function FlowDiagram() {
  return (
    <div className="system-card" aria-label="Illustration of a backend request flowing through an API, queue and worker">
      <div className="system-card-top"><span className="eyebrow">SYSTEMS I WORK ON</span><span className="live-dot" /> <span className="mono tiny">REQUEST FLOW</span></div>
      <div className="flow-line"><div className="flow-node client"><Code2 size={16} /><span>Client</span></div><span className="flow-arrow">→</span><div className="flow-node api"><Server size={16} /><span>REST API</span></div><span className="flow-arrow">→</span><div className="flow-node queue"><Workflow size={16} /><span>Queue</span></div></div>
      <div className="flow-branch"><span className="branch-line" /><span>background work</span><span className="branch-line" /></div>
      <div className="flow-worker"><div className="worker-box"><Layers3 size={15} /><span>Celery worker</span></div><div className="db-box"><Database size={15} /><span>PostgreSQL</span></div></div>
      <div className="system-card-foot"><span className="mono">DJANGO · CELERY · POSTGRES</span><span className="status-pill"><span /> BUILT FOR PRODUCTION</span></div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const ProjectIcon = projectIcons[index] || Code2
  return (
    <article className={`project-card ${index === 0 ? 'project-featured' : ''}`}>
      <div className="project-card-head"><div className="project-card-label"><span className="project-number">0{index + 1} / PROJECT</span><ProjectIcon className="project-card-icon" size={16} strokeWidth={1.7} /></div><span className={`project-flag ${project.featured ? 'is-featured' : ''}`}>{project.featured ? 'FEATURED' : 'BUILD'}</span></div>
      <h3>{project.title}</h3>
      <p className="project-summary">{project.summary}</p>
      <ul className="project-details">{project.details.map((item) => <li key={item}>{item}</li>)}</ul>
      <div className="tag-list">{project.stack.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
    </article>
  )
}

function App() {
  const year = new Date().getFullYear()
  const [content, setContent] = useState(fallback)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') || 'dark'
    } catch {
      return 'dark'
    }
  })

  useEffect(() => {
    fetch('/api/portfolio/')
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setContent({ projects: data.projects, experience: data.experience }))
      .catch(() => {})
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('portfolio-theme', theme)
    } catch {
      // The theme still works for this session when storage is unavailable.
    }
  }, [theme])

  useEffect(() => {
    const targets = document.querySelectorAll(
      '.section-label, .section-heading-row, .project-card, .about-lead, .timeline-item, .education-row, .skill-card, .contact-copy, .contact-form',
    )
    targets.forEach((target) => target.classList.add('reveal'))

    if (!('IntersectionObserver' in window)) {
      targets.forEach((target) => target.classList.add('is-visible'))
      return
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -32px 0px' })

    targets.forEach((target) => observer.observe(target))
    return () => observer.disconnect()
  }, [content])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="wordmark" href="#home" onClick={closeMenu} aria-label="Issac Paul home"><span className="wordmark-mark">ip<span>.</span></span><span className="wordmark-name">ISSAC PAUL</span></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-open' : ''}>
          <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#stack" onClick={closeMenu}>Stack</a><a className="nav-resume" href="/issac-paul-resume.pdf" download="Issac-Paul-Resume.pdf" onClick={closeMenu}>Resume <Download size={14} /></a>
          <button className="theme-toggle" type="button" role="switch" aria-checked={theme === 'light'} aria-label="Light theme" title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}><span className="theme-switch-track" aria-hidden="true"><span className="theme-switch-thumb">{theme === 'dark' ? <Moon size={11} /> : <Sun size={11} />}</span></span><span className="theme-toggle-label">{theme === 'dark' ? 'Dark' : 'Light'}</span></button>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let’s talk <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <main id="main">
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="availability-dot" /> SOFTWARE ENGINEER <span className="availability-divider">/</span> ERNAKULAM, INDIA</div>
            <h1>Thoughtful<br />backend. <span>Real-world</span><br /><span className="accent-word">impact.</span></h1>
            <p className="hero-description">I’m Issac, a backend-focused software engineer building dependable APIs, asynchronous workflows, and production systems with Python and Django.</p>
            <div className="hero-actions"><a className="button button-primary" href="#work">Explore my work <ArrowDownRight size={17} /></a><a className="button button-quiet" href="mailto:issacpaul45@gmail.com">Get in touch <ArrowUpRight size={16} /></a></div>
            <div className="hero-note"><span className="note-rule" />Currently building at <strong>Indapp</strong><span className="note-separator">·</span> designing for thousands of users</div>
          </div>
          <div className="hero-visual"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="visual-glow" /><div className="visual-index mono">FIG. 01 — THE REQUEST PATH</div><FlowDiagram /><div className="visual-coordinate mono">9.96° N&nbsp; 76.34° E</div></div>
          <a href="#work" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
        </section>

        <section className="work-section section-wrap" id="work">
          <SectionLabel number="01">SELECTED WORK</SectionLabel>
          <div className="section-heading-row"><h2>Projects built to<br /><span>solve real problems.</span></h2><p>A few systems I’ve designed and shipped, from route optimization to practical AI tools.</p></div>
          <div className="project-grid">{content.projects.map((project, index) => <ProjectCard key={project.id || project.title} project={project} index={index} />)}</div>
        </section>

        <section className="about-section" id="about">
          <div className="about-inner section-wrap">
            <SectionLabel number="02">A LITTLE ABOUT ME</SectionLabel>
            <div className="about-grid"><div className="about-lead"><h2>Make it work.<br /><span>Make it reliable.</span><br />Make it clear.</h2><p>Good backend work is often invisible. It’s the API that stays predictable, the queue that absorbs a spike, and the careful fix that keeps a production issue from coming back.</p><div className="about-links"><a className="text-link" href="https://github.com/issacpaul45" target="_blank" rel="noreferrer">More on GitHub <ArrowUpRight size={15} /></a><a className="text-link" href="/issac-paul-resume.pdf" download="Issac-Paul-Resume.pdf">Download resume <Download size={15} /></a></div></div>
              <div className="timeline"><div className="timeline-heading"><span>EXPERIENCE</span><span className="mono">2024 — NOW</span></div>{content.experience.map((job, index) => <article className="timeline-item" key={job.id || job.company}><div className="timeline-marker"><span className={index === 0 ? 'marker-current' : ''} /></div><div className="timeline-content"><div className="timeline-meta"><span>{job.period}</span><span>{job.location}</span></div><h3>{job.role}</h3><div className="company-name">{job.company}</div><ul>{job.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></div></article>)}<div className="education-row"><div className="education-icon"><GraduationCap size={16} /></div><div><span className="mono education-period">2023 · KOCHI, INDIA</span><h3>B.Tech, Computer Science Engineering</h3><p>TOC H Institute of Science and Technology · APJ Abdul Kalam Technological University</p></div></div></div>
            </div>
          </div>
        </section>

        <section className="stack-section section-wrap" id="stack">
          <SectionLabel number="03">TOOLS OF THE TRADE</SectionLabel>
          <div className="section-heading-row stack-heading"><h2>A stack for<br /><span>shipping with care.</span></h2><p>My day-to-day toolkit for building, connecting, and operating backend systems.</p></div>
          <div className="skills-grid">{skillGroups.map(({ icon: Icon, label, items }, i) => <article className="skill-card" key={label}><div className="skill-card-top"><div className="skill-icon"><Icon size={18} /></div><span className="mono">0{i + 1}</span></div><h3>{label}</h3><div className="skill-items">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
          <div className="stack-footnote"><span className="stack-footnote-line" />Always learning, always sharpening the fundamentals.</div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner section-wrap"><SectionLabel number="04">GET IN TOUCH</SectionLabel><div className="contact-grid contact-grid-simple"><div className="contact-copy"><span className="eyebrow">HAVE A PROJECT IN MIND?</span><h2>Let’s build<br />something <span>solid.</span></h2><p>Have a backend challenge, a role, or an interesting idea? I’d like to hear about it.</p><a className="button button-primary contact-email" href="mailto:issacpaul45@gmail.com"><Mail size={17} /> Email me <ArrowUpRight size={15} /></a><div className="social-links"><a className="social-link" href="https://github.com/issacpaul45" target="_blank" rel="noreferrer"><Github size={17} /> GitHub <ArrowUpRight size={14} /></a><a className="social-link" href="https://www.linkedin.com/in/issac-paul-a85869190/" target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={14} /></a></div></div></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="section-wrap footer-inner"><a className="wordmark footer-wordmark" href="#home"><span className="wordmark-mark">ip<span>.</span></span></a><span>© {year} Issac Paul · Backend Developer · Ernakulam</span><a href="#home" className="back-top">BACK TO TOP <ArrowUpRight size={13} /></a></div></footer>
    </>
  )
}

export default App
