import Link from "next/link";

import ChainFlow from "@/components/ChainFlow";
import { LinkButton, Panel, readMinutes, SectionHead } from "@/components/ui";
import { entries } from "@/lib/content";
import { education, experience, interests } from "@/lib/cv";

export default function Home() {
  const projects = entries("projects");
  const articles = entries("articles");

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <ChainFlow />
        <div className="relative mx-auto flex min-h-[78vh] max-w-6xl flex-col justify-center px-6 py-24">
          <span className="label">AI Engineer · Spiko  /  MSc Data & AI for Finance · Mines Paris – PSL</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-normal leading-[1.05] tracking-[-0.03em] text-fg md:text-7xl">
            Machine learning, markets and <span className="text-accent">on-chain</span> finance.
          </h1>
          <p className="mt-8 max-w-xl text-lg text-muted">
            I build AI and data systems at Spiko, a regulated tokenized cash platform, and study how
            prices form, on exchanges and on chain.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <LinkButton href="#work" primary>
              See the work
            </LinkButton>
            <LinkButton href="/cv/">Curriculum</LinkButton>
          </div>
        </div>
      </section>

      {/* Work */}
      <section className="mx-auto max-w-6xl px-6 pt-28">
        <SectionHead id="work" index={1} label="Work" title="Projects" />
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
                <h3 className="mt-5 text-3xl font-normal leading-tight tracking-tight text-fg">{p.title}</h3>
                <p className="mt-4 max-w-md text-muted">{p.summary}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <LinkButton href={`/projects/${p.slug}/`}>Read more</LinkButton>
                  {p.repo && <LinkButton href={p.repo}>Code</LinkButton>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Articles */}
      {articles.length > 0 && (
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHead index={2} label="Writing" title="Articles" />
        <ol className="border-t border-line">
          {articles.map((a, i) => (
            <li key={a.slug} className="border-b border-line">
              <Link
                href={`/articles/${a.slug}/`}
                className="group grid gap-x-6 gap-y-1 py-6 md:grid-cols-[3rem_7.5rem_1fr_5rem] md:items-baseline"
              >
                <span className="label text-accent">#{String(articles.length - i).padStart(2, "0")}</span>
                <span className="label">{a.date}</span>
                <span className="text-xl text-fg transition-colors group-hover:text-accent">{a.title}</span>
                <span className="label md:text-right">{readMinutes(a.body)} min</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      )}

      {/* Path */}
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHead index={articles.length > 0 ? 3 : 2} label="Path" title="Education & experience" />
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
          <LinkButton href="/cv/">Full curriculum</LinkButton>
        </div>
      </section>

      {/* Interests */}
      <section className="mx-auto max-w-6xl px-6 pt-32">
        <SectionHead index={articles.length > 0 ? 4 : 3} label="Interests" title="What I follow" />
        <div className="flex flex-wrap gap-3">
          {interests.map((i) => (
            <span key={i} className="rounded-md border border-line-strong px-3 py-1.5 text-sm text-fg">
              {i}
            </span>
          ))}
        </div>
      </section>
    </>
  );
}
