import { Article } from '../types';
import { article1 } from './articles/article1';
import { article2 } from './articles/article2';
import { article3 } from './articles/article3';
import { article4 } from './articles/article4';
import { article5 } from './articles/article5';
import { article6 } from './articles/article6';
import { article7 } from './articles/article7';
import { article8 } from './articles/article8';
import { article9 } from './articles/article9';
import { article10 } from './articles/article10';

export const ARTICLES: Article[] = [
  { ...article1, id: article1.slug },
  { ...article2, id: article2.slug },
  { ...article3, id: article3.slug },
  { ...article4, id: article4.slug },
  { ...article5, id: article5.slug },
  { ...article6, id: article6.slug },
  { ...article7, id: article7.slug },
  { ...article8, id: article8.slug },
  { ...article9, id: article9.slug },
  { ...article10, id: article10.slug },
];

export function getAllArticles(): Article[] {
  return ARTICLES;
}

export function getArticleBySlug(slug: string): Article | undefined {
  if (!slug) return undefined;
  const clean = slug
    .trim()
    .toLowerCase()
    .replace(/^\/+|\/+$/g, '')
    .replace(/^(?:blogs|blog)\//, '');

  return ARTICLES.find((a) => {
    const aSlug = a.slug.toLowerCase().trim();
    const aId = a.id ? a.id.toLowerCase().trim() : '';
    return aSlug === clean || aId === clean || clean.endsWith(aSlug);
  });
}

export function getArticleById(id: string): Article | undefined {
  return getArticleBySlug(id);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  if (!categorySlug || categorySlug === 'all') return ARTICLES;
  return ARTICLES.filter((a) => a.categorySlug === categorySlug);
}

export function getRelatedArticles(currentSlug: string, count = 3): Article[] {
  const current = getArticleBySlug(currentSlug);
  if (!current) return ARTICLES.slice(0, count);

  // First, check explicit relatedSlugs
  const explicit = current.relatedSlugs
    .map((s) => getArticleBySlug(s))
    .filter((a): a is Article => !!a && a.slug !== currentSlug);

  if (explicit.length >= count) {
    return explicit.slice(0, count);
  }

  // Fallback to same category or other articles
  const sameCategory = ARTICLES.filter(
    (a) => a.categorySlug === current.categorySlug && a.slug !== currentSlug && !explicit.some((e) => e.slug === a.slug)
  );

  const pool = [...explicit, ...sameCategory, ...ARTICLES.filter((a) => a.slug !== currentSlug && !explicit.some((e) => e.slug === a.slug))];
  return pool.slice(0, count);
}

export function searchArticles(query: string, categorySlug?: string, sortBy: 'newest' | 'alpha' = 'newest'): Article[] {
  let results = [...ARTICLES];

  if (categorySlug && categorySlug !== 'all') {
    results = results.filter((a) => a.categorySlug === categorySlug);
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    results = results.filter((a) => {
      const matchTitle = a.title.toLowerCase().includes(q);
      const matchSubtitle = a.subtitle.toLowerCase().includes(q);
      const matchExcerpt = a.excerpt.toLowerCase().includes(q);
      const matchCategory = a.category.toLowerCase().includes(q);
      const matchKeyword = a.primaryKeyword.toLowerCase().includes(q) || a.relatedKeywords.some((k) => k.toLowerCase().includes(q));
      return matchTitle || matchSubtitle || matchExcerpt || matchCategory || matchKeyword;
    });
  }

  if (sortBy === 'alpha') {
    results.sort((a, b) => a.title.localeCompare(b.title));
  }

  return results;
}
