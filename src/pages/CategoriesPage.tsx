import { Link } from 'react-router-dom';
import { SEOHead } from '../components/SEOHead';
import { CATEGORIES } from '../data/categories';
import { CategoryCard } from '../components/CategoryCard';
import { ArrowRight, BookOpen } from 'lucide-react';

export function CategoriesPage() {
  return (
    <>
      <SEOHead
        title="Stationery Categories — Kiroku"
        description="Explore curated Japanese stationery categories: Pens and Writing Tools, Notebooks and Paper, Journaling, Stationery Brands, Study Essentials, and Desk Aesthetics."
        canonicalPath="/categories"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="max-w-2xl mb-14">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block mb-2">
            Curated Disciplines
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-light text-[#292824] leading-tight tracking-tight">
            Stationery by Category
          </h1>
          <p className="text-[15px] sm:text-base text-[#77736D] mt-3 leading-relaxed">
            Every category reflects a dedicated dimension of Japanese analog culture. Discover specific guides, technical comparisons, and brand lineages tailored to your daily workflow.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Featured Editorial Callout */}
        <div className="mt-20 bg-[#F2EFE8] p-8 sm:p-12 border border-[#DDD8CF] flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-[#A85F4B]">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Looking for a starting point?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#292824]">
              Explore the Japanese Stationery Essentials Guide
            </h2>
            <p className="text-[14px] text-[#77736D] max-w-xl leading-relaxed">
              Our flagship overview covers the essential pen, paper, and desk tools that define Japanese stationery culture.
            </p>
          </div>

          <Link
            to="/blogs/best-japanese-stationery"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#292824] hover:bg-[#3D3A35] text-[#FAF9F6] text-[11px] uppercase tracking-[0.16em] font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Read Essentials Guide</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}
