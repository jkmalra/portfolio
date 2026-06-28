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

export default function App() {
  return (
    <div className="site-shell">
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

        <a className="nav-cta" href="#contact">
          Book a strategy call
        </a>
      </header>

      <main>
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
      </main>
    </div>
  );
}
