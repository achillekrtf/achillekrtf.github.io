import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Article from "@/components/Article";
import { entries, entry } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return entries("projects").map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const e = entry("projects", (await params).slug);
  return { title: e?.title, description: e?.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const e = entry("projects", (await params).slug);
  if (!e) notFound();
  return <Article entry={e} kind="Project" />;
}
