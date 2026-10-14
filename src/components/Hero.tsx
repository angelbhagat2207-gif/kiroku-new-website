import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section className="relative overflow-hidden py-16 md:py-24 lg:py-28 border-b border-[#DDD8CF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Headline & Minimal CTA */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8">
            <div className="space-y-3">
              <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[#A85F4B] block">
                Independent Japanese Stationery Journal
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-[68px] font-serif font-light text-[#292824] tracking-tight leading-[1.1] text-balance">
                Small things. Beautifully written.
              </h1>
            </div>

            <p className="text-[15px] sm:text-base text-[#77736D] leading-relaxed max-w-lg font-normal">
              A quiet archive exploring the tactile poetry of Japanese notebooks, precision pens, delicate washi tapes, and mindful desk rituals.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                to="/blogs"
                className="inline-flex items-center gap-2 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-[#FAF9F6] bg-[#292824] hover:bg-[#3D3A35] transition-colors group"
              >
                <span>Explore the Journal</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              <Link
                to="/blogs/best-japanese-stationery"
                className="inline-flex items-center gap-2 px-6 py-3 text-[12px] font-medium uppercase tracking-[0.16em] text-[#292824] bg-transparent hover:bg-[#F2EFE8] border border-[#DDD8CF] hover:border-[#292824] transition-colors"
              >
                <span>Starter Guide</span>
              </Link>
            </div>

            {/* Subtle editorial metadata */}
            <div className="pt-8 border-t border-[#DDD8CF] flex flex-wrap items-center gap-6 text-[11px] uppercase tracking-[0.14em] text-[#77736D]">
              <span>10 Curated In-Depth Guides</span>
              <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
              <span>Paper & Nib Science</span>
              <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
              <span>Analog Mindfulness</span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden border border-[#DDD8CF] bg-[#F2EFE8] aspect-4/3 sm:aspect-16/11">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-[#F2EFE8] animate-pulse flex items-center justify-center text-[12px] uppercase tracking-[0.16em] text-[#77736D]">
                  Loading Japanese stationery study...
                </div>
              )}
              <img
                src="/images/homepage.jpg"
                alt="Minimalist Japanese stationery desk with notebook and writing tools"
                referrerPolicy="no-referrer"
                loading="eager"
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-opacity duration-700 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              />
              <div className="absolute bottom-3 left-3 bg-[#FAF9F6]/90 backdrop-blur-xs px-3 py-1.5 text-[11px] uppercase tracking-[0.14em] text-[#77736D] border border-[#DDD8CF]">
                Desk Study · Kiroku Archive
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
