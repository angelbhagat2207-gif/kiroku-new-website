export interface FAQItem {
  question: string;
  answer: string;
}

export interface TOCItem {
  id: string;
  title: string;
  level: 2 | 3;
}

export interface SpecRow {
  label: string;
  value: string;
  notes?: string;
}

export interface ComparisonTable {
  headers: string[];
  rows: string[][];
}

export interface ArticleSection {
  id: string;
  title: string;
  level?: 2 | 3;
  content: string[]; // paragraphs
  subsections?: {
    id: string;
    title: string;
    content: string[];
    tips?: string;
  }[];
  tips?: string;
  table?: ComparisonTable;
  list?: {
    type: 'bullet' | 'ordered';
    items: string[];
  };
}

export interface Article {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  primaryKeyword: string;
  relatedKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  toc: TOCItem[];
  intro: string[];
  quickAnswerBox?: {
    title: string;
    summary: string;
    keyTakeaways: string[];
  };
  sections: ArticleSection[];
  faqs: FAQItem[];
  conclusion: string[];
  relatedSlugs: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  featuredArticleSlug: string;
  count: number;
}
