import React, { useState } from 'react';
import {
  Check, ArrowRight, Coffee, Shirt, UtensilsCrossed,
  Sparkles, Activity, ShoppingCart, Star,
  Pill, Wrench, BookOpen, Croissant, Smartphone,
  Scissors, Car, Sofa, PawPrint, Glasses, Store, Flower2,
  LayoutGrid, ShoppingBag, Droplet, Puzzle, Laptop
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface BusinessProps {
  lang: Language;
  onPageChange: (page: string) => void;
}

export default function Business({ lang, onPageChange }: BusinessProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [activeTab, setActiveTab] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Original 6 — full detail (bullets + testimonial)
  const businessTypes = [
    {
      id: 0,
      category: 'food',
      icon: <Coffee className="w-7 h-7 text-amber-600" />,
      image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=80",
      title: t.businessCafesTitle,
      desc: t.businessCafesDesc,
      bullets: t.businessBulletsCafes,
      hasTestimonial: true,
      testimonial: {
        initials: 'AB',
        name: 'Amine Bel-Haj',
        location: 'Casablanca',
        text: lang === 'en' ? 'Nuqta reduced our guest counter checkouts from 12 seconds to 3 seconds flat. Our barista screens update in real-time, preventing incorrect orders.' : lang === 'fr' ? 'Nuqta a réduit le temps d\'attente en caisse de 12 à 3 secondes. Les baristas reçoivent les commandes immédiatement sans erreur.' : 'نظام نقطة كاشير خفّض مدة الخدمة ومحاسبة العملاء للثلث. شاشات الباريستا المباشرة منعت الأخطاء تماماً.'
      }
    },
    {
      id: 1,
      category: 'retail',
      icon: <Shirt className="w-7 h-7 text-rose-500" />,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=80",
      title: t.businessBoutiquesTitle,
      desc: t.businessBoutiquesDesc,
      bullets: t.businessBulletsBoutiques,
      hasTestimonial: true,
      testimonial: {
        initials: 'KF',
        name: 'Kamilia Fassi',
        location: 'Rabat',
        text: lang === 'en' ? 'Importing seasonal garment variants used to take hours. With Nuqta, we upload one unified CSV and print barcode labels in seconds.' : lang === 'fr' ? 'La saisie des variantes été/hiver me prenait un temps fou. Désormais, j\'importe un fichier Excel et prépare mes codes-barres de suite.' : 'إدخال تغيرات المقاسات والألوان لملابس البوتيك كان يستغرق ساعات طويلة، الآن نرفع ملف CSV واحد ونطبع الباركود مباشرة.'
      }
    },
    {
      id: 2,
      category: 'food',
      icon: <UtensilsCrossed className="w-7 h-7 text-indigo-500" />,
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=80",
      title: t.businessRestaurantsTitle,
      desc: t.businessRestaurantsDesc,
      bullets: t.businessBulletsRestaurants,
      hasTestimonial: true,
      testimonial: {
        initials: 'KO',
        name: 'Karim Ouazzani',
        location: 'Casablanca',
        text: lang === 'en' ? 'Splitting restaurant bills for large tables was a severe operational bottleneck. Nuqta POS performs split-bill math seamlessly.' : lang === 'fr' ? 'Diviser les additions pour les grandes tablées était un cauchemar pour mes serveurs. L\'ergonomie de Nuqta résout cela avec brio.' : 'تجزئة الفاتورة والحسابات للطاولات الكبيرة كان يسبب ارتباكاً كبيراً، الآن تتم تجزئة الحساب لكل زبون بضغطة زر واحدة.'
      }
    },
    {
      id: 3,
      category: 'beauty',
      icon: <Sparkles className="w-7 h-7 text-pink-500" />,
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&auto=format&fit=crop&q=80",
      title: t.businessBeautyTitle,
      desc: t.businessBeautyDesc,
      bullets: t.businessBulletsBeauty,
      hasTestimonial: true,
      testimonial: {
        initials: 'YA',
        name: 'Yasmine Alaoui',
        location: 'Meknes',
        text: lang === 'en' ? 'Our cosmetologists love tracking their daily commissions on-screen. Customer styling checkouts are completely unified.' : lang === 'fr' ? 'Nos stylistes adorent suivre leurs commissions journalières en direct. L\'expérience d\'accueil de nos clientes est superbe !' : 'أخصائيات التجميل لدينا يتابعن العمولات الخاصة بهن مباشرة من لوية الكاشير. تحصيل وتدبير حجوزات الصالون أصبح أسرع.'
      }
    },
    {
      id: 4,
      category: 'health',
      icon: <Activity className="w-7 h-7 text-emerald-500" />,
      image: "https://res.cloudinary.com/dozujlxeg/image/upload/v1783001575/pexels-foadshariyati-29526372_yagpq7.jpg",
      title: t.businessGymsTitle,
      desc: t.businessGymsDesc,
      bullets: t.businessBulletsGyms,
      hasTestimonial: true,
      testimonial: {
        initials: 'RE',
        name: 'Reda El-Fassi',
        location: 'Marrakech',
        text: lang === 'en' ? 'We sell supplements, gym day passes, and memberships from one terminal. Quick barcode entry keeps our front desk fully optimized.' : lang === 'fr' ? 'Nous gérons la vente de compléments, de boissons et de pass d\'accès sportifs sur une seule borne de caisse fluide.' : 'نتحكم في بيع المكملات الغذائية، اشتراكات النادي، وتذاكر اليوم الواحد بكود QR من واجهة الكاشير البسيطة.'
      }
    },
    {
      id: 5,
      category: 'retail',
      icon: <ShoppingBag className="w-7 h-7 text-lime-600" />,
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=500&auto=format&fit=crop&q=80",
      title: lang === 'en' ? 'Hanouts & Corner Shops' : lang === 'fr' ? 'Hanouts & Épiceries de quartier' : 'الحوانت ومحلات الأحياء',
      desc: lang === 'en' ? 'Fast tab-and-credit tracking for loyal neighborhood customers.' : lang === 'fr' ? 'Suivi rapide des crédits et ardoises pour les clients fidèles du quartier.' : 'تتبع سريع للدين والاعتماد للزبائن الأوفياء في الحي.',
      bullets: lang === 'en'
        ? ['Track customer credit (dfatar) with running balances', 'Quick barcode entry for high-volume small items', 'Daily cash reconciliation in seconds']
        : lang === 'fr'
          ? ['Suivi du crédit client (dfatar) avec soldes en temps réel', 'Saisie rapide par code-barres pour les petits articles', 'Réconciliation de caisse quotidienne en quelques secondes']
          : ['تتبع دين الزبائن (الدفتر) برصيد محدث لحظياً', 'إدخال سريع بالباركود للمنتجات الصغيرة كثيرة الحركة', 'تسوية الصندوق اليومية في ثوانٍ'],
      hasTestimonial: true,
      testimonial: {
        initials: 'SM',
        name: 'Said Moujahid',
        location: 'Fes',
        text: lang === 'en' ? 'Nuqta finally let us track customer credit digitally instead of a paper notebook. Our daily till count matches perfectly now.' : lang === 'fr' ? 'Nuqta nous a enfin permis de suivre le crédit client numériquement, fini le cahier papier. Notre caisse tombe juste tous les soirs.' : 'نقطة مكنتنا أخيراً من تتبع ديون الزبائن رقمياً بدل الدفتر الورقي، وأصبح جرد الصندوق دقيقاً كل مساء.'
      }
    }
  ];

  // Extra 13 — image + icon only, no testimonial
  const moreIndustries = [
    {
      category: 'health',
      icon: <Pill className="w-7 h-7 text-red-500" />,
      image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=500&auto=format&fit=crop&q=80",
      title: { en: 'Pharmacies', fr: 'Pharmacies', ar: 'الصيدليات' },
      desc: { en: 'Batch tracking, expiry alerts, insurance-ready receipts.', fr: 'Suivi des lots, alertes de péremption, tickets compatibles assurance.', ar: 'تتبع الدفعات، تنبيهات انتهاء الصلاحية، فواتير متوافقة مع التأمين.' }
    },
    {
      category: 'retail',
      icon: <Wrench className="w-7 h-7 text-orange-500" />,
      image: "https://res.cloudinary.com/dozujlxeg/image/upload/v1782997123/quincaillerie_aomnsw.avif",
      title: { en: 'Hardware Stores', fr: 'Quincailleries', ar: 'محلات الأدوات المنزلية' },
      desc: { en: 'Sell by unit, box, or bulk with unified inventory.', fr: 'Vente à l\'unité, au carton ou en gros avec stock unifié.', ar: 'بيع بالقطعة أو الصندوق أو بالجملة مع مخزون موحّد.' }
    },
    {
      category: 'retail',
      icon: <BookOpen className="w-7 h-7 text-blue-600" />,
      image: "https://res.cloudinary.com/dozujlxeg/image/upload/v1782997183/librairie-papeterie-24-004_vepilj.jpg",
      title: { en: 'Bookstores & Stationery', fr: 'Librairies & Papeteries', ar: 'المكتبات والأدوات المكتبية' },
      desc: { en: 'ISBN lookup and school-list bulk orders made simple.', fr: 'Recherche ISBN et commandes de listes scolaires simplifiées.', ar: 'بحث بالـ ISBN وطلبات القوائم المدرسية بسهولة.' }
    },
    {
      category: 'food',
      icon: <Croissant className="w-7 h-7 text-amber-500" />,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&auto=format&fit=crop&q=80",
      title: { en: 'Bakeries & Pastry Shops', fr: 'Boulangeries & Pâtisseries', ar: 'المخابز والحلويات' },
      desc: { en: 'Pre-orders, custom cake pricing, and daily production counts.', fr: 'Précommandes, tarifs de gâteaux sur mesure, suivi de production.', ar: 'الطلبات المسبقة، تسعير الكيك المخصص، ومتابعة الإنتاج اليومي.' }
    },
    {
      category: 'retail',
      icon: <Laptop className="w-7 h-7 text-slate-600" />,
      image: "https://res.cloudinary.com/dozujlxeg/image/upload/v1782998310/Popular_types_of_mobile_devices_-_Header_-_1500x500_p4krxv.jpg",
      title: { en: 'Tech & Electronics Stores', fr: 'Magasins High-Tech & Électronique', ar: 'محلات التكنولوجيا والإلكترونيات' },
      desc: { en: 'Serial number & IMEI tracking across phones, laptops, PCs, and gaming rigs, with built-in warranty management.', fr: 'Suivi des numéros de série et IMEI pour téléphones, PC portables, ordinateurs de bureau et PC gamer, avec gestion des garanties intégrée.', ar: 'تتبع الأرقام التسلسلية وIMEI للهواتف واللابتوبات وأجهزة الكمبيوتر وأجهزة الألعاب، مع إدارة الضمان المدمجة.' }
    },
    {
      category: 'beauty',
      icon: <Scissors className="w-7 h-7 text-purple-500" />,
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=500&auto=format&fit=crop&q=80",
      title: { en: 'Barbershops & Hair Salons', fr: 'Salons de coiffure & Barbershops', ar: 'صالونات الحلاقة' },
      desc: { en: 'Appointment-linked checkout and stylist commissions.', fr: 'Encaissement lié aux rendez-vous et commissions des coiffeurs.', ar: 'دفع مرتبط بالمواعيد وعمولات الحلاقين.' }
    },
    {
      category: 'services',
      icon: <Shirt className="w-7 h-7 text-cyan-600" />,
      image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop&q=80",
      title: { en: 'Dry Cleaning & Laundry', fr: 'Pressings & Laveries', ar: 'المغاسل والتنظيف الجاف' },
      desc: { en: 'Ticket tracking from drop-off to pickup, per garment.', fr: 'Suivi du dépôt au retrait, article par article.', ar: 'تتبع من الاستلام إلى التسليم لكل قطعة.' }
    },
    {
      category: 'services',
      icon: <Car className="w-7 h-7 text-zinc-700" />,
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&auto=format&fit=crop&q=80",
      title: { en: 'Auto Garages & Parts', fr: 'Garages & Pièces auto', ar: 'الكراجات وقطع غيار السيارات' },
      desc: { en: 'Labor + parts invoicing on a single ticket.', fr: 'Facturation main-d\'œuvre + pièces sur un seul ticket.', ar: 'فوترة اليد العاملة وقطع الغيار في تذكرة واحدة.' }
    },
    {
      category: 'retail',
      icon: <Sofa className="w-7 h-7 text-yellow-700" />,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=80",
      title: { en: 'Furniture Stores', fr: 'Magasins de meubles', ar: 'محلات الأثاث' },
      desc: { en: 'Deposits, layaway, and delivery scheduling on big-ticket items.', fr: 'Acomptes, réservations et livraisons pour articles volumineux.', ar: 'العرابين، الحجز، وجدولة التوصيل للمنتجات الكبيرة.' }
    },
    {
      category: 'retail',
      icon: <PawPrint className="w-7 h-7 text-orange-600" />,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=500&auto=format&fit=crop&q=80",
      title: { en: 'Pet Shops', fr: 'Animaleries', ar: 'محلات الحيوانات الأليفة' },
      desc: { en: 'Food subscriptions and grooming add-ons at checkout.', fr: 'Abonnements alimentaires et options toilettage à la caisse.', ar: 'اشتراكات الأكل وخيارات التنظيف عند الدفع.' }
    },
    {
      category: 'health',
      icon: <Glasses className="w-7 h-7 text-indigo-600" />,
      image: "https://res.cloudinary.com/dozujlxeg/image/upload/v1783001730/pexels-fernando-capetillo-94107723-36101261_ii26bs.jpg",
      title: { en: 'Opticians', fr: 'Opticiens', ar: 'محلات النظارات' },
      desc: { en: 'Prescription records tied directly to each sale.', fr: 'Dossiers de prescription liés directement à chaque vente.', ar: 'سجلات الوصفات الطبية مرتبطة مباشرة بكل عملية بيع.' }
    },
    {
      category: 'retail',
      icon: <Store className="w-7 h-7 text-green-600" />,
      image: "https://res.cloudinary.com/dozujlxeg/image/upload/v1782997295/pexels-lifeofnacchi-4124939_va3nus.jpg",
      title: { en: 'Supermarkets & Hypermarkets', fr: 'Supermarchés & Hypermarchés', ar: 'السوبر ماركت' },
      desc: { en: 'Multi-till, multi-branch checkout at scale.', fr: 'Caisses multiples et multi-succursales à grande échelle.', ar: 'كاشيرات متعددة وفروع متعددة على نطاق واسع.' }
    },
    {
      category: 'retail',
      icon: <Flower2 className="w-7 h-7 text-pink-500" />,
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=500&auto=format&fit=crop&q=80",
      title: { en: 'Florists', fr: 'Fleuristes', ar: 'محلات الزهور' },
      desc: { en: 'Custom bouquet pricing and same-day delivery orders.', fr: 'Tarification de bouquets sur mesure et livraisons le jour même.', ar: 'تسعير الباقات المخصصة وطلبات التوصيل في نفس اليوم.' }
    },
    {
      category: 'beauty',
      icon: <Droplet className="w-7 h-7 text-teal-500" />,
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?w=500&auto=format&fit=crop&q=80",
      title: { en: 'Hammams & Spas', fr: 'Hammams & Spas', ar: 'الحمامات والسبا' },
      desc: { en: 'Session bookings, gommage packages, and locker-tag checkout.', fr: 'Réservations de séances, forfaits gommage et encaissement par casier.', ar: 'حجز الجلسات، باقات التقشير، ودفع مرتبط بخزانة الملابس.' }
    },
    {
      category: 'retail',
      icon: <Puzzle className="w-7 h-7 text-fuchsia-600" />,
      image: "https://res.cloudinary.com/dozujlxeg/image/upload/v1783000127/pexels-biravencrow-33327474_tyq3vj.jpg",
      title: { en: 'Toy & Games Stores', fr: 'Magasins de jouets & jeux', ar: 'محلات الألعاب' },
      desc: { en: 'Age-range filtering and gift-wrap add-ons at checkout.', fr: 'Filtrage par tranche d\'âge et options d\'emballage cadeau à la caisse.', ar: 'تصفية حسب الفئة العمرية وخيارات تغليف الهدايا عند الدفع.' }
    },
  ];

  const categories = [
    { id: 'all', label: { en: 'All', fr: 'Tous', ar: 'الكل' }, icon: <LayoutGrid className="w-3.5 h-3.5" /> },
    { id: 'food', label: { en: 'Food & Beverage', fr: 'Restauration', ar: 'المطاعم والمقاهي' }, icon: <UtensilsCrossed className="w-3.5 h-3.5" /> },
    { id: 'retail', label: { en: 'Retail', fr: 'Commerce', ar: 'التجارة' }, icon: <Store className="w-3.5 h-3.5" /> },
    { id: 'beauty', label: { en: 'Beauty & Wellness', fr: 'Beauté & Bien-être', ar: 'التجميل والعناية' }, icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'health', label: { en: 'Health', fr: 'Santé', ar: 'الصحة' }, icon: <Activity className="w-3.5 h-3.5" /> },
    { id: 'services', label: { en: 'Services', fr: 'Services', ar: 'الخدمات' }, icon: <Wrench className="w-3.5 h-3.5" /> },
  ];

  // Unified list for the filterable grid
  const allBusinesses = [
    ...businessTypes.map((b) => ({
      key: `main-${b.id}`,
      category: b.category,
      icon: b.icon,
      image: b.image,
      title: b.title,
      desc: b.desc,
      hasTestimonial: true,
      testimonialIndex: b.id,
    })),
    ...moreIndustries.map((m, i) => ({
      key: `more-${i}`,
      category: m.category,
      icon: m.icon,
      image: m.image,
      title: lang === 'en' ? m.title.en : lang === 'fr' ? m.title.fr : m.title.ar,
      desc: lang === 'en' ? m.desc.en : lang === 'fr' ? m.desc.fr : m.desc.ar,
      hasTestimonial: false,
      testimonialIndex: null,
    })),
  ];

  const filteredBusinesses = activeCategory === 'all'
    ? allBusinesses
    : allBusinesses.filter((b) => b.category === activeCategory);

  const handleCardClick = (b: typeof allBusinesses[number]) => {
    if (b.hasTestimonial && b.testimonialIndex !== null) {
      setActiveTab(b.testimonialIndex);
      const el = document.getElementById('tabbed-testimonials-area');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-24 pb-20">

      {/* 🔮 Hero */}
      <section className="text-center max-w-2xl mx-auto pt-16 px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
          {t.businessTitle}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          {t.businessSubtitle}
        </p>
      </section>

      {/* 🧭 Category Filter + Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Filter pills — Square-style horizontal scroller */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-10 no-scrollbar justify-center flex-wrap">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`shrink-0 flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${activeCategory === c.id
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md shadow-[var(--accent)]/20'
                : 'bg-white text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--accent)] hover:text-[var(--accent)]'
                }`}
            >
              {c.icon}
              <span>{lang === 'en' ? c.label.en : lang === 'fr' ? c.label.fr : c.label.ar}</span>
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-center text-[11px] font-semibold text-[var(--text-muted)] mb-6">
          {filteredBusinesses.length} {lang === 'en' ? 'business types' : lang === 'fr' ? 'types de commerces' : 'نوع تجارة'}
        </p>

        {/* Unified card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredBusinesses.map((b) => (
            <div
              key={b.key}
              onClick={() => handleCardClick(b)}
              className={`bg-white rounded-3xl border transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden group ${b.hasTestimonial ? 'cursor-pointer' : 'cursor-default'} ${activeTab === b.testimonialIndex && b.hasTestimonial
                ? 'border-[var(--accent)] shadow-lg shadow-[var(--accent)]/10 ring-1 ring-[var(--accent)]/20'
                : 'border-[var(--border)] hover:border-[var(--accent)]/40 shadow-sm hover:shadow-2xl hover:shadow-black/10'
                }`}
            >
              {/* Image with gradient overlay for depth */}
              <div className="w-full h-44 overflow-hidden relative bg-zinc-100">
                <img
                  src={b.image}
                  alt={b.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                {/* Subtle bottom gradient so the icon badge always reads clearly */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-black/0 to-black/0" />

                {/* Icon badge — refined with ring + deeper shadow */}
                <div className="absolute bottom-3.5 left-3.5 p-2.5 bg-white rounded-2xl shadow-lg ring-1 ring-black/5 group-hover:scale-110 group-hover:-translate-y-0.5 transition-all duration-300">
                  {b.icon}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 pt-4.5 space-y-2.5">
                <h3 className="font-extrabold text-[15px] text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors duration-300 tracking-tight">
                  {b.title}
                </h3>
                <p className="text-[11.5px] text-[var(--text-secondary)] leading-relaxed line-clamp-2 min-h-[32px]">
                  {b.desc}
                </p>

                {b.hasTestimonial ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(b);
                    }}
                    className="text-[11px] font-bold text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-all cursor-pointer inline-flex items-center gap-1 pt-1"
                  >
                    <span>{lang === 'en' ? 'Read story' : lang === 'fr' ? 'Voir le témoignage' : 'اقرأ التجربة'}</span>
                    <ArrowRight className={`w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5 ${isRtl ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} />
                  </button>
                ) : (
                  <div className="pt-1 h-[18px]" />
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-16 text-sm text-[var(--text-secondary)]">
            {lang === 'en' ? 'No businesses in this category yet.' : lang === 'fr' ? 'Aucun commerce dans cette catégorie pour le moment.' : 'لا توجد أنشطة في هذه الفئة حالياً.'}
          </div>
        )}
      </section>

      {/* 💬 Tabbed Testimonials Area */}
      <section id="tabbed-testimonials-area" className="bg-gray-50/50 border-y border-[var(--border)] py-20 transition-colors">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-sm mx-auto mb-12">
            <span className="text-[10px] uppercase font-bold tracking-wider text-[var(--accent)]">
              {t.businessStoriesEyebrow}
            </span>
            <h2 className="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight leading-tight mt-1.5">
              {t.businessStoriesTitle}
            </h2>
            <p className="text-xs text-[var(--text-secondary)]">{t.businessStoriesSubtitle}</p>
          </div>

          {/* Tab switches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {businessTypes.map((b) => (
              <button
                key={b.id}
                onClick={() => setActiveTab(b.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${activeTab === b.id
                  ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                  : 'bg-white text-[var(--text-secondary)] border-[var(--border)] hover:bg-gray-100'
                  }`}
              >
                {b.title}
              </button>
            ))}
          </div>

          {/* Testimonial Active content element */}
          <div className="bg-white p-8 rounded-2xl border border-[var(--border)] shadow-xl animate-fade-in">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-12 h-12 rounded-full bg-[var(--accent-light)] text-[var(--accent)] font-extrabold text-sm flex items-center justify-center">
                {businessTypes[activeTab].testimonial.initials}
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-[var(--text-primary)]">
                  {businessTypes[activeTab].testimonial.name}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)] font-mono">
                  <span>{businessTypes[activeTab].testimonial.location}</span>
                  <span>·</span>
                  <span className="text-[var(--accent)] font-bold">{businessTypes[activeTab].title}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-1 mb-4 text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>

            <p className="text-sm font-semibold text-[var(--text-secondary)] leading-relaxed italic">
              "{businessTypes[activeTab].testimonial.text}"
            </p>
          </div>
        </div>
      </section>

      {/* 🏷️ Bottom CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[var(--accent)] border p-12 sm:p-16 rounded-3xl text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t.businessCtaTitle}
            </h2>
            <p className="text-sm text-white/90 leading-relaxed max-w-md mx-auto">
              {t.businessCtaDesc}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => onPageChange('contact')}
                className="px-8 py-4 bg-white text-[var(--accent)] hover:bg-gray-100 font-extrabold text-sm rounded-full transition-all shadow-xl hover:shadow-black/10 hover:scale-103 cursor-pointer"
              >
                {t.heroStartFreeCTA}
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}