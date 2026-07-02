import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { ProjectFilter } from "@/components/site/project-filter";
import { SectionIntro } from "@/components/site/section-intro";
import {
  getAllProjects,
  getProjectTagFromSlug,
  getProjectTags,
  projectTagToSlug,
} from "@/lib/project-content";

export async function generateStaticParams() {
  const tags = await getProjectTags();
  return tags.map((tag) => ({ tag: projectTagToSlug(tag) }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const projectTag = await getProjectTagFromSlug(tag);

  if (!projectTag) {
    return {};
  }

  return {
    title: `${projectTag} Projects`,
    description: `Project dossiers connected to ${projectTag}.`,
  };
}

export default async function ProjectTagPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const projectTag = await getProjectTagFromSlug(tag);

  if (!projectTag) {
    notFound();
  }

  const projects = await getAllProjects();

  return (
    <div
      id="main-content"
      className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16"
    >
      <Reveal>
        <SectionIntro
          eyebrow="Project topic"
          title={`${projectTag} across the portfolio`}
          description="This filtered view is generated from project MDX frontmatter. Add a new project file with this topic and it will appear here automatically."
        />
      </Reveal>
      <Reveal delay={0.06} className="mt-10">
        <ProjectFilter projects={projects} initialTag={projectTag} />
      </Reveal>
    </div>
  );
}
