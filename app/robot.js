export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/my-account/',
    },
    sitemap: 'https://mytoparts.com/sitemap.xml',
  }
}