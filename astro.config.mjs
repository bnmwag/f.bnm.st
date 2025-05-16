import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import lenis from 'astro-lenis'
import glsl from 'vite-plugin-glsl'
import node from '@astrojs/node'

import sitemap from '@astrojs/sitemap'

// https://astro.build/config
export default defineConfig({
	site: 'https://bnm.st',
	integrations: [
		lenis(),
		sitemap({
			changefreq: 'never',
			priority: 0.5,
			lastmod: new Date('2025-02-05'),
		}),
	],
	output: 'server',
	adapter: node({
		mode: 'standalone',
	}),
	vite: {
		plugins: [glsl(), tailwindcss()], // top-level await present in the "four" library
	},
})
