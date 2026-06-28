import Link from "next/link";
import { PropsWithChildren } from "react";

type CommandLinkProps = PropsWithChildren<{
  href: string;
  meta: string;
}>;

export function CommandLink({ href, meta, children }: CommandLinkProps) {
  return (
    <Link
      href={href}
      className="group rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-azure/40 hover:bg-white/[0.06]"
    >
      <p className="text-xs uppercase tracking-[0.22em] text-white/40">{meta}</p>
      <div className="mt-10 flex items-end justify-between gap-4">
        <p className="max-w-[18ch] font-display text-2xl text-white">{children}</p>
        <span className="text-sm text-aurora transition group-hover:text-white">Open</span>
      </div>
    </Link>
  );
}
