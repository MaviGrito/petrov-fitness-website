import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://petrovfitness.au',
  integrations: [
    tailwind(),
  ],
});
