import type { ReactNode } from "react";

export function InfoPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <main className="mx-auto w-full max-w-[900px] px-4 py-12 sm:px-6">
      <p className="text-xs font-black uppercase tracking-[.15em] text-[#e5b94f]">{eyebrow}</p>
      <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-5xl">{title}</h1>
      <p className="mt-4 max-w-3xl text-base leading-7 text-white/60">{intro}</p>
      <div className="article-copy mt-8 rounded-[28px] border border-white/10 bg-white/[0.02] p-6 sm:p-9">{children}</div>
    </main>
  );
}
