import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { SectionIntro } from "@/components/site/section-intro";
import { resumeSummary } from "@/lib/site-data";

export default function ResumePage() {
  return (
    <div id="main-content" className="mx-auto w-[min(1320px,calc(100%-2rem))] py-12 md:w-[min(1320px,calc(100%-3rem))] md:py-16">
      <Reveal>
        <SectionIntro
          eyebrow="Resume"
          title="A hiring-facing resume surface designed for speed and clarity."
          description="This page is intentionally simplified for recruiters and hiring managers. It offers a clean summary, a readable in-browser view, a shareable route, and a downloadable PDF without pushing client offers into the same context."
        />
      </Reveal>

      <div className="mt-10 grid gap-6 xl:grid-cols-[0.72fr,1.28fr]">
        <Reveal className="surface-shell p-8">
          <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/75">Quick summary</p>
          <h2 className="mt-6 font-display text-4xl text-white">{resumeSummary.identity}</h2>
          <p className="mt-4 text-base leading-8 text-white/66">{resumeSummary.focus}</p>
          <ul className="mt-8 space-y-4 text-sm leading-7 text-white/68">
            {resumeSummary.highlights.map((item) => (
              <li key={item} className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-10 grid gap-3">
            <Link href="/resume/jas-malra-resume.pdf" className="rounded-full bg-white px-5 py-3 text-center text-sm font-semibold text-black">
              Download PDF
            </Link>
            <Link href="/resume" className="rounded-full border border-white/12 px-5 py-3 text-center text-sm text-white/80">
              Share this page
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="surface-shell p-8">
          <div className="grid gap-6 md:grid-cols-[1fr,1fr]">
            <section>
              <p className="font-display text-xs uppercase tracking-[0.34em] text-white/42">Detailed view</p>
              <h2 className="mt-6 font-display text-3xl text-white">Focus areas</h2>
              <ul className="mt-6 space-y-4 text-base leading-8 text-white/66">
                <li>AI compliance and governance-centered interface design</li>
                <li>Software development with strong information architecture and UX rigor</li>
                <li>Future technology analysis, systems writing, and technical storytelling</li>
                <li>Portfolio and product proof systems for credibility and clarity</li>
              </ul>
            </section>
            <section>
              <p className="font-display text-xs uppercase tracking-[0.34em] text-white/42">Experience pattern</p>
              <h2 className="mt-6 font-display text-3xl text-white">How I work</h2>
              <ul className="mt-6 space-y-4 text-base leading-8 text-white/66">
                <li>Translate complex technical work into structured evidence and decision-ready surfaces.</li>
                <li>Separate audiences and routes so each page has a clear job to do.</li>
                <li>Use design taste and code quality as part of the proof, not just presentation polish.</li>
                <li>Build trustworthy interfaces where compliance and future product thinking reinforce each other.</li>
              </ul>
            </section>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
