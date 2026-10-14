/**
 * Central image mapping for Kiroku stationery blog.
 * 
 * To replace any image with your own photograph:
 * 1. Place your image file (JPEG, PNG, or WebP) into the `public/images/` directory.
 * 2. Update the corresponding path value below or name your file matching the default path.
 */

export const IMAGE_MAP: Record<string, string> = {
  // Hero image for homepage
  hero: '/images/homepage.jpg',

  // Article featured images
  'best-japanese-stationery': '/blog-01.jpg - Copy - Copy - Copy.jpg',
  'japanese-stationery-for-students': '/blog-02.jpg - Copy.jpg',
  'japanese-journaling-supplies': '/blog-03.jpg.jpg',
  'best-japanese-pens': '/blog-04.jpg.jpg',
  'japanese-notebooks-guide': '/blog-05.jpg.jpg',
  'best-japanese-stationery-brands': '/blog-06.jpg.jpg',
  'japanese-washi-tape-guide': '/blog-07.jpg.jpg',
  'japanese-stationery-shopping-guide': '/blog-08.jpg.jpg',
  'how-to-start-a-japanese-journal': '/blog-09.jpg.jpg',
  'japanese-desk-organization': '/blog-10.jpg.jpg',
};

/**
 * Returns the mapped image path for an article slug, with a safe fallback.
 */
export function getArticleImage(slug: string): string {
  return IMAGE_MAP[slug] || '/images/hero-japanese-stationery.jpg';
}
