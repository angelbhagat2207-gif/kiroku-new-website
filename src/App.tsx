import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogPage } from './pages/BlogPage';
import { ArticlePage } from './pages/ArticlePage';
import { CategoriesPage } from './pages/CategoriesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Helper to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C2623] font-sans selection:bg-[#EADBCE]">
        {/* Navigation Bar */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-1">
          <Routes>
            {/* Primary Navigation Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Individual Article Dynamic Routes */}
            <Route path="/blogs/:slug" element={<ArticlePage />} />
            <Route path="/blog/:slug" element={<ArticlePage />} />

            {/* Unmatched 404 Route */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
