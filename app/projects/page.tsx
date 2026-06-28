import { Reveal } from "@/components/motion/reveal";
import { ProjectFilter } from "@/components/site/project-filter";
import { SectionIntro } from "@/components/site/section-intro";
import { projects } from "@/lib/site-data";

export default function ProjectsPage() {
  return (
    <div id="main-content" className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16">
      <Reveal>
        <SectionIntro
          eyebrow="Projects hub"
          title="A project index built like a future proof console."
          description="All work lives here as a navigable index. Open any dossier for the full narrative, metrics, interactive proof area, and links to code, live demos, and supporting research."
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10">
        <ProjectFilter projects={projects} />
      </Reveal>
    </div>
  );
}
