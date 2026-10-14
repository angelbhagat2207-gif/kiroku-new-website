import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F2EFE8] border-t border-[#DDD8CF] text-[#292824] pt-20 pb-14 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16 pb-16 border-b border-[#DDD8CF]">
          
          {/* Column 1: Brand & Manifesto */}
          <div className="md:col-span-1 space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl sm:text-3xl font-serif font-normal text-[#292824]">Kiroku</span>
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#77736D] block mt-1">
                記録 · Japanese Stationery Journal
              </span>
            </Link>
            <p className="text-[14px] text-[#77736D] leading-relaxed">
              Small things. Beautifully written. An independent publication celebrating the tactile poetry, precision engineering, and tranquil design of Japanese stationery.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#292824] mb-5">
              Archive Index
            </h3>
            <ul className="space-y-3 text-[13px]">
              <li>
                <Link to="/" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  All 10 Guides
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  Disciplines & Categories
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  About Kiroku
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  Letters to the Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Featured Guides */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#292824] mb-5">
              Essential Guides
            </h3>
            <ul className="space-y-3 text-[13px]">
              <li>
                <Link to="/blogs/best-japanese-stationery" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  Stationery Essentials
                </Link>
              </li>
              <li>
                <Link to="/blogs/best-japanese-pens" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  Best Everyday Pens
                </Link>
              </li>
              <li>
                <Link to="/blogs/japanese-notebooks-guide" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  Notebooks & Paper Guide
                </Link>
              </li>
              <li>
                <Link to="/blogs/how-to-start-a-japanese-journal" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  How to Start a Journal
                </Link>
              </li>
              <li>
                <Link to="/blogs/japanese-desk-organization" className="text-[#77736D] hover:text-[#292824] transition-colors">
                  Desk Organization Rituals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Notes */}
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#292824] mb-5">
              Editorial Notes
            </h3>
            <p className="text-[14px] text-[#77736D] mb-4 leading-relaxed">
              Curated independently with reverence for Japanese analog craft and paper culture.
            </p>
            <div className="pt-2 text-[11px] uppercase tracking-[0.16em] text-[#77736D]">
              Tokyo · Kyoto · Worldwide
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] uppercase tracking-[0.14em] text-[#77736D]">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Kiroku Editorial</span>
            <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
            <Link to="/about" className="hover:text-[#292824] transition-colors">
              Editorial Policy
            </Link>
            <span aria-hidden="true" className="text-[#DDD8CF]">/</span>
            <Link to="/contact" className="hover:text-[#292824] transition-colors">
              Inquiries
            </Link>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-1.5 px-3 py-1.5 border border-[#DDD8CF] hover:border-[#292824] text-[#292824] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
