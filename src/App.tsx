import { FormEvent, useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

const heroSignals = [
  "AI compliance architecture",
  "Immersive portfolio systems",
  "Ethical product strategy",
];

const trustStats = [
  { value: "2035+", label: "Future-ready design language" },
  { value: "XR", label: "Spatial interaction mindset" },
  { value: "WCAG", label: "Accessibility-first foundation" },
];

const principles = [
  {
    title: "Ethics before hype",
    text: "Every experience highlights transparency, governance, and human trust instead of treating AI as a black box.",
  },
  {
    title: "Immersive by intent",
    text: "Motion, lighting, and layered surfaces create a futuristic atmosphere without overwhelming performance or readability.",
  },
  {
    title: "Built for decisions",
    text: "Recruiters, founders, and clients can quickly understand capabilities, project depth, and collaboration fit.",
  },
];

const filters = ["All", "Compliance", "XR", "Systems"] as const;

const projects = [
  {
    title: "SynapticWeb BCI",
    category: "XR",
    summary:
      "A speculative brain-computer interface experience that turns neural intent into adaptive interfaces for future-ready applications.",
    outcomes: [
      "Introduced immersive interaction storytelling for neuro-adaptive products",
      "Framed accessibility and ethics requirements for hands-free interfaces",
      "Created a compelling flagship case study with rich demo potential",
    ],
    tech: ["WebXR", "Three.js", "GSAP", "Ethical AI"],
  },
  {
    title: "AI Transparency Dashboard",
    category: "Compliance",
    summary:
      "A trust-building dashboard that explains AI system lineage, risk signals, model usage, and why automated recommendations appear.",
    outcomes: [
      "Turns abstract governance work into a visual narrative",
      "Supports recruiter and client confidence with explainability patterns",
      "Aligns the portfolio with compliance-forward positioning",
    ],
    tech: ["React", "D3 patterns", "Accessibility", "Governance UX"],
  },
  {
    title: "Aetheris HQNO",
    category: "Systems",
    summary:
      "A speculative orchestration platform for quantum-neural workflows, presented as a future systems architecture case study.",
    outcomes: [
      "Demonstrates systems thinking beyond front-end polish",
      "Supports consulting conversations around advanced technical direction",
      "Translates complex infrastructure ideas into digestible product storytelling",
    ],
    tech: ["Distributed systems", "Visualization", "Strategy", "Architecture"],
  },
];

const services = [
  {
    title: "AI compliance consulting",
    text: "Advisory for teams that need transparency patterns, risk-conscious UX, and stronger trust signals in AI products.",
  },
  {
    title: "Immersive product direction",
    text: "Concept and interface design for spatial, interactive, or futuristic software experiences that still need practical usability.",
  },
  {
    title: "Case-study storytelling",
    text: "Turning technical systems into compelling narratives that recruiters, clients, and investors can understand quickly.",
  },
];

const skillGroups = [
  {
    title: "Interface craft",
    items: ["Responsive architecture", "Design systems", "Motion design", "Accessibility audits"],
  },
  {
    title: "Future-facing tech",
    items: ["WebXR concepts", "3D interaction storytelling", "AI product patterns", "Speculative systems design"],
  },
  {
    title: "Trust and strategy",
    items: ["Compliance UX", "Transparency reporting", "Product consulting", "Research synthesis"],
  },
];

const timeline = [
  {
    period: "Now",
    title: "AI compliance architect and portfolio futurist",
    text: "Building a digital identity that merges immersive front-end execution with governance-centered product thinking.",
  },
  {
    period: "Next horizon",
    title: "XR and ethical AI case study builder",
    text: "Expanding portfolio work into interactive demos, explainability systems, and deep-dive technical storytelling.",
  },
  {
    period: "Long arc",
    title: "Trusted systems strategist",
    text: "Positioning for consulting and product leadership roles where clarity, safety, and innovation all matter.",
  },
];

const posts = [
  {
    title: "Designing AI transparency people can actually understand",
    meta: "Compliance UX - 6 min read",
  },
  {
    title: "What speculative interfaces teach us about present-day product quality",
    meta: "Future systems - 4 min read",
  },
  {
    title: "Why futuristic portfolios still need accessible foundations",
    meta: "Accessibility - 5 min read",
  },
];

const contactMethods = [
  {
    label: "Email",
    value: "hello@jasmalra.dev",
    href: "mailto:hello@jasmalra.dev",
  },
  {
    label: "Resume",
    value: "Download futurist CV",
    href: "/jas-malra-resume.html",
  },
  {
    label: "Availability",
    value: "Open for consulting and product strategy",
    href: "#contact",
  },
];

type Theme = "dark" | "light";

export default function App() {
  const [activeFilter, setActiveFilter] = useState<(typeof filters)[number]>("All");
  const [theme, setTheme] = useState<Theme>("dark");
  const [submitState, setSubmitState] = useState<"idle" | "sending" | "sent">("idle");
  const [statusMessage, setStatusMessage] = useState(
    "Share a few details and the site will prepare an email draft.",
  );

  const visibleProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
      return;
    }

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    setTheme(prefersLight ? "light" : "dark");
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("portfolio-theme", theme);

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
      themeMeta.setAttribute("content", theme === "dark" ? "#07111f" : "#f4efe5");
    }
  }, [theme]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const focus = String(formData.get("focus") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setStatusMessage("Please complete your name, email, and message before sending.");
      return;
    }

    setSubmitState("sending");
    setStatusMessage("Preparing your message...");

    const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject focus: ${focus || "Not specified"}\n\n${message}`,
    );

    window.setTimeout(() => {
      window.location.href = `mailto:hello@jasmalra.dev?subject=${subject}&body=${body}`;
      setSubmitState("sent");
      setStatusMessage("Your email draft is ready. Send it from your mail app and I will reply soon.");
      event.currentTarget.reset();
    }, 500);
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <div className="orb orb-a" aria-hidden="true" />
      <div className="orb orb-b" aria-hidden="true" />
      <div className="grid-haze" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#home" aria-label="Jas Malra home">
          <span className="brand-mark">JM</span>
          <span className="brand-copy">
            <strong>Jas Malra</strong>
            <span>AI Compliance Architect</span>
          </span>
        </a>

        <nav className="main-nav" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="topbar-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
          <a className="nav-cta" href="#contact">
            Book a strategy call
          </a>
        </div>
      </header>

      <main id="content">
        <section className="hero section" id="home">
          <div className="hero-copy">
            <p className="eyebrow">Speculative systems, real-world trust</p>
            <h1>
              Building the future-facing portfolio of an AI compliance
              strategist and immersive software futurist.
            </h1>
            <p className="hero-text">
              This experience translates the research direction into a bold,
              high-trust digital presence centered on ethical AI, spatial
              interfaces, and case-study storytelling.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore flagship work
              </a>
              <a className="button button-secondary" href="#about">
                See the vision
              </a>
            </div>

            <ul className="signal-list" aria-label="Core focus areas">
              {heroSignals.map((signal) => (
                <li key={signal}>{signal}</li>
              ))}
            </ul>
          </div>

          <aside className="hero-panel" aria-label="Portfolio mission panel">
            <div className="panel-chip">2035 to 2040 design brief</div>
            <h2>Designed to feel cinematic, credible, and conversion-ready.</h2>
            <p>
              The portfolio blends holographic visual language, clean
              information architecture, and trust-centered UX patterns so the
              work feels ambitious without becoming abstract.
            </p>

            <div className="stat-grid">
              {trustStats.map((stat) => (
                <article key={stat.label} className="stat-card">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </article>
              ))}
            </div>
          </aside>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">About the portfolio</p>
            <h2>A near-future interface anchored by practical UX fundamentals.</h2>
          </div>

          <div className="about-grid">
            <article className="glass-card">
              <p>
                The source research called for a portfolio that feels
                futuristic, emphasizes AI compliance expertise, and still
                supports the classic hiring journey: understand the person, scan
                the work, build trust, and make contact quickly.
              </p>
              <p>
                This build follows that direction with strong section hierarchy,
                conversion-focused calls to action, and a visual system that
                pushes beyond template-driven portfolio design.
              </p>
            </article>

            <div className="principles">
              {principles.map((principle) => (
                <article key={principle.title} className="principle-card">
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section content-section" id="projects">
          <div className="section-heading section-heading-row">
            <div>
              <p className="eyebrow">Flagship work</p>
              <h2>Case studies built for recruiters, clients, and futurists.</h2>
            </div>
            <div className="filter-row" role="tablist" aria-label="Project filters">
              {filters.map((filter) => (
                <button
                  key={filter}
                  className={`filter-pill${filter === activeFilter ? " active" : ""}`}
                  onClick={() => setActiveFilter(filter)}
                  type="button"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article key={project.title} className="project-card">
                <div className="project-topline">
                  <span>{project.category}</span>
                  <span>Flagship case study</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>

                <ul className="project-list">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>

                <div className="tag-row" aria-label={`${project.title} technologies`}>
                  {project.tech.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section content-section">
          <div className="section-heading">
            <p className="eyebrow">Services</p>
            <h2>What this portfolio now communicates as an offer.</h2>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <article key={service.title} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section content-section">
          <div className="dual-grid">
            <div>
              <div className="section-heading">
                <p className="eyebrow">Capabilities</p>
                <h2>Skills grouped around delivery, not just tools.</h2>
              </div>
              <div className="skill-groups">
                {skillGroups.map((group) => (
                  <article key={group.title} className="skill-card">
                    <h3>{group.title}</h3>
                    <ul>
                      {group.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </div>

            <div id="experience">
              <div className="section-heading">
                <p className="eyebrow">Experience arc</p>
                <h2>A timeline shaped around positioning and momentum.</h2>
              </div>
              <div className="timeline">
                {timeline.map((item) => (
                  <article key={item.title} className="timeline-card">
                    <span className="timeline-period">{item.period}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="section content-section">
          <div className="section-heading">
            <p className="eyebrow">Writing and signals</p>
            <h2>Thought leadership spaces are ready for notes, articles, and insights.</h2>
          </div>
          <div className="post-grid">
            {posts.map((post) => (
              <article key={post.title} className="post-card">
                <p className="post-meta">{post.meta}</p>
                <h3>{post.title}</h3>
                <a href="#contact">Turn this into a publishing roadmap</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section content-section contact-section" id="contact">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Turn the portfolio into a real conversation.</h2>
          </div>

          <div className="contact-grid">
            <article className="contact-panel">
              <p>
                The site now supports the main conversion goals from the research:
                contact, resume access, and a clear articulation of services.
              </p>

              <div className="contact-methods">
                {contactMethods.map((method) => (
                  <a key={method.label} className="contact-method" href={method.href}>
                    <span>{method.label}</span>
                    <strong>{method.value}</strong>
                  </a>
                ))}
              </div>
            </article>

            <form className="contact-form" onSubmit={handleSubmit}>
              <label>
                Name
                <input name="name" type="text" placeholder="Your name" autoComplete="name" />
              </label>

              <label>
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                />
              </label>

              <label>
                Project focus
                <input
                  name="focus"
                  type="text"
                  placeholder="Compliance audit, immersive product, portfolio revamp..."
                />
              </label>

              <label>
                Message
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell me what you want to build, improve, or launch."
                />
              </label>

              <div className="form-actions">
                <button className="button button-primary" type="submit" disabled={submitState === "sending"}>
                  {submitState === "sending" ? "Preparing..." : "Open email draft"}
                </button>
                <a className="button button-secondary" href="/jas-malra-resume.html" download>
                  Download resume
                </a>
              </div>

              <p className="form-status" aria-live="polite">
                {statusMessage}
              </p>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Jas Malra portfolio concept built from the provided research direction.</p>
        <a href="#home">Back to top</a>
      </footer>
    </div>
  );
}
