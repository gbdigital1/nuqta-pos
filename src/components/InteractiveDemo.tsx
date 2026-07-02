import React, { useState, useEffect } from 'react';
import {
  Coffee, ShoppingBag, TrendingUp, Receipt, CheckCircle,
  Plus, Minus, Trash2, QrCode, CreditCard, DollarSign, Download,
  FileText, Sparkles, Filter, Percent, BellDot, CircleDot, RefreshCw, PenTool, Cpu, ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import analyticsDashboardImg from '../assets/images/analytics_dashboard_1781470702195.jpg';

interface InteractiveDemoProps {
  lang: Language;
  onPageChange?: (page: string) => void;
}

interface CartItem {
  id: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  price: number;
  quantity: number;
}

export default function InteractiveDemo({ lang, onPageChange }: InteractiveDemoProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [activeTab, setActiveTab] = useState<'pos' | 'analytics' | 'invoice'>('pos');

  // ==========================================
  // Tab 1: POS / CAISSE STATE & LOGIC
  // ==========================================
  const [businessType, setBusinessType] = useState<'bakery' | 'pc_store'>('pc_store');

  const bakeryProducts = [
    {
      id: 'b1',
      nameEn: 'Coffee Espresso',
      nameFr: 'Espresso Arabica',
      nameAr: 'قهوة إسبريسو',
      price: 25,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'b2',
      nameEn: 'Belgian Croissant',
      nameFr: 'Croissant Beurre',
      nameAr: 'كرواسون زبدة',
      price: 18,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'b3',
      nameEn: 'Avocado Smoothie',
      nameFr: 'Smoothie Avocat',
      nameAr: 'سموذي أفوكادو',
      price: 35,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1553530979-7ee52a2670c4?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'b4',
      nameEn: 'Club Sandwich',
      nameFr: 'Sandwich Club',
      nameAr: 'كلوب ساندويتش',
      price: 45,
      category: 'food',
      image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'b5',
      nameEn: 'Fresh Orange Juice',
      nameFr: 'Jus d’Orange Frais',
      nameAr: 'عصير برتقال طازج',
      price: 22,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'b6',
      nameEn: 'Chocolate Muffin',
      nameFr: 'Muffin Chocolat',
      nameAr: 'مافن الشوكولاتة',
      price: 20,
      category: 'dessert',
      image: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'b7',
      nameEn: 'Latte Macchiato',
      nameFr: 'Café au Lait',
      nameAr: 'لاتيه ماكياتو',
      price: 30,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Q2FmJUMzJUE5JTIwYXUlMjBMYWl0fGVufDB8MHwwfHx8MA%3D%3D'
    },
    {
      id: 'b8',
      nameEn: 'Mineral Water',
      nameFr: 'Eau Minérale',
      nameAr: 'مياه معدنية',
      price: 10,
      category: 'drinks',
      image: 'https://images.unsplash.com/photo-1550505095-81378a674395?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2F0ZXIlMjBib3R0bGV8ZW58MHwwfDB8fHww'
    }
  ];

  const pcProducts = [
    {
      id: 'pc1',
      nameEn: 'MacBook Pro M3 Max 16"',
      nameFr: 'MacBook Pro M3 Max 16"',
      nameAr: 'ماك بوك برو M3 ماكس 16"',
      price: 28900,
      category: 'computers',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'pc2',
      nameEn: 'Curved Gaming Monitor 34"',
      nameFr: 'Écran Gaming Incurvé 34"',
      nameAr: 'شاشة ألعاب منحنية 34 بوصة',
      price: 4500,
      category: 'screens',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'pc3',
      nameEn: 'Mechanical RGB Keyboard',
      nameFr: 'Clavier Mécanique RGB',
      nameAr: 'لوحة مفاتيح ميكانيكية RGB',
      price: 850,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'pc4',
      nameEn: 'Ergonomic Wireless Mouse',
      nameFr: 'Souris Ergonomique Sans Fil',
      nameAr: 'فأرة لاسلكية مريحة',
      price: 450,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'pc5',
      nameEn: 'External SSD 2TB NVMe',
      nameFr: 'Disque SSD Externe 2To NVMe',
      nameAr: 'قرص صلب خارجي SSD 2 تيرابايت',
      price: 1200,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'pc6',
      nameEn: 'Pro Noise Cancelling Headset',
      nameFr: 'Casque Pro Réduction Bruit',
      nameAr: 'سماعة رأس احترافية عازلة للضوضاء',
      price: 1500,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=250&auto=format&fit=crop&q=80'
    },
    {
      id: 'pc7',
      nameEn: 'USB-C / HDMI Multiport Hub',
      nameFr: 'Hub Multiport USB-C HDMI',
      nameAr: 'موزع منافذ USB-C / HDMI',
      price: 350,
      category: 'accessories',
      image: 'https://images.pexels.com/photos/7952599/pexels-photo-7952599.jpeg'
    },
    {
      id: 'pc8',
      nameEn: 'Aluminium Laptop Stand',
      nameFr: 'Support PC Aluminium',
      nameAr: 'قاعدة كمبيوتر من الألمنيوم',
      price: 250,
      category: 'accessories',
      image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=250&auto=format&fit=crop&q=80'
    }
  ];

  const products = businessType === 'bakery' ? bakeryProducts : pcProducts;

  const handleSwitchBusinessType = (type: 'bakery' | 'pc_store') => {
    setBusinessType(type);
    setPosCategory('all');
    setCart([]);
  };

  const getCategoryLabel = (cat: string) => {
    if (lang === 'ar') {
      switch (cat) {
        case 'all': return 'الكل';
        case 'drinks': return 'مشروبات';
        case 'food': return 'مأكولات';
        case 'dessert': return 'حلويات';
        case 'computers': return 'حواسيب';
        case 'screens': return 'شاشات';
        case 'accessories': return 'ملحقات';
        default: return cat;
      }
    } else if (lang === 'fr') {
      switch (cat) {
        case 'all': return 'Tous';
        case 'drinks': return 'Boissons';
        case 'food': return 'Nourriture';
        case 'dessert': return 'Desserts';
        case 'computers': return 'Ordinateurs';
        case 'screens': return 'Écrans';
        case 'accessories': return 'Accessoires';
        default: return cat;
      }
    } else {
      switch (cat) {
        case 'all': return 'All';
        case 'drinks': return 'Drinks';
        case 'food': return 'Food';
        case 'dessert': return 'Desserts';
        case 'computers': return 'Computers';
        case 'screens': return 'Screens';
        case 'accessories': return 'Accessories';
        default: return cat;
      }
    }
  };

  const [posCategory, setPosCategory] = useState<string>('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card' | 'qr'>('card');
  const [isCharging, setIsCharging] = useState<boolean>(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<boolean>(false);
  const [changeReturned, setChangeReturned] = useState<number>(0);
  const [cashOffered, setCashOffered] = useState<number>(0);
  const [tapStep, setTapStep] = useState<'idle' | 'tapping' | 'approved'>('idle');
  const [qrStep, setQrStep] = useState<'idle' | 'scanning' | 'expired' | 'success'>('idle');
  const [lastOrderDetails, setLastOrderDetails] = useState<any>(null);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = Math.round(subtotal * 0.2); // 20% standard VAT
  const total = subtotal + tax;

  const handleAddToCart = (product: typeof products[0]) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, {
        id: product.id,
        nameEn: product.nameEn,
        nameFr: product.nameFr,
        nameAr: product.nameAr,
        price: product.price,
        quantity: 1
      }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return { ...item, quantity: newQty < 1 ? 1 : newQty };
        }
        return item;
      });
    });
  };

  const handleChargeSubmit = () => {
    if (cart.length === 0) return;
    setIsCharging(true);
    setTapStep('idle');
    setQrStep('idle');
    setCashOffered(0);
    setChangeReturned(0);

    if (paymentMethod === 'card') {
      setTapStep('idle');
    } else if (paymentMethod === 'qr') {
      setQrStep('scanning');
      setTimeout(() => {
        setQrStep('success');
      }, 2000);
    } else {
      // cash
      setCashOffered(Math.ceil(total / 10) * 10);
    }
  };

  const handleConfirmCashCheckout = () => {
    const change = Math.max(0, cashOffered - total);
    setChangeReturned(change);
    handleCompleteOrder();
  };

  const handleConfirmTap = () => {
    setTapStep('tapping');
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      setTimeout(() => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.setValueAtTime(1400, audioCtx.currentTime);
        osc.type = 'sine';
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        osc.start();
        setTimeout(() => osc.stop(), 120);
      }, 800);
    } catch (e) {
      // Audio Context unsupported or blocked
    }

    setTimeout(() => {
      setTapStep('approved');
      setTimeout(() => {
        handleCompleteOrder();
      }, 600);
    }, 1000);
  };

  const handleCompleteOrder = () => {
    setLastOrderDetails({
      items: [...cart],
      subtotal,
      tax,
      total,
      paymentMethod,
      date: new Date().toLocaleTimeString(),
      id: 'NQ-' + Math.floor(Math.random() * 900000 + 100000)
    });

    setIsCharging(false);
    setCheckoutSuccess(true);

    const firstItemName = lang === 'en' ? cart[0].nameEn : lang === 'fr' ? cart[0].nameFr : cart[0].nameAr;
    const descStr = cart.length > 1 ? `${firstItemName} + ${cart.length - 1} items` : firstItemName;

    setLiveSales(prev => [
      { id: Date.now().toString(), name: descStr, price: total, time: 'Just now' },
      ...prev.slice(0, 4)
    ]);
  };

  const handleCloseReceipt = () => {
    setCart([]);
    setCheckoutSuccess(false);
    setLastOrderDetails(null);
  };

  // ==========================================
  // Tab 2: ANALYTICS STATE & LOGIC
  // ==========================================
  const [liveSales, setLiveSales] = useState<{ id: string; name: string; price: number; time: string }[]>([
    { id: '1', name: 'Espresso + Croissant', price: 43, time: '2 mins ago' },
    { id: '2', name: 'Club Sandwich', price: 45, time: '5 mins ago' },
    { id: '3', name: 'Smoothie Avocat', price: 35, time: '12 mins ago' }
  ]);

  const [activeAlerts, setActiveAlerts] = useState([
    { id: 'a1', product: 'Croissant Beurre', stock: 4, min: 20, location: 'Casablanca Port' },
    { id: 'a2', product: 'Avocado boxes', stock: 2, min: 10, location: 'Marrakech Guéliz' }
  ]);

  const handleReplenishAlert = (alertId: string) => {
    setActiveAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  // ==========================================
  // Tab 3: INVOICE / DEVIS STATE & LOGIC
  // ==========================================
  const [invoiceType, setInvoiceType] = useState<'invoice' | 'quote'>('invoice');
  const [invoiceClientName, setInvoiceClientName] = useState('BOP SARL AU');
  const [invoiceAddress, setInvoiceAddress] = useState('Boulevard d\'Anfa, N° 124, Casablanca');
  const [invoiceCompany, setInvoiceCompany] = useState('Nuqta POS SARL');
  const [invoiceIce, setInvoiceIce] = useState('001920394059203');
  const [invoiceSuccess, setInvoiceSuccess] = useState(false);
  const [signatureSaved, setSignatureSaved] = useState<boolean>(false);
  const [signatureName, setSignatureName] = useState<string>('');
  const [invoiceItemsActive, setInvoiceItemsActive] = useState({
    laptop: true,
    phone: true,
    watch: false,
  });

  const activeInvoiceItems = [
    { key: 'laptop', name: 'MacBook Pro 16" M4 Max', price: 42999, qty: 1 },
    { key: 'phone', name: 'iPhone 17 Pro Max 1TB', price: 18500, qty: 1 },
    { key: 'watch', name: 'Apple Watch Ultra 2', price: 9200, qty: 1 }
  ].filter(item => invoiceItemsActive[item.key]);

  const invoiceSubtotal = activeInvoiceItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const invoiceTax = Math.round(invoiceSubtotal * 0.2); // 20% Moroccan VAT
  const invoiceTotal = invoiceSubtotal + invoiceTax;

  const handleInvoiceSignAndExport = () => {
    if (!signatureSaved && signatureName.trim() !== '') {
      setSignatureSaved(true);
    }
    setInvoiceSuccess(true);
    setTimeout(() => {
      setInvoiceSuccess(false);
    }, 4000);
  };

  return (
    <div id="demo-interactive-widget" className="relative w-full bg-white rounded-3xl border border-slate-200/90 shadow-xl overflow-hidden transition-all text-left">

      {/* 🔮 Top Tab Selector Header: Segmented Control (European 2026 UI style, Minimal, Modern) */}
      <div className="bg-slate-50/80 border-b border-slate-200/60 p-2 flex gap-1 overflow-x-auto scrollbar-none scroll-smooth">
        <button
          onClick={() => setActiveTab('pos')}
          className={`flex-1 min-w-[140px] py-3.5 px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-250 cursor-pointer ${activeTab === 'pos'
            ? 'bg-white text-[#006AFF] border border-slate-200/50 shadow-sm font-extrabold'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
        >
          <ShoppingBag className="w-4 h-4 shrink-0 text-blue-500" />
          <span>{lang === 'ar' ? 'صندوق الكاشير' : lang === 'fr' ? 'Point de Vente' : 'POS Register'}</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`flex-1 min-w-[140px] py-3.5 px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-250 cursor-pointer ${activeTab === 'analytics'
            ? 'bg-white text-[#006AFF] border border-slate-200/50 shadow-sm font-extrabold'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
        >
          <TrendingUp className="w-4 h-4 shrink-0 text-amber-500" />
          <span>{lang === 'ar' ? 'الإحصائيات' : lang === 'fr' ? 'Analytics' : 'Analytics'}</span>
        </button>

        <button
          onClick={() => setActiveTab('invoice')}
          className={`flex-1 min-w-[140px] py-3.5 px-5 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all duration-250 cursor-pointer ${activeTab === 'invoice'
            ? 'bg-white text-[#006AFF] border border-slate-200/50 shadow-sm font-extrabold'
            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
            }`}
        >
          <FileText className="w-4 h-4 shrink-0 text-emerald-500" />
          <span>{lang === 'ar' ? 'الفواتير والأسعار' : lang === 'fr' ? 'Facturation' : 'Invoices & Quotes'}</span>
        </button>
      </div>

      {/* =================================================== */}
      {/* Tab 1: Point de Vente Caisse                        */}
      {/* =================================================== */}
      {activeTab === 'pos' && (
        <div className="flex flex-col w-full animate-fade-in">

          {/* Sleek Minimal Switcher Header */}
          <div className="px-6 py-4 bg-slate-50/45 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
            </div>
            <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200/80 gap-1 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleSwitchBusinessType('bakery')}
                className={`px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold transition-all flex items-center gap-1 cursor-pointer select-none ${businessType === 'bakery'
                  ? 'bg-white text-[#006AFF] shadow-xs font-extrabold border border-slate-200/40'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <Coffee className="w-3.5 h-3.5 text-amber-600" />
                <span>{lang === 'en' ? 'Bakery' : lang === 'fr' ? 'Boulangerie' : 'مخبز'}</span>
              </button>
              <button
                type="button"
                onClick={() => handleSwitchBusinessType('pc_store')}
                className={`px-3 py-1.5 rounded-lg text-[9px] uppercase font-bold transition-all flex items-center gap-1 cursor-pointer select-none ${businessType === 'pc_store'
                  ? 'bg-white text-[#006AFF] shadow-xs font-extrabold border border-slate-200/40'
                  : 'text-slate-500 hover:text-slate-800'
                  }`}
              >
                <Cpu className="w-3.5 h-3.5 text-blue-600" />
                <span>{lang === 'en' ? 'Tech Shop' : lang === 'fr' ? 'Informatique' : 'بيع الأجهزة'}</span>
              </button>
            </div>
          </div>

          {/* Main 2-column Container */}
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px] border-b border-slate-200">

            {/* Left Column: Catalogue (7/12 width on desktop, stacked on mobile) */}
            <div className="lg:col-span-7 p-5 space-y-4">
              <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
                <div>
                  <h3 className="font-extrabold text-xs uppercase text-slate-800 tracking-wider">
                    {lang === 'en' ? 'Catalogue' : lang === 'fr' ? 'Catalogue' : 'الفهرس'}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono">
                    {businessType === 'bakery' ? 'Gourmet boulangerie coffee' : 'Premium computer hardware'}
                  </p>
                </div>

                {/* Filter tags (European 2026 pills - white, clean, no dark styles) */}
                <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200/60 max-w-full overflow-x-auto scrollbar-none gap-0.5">
                  {(businessType === 'bakery'
                    ? ['all', 'drinks', 'food', 'dessert']
                    : ['all', 'computers', 'screens', 'accessories']
                  ).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setPosCategory(cat)}
                      className={`px-3 py-1 text-[10px] uppercase font-bold rounded-lg tracking-wider transition-all cursor-pointer whitespace-nowrap ${posCategory === cat
                        ? 'bg-white shadow-sm text-[#006AFF] font-extrabold'
                        : 'text-slate-600 hover:text-slate-900'
                        }`}
                    >
                      {getCategoryLabel(cat)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Elegant Grid of Products */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {products
                  .filter(p => posCategory === 'all' || p.category === posCategory)
                  .map((p) => {
                    const nameStr = lang === 'en' ? p.nameEn : lang === 'fr' ? p.nameFr : p.nameAr;
                    return (
                      <button
                        key={p.id}
                        onClick={() => handleAddToCart(p)}
                        className="group relative flex flex-col bg-slate-100 rounded-2xl border border-slate-200 hover:border-[#006AFF]/60 shadow-none hover:shadow-md transition-all text-left duration-200 overflow-hidden h-40 active:scale-97 cursor-pointer"
                      >
                        {/* Image qui couvre tout le fond */}
                        <img
                          src={p.image}
                          alt={nameStr}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />

                        {/* Overlay sombre pour la lisibilité du texte */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        {/* Badge de prix en haut à droite */}
                        <div className="absolute top-2 right-2 bg-[#006AFF] text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-md shadow-sm z-10">
                          {p.price} MAD
                        </div>

                        {/* Contenu textuel positionné en bas */}
                        <div className="relative mt-auto p-3 z-10">
                          <p className="font-extrabold text-[11px] leading-tight text-white truncate mb-1">
                            {nameStr}
                          </p>
                          <div className="flex justify-between items-center text-[8px] font-mono text-slate-200 uppercase tracking-wider">
                            <span className="font-bold">{p.category}</span>
                            <span className="bg-white/20 backdrop-blur-md px-1.5 py-0.5 rounded text-white">+ Ajouter</span>
                          </div>
                        </div>
                      </button>

                    );
                  })}
              </div>
            </div>

            {/* Right Column: Basket (5/12 width on desktop, stacked on mobile) */}
            <div className="lg:col-span-5 p-5 flex flex-col justify-between bg-slate-50/60 relative">

              {/* Payment Processing Overlay */}
              {isCharging && (
                <div className="absolute inset-0 bg-white z-20 flex flex-col justify-between p-5 animate-fade-in border-t lg:border-t-0 lg:border-l border-slate-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">Caisse Transaction</h4>
                      <button
                        onClick={() => setIsCharging(false)}
                        className="text-xs text-red-500 hover:text-red-700 font-bold"
                      >
                        {lang === 'ar' ? 'إلغاء' : 'Annuler'}
                      </button>
                    </div>

                    <div className="text-center py-4 bg-slate-50 rounded-2xl border border-slate-200/60">
                      <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest block">MONTANT DE LA VENTE</span>
                      <h2 className="text-2xl font-extrabold font-mono text-[#006AFF] mt-1">{total} MAD</h2>
                      <p className="text-[10px] text-slate-500 font-bold mt-1">
                        Méthode: <span className="uppercase text-slate-800 font-bold">{paymentMethod}</span>
                      </p>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="space-y-4 p-4 border border-slate-200 bg-white rounded-xl text-center shadow-sm">
                        <div className="w-12 h-10 bg-slate-50 rounded-lg flex items-center justify-center mx-auto border border-dashed relative">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          {tapStep === 'tapping' && <div className="absolute inset-0 bg-blue-500/10 animate-ping rounded-lg" />}
                        </div>

                        {tapStep === 'idle' && (
                          <div className="space-y-3">
                            <p className="text-[11px] text-slate-500 leading-relaxed">Présentez ou insérez une carte bancaire de démonstration sur le lecteur CMI.</p>
                            <button
                              onClick={handleConfirmTap}
                              className="px-6 py-2.5 bg-[#006AFF] hover:bg-[#0055CC] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer w-full inline-flex items-center justify-center gap-1.5"
                            >
                              <CreditCard className="w-3.5 h-3.5" />
                              <span>Simuler le paiement par carte (TAP)</span>
                            </button>
                          </div>
                        )}

                        {tapStep === 'tapping' && (
                          <div className="space-y-2 py-1">
                            <div className="w-4 h-4 border-2 border-[#006AFF] border-t-transparent rounded-full animate-spin mx-auto" />
                            <p className="text-xs text-[#006AFF] font-bold animate-pulse">Communication CMI en cours...</p>
                          </div>
                        )}

                        {tapStep === 'approved' && (
                          <div className="space-y-1 text-emerald-600 font-bold py-1">
                            <CheckCircle className="w-5 h-5 mx-auto animate-bounce mb-1" />
                            <p className="text-xs">{lang === 'ar' ? 'تمت العملية بنجاح' : 'PAIEMENT APPROUVÉ ✓'}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {paymentMethod === 'cash' && (
                      <div className="space-y-4 p-4 border border-slate-200 bg-white rounded-xl shadow-sm">
                        <div className="space-y-1">
                          <label className="text-[9px] uppercase font-bold text-slate-400">Espèces reçues</label>
                          <div className="grid grid-cols-4 gap-1">
                            {[20, 50, 100, 200].map((note) => (
                              <button
                                key={note}
                                onClick={() => setCashOffered(prev => prev + note)}
                                className="py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-800 text-xs font-mono font-bold transition-all cursor-pointer"
                              >
                                +{note}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2 border-t border-slate-100 pt-3 font-mono text-[11px]">
                          <div className="flex justify-between text-slate-500">
                            <span>Total à payer:</span>
                            <span>{total} MAD</span>
                          </div>
                          <div className="flex justify-between items-center text-slate-800 font-bold bg-slate-50 p-2 rounded-lg">
                            <span>Espèces données:</span>
                            <span className="text-blue-600 font-extrabold">{cashOffered} MAD</span>
                          </div>
                          <div className="flex justify-between text-emerald-600 font-bold border-t border-dashed border-slate-200 pt-2">
                            <span>Monnaie à rendre:</span>
                            <span>{Math.max(0, cashOffered - total)} MAD</span>
                          </div>
                        </div>

                        <button
                          onClick={handleConfirmCashCheckout}
                          disabled={cashOffered < total}
                          className={`w-full py-2.5 rounded-xl text-xs font-bold text-center transition-all cursor-pointer ${cashOffered >= total
                            ? 'bg-[#006AFF] hover:bg-[#0055CC] text-white'
                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                          Valider et rendre la monnaie
                        </button>
                      </div>
                    )}

                    {paymentMethod === 'qr' && (
                      <div className="space-y-4 p-4 border border-slate-200 bg-white rounded-xl text-center shadow-sm">
                        <div className="w-20 h-20 border border-slate-100 rounded-xl bg-slate-50 p-2.5 flex items-center justify-center mx-auto">
                          <QrCode className="w-14 h-14 text-slate-600" />
                        </div>

                        {qrStep === 'scanning' && (
                          <div className="space-y-2 py-1">
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                              <div className="h-full bg-indigo-500 animate-pulse" style={{ width: '70%' }} />
                            </div>
                            <p className="text-[10px] text-slate-400 font-mono leading-none">Attente de la transaction MAROC PAY...</p>
                          </div>
                        )}

                        {qrStep === 'success' && (
                          <div className="text-emerald-600 font-bold space-y-1">
                            <CheckCircle className="w-5 h-5 mx-auto animate-bounce mb-1" />
                            <p className="text-xs">DÉTECTÉ & CONFIRMÉ✓</p>
                            <button
                              onClick={handleCompleteOrder}
                              className="mt-3 px-4 py-2 bg-[#006AFF] text-white text-[10px] w-full rounded-xl font-bold cursor-pointer"
                            >
                              Imprimer le ticket
                            </button>
                          </div>
                        )}
                      </div>
                    )}

                  </div>

                  <button
                    onClick={() => setIsCharging(false)}
                    className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-xs font-bold rounded-xl text-slate-600 transition-all cursor-pointer"
                  >
                    Retour au panier
                  </button>
                </div>
              )}

              {/* Receipt / Thermal Sheet Pop-up */}
              {checkoutSuccess && lastOrderDetails && (
                <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-xs z-30 flex items-center justify-center p-4 animate-fade-in">
                  <div className="w-full max-w-xs bg-white text-slate-800 border border-slate-200 rounded-2xl shadow-xl p-5 space-y-4 font-mono text-[10px] relative animate-ticket-print">

                    <div className="text-center space-y-1">
                      <div className="inline-flex py-0.5 px-2 bg-emerald-50 text-emerald-600 border border-emerald-200/50 rounded-full font-sans font-bold text-[8px] mb-1">
                        PAYÉ ✓
                      </div>
                      <h4 className="font-extrabold text-[11px] text-slate-900 uppercase">
                        {businessType === 'bakery' ? 'Boulangerie Gourmet' : 'Nuqta Tech Store'}
                      </h4>
                      <p className="text-slate-400 text-[9px]">CASABLANCA COEUR D'ANFA</p>
                    </div>

                    <div className="border-t border-slate-200 border-dashed pt-2 space-y-1 text-slate-500 text-[9px]">
                      <div className="flex justify-between">
                        <span>Ref ID:</span>
                        <span className="font-bold text-slate-700">{lastOrderDetails.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span>{lastOrderDetails.date}</span>
                      </div>
                    </div>

                    <div className="border-t border-b border-slate-200 border-dashed py-2 space-y-1">
                      {lastOrderDetails.items.map((item: any) => {
                        const label = lang === 'en' ? item.nameEn : lang === 'fr' ? item.nameFr : item.nameAr;
                        return (
                          <div key={item.id} className="flex justify-between gap-2 text-slate-600 font-semibold">
                            <span className="truncate">{label} × {item.quantity}</span>
                            <span className="shrink-0 font-bold">{(item.price * item.quantity).toFixed(0)} MAD</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="space-y-1 text-slate-550 text-right">
                      <div className="flex justify-between text-[9px]">
                        <span>TVA (20%):</span>
                        <span>{lastOrderDetails.tax.toFixed(0)} MAD</span>
                      </div>
                      <div className="flex justify-between font-extrabold text-[11px] text-slate-900 border-t border-dashed border-slate-200 pt-1.5 mt-1">
                        <span>TOTAL PAYÉ:</span>
                        <span>{lastOrderDetails.total.toFixed(0)} MAD</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-200 border-dashed pt-3 text-center space-y-3">
                      {lastOrderDetails.paymentMethod === 'cash' ? (
                        <div className="space-y-1 text-slate-500 font-bold border rounded-lg p-2 bg-slate-50 border-dashed text-[8px]">
                          <p>Espèce reçu: {cashOffered} MAD</p>
                          <p className="text-emerald-600">Rendu: {changeReturned} MAD</p>
                        </div>
                      ) : (
                        <p className="text-[8px] text-slate-500 font-bold">
                          Trans: {lastOrderDetails.paymentMethod === 'card' ? 'Carte Bancaire CMI' : 'Code QR MarocPay'}
                        </p>
                      )}

                      <p className="text-[8px] text-slate-450 italic leading-none">Merci pour votre confiance · Nuqta POS</p>

                      <button
                        onClick={handleCloseReceipt}
                        className="w-full py-2.5 bg-[#006AFF] hover:bg-[#0055CC] text-white text-xs font-sans font-bold rounded-xl cursor-pointer"
                      >
                        Nouvelle vente
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* Basket list layout */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-extrabold text-xs uppercase text-slate-800 tracking-wider">
                    {lang === 'en' ? 'Current Basket' : lang === 'fr' ? 'Panier encours' : 'السلة الحالية'}
                  </h3>
                  {cart.length > 0 && (
                    <button
                      onClick={() => setCart([])}
                      className="p-1 px-1.5 text-[9px] text-red-500 hover:bg-red-50 rounded-lg flex items-center gap-1 font-bold font-mono cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'مسح' : 'Vider'}</span>
                    </button>
                  )}
                </div>

                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center text-center py-16 text-slate-400 space-y-3">
                    <ShoppingBag className="w-10 h-10 stroke-1 opacity-50 text-slate-350" />
                    <p className="text-[11px] px-6 font-semibold leading-relaxed">
                      Le panier est vide. Sélectionnez des articles à gauche pour simuler l'enregistrement en temps réel.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {cart.map((item) => {
                      const itemName = lang === 'en' ? item.nameEn : lang === 'fr' ? item.nameFr : item.nameAr;
                      return (
                        <div key={item.id} className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white shadow-xs">
                          <div className="min-w-0 flex-1 pr-1.5">
                            <p className="font-bold text-[11px] text-slate-800 truncate">
                              {itemName}
                            </p>
                            <p className="text-[10px] text-slate-400 font-mono font-bold mt-0.5">
                              {item.price} MAD × {item.quantity}
                            </p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 text-slate-500 hover:bg-slate-100 rounded-md border border-slate-200 bg-slate-50 cursor-pointer"
                            >
                              <Minus className="w-2.5 h-2.5" />
                            </button>
                            <span className="text-[11px] font-bold min-w-3 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 text-slate-500 hover:bg-slate-100 rounded-md border border-slate-200 bg-slate-50 cursor-pointer"
                            >
                              <Plus className="w-2.5 h-2.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Basket Totals block */}
              <div className="mt-6 pt-3 border-t border-slate-200/80 border-dashed space-y-4">
                <div className="space-y-1 font-mono text-[10px] font-semibold text-slate-500">
                  <div className="flex justify-between">
                    <span>Base HT:</span>
                    <span>{subtotal.toFixed(0)} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (20%):</span>
                    <span>{tax.toFixed(0)} MAD</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-[11px] text-slate-900 border-t border-dashed border-slate-250 pt-1.5 mt-1.5">
                    <span>NET À PAYER (TTC):</span>
                    <span className="text-[#006AFF] font-bold">{total.toFixed(0)} MAD</span>
                  </div>
                </div>

                {/* Encaissement method choice selector */}
                <div className="space-y-2.5 pt-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Moyen d'encaissement</span>
                  <div className="grid grid-cols-3 gap-1.5 matches-responsive">
                    <button
                      onClick={() => setPaymentMethod('card')}
                      className={`py-2 px-1 rounded-xl border text-center flex flex-col items-center justify-center gap-1 font-bold text-[9px] transition-all cursor-pointer ${paymentMethod === 'card'
                        ? 'border-[#006AFF] bg-blue-50/60 text-[#006AFF] shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      <CreditCard className="w-3.5 h-3.5 text-blue-500" />
                      <span>Carte CMI</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('cash')}
                      className={`py-2 px-1 rounded-xl border text-center flex flex-col items-center justify-center gap-1 font-bold text-[9px] transition-all cursor-pointer ${paymentMethod === 'cash'
                        ? 'border-[#006AFF] bg-blue-50/60 text-[#006AFF] shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Espèces</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('qr')}
                      className={`py-2 px-1 rounded-xl border text-center flex flex-col items-center justify-center gap-1 font-bold text-[9px] transition-all cursor-pointer ${paymentMethod === 'qr'
                        ? 'border-[#006AFF] bg-blue-50/60 text-[#006AFF] shadow-xs'
                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                        }`}
                    >
                      <QrCode className="w-3.5 h-3.5 text-indigo-500" />
                      <span>MarocPay QR</span>
                    </button>
                  </div>
                </div>

                {/* Primary valider button */}
                <button
                  onClick={handleChargeSubmit}
                  disabled={cart.length === 0}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs text-white text-center flex items-center justify-center gap-2 cursor-pointer transition-all ${cart.length > 0
                    ? 'bg-[#006AFF] hover:bg-[#0055CC] shadow-sm hover:scale-[1.01]'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                >
                  <span>VALIDER L'ACHAT</span>
                  {cart.length > 0 && <span className="font-mono bg-white/15 px-1.5 py-0.5 rounded text-[9px]">{total.toFixed(0)} MAD</span>}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* Tab 2: Analytics Dashboard                          */}
      {/* =================================================== */}
      {activeTab === 'analytics' && (
        <div className="p-5 space-y-5 animate-fade-in">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">Suivi multi-boutiques Cloud</h3>
              <p className="text-[10px] text-slate-400 font-mono">Tableau de bord de pilotage consolidé de vos points de vente</p>
            </div>
            <div className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-250 py-1 px-3 rounded-full uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connexion Réseau OK
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">

            {/* Left Column: Premium visual reporting chart frame */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs flex-1 space-y-3 flex flex-col justify-start">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] uppercase font-bold text-slate-400 flex items-center gap-1">
                    <CircleDot className="w-3.5 h-3.5 text-blue-600" />
                    Vue d'ensemble centralisée (SaaS Live)
                  </span>
                  <span className="text-[9px] font-mono text-slate-450 bg-slate-100 px-2 py-0.5 rounded font-bold">ICE: 00124930219</span>
                </div>

                {/* Dashboard Image Display frame */}
                <div className="relative border border-slate-200 rounded-2xl overflow-hidden bg-slate-100 shadow-sm flex-1 max-h-[250px]">
                  <img
                    src="https://res.cloudinary.com/dozujlxeg/image/upload/v1782990285/Screenshot_2026-07-02_120302_btohyb.png"
                    alt="Nuqta Cloud Analytics"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex flex-col justify-end p-4 pointer-events-none">
                    <div className="space-y-0.5 text-white">
                      <span className="text-[8px] uppercase tracking-widest font-bold text-amber-300">DEMO METRIC SIMULATION</span>
                      <h4 className="font-extrabold text-xs">{lang === 'ar' ? 'لوحة المبيعات والتقارير' : 'Portail Cloud Central Nuqta'}</h4>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] font-semibold text-slate-500 pt-1">
                  <p>Synchronisation automatique des stocks de chaque boutique.</p>
                  <button
                    onClick={() => setActiveTab('pos')}
                    className="text-[#006AFF] font-bold text-[9px] uppercase tracking-wide cursor-pointer"
                  >
                    Simulez une vente →
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Key metrics lists and stock alerts */}
            <div className="lg:col-span-5 space-y-4">

              {/* KPIS */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-extrabold text-[10px] uppercase text-slate-400 tracking-wider">Performance Globale</h4>

                <div className="grid grid-cols-2 gap-3 font-mono text-center">
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <span className="text-[8px] font-bold text-slate-400 uppercase block mb-0.5">CA Cumulé</span>
                    <span className="text-sm font-extrabold text-emerald-600">42 910 MAD</span>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
                    <span className="text-[8px] font-bold text-slate-400 uppercase block mb-0.5">Transactions</span>
                    <span className="text-sm font-extrabold text-slate-800">148 tickets</span>
                  </div>
                </div>
              </div>

              {/* Stock Alerts simulation */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-extrabold text-[10px] uppercase text-slate-400 tracking-wider flex items-center gap-1.5">
                    <BellDot className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                    Alertes de rupture
                  </h4>
                  <span className="text-[9px] font-bold bg-red-50 text-red-600 px-2.5 py-0.5 rounded-full border border-red-200/30">
                    {activeAlerts.length}
                  </span>
                </div>

                {activeAlerts.length === 0 ? (
                  <div className="p-3 bg-emerald-50 border border-emerald-200/50 text-emerald-600 font-bold rounded-xl text-center text-[10px]">
                    Tous les stocks sont à niveau optimal ! ✓
                  </div>
                ) : (
                  <div className="space-y-2">
                    {activeAlerts.map((alert) => (
                      <div key={alert.id} className="p-2.5 bg-red-50/40 text-slate-700 border border-red-100 rounded-lg flex items-center justify-between text-[11px] gap-2">
                        <div className="min-w-0 flex-1 leading-snug">
                          <p className="font-extrabold text-[11px] truncate text-slate-800">{alert.product}</p>
                          <p className="text-[9px] text-red-500 font-bold font-mono">Stock actuel: {alert.stock} u (Seuil min: {alert.min})</p>
                        </div>

                        <button
                          onClick={() => handleReplenishAlert(alert.id)}
                          className="px-2.5 py-1 bg-slate-900 hover:bg-black text-[9px] font-bold text-white rounded-lg cursor-pointer shrink-0 transition-colors uppercase tracking-wider"
                        >
                          Remplir
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Transactions log list */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2.5 font-mono text-[10px]">
                <h4 className="font-sans font-extrabold text-[10px] uppercase text-slate-400 tracking-wider">Flux des ventes récentes</h4>
                <div className="space-y-1.5 max-h-[110px] overflow-y-auto pr-1">
                  {liveSales.map((sale) => (
                    <div key={sale.id} className="flex justify-between items-center p-2 rounded bg-slate-50 border border-slate-100 text-xs">
                      <div>
                        <p className="font-bold text-slate-800 truncate text-[11px]">{sale.name}</p>
                        <span className="text-[9px] text-slate-405">{sale.time}</span>
                      </div>
                      <span className="font-bold text-emerald-600">+{sale.price} MAD</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* =================================================== */}
      {/* Tab 3: Facturation & Devis                         */}
      {/* =================================================== */}
      {activeTab === 'invoice' && (
        <div className="p-5 space-y-5 animate-fade-in">

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-800">Éditeur de devis & factures</h3>
              <p className="text-[10px] text-slate-400 font-mono">Saisissez les informations clients pour simuler le rendu professionnel PDF</p>
            </div>

            {/* Toggle bar between invoice and quote */}
            <div className="flex bg-slate-100 p-0.5 rounded-xl border border-slate-200">
              <button
                onClick={() => setInvoiceType('invoice')}
                className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${invoiceType === 'invoice'
                  ? 'bg-white text-[#006AFF] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                FACTURE
              </button>
              <button
                onClick={() => setInvoiceType('quote')}
                className={`px-4 py-1.5 text-[10px] font-bold rounded-lg transition-all cursor-pointer ${invoiceType === 'quote'
                  ? 'bg-white text-[#006AFF] shadow-sm font-extrabold'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                DEVIS
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

            {/* Left Column: Invoice Form Controls */}
            <div className="lg:col-span-5 space-y-4">

              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-extrabold text-[10px] uppercase text-slate-400 tracking-wider">Coordonnées Client</h4>

                <div className="space-y-3 text-[11px] font-semibold text-slate-600">
                  <div>
                    <label className="block text-[8px] uppercase tracking-wider font-mono text-slate-400 mb-1">Raison Sociale / Société</label>
                    <input
                      type="text"
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-850 font-sans focus:border-[#006AFF] outline-none transition-all"
                      value={invoiceCompany}
                      onChange={(e) => setInvoiceCompany(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-wider font-mono text-slate-400 mb-1">Nom du Contact</label>
                    <input
                      type="text"
                      className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-850 font-sans focus:border-[#006AFF] outline-none transition-all"
                      value={invoiceClientName}
                      onChange={(e) => setInvoiceClientName(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[8px] uppercase tracking-wider font-mono text-slate-400 mb-1">ICE Entreprise</label>
                      <input
                        type="text"
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-850 font-mono focus:border-[#006AFF] outline-none transition-all"
                        value={invoiceIce}
                        onChange={(e) => setInvoiceIce(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] uppercase tracking-wider font-mono text-slate-400 mb-1">Adresse</label>
                      <input
                        type="text"
                        className="w-full p-2.5 rounded-lg border border-slate-200 bg-slate-50/50 text-slate-850 font-sans focus:border-[#006AFF] outline-none transition-all"
                        value={invoiceAddress}
                        onChange={(e) => setInvoiceAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Items checklist */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-extrabold text-[10px] uppercase text-slate-400 tracking-wider">Sélection des Éléments</h4>

                <div className="space-y-2 text-[11px] text-slate-700">
                  <label className="flex items-start gap-2.5 p-2 border border-slate-100 hover:bg-slate-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      checked={invoiceItemsActive.laptop}
                      onChange={(e) => setInvoiceItemsActive({ ...invoiceItemsActive, laptop: e.target.checked })}
                    />
                    <div>
                      <p className="font-bold">MacBook Pro 16" M4 Max</p>
                      <span className="text-[9px] text-slate-450 font-mono">42,999.00 MAD</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-2 border border-slate-100 hover:bg-slate-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      checked={invoiceItemsActive.phone}
                      onChange={(e) => setInvoiceItemsActive({ ...invoiceItemsActive, phone: e.target.checked })}
                    />
                    <div>
                      <p className="font-bold">iPhone 17 Pro Max 1TB</p>
                      <span className="text-[9px] text-slate-450 font-mono">18,500.00 MAD</span>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 p-2 border border-slate-100 hover:bg-slate-50 rounded-xl cursor-pointer">
                    <input
                      type="checkbox"
                      className="mt-0.5"
                      checked={invoiceItemsActive.watch}
                      onChange={(e) => setInvoiceItemsActive({ ...invoiceItemsActive, watch: e.target.checked })}
                    />
                    <div>
                      <p className="font-bold">Apple Watch Ultra 2</p>
                      <span className="text-[9px] text-slate-450 font-mono">9,200.00 MAD</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Signature input text */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
                <h4 className="font-extrabold text-[10px] uppercase text-slate-400 tracking-wider flex items-center gap-1">
                  <PenTool className="w-3.5 h-3.5 text-[#006AFF]" />
                  <span>Signature Responsable</span>
                </h4>
                <input
                  type="text"
                  value={signatureName}
                  onChange={(e) => {
                    setSignatureName(e.target.value);
                    if (e.target.value === '') setSignatureSaved(false);
                  }}
                  placeholder="Tapez vos initiales pour signer (ex: A.B)"
                  className="w-full p-2 text-[11px] rounded-lg border border-slate-200 bg-slate-50 font-mono outline-none"
                />
              </div>

              <button
                onClick={handleInvoiceSignAndExport}
                className="w-full py-3 bg-[#006AFF] hover:bg-[#0055CC] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span>EXPÉDIER LA VERSION SIGNÉE</span>
              </button>

              {invoiceSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-600 text-[10px] rounded-xl font-bold border border-emerald-150 flex items-start gap-2 leading-tight">
                  <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>Document envoyé avec succès au format PDF sécurisé ! ✓</span>
                </div>
              )}
            </div>

            {/* Right Column: Previews beautifully structured Invoice Sheet (Standard light paper mockup) */}
            <div className="lg:col-span-7 bg-white text-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 font-sans text-[11px] relative max-w-full overflow-x-auto min-h-[500px] h-full flex flex-col justify-between">

              {/* Decorative Subtle Stamp of Trust */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none rounded-2xl overflow-hidden">
                <div className="border-[8px] border-blue-600 rounded-full p-10 text-center transform -rotate-12">
                  <p className="text-3xl font-extrabold">NUQTA POS</p>
                  <p className="text-[10px] font-mono mt-1">VERIFIED CLOUD ORIGIN</p>
                </div>
              </div>

              {invoiceSuccess && (
                <div className="absolute top-5 right-5 z-10 border border-emerald-500 text-emerald-600 font-extrabold text-[8px] tracking-widest uppercase px-2.5 py-0.5 rotate-3 bg-white rounded-md shadow-xs">
                  <span>Signé Nuqta✓</span>
                </div>
              )}

              {/* Invoice Layout Elements */}
              <div className="space-y-4">
                <div className="flex justify-between items-start border-b border-slate-100 pb-3 gap-3 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <div className="w-4 h-4 bg-slate-900 rounded flex items-center justify-center text-white font-extrabold text-[10px]">N</div>
                      <h4 className="font-extrabold text-[10px] text-slate-900">NUQTA RETAIL SARL</h4>
                    </div>
                    <p className="text-slate-400 text-[8px] font-mono leading-relaxed">
                      Angle Bd d'Anfa et Zerktouni, Casablanca<br />
                      ICE: 001192039201991 · RC 490218
                    </p>
                  </div>
                  <div className="text-right space-y-1 font-mono">
                    <span className="inline-block px-2 py-0.5 bg-slate-50 border border-slate-200 text-slate-600 rounded text-[8px] font-bold">
                      {invoiceType === 'invoice' ? 'FACTURE COMMERCIALE' : 'DEVIS PROFORMA'}
                    </span>
                    <p className="text-[10px] font-bold text-slate-900">N° {invoiceType === 'invoice' ? 'FC-2026-904' : 'DV-2026-102'}</p>
                    <p className="text-[8px] text-slate-400">Date: 15 Juillet 2026</p>
                  </div>
                </div>

                {/* Clients details list */}
                <div className="grid grid-cols-2 gap-4 text-[9px] leading-relaxed pb-3 border-b border-slate-50 font-mono">
                  <div>
                    <label className="font-bold text-slate-405 uppercase block">Facturé à:</label>
                    <p className="font-extrabold text-slate-900 text-[10px]">{invoiceCompany || 'Gourmet Food Catering S.A.R.L.'}</p>
                    {invoiceClientName && <p className="text-slate-500">Attn: {invoiceClientName}</p>}
                    {invoiceAddress && <p className="text-slate-450 leading-tight">{invoiceAddress}</p>}
                    {invoiceIce && <p className="text-slate-450 font-bold">ICE: {invoiceIce}</p>}
                  </div>
                  <div className="text-right text-slate-450">
                    <label className="font-bold text-slate-405 uppercase block">Mode de paiement:</label>
                    <p className="text-slate-600">VIREMENT EN DIRHAM (MAD)</p>
                    <p className="text-slate-500 text-[8px]">RIB BP: xxx xxx xxxxxxxxxxxxxxx xx</p>
                  </div>
                </div>

                {/* Items listing table on invoice paper */}
                <div className="overflow-x-auto pt-1">
                  <table className="w-full text-left text-[9px] font-mono">
                    <thead>
                      <tr className="border-b border-slate-250 text-slate-400 uppercase tracking-wider text-[8px] font-extrabold bg-slate-50">
                        <th className="py-1 px-1">Description</th>
                        <th className="py-1 text-center w-8">Qté</th>
                        <th className="py-1 text-right w-20 px-1">P.U (MAD)</th>
                        <th className="py-1 text-right w-20 px-1">Total (MAD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-600">
                      {activeInvoiceItems.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-slate-400 italic">
                            Cochez des cases dans l'éditeur de gauche à inclure
                          </td>
                        </tr>
                      ) : (
                        activeInvoiceItems.map((item, id) => (
                          <tr key={id} className="hover:bg-slate-50/50">
                            <td className="py-2.5 px-1 font-sans text-slate-800 font-semibold leading-tight">{item.name}</td>
                            <td className="py-2.5 text-center font-bold">{item.qty}</td>
                            <td className="py-2.5 text-right px-1">{item.price}</td>
                            <td className="py-2.5 text-right font-bold px-1 text-slate-900">{(item.price * item.qty)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals and visual signature block */}
              <div className="border-t border-slate-150 pt-3 flex justify-between items-end gap-4 mt-3 flex-wrap relative font-mono">

                {/* Visual signature rubber pad */}
                <div className="border border-dashed border-slate-200 bg-slate-50 p-2.5 rounded-xl w-32 h-18 flex flex-col justify-between text-center select-none shadow-inner shrink-0">
                  {signatureName.trim() !== '' ? (
                    <div className="flex-1 flex flex-col items-center justify-center">
                      <p className="font-serif italic text-xs text-blue-600 font-extrabold tracking-wide leading-none">{signatureName}</p>
                      <span className="text-[7px] text-slate-400 uppercase tracking-widest block border-t border-slate-200 pt-1 mt-1 leading-none">Signé en ligne</span>
                    </div>
                  ) : (
                    <div className="flex flex-col justify-center items-center h-full text-slate-400 text-[8px] space-y-1">
                      <PenTool className="w-3 h-3 text-slate-300" />
                      <span>Signature Client</span>
                    </div>
                  )}
                </div>

                {/* Subtotals on invoice paper */}
                <div className="w-48 text-right space-y-1 text-[9px] text-slate-500 font-semibold leading-normal font-mono border bg-slate-50 p-2.5 rounded-xl">
                  <div className="flex justify-between">
                    <span>Sous-total HT:</span>
                    <span>{invoiceSubtotal} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TVA (20%):</span>
                    <span>{invoiceTax} MAD</span>
                  </div>
                  <div className="flex justify-between font-extrabold text-[10px] text-slate-900 border-t border-slate-200 border-dashed pt-1.5 mt-1">
                    <span>NET À PAYER:</span>
                    <span className="text-slate-950 font-black">{invoiceTotal} MAD</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}