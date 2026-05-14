# Personal Website Rules

## Goal

Build a fast, maintainable personal site inspired by the clarity of `zhangzjn.github.io`, the social-link density of developer portfolio sites, and the calm writing experience of Shiro-style blogs.

## Information Architecture

- `Home`: profile, introduction, social links, news, featured projects, latest posts.
- `Projects`: compact project archive that links to richer project detail pages when available.
- `Blog`: writing archive powered by Markdown/MDX content.

## Content Maintenance

- Site-wide identity, navigation, intro copy, and social links live in `src/content/site.yaml`.
- Homepage News items live in `src/content/news.yaml`.
- Project metadata and project detail content live together in `src/content/projects/*.mdx`.
- Ordinary projects use the default MDX project page; academic paper websites may add a dedicated `src/pages/projects/<slug>.astro` page using the reusable `paper-page` components.
- Blog posts live in `src/content/blog/*.mdx`.
- Static assets live in `public/`.
- Users should not need to edit TypeScript data arrays to publish normal site content.

## UX Principles

- Make identity visible immediately.
- Keep navigation simple: `Home`, `Projects`, `Blog`.
- Keep section headings compact and direct. Avoid small eyebrow labels such as `Now`, `Selected`, or `Writing`.
- Avoid explanatory helper copy under obvious headings like `News`, `Projects`, and `Blog`.
- Let updates be easy to publish without editing layout code.
- Prefer scannable lists over oversized marketing blocks.
- Keep mobile readable and avoid layout shifts.
- Keep the project archive minimal; put paper-style detail, media, resource links, and BibTeX on individual project pages.

## Deployment

- The site must build as static files.
- GitHub Pages deployment should work through GitHub Actions.
- Local development should use standard npm scripts.
- The shared footer like counter is served by `like-worker/` on Cloudflare Workers with D1 storage.
- Do not store visitor personal data in the like counter. The frontend may store only an anonymous browser visitor id.
