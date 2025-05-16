import { defineMiddleware } from 'astro:middleware'

export const onRequest = defineMiddleware((context, next) => {
	if (context.url.host.startsWith('www.')) {
		return Response.redirect(new URL(context.url.href.replace('www.', '')), 301)
	}

	return next()
})
