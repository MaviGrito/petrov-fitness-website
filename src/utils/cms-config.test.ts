import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read the CMS config file
const configPath = resolve(process.cwd(), 'public/admin/config.yml');
const configContent = readFileSync(configPath, 'utf-8');

describe('Decap CMS config.yml', () => {
  it('contains git-gateway backend', () => {
    expect(configContent).toContain('name: git-gateway');
  });

  it('has correct media_folder and public_folder', () => {
    expect(configContent).toContain('media_folder: "public/uploads"');
    expect(configContent).toContain('public_folder: "/uploads"');
  });

  it('defines the blog collection', () => {
    expect(configContent).toContain('name: "blog"');
    expect(configContent).toContain('folder: "src/content/blog"');
  });

  it('contains all required blog fields', () => {
    const requiredFields = [
      'title',
      'date',
      'category',
      'featured_image',
      'carousel_images',
      'excerpt',
      'body',
      'tags',
      'author',
      'draft',
    ];
    for (const field of requiredFields) {
      expect(configContent, `Missing field: ${field}`).toContain(`name: "${field}"`);
    }
  });

  it('includes all predefined categories', () => {
    const categories = [
      'Workouts & Training',
      'Nutrition',
      'Mindset & Motivation',
      'Boxing',
      'Client Success Stories',
      'General',
    ];
    for (const cat of categories) {
      expect(configContent, `Missing category: ${cat}`).toContain(cat);
    }
  });

  it('sets default author to Mikhail Petrov', () => {
    expect(configContent).toContain('default: "Mikhail Petrov"');
  });

  it('carousel_images is not required (optional field)', () => {
    // The carousel_images field should have required: false
    expect(configContent).toMatch(/carousel_images[\s\S]*?required: false/);
  });
});
