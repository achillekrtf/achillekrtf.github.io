import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-geist", weight: ["300", "400", "500"] });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", weight: ["400", "500"] });

export const metadata: Metadata = {
  title: { default: "Achille Krotoff", template: "%s · Achille Krotoff" },
  description: "AI engineer. Machine learning, quantitative finance and on-chain markets.",
  metadataBase: new URL("https://achillekrtf.github.io"),
};

const nav = [
  { href: "/#work", label: "Work" },
  { href: "/articles/", label: "Articles" },
  { href: "/cv/", label: "CV" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body className="min-h-screen font-sans">
        <header className="sticky top-0 z-30 border-b border-line bg-ink/80 backdrop-blur-md">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
            <Link href="/" className="flex items-center gap-2.5 font-medium tracking-tight text-fg">
              <span aria-hidden className="grid h-5 w-5 grid-cols-2 gap-[2px]">
                <span className="rounded-[2px] bg-accent" />
                <span className="rounded-[2px] border border-accent/60" />
                <span className="rounded-[2px] border border-accent/60" />
                <span className="rounded-[2px] bg-accent/40" />
              </span>
              Achille Krotoff
            </Link>
            <nav className="flex items-center gap-6 font-mono text-xs uppercase tracking-wider text-muted">
              {nav.map((item) => (
                <Link key={item.href} href={item.href} className="transition-colors hover:text-fg">
                  {item.label}
                </Link>
              ))}
              <a
                href="https://github.com/achillekrtf"
                className="rounded-md border border-line-strong px-3 py-1.5 text-fg transition-colors hover:border-accent"
              >
                GitHub
              </a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-32 border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-10">
            <span className="label">Paris · {new Date().getFullYear()}</span>
            <div className="flex gap-6 text-sm text-muted">
              <a className="hover:text-fg" href="https://www.linkedin.com/in/achille-krotoff">LinkedIn</a>
              <a className="hover:text-fg" href="https://github.com/achillekrtf">GitHub</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
