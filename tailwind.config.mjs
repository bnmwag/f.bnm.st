/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				background: 'var(--background)',
				'background-muted': 'var(--background-muted)',
				foreground: 'var(--foreground)',
				'foreground-muted': 'var(--foreground-muted)',
			},
			transitionTimingFunction: {
				cubic: 'cubic-bezier(0.77, 0, 0.175, 1)',
			},
		},
	},
	plugins: [],
}
