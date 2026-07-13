import { Reveal } from "@/components/motion/reveal";
import { ProjectCard } from "@/components/site/project-card";
import { ProjectFilter } from "@/components/site/project-filter";
import { SectionIntro } from "@/components/site/section-intro";
import { getAllProjects } from "@/lib/project-content";

export default async function ProjectsPage() {
  const projects = await getAllProjects();
  const flagshipProjects = projects.filter((project) => project.tier === "Tier 1");
  const activeProjects = projects.filter((project) => project.tier === "Tier 2");
  const libraryCount = projects.length;

  return (
    <div
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16"
    >
      <Reveal>
        <section className="surface-shell overflow-hidden p-8 md:p-10">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">Projects</p>
          <div className="mt-8 grid gap-8 xl:grid-cols-[1.1fr,0.9fr] xl:items-end">
            <div>
              <h1 className="max-w-4xl font-display text-5xl leading-[0.92] text-white md:text-7xl">
                Proof surfaces first. Controls only when they help.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/64">
                This project index is built to surface serious work immediately. Flagship dossiers lead, active
                builds stay visible, and the full library remains searchable without overwhelming the page.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Flagship</p>
                <p className="mt-3 font-display text-3xl text-white">{flagshipProjects.length}</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Active</p>
                <p className="mt-3 font-display text-3xl text-white">{activeProjects.length}</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-black/20 p-4">
                <p className="text-xs uppercase tracking-[0.24em] text-white/40">Library</p>
                <p className="mt-3 font-display text-3xl text-white">{libraryCount}</p>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {flagshipProjects.length > 0 ? (
        <section className="mt-14 space-y-6">
          <Reveal>
            <SectionIntro
              eyebrow="Flagship dossiers"
              title="The strongest proof surfaces lead the page."
              description="These are the projects designed to carry the most weight in hiring, client credibility, and technical evaluation."
            />
          </Reveal>
          <div className="grid gap-5 xl:grid-cols-2">
            {flagshipProjects.map((project, index) => (
              <Reveal key={project.slug} delay={0.05 * index}>
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {activeProjects.length > 0 ? (
        <section className="mt-16 space-y-6">
          <Reveal>
            <SectionIntro
              eyebrow="Active projects"
              title="Current builds and operational systems."
              description="This layer shows work that is being refined, extended, or actively used as part of the broader portfolio system."
            />
          </Reveal>
          <div className="grid gap-5 lg:grid-cols-2">
            {activeProjects.map((project, index) => (
              <Reveal key={project.slug} delay={0.05 * index}>
                <ProjectCard project={project} compact />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-16 space-y-6">
        <Reveal>
          <SectionIntro
            eyebrow="Project library"
            title="The complete project index stays searchable, but secondary."
            description="Use search first. Open filters only when you want to narrow the library by domain or delivery state."
          />
        </Reveal>
        <Reveal delay={0.06}>
          <ProjectFilter projects={projects} />
        </Reveal>
      </section>
    </div>
  );
}
