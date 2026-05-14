## Project Rules

### Language
- User-facing documentation should be written in Chinese by default.
- Code identifiers, commands, file names, package names, and commit messages use English.

### Product Direction
- This is a personal website focused on identity, credibility, current activity, projects, and writing.
- The home page should stay direct and content-first: profile, links, news, then supporting sections.
- Avoid decorative landing-page patterns that hide the core personal information.

### Design Direction
- Visual thesis: modern, restrained, clean minimal personal site with compact spacing and neutral typography.
- The first viewport must clearly show the owner identity, avatar, introduction, and external links.
- Use subtle borders, quiet background steps, normal-sized section headings, and small interaction states instead of heavy gradients or ornamental effects.
- Avoid eyebrow labels and explanatory helper copy under repeated section headings unless the content would be unclear without it.
- Cards should be used only for repeated content items such as projects, posts, and news.

### Content Maintenance
- Site-wide identity and links live in `src/content/site.yaml`.
- News items live in `src/content/news.yaml`.
- Project list metadata and detail pages live together in `src/content/projects/`.
- Ordinary projects use the default `project-page` MDX path; academic paper websites may add a dedicated `src/pages/projects/<slug>.astro` based on `src/templates/paper-page.astro`.
- Blog posts live in `src/content/blog/`.
- Do not hard-code repeated content directly in page templates unless it is structural copy.

### Validation
- After implementation changes, run the relevant checks:
  - `npm run build`
  - `npm run check` when changing Astro/content structure
- Do not commit generated build output such as `dist/`.

### Git
- The default branch is `main`.
- Commit messages should be short English summaries.
- Do not run `git push` unless the user explicitly asks for it.
