import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { CommandLink } from "@/components/site/command-link";
import { MetricCluster } from "@/components/site/metric-cluster";
import { ProjectCard } from "@/components/site/project-card";
import { SectionIntro } from "@/components/site/section-intro";
import { getFeaturedIntelligenceEntries, getLatestIntelligenceEntries } from "@/lib/intelligence";
import { getAllProjects } from "@/lib/project-content";
import { featuredSignals, proofPoints, resumeSummary } from "@/lib/site-data";

export default async function HomePage() {
  const projects = getAllProjects().slice(0, 3);
  const [featuredEntries, latestEntries] = await Promise.all([
    getFeaturedIntelligenceEntries(),
    getLatestIntelligenceEntries(5),
  ]);

  return (
    <div id="main-content">
      <section className="mx-auto grid w-[min(1320px,calc(100%-2rem))] gap-6 py-10 md:w-[min(1320px,calc(100%-3rem))] lg:grid-cols-[1.25fr,0.75fr] lg:py-16">
        <Reveal className="surface-shell overflow-hidden p-8 md:p-10">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">Future operating surface</p>
          <h1 className="mt-8 max-w-4xl font-display text-5xl leading-[0.9] text-white md:text-7xl xl:text-[5.75rem]">
            A premium proof system for AI compliance, software depth, and future technology thinking.
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-white/68">
            This is not a generic portfolio landing page. It is a routed interface designed to help
            hiring teams, clients, and technical peers evaluate serious work through dedicated
            proof surfaces.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
              Enter project hub
            </Link>
            <Link href="/intelligence" className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/82">
              Open intelligence layer
            </Link>
          </div>
          <div className="mt-12 flex flex-wrap gap-2">
            {featuredSignals.map((signal) => (
              <span key={signal} className="rounded-full border border-white/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-white/58">
                {signal}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-6">
          <div className="surface-shell p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Interface routing</p>
            <div className="mt-8 grid gap-3">
              <CommandLink href="/projects" meta="Proof index">
                Project dossiers
              </CommandLink>
              <CommandLink href="/resume" meta="Hiring surface">
                Resume and summary
              </CommandLink>
              <CommandLink href="/intelligence" meta="Publishing system">
                Research, writing, and thinking
              </CommandLink>
              <CommandLink href="/offers" meta="Separate client track">
                Offers and booking
              </CommandLink>
            </div>
          </div>
          <div className="surface-shell p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-white/42">Latest signal</p>
            <h2 className="mt-6 font-display text-3xl text-white">{featuredEntries[0]?.title}</h2>
            <p className="mt-3 text-sm leading-7 text-white/62">{featuredEntries[0]?.description}</p>
            <Link href={`/intelligence/${featuredEntries[0]?.slug}`} className="mt-8 inline-flex text-sm text-aurora">
              Read featured piece
            </Link>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))]">
        <Reveal>
          <SectionIntro
            eyebrow="Trust layer"
            title="Command-surface clarity instead of a noisy all-in-one page."
            description="The homepage acts as a routing console. It previews the strongest proof and moves each audience into the right environment without mixing job-facing, intelligence, and client conversion content together."
          />
        </Reveal>
        <Reveal delay={0.06} className="mt-10">
          <MetricCluster metrics={proofPoints} />
        </Reveal>
      </section>

      <section className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))]">
        <Reveal>
          <SectionIntro
            eyebrow="Featured projects"
            title="Project proof that feels like product evidence, not thumbnails."
            description="Each major build opens into a dedicated dossier page with challenge, context, build logic, results, proof artifacts, and direct links to code and research."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={0.05 * index}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-[min(1320px,calc(100%-2rem))] gap-6 py-12 md:w-[min(1320px,calc(100%-3rem))] lg:grid-cols-[0.85fr,1.15fr]">
        <Reveal className="surface-shell p-8">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-ember/80">Resume preview</p>
          <h2 className="mt-6 font-display text-4xl text-white">{resumeSummary.identity}</h2>
          <p className="mt-4 text-base leading-8 text-white/64">{resumeSummary.focus}</p>
          <ul className="mt-8 space-y-4 text-sm leading-7 text-white/68">
            {resumeSummary.highlights.map((item) => (
              <li key={item} className="rounded-2xl border border-white/10 bg-black/20 p-4">
                {item}
              </li>
            ))}
          </ul>
          <Link href="/resume" className="mt-8 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
            Open resume surface
          </Link>
        </Reveal>

        <Reveal delay={0.08} className="grid gap-6">
          <div className="surface-shell p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-azure/80">Research signal</p>
            <h2 className="mt-6 font-display text-4xl text-white">One intelligence layer for frameworks, essays, and clear thinking.</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {featuredEntries.slice(0, 2).map((entry) => (
                <Link key={entry.slug} href={`/intelligence/${entry.slug}`} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5 transition hover:border-azure/30">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/40">{entry.category}</p>
                  <h3 className="mt-4 font-display text-2xl text-white">{entry.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">{entry.description}</p>
                </Link>
              ))}
            </div>
          </div>

          <div className="surface-shell p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/80">Latest intelligence</p>
            <div className="mt-6 space-y-4">
              {latestEntries.slice(0, 2).map((entry) => (
                <Link key={entry.slug} href={`/intelligence/${entry.slug}`} className="flex items-start justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-black/20 p-4 transition hover:border-aurora/30">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/40">{entry.category}</p>
                    <h3 className="mt-3 font-display text-xl text-white">{entry.title}</h3>
                  </div>
                  <span className="text-sm text-white/40">{entry.readingTime}</span>
                </Link>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
