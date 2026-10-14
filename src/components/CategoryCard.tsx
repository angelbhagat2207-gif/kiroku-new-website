import { Link } from 'react-router-dom';
import { PenTool, Book, BookOpen, Sparkles, GraduationCap, LayoutGrid } from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const getIcon = (slug: string) => {
    switch (slug) {
      case 'pens-and-writing-tools':
        return <PenTool className="w-4 h-4 text-[#A85F4B]" />;
      case 'notebooks-and-paper':
        return <Book className="w-4 h-4 text-[#A85F4B]" />;
      case 'journaling':
        return <BookOpen className="w-4 h-4 text-[#A85F4B]" />;
      case 'stationery-brands':
        return <Sparkles className="w-4 h-4 text-[#A85F4B]" />;
      case 'study-essentials':
        return <GraduationCap className="w-4 h-4 text-[#A85F4B]" />;
      case 'desk-aesthetics':
        return <LayoutGrid className="w-4 h-4 text-[#A85F4B]" />;
      default:
        return <BookOpen className="w-4 h-4 text-[#A85F4B]" />;
    }
  };

  return (
    <Link
      to={`/blogs?category=${category.slug}`}
      className="group block p-7 bg-[#FAF9F6] border border-[#DDD8CF] hover:border-[#292824] transition-all"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="p-2.5 bg-[#F2EFE8] group-hover:bg-[#EAE5DC] transition-colors">
          {getIcon(category.slug)}
        </div>
        <span className="text-[11px] uppercase tracking-[0.16em] text-[#77736D]">
          {category.count} {category.count === 1 ? 'Guide' : 'Guides'}
        </span>
      </div>

      <h3 className="text-xl sm:text-[22px] font-serif font-normal text-[#292824] group-hover:text-[#A85F4B] transition-colors leading-snug">
        {category.name}
      </h3>

      <p className="mt-2.5 text-[14px] text-[#77736D] leading-relaxed line-clamp-2">
        {category.description}
      </p>

      <div className="mt-6 pt-4 border-t border-[#DDD8CF] flex items-center justify-between text-[11px] uppercase tracking-[0.16em] font-medium text-[#292824] group-hover:text-[#A85F4B] transition-colors">
        <span>Explore discipline</span>
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </div>
    </Link>
  );
}
