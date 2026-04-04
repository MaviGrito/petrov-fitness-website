import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const page404Path = resolve(process.cwd(), 'src/pages/404.astro');
const page404Content = readFileSync(page404Path, 'utf-8');

describe('404 page', () => {
  it('exists and is readable', () => {
    expect(page404Content.length).toBeGreaterThan(0);
  });

  it('uses Layout.astro', () => {
    expect(page404Content).toContain("import Layout from '../layouts/Layout.astro'");
  });

  it('displays a 404 indicator', () => {
    expect(page404Content).toContain('404');
  });

  it('contains a link back to the homepage', () => {
    expect(page404Content).toContain('href="/"');
  });

  it('contains a link to services page', () => {
    expect(page404Content).toContain('href="/services"');
  });

  it('has a "Page Not Found" heading', () => {
    expect(page404Content).toContain('Page Not Found');
  });

  it('has descriptive error message', () => {
    expect(page404Content).toContain("doesn't exist or has been moved");
  });
});
