import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  // Redirect to sitemap-index.xml
  return new Response(null, {
    status: 301,
    headers: {
      'Location': '/sitemap-index.xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};

