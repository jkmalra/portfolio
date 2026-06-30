import Link from "next/link";
import { PropsWithChildren } from "react";
import { primaryNav } from "@/lib/site-data";

export function SiteChrome({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-obsidian text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(109,211,255,0.12),_transparent_26%),radial-gradient(circle_at_80%_18%,_rgba(244,182,111,0.08),_transparent_18%),linear-gradient(180deg,_#06101b_0%,_#050a13_44%,_#060b13_100%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-surface-grid bg-[size:64px_64px] opacity-[0.06] [mask-image:linear-gradient(180deg,black,transparent_88%)]" />
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#07101bcc]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-[min(1320px,calc(100%-2rem))] items-center justify-between gap-6 py-4 md:w-[min(1320px,calc(100%-3rem))]">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/15 bg-white/[0.04] font-display text-sm tracking-[0.28em] text-aurora">
              JM
            </span>
            <span className="flex flex-col">
              <span className="font-display text-sm uppercase tracking-[0.22em] text-white/70">
                Signal OS
              </span>
              <span className="text-sm text-white/90">Jas Malra</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-white/72 lg:flex">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/offers"
            className="rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-sm text-white transition hover:border-aurora/40 hover:bg-white/[0.08]"
          >
            Client engagement
          </Link>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-white/10 bg-black/20">
        <div className="mx-auto flex w-[min(1320px,calc(100%-2rem))] flex-col gap-4 py-8 text-sm text-white/60 md:w-[min(1320px,calc(100%-3rem))] md:flex-row md:items-center md:justify-between">
          <p>Future operating surface for AI compliance, software systems, and research visibility.</p>
          <div className="flex gap-4">
            <Link href="/resume" className="hover:text-white">
              Resume
            </Link>
            <Link href="/intelligence" className="hover:text-white">
              Intelligence
            </Link>
            <Link href="/offers" className="hover:text-white">
              Offers
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
