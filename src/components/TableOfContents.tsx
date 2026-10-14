import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { TOCItem } from '../types';

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0% -60% 0%' }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className="my-10 p-7 bg-[#F2EFE8] border border-[#DDD8CF] text-sm" aria-label="Table of Contents">
      <div className="flex items-center justify-between pb-3 border-b border-[#DDD8CF]">
        <div className="font-serif font-normal text-lg text-[#292824]">
          Index of Contents
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="text-[11px] uppercase tracking-[0.14em] text-[#77736D] hover:text-[#292824] flex items-center gap-1 cursor-pointer"
          aria-expanded={!collapsed}
        >
          <span>{collapsed ? 'Show' : 'Hide'}</span>
          {collapsed ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
        </button>
      </div>

      {!collapsed && (
        <ol className="mt-5 space-y-2.5 list-none pl-0">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={`${item.level === 3 ? 'pl-4 text-[13px]' : 'text-[14px]'}`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`block py-0.5 transition-colors ${
                    isActive
                      ? 'text-[#A85F4B] font-medium'
                      : 'text-[#77736D] hover:text-[#292824]'
                  }`}
                >
                  {item.title}
                </a>
              </li>
            );
          })}
        </ol>
      )}
    </nav>
  );
}
