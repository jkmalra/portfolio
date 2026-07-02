import Link from "next/link";
import { KnowledgeConnection } from "@/lib/intelligence";

type ConnectedKnowledgeGraphProps = {
  connections: KnowledgeConnection[];
  compact?: boolean;
  stopPropagation?: boolean;
};

export function ConnectedKnowledgeGraph({
  connections,
  compact = false,
  stopPropagation = false,
}: ConnectedKnowledgeGraphProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs uppercase tracking-[0.24em] text-white/42">Connected knowledge</p>
      <div className="space-y-0">
        {connections.map((connection, index) => (
          <div key={`${connection.kind}-${connection.label}`} className="relative pl-8">
            {index !== connections.length - 1 ? (
              <span className="absolute left-[11px] top-6 h-[calc(100%+0.75rem)] w-px bg-gradient-to-b from-white/18 via-white/10 to-transparent" />
            ) : null}
            <span className="absolute left-0 top-2.5 flex h-6 w-6 items-center justify-center">
              <span className="h-2.5 w-2.5 rounded-full border border-aurora/50 bg-aurora/25 transition duration-300 motion-safe:animate-pulse" />
            </span>
            <Link
              href={connection.href}
              onClick={stopPropagation ? (event) => event.stopPropagation() : undefined}
              className={`group block rounded-[1.35rem] border border-white/10 bg-black/20 transition duration-300 hover:border-aurora/35 hover:bg-white/[0.05] ${
                compact ? "px-4 py-3" : "px-4 py-4"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.2em] text-white/38 transition duration-300 group-hover:text-white/52">
                    {connection.kind}
                  </p>
                  <p className={`mt-2 text-white/82 ${compact ? "text-sm leading-6" : "text-sm leading-7"}`}>
                    {connection.label}
                  </p>
                </div>
                <span className="translate-x-0 text-sm text-aurora transition duration-300 group-hover:translate-x-1 group-hover:text-white">
                  →
                </span>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
