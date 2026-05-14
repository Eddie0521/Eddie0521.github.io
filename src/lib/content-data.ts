import { getCollection, getEntry, type CollectionEntry } from "astro:content";

export type SiteConfig = CollectionEntry<"site">["data"];
export type NewsItem = CollectionEntry<"news">["data"] & {
  id: string;
};
export type BlogPost = CollectionEntry<"blog">;
export type ProjectEntry = CollectionEntry<"projects">;
export type ProjectListItem = ProjectEntry["data"] & {
  id: string;
  slug: string;
  href: string;
  name: string;
};

function sortByDateDesc<T extends { data: { publishedAt?: Date; date?: Date } }>(a: T, b: T) {
  const aDate = a.data.publishedAt ?? a.data.date;
  const bDate = b.data.publishedAt ?? b.data.date;

  return (bDate?.valueOf() ?? 0) - (aDate?.valueOf() ?? 0);
}

export async function getSiteConfig() {
  const entry = await getEntry("site", "site");

  if (!entry) {
    throw new Error('Missing site configuration. Add the "site" entry in src/content/site.yaml.');
  }

  return entry.data;
}

export async function getNewsItems() {
  const entries = await getCollection("news", ({ data }) => !data.draft);

  return entries.sort(sortByDateDesc).map((entry) => ({
    id: entry.id,
    ...entry.data,
  }));
}

export function getProjectSlug(entry: ProjectEntry) {
  return entry.id.replace(/\.(md|mdx)$/, "").replace(/\/index$/, "");
}

export function toProjectListItem(entry: ProjectEntry): ProjectListItem {
  const slug = getProjectSlug(entry);

  return {
    id: entry.id,
    slug,
    href: `/projects/${slug}/`,
    name: entry.data.shortTitle ?? entry.data.title,
    ...entry.data,
  };
}

export async function getProjects() {
  const entries = await getCollection("projects", ({ data }) => !data.draft);

  return entries.sort(sortByDateDesc).map(toProjectListItem);
}

export async function getBlogPosts() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export function getBlogPostSlug(post: BlogPost) {
  return post.id.replace(/\.(md|mdx)$/, "").replace(/\/index$/, "");
}

export function getBlogPostHref(post: BlogPost) {
  return `/blog/${getBlogPostSlug(post)}/`;
}
