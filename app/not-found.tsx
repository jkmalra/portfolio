import Link from "next/link";

export default function NotFound() {
  return (
    <div id="main-content" className="mx-auto flex min-h-[70vh] w-[min(900px,calc(100%-2rem))] items-center py-24">
      <div className="surface-shell w-full p-10 md:p-14">
        <p className="font-display text-xs uppercase tracking-[0.34em] text-aurora/70">404</p>
        <h1 className="mt-6 max-w-lg font-display text-5xl leading-none text-white md:text-7xl">
          This route slipped out of the operating grid.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-white/64">
          The page you requested is not active in this portfolio surface. Return to the main index
          or open the project hub to navigate from a valid entry point.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black">
            Return home
          </Link>
          <Link href="/projects" className="rounded-full border border-white/12 px-5 py-3 text-sm text-white/80">
            Open project hub
          </Link>
        </div>
      </div>
    </div>
  );
}
