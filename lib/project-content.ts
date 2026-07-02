import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export type ProjectStatus =
  | "Research"
  | "Prototype"
  | "Alpha"
  | "Beta"
  | "Production"
  | "Maintained"
  | "Archived";

export type ProjectTier = "Tier 1" | "Tier 2" | "Tier 3";

export type ProjectFrontmatter = {
  title: string;
  slug: string;
  summary: string;
  positioning: string;
  category: string;
  status: ProjectStatus;
  featured?: boolean;
  tier: ProjectTier;
  role: string;
  stack: string[];
  tags: string[];
  started: string;
  updated: string;
  cover: string;
  gallery?: string[];
  github?: string;
  demo?: string;
  documentation?: string;
  metrics?: { label: string; value: string; detail?: string }[];
  relatedProjects?: string[];
  relatedWriting?: string[];
};

export type ProjectEntry = ProjectFrontmatter & {
  excerpt: string;
};

const projectsDirectory = path.join(process.cwd(), "content", "projects");

export async function getAllProjects(): Promise<ProjectEntry[]> {
  const fileNames = await fs.readdir(projectsDirectory);
  const entries = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".mdx") && fileName !== "project-template.mdx")
      .map(async (fileName) => {
        const filePath = path.join(projectsDirectory, fileName);
        const source = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(source);
        const frontmatter = data as ProjectFrontmatter;

        return {
          ...frontmatter,
          excerpt: content.split("\n").find((line) => line.trim().length > 0) ?? frontmatter.summary,
        };
      }),
  );

  return entries.sort((left, right) => {
    if (left.featured !== right.featured) {
      return left.featured ? -1 : 1;
    }

    const tierOrder: Record<ProjectTier, number> = { "Tier 1": 0, "Tier 2": 1, "Tier 3": 2 };
    if (tierOrder[left.tier] !== tierOrder[right.tier]) {
      return tierOrder[left.tier] - tierOrder[right.tier];
    }

    return new Date(right.updated).getTime() - new Date(left.updated).getTime();
  });
}

export async function getProjectBySlug(slug: string) {
  const filePath = path.join(projectsDirectory, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const frontmatter = data as ProjectFrontmatter;

  const compiled = await compileMDX({
    source: content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
      parseFrontmatter: false,
    },
  });

  return {
    frontmatter,
    content: compiled.content,
    excerpt: content.split("\n").find((line) => line.trim().length > 0) ?? frontmatter.summary,
  };
}

export async function getFeaturedProjects() {
  const projects = await getAllProjects();
  return projects.filter((project) => project.featured);
}

export async function getProjectTags() {
  const projects = await getAllProjects();
  return Array.from(new Set(projects.flatMap((project) => project.tags))).sort((left, right) =>
    left.localeCompare(right),
  );
}

export function projectTagToSlug(tag: string) {
  return tag.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export async function getProjectTagFromSlug(slug: string) {
  const tags = await getProjectTags();
  return tags.find((tag) => projectTagToSlug(tag) === slug) ?? null;
}

export async function getRelatedProjects(project: Pick<ProjectFrontmatter, "slug" | "category" | "tags" | "relatedProjects">, limit = 3) {
  const projects = await getAllProjects();

  return projects
    .filter((candidate) => candidate.slug !== project.slug)
    .map((candidate) => {
      const explicitMatch = project.relatedProjects?.includes(candidate.slug) ? 3 : 0;
      const sharedCategory = candidate.category === project.category ? 2 : 0;
      const sharedTags = candidate.tags.filter((tag) => project.tags.includes(tag)).length;

      return {
        candidate,
        score: explicitMatch + sharedCategory + sharedTags,
      };
    })
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, limit)
    .map((item) => item.candidate);
}
