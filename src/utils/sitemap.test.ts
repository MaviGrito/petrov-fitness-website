import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { generateSitemapURLs, STATIC_PAGES, type SitemapPost } from './sitemap';

const arbitraryPublishedPost = (): fc.Arbitrary<SitemapPost> =>
  fc.record({
    slug: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0 && !s.includes('/')),
    draft: fc.constant(false),
  });

describe('generateSitemapURLs', () => {
  // Feature: petrov-fitness-website, Property 5: Sitemap incluye todas las páginas y posts
  it('includes all published posts and all static pages', () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryPublishedPost()),
        (posts) => {
          const urls = generateSitemapURLs(posts);
          const postURLs = posts.map(p => `/blog/${p.slug}`);
          const allPostsIncluded = postURLs.every(url => urls.includes(url));
          const allStaticIncluded = STATIC_PAGES.every(page => urls.includes(page));
          return allPostsIncluded && allStaticIncluded;
        }
      ),
      { numRuns: 100 }
    );
  });
});
