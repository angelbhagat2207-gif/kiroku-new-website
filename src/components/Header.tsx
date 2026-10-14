import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ArrowRight } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/blogs?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Articles', path: '/blogs' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#DDD8CF] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 gap-8">
            {/* Zone 1: Brand Wordmark */}
            <div className="flex items-center gap-3 shrink-0">
              <Link to="/" className="group flex items-baseline gap-2.5 text-decoration-none">
                <span className="text-2xl sm:text-3xl font-serif font-normal tracking-wide text-[#292824] group-hover:text-[#A85F4B] transition-colors">
                  Kiroku
                </span>
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#77736D] hidden md:inline" aria-hidden="true">
                  記録 · Small things. Beautifully written.
                </span>
              </Link>
            </div>

            {/* Zone 2: Navigation Links (Restrained, small uppercase sans-serif) */}
            <nav className="hidden md:flex items-center gap-8 text-[12px] font-medium tracking-[0.16em] uppercase text-[#77736D]" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`transition-colors py-1 ${
                    isActive(link.path)
                      ? 'text-[#292824] border-b border-[#292824]'
                      : 'hover:text-[#292824]'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Zone 3: Search & Actions */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-[#77736D] hover:text-[#292824] rounded-full hover:bg-[#F2EFE8] transition-colors focus-visible:outline-none"
                aria-label="Search articles"
                title="Search articles"
              >
                <Search className="w-4 h-4" />
              </button>

              <Link
                to="/blogs/best-japanese-stationery"
                className="hidden lg:inline-flex items-center gap-1.5 px-4 py-2 text-[11px] font-medium tracking-[0.14em] uppercase text-[#292824] border border-[#DDD8CF] hover:border-[#292824] hover:bg-[#292824] hover:text-[#FAF9F6] transition-all whitespace-nowrap"
              >
                <span>Essentials Guide</span>
                <ArrowRight className="w-3 h-3" />
              </Link>

              {/* Mobile hamburger toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[#77736D] hover:text-[#292824] hover:bg-[#F2EFE8] rounded-md transition-colors"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Inline Search Bar Dropdown */}
        {searchOpen && (
          <div className="border-t border-[#DDD8CF] bg-[#F2EFE8] px-4 py-3 sm:px-6">
            <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#77736D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search articles, pens, notebooks, brands..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-9 pr-4 py-2 text-sm bg-[#FAF9F6] border border-[#DDD8CF] text-[#292824] placeholder-[#77736D] focus:outline-none focus:border-[#292824]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-[#FAF9F6] bg-[#292824] hover:bg-[#3D3A35] transition-colors whitespace-nowrap"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="p-2 text-[#77736D] hover:text-[#292824]"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Mobile slide-out drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-[#292824]/40 backdrop-blur-xs flex justify-end">
          <div className="w-4/5 max-w-sm bg-[#FAF9F6] h-full shadow-xl p-6 flex flex-col justify-between border-l border-[#DDD8CF]">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#DDD8CF]">
                <div>
                  <span className="text-2xl font-serif font-normal text-[#292824]">Kiroku</span>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-[#77736D] mt-0.5">Small things. Beautifully written.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#77736D] hover:text-[#292824]"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`py-2 text-[13px] uppercase tracking-[0.16em] font-medium transition-colors border-b border-[#DDD8CF]/40 ${
                      isActive(link.path)
                        ? 'text-[#292824] font-semibold'
                        : 'text-[#77736D] hover:text-[#292824]'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#DDD8CF]">
              <Link
                to="/blogs/best-japanese-stationery"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#292824] text-[#FAF9F6] text-xs font-medium uppercase tracking-[0.14em] hover:bg-[#3D3A35] transition-colors"
              >
                <span>Read Essentials Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <p className="text-center text-[11px] text-[#77736D] mt-4">
                © {new Date().getFullYear()} Kiroku Editorial
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
