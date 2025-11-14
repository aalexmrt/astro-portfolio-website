import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const url = context.url;
  
  // Redirect www to non-www (301 permanent redirect)
  if (url.hostname.startsWith('www.')) {
    const newHostname = url.hostname.replace('www.', '');
    const newUrl = new URL(url.pathname + url.search, `https://${newHostname}`);
    return new Response(null, {
      status: 301,
      headers: {
        Location: newUrl.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }
  
  return next();
};

