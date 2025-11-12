import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ url }) => {
  // Redirect to sitemap-index.xml with absolute URL
  const siteUrl = url.origin;
  return new Response(null, {
    status: 301,
    headers: {
      Location: `${siteUrl}/sitemap-index.xml`,
      "Cache-Control": "public, max-age=3600",
    },
  });
};
