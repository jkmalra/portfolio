import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/reveal";
import { blogEntries } from "@/lib/site-data";

export function generateStaticParams() {
  return blogEntries.map((entry) => ({ slug: entry.slug }));
}

export default async function BlogEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = blogEntries.find((item) => item.slug === slug);

  if (!entry) {
    notFound();
  }

  return (
    <div id="main-content" className="mx-auto w-[min(980px,calc(100%-2rem))] py-12 md:py-16">
      <Reveal className="surface-shell p-8 md:p-12">
        <p className="font-display text-xs uppercase tracking-[0.34em] text-azure/80">
          {entry.category} · {entry.topic} · {entry.readTime}
        </p>
        <h1 className="mt-6 font-display text-5xl leading-[0.95] text-white md:text-6xl">{entry.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">{entry.summary}</p>
        <div className="mt-10 space-y-6 text-base leading-8 text-white/72">
          {entry.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
