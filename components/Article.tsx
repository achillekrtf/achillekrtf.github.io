import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import type { Entry } from "@/lib/content";

import { PillLink } from "./ui";

/** Small figures for MDX: a row of headline numbers. */
function Metrics({ items }: { items: [string, string][] }) {
  return (
    <div className="not-prose my-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-4">
      {items.map(([value, label]) => (
        <div key={label} className="bg-surface p-4">
          <div className="text-2xl font-light text-fg">{value}</div>
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
        {kind}
        {entry.date ? ` · ${entry.date}` : ""}
      </span>
      <h1 className="mt-4 text-4xl font-light leading-tight tracking-tight text-fg md:text-5xl">{entry.title}</h1>
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
          <PillLink href={entry.repo}>Code on GitHub</PillLink>
        </div>
      )}
      <div className="prose prose-invert prose-site mt-14 max-w-none font-light">
        <MDXRemote
          source={entry.body}
          components={{ Metrics }}
          options={{ blockJS: false, mdxOptions: { remarkPlugins: [remarkGfm] } }}
        />
      </div>
    </article>
  );
}
