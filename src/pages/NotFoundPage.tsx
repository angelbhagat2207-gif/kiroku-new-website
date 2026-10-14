import { Link } from 'react-router-dom';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function NotFoundPage() {
  return (
    <div className="py-24 md:py-36 text-center max-w-xl mx-auto px-4">
      <SEOHead
        title="Page Not Found (404) — Kiroku"
        description="The requested page could not be found on Kiroku."
        canonicalPath="/404"
      />
      
      <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block mb-2">
        404 · Unwritten Page
      </span>
      <h1 className="text-4xl sm:text-5xl font-serif font-light text-[#292824] mb-4">
        Blank Margin
      </h1>
      <p className="text-[15px] text-[#77736D] leading-relaxed mb-8">
        The leaf or page you were looking for is not in our journal, or may have been repositioned like a strip of washi tape.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#292824] hover:bg-[#3D3A35] text-[#FAF9F6] text-[11px] uppercase tracking-[0.16em] font-medium transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return Home</span>
        </Link>
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 px-6 py-3 bg-transparent hover:bg-[#F2EFE8] text-[#292824] text-[11px] uppercase tracking-[0.16em] font-medium transition-colors border border-[#DDD8CF]"
        >
          <BookOpen className="w-3.5 h-3.5 text-[#A85F4B]" />
          <span>Explore All Guides</span>
        </Link>
      </div>
    </div>
  );
}
