import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import remarkMath from "remark-math";
import rehypeMathjaxChtml from 'rehype-mathjax/chtml.js'

export const basePath = '/personal-website/';

// https://astro.build/config
export default defineConfig({
  site: 'https://dangerousplay.github.io',
  base: basePath,
  integrations: [mdx(), sitemap(), tailwind()],
    markdown: {
        extendDefaultPlugins: true,
        remarkPlugins: [remarkMath],
        rehypePlugins: [
            [rehypeMathjaxChtml, {
                chtml: {
                    fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
                }
            }]
        ],
        shikiConfig: {
            theme: 'github-light',
            langs: [],
            // Enable word wrap to prevent horizontal scrolling
            wrap: true
        }
    }
});