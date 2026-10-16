import Link from "next/link";

/** Rectangular link button; external links get a diagonal arrow. */
export function LinkButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  const external = href.startsWith("http");
  const className = `group inline-flex items-center gap-2.5 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
    primary
      ? "bg-accent text-ink hover:bg-[#74b1ff]"
      : "border border-line-strong text-fg hover:border-accent hover:text-white"
  }`;
  const arrow = (
    <span
      aria-hidden
      className={`font-mono text-xs transition-transform ${
        external ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-0.5"
      } ${primary ? "text-ink" : "text-accent"}`}
    >
      {external ? "↗" : "→"}
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

/** Section heading: a numbered mono label (the section's order on the page) above the title. */
export function SectionHead({ index, label, title, id }: { index?: number; label: string; title: string; id?: string }) {
  return (
    <div id={id} className="mb-10 scroll-mt-24">
      <span className="label">
        {index !== undefined && <span className="text-accent">{String(index).padStart(2, "0")}</span>}
        {index !== undefined && <span className="mx-2 text-faint">/</span>}
        {label}
      </span>
      <h2 className="mt-4 text-3xl font-normal tracking-tight text-fg md:text-4xl">{title}</h2>
    </div>
  );
}

/** Estimated reading time for a body of text, in minutes. */
export function readMinutes(body: string) {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 220));
}

/**
 * A visual for a project: a dark panel on a fine grid with one line drawing in
 * the accent colour (a ring, a stack of blocks, a rotated block, or candles).
 */
export function Panel({ shape = "circle" }: { shape?: "circle" | "square" | "diamond" | "bars" }) {
  const stroke = "var(--color-accent)";
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(79,155,255,0.12),transparent_65%)]" />
      <svg viewBox="0 0 200 150" className="absolute inset-0 h-full w-full" fill="none" aria-hidden>
        {shape === "circle" && (
          <g stroke={stroke}>
            <circle cx="100" cy="75" r="38" strokeOpacity="0.8" />
            <circle cx="100" cy="75" r="54" strokeOpacity="0.25" strokeDasharray="2 4" />
            <circle cx="154" cy="75" r="3" fill={stroke} />
            <circle cx="62" cy="48" r="2" fill="var(--color-amber)" stroke="none" />
          </g>
        )}
        {shape === "square" && (
          <g stroke={stroke}>
            {[0, 1, 2].map((i) => (
              <rect key={i} x={58 + i * 22} y={40 + i * 12} width="48" height="48" rx="3" strokeOpacity={0.35 + i * 0.3} fill="var(--color-surface)" />
            ))}
          </g>
        )}
        {shape === "diamond" && (
          <g stroke={stroke}>
            <rect x="72" y="47" width="56" height="56" rx="3" transform="rotate(45 100 75)" strokeOpacity="0.8" />
            <rect x="86" y="61" width="28" height="28" rx="2" transform="rotate(45 100 75)" strokeOpacity="0.35" />
          </g>
        )}
        {shape === "bars" && (
          <g>
            {[
              [40, 92, 70, 104, 60],
              [62, 80, 60, 96, 52],
              [84, 70, 82, 90, 62],
              [106, 58, 50, 80, 40],
              [128, 52, 66, 76, 44],
              [150, 40, 30, 60, 22],
            ].map(([x, o, c, lo, hi]) => {
              const up = c < o;
              const col = up ? stroke : "var(--color-amber)";
              return (
                <g key={x} stroke={col}>
                  <line x1={x} x2={x} y1={hi} y2={lo} strokeOpacity="0.7" />
                  <rect x={x - 6} y={Math.min(o, c)} width="12" height={Math.max(4, Math.abs(o - c))} rx="1.5" fill="var(--color-surface)" />
                </g>
              );
            })}
          </g>
        )}
      </svg>
    </div>
  );
}
