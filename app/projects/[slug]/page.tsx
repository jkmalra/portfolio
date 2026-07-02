import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { MetricCluster } from "@/components/site/metric-cluster";
import { ProjectStatusBadge } from "@/components/site/project-status-badge";
import { ProjectTagList } from "@/components/site/project-tag-list";
import { ResourcesSection } from "@/components/site/resources-section";
import { getAllProjects, getProjectBySlug, getRelatedProjects } from "@/lib/project-content";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);

  if (!project) {
    return {};
  }

  return {
    title: `${project.frontmatter.title} | Projects`,
    description: project.frontmatter.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug).catch(() => null);

  if (!project) {
    notFound();
  }

  const relatedProjects = await getRelatedProjects(project.frontmatter);
  const resources = [
    project.frontmatter.github ? { label: "GitHub repository", href: project.frontmatter.github } : null,
    project.frontmatter.demo ? { label: "Demo / preview", href: project.frontmatter.demo } : null,
    project.frontmatter.documentation ? { label: "Documentation", href: project.frontmatter.documentation } : null,
  ].filter((item): item is { label: string; href: string } => Boolean(item));

  return (
    <div
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16"
    >
      <Reveal className="grid gap-6 xl:grid-cols-[0.82fr,1.18fr]">
        <aside className="surface-shell h-fit p-6 md:sticky md:top-24">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">
            {project.frontmatter.category}
          </p>
          <h1 className="mt-6 font-display text-4xl leading-none text-white md:text-5xl">
            {project.frontmatter.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-white/64">{project.frontmatter.positioning}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ProjectStatusBadge status={project.frontmatter.status} />
            <span className="rounded-full border border-white/10 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/52">
              {project.frontmatter.tier}
            </span>
          </div>

          <div className="mt-8 space-y-3 text-sm text-white/60">
            <p>Role: {project.frontmatter.role}</p>
            <p>Started: {project.frontmatter.started}</p>
            <p>Updated: {project.frontmatter.updated}</p>
          </div>

          <div className="mt-8">
            <ProjectTagList tags={project.frontmatter.stack} />
          </div>

          {resources.length > 0 ? (
            <div className="mt-8">
              <ResourcesSection resources={resources} />
            </div>
          ) : null}
        </aside>

        <div className="space-y-6">
          <section className="surface-shell overflow-hidden p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-azure/80">Project dossier</p>
            <h2 className="mt-6 font-display text-4xl text-white">{project.frontmatter.summary}</h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/64">
              This page is generated from one MDX file. Update the frontmatter, rewrite the Markdown below it,
              and the dossier updates automatically.
            </p>
            {project.frontmatter.metrics && project.frontmatter.metrics.length > 0 ? (
              <div className="mt-8">
                <MetricCluster metrics={project.frontmatter.metrics} />
              </div>
            ) : null}
          </section>

          <section className="surface-shell p-8">
            <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:text-white prose-p:text-white/64 prose-li:text-white/64 prose-strong:text-white prose-a:text-aurora">
              {project.content}
            </div>
          </section>

          {(relatedProjects.length > 0 || (project.frontmatter.relatedWriting?.length ?? 0) > 0) ? (
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
                  {(project.frontmatter.relatedWriting ?? []).map((href) => (
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
          ) : null}
        </div>
      </Reveal>
    </div>
  );
}
