import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import image from "@astrojs/image";
import remarkMath from "remark-math";
import rehypeMathjaxChtml from 'rehype-mathjax/chtml.js'

// https://astro.build/config
export default defineConfig({
  site: 'https://astrofy-template.netlify.app',
  integrations: [mdx(), sitemap(), tailwind(), image(
    {
      serviceEntryPoint: '@astrojs/image/sharp',
      cacheDir: "./.cache/image",
      logLevel: 'debug',
    }
  )],
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