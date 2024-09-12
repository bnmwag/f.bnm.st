// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import lenis from "astro-lenis";
import glsl from "vite-plugin-glsl";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: "https://f.bnmwag.dev",
	integrations: [
		tailwind(),
		lenis(),
		sitemap({
			changefreq: "never",
			priority: 0.5,
			lastmod: new Date("2024-09-12T21:11:38.271Z"),
		}),
	],
	output: "static",
	vite: {
		plugins: [glsl()], // top-level await present in the "four" library
	},
});
