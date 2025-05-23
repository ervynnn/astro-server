// @ts-nocheck
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import node from '@astrojs/node';

// sync database.
import { syncDatabase } from './src/scripts/sync';
const SYNC_INTERVAL = parseInt(process.env.SYNC_INTERVAL || "300000", 10);
setInterval(syncDatabase, SYNC_INTERVAL);

// https://astro.build/config
export default defineConfig({
  image: {
    remotePatterns: [{ protocol: "https" }],
    domains: ["astro.build"],
  },

  alias: {
    "@": "./src",
  },

  site: 'http://localhost:4321',
  integrations: [mdx(), sitemap(), react()],

  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",
  adapter: node({
    mode: 'standalone',
  }),
});