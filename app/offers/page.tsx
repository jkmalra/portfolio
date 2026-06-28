import Link from "next/link";
import { servicePackages } from "@/lib/site-data";

export default function OffersPage() {
  return (
    <div id="main-content" className="mx-auto w-[min(1180px,calc(100%-2rem))] py-12 md:w-[min(1180px,calc(100%-3rem))] md:py-16">
      <section className="rounded-[2.25rem] border border-white/12 bg-[#0b121bcc] p-8 shadow-surface md:p-12">
        <p className="font-display text-xs uppercase tracking-[0.34em] text-ember/80">Client engagement</p>
        <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[0.94] text-white md:text-6xl">
          A separate engagement page for serious client work.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/66">
          This route is intentionally distinct from the main portfolio showcase. It is designed for
          inquiry, scope clarity, process visibility, and high-trust conversion without taking over
          the identity of the main site.
        </p>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.08fr,0.92fr]">
        <div className="space-y-6">
          <div className="surface-shell p-8">
            <p className="font-display text-xs uppercase tracking-[0.34em] text-white/42">Service packages</p>
            <div className="mt-8 grid gap-4">
              {servicePackages.map((pkg) => (
                <article key={pkg.name} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <h2 className="font-display text-2xl text-white">{pkg.name}</h2>
                      <p className="mt-3 max-w-xl text-sm leading-7 text-white/64">{pkg.summary}</p>
                    </div>
                    <p className="text-sm text-ember">{pkg.range}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="surface-shell p-8">
            <h2 className="font-display text-3xl text-white">Who this is for</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/66">
                Founders and product teams shipping AI features that need better trust, explainability, and governance surfaces.
              </div>
              <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/66">
                Researchers, engineers, and operators who need future-facing technical work turned into credible narrative proof.
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="surface-shell p-8">
            <h2 className="font-display text-3xl text-white">Process</h2>
            <ol className="mt-6 space-y-4 text-sm leading-7 text-white/66">
              <li className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">1. Clarify the problem, stakes, and audience.</li>
              <li className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">2. Audit the current product or proof surface.</li>
              <li className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">3. Design the trust, narrative, and interface architecture.</li>
              <li className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">4. Deliver a routed, usable, and credible engagement outcome.</li>
            </ol>
          </div>

          <form className="surface-shell space-y-4 p-8" action="mailto:hello@jasmalra.dev" method="post" encType="text/plain">
            <h2 className="font-display text-3xl text-white">Booking and inquiry</h2>
            <p className="text-sm leading-7 text-white/64">Send a direct inquiry with your scope, timeline, and current situation.</p>
            <label className="block">
              <span className="mb-2 block text-sm text-white/72">Name</span>
              <input name="name" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-white/72">Email</span>
              <input name="email" type="email" className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none" />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-white/72">What do you need help with?</span>
              <textarea name="message" rows={5} className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none" />
            </label>
            <button type="submit" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
              Open inquiry draft
            </button>
            <p className="text-xs leading-6 text-white/42">
              This route uses a transparent email-based contact flow. No hidden automation or opaque lead capture.
            </p>
          </form>
        </div>
      </section>

      <div className="mt-8">
        <Link href="/" className="text-sm text-white/56 hover:text-white">
          Return to showcase index
        </Link>
      </div>
    </div>
  );
}
