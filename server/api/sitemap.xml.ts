import { stories } from '~/data/stories'

export default defineEventHandler((event) => {
  const baseUrl = 'https://sabun123.github.io/jlpt-n5-short-stories'
  
  // Generate URLs for all stories
  const storyUrls = stories.map(story => `
    <url>
      <loc>${baseUrl}/story/${story.id}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
  `).join('')

  // Create sitemap XML
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
      </url>
      ${storyUrls}
    </urlset>`

  // Set XML content type
  setHeader(event, 'content-type', 'application/xml')
  return sitemap
})