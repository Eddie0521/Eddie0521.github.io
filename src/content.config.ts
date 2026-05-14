import { defineCollection } from "astro:content";
import { file, glob } from "astro/loaders";
import { z } from "astro/zod";

const site = defineCollection({
  loader: file("src/content/site.yaml"),
  schema: z.object({
    name: z.string(),
    brand: z.string(),
    title: z.string(),
    description: z.string(),
    location: z.string().default(""),
    role: z.string().default(""),
    avatar: z.string(),
    topbarIcon: z.string(),
    intro: z.array(z.string()).default([]),
    navigation: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .default([]),
    socialLinks: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .default([]),
  }),
});

const news = defineCollection({
  loader: file("src/content/news.yaml"),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    body: z.string(),
    href: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    draft: z.boolean().default(false),
  }),
});

const projectLinkSchema = z.object({
  paper: z.string().optional(),
  code: z.string().optional(),
  demo: z.string().optional(),
  video: z.string().optional(),
  dataset: z.string().optional(),
  model: z.string().optional(),
  website: z.string().optional(),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    shortTitle: z.string().optional(),
    description: z.string(),
    authors: z.array(z.string()).default([]),
    affiliations: z.array(z.string()).default([]),
    venue: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageAlt: z.string().optional(),
    thumbnail: z.string().optional(),
    thumbnailAlt: z.string().optional(),
    links: projectLinkSchema.default({}),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { site, news, blog, projects };
