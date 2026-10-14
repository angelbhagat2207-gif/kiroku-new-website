import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SEOHead } from '../components/SEOHead';

export function AboutPage() {
  return (
    <>
      <SEOHead
        title="About Kiroku — Japanese Stationery Journal & Philosophy"
        description="Learn the story behind Kiroku: an independent editorial publication dedicated to Japanese stationery, thoughtful journaling, and desk mindfulness."
        canonicalPath="/about"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        {/* Header */}
        <div className="space-y-4 mb-12 pb-8 border-b border-[#DDD8CF]">
          <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#A85F4B] block">
            About The Publication
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-serif font-light text-[#292824] tracking-tight leading-[1.12]">
            Small things. Beautifully written.
          </h1>
          <p className="text-[16px] sm:text-lg text-[#77736D] font-light max-w-2xl leading-relaxed">
            Welcome to Kiroku (記録) — an independent digital magazine and archive celebrating the quiet poetry, mechanical ingenuity, and tactile pleasure of Japanese stationery.
          </p>
        </div>

        {/* Story Section */}
        <div className="prose-editorial text-[#292824] text-[16px] leading-relaxed space-y-6">
          <p>
            The name <strong>Kiroku (記録)</strong> translates from Japanese as <em>record</em>, <em>document</em>, or <em>chronicle</em>. In an era dominated by relentless screens, instant notifications, and disposable software, we believe that analog writing is not an obsolete relic—it is an essential act of mindfulness.
          </p>
          <p>
            When you pick up a needlepoint gel pen that glides without skipping, open an unbleached cream notebook that lays completely flat at 180 degrees, or tear a strip of natural mulberry washi tape, something profound occurs: your breathing slows down, your thoughts find physical form, and the frantic pace of the digital world recedes.
          </p>

          <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#292824] pt-6 pb-2 border-b border-[#DDD8CF]">
            Our Three Guiding Philosophies
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-10">
            <div className="p-7 bg-[#FAF9F6] border border-[#DDD8CF] space-y-3">
              <div className="w-9 h-9 bg-[#F2EFE8] text-[#292824] flex items-center justify-center font-serif text-sm">
                物
              </div>
              <h3 className="font-serif font-normal text-lg text-[#292824]">Monozukuri (ものづくり)</h3>
              <p className="text-xs text-[#77736D] leading-relaxed">
                The spirit of manufacturing with pride, reverence, and relentless continuous refinement. We honor the chemists, engineers, and artisans who spend years perfecting a single pen tip.
              </p>
            </div>

            <div className="p-7 bg-[#FAF9F6] border border-[#DDD8CF] space-y-3">
              <div className="w-9 h-9 bg-[#F2EFE8] text-[#292824] flex items-center justify-center font-serif text-sm">
                寂
              </div>
              <h3 className="font-serif font-normal text-lg text-[#292824]">Wabi-Sabi (侘寂)</h3>
              <p className="text-xs text-[#77736D] leading-relaxed">
                Finding peace in imperfection, transience, and simplicity. We encourage journaling free from performative social media pressure: imperfect handwriting is real human life.
              </p>
            </div>

            <div className="p-7 bg-[#FAF9F6] border border-[#DDD8CF] space-y-3">
              <div className="w-9 h-9 bg-[#F2EFE8] text-[#292824] flex items-center justify-center font-serif text-sm">
                間
              </div>
              <h3 className="font-serif font-normal text-lg text-[#292824]">Ma (間)</h3>
              <p className="text-xs text-[#77736D] leading-relaxed">
                The conscious appreciation of negative space. On a notebook page as on a study desk, what you choose to leave empty is just as important as what you fill.
              </p>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-light text-[#292824] pt-6 pb-2 border-b border-[#DDD8CF]">
            Our Editorial Standards & Testing Methodology
          </h2>
          <p>
            Every guide published on Kiroku is written from genuine, firsthand experience with Japanese stationery instruments. We test pens across various paper weights (from 52gsm Tomoe River to 100gsm Life Noble), evaluate ink drying times under diverse humidity levels, and examine mechanical tolerances.
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-[#77736D]">
            <li><strong className="text-[#292824]">Zero Artificial Rankings:</strong> We do not publish arbitrary sponsor-driven lists. We evaluate tools objectively based on their paper compatibility, grip ergonomics, and ink chemistry.</li>
            <li><strong className="text-[#292824]">Accurate Product Specifications:</strong> Every nib millimeter, page count, and binding technique is verified against original manufacturer specifications.</li>
            <li><strong className="text-[#292824]">Accessible & Inclusive:</strong> We believe exceptional stationery should be accessible. Alongside luxury fountain pens and brass ware, we celebrate classroom staples like the Zebra Sarasa and Kokuyo Campus.</li>
          </ul>
        </div>

        {/* Call to action */}
        <div className="mt-16 pt-10 border-t border-[#DDD8CF] flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-serif font-light text-xl text-[#292824] block">Ready to explore?</span>
            <p className="text-xs text-[#77736D]">Discover our complete library of ten comprehensive guides.</p>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#292824] hover:bg-[#3D3A35] text-[#FAF9F6] text-[11px] uppercase tracking-[0.16em] font-medium transition-colors"
          >
            <span>Read All Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </>
  );
}
