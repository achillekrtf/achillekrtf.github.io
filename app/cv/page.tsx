import type { Metadata } from "next";

import { PillLink } from "@/components/ui";
import { education, experience, skills, type CvItem } from "@/lib/cv";

export const metadata: Metadata = { title: "CV" };

function Block({ head, items }: { head: string; items: CvItem[] }) {
  return (
    <section className="mt-20">
      <span className="label-chip">{head}</span>
      <ol className="mt-8 border-t border-line">
        {items.map((it) => (
          <li key={it.title + it.when} className="grid gap-6 border-b border-line py-8 md:grid-cols-[11rem_1fr]">
            <div className="flex items-start gap-2">
              {it.logos.length > 0 ? (
                it.logos.map((src) => (
                  <div key={src} className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={src} alt="" className="h-10 w-10 object-contain" />
                  </div>
                ))
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line-strong font-mono text-xs text-muted">
                  {it.mono ?? it.org.slice(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="text-xl font-light text-fg">{it.title}</h3>
                <span className="label">{it.when}</span>
              </div>
              <div className="mt-1 text-amber">
                {it.org} <span className="text-muted">· {it.place}</span>
              </div>
              <ul className="mt-4 space-y-2 text-muted">
                {it.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <span className="mt-2.5 h-px w-3 flex-none bg-faint" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default function Cv() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/avatar.png" alt="Achille Krotoff" className="h-28 w-28 rounded-2xl border border-line object-cover" />
        <div>
          <span className="label">Curriculum</span>
          <h1 className="mt-3 text-4xl font-light tracking-tight text-fg md:text-5xl">Achille Krotoff</h1>
          <p className="mt-3 text-muted">AI Engineer at Spiko · MSc Data & AI for Finance, Mines Paris – PSL × Albert School · Paris</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <PillLink href="https://www.linkedin.com/in/achille-krotoff" primary>
              LinkedIn
            </PillLink>
            <PillLink href="https://github.com/achillekrtf">GitHub</PillLink>
          </div>
        </div>
      </div>

      <Block head="Education" items={education} />
      <Block head="Experience" items={experience} />

      <section className="mt-20">
        <span className="label-chip">Skills</span>
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((s) => (
            <span key={s} className="rounded-full border border-line-strong px-4 py-2 text-sm text-fg">
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
