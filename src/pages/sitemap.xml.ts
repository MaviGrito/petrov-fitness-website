import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const siteURL = 'https://petrovfitness.au';

  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/services/', priority: '0.9', changefreq: 'monthly' },
    { url: '/blog/', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact/', priority: '0.7', changefreq: 'monthly' },
  ];

  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const blogPages = posts.map(post => ({
    url: `/blog/${post.slug}/`,
    priority: '0.7',
    changefreq: 'monthly',
    lastmod: post.data.date.toISOString().split('T')[0],
  }));

  const allPages = [...staticPages, ...blogPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${siteURL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${'lastmod' in page ? `\n    <lastmod>${page.lastmod}</lastmod>` : ''}
  </url>`).join('\n')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
