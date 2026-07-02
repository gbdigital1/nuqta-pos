import React, { useState } from 'react';
import {
  Check, Shield, Sparkles, CreditCard, Users, FileText,
  BarChart3, RefreshCw, Layers, Sliders, FileDown,
  ShoppingBag, Send, PhoneCall, CheckCircle2, ArrowRight
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface FeaturesProps {
  lang: Language;
  onPageChange: (page: string) => void;
}

export default function Features({ lang, onPageChange }: FeaturesProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  // Navigation filtering or scrolling categories
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', name: lang === 'en' ? 'All Modules' : lang === 'fr' ? 'Tous les Modules' : 'جميع الوحدات' },
    { id: 'sales', name: lang === 'en' ? 'Sales & Credit' : lang === 'fr' ? 'Ventes & Crédit' : 'المبيعات والكريدي' },
    { id: 'docs', name: lang === 'en' ? 'Invoices & PDF' : lang === 'fr' ? 'Factures & Devis' : 'الفواتير وعروض الأسعار' },
    { id: 'operations', name: lang === 'en' ? 'Inventory & Operations' : lang === 'fr' ? 'Stocks & Logistique' : 'المخازن والتسيير' }
  ];

  const handleSmoothScroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Sample interactive state for Credit management preview
  const [creditBalance, setCreditBalance] = useState<number>(450);
  const [reminded, setReminded] = useState<boolean>(false);

  // Sample interactive state for PDF Generator
  const [pdfSigned, setPdfSigned] = useState<boolean>(false);

  // Features detailed layout data list
  const featuresList = [
    {
      id: 'module-pos',
      category: 'sales',
      title: t.featPosSystemTitle,
      desc: t.featPosSystemDesc,
      bullets: [t.featPosSystemB1, t.featPosSystemB2, t.featPosSystemB3, t.featPosSystemB4],
      icon: <ShoppingBag className="w-5 h-5 text-blue-600" />,
      colorClass: 'border-blue-100 bg-blue-50/20 text-blue-600',
      badge: lang === 'en' ? 'Register Core' : lang === 'fr' ? 'Caisse Tactile' : 'جهاز الكاشير',
      visual: (
        <div className="w-full max-w-sm bg-white p-5 rounded-2xl border border-slate-100 shadow-md space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
              {isRtl ? 'جهاز الكاشير #01' : lang === 'fr' ? 'Terminal de Caisse #01' : 'Register Terminal #01'}
            </span>
            <span className="flex items-center gap-1.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
              {isRtl ? 'وضع العمل بدون إنترنت نشط' : lang === 'fr' ? 'Mode hors-ligne actif' : 'Offline Mode Active'}
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-[10px]">
            <div className="flex justify-between text-slate-800">
              <span>Espresso Arabica x2</span>
              <span className="font-bold">50.00 MAD</span>
            </div>
            <div className="flex justify-between text-slate-800">
              <span>Pastry Croissant x1</span>
              <span className="font-bold">18.00 MAD</span>
            </div>
            <div className="flex justify-between text-slate-400 border-t pt-2 border-dashed">
              <span>{isRtl ? 'المجموع الجزئي' : lang === 'fr' ? 'Sous-total' : 'Subtotal'}</span>
              <span>68.00 MAD</span>
            </div>
            <div className="flex justify-between text-slate-900 font-bold text-xs pt-1">
              <span>{isRtl ? 'السعر الإجمالي' : lang === 'fr' ? 'Prix Total' : 'Total Price'}</span>
              <span className="text-blue-600">68.00 MAD</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <span className="p-2.5 text-center bg-slate-50 border border-slate-150 rounded-xl font-bold text-[10px] text-slate-700">
              {isRtl ? '💵 نقداً' : lang === 'fr' ? '💵 Espèces' : '💵 Cash'}
            </span>
            <span className="p-2.5 text-center bg-blue-50 border border-blue-200 text-blue-600 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1">
              <CreditCard className="w-3.5 h-3.5" /> {isRtl ? 'بطاقة / NFC' : lang === 'fr' ? 'Carte / NFC' : 'Card / NFC'}
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'module-credits',
      category: 'sales',
      title: t.featCreditsTitle,
      desc: t.featCreditsDesc,
      bullets: [t.featCreditsB1, t.featCreditsB2, t.featCreditsB3, t.featCreditsB4],
      icon: <Users className="w-5 h-5 text-purple-600" />,
      colorClass: 'border-purple-100 bg-purple-50/20 text-purple-600',
      badge: lang === 'en' ? 'Carnet de Crédit' : lang === 'fr' ? 'Gestion des Arriérés' : 'دفتر الكريدي',
      visual: (
        <div className="w-full max-w-sm bg-white p-5 rounded-2xl border border-slate-100 shadow-md space-y-4">
          <div className="flex justify-between items-center pb-2 border-b border-slate-100">
            <div>
              <h4 className="font-extrabold text-xs text-slate-800">Amine El Idrissi</h4>
              <p className="text-[9px] text-slate-400 font-mono">
                {isRtl ? 'رقم العميل' : lang === 'fr' ? 'ID Client' : 'Customer ID'} #NQ-CUST-920
              </p>
            </div>
            <span className="text-[9px] uppercase font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full font-mono">
              {isRtl ? 'الحد الأقصى:' : lang === 'fr' ? 'Limite :' : 'Limit:'} 2,500 MAD
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
              <span className="text-[9px] text-slate-450 uppercase font-bold block">
                {isRtl ? 'الحساب الحالي' : lang === 'fr' ? 'Solde Actuel' : 'Current Balance'}
              </span>
              <span className="text-sm font-black text-slate-800 font-mono">{creditBalance}.00 MAD</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-150">
              <span className="text-[9px] text-slate-450 uppercase font-bold block">
                {isRtl ? 'الحالة' : lang === 'fr' ? 'Statut' : 'Status'}
              </span>
              <span className="text-[10px] font-bold text-amber-600 flex items-center gap-1 mt-0.5">
                ● {isRtl ? 'رصيد نشط' : lang === 'fr' ? 'Solde Actif' : 'Active Balance'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <div className="flex justify-between gap-2">
              <button
                onClick={() => setCreditBalance(prev => Math.max(0, prev - 150))}
                className="flex-1 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-[10px] font-bold cursor-pointer text-center"
              >
                {isRtl ? 'تسجيل دفعة (150 د.م)' : lang === 'fr' ? 'Recevoir Acompte (150 MAD)' : 'Receive Installment (150 MAD)'}
              </button>
              <button
                onClick={() => setReminded(true)}
                className={`flex-1 py-2 text-white rounded-xl text-[10px] font-bold cursor-pointer text-center ${reminded ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-purple-600 hover:bg-purple-700'}`}
              >
                {reminded
                  ? (isRtl ? 'تم الإرسال عبر واتساب ✓' : lang === 'fr' ? 'WhatsApp Envoyé ✓' : 'WhatsApp Sent ✓')
                  : (isRtl ? 'تذكير عبر واتساب' : lang === 'fr' ? 'Relancer WhatsApp' : 'WhatsApp Reminder')}
              </button>
            </div>
            {reminded && (
              <p className="text-[9px] text-emerald-600 font-semibold text-center animate-pulse">
                {isRtl
                  ? `"تم إرسال تذكير بالدين بقيمة ${creditBalance} درهم عبر واتساب"`
                  : lang === 'fr'
                    ? `"Rappel de dette de ${creditBalance} MAD envoyé par WhatsApp"`
                    : `"Debt reminder of ${creditBalance} MAD sent via WhatsApp"`}
              </p>
            )}
          </div>
        </div>
      )
    },
    {
      id: 'module-invoicing',
      category: 'docs',
      title: t.featInvoicingTitle,
      desc: t.featInvoicingDesc,
      bullets: [t.featInvoicingB1, t.featInvoicingB2, t.featInvoicingB3, t.featInvoicingB4],
      icon: <FileText className="w-5 h-5 text-emerald-600" />,
      colorClass: 'border-emerald-100 bg-emerald-50/20 text-emerald-600',
      badge: lang === 'en' ? 'Accounting Core' : lang === 'fr' ? 'Gestion Commerciale' : 'المحاسبة التجارية',
      visual: (
        <div className="w-full max-w-sm bg-white p-5 rounded-2xl border border-slate-100 shadow-md space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-150">
            <span className="font-mono text-[9px] text-slate-400">FACTURE #FN-2026-081</span>
            <span className="px-2 py-0.5 rounded text-[8px] uppercase tracking-wider font-extrabold bg-blue-100 text-blue-700">
              {isRtl ? 'مطابق للضريبة 20%' : lang === 'fr' ? 'Conforme TVA 20%' : 'Tax Compliant 20%'}
            </span>
          </div>

          <div className="space-y-2 text-[10px] font-mono text-slate-600">
            <div className="flex justify-between">
              <span>{isRtl ? 'عميل شركة م.م المغرب' : lang === 'fr' ? 'Client SARL Maroc' : 'Client SARL Morocco'}</span>
              <span className="text-slate-900 font-bold">ICE: 0029302194</span>
            </div>
            <div className="flex justify-between">
              <span>{isRtl ? 'المبلغ الخاضع للضريبة (HT)' : lang === 'fr' ? 'Base Taxable HT' : 'Base Taxable HT'}</span>
              <span>1,250.00 MAD</span>
            </div>
            <div className="flex justify-between">
              <span>{isRtl ? 'قيمة الضريبة (20%)' : lang === 'fr' ? 'Montant TVA (20%)' : 'VAT Amount (20%)'}</span>
              <span>250.00 MAD</span>
            </div>
            <div className="flex justify-between text-slate-900 font-bold border-t pt-2 border-slate-150">
              <span>{isRtl ? 'الإجمالي مع الضريبة (TTC)' : lang === 'fr' ? 'TOTAL TTC' : 'TOTAL TTC'}</span>
              <span className="text-emerald-600">1,500.00 MAD</span>
            </div>
          </div>

          <div className="pt-2 flex gap-1.5">
            <span className="flex-1 text-[9px] font-bold text-center py-2 bg-slate-50 border border-slate-150 rounded-lg text-slate-700">
              {isRtl ? '✓ سند التسليم' : lang === 'fr' ? '✓ Bon de Livraison' : '✓ Delivery Note'}
            </span>
            <span className="flex-1 text-[9px] font-bold text-center py-2 bg-rose-50 border border-rose-100 rounded-lg text-rose-700">
              {isRtl ? '⚠ تسجيل المصاريف' : lang === 'fr' ? '⚠ Charges Enregistrées' : '⚠ Expenses Logged'}
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'module-reports',
      category: 'operations',
      title: t.featReportsTitle,
      desc: t.featReportsDesc,
      bullets: [t.featReportsB1, t.featReportsB2, t.featReportsB3, t.featReportsB4],
      icon: <BarChart3 className="w-5 h-5 text-amber-600" />,
      colorClass: 'border-amber-100 bg-amber-50/20 text-amber-600',
      badge: lang === 'en' ? 'Advanced Analytics' : lang === 'fr' ? 'Rapports & KPIs' : 'التحليلات والتقارير',
      visual: (
        <div className="w-full max-w-sm bg-white p-5 rounded-2xl border border-slate-100 shadow-md space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-slate-450 uppercase">
              {isRtl ? 'تقرير Z لإغلاق الوردية' : lang === 'fr' ? 'Rapport Z Fin de Poste' : 'Z-Report Shift Reconciled'}
            </span>
            <span className="text-[9px] font-bold text-amber-600">
              {isRtl ? 'متزامن 100%' : lang === 'fr' ? '100% Synchrone' : '100% Synced'}
            </span>
          </div>

          {/* Sparkline representation */}
          <div className="h-[60px] flex items-end gap-1 px-2 border-b border-slate-100 pb-1">
            <div className="bg-slate-200 w-full h-[30%] rounded-t" />
            <div className="bg-slate-200 w-full h-[45%] rounded-t" />
            <div className="bg-amber-400 w-full h-[90%] rounded-t relative">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[7px] font-bold font-mono">
                {isRtl ? 'الذروة' : lang === 'fr' ? 'Pic' : 'Peak'}
              </span>
            </div>
            <div className="bg-slate-200 w-full h-[60%] rounded-t" />
            <div className="bg-slate-200 w-full h-[35%] rounded-t" />
            <div className="bg-amber-400 w-full h-[75%] rounded-t" />
            <div className="bg-slate-200 w-full h-[50%] rounded-t" />
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-slate-800 font-mono text-[9px]">
            <div>
              <span className="text-slate-400 block text-[8px] uppercase">
                {isRtl ? 'صندوق النقد' : lang === 'fr' ? 'Tiroir-caisse' : 'Cash Drawer'}
              </span>
              <span className="font-bold">4,850.00 MAD</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[8px] uppercase">
                {isRtl ? 'إجمالي البطاقات' : lang === 'fr' ? 'Total Carte' : 'Card Total'}
              </span>
              <span className="font-bold">7,240.00 MAD</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[8px] uppercase">
                {isRtl ? 'إجمالي الأرباح' : lang === 'fr' ? 'Bénéfice brut' : 'Gross profit'}
              </span>
              <span className="font-bold text-emerald-600">+42.3%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'module-tickets',
      category: 'operations',
      title: t.featTicketsTitle,
      desc: t.featTicketsDesc,
      bullets: [t.featTicketsB1, t.featTicketsB2, t.featTicketsB3, t.featTicketsB4],
      icon: <Layers className="w-5 h-5 text-indigo-600" />,
      colorClass: 'border-indigo-100 bg-indigo-50/20 text-indigo-600',
      badge: lang === 'en' ? 'Multi-Route Routing' : lang === 'fr' ? 'Double File d’Attente' : 'توجيه مزدوج للتذاكر',
      visual: (
        <div className="w-full max-w-sm bg-white p-5 rounded-2xl border border-slate-100 shadow-md space-y-3 font-mono text-[10px]">
          <div className="p-2 border-l-2 border-amber-500 bg-amber-50/40 rounded-r-xl">
            <div className="flex justify-between items-center font-bold">
              <span className="text-amber-800 text-[9px] uppercase">
                {isRtl ? 'المسار أ: باريستا الكاشير' : lang === 'fr' ? 'FLUX A : COMPTOIR BARISTA' : 'FLOW A: BARISTA COUNTER'}
              </span>
              <span className="text-[8px] bg-amber-100 text-amber-700 px-1 rounded">
                {isRtl ? 'تمت الطباعة' : lang === 'fr' ? 'IMPRIMÉ' : 'PRINTED'}
              </span>
            </div>
            <p className="text-slate-600 mt-1">
              {lang === 'en' ? 'Order #88: Cappuccino x1 (Soy Milk, Extra shot)' : lang === 'fr' ? 'Commande #88 : Cappuccino x1 (Lait de soja, Supplément)' : 'طلب #88: كابوتشينو x1 (حليب صويا، إضافي)'}
            </p>
          </div>

          <div className="p-2 border-l-2 border-blue-500 bg-blue-50/40 rounded-r-xl">
            <div className="flex justify-between items-center font-bold">
              <span className="text-blue-800 text-[9px] uppercase">
                {isRtl ? 'المسار ب: شاشة المطبخ' : lang === 'fr' ? 'FLUX B : COMPTOIR CUISINE' : 'FLOW B: KITCHEN GRID'}
              </span>
              <span className="text-[8px] bg-blue-100 text-blue-700 px-1 rounded">
                {isRtl ? 'في الانتظار' : lang === 'fr' ? 'EN ATTENTE' : 'QUEUED'}
              </span>
            </div>
            <p className="text-slate-600 mt-1">
              {lang === 'en' ? 'Order #88: Avocado Sourdough Toast x1 (Fried Egg)' : lang === 'fr' ? 'Commande #88 : Tartine Avocat x1 (Œuf sur le plat)' : 'طلب #88: توست أفوكادو x1 (بيض مقلي)'}
            </p>
          </div>

          <div className="text-center pt-1">
            <span className="text-[8px] text-slate-400 uppercase font-bold">
              {lang === 'en' ? 'Unified control for perfect order handovers' : lang === 'fr' ? 'Contrôle unifié pour un service parfait' : 'تحكم موحد لضمان تسليم مثالي للطلبات'}
            </span>
          </div>
        </div>
      )
    },
    {
      id: 'module-stock',
      category: 'operations',
      title: t.featStockTitle,
      desc: t.featStockDesc,
      bullets: [t.featStockB1, t.featStockB2, t.featStockB3, t.featStockB4],
      icon: <Sliders className="w-5 h-5 text-cyan-600" />,
      colorClass: 'border-cyan-100 bg-cyan-50/20 text-cyan-600',
      badge: lang === 'en' ? 'Smart Stock Engine' : lang === 'fr' ? 'Cuisine & Recettes' : 'إدارة المخازن والوصفات',
      visual: (
        <div className="w-full max-w-sm bg-white p-5 rounded-2xl border border-slate-100 shadow-md space-y-3">
          <div className="flex justify-between items-center pb-2 border-b">
            <h4 className="font-extrabold text-xs text-slate-800">
              {isRtl ? 'مصفوفة الوصفات المركبة' : lang === 'fr' ? 'Matrice de Recette Composite' : 'Composite Recipe Matrix'}
            </h4>
            <span className="text-[9px] bg-cyan-50 text-cyan-700 px-2 py-0.5 rounded font-bold font-mono">
              {isRtl ? 'إدارة المخبوزات' : lang === 'fr' ? 'Module Boulangerie' : 'Boulangerie Core'}
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-[9px] text-slate-600">
            <p className="font-bold text-slate-800 uppercase">
              {isRtl ? 'المنتج: 1x كرواسون شوكولاتة' : lang === 'fr' ? 'Produit : 1x Pain au Chocolat' : 'Product: 1x Pain au Chocolat'}
            </p>
            <div className="flex justify-between">
              <span>{isRtl ? 'دقيق' : lang === 'fr' ? 'Farine' : 'Flour'}</span>
              <span>- 120g ({isRtl ? 'المخزون المتبقي: 250 كجم' : lang === 'fr' ? 'Stock: 250kg restants' : 'Stock: 250kg remaining'})</span>
            </div>
            <div className="flex justify-between">
              <span>{isRtl ? 'زبدة' : lang === 'fr' ? 'Beurre' : 'Butter'}</span>
              <span>- 40g ({isRtl ? 'المخزون المتبقي: 45 كجم' : lang === 'fr' ? 'Stock: 45kg restants' : 'Stock: 45kg remaining'})</span>
            </div>
            <div className="flex justify-between text-red-600 font-bold bg-red-50 p-1 rounded animate-pulse">
              <span>{isRtl ? 'حبيبات الشوكولاتة' : lang === 'fr' ? 'Pépites de Chocolat' : 'Chocolate Drops'}</span>
              <span>- 15g ({isRtl ? 'حد المخزون الحرج ⚠' : lang === 'fr' ? 'LIMITE CRITIQUE DE STOCK ⚠' : 'CRITICAL STOCK LIMIT ⚠'})</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'module-suppliers',
      category: 'operations',
      title: t.featSuppliersTitle,
      desc: t.featSuppliersDesc,
      bullets: [t.featSuppliersB1, t.featSuppliersB2, t.featSuppliersB3, t.featSuppliersB4],
      icon: <Sliders className="w-5 h-5 text-teal-600" />,
      colorClass: 'border-teal-100 bg-teal-50/20 text-teal-600',
      badge: lang === 'en' ? 'Supply Chain Ledger' : lang === 'fr' ? 'Base Fournisseurs' : 'دفتر سلسلة التوريد',
      visual: (
        <div className="w-full max-w-sm bg-white p-5 rounded-2xl border border-slate-100 shadow-md space-y-3 font-semibold text-xs text-slate-700">
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-slate-450 block uppercase">
              {isRtl ? 'سجل الموردين' : lang === 'fr' ? 'Registre Fournisseurs' : 'Supplier Registry'}
            </span>
            <span className="font-mono text-[9px] text-teal-600">
              {isRtl ? '4 عقود نشطة' : lang === 'fr' ? '4 contrats actifs' : '4 active contracts'}
            </span>
          </div>

          <div className="p-3 bg-slate-50 border rounded-xl space-y-1">
            <div className="flex justify-between text-slate-900 font-extrabold text-[11px]">
              <span>{isRtl ? 'شركة مزارعي قهوة مكناس' : lang === 'fr' ? 'Producteurs de Café Meknès' : 'Meknes Coffee Growers Ltd'}</span>
              <span className="text-emerald-600 font-mono">{isRtl ? 'نشط' : lang === 'fr' ? 'Actif' : 'Active'}</span>
            </div>
            <p className="text-[10px] text-slate-500">
              {isRtl ? 'توريد حبوب البن الأخضر أرابيكا الفاخرة' : lang === 'fr' ? 'Fourniture de grains de café vert Arabica' : 'Premium Arabica green beans supply'}
            </p>
            <div className="flex justify-between text-[10px] text-slate-400 font-mono pt-1.5 border-t">
              <span>{isRtl ? 'المستحقات: 14,000 د.م' : lang === 'fr' ? 'En cours: 14 000 MAD' : 'Outstanding: 14,000 MAD'}</span>
              <span>{isRtl ? 'مدة التوريد: 48 ساعة' : lang === 'fr' ? 'Délai SLA: 48h' : 'Lead SLA: 48h'}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'module-pdf',
      category: 'docs',
      title: t.featPdfTitle,
      desc: t.featPdfDesc,
      bullets: [t.featPdfB1, t.featPdfB2, t.featPdfB3, t.featPdfB4],
      icon: <FileDown className="w-5 h-5 text-blue-600" />,
      colorClass: 'border-blue-100 bg-blue-50/20 text-blue-600',
      badge: lang === 'en' ? 'Procurement PDF' : lang === 'fr' ? 'Bon de Commande PDF' : 'سند الطلب PDF',
      visual: (
        <div className="w-full max-w-sm bg-white p-5 rounded-2xl border border-slate-100 shadow-md space-y-4">
          <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-center relative overflow-hidden">
            <span className="text-[10px] font-bold text-slate-700 block">
              {isRtl ? 'سند طلب شراء #BC-2026-9022' : lang === 'fr' ? 'BON DE COMMANDE #BC-2026-9022' : 'PURCHASE ORDER #PO-2026-9022'}
            </span>
            <p className="text-[9px] text-slate-400 mt-1">
              {isRtl ? 'تم إنشاؤه وتوقيعه إلكترونياً بواسطة نظام نقطة' : lang === 'fr' ? 'Généré et signé électroniquement par Nuqta POS' : 'Generated and Signed electronically by Nuqta POS Engine'}
            </p>

            <div className="my-3 flex justify-center">
              <div className="p-2 border bg-white rounded-lg inline-flex flex-col items-center gap-1">
                <div className="w-16 h-12 bg-slate-100 rounded border border-dashed flex items-center justify-center text-[10px] text-slate-400">
                  {pdfSigned ? (
                    <span className="text-emerald-600 font-mono font-bold text-[8px] leading-tight text-center">
                      {isRtl ? '✔ موقع ومؤمن\nتشفير نقطة' : lang === 'fr' ? '✔ SIGNÉ COMPLÈTEMENT\nCRYPTÉ NUQTA' : '✔ SECURELY SIGNED\nNUQTA CRYPTO'}
                    </span>
                  ) : (
                    <span className="text-[8px]">
                      {isRtl ? 'في انتظار التوقيع' : lang === 'fr' ? 'Signature en attente' : 'Pending Signature'}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={() => setPdfSigned(prev => !prev)}
              className="px-3.5 py-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              <FileDown className="w-3.5 h-3.5" />
              {pdfSigned ? 'Clear Signed Stamp' : 'Sign & Download PDF Order'}
            </button>
          </div>
        </div>
      )
    }
  ];

  const filteredFeatures = activeTab === 'all'
    ? featuresList
    : featuresList.filter(f => f.category === activeTab);

  return (
    <div className="space-y-24 pb-20">

      {/* 🔮 Hero */}
      <section className="text-center max-w-3xl mx-auto pt-16 px-4 sm:px-6 space-y-6">
        <div className="inline-flex items-center gap-1.5 bg-[var(--accent-light)] text-[var(--accent)] px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-[var(--accent)]/10 animate-pulse">
          <Sparkles className="w-3.5 h-3.5" />
          {lang === 'en' ? '8 Enterprise-grade POS Modules' : lang === 'fr' ? '8 Modules Caisse Intégrés' : '8 وحدات كاشير متكاملة'}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1]">
          {t.featDeepTitle}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
          {t.featDeepSubtitle}
        </p>

        {/* Categories Tab selector */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer border ${activeTab === cat.id
                ? 'bg-[var(--accent)] text-white border-[var(--accent)] shadow-md'
                : 'bg-white text-[var(--text-secondary)] border-[var(--border)] hover:bg-gray-100'
                }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* 🛠️ Main Features Grid (Staggered modern layout) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {filteredFeatures.map((feat) => (
            <div
              key={feat.id}
              id={feat.id}
              className="bg-white p-8 rounded-3xl border border-[var(--border)] hover:border-[var(--accent)]/30 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-6">

                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl border ${feat.colorClass.split(' ')[0]} ${feat.colorClass.split(' ')[1]}`}>
                    {feat.icon}
                  </div>
                  <span className="text-[9px] uppercase tracking-widest font-black text-[var(--accent)] bg-[var(--accent-light)] px-2.5 py-1 rounded-full">
                    {feat.badge}
                  </span>
                </div>

                {/* Text section */}
                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-[var(--text-primary)] leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>

                {/* Bullets List */}
                <ul className="space-y-3 text-xs text-[var(--text-secondary)] font-semibold">
                  {feat.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[var(--success)] shrink-0 mt-0.5" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

              </div>

              {/* Visual Showcase Block */}
              <div className="mt-8 pt-6 border-t border-[var(--border)] bg-slate-50/50 -mx-8 -mb-8 p-8 rounded-b-3xl flex justify-center items-center overflow-hidden">
                {feat.visual}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* 🔮 Integration bottom ribbon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[var(--accent-light)] border border-[var(--accent)]/10 p-10 sm:p-12 rounded-3xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-2">
            <h3 className="text-xl font-extrabold text-[var(--text-primary)]">
              {lang === 'en' ? 'Need customized modules for your retail group?' : lang === 'fr' ? 'Des besoins d’intégration sur-mesure ?' : 'هل تحتاج لربط أنظمتك الخاصة؟'}
            </h3>
            <p className="text-xs text-[var(--text-secondary)] max-w-2xl leading-relaxed font-semibold">
              {lang === 'en'
                ? 'Our engineering team based in Casablanca handles complex catalog migrations, direct multi-warehouse integrations, ERP syncs, and on-premises CMI payment modules completely free.'
                : lang === 'fr'
                  ? 'Notre équipe d\'ingénieurs basée à Casablanca gère gratuitement les migrations de catalogues complexes, les intégrations multi-dépôts, la synchronisation ERP et les modules de paiement CMI locaux.'
                  : 'يتكفل فريقنا الهندسي المتواجد بالدار البيضاء بترحيل المنتجات المعقدة، والربط المباشر للمستودعات المتعددة، ومزامنة أنظمة الـ ERP، وتثبيت وحدات دفع CMI المحلية مجاناً كلياً.'}
            </p>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <button
              onClick={() => onPageChange('contact')}
              className="px-6 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white font-extrabold text-xs rounded-full transition-all shadow-md hover:shadow-lg cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>{lang === 'en' ? 'Book Site Demonstration' : lang === 'fr' ? 'Prendre un Rendez-vous' : 'تنسيق عرض مباشر'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
