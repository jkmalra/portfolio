import { Reveal } from "@/components/motion/reveal";
import { ProjectFilter } from "@/components/site/project-filter";
import { getAllProjects } from "@/lib/project-content";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16"
    >
      <Reveal>
        <section className="py-2">
          <p className="text-xs uppercase tracking-[0.26em] text-white/42">Projects</p>
          <h1 className="mt-5 font-display text-4xl text-white md:text-6xl">Projects</h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-white/62">
            A collection of software, AI compliance, research, and experimental systems.
          </p>
        </section>
      </Reveal>
      <section className="mt-8">
        <Reveal delay={0.04}>
          <ProjectFilter projects={projects} />
        </Reveal>
      </section>
    </div>
  );
}
