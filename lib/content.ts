import fs from "node:fs";
import path from "node:path";

import { parse } from "yaml";

export type Kind = "projects" | "articles";

export interface Entry {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
  /** Projects: the year. Articles: an ISO date. */
  date: string;
  order: number;
  repo?: string;
  shape?: "circle" | "square" | "diamond" | "bars";
  body: string;
}

const root = path.join(process.cwd(), "content");

/** Splits a `---` YAML front matter block from the body. */
function matter(source: string): { data: Record<string, unknown>; content: string } {
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(source);
  if (!m) return { data: {}, content: source };
  return { data: parse(m[1]) ?? {}, content: source.slice(m[0].length) };
}

export function entries(kind: Kind): Entry[] {
  const dir = path.join(root, kind);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = matter(fs.readFileSync(path.join(dir, file), "utf8"));
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: String(data.title),
        summary: String(data.summary ?? ""),
        tags: (data.tags as string[] | undefined) ?? [],
        date: String(data.date ?? ""),
        order: Number(data.order ?? 99),
        repo: data.repo as string | undefined,
        shape: data.shape as Entry["shape"],
        body: content,
      };
    })
    .sort((a, b) => (kind === "projects" ? a.order - b.order : b.date.localeCompare(a.date)));
}

export function entry(kind: Kind, slug: string): Entry | undefined {
  return entries(kind).find((e) => e.slug === slug);
}
