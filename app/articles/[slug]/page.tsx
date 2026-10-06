import type { Metadata } from "next";

import Article from "@/components/Article";
import { entries, entry } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  const list = entries("articles").map((e) => ({ slug: e.slug }));
  // A static export needs at least one page per dynamic route.
  return list.length > 0 ? list : [{ slug: "soon" }];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = entry("articles", (await params).slug);
  return { title: e?.title, description: e?.summary };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const e = entry("articles", (await params).slug);
  if (!e)
    return (
      <div className="mx-auto max-w-3xl px-6 pt-20">
        <span className="label">Articles</span>
        <p className="mt-4 text-2xl font-light text-fg">The first pieces are being written.</p>
      </div>
    );
  return <Article entry={e} kind="Article" />;
}
