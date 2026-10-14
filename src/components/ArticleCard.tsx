import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Article } from '../types';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const [imgError, setImgError] = useState(false);

  if (featured) {
    return (
      <article className="group relative bg-[#FAF9F6] border border-[#DDD8CF] overflow-hidden transition-all hover:border-[#292824]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          <div className="lg:col-span-7 relative overflow-hidden bg-[#F2EFE8] aspect-16/10 lg:aspect-auto min-h-[300px]">
            {!imgError ? (
              <img
                src={article.image}
                alt={article.imageAlt}
                referrerPolicy="no-referrer"
                loading="lazy"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-[#F2EFE8] text-[#77736D] p-8 text-center text-sm font-serif">
                {article.title}
              </div>
            )}
          </div>

          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              {/* Restrained metadata kicker */}
              <div className="flex items-center gap-3 text-[11px] text-[#A85F4B] font-medium tracking-[0.2em] uppercase mb-4">
                <span>{article.category}</span>
                <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
                <span className="text-[#77736D]">{article.readTime}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-[34px] font-serif font-light text-[#292824] group-hover:text-[#A85F4B] transition-colors leading-[1.2] tracking-tight">
                <Link to={`/blogs/${article.slug}`}>
                  {article.title}
                </Link>
              </h2>

              <p className="mt-4 text-[14px] sm:text-[15px] text-[#77736D] leading-relaxed line-clamp-3 font-normal">
                {article.excerpt}
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#DDD8CF] flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#77736D]">
              <span>{article.date}</span>

              <Link
                to={`/blogs/${article.slug}`}
                className="inline-flex items-center gap-1 font-medium text-[#292824] hover:text-[#A85F4B] transition-colors"
                aria-label={`Read ${article.title}`}
              >
                <span>Read guide</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col bg-[#FAF9F6] border border-[#DDD8CF] overflow-hidden hover:border-[#292824] transition-all">
      {/* Thumbnail */}
      <Link to={`/blogs/${article.slug}`} className="block relative overflow-hidden bg-[#F2EFE8] aspect-4/3">
        {!imgError ? (
          <img
            src={article.image}
            alt={article.imageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#F2EFE8] text-[#77736D] p-4 text-center text-xs font-serif">
            {article.category}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Metadata */}
          <div className="flex items-center gap-2.5 text-[11px] text-[#A85F4B] font-medium tracking-[0.18em] uppercase mb-3">
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
            <span className="text-[#77736D]">{article.readTime}</span>
          </div>

          <h3 className="text-xl sm:text-[22px] font-serif font-normal text-[#292824] group-hover:text-[#A85F4B] transition-colors leading-[1.25] line-clamp-2">
            <Link to={`/blogs/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="mt-3 text-[14px] text-[#77736D] leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        </div>

        {/* Card Footer */}
        <div className="pt-4 mt-6 border-t border-[#DDD8CF] flex items-center justify-between text-[11px] uppercase tracking-[0.14em] text-[#77736D]">
          <span>{article.date}</span>

          <Link
            to={`/blogs/${article.slug}`}
            className="inline-flex items-center gap-1 font-medium text-[#292824] hover:text-[#A85F4B] transition-colors"
          >
            <span>Read</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
