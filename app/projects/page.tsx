import { Reveal } from "@/components/motion/reveal";
import { ProjectFilter } from "@/components/site/project-filter";
import { SectionIntro } from "@/components/site/section-intro";
import { getAllProjects } from "@/lib/project-content";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div id="main-content" className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16">
      <Reveal>
        <SectionIntro
          eyebrow="Projects"
          title="A curated index of proof surfaces, not a wall of portfolio thumbnails."
          description="This section is organized as a serious project library. Flagship dossiers lead, active supporting work follows, and smaller experiments stay present without competing for equal weight."
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10">
        <ProjectFilter projects={projects} />
      </Reveal>
    </div>
  );
}
