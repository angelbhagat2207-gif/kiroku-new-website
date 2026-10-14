import { useState, useMemo } from 'react';
import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  Share2,
  Check,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Lightbulb,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { TableOfContents } from '../components/TableOfContents';
import { RelatedArticles } from '../components/RelatedArticles';
import { SEOHead } from '../components/SEOHead';
import { getArticleBySlug, getAllArticles, getRelatedArticles } from '../data/articles';

export function ArticlePage() {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // Robust slug resolution: from route param :slug or parsed from pathname
  const slug = useMemo(() => {
    if (paramSlug) return paramSlug;
    const pathname = location.pathname || window.location.pathname;
    const match = pathname.match(/\/(?:blogs|blog)\/([^/?#]+)/);
    if (match && match[1]) return match[1];
    const parts = pathname.split('/').filter(Boolean);
    return parts.length > 0 ? parts[parts.length - 1] : undefined;
  }, [paramSlug, location.pathname]);

  const article = useMemo(() => {
    return slug ? getArticleBySlug(slug) : undefined;
  }, [slug]);

  const allArticles = useMemo(() => getAllArticles(), []);

  // Compute previous and next articles
  const { prevArticle, nextArticle } = useMemo(() => {
    if (!article) return { prevArticle: null, nextArticle: null };
    const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
    const prev = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
    const next = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
    return { prevArticle: prev, nextArticle: next };
  }, [article, allArticles]);

  const relatedArticles = useMemo(() => {
    return article ? getRelatedArticles(article.slug, 3) : [];
  }, [article]);

  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [imgError, setImgError] = useState(false);

  // If article not found, render a clean fallback
  if (!article) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-serif font-light text-[#292824]">Guide Not Found</h1>
        <p className="mt-4 text-[#77736D]">
          The stationery guide you are looking for may have been moved or updated.
        </p>
        <div className="mt-8">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#292824] text-[#FAF9F6] text-[11px] uppercase tracking-[0.14em] font-medium hover:bg-[#3D3A35]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to All Guides</span>
          </Link>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle,
          url,
        });
      } catch {
        copyToClipboard(url);
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <SEOHead
        title={article.seoTitle}
        description={article.seoDescription}
        canonicalPath={`/blogs/${article.slug}`}
        image={article.image}
        type="article"
        publishedTime={article.date}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: article.title,
          description: article.seoDescription,
          image: article.image,
          datePublished: '2026-10-01T08:00:00+09:00',
          dateModified: '2026-10-12T08:00:00+09:00',
          author: {
            '@type': 'Organization',
            name: 'Kiroku Editorial',
            url: 'https://kiroku-stationery.vercel.app',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Kiroku',
            logo: {
              '@type': 'ImageObject',
              url: 'https://kiroku-stationery.vercel.app/images/hero-japanese-stationery.jpg',
            },
          },
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://kiroku-stationery.vercel.app/blogs/${article.slug}`,
          },
        }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.16em] text-[#77736D] mb-10" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-[#292824] transition-colors">Home</Link>
          <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
          <Link to="/blogs" className="hover:text-[#292824] transition-colors">Archive</Link>
          <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
          <Link
            to={`/blogs?category=${article.categorySlug}`}
            className="hover:text-[#A85F4B] transition-colors text-[#A85F4B]"
          >
            {article.category}
          </Link>
        </nav>

        {/* Header Section */}
        <header className="space-y-5 mb-10">
          <div className="flex items-center gap-3 text-[11px] text-[#A85F4B] font-medium tracking-[0.2em] uppercase">
            <span>{article.category}</span>
            <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
            <span className="text-[#77736D] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {article.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[52px] font-serif font-light text-[#292824] tracking-tight leading-[1.12] text-balance">
            {article.title}
          </h1>

          <p className="text-[17px] sm:text-lg text-[#77736D] leading-relaxed font-light">
            {article.subtitle}
          </p>

          {/* Author and Action bar */}
          <div className="pt-6 border-t border-[#DDD8CF] flex flex-wrap items-center justify-between gap-4 text-[11px] uppercase tracking-[0.14em] text-[#77736D]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#F2EFE8] border border-[#DDD8CF] text-[#292824] flex items-center justify-center font-serif text-sm">
                K
              </div>
              <div>
                <span className="font-medium text-[#292824] block">Kiroku Editorial</span>
                <span className="text-[11px] text-[#77736D] flex items-center gap-1 lowercase">
                  <Calendar className="w-3 h-3" />
                  {article.date}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#DDD8CF] hover:border-[#292824] text-[#292824] transition-colors cursor-pointer"
                aria-label="Share article"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#A85F4B]" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Link Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="my-10 overflow-hidden border border-[#DDD8CF] bg-[#F2EFE8] aspect-16/10">
          {!imgError ? (
            <img
              src={article.image}
              alt={article.imageAlt}
              referrerPolicy="no-referrer"
              loading="eager"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#F2EFE8] text-[#77736D] p-8 text-center text-sm font-serif">
              {article.imageAlt}
            </div>
          )}
        </div>
        <figcaption className="text-center text-[12px] text-[#77736D] italic -mt-6 mb-10">
          {article.imageAlt}
        </figcaption>

        {/* Direct Answer Box (AEO Optimization) */}
        {article.quickAnswerBox && (
          <div className="my-10 p-7 bg-[#F2EFE8] border border-[#DDD8CF]">
            <h2 className="text-base font-serif font-normal text-[#292824] mb-2 flex items-center gap-2">
              <Lightbulb className="w-4 h-4 text-[#A85F4B]" />
              <span>{article.quickAnswerBox.title}</span>
            </h2>
            <p className="text-[14px] text-[#292824] leading-relaxed mb-4">
              {article.quickAnswerBox.summary}
            </p>
            <ul className="space-y-1.5 text-xs text-[#77736D] list-disc list-inside">
              {article.quickAnswerBox.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="leading-normal">{takeaway}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Introduction Paragraphs */}
        <div className="prose-editorial text-[#292824] text-[16px] sm:text-[17px] leading-relaxed space-y-6">
          {article.intro.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        {/* Table of Contents */}
        <TableOfContents items={article.toc} />

        {/* Body Sections */}
        <div className="space-y-14 my-12">
          {article.sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#292824] tracking-tight pb-3 border-b border-[#DDD8CF] mb-5">
                {section.title}
              </h2>

              <div className="space-y-5 text-[15px] sm:text-[16px] text-[#292824] leading-relaxed">
                {section.content.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Subsections if present */}
              {section.subsections && (
                <div className="space-y-8 mt-8">
                  {section.subsections.map((sub) => (
                    <div key={sub.id} id={sub.id} className="scroll-mt-24">
                      <h3 className="text-xl font-serif font-normal text-[#292824] mb-3">
                        {sub.title}
                      </h3>
                      <div className="space-y-4 text-[15px] text-[#292824] leading-relaxed">
                        {sub.content.map((p, pIdx) => (
                          <p key={pIdx}>{p}</p>
                        ))}
                      </div>
                      {sub.tips && (
                        <div className="mt-4 p-4 bg-[#F2EFE8] border-l-2 border-[#A85F4B] text-xs text-[#77736D] leading-relaxed">
                          <strong className="text-[#292824] uppercase tracking-wider block mb-1">Practical Tip:</strong>
                          {sub.tips}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Practical Tips Box */}
              {section.tips && (
                <div className="my-8 p-5 bg-[#F2EFE8] border border-[#DDD8CF] text-xs sm:text-sm text-[#292824] flex items-start gap-3">
                  <Lightbulb className="w-4 h-4 text-[#A85F4B] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[11px] uppercase tracking-widest text-[#A85F4B] block mb-1 font-medium">Editorial Note & Tip</span>
                    <p className="text-[#77736D] leading-relaxed">{section.tips}</p>
                  </div>
                </div>
              )}

              {/* Comparison Table */}
              {section.table && (
                <div className="my-10 overflow-x-auto border border-[#DDD8CF] bg-[#FAF9F6]">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-[#F2EFE8] text-[#292824] border-b border-[#DDD8CF]">
                        {section.table.headers.map((h, hIdx) => (
                          <th key={hIdx} className="p-3.5 font-medium text-[11px] uppercase tracking-[0.1em]">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#DDD8CF]">
                      {section.table.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#F2EFE8]/50 transition-colors">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="p-3.5 text-[#292824]">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* FAQ Section */}
        {article.faqs && article.faqs.length > 0 && (
          <section id="frequently-asked-questions" className="my-16 pt-10 border-t border-[#DDD8CF] scroll-mt-24">
            <div className="mb-8">
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#292824]">
                Common Questions Answered
              </h2>
            </div>

            <div className="space-y-3">
              {article.faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={idx}
                    className="border border-[#DDD8CF] bg-[#FAF9F6]"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-serif font-normal text-lg text-[#292824] hover:bg-[#F2EFE8] transition-colors cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.question}</span>
                      <span className="text-[#77736D] shrink-0">
                        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-[#77736D] leading-relaxed border-t border-[#DDD8CF] bg-[#FAF9F6]">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Conclusion */}
        <section id="conclusion" className="my-14 p-8 bg-[#F2EFE8] border border-[#DDD8CF] scroll-mt-24">
          <h2 className="text-xl sm:text-2xl font-serif font-light text-[#292824] mb-4">
            Conclusion & Final Reflections
          </h2>
          <div className="space-y-4 text-sm sm:text-base text-[#292824] leading-relaxed">
            {article.conclusion.map((p, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: p.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[#A85F4B] underline decoration-1">$1</a>') }} />
            ))}
          </div>
        </section>

        {/* Previous and Next Article Navigation */}
        <nav className="my-14 pt-8 border-t border-[#DDD8CF] grid grid-cols-1 sm:grid-cols-2 gap-4" aria-label="Previous and Next Articles">
          {prevArticle ? (
            <Link
              to={`/blogs/${prevArticle.slug}`}
              className="group p-5 bg-[#FAF9F6] border border-[#DDD8CF] hover:border-[#292824] transition-all flex flex-col justify-between"
            >
              <div className="flex items-center gap-1 text-[11px] uppercase tracking-[0.14em] text-[#77736D] mb-2">
                <ChevronLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Guide</span>
              </div>
              <span className="font-serif font-normal text-base text-[#292824] group-hover:text-[#A85F4B] transition-colors line-clamp-1">
                {prevArticle.title}
              </span>
            </Link>
          ) : (
            <div />
          )}

          {nextArticle && (
            <Link
              to={`/blogs/${nextArticle.slug}`}
              className="group p-5 bg-[#FAF9F6] border border-[#DDD8CF] hover:border-[#292824] transition-all flex flex-col justify-between text-right"
            >
              <div className="flex items-center justify-end gap-1 text-[11px] uppercase tracking-[0.14em] text-[#77736D] mb-2">
                <span>Next Guide</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <span className="font-serif font-normal text-base text-[#292824] group-hover:text-[#A85F4B] transition-colors line-clamp-1">
                {nextArticle.title}
              </span>
            </Link>
          )}
        </nav>

        {/* Related Articles */}
        <RelatedArticles articles={relatedArticles} />

        {/* Back to Blog Button */}
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-2 px-8 py-3 border border-[#DDD8CF] hover:border-[#292824] text-[#292824] text-[11px] uppercase tracking-[0.16em] font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Browse All Stationery Guides</span>
          </button>
        </div>
      </article>
    </>
  );
}
