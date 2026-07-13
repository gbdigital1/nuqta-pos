/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Language } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import Business from './pages/Business';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import Legal from './pages/Legal';
import Terms from './pages/Terms';
import PrivacyPolicy from './pages/PrivacyPolicy';

export default function App() {
  // Language state initialization
  const [lang, setLang] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('lang') as Language;
      if (savedLang === 'en' || savedLang === 'fr' || savedLang === 'ar') {
        return savedLang;
      }
    }
    return 'fr'; // default to English
  });

  // Page routing state (Home by default)
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Synchronize language selection to local storage
  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  // Sync route on page load / back-forward navigation based on the real URL path
  useEffect(() => {
    const validPages = ['home', 'features', 'pricing', 'business', 'contact', 'admin'];

    const handleLocation = () => {
      const path = window.location.pathname.replace(/^\//, '').replace(/\/$/, '');
      setCurrentPage(path && validPages.includes(path) ? path : 'home');
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
    const path = pageId === 'home' ? '/' : `/${pageId}`;
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Apply visual RTL dir or LTR dir classes dynamically
  const isRtl = lang === 'ar';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200 selection:bg-[var(--accent)] selection:text-white ${isRtl ? 'font-sans text-right' : 'font-sans text-left'
        }`}
    >

      {/* Dynamic Header / Navbar */}
      {currentPage !== 'admin' &&
        <Navbar
          lang={lang}
          setLang={handleSetLang}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      }

      {/* Render active page with subtle fade in micro-transition */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + '_' + lang}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="w-full"
          >
            {currentPage === 'home' && <Home lang={lang} onPageChange={handlePageChange} />}
            {currentPage === 'features' && <Features lang={lang} onPageChange={handlePageChange} />}
            {currentPage === 'pricing' && <Pricing lang={lang} onPageChange={handlePageChange} />}
            {currentPage === 'business' && <Business lang={lang} onPageChange={handlePageChange} />}
            {currentPage === 'contact' && <Contact lang={lang} />}
            {currentPage === 'admin' && <Admin lang={lang} onPageChange={handlePageChange} />}
            {currentPage === 'legal' && <Legal lang={lang} onPageChange={handlePageChange} />}
            {currentPage === 'terms' && <Terms lang={lang} onPageChange={handlePageChange} />}
            {currentPage === 'privacy' && <PrivacyPolicy lang={lang} onPageChange={handlePageChange} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Shared Footer block component */}
      {currentPage !== 'admin' && <Footer lang={lang} onPageChange={handlePageChange} />}

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}