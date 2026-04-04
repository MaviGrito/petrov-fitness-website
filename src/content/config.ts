import { defineCollection, z } from 'astro:content';

const BLOG_CATEGORIES = [
  'Workouts & Training',
  'Nutrition',
  'Mindset & Motivation',
  'Boxing',
  'Client Success Stories',
  'General',
] as const;

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.enum(BLOG_CATEGORIES),
    featured_image: z.string(),
    carousel_images: z.array(z.object({
      image: z.string(),
      caption: z.string().optional(),
    })).optional(),
    excerpt: z.string(),
    tags: z.array(z.string()).optional(),
    author: z.string().default('Mikhail Petrov'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog: blogCollection };
export { BLOG_CATEGORIES };
