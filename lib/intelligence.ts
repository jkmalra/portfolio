import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

export type KnowledgeConnection = {
  kind:
    | "Projects"
    | "Frameworks"
    | "Research"
    | "Case studies"
    | "Open source"
    | "Articles"
    | "Standards"
    | "Technologies";
  label: string;
  href: string;
};

export type IntelligenceFrontmatter = {
  title: string;
  slug: string;
  description: string;
  cover: string;
  readingTime: string;
  status: "Published" | "Draft" | "Archived";
  category: "Research" | "Thinking" | "Writing" | "Framework" | "Note" | "Essay" | "Opinion";
  topics: string[];
  featured?: boolean;
  pinned?: boolean;
  publishedDate: string;
  updatedDate: string;
  relatedProjects: string[];
  relatedArticles: string[];
  relatedFrameworks: string[];
  readingLevel: string;
  author: string;
  activity:
    | "Currently researching"
    | "Currently writing"
    | "Recently updated"
    | "Draft"
    | "In review"
    | "Published"
    | "Archived";
  freshness: string;
  editorialLayout: "featured" | "wide" | "compact" | "minimal" | "deep";
  pipelineCurrent?: "Idea" | "Reading" | "Writing" | "Review" | "Published" | "Applied in Project";
  knowledgeConnections?: KnowledgeConnection[];
};

export type IntelligenceEntry = IntelligenceFrontmatter & {
  excerpt: string;
};

const intelligenceDirectory = path.join(process.cwd(), "content", "intelligence");

const preferredTopicOrder = [
  "AI Compliance",
  "Governance",
  "Systems",
  "Architecture",
  "Future Technology",
  "Software Engineering",
  "Portfolio Design",
  "Research",
  "Open Source",
  "Writing",
  "Decision Making",
  "Frameworks",
];

export async function getAllIntelligenceEntries(): Promise<IntelligenceEntry[]> {
  const fileNames = await fs.readdir(intelligenceDirectory);
  const entries = await Promise.all(
    fileNames
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map(async (fileName) => {
        const filePath = path.join(intelligenceDirectory, fileName);
        const source = await fs.readFile(filePath, "utf8");
        const { data, content } = matter(source);
        const frontmatter = data as IntelligenceFrontmatter;

        return {
          ...frontmatter,
          excerpt: content.split("\n").find((line) => line.trim().length > 0) ?? frontmatter.description,
        };
      }),
  );

  return entries.sort((a, b) => {
    return new Date(b.updatedDate).getTime() - new Date(a.updatedDate).getTime();
  });
}

export async function getIntelligenceEntryBySlug(slug: string) {
  const filePath = path.join(intelligenceDirectory, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(source);
  const frontmatter = data as IntelligenceFrontmatter;

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
    excerpt: content.split("\n").find((line) => line.trim().length > 0) ?? frontmatter.description,
  };
}

export async function getFeaturedIntelligenceEntries() {
  const entries = await getAllIntelligenceEntries();
  return entries.filter((entry) => entry.featured || entry.pinned);
}

export async function getLatestIntelligenceEntries(limit = 5) {
  const entries = await getAllIntelligenceEntries();
  return entries.slice(0, limit);
}

export async function getIntelligenceTopics() {
  const entries = await getAllIntelligenceEntries();
  const topics = Array.from(new Set(entries.flatMap((entry) => entry.topics)));

  return topics.sort((left, right) => {
    const leftIndex = preferredTopicOrder.indexOf(left);
    const rightIndex = preferredTopicOrder.indexOf(right);

    if (leftIndex === -1 && rightIndex === -1) {
      return left.localeCompare(right);
    }

    if (leftIndex === -1) {
      return 1;
    }

    if (rightIndex === -1) {
      return -1;
    }

    return leftIndex - rightIndex;
  });
}

export async function getEntriesByTopic(topic: string) {
  const entries = await getAllIntelligenceEntries();
  return entries.filter((entry) => entry.topics.includes(topic));
}

export async function getRelatedIntelligenceEntries(entry: IntelligenceEntry, limit = 3) {
  const entries = await getAllIntelligenceEntries();

  return entries
    .filter((candidate) => candidate.slug !== entry.slug)
    .map((candidate) => {
      const sharedTopics = candidate.topics.filter((topic) => entry.topics.includes(topic)).length;
      const explicitlyRelated = entry.relatedArticles.includes(candidate.slug) ? 3 : 0;
      const sharedFramework = candidate.relatedFrameworks.some((framework) =>
        entry.relatedFrameworks.includes(framework),
      )
        ? 1
        : 0;

      return {
        candidate,
        score: sharedTopics + explicitlyRelated + sharedFramework,
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.candidate);
}
