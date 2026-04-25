import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://ohan11.github.io',
  // Only use base path for production/GitHub Pages builds
  base: '/',
  integrations: []
});
