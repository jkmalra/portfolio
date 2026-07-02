import { getAllIntelligenceEntries } from "@/lib/intelligence";

export async function GET() {
  const entries = await getAllIntelligenceEntries();
  const baseUrl = "https://example.com";

  const rssItems = entries
    .map(
      (entry) => `
        <item>
          <title><![CDATA[${entry.title}]]></title>
          <link>${baseUrl}/intelligence/${entry.slug}</link>
          <guid>${baseUrl}/intelligence/${entry.slug}</guid>
          <pubDate>${new Date(entry.publishedDate).toUTCString()}</pubDate>
          <description><![CDATA[${entry.description}]]></description>
        </item>`,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>Jaskaran Malra Intelligence</title>
        <link>${baseUrl}/intelligence</link>
        <description>Research, writing, and thinking from the portfolio intelligence layer.</description>
        ${rssItems}
      </channel>
    </rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}
