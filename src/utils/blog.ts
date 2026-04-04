export const BLOG_CATEGORIES = [
  'Workouts & Training',
  'Nutrition',
  'Mindset & Motivation',
  'Boxing',
  'Client Success Stories',
  'General',
] as const;

export type BlogCategory = typeof BLOG_CATEGORIES[number];

export interface BlogPostData {
  slug: string;
  category: BlogCategory;
  date: Date;
  draft?: boolean;
  [key: string]: unknown;
}

export function filterPostsByCategory(posts: BlogPostData[], category: BlogCategory): BlogPostData[] {
  return posts.filter(post => post.category === category);
}

export function getRelatedPosts(post: BlogPostData, allPosts: BlogPostData[], limit = 3): BlogPostData[] {
  return allPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, limit);
}

export function sortPostsByDate(posts: BlogPostData[]): BlogPostData[] {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
