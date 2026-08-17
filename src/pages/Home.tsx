import React, { useRef, useEffect, memo } from 'react';
import {
  ArrowRight, ShieldCheck, CheckCircle, TrendingUp,
  ShoppingBag, HelpCircle, Star, MessageSquare, Coffee, Sparkles, Terminal,
  WifiOff, Clock, Smartphone, Tablet, Laptop, RefreshCw, BarChart3, Database, CreditCard, Landmark, Check, Shield,
  Cloud,
  FileText,
  Users
} from 'lucide-react';
import { motion } from 'motion/react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import InteractiveDemo from '../components/InteractiveDemo';
import posHeroBanner from '../assets/images/pos_hero_banner_1781470684545.jpg';

interface HomeProps {
  lang: Language;
  onPageChange: (page: string) => void;
}

// Static data — hoisted out of the component so it isn't recreated on every render.
const RECENT_FEED = [
  { id: 1, ticket: '0512', amount: '180.00', time: 'Just now', type: 'cash' },
  { id: 2, ticket: '0511', amount: '65.50', time: '1 min ago', type: 'card' },
];

/**
 * TiltCard
 * ---------
 * Isolated in its own component so the 3D tilt effect never touches React state.
 * The original version called setState on every `mousemove` event, which forced
 * a full re-render of the entire Home page (bento grid, testimonials, demo, etc.)
 * on every pixel of mouse movement — this was the main perf bottleneck.
 *
 * Instead we mutate `card.style.transform` directly via the ref, throttled to
 * one update per animation frame with requestAnimationFrame. This runs entirely
 * outside React's render cycle, so it's buttery smooth and costs ~0 re-renders.
 */
const TiltCard = memo(function TiltCard({ children }: { children: React.ReactNode }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number | null>(null);
  const pending = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const applyTilt = () => {
      rafId.current = null;
      if (!pending.current || !card) return;
      const { x: rotateX, y: rotateY } = pending.current;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xNorm = (x / rect.width) * 2 - 1;
      const yNorm = (y / rect.height) * 2 - 1;

      pending.current = {
        x: Number((-yNorm * 6).toFixed(2)),
        y: Number((xNorm * 6).toFixed(2)),
      };

      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(applyTilt);
      }
    };

    const handleMouseLeave = () => {
      pending.current = null;
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)';
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        transform: 'perspective(900px) rotateX(0deg) rotateY(0deg)',
        transition: 'transform 0.15s ease-out',
        willChange: 'transform',
      }}
      className="relative w-full max-w-lg p-4 cursor-grab"
    >
      {children}
    </div>
  );
});

export default function Home({ lang, onPageChange }: HomeProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  return (
    <div className="space-y-24 pb-20">

      {/* 🚀 Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative pt-10 sm:pt-16 max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Copy & CTAs */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">

            {/* Green Pulse Dot Eyebrow */}
            <div className={`inline-flex items-center gap-2 bg-[var(--accent-light)] border border-[var(--accent)]/15 px-3.5 py-1.5 rounded-full text-xs font-bold text-[var(--accent)] ${isRtl ? 'flex-row-reverse' : ''}`}>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--success)] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--success)]"></span>
              </span>
              <span>{t.heroEyebrow}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.05]">
              {t.heroTitle}
            </h1>

            <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto lg:mx-0">
              {t.heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onPageChange('contact')}
                className="w-full sm:w-auto px-8 py-4 text-sm font-extrabold bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-full transition-all shadow-xl hover:shadow-[var(--accent)]/20 hover:scale-103 cursor-pointer"
              >
                {t.heroStartFreeCTA}
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('demo-interactive-widget');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-sm font-bold text-[var(--text-primary)] hover:text-[var(--accent)] flex items-center gap-1.5 cursor-pointer"
              >
                <span>{t.heroSeeDemoCTA}</span>
              </button>
            </div>
          </div>

          {/* Right Column: Layered device mockup & Glassmorphic floating statistics console */}
          <div className="lg:col-span-6 flex justify-center">
            <TiltCard>
              {/* Tablet frame container (Chrome finish with screen border) */}
              <div className="w-full rounded-[2.5rem] bg-zinc-950 p-4 shadow-2xl border border-zinc-800 relative select-none group/device animate-float">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-950 rounded-b-xl z-10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-zinc-850" />
                </div>

                {/* Visual Glass Screen */}
                <div className="w-full rounded-[1.8rem] overflow-hidden aspect-[4/3] bg-zinc-900 border border-zinc-800 relative">
                  {/*
                    Hero image: this is almost certainly your LCP (Largest Contentful Paint)
                    element, so it should load eagerly and with high priority — never lazy.
                    Explicit width/height (matching the aspect-[4/3] box) prevents layout shift
                    while the image streams in.
                  */}
                  <img
                    src={posHeroBanner}
                    alt="Nuqta POS Tablet Application Mockup"
                    width={800}
                    height={600}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover opacity-93 group-hover/device:scale-101 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />

                  {/* Subtle glare overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 pointer-events-none" />
                </div>
              </div>

              {/* Glassmorphic floating statistics console overlapping the tablet frame */}
              <div className="absolute -bottom-8 -left-6 max-w-[260px] bg-zinc-950/90 backdrop-blur-md rounded-2xl p-4 text-xs font-mono text-zinc-100 border border-white/10 shadow-2xl hidden sm:block transition-all hover:scale-103 hover:border-blue-500 duration-300">
                <div className="flex items-center justify-between gap-3 border-b border-white/15 pb-2 mb-3">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[8px] bg-blue-500/10 text-blue-400 border border-blue-500/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-widest leading-none">
                    NUQTA POS
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-zinc-500 text-[10px]">
                      {isRtl ? 'تذاكر اليوم:' : lang === 'fr' ? 'Tickets Jour :' : "Today's Tickets:"}
                    </span>
                    <span className="font-extrabold text-[var(--accent)] font-mono">47</span>
                  </div>
                  <div className="flex justify-between items-baseline border-b border-dashed border-white/5 pb-1.5">
                    <span className="text-zinc-500 text-[10px]">
                      {isRtl ? 'إجمالي هذا الجهاز:' : lang === 'fr' ? 'Total ce terminal :' : 'This POS Total:'}
                    </span>
                    <span className="font-bold text-emerald-400 font-mono">3,240.00 MAD</span>
                  </div>

                  <div className="space-y-2 text-[9px] pt-1">
                    <span className="text-zinc-500 block">
                      {isRtl ? 'موجز المعاملات المباشر:' : lang === 'fr' ? 'Flux de transactions live :' : 'Live transaction stream:'}
                    </span>
                    {RECENT_FEED.slice(0, 3).map((f) => (
                      <div
                        key={f.id}
                        className="flex items-center justify-between gap-2 p-1 px-1.5 bg-white/5 rounded text-[8px] text-zinc-300 leading-tight border border-white/5"
                      >
                        <span className="truncate text-zinc-400">
                          {isRtl ? `تذكرة #${f.ticket}` : lang === 'fr' ? `Ticket #${f.ticket}` : `Ticket #${f.ticket}`}
                        </span>
                        <span className="font-bold text-zinc-100 shrink-0">{f.amount} MAD</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>

        </div>
      </motion.section>

      {/* 🤝 Trust Bar */}
      <section className="bg-gray-50/70 border-y border-[var(--border)] py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs uppercase font-extrabold tracking-wider text-[var(--text-muted)] mb-6">
            {t.trustTitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto items-center font-bold text-sm text-[var(--text-secondary)]">
            <div className="p-2 border-r border-[var(--border)] last:border-0">{t.trustMerchants}</div>
            <div className="p-2 border-r border-[var(--border)] last:border-0">{t.trustProcessed}</div>
            <div className="p-2 border-r border-[var(--border)] last:border-0">{t.trustUptime}</div>
            <div className="p-2 border-r border-[var(--border)] last:border-0">{t.trustCountries}</div>
            <div className="p-2">{t.trustRating}</div>
          </div>
        </div>
      </section>

      {/* Bento Grid Cards */}
      <motion.section
        initial={{ opacity: 0.05, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex py-1 px-3 bg-blue-50 text-[var(--accent)] font-mono font-extrabold text-[10px] uppercase rounded-full tracking-wider border border-blue-200">
            Nuqta POS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight tracking-tight font-sans">
            {isRtl ? 'كل ما يحتاجه عملك في نظام واحد' : lang === 'fr' ? 'Toute la gestion de votre commerce, dans un seul outil' : 'Everything your business needs, in one system'}
          </h2>
          <p className="text-xs text-slate-500 max-w-lg mx-auto leading-relaxed">
            {isRtl
              ? 'برنامج نقطة لإدارة الأعمال، مصمم وفق معايير جودة عالمية: نقطة البيع، العملاء، الفوترة، المخزون، والتقارير في مكان واحد.'
              : lang === 'fr'
                ? 'Nuqta POS est un logiciel de gestion complet, conçu selon des standards internationaux : caisse, clients, facturation, stock et rapports réunis.'
                : 'Nuqta POS is a complete business management software, engineered to international quality standards — sales, clients, invoicing, stock and reporting, all in one place.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 md:auto-rows-[200px]">

          {/* Tile 1: Core modules quick list */}
          <div className="bg-white border border-slate-200/80 p-6 rounded-[28px] shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md transition-shadow">
            <div className="space-y-1">
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                {isRtl ? 'الوحدات الأساسية' : lang === 'fr' ? 'Modules principaux' : 'Core Modules'}
              </span>
              <h4 className="text-xl font-extrabold text-slate-900 tracking-tight">
                {isRtl ? '+20 وحدات مدمجة' : lang === 'fr' ? '+20 modules intégrés' : '20+ integrated modules'}
              </h4>
            </div>
            <div className="flex flex-wrap gap-1.5 py-2">
              {[
                isRtl ? 'نقطة البيع' : lang === 'fr' ? 'Caisse' : 'Point of Sale',
                isRtl ? 'العملاء' : lang === 'fr' ? 'Clients' : 'Clients',
                isRtl ? 'الفوترة' : lang === 'fr' ? 'Facturation' : 'Invoicing',
                isRtl ? 'المخزون' : lang === 'fr' ? 'Stock' : 'Stock',
                isRtl ? 'الموردون' : lang === 'fr' ? 'Fournisseurs' : 'Suppliers',
              ].map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-slate-50 border border-slate-200 rounded-full text-[9px] font-bold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="font-mono text-[9px] text-slate-400 leading-normal">
              {isRtl ? 'قابلية التوسع حسب الباقة والقطاع' : lang === 'fr' ? 'Modules activables selon votre offre' : 'Modules scale with your plan'}
            </div>
          </div>

          {/* Tile 2: Overview hero */}
          <div className="md:col-span-2 md:row-span-2 bg-slate-50 border border-slate-200/70 rounded-[28px] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow flex flex-col justify-between h-[340px] md:h-auto">
            <div className="absolute inset-0">
              {/*
                Below-the-fold images: lazy-loaded, and Unsplash/Pexels URLs are trimmed
                to the actual rendered size (~1200px) with auto-format/auto-compress so
                the browser doesn't download a multi-MB original for a card-sized crop.
              */}
              <img
                src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=70&w=900&auto=format&fit=crop"
                alt="Retail checkout workspace running Nuqta POS"
                width={900}
                height={675}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover opacity-100 transition-transform duration-700 group-hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 p-5 flex justify-between items-start">
              <span className="px-3 py-1 bg-white/95 backdrop-blur-md rounded-full text-[9px] font-black tracking-widest text-[#006AFF] border border-white/50 shadow-sm uppercase font-mono">
                {isRtl ? '⚡ متاح أونلاين وأوفلاين' : lang === 'fr' ? '⚡ Hors-ligne, hybride ou cloud' : '⚡ Offline, hybrid or cloud'}
              </span>
            </div>

            <div className="relative z-10 m-4 p-5 bg-white/95 backdrop-blur-md rounded-[22px] border border-white/40 shadow-xl space-y-1.5 mt-auto">
              <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                {isRtl ? 'نظرة عامة على نقطة' : lang === 'fr' ? 'Aperçu Nuqta POS' : 'Nuqta POS Overview'}
              </span>
              <h3 className="font-black text-sm tracking-tight text-slate-900 leading-tight">
                {isRtl ? 'مصمم لكل قطاع تجاري بدقة هندسية' : lang === 'fr' ? 'Conçu pour tous les secteurs commerciaux' : 'Built for every kind of merchant'}
              </h3>
              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                {isRtl
                  ? 'إدارة المبيعات، العملاء والائتمان، الفواتير والعروض وسندات التسليم، الموردين والمشتريات، والمخزون — كل ذلك في واجهة واحدة سلسة.'
                  : lang === 'fr'
                    ? 'Vente en caisse, gestion des clients et du crédit, devis, factures et bons de livraison, fournisseurs et achats, stock — le tout dans une seule interface fluide.'
                    : 'Sales, client and credit tracking, invoices, quotes and delivery notes, suppliers and purchasing, stock — all in one seamless interface.'}
              </p>
            </div>
          </div>

          {/* Tile 3: Sales history + reporting — full-bleed image */}
          <div className="md:row-span-2 bg-white border border-slate-200/80 rounded-[28px] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow h-[340px] md:h-auto flex flex-col justify-between">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/37594417/pexels-photo-37594417.jpeg?w=900&auto=compress&cs=tinysrgb"
                alt="Sales analytics and reporting dashboard on Nuqta POS"
                width={900}
                height={675}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Top badge */}
            <div className="relative z-10 p-4">
              <span className="px-2.5 py-1 bg-white/95 text-slate-900 rounded-full text-[8.5px] font-mono font-bold shadow-sm uppercase tracking-wide inline-flex items-center gap-1 border border-slate-200">
                <TrendingUp className="w-3 h-3 text-[#006AFF]" />
                {isRtl ? 'المبيعات والمعاملات' : lang === 'fr' ? 'Ventes & Transactions' : 'Sales & Transactions'}
              </span>
            </div>

            {/* Bottom glass block with both features */}
            <div className="relative z-10 m-3.5 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg mt-auto space-y-3">
              <div className="flex items-start gap-2">
                <div className="h-6 w-6 shrink-0 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-[#006AFF]">
                  <TrendingUp className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono font-extrabold text-[#006AFF] uppercase tracking-wide block">
                    {isRtl ? 'سجل المبيعات' : lang === 'fr' ? 'Historique des ventes' : 'Sales History'}
                  </span>
                  <p className="text-[10px] font-black text-slate-900 leading-snug">
                    {isRtl ? 'سجل كامل لتاريخ كل عملية بيع' : lang === 'fr' ? 'Historique complet de chaque vente' : 'Full history of every sale, tracked'}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-200/60" />

              <div className="flex items-start gap-2">
                <div className="h-6 w-6 shrink-0 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <div className="space-y-0.5">
                  <span className="text-[9px] font-mono font-extrabold text-emerald-600 uppercase tracking-wide block">
                    {isRtl ? 'نظام التقارير' : lang === 'fr' ? 'Système de rapports' : 'Reporting System'}
                  </span>
                  <p className="text-[10px] font-black text-slate-900 leading-snug">
                    {isRtl ? 'تقارير PDF أو طباعة تلقائية' : lang === 'fr' ? 'PDF généré ou impression automatique' : 'Generated PDF or auto-printed'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tile 4: Cashier management */}
          <div className="bg-slate-100 border border-slate-200/70 rounded-[28px] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow md:row-span-2 flex flex-col justify-between h-[280px] md:h-auto">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=70&w=800&auto=format&fit=crop"
                alt="Cashier using Nuqta POS terminal"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 p-4">
              <span className="px-2.5 py-1 bg-white/95 text-slate-900 rounded-full text-[8.5px] font-mono font-bold shadow-sm uppercase tracking-wide inline-block border border-slate-200">
                <Users className="w-3 h-3 inline mr-1 -mt-0.5" />
                {isRtl ? 'إدارة الموظفين' : lang === 'fr' ? 'Gestion des équipes' : 'Team access'}
              </span>
            </div>

            <div className="relative z-10 m-3.5 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg mt-auto space-y-0.5">
              <span className="text-[8px] font-mono font-extrabold text-[#006AFF] uppercase tracking-wide block">
                {isRtl ? 'إدارة الصرافين' : lang === 'fr' ? 'Gestion des caissiers' : 'Cashier Management'}
              </span>
              <p className="text-[10px] font-black text-slate-900">
                {isRtl ? 'حسابات وصلاحيات منفصلة لكل صراف' : lang === 'fr' ? 'Comptes et droits distincts par caissier' : 'Individual accounts & permissions per cashier'}
              </p>
            </div>
          </div>

          {/* Tile 5: Invoicing, quotes & delivery notes */}
          <div className="md:col-span-2 bg-gradient-to-tr from-blue-500/5 to-white border border-slate-200/80 p-6 rounded-[28px] shadow-sm flex flex-col justify-between overflow-hidden group hover:shadow-md transition-shadow relative">
            <div className="space-y-2 relative z-10">
              <span className="text-[9px] font-bold text-[#006AFF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 uppercase tracking-widest inline-block font-mono">
                <FileText className="w-3 h-3 inline mr-1 -mt-0.5" />
                {isRtl ? 'المستندات التجارية' : lang === 'fr' ? 'Documents commerciaux' : 'Business Documents'}
              </span>
              <h4 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight">
                {isRtl ? 'فواتير، عروض أسعار وسندات تسليم' : lang === 'fr' ? 'Factures, devis et bons de livraison' : 'Invoices, quotes & delivery notes'}
              </h4>
              <p className="text-xs text-slate-500 font-medium leading-relaxed max-w-sm">
                {isRtl
                  ? 'أنشئ وأرسل الفواتير والعروض وسندات التسليم في ثوانٍ، مع متابعة كاملة للعملاء والائتمان.'
                  : lang === 'fr'
                    ? 'Générez et envoyez factures, devis et bons de livraison en quelques secondes, avec suivi client et crédit intégré.'
                    : 'Create and send invoices, quotes and delivery notes in seconds, with built-in client follow-up and credit tracking.'}
              </p>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-blue-600/5 blur-xl group-hover:bg-blue-600/10 transition-colors" />
          </div>

          {/* Tile 6: Deployment / hardware — full-bleed image */}
          <div className="bg-white border border-slate-200/80 rounded-[28px] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow h-[220px] md:h-auto flex flex-col justify-between">
            <div className="absolute inset-0">
              <img
                src="https://images.pexels.com/photos/37594404/pexels-photo-37594404.jpeg?w=800&auto=compress&cs=tinysrgb"
                alt="Business analytics dashboard on Nuqta POS"
                width={800}
                height={600}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="relative z-10 p-4">
              <span className="px-2.5 py-1 bg-white/95 text-slate-900 rounded-full text-[8.5px] font-mono font-bold shadow-sm uppercase tracking-wide inline-block border border-slate-200">
                <Cloud className="w-3 h-3 inline mr-1 -mt-0.5" />
                {isRtl ? 'أوفلاين • هجين • سحابي' : lang === 'fr' ? 'Hors-ligne • Hybride • Cloud' : 'Offline • Hybrid • Cloud'}
              </span>
            </div>

            <div className="relative z-10 m-3.5 p-3.5 bg-white/95 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg mt-auto space-y-0.5">
              <span className="text-[8px] font-mono font-extrabold text-[#006AFF] uppercase tracking-wide block">
                {isRtl ? 'وضع النشر' : lang === 'fr' ? 'Mode de déploiement' : 'Deployment Mode'}
              </span>
              <p className="text-[10px] font-black text-slate-900">
                {isRtl ? 'يعمل حسب باقتك واحتياجات متجرك' : lang === 'fr' ? "S'adapte à votre offre et à votre point de vente" : 'Fits your plan and store setup'}
              </p>
            </div>
          </div>

        </div>
      </motion.section>

      {/* 📱 Interactive POS Demo Section */}
      <section className="bg-gray-50/50 py-20 border-y border-[var(--border)] transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-2">
            <span className="text-[11px] uppercase tracking-widest font-black text-[var(--accent)]">
              {isRtl ? 'مساحة المحاكاة المباشرة' : lang === 'fr' ? 'Espace de Simulation en Direct' : 'Live Simulator Workspace'}
            </span>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight">
              {t.demoHeading}
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">
              {t.demoSubheading}
            </p>
          </div>

          <InteractiveDemo lang={lang} onPageChange={onPageChange} />
        </div>
      </section>

      {/* 🗺️ How It Works (3 Steps) */}
      <motion.section
        initial={{ opacity: 0.05, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center max-w-sm mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight">
            {isRtl ? 'كيف يعمل نظام نقطة' : lang === 'fr' ? 'Comment fonctionne Nuqta' : 'How Nuqta Works'}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {isRtl ? 'إعداد وتفعيل عملك التجاري يستغرق دقائق معدودة فقط.' : lang === 'fr' ? 'Configurez votre commerce en quelques minutes, pas en quelques semaines.' : 'Setting up your business takes minutes, not weeks.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">

          <div className="space-y-4">
            <span className="text-5xl font-extrabold font-mono text-[var(--border)] leading-none select-none block">01</span>
            <h3 className="font-extrabold text-base text-[var(--text-primary)]">
              {isRtl ? 'أنشئ متجرك' : lang === 'fr' ? 'Configurez votre boutique' : 'Set Up Your Store'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {isRtl
                ? 'أضف منتجاتك، ارفع متغيراتها (الألوان والمقاسات)، وحدد نسب الضرائب. لا تحتاج إلى أجهزة كاشير معقدة ومخصصة — استخدم أي هاتف أو تابلت أو كمبيوتر.'
                : lang === 'fr'
                  ? 'Ajoutez vos produits, configurez les variantes et appliquez vos taxes. Aucun matériel propriétaire requis — utilisez n\'importe quel smartphone, tablette ou ordinateur.'
                  : 'Add products, upload variants, and set up tax levels. No customized merchant hardware required — use any phone, tablet, or PC browser.'}
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-5xl font-extrabold font-mono text-[var(--border)] leading-none select-none block">02</span>
            <h3 className="font-extrabold text-base text-[var(--text-primary)]">
              {isRtl ? 'ابدأ في قبول المدفوعات' : lang === 'fr' ? 'Encaissez vos paiements' : 'Start Accepting Payments'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {isRtl
                ? 'اقبل بطاقات الدفع البنكية، محافظ الهواتف المحمولة، والدفع نقداً فوراً. يتصل نظام نقطة محلياً مع شبكات أجهزة الدفع القياسية في المغرب والعالم.'
                : lang === 'fr'
                  ? 'Acceptez instantanément les cartes bancaires, le cash et les paiements mobiles. Nuqta se connecte nativement avec les terminaux de paiement standard au Maroc et à l\'étranger.'
                  : 'Accept credit cards, mobile wallets, and cash instantly. Nuqta connects natively with standard terminal networks in Casablanca and internationally.'}
            </p>
          </div>

          <div className="space-y-4">
            <span className="text-5xl font-extrabold font-mono text-[var(--border)] leading-none select-none block">03</span>
            <h3 className="font-extrabold text-base text-[var(--text-primary)]">
              {isRtl ? 'انمو مع الإحصائيات الفورية' : lang === 'fr' ? 'Analysez et grandissez' : 'Grow With Insights'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              {isRtl
                ? 'تابع تقارير مبيعاتك الحية والمباشرة، حدد تنبيهات عند قرب نفاد المخزون، وقم بتحميل الملخصات المحاسبية من أي مكان عبر لوحة التحكم السحابية.'
                : lang === 'fr'
                  ? 'Consultez vos rapports de vente en direct, gérez les alertes de stock bas et téléchargez vos synthèses comptables depuis votre espace cloud.'
                  : 'Review live reports, update low stock thresholds, and download accounting summaries anywhere, directly within our cloud control hub.'}
            </p>
          </div>

        </div>
      </motion.section>

      {/* 💬 Testimonials */}
      <motion.section
        initial={{ opacity: 0.05, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight">
            {isRtl ? 'موثوق ومحبوب لدى أشهر الأنشطة التجارية' : lang === 'fr' ? 'Adopté par les commerçants de référence' : 'Loved by leading local businesses'}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {isRtl
              ? 'اكتشف كيف توفر المقاهي والمطاعم ومحلات التجزئة ساعات من العمل يومياً باستخدام نظام نقطة.'
              : lang === 'fr'
                ? 'Découvrez comment les cafés, restaurants et franchises gagnent du temps au quotidien avec Nuqta.'
                : 'See how cafes, restaurants, and retail franchises save hours every single day using Nuqta.'}
          </p>
        </div>

        {/* Note: grid-cols-3 on desktop means there's nothing to horizontally scroll there;
            overflow-x-auto only matters on mobile where it's grid-cols-1. Left as-is functionally,
            just flagging in case the scroll-snap behavior wasn't intentional on desktop. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4 scroll-snap-x scrollbar-none">

          <div className="bg-white p-6 rounded-xl border border-[var(--border)] shrink-0 min-w-[280px] scroll-snap-item">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center">
                HE
              </div>
              <div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">Amine El Bouchiti</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-mono leading-none">Café Gourmet, Rabat</p>
              </div>
            </div>
            <div className="flex gap-1 mb-3 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-semibold">
              {isRtl
                ? '"لقد قمنا بنقل كافة فروعنا في الرباط إلى كاشير نقطة. انخفض وقت إتمام عملية البيع لأقل من ثانيتين، ويتم توليد التقارير المحاسبية تلقائياً في الوقت الفعلي."'
                : lang === 'fr'
                  ? '"Nous avons migré toutes nos boutiques de Rabat vers Nuqta POS. Nos temps d\'encaissement ont chuté sous les 2 secondes, et le rapport comptable est généré en temps réel."'
                  : '"We migrated all our Rabat stores to Nuqta POS. Our checkout times dropped to under 2 seconds, and the accounting summary is generated in real-time."'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[var(--border)] shrink-0 min-w-[280px] scroll-snap-item">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500 text-white font-bold text-xs flex items-center justify-center">
                ST
              </div>
              <div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">Sara Tazi</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-mono leading-none">Tazi Boutique, Casablanca</p>
              </div>
            </div>
            <div className="flex gap-1 mb-3 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-semibold">
              {isRtl
                ? '"كان تتبع مقاسات وألوان الملابس يمثل صداعاً حقيقياً لنا حتى اكتشفنا نقطة. نوصي به بشدة لأصحاب البوتيكات الذين يبحثون عن كاشير وجرد متطور عسكري الدقة."'
                : lang === 'fr'
                  ? '"Suivre les variantes de vêtements (tailles/couleurs) était un casse-tête avant de découvrir Nuqta. Recommandé pour toutes les boutiques en recherche de modernité."'
                  : '"Tracking multiple garment variations (sizes/colors) was a huge headache until we discovered Nuqta. Recommended for boutiques looking for a modern ledger."'}
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-[var(--border)] shrink-0 min-w-[280px] scroll-snap-item">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center">
                ME
              </div>
              <div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">Meriem Alaoui</h4>
                <p className="text-[10px] text-[var(--text-muted)] font-mono leading-none">Alaoui Fruits S.A.R.L.</p>
              </div>
            </div>
            <div className="flex gap-1 mb-3 text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-semibold">
              {isRtl
                ? '"ميزات الفواتير وعروض الأسعار رائعة للغاية. ندير مبيعات الجملة والتجزئة من شاشة واحدة مبسطة مع توفير ميزة التوقيع الرقمي للزبناء."'
                : lang === 'fr'
                  ? '"La gestion des devis et factures est formidable. Nous gérons le gros et le détail sur un seul écran avec signature numérique client."'
                  : '"The invoice & quote features are incredible. We handle wholesale and retail from one simple screen with digital client signature capability."'}
            </p>
          </div>

        </div>
      </motion.section>

      {/* 🏷️ Final CTA Banner */}
      <motion.section
        initial={{ opacity: 0.05, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6"
      >
        <div className="bg-[var(--accent)] border p-12 sm:p-16 rounded-3xl text-center text-white relative overflow-hidden shadow-2xl">

          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {isRtl ? 'ابدأ البيع بذكاء وسلاسة اليوم.' : lang === 'fr' ? 'Vendez plus intelligemment dès aujourd’hui.' : 'Start selling smarter today.'}
            </h2>
            <p className="text-sm text-white/90 leading-relaxed max-w-md mx-auto">
              {isRtl
                ? 'انضم لأكثر من 12,000 تاجر محلي وعالمي. استمتع بتدبير نقاط البيع السلس عبر أي جهاز تستخدمه.'
                : lang === 'fr'
                  ? 'Rejoignez plus de 12 000 commerçants. Prenez le contrôle de vos ventes sur n\'importe quel appareil.'
                  : 'Join 12,000+ local and global modern retailers. Experience seamless point-of-sale management on any hardware.'}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => onPageChange('contact')}
                className="px-8 py-4 bg-white text-[var(--accent)] hover:bg-gray-100 font-extrabold text-sm rounded-full transition-all shadow-xl hover:shadow-black/10 hover:scale-103 cursor-pointer"
              >
                {t.heroStartFreeCTA}
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-white/85 pt-4">
              <span>{isRtl ? 'لا يتطلب بطاقة بنكية للتسجيل ·' : lang === 'fr' ? 'Sans carte bancaire ·' : 'No credit card required ·'}</span>
              <span>{isRtl ? 'التفعيل في 5 دقائق ·' : lang === 'fr' ? 'Configuration en 5 minutes ·' : 'Setup in 5 minutes ·'}</span>
              <span>{isRtl ? 'إلغاء الاشتراك في أي وقت' : lang === 'fr' ? 'Sans engagement' : 'Cancel anytime'}</span>
            </div>
          </div>

          {/* Decorative Vector background shapes */}
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white/5 blur-xl pointer-events-none" />
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 blur-xl pointer-events-none" />
        </div>
      </motion.section>

    </div>
  );
}