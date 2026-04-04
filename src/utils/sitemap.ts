export const STATIC_PAGES = ['/', '/services', '/blog', '/contact'];

export interface SitemapPost {
  slug: string;
  draft?: boolean;
}

export function generateSitemapURLs(posts: SitemapPost[]): string[] {
  const postURLs = posts
    .filter(p => !p.draft)
    .map(p => `/blog/${p.slug}`);
  return [...STATIC_PAGES, ...postURLs];
}
