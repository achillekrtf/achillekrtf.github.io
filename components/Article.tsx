import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import type { Entry } from "@/lib/content";

import { LinkButton, readMinutes } from "./ui";

/** Small figures for MDX: a row of headline numbers. */
function Metrics({ items }: { items: [string, string][] }) {
  return (
    <div className="not-prose my-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-4">
      {items.map(([value, label]) => (
        <div key={label} className="bg-surface p-4">
          <div className="font-mono text-2xl text-fg">{value}</div>
          <div className="mt-1 text-xs text-muted">{label}</div>
        </div>
      ))}
    </div>
  );
}

export default function Article({ entry, kind }: { entry: Entry; kind: "Project" | "Article" }) {
  return (
    <article className="mx-auto max-w-3xl px-6 pt-20">
      <span className="label">
        <span className="text-accent">{kind}</span>
        {entry.date ? ` · ${entry.date}` : ""}
        {kind === "Article" ? ` · ${readMinutes(entry.body)} min read` : ""}
      </span>
      <h1 className="mt-4 text-4xl font-normal leading-tight tracking-[-0.02em] text-fg md:text-5xl">{entry.title}</h1>
      <p className="mt-5 text-lg text-muted">{entry.summary}</p>
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {entry.tags.map((t) => (
          <span key={t} className="label-chip">
            {t}
          </span>
        ))}
      </div>
      {entry.repo && (
        <div className="mt-8">
          <LinkButton href={entry.repo}>Code on GitHub</LinkButton>
        </div>
      )}
      <div className="prose prose-invert prose-site mt-14 max-w-none">
        <MDXRemote
          source={entry.body}
          components={{ Metrics }}
          options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
