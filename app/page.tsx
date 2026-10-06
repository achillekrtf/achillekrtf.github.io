import Link from "next/link";

import BlueprintGrid from "@/components/BlueprintGrid";
import { Panel, PillLink, SectionHead } from "@/components/ui";
import { entries } from "@/lib/content";
import { education, experience, interests } from "@/lib/cv";

export default function Home() {
  const projects = entries("projects");
  const articles = entries("articles");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <BlueprintGrid />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-24">
          <span className="label">AI Engineer · Spiko  /  MSc Data & AI for Finance · Mines Paris – PSL</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-light leading-[1.08] tracking-tight text-fg md:text-7xl">
            Machine learning, markets and on-chain finance.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            I build AI and data systems at Spiko, a regulated tokenized cash platform, and study how
            prices form, on exchanges and on chain.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <PillLink href="#work" primary>
              See the work
            </PillLink>
            <PillLink href="/cv/">Curriculum</PillLink>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="mx-auto max-w-6xl px-6 pt-28">
        <SectionHead id="work" label="Work" title="Projects" />
        <div className="space-y-24">
          {projects.map((p, i) => (
            <article key={p.slug} className="grid items-center gap-10 md:grid-cols-2">
              <div className={i % 2 === 1 ? "md:order-2" : ""}>
                <Panel shape={p.shape} />
              </div>
              <div>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="label-chip">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="mt-5 text-3xl font-light leading-tight tracking-tight text-fg">{p.title}</h3>
                <p className="mt-4 max-w-md text-muted">{p.summary}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <PillLink href={`/projects/${p.slug}/`}>Read more</PillLink>
                  {p.repo && <PillLink href={p.repo}>Code</PillLink>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Articles */}
      {articles.length > 0 && (
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHead label="Writing" title="Articles" />
        <ul className="border-t border-line">
          {articles.map((a) => (
            <li key={a.slug} className="border-b border-line">
              <Link href={`/articles/${a.slug}/`} className="group grid gap-2 py-6 md:grid-cols-[10rem_1fr_auto] md:items-baseline">
                <span className="label">{a.date}</span>
                <span className="text-xl font-light text-fg transition-colors group-hover:text-amber">{a.title}</span>
                <span className="text-sm text-muted">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      )}

      {/* Path */}
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHead label="Path" title="Education & experience" />
        <div className="grid gap-12 md:grid-cols-2">
          {[
            { head: "Education", items: education },
            { head: "Experience", items: experience.slice(0, 4) },
          ].map((col) => (
            <div key={col.head}>
              <span className="label">{col.head}</span>
              <ul className="mt-4 border-t border-line">
                {col.items.map((it) => (
                  <li key={it.title + it.when} className="flex items-center gap-4 border-b border-line py-4">
                    <div className="flex h-10 w-10 flex-none items-center justify-center overflow-hidden rounded-lg bg-white">
                      {it.logos[0] ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={it.logos[0]} alt={it.org} className="h-8 w-8 object-contain" />
                      ) : (
                        <span className="font-mono text-xs text-ink">{it.mono ?? it.org.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-fg">{it.title}</div>
                      <div className="truncate text-sm text-muted">{it.org}</div>
                    </div>
                    <span className="label hidden whitespace-nowrap sm:block">{it.when}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <PillLink href="/cv/">Full curriculum</PillLink>
        </div>
      </section>

      {/* Interests */}
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHead label="Interests" title="What I follow" />
        <div className="flex flex-wrap gap-3">
          {interests.map((i) => (
            <span key={i} className="rounded-full border border-line-strong px-4 py-2 text-sm text-fg">
              {i}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
