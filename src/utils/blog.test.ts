import { describe, it } from 'vitest';
import * as fc from 'fast-check';
import { filterPostsByCategory, getRelatedPosts, BLOG_CATEGORIES, type BlogPostData } from './blog';

// Arbitrary for BlogPostData
const arbitraryBlogPost = (): fc.Arbitrary<BlogPostData> =>
  fc.record({
    slug: fc.string({ minLength: 1, maxLength: 50 }).filter(s => s.trim().length > 0),
    category: fc.constantFrom(...BLOG_CATEGORIES),
    date: fc.date({ min: new Date('2020-01-01'), max: new Date('2026-12-31') }),
    draft: fc.boolean(),
  });

describe('blog utilities', () => {
  // Feature: petrov-fitness-website, Property 1: Filtrado de blog por categoría es correcto
  it('filterPostsByCategory returns only posts of the given category', () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryBlogPost()),
        fc.constantFrom(...BLOG_CATEGORIES),
        (posts, category) => {
          const filtered = filterPostsByCategory(posts, category);
          return filtered.every(post => post.category === category);
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: petrov-fitness-website, Property 2: Posts relacionados pertenecen a la misma categoría
  it('getRelatedPosts returns only posts of the same category excluding the original', () => {
    fc.assert(
      fc.property(
        fc.array(arbitraryBlogPost(), { minLength: 1 }),
        fc.integer({ min: 0 }),
        (posts, idx) => {
          const post = posts[idx % posts.length];
          const related = getRelatedPosts(post, posts);
          return related.every(r => r.category === post.category && r.slug !== post.slug);
        }
      ),
      { numRuns: 100 }
    );
  });
});
