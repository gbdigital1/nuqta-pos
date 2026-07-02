import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import nuqta_icon1 from '../assets/logo/nuqta_icon1.png'

interface FooterProps {
  lang: Language;
  onPageChange: (page: string) => void;
}

export default function Footer({ lang, onPageChange }: FooterProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <footer className="bg-[var(--bg-surface)] border-t border-[var(--border)] py-16 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">

          {/* Logo Brand Info Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <img
                src={nuqta_icon1}
                height="32"
                alt="Nuqta POS logo"
                className="h-25 w-auto"
                referrerPolicy="no-referrer"
              />
              <span className="font-extrabold text-lg text-[var(--text-primary)]">
                Nuqta <span className="text-[var(--accent)]">POS</span>
              </span>
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              {t.footerDescription}
            </p>

          </div>

          {/* Product Items Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-primary)] mb-4">
              {t.footerProduct}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[var(--text-secondary)]">
              <li><button onClick={() => onPageChange('features')} className="hover:text-[var(--accent)] tracking-tight cursor-pointer">{t.footerFeaturesLink}</button></li>
              <li><button onClick={() => onPageChange('pricing')} className="hover:text-[var(--accent)] tracking-tight cursor-pointer">{t.footerPricingLink}</button></li>
              <li><button onClick={() => onPageChange('business')} className="hover:text-[var(--accent)] tracking-tight cursor-pointer">{t.footerBusinessLink}</button></li>
            </ul>
          </div>

          {/* Company + Support merged column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-primary)] mb-4">
              {t.footerCompany}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[var(--text-secondary)]">
              <li><a href="#about" className="hover:text-[var(--accent)] tracking-tight">{t.footerAbout}</a></li>
              <li><a href="#blog" className="hover:text-[var(--accent)] tracking-tight">{t.footerBlog}</a></li>
              <li><a href="#help" className="hover:text-[var(--accent)] tracking-tight">{t.footerHelp}</a></li>
              <li><button onClick={() => onPageChange('contact')} className="hover:text-[var(--accent)] tracking-tight text-left cursor-pointer">{t.navContact}</button></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--text-primary)] mb-4">
              {isRtl ? 'الشؤون القانونية' : lang === 'en' ? 'Legal' : 'Légal'}
            </h4>
            <ul className="space-y-2.5 text-xs font-semibold text-[var(--text-secondary)]">
              <li>
                <button onClick={() => onPageChange('privacy')} className="hover:text-[var(--accent)] tracking-tight text-left cursor-pointer">
                  {isRtl ? 'الخصوصية' : lang === 'en' ? 'Privacy Policy' : 'Confidentialité'}
                </button>
              </li>
              <li>
                <button onClick={() => onPageChange('terms')} className="hover:text-[var(--accent)] tracking-tight text-left cursor-pointer">
                  {isRtl ? 'الشروط والأحكام' : lang === 'en' ? 'Terms & Conditions' : 'Conditions Générales (CGU-CGV)'}
                </button>
              </li>
              <li>
                <button onClick={() => onPageChange('legal')} className="hover:text-[var(--accent)] tracking-tight text-left cursor-pointer">
                  {isRtl ? 'إشعار قانوني' : lang === 'en' ? 'Legal Notice' : 'Mentions légales'}
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Brand Bottom Bar Row */}
        <div className="pt-8 border-t border-[var(--border)] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted)] font-semibold">
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <p>{t.footerRights}</p>
            <span className="hidden sm:inline text-[var(--border)]">•</span>
            <span className="inline-flex items-center gap-1.5 text-[var(--text-muted)]">
              <svg className="w-3 h-3 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l7 3v6c0 4.97-3.13 8.94-7 10-3.87-1.06-7-5.03-7-10V5l7-3z" />
              </svg>
              {t.footerPoweredByCredit}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* X / Twitter */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M2.201 21h4.566V8.044H2.201V21zm2.28-14.739c1.55 0 2.515-1.026 2.515-2.31C6.966 2.624 6.029 1.62 4.51 1.62C2.993 1.62 2 2.624 2 3.951c0 1.284.965 2.31 2.451 2.31h.03zM21.197 21h-4.565v-7.3c0-1.836-.656-3.088-2.299-3.088-1.254 0-2.002.844-2.33 1.659-.119.292-.149.7-.149 1.109V21H7.29s.06-11.745 0-12.956h4.566v1.832c.606-.936 1.69-2.27 4.116-2.27 3.006 0 5.26 1.966 5.26 6.186V21z" />
              </svg>
            </a>
            {/* Instagram */}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>
          </div>
        </div>

        {/* GB Digital CTA — separated from the legal bar so it reads as a distinct credit line */}
        <div className="mt-6 pt-6 border-t border-[var(--border)]/60 flex justify-center">

          <a href="https://gb-digital.net/"
            target="_blank"
            rel="noopener noreferrer"
            dir={isRtl ? 'rtl' : 'ltr'}
            className="group relative inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-elevated,rgba(0,0,0,0.02))] px-5 py-2.5 text-[11px] font-semibold text-[var(--text-secondary)] shadow-sm transition-all duration-300 hover:border-[var(--accent)]/50 hover:shadow-[0_0_24px_-4px_var(--accent)] hover:-translate-y-0.5"
          >
            <span className="tracking-wide">{t.footerPoweredBy}</span>

            <span className="relative font-extrabold tracking-tight bg-gradient-to-r from-[var(--accent)] via-fuchsia-500 to-[var(--accent)] bg-[length:200%_auto] bg-clip-text text-transparent transition-[background-position] duration-700 group-hover:bg-[position:100%_0]">
              GB Digital
            </span>

            <svg
              className={`w-3.5 h-3.5 stroke-[var(--accent)] transition-transform duration-300 ${isRtl
                ? 'rotate-180 group-hover:-translate-x-1'
                : 'group-hover:translate-x-1'
                } group-hover:-translate-y-0.5`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
            </svg>

            {/* soft glow ring on hover */}
            <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-transparent group-hover:ring-[var(--accent)]/30 transition-all duration-300" />
          </a>
        </div>

      </div>
    </footer >
  );
}