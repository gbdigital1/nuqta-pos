import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import nuqta_icon from '../assets/logo/nuqta_icon.svg'
import nuqta_logo from '../assets/logo/nuqta_black.svg'

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Navbar({
  lang,
  setLang,
  currentPage,
  onPageChange
}: NavbarProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [hoveredSector, setHoveredSector] = useState(0);

  const sectors = [
    {
      id: 0,
      title: lang === 'en' ? 'Cafés & Coffee Shops' : lang === 'fr' ? 'Cafés & Salons de thé' : 'المقاهي ومحلات القهوة',
      desc: lang === 'en' ? 'Fast ticket modifier options, table/seating charts, and smart barista order displays.' : lang === 'fr' ? 'Options rapides, plans de table et écrans de préparation cuisine.' : 'طلب سريع، تعديل حجم المشروبات، الطاولات المباشرة، وشاشات المطبخ للباريستا.',
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=420&auto=format&fit=crop&q=80",
      tagline: lang === 'en' ? '⚡ Smooth Barista Workflows' : lang === 'fr' ? '⚡ Service Barista Ultra-fluide' : '⚡ خدمة باريستا فائقة السرعة'
    },
    {
      id: 1,
      title: lang === 'en' ? 'Boutiques & Fashion' : lang === 'fr' ? 'Boutiques & Mode' : 'محلات الموضة والألبسة',
      desc: lang === 'en' ? 'Matrix product variants, fitting-room holdings, and swift tag barcode printing.' : lang === 'fr' ? 'Matrices de variantes taille/couleur et édition directe de codes-barres.' : 'إدارة تتبع المقاسات والألوان، حجز الغرف، وطباعة ملصقات الباركود في ثوان.',
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=420&auto=format&fit=crop&q=80",
      tagline: lang === 'en' ? '👗 Seasonal Variant Controls' : lang === 'fr' ? '👗 Déclinaisons de Saisons Intuitives' : '👗 مصفوفة المقاسات والألوان المتقدمة'
    },
    {
      id: 2,
      title: lang === 'en' ? 'Supermarkets & Hypermarkets' : lang === 'fr' ? 'Supermarchés & Hypermarchés' : 'السوبر ماركت',
      desc: lang === 'en' ? 'Multi-till, multi-branch checkout at scale.' : lang === 'fr' ? 'Caisses multiples et multi-succursales à grande échelle.' : 'كاشيرات متعددة وفروع متعددة على نطاق واسع.',
      image: "https://res.cloudinary.com/dozujlxeg/image/upload/v1782997295/pexels-lifeofnacchi-4124939_va3nus.jpg",
      tagline: lang === 'en' ? '🏬 Multi-Till, Multi-Branch' : lang === 'fr' ? '🏬 Caisses & Succursales Multiples' : '🏬 كاشيرات وفروع متعددة'
    },
    {
      id: 3,
      title: lang === 'en' ? 'Tech & Electronics Stores' : lang === 'fr' ? 'Magasins High-Tech & Électronique' : 'محلات التكنولوجيا والإلكترونيات',
      desc: lang === 'en' ? 'Serial number & IMEI tracking across phones, laptops, PCs, and gaming rigs, with built-in warranty management.' : lang === 'fr' ? 'Suivi des numéros de série et IMEI pour téléphones, PC portables, ordinateurs de bureau et PC gamer.' : 'تتبع الأرقام التسلسلية وIMEI للهواتف واللابتوبات وأجهزة الكمبيوتر، مع إدارة الضمان المدمجة.',
      image: "https://res.cloudinary.com/dozujlxeg/image/upload/v1782998310/Popular_types_of_mobile_devices_-_Header_-_1500x500_p4krxv.jpg",
      tagline: lang === 'en' ? '💻 Serial & Warranty Tracking' : lang === 'fr' ? '💻 Suivi Série & Garanties' : '💻 تتبع الأرقام التسلسلية والضمان'
    },
    {
      id: 4,
      title: lang === 'en' ? 'Bakeries & Pastry Shops' : lang === 'fr' ? 'Boulangeries & Pâtisseries' : 'المخابز والحلويات',
      desc: lang === 'en' ? 'Pre-orders, custom cake pricing, and daily production counts.' : lang === 'fr' ? 'Précommandes, tarifs de gâteaux sur mesure, suivi de production.' : 'الطلبات المسبقة، تسعير الكيك المخصص، ومتابعة الإنتاج اليومي.',
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=420&auto=format&fit=crop&q=80",
      tagline: lang === 'en' ? '🥐 Pre-Orders & Custom Pricing' : lang === 'fr' ? '🥐 Précommandes & Tarifs Sur Mesure' : '🥐 الطلبات المسبقة والتسعير المخصص'
    },
    {
      id: 5,
      title: lang === 'en' ? 'Pharmacies' : lang === 'fr' ? 'Pharmacies' : 'الصيدليات',
      desc: lang === 'en' ? 'Batch tracking, expiry alerts, insurance-ready receipts.' : lang === 'fr' ? 'Suivi des lots, alertes de péremption, tickets compatibles assurance.' : 'تتبع الدفعات، تنبيهات انتهاء الصلاحية، فواتير متوافقة مع التأمين.',
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=420&auto=format&fit=crop&q=80",
      tagline: lang === 'en' ? '💊 Batch & Expiry Alerts' : lang === 'fr' ? '💊 Suivi des Lots & Péremption' : '💊 تتبع الدفعات وتنبيهات الصلاحية'
    }
  ];

  const navLinks = [
    { id: 'home', label: t.navHome },
    { id: 'features', label: t.navFeatures },
    { id: 'business', label: t.navBusiness },
    { id: 'pricing', label: t.navPricing },
    { id: 'contact', label: t.navContact },
  ];

  const handleLinkClick = (id: string) => {
    onPageChange(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full h-[64px] bg-white/90 backdrop-blur-md border-b border-[var(--border)] transition-all">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">

        {/* Left: Logo + Wordmark */}
        <button
          onClick={() => handleLinkClick('home')}
          className="flex items-center gap-1.5 text-left cursor-pointer group"
        >
          <img
            src={nuqta_icon}
            height="32"
            alt="Nuqta POS logo"
            className="h-15 w-auto group-hover:scale-105 transition-transform"
            referrerPolicy="no-referrer"
          />
          <span
            className="font-bold text-xl tracking-tight text-[var(--text-primary)]"
            style={{ fontFamily: "'Almarai', sans-serif" }}
          >
            Nuqta <span className="text-[var(--accent)] font-bold">POS</span>
          </span>
        </button>

        {/* Center: Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 h-full font-medium text-sm text-[var(--text-secondary)]">
          {navLinks.map((link) => {
            const isActive = currentPage === link.id;

            if (link.id === 'business') {
              return (
                <div
                  key={link.id}
                  onMouseEnter={() => setMegaOpen(true)}
                  onMouseLeave={() => setMegaOpen(false)}
                  className="relative h-full flex items-center"
                >
                  <button
                    onClick={() => handleLinkClick('business')}
                    className={`relative py-5 cursor-pointer font-semibold transition-colors duration-150 hover:text-[var(--text-primary)] flex items-center gap-1 ${isActive ? 'text-[var(--accent)]' : ''
                      }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaOpen ? 'rotate-180 text-[var(--accent)]' : 'text-[var(--text-muted)]'}`} />
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] rounded-full animate-fade-in" />
                    )}
                  </button>

                  {/* Mega Dropdown Panel */}
                  {megaOpen && (
                    <div className="absolute top-[60px] left-1/2 -translate-x-[40%] w-[880px] bg-white rounded-[28px] shadow-[0_30px_80px_-12px_rgba(0,0,0,0.28)] ring-1 ring-black/[0.04] z-50 animate-fade-in overflow-hidden">

                      {/* Thin gradient accent bar */}
                      <div className="h-[3px] w-full bg-gradient-to-r from-[var(--accent)] via-blue-400 to-[var(--accent)]" />

                      <div className="p-5 grid grid-cols-12 gap-4">

                        {/* Left column header */}
                        <div className="col-span-7 flex flex-col">
                          <div className="flex items-center justify-between px-1 mb-3">
                            <span className="text-[10px] font-black tracking-widest text-[var(--text-muted)] uppercase">
                              {lang === 'en' ? 'Browse by Sector' : lang === 'fr' ? 'Parcourir par secteur' : 'تصفح حسب القطاع'}
                            </span>
                            <span className="text-[10px] font-bold text-[var(--accent)]">
                              {sectors.length} {lang === 'en' ? 'sectors' : lang === 'fr' ? 'secteurs' : 'قطاعات'}
                            </span>
                          </div>

                          {/* Sector grid */}
                          <div className="grid grid-cols-2 gap-2.5 h-[280px] content-start">
                            {sectors.map((s, idx) => (
                              <button
                                key={s.id}
                                onMouseEnter={() => setHoveredSector(idx)}
                                onClick={() => {
                                  handleLinkClick('business');
                                  setMegaOpen(false);
                                }}
                                className={`relative p-3.5 rounded-2xl text-left transition-all duration-200 cursor-pointer border flex flex-col justify-between h-[84px] overflow-hidden group/tile ${hoveredSector === idx
                                  ? 'bg-[var(--accent-light)] border-[var(--accent)]/25 shadow-[0_4px_16px_-4px_rgba(59,130,246,0.25)]'
                                  : 'bg-zinc-50 border-zinc-100 hover:bg-zinc-100/70 hover:border-zinc-200'
                                  }`}
                              >
                                {/* Active indicator dot */}
                                <span className={`absolute top-3.5 right-3.5 w-1.5 h-1.5 rounded-full transition-all duration-300 ${hoveredSector === idx ? 'bg-[var(--accent)] scale-100' : 'bg-transparent scale-0'
                                  }`} />

                                <div className={`font-extrabold text-[12px] tracking-tight pr-4 transition-colors ${hoveredSector === idx ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
                                  }`}>
                                  {s.title}
                                </div>
                                <div className="text-[10px] text-[var(--text-muted)] mt-1 line-clamp-2 leading-relaxed font-medium pr-2">
                                  {s.desc}
                                </div>
                              </button>
                            ))}
                          </div>

                          {/* Footer CTA row */}
                          <button
                            onClick={() => {
                              handleLinkClick('business');
                              setMegaOpen(false);
                            }}
                            className="mt-3 flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-zinc-50 hover:bg-zinc-100/80 border border-zinc-100 transition-colors group/cta"
                          >
                            <span className="text-[11px] font-bold text-[var(--text-secondary)] group-hover/cta:text-[var(--text-primary)]">
                              {lang === 'en' ? 'See all business types' : lang === 'fr' ? 'Voir tous les types de commerces' : 'عرض جميع الأنشطة التجارية'}
                            </span>
                            <ChevronDown className={`w-3.5 h-3.5 text-[var(--text-muted)] group-hover/cta:text-[var(--accent)] group-hover/cta:translate-x-0.5 transition-all ${isRtl ? 'rotate-90' : '-rotate-90'}`} />
                          </button>
                        </div>

                        {/* Right: full-bleed image panel */}
                        <div className="col-span-5 relative rounded-[20px] overflow-hidden h-[323px] ring-1 ring-black/[0.06]">
                          <img
                            src={sectors[hoveredSector].image}
                            alt={sectors[hoveredSector].title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out scale-105"
                            key={sectors[hoveredSector].image}
                            referrerPolicy="no-referrer"
                          />

                          {/* Vignette + bottom gradient for legibility */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/5" />
                          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-transparent" />

                          {/* Glass tagline chip */}
                          <div className="absolute top-3.5 left-3.5">
                            <span className="text-[8px] font-black tracking-widest text-white bg-white/15 backdrop-blur-md px-2.5 py-1.5 rounded-full uppercase border border-white/25 shadow-sm">
                              {sectors[hoveredSector].tagline}
                            </span>
                          </div>

                          {/* Bottom title block */}
                          <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1.5">
                            <h4 className="font-extrabold text-[15px] tracking-tight text-white drop-shadow-sm">
                              {sectors[hoveredSector].title}
                            </h4>
                            <p className="text-[10.5px] text-white/85 leading-relaxed font-medium line-clamp-2">
                              {sectors[hoveredSector].desc}
                            </p>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`relative py-5 cursor-pointer font-semibold transition-colors duration-150 hover:text-[var(--text-primary)] ${isActive ? 'text-[var(--accent)]' : ''
                  }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[var(--accent)] rounded-full animate-fade-in" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="hidden md:flex items-center gap-4">

          {/* Multi-language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1 cursor-pointer text-[var(--text-secondary)]"
              title="Switch language"
            >
              <Globe className="w-4.5 h-4.5" />
              <span className="text-xs font-semibold uppercase">{lang}</span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-32 rounded-xl bg-white border border-[var(--border)] shadow-xl overflow-hidden py-1.5 z-50">
                <button
                  onClick={() => { setLang('en'); setLangMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-100 flex items-center justify-between ${lang === 'en' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
                >
                  English 🇺🇸
                </button>
                <button
                  onClick={() => { setLang('fr'); setLangMenuOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-gray-100 flex items-center justify-between ${lang === 'fr' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
                >
                  Français 🇫🇷
                </button>
                <button
                  onClick={() => { setLang('ar'); setLangMenuOpen(false); }}
                  className={`w-full text-right px-4 py-2 text-xs font-semibold hover:bg-gray-100 flex items-center justify-between ${lang === 'ar' ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)]'}`}
                >
                  العربية 🇲🇦
                </button>
              </div>
            )}
          </div>

          {/* User Auth Buttons */}
          {/* <button
            onClick={() => handleLinkClick('contact')}
            className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] cursor-pointer"
          >
            {t.navLogin}
          </button> */}

          <button
            onClick={() => handleLinkClick('contact')}
            className="relative px-5 py-2 text-sm font-bold text-white rounded-full cursor-pointer
             bg-[var(--accent)] hover:bg-[var(--accent-hover)]
             shadow-[0_2px_12px_rgba(59,130,246,0.4)]
             hover:shadow-[0_4px_20px_rgba(59,130,246,0.6)]
             hover:[animation:bounce-in_0.4s_ease_forwards]
             overflow-hidden
             transition-all duration-150
             before:content-[''] before:absolute before:inset-0 before:rounded-full
             before:border-2 before:border-[var(--accent)] before:opacity-60
             before:[animation:pulse-ring_1.6s_ease-out_infinite]
             after:content-[''] after:absolute after:top-0 after:-left-full after:h-full after:w-[60%]
             after:bg-gradient-to-r after:from-transparent after:via-white/30 after:to-transparent
             after:[animation:shimmer_2.4s_ease-in-out_infinite]"
          >
            {t.navStartFree}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">

          {/* Mobile Language Swap */}
          <button
            onClick={() => setLang(lang === 'en' ? 'fr' : lang === 'fr' ? 'ar' : 'en')}
            className="p-2 hover:bg-gray-100 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <Globe className="w-4 h-4 text-[var(--text-secondary)]" />
            <span className="text-xs uppercase font-bold text-[var(--text-secondary)]">{lang}</span>
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--text-primary)] rounded hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            className="md:hidden fixed inset-0 top-[64px] bg-black/30 z-30"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="md:hidden fixed top-[64px] inset-x-0 bg-white border-t border-[var(--border)] z-40 flex flex-col p-6 space-y-4 shadow-2xl animate-slide-down"
            style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}
          >          <div className="flex flex-col space-y-3 font-semibold text-base">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left py-3 px-4 rounded-xl transition-all ${currentPage === link.id
                    ? 'bg-[var(--accent-light)] text-[var(--accent)]'
                    : 'text-[var(--text-secondary)] hover:bg-gray-50'
                    }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="pt-6 border-t border-[var(--border)] flex flex-col space-y-3">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-3.5 text-center font-bold text-sm text-[var(--text-primary)] border border-[var(--border)] rounded-xl hover:bg-gray-50"
              >
                {t.navLogin}
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-3.5 text-center font-bold text-sm bg-[var(--accent)] text-white rounded-xl shadow-lg hover:bg-[var(--accent-hover)]"
              >
                {t.navStartFree}
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}