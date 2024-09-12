// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import lenis from "astro-lenis";
import glsl from "vite-plugin-glsl";

// https://astro.build/config
export default defineConfig({
	integrations: [tailwind(), lenis()],
	vite: {
		plugins: [glsl()], // top-level await present in the "four" library
	},
});
