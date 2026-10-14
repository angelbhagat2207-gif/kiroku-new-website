import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, BookOpen } from 'lucide-react';
import { ArticleCard } from '../components/ArticleCard';
import { SEOHead } from '../components/SEOHead';
import { searchArticles } from '../data/articles';
import { CATEGORIES } from '../data/categories';

export function BlogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const categoryParam = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState<'newest' | 'alpha'>('newest');

  // Keep state synced with URL search params
  useEffect(() => {
    setSearchQuery(queryParam);
    setSelectedCategory(categoryParam);
  }, [queryParam, categoryParam]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    const newParams = new URLSearchParams(searchParams);
    if (slug === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', slug);
    }
    setSearchParams(newParams);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    const newParams = new URLSearchParams(searchParams);
    if (!query.trim()) {
      newParams.delete('q');
    } else {
      newParams.set('q', query.trim());
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('newest');
    setSearchParams({});
  };

  const filteredArticles = useMemo(() => {
    return searchArticles(searchQuery, selectedCategory, sortBy);
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <>
      <SEOHead
        title="All Guides & Articles — Kiroku"
        description="Browse all 10 long-form guides on Japanese stationery, pens, notebooks, washi tape, desk organization, and journaling."
        canonicalPath="/blogs"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* Header Section */}
        <div className="max-w-2xl mb-12">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block mb-2">
            The Journal Archive
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-light text-[#292824] leading-tight tracking-tight">
            Stationery Guides & Observations
          </h1>
          <p className="text-[15px] sm:text-base text-[#77736D] mt-3 leading-relaxed">
            Ten comprehensive, lovingly researched guides on Japanese analog craft, fine-point pens, fountain-pen papers, washi tape, and serene desk organization.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#FAF9F6] p-6 border border-[#DDD8CF] mb-12 space-y-5">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#77736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search by pen model, brand, paper, or keyword (e.g. Kokuyo, Sarasa, MD)..."
                className="w-full pl-9 pr-4 py-2.5 text-sm bg-white border border-[#DDD8CF] text-[#292824] placeholder-[#77736D] focus:outline-none focus:border-[#292824]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs uppercase tracking-wider text-[#77736D] hover:text-[#292824]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] text-[#77736D] shrink-0">
                <Filter className="w-3.5 h-3.5" />
                <span>Sort:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'newest' | 'alpha')}
                className="px-3 py-2 text-xs bg-white border border-[#DDD8CF] text-[#292824] focus:outline-none focus:border-[#292824]"
              >
                <option value="newest">Featured & Recent</option>
                <option value="alpha">Alphabetical (A–Z)</option>
              </select>
            </div>
          </div>

          {/* Category Tabs (segmented controls) */}
          <div className="pt-3 border-t border-[#DDD8CF] flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={`px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#292824] text-[#FAF9F6]'
                  : 'text-[#77736D] hover:text-[#292824] hover:bg-[#F2EFE8]'
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'bg-[#292824] text-[#FAF9F6]'
                    : 'text-[#77736D] hover:text-[#292824] hover:bg-[#F2EFE8]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter and Active Filter Tags */}
        <div className="flex items-center justify-between mb-8 text-[11px] uppercase tracking-[0.14em] text-[#77736D]">
          <div>
            Showing <span className="font-semibold text-[#292824]">{filteredArticles.length}</span> of 10 guides
            {selectedCategory !== 'all' && (
              <span> in <strong className="text-[#A85F4B]">{CATEGORIES.find((c) => c.slug === selectedCategory)?.name}</strong></span>
            )}
            {searchQuery && (
              <span> matching &ldquo;<strong className="text-[#292824]">{searchQuery}</strong>&rdquo;</span>
            )}
          </div>

          {(selectedCategory !== 'all' || searchQuery) && (
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-[#A85F4B] hover:text-[#292824] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset filters</span>
            </button>
          )}
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          /* Empty Results State */
          <div className="bg-[#FAF9F6] border border-[#DDD8CF] p-12 text-center max-w-md mx-auto my-12 space-y-4">
            <div className="w-12 h-12 bg-[#F2EFE8] text-[#77736D] mx-auto flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-serif font-normal text-[#292824]">
              No stationery guides found
            </h3>
            <p className="text-xs sm:text-sm text-[#77736D] leading-relaxed">
              We couldn’t find any articles matching your search query &ldquo;{searchQuery}&rdquo;. Try broader terms like &ldquo;pen&rdquo;, &ldquo;notebook&rdquo;, or &ldquo;journal&rdquo;.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#292824] text-[#FAF9F6] text-[11px] uppercase tracking-[0.14em] font-medium hover:bg-[#3D3A35] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>View all 10 articles</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
