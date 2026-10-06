import Link from "next/link";

/** Pill button with a round arrow. */
export function PillLink({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const external = href.startsWith("http");
  const className = `group inline-flex items-center gap-3 rounded-full py-1.5 pl-4 pr-1.5 text-sm transition-colors ${
    primary ? "bg-fg text-ink hover:bg-white" : "border border-line-strong text-fg hover:border-amber"
  }`;
  const arrow = (
    <span
      className={`flex h-6 w-6 items-center justify-center rounded-full text-xs transition-transform group-hover:translate-x-0.5 ${
        primary ? "bg-amber text-ink" : "bg-raised text-amber"
      }`}
    >
      →
    </span>
  );
  return external ? (
    <a href={href} className={className}>
      {children}
      {arrow}
    </a>
  ) : (
    <Link href={href} className={className}>
      {children}
      {arrow}
    </Link>
  );
}

/** Section heading: a mono label above a light title. */
export function SectionHead({ label, title, id }: { label: string; title: string; id?: string }) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <span className="label-chip">{label}</span>
      <h2 className="mt-5 text-3xl font-light tracking-tight text-fg md:text-4xl">{title}</h2>
    </div>
  );
}

/**
 * A visual for a project: a gradient panel with a blueprint grid and one
 * geometric shape, in the warm accent.
 */
export function Panel({ shape = "circle" }: { shape?: "circle" | "square" | "diamond" | "bars" }) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br from-amber/90 via-amber-deep/80 to-[#5a2c12]">
      <div className="grid-bg absolute inset-6 rounded-lg border border-white/20" />
      <div className="absolute inset-0 flex items-center justify-center">
        {shape === "circle" && (
          <div className="h-1/2 w-auto aspect-square rounded-full border border-white/40 bg-white/15 shadow-[inset_0_0_40px_rgba(255,255,255,0.25)]" />
        )}
        {shape === "square" && (
          <div className="h-1/2 w-auto aspect-square rotate-6 rounded-md border border-white/40 bg-white/15" />
        )}
        {shape === "diamond" && (
          <div className="h-2/5 w-auto aspect-square rotate-45 border border-white/40 bg-white/15" />
        )}
        {shape === "bars" && (
          <div className="flex h-1/2 items-end gap-2">
            {[35, 55, 45, 75, 60, 90].map((h, i) => (
              <div key={i} className="w-5 rounded-sm border border-white/40 bg-white/15" style={{ height: `${h}%` }} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
