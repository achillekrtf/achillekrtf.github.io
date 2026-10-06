# achillekrtf.github.io

Source of [achillekrtf.github.io](https://achillekrtf.github.io).

Next.js (static export) + Tailwind CSS. Projects and articles are MDX files in `content/`; every push to `main` builds the site and publishes it to GitHub Pages.

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # static site in out/
```

Writing an article: add `content/articles/<slug>.mdx` with a `title`, `summary`, `tags` and `date` front matter. Images go in `public/images/`.
