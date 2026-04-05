import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://petrovfitness.com.au',
  integrations: [
    tailwind(),
  ],
});
