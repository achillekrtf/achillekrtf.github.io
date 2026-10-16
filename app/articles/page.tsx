import type { Metadata } from "next";
import Link from "next/link";

import { readMinutes } from "@/components/ui";
import { entries } from "@/lib/content";

export const metadata: Metadata = { title: "Articles" };

export default function Articles() {
  const list = entries("articles");
  return (
    <div className="mx-auto max-w-4xl px-6 pt-20">
      <span className="label">Writing</span>
      <h1 className="mt-4 text-4xl font-normal tracking-tight text-fg md:text-5xl">Articles</h1>
      <p className="mt-5 max-w-xl text-muted">
        Short pieces on machine learning, markets and on-chain finance, built on data and code.
      </p>
      {list.length === 0 && (
        <div className="mt-14 rounded-xl border border-line bg-surface p-10">
          <span className="label">Soon</span>
          <p className="mt-3 text-fg">The first pieces are being written. They will land here.</p>
        </div>
      )}
      <ul className="mt-14 border-t border-line">
        {list.map((a, i) => (
          <li key={a.slug} className="border-b border-line">
            <Link href={`/articles/${a.slug}/`} className="group block py-8">
              <span className="label">
                <span className="text-accent">#{String(list.length - i).padStart(2, "0")}</span>
                <span className="mx-2 text-faint">·</span>
                {a.date}
                <span className="mx-2 text-faint">·</span>
                {readMinutes(a.body)} min read
              </span>
              <h2 className="mt-3 text-2xl text-fg transition-colors group-hover:text-accent">{a.title}</h2>
              <p className="mt-2 max-w-2xl text-muted">{a.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
