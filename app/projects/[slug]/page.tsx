import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { CaseStudySidebarNav } from "@/components/site/case-study-sidebar-nav";
import { MetricCluster } from "@/components/site/metric-cluster";
import { ProjectStatusBadge } from "@/components/site/project-status-badge";
import { ProjectTagList } from "@/components/site/project-tag-list";
import { ResourcesSection } from "@/components/site/resources-section";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/project-content";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const relatedProjects = getRelatedProjects(project);

  return (
    <div
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16"
    >
      <Reveal className="grid gap-6 xl:grid-cols-[0.82fr,1.18fr]">
        <aside className="surface-shell h-fit p-6 md:sticky md:top-24">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">{project.category}</p>
          <h1 className="mt-6 font-display text-4xl leading-none text-white md:text-5xl">{project.title}</h1>
          <p className="mt-4 text-base leading-8 text-white/64">{project.strapline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ProjectStatusBadge status={project.status} />
            <span className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/52">
              {project.stage}
            </span>
          </div>

          <div className="mt-8 space-y-3 text-sm text-white/60">
            <p>Role: {project.role}</p>
            <p>Stage: {project.stage}</p>
            <p>Period: {project.year}</p>
            <p>Tier: {project.tier}</p>
          </div>

          <div className="mt-8">
            <ProjectTagList tags={project.stack} />
          </div>

          <div className="mt-10 grid gap-3">
            {project.links.github ? (
              <Link
                href={project.links.github}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78"
              >
                View GitHub
              </Link>
            ) : null}
            {project.links.docs ? (
              <Link
                href={project.links.docs}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78"
              >
                Open documentation
              </Link>
            ) : null}
            {project.links.live ? (
              <Link
                href={project.links.live}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78"
              >
                Live preview
              </Link>
            ) : null}
            {project.links.demo ? (
              <Link
                href={project.links.demo}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/78"
              >
                Demo / video
              </Link>
            ) : null}
          </div>

          <div className="mt-8">
            <CaseStudySidebarNav />
          </div>
        </aside>

        <div className="space-y-6">
          <section id="overview" className="surface-shell overflow-hidden p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-azure/80">Hero</p>
            <h2 className="mt-6 font-display text-4xl text-white">{project.summary}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/64">{project.executiveSummary}</p>
            <div className="mt-6 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(109,211,255,0.16),_transparent_24%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] p-8">
              <div className="grid gap-3 md:grid-cols-3">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">{project.preview.eyebrow}</p>
                  <p className="mt-3 text-sm text-white/72">{project.preview.description}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Preview title</p>
                  <p className="mt-3 text-sm text-white/72">{project.preview.title}</p>
                </div>
                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">Demo rail</p>
                  <ul className="mt-3 space-y-2 text-sm text-white/72">
                    {project.preview.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="demo" className="surface-shell p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">Interactive demo / preview</p>
            <div className="mt-6">
              <MetricCluster metrics={project.metrics} />
            </div>
          </section>

          <section className="surface-shell p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-white/48">Problem to proof</p>
            <div className="mt-8 grid gap-8">
              <article id="problem">
                <h2 className="font-display text-3xl text-white">Problem / Challenge</h2>
                <p className="mt-4 text-base leading-8 text-white/64">{project.problem}</p>
              </article>
              <article>
                <h2 className="font-display text-3xl text-white">Context</h2>
                <p className="mt-4 text-base leading-8 text-white/64">{project.context}</p>
              </article>
              <article id="solution">
                <h2 className="font-display text-3xl text-white">Solution</h2>
                <p className="mt-4 text-base leading-8 text-white/64">{project.solution}</p>
              </article>
            </div>
          </section>

          <section id="architecture" className="surface-shell p-8">
            <h2 className="font-display text-3xl text-white">Architecture</h2>
            <ul className="mt-6 space-y-4 text-base leading-8 text-white/64">
              {project.architecture.map((item) => (
                <li key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section id="modules" className="surface-shell p-8">
            <h2 className="font-display text-3xl text-white">Modules / Features</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {project.modules.map((module) => (
                <article key={module.name} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <h3 className="font-display text-2xl text-white">{module.name}</h3>
                  <p className="mt-3 text-base leading-8 text-white/64">{module.summary}</p>
                </article>
              ))}
            </div>
          </section>

          {project.trustLayer ? (
            <section className="surface-shell p-8">
              <h2 className="font-display text-3xl text-white">Compliance / Risk / Trust layer</h2>
              <ul className="mt-6 space-y-4 text-base leading-8 text-white/64">
                {project.trustLayer.map((item) => (
                  <li key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section id="results" className="grid gap-6 md:grid-cols-2">
            <article className="surface-shell p-8">
              <h2 className="font-display text-3xl text-white">Metrics / Results</h2>
              <ul className="mt-6 space-y-4 text-base leading-8 text-white/64">
                {project.results.map((item) => (
                  <li key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
            <article className="surface-shell p-8">
              <h2 className="font-display text-3xl text-white">How it works</h2>
              <ul className="mt-6 space-y-4 text-base leading-8 text-white/64">
                {project.architecture.slice(0, 3).map((item) => (
                  <li key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </section>

          <section id="decisions" className="surface-shell p-8">
            <h2 className="font-display text-3xl text-white">Decision Log</h2>
            <div className="mt-6 grid gap-4">
              {project.decisions.map((decision) => (
                <article key={decision.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                  <h3 className="font-display text-2xl text-white">{decision.title}</h3>
                  <p className="mt-3 text-base leading-8 text-white/64">{decision.summary}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="surface-shell p-8">
              <h2 className="font-display text-3xl text-white">Roadmap</h2>
              <ul className="mt-6 space-y-4 text-base leading-8 text-white/64">
                {project.roadmap.map((item) => (
                  <li key={item.title} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                    <p className="font-display text-xl text-white">{item.title}</p>
                    <p className="mt-2 text-sm uppercase tracking-[0.2em] text-white/44">{item.status}</p>
                  </li>
                ))}
              </ul>
            </article>
            <article className="surface-shell p-8">
              <h2 className="font-display text-3xl text-white">Executive Summary</h2>
              <p className="mt-6 text-base leading-8 text-white/64">{project.executiveSummary}</p>
            </article>
          </section>

          <section id="resources" className="surface-shell p-8">
            <h2 className="font-display text-3xl text-white">Resources / Links</h2>
            <div className="mt-6">
              <ResourcesSection resources={project.resources} />
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <article className="surface-shell p-8">
              <h2 className="font-display text-3xl text-white">Related Projects</h2>
              <div className="mt-6 space-y-4">
                {relatedProjects.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/projects/${entry.slug}`}
                    className="block rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-white/72 transition hover:border-aurora/30"
                  >
                    <p className="font-display text-2xl text-white">{entry.title}</p>
                    <p className="mt-3 text-sm leading-7">{entry.summary}</p>
                  </Link>
                ))}
              </div>
            </article>
            <article className="surface-shell p-8">
              <h2 className="font-display text-3xl text-white">Related Writing</h2>
              <div className="mt-6 space-y-4">
                {project.relatedWriting.map((href) => (
                  <Link
                    key={href}
                    href={href}
                    className="block rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-white/72 transition hover:border-aurora/30"
                  >
                    {href.replace("/intelligence/", "").replace(/-/g, " ")}
                  </Link>
                ))}
              </div>
            </article>
          </section>
        </div>
      </Reveal>
    </div>
  );
}
