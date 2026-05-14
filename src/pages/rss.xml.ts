import rss from "@astrojs/rss";
import { getBlogPostHref, getBlogPosts, getSiteConfig } from "@/lib/content-data";

export async function GET(context: { site: URL }) {
  const site = await getSiteConfig();
  const posts = await getBlogPosts();

  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: getBlogPostHref(post),
    })),
  });
}
