import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Article } from '../types';

interface RelatedArticlesProps {
  articles: Article[];
}

export function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;

  return (
    <section className="mt-20 pt-14 border-t border-[#DDD8CF]">
      <div className="mb-10">
        <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block mb-1">
          Further Reading
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#292824]">
          Related Stationery Guides
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {articles.map((article) => (
          <RelatedCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}

function RelatedCard({ article }: { article: Article }) {
  const [error, setError] = useState(false);

  return (
    <article className="group bg-[#FAF9F6] border border-[#DDD8CF] overflow-hidden hover:border-[#292824] transition-all flex flex-col justify-between">
      <Link to={`/blogs/${article.slug}`} className="block relative bg-[#F2EFE8] aspect-16/10 overflow-hidden">
        {!error ? (
          <img
            src={article.image}
            alt={article.imageAlt}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setError(true)}
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center p-4 text-xs font-serif text-[#77736D]">
            {article.category}
          </div>
        )}
      </Link>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 text-[10px] text-[#A85F4B] uppercase tracking-[0.18em] font-medium mb-2">
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
            <span className="text-[#77736D]">{article.readTime}</span>
          </div>

          <h3 className="text-base font-serif font-normal text-[#292824] group-hover:text-[#A85F4B] transition-colors leading-snug line-clamp-2">
            <Link to={`/blogs/${article.slug}`}>
              {article.title}
            </Link>
          </h3>
        </div>

        <div className="mt-5 pt-3 border-t border-[#DDD8CF] flex items-center justify-between text-[11px] uppercase tracking-[0.14em]">
          <span className="text-[#77736D]">{article.date}</span>
          <Link
            to={`/blogs/${article.slug}`}
            className="inline-flex items-center gap-1 font-medium text-[#292824] hover:text-[#A85F4B]"
          >
            <span>Read</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </article>
  );
}
