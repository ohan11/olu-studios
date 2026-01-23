import { defineConfig } from 'astro/config';

// https://astro.build/config
// For local dev: set base to undefined or '/'
// For GitHub Pages: set base to '/olu-studios'
const isDev = process.env.NODE_ENV === 'development' || !process.env.GITHUB_ACTIONS;

export default defineConfig({
  output: 'static',
  site: 'https://ohan11.github.io',
  // Only use base path for production/GitHub Pages builds
  base: isDev ? '/' : '/olu-studios',
  integrations: []
});
