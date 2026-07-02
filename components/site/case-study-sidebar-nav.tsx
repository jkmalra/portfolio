const sections = [
  { id: "overview", label: "Overview" },
  { id: "problem", label: "Problem" },
  { id: "solution", label: "Solution" },
  { id: "architecture", label: "Architecture" },
  { id: "modules", label: "Modules" },
  { id: "demo", label: "Demo" },
  { id: "results", label: "Results" },
  { id: "decisions", label: "Decisions" },
  { id: "resources", label: "Resources" },
];

export function CaseStudySidebarNav() {
  return (
    <nav className="rounded-[1.6rem] border border-white/10 bg-black/20 p-5" aria-label="Case study sections">
      <p className="text-[10px] uppercase tracking-[0.22em] text-white/34">Case study navigation</p>
      <div className="mt-4 grid gap-2">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-xl border border-white/8 px-3 py-2 text-sm text-white/60 transition hover:border-white/16 hover:text-white"
          >
            {section.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
