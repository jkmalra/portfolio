"use client";

import { useEffect, useState } from "react";

type ArticleToolsProps = {
  title: string;
};

export function ArticleTools({ title }: ArticleToolsProps) {
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = total > 0 ? Math.min(100, (scrollTop / total) * 100) : 0;
      setProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="space-y-4 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-5">
      <div>
        <p className="text-xs uppercase tracking-[0.24em] text-white/42">Reading progress</p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-aurora to-azure transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-white/42">Article tools</p>
        <button
          type="button"
          onClick={copyLink}
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-white/78"
        >
          {copied ? "Link copied" : `Copy link for "${title}"`}
        </button>
      </div>
    </div>
  );
}
