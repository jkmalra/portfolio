import { MetadataRoute } from "next";
import { getAllIntelligenceEntries, getIntelligenceTopics, topicToSlug } from "@/lib/intelligence";
import { getAllProjects } from "@/lib/project-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://example.com";
  const [entries, topics, projects] = await Promise.all([
    getAllIntelligenceEntries(),
    getIntelligenceTopics(),
    getAllProjects(),
  ]);

  const staticRoutes = [
    "",
    "/projects",
    "/intelligence",
    "/resume",
    "/offers",
    "/about",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const articleRoutes = entries.map((entry) => ({
    url: `${baseUrl}/intelligence/${entry.slug}`,
    lastModified: new Date(entry.updatedDate),
  }));

  const topicRoutes = topics.map((topic) => ({
    url: `${baseUrl}/intelligence/topics/${topicToSlug(topic)}`,
    lastModified: new Date(),
  }));

  const projectRoutes = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(project.updated),
  }));

  return [...staticRoutes, ...articleRoutes, ...topicRoutes, ...projectRoutes];
}
