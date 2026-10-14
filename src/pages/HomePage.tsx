import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/Hero';
import { ArticleCard } from '../components/ArticleCard';
import { CategoryCard } from '../components/CategoryCard';
import { NewsletterForm } from '../components/NewsletterForm';
import { SEOHead } from '../components/SEOHead';
import { getAllArticles } from '../data/articles';
import { CATEGORIES } from '../data/categories';

export function HomePage() {
  const articles = getAllArticles();
  const featuredArticle = articles[0]; // Japanese Stationery Essentials
  const latestArticles = articles.slice(1);
  const [displayCount, setDisplayCount] = useState(6);

  return (
    <>
      <SEOHead
        title="Kiroku — Japanese Stationery Journal & Guides"
        description="Small things. Beautifully written. Discover curated guides on Japanese pens, notebooks, washi tape, journaling techniques, and desk aesthetics."
        canonicalPath="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Kiroku',
          url: 'https://kiroku-stationery.vercel.app',
          description: 'A thoughtful, editorial Japanese stationery blog exploring notebooks, pens, journaling aesthetics, and desk culture.',
          publisher: {
            '@type': 'Organization',
            name: 'Kiroku Editorial',
            url: 'https://kiroku-stationery.vercel.app',
          },
        }}
      />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Area with generous airy spacing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 space-y-24 md:space-y-32">

        {/* Section 1: Featured Flagship Story */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#DDD8CF] gap-4">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block mb-1">
                Featured Editorial
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-light text-[#292824] tracking-tight">
                The Foundational Japanese Desk
              </h2>
            </div>
            <Link
              to={`/blogs/${featuredArticle.slug}`}
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-medium text-[#292824] hover:text-[#A85F4B] transition-colors shrink-0"
            >
              <span>Read complete guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ArticleCard article={featuredArticle} featured={true} />
        </section>

        {/* Section 2: Explore by Category */}
        <section>
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block mb-2">
              Browse by Domain
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-[40px] font-serif font-light text-[#292824] tracking-tight">
              Curated Stationery Disciplines
            </h2>
            <p className="text-[14px] text-[#77736D] mt-3 leading-relaxed">
              From microscopic precision gel pens to bleed-resistant paper folios and architectural desk trays.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </section>

        {/* Section 3: Latest Journal Articles */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#DDD8CF] gap-4">
            <div>
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block mb-1">
                Recent Publications
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-serif font-light text-[#292824] tracking-tight">
                Latest Stationery Guides
              </h2>
            </div>
            <Link
              to="/blogs"
              className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.16em] font-medium text-[#292824] hover:text-[#A85F4B] transition-colors shrink-0"
            >
              <span>View all {articles.length} guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Grid of articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestArticles.slice(0, displayCount).map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {/* Load More Control */}
          {displayCount < latestArticles.length && (
            <div className="mt-16 text-center">
              <button
                type="button"
                onClick={() => setDisplayCount((prev) => Math.min(prev + 3, latestArticles.length))}
                className="px-8 py-3 text-[11px] font-medium uppercase tracking-[0.16em] text-[#292824] bg-transparent hover:bg-[#F2EFE8] border border-[#DDD8CF] hover:border-[#292824] transition-colors cursor-pointer"
              >
                Load more articles ({latestArticles.length - displayCount} remaining)
              </button>
            </div>
          )}
        </section>

        {/* Section 4: Letters from Kiroku Newsletter */}
        <NewsletterForm />

      </div>
    </>
  );
}
