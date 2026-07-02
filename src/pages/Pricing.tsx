import React, { useState } from 'react';
import { Check, ChevronDown, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';

interface PricingProps {
  lang: Language;
  onPageChange: (page: string) => void;
}

export default function Pricing({ lang, onPageChange }: PricingProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const starterPrice = billingCycle === 'annual' ? 230 : 290;
  const growthPrice = billingCycle === 'annual' ? 630 : 790;

  const faqs = [
    {
      q: lang === 'en' ? 'Can I switch plans anytime?' : lang === 'fr' ? 'Puis-je changer de forfait à tout moment ?' : 'هل يمكنني تغيير الباقة في أي وقت؟',
      a: lang === 'en' ? 'Yes, you can upgrade, downgrade, or cancel your subscription directly from your billing dashboard with zero penalty fees. Changes apply instantly.' : lang === 'fr' ? 'Oui, vous pouvez surclasser, déclasser ou annuler votre abonnement directement depuis votre tableau de bord de facturation, sans frais de pénalité. Les modifications s\'appliquent immédiatement.' : 'نعم، يمكنك ترقية أو تنزيل الباقة أو إلغاؤها في أي وقت مباشرة من لوحة التحكم دون أي رسوم إضافية.'
    },
    {
      q: lang === 'en' ? 'Is there a free trial?' : lang === 'fr' ? 'Y a-t-il un essai gratuit ?' : 'هل هناك فترة تجريبية مجانية؟',
      a: lang === 'en' ? 'Absolutely. We offer a 14-day fully featured free trial with no credit card required. You can test checkout, inventory, and analytics in your real store immediately.' : lang === 'fr' ? 'Absolument. Nous proposons un essai gratuit entièrement fonctionnel de 14 jours, sans carte de crédit requise. Vous pouvez tester l\'encaissement, les stocks et les statistiques de suite.' : 'بالتأكيد. نوفر فترة تجربة مجانية ممتازة تمتد لـ 14 يوماً مع تفعيل كامل لكافة المميزات والمخازن دون الحاجة لإدخال بيانات بطاقة الائتمان.'
    },
    {
      q: lang === 'en' ? 'What hardware is compatible?' : lang === 'fr' ? 'Quels matériels sont compatibles ?' : 'ما هي الملحقات المتوافقة مع النظام؟',
      a: lang === 'en' ? 'Nuqta POS runs in any modern browser on iPad, Android Tablets, Android Phones, PCs, or Mac. We support standard Bluetooth/USB barcode scanners, star thermal receipt printers, and CMI payment terminals.' : lang === 'fr' ? 'Nuqta POS fonctionne sur n\'importe quel navigateur moderne sur iPad, tablettes Android, smartphones, PC ou Mac. Nous prenons en charge la grande majorité des imprimantes thermiques et scanners.' : 'نظام نقطة كاشير يعمل على جميع المتصفحات والأجهزة الحديثة مثل الآيباد، أجهزة أندرويد اللوحية، الكمبيوتر، والماك. ندعم معظم طابعات الفواتير وملصقات الباركود وأجهزة الدفع cmi.'
    },
    {
      q: lang === 'en' ? 'Is my data secure?' : lang === 'fr' ? 'Mes données sont-elles sécurisées ?' : 'هل بياناتي ومبيعاتي في أمان؟',
      a: lang === 'en' ? 'Security is our highest priority. All data syncs live via bank-level AES-256 cloud encryption. We back up your database every 6 hours and guarantee a 99.98% platform SLA uptime.' : lang === 'fr' ? 'La sécurité est notre priorité absolue. Toutes les données sont cryptées en AES-256 de niveau bancaire. Nous sauvegardons votre base toutes les 6 heures avec un SLA de 99,98%.' : 'الأمان هو أولويتنا القصوى. نقوم بتشفير ومزامنة البيانات عبر خوادم سحابية محمية بالكامل مع جلب وتخزين نسخة احتياطية من متجرك ومبيعاتك بشكل آلي كل 6 ساعات.'
    },
    {
      q: lang === 'en' ? 'Can I add more registers later?' : lang === 'fr' ? 'Puis-je ajouter plus de caisses plus tard ?' : 'هل يمكنني إضافة أجهزة كاشير إضافية لاحقاً؟',
      a: lang === 'en' ? 'Yes. You can add secondary registers or mobile server checkout terminals from your billing panel for an additional 120 MAD/register/mo whenever your team expands.' : lang === 'fr' ? 'Oui, vous pouvez ajouter d\'autres caisses ou terminaux de serveurs mobiles depuis votre panneau d\'administration pour seulement 120 MAD par caisse supplémentaire.' : 'نعم، يمكنك إضافة أجهزة كاشير إضافية لخدمة الموظفين أو نقطة مبيعات ثانية من لوحة التحكم في أي وقت مقابل 120 درهم شهرياً لكل كاشير إضافي.'
    },
    {
      q: lang === 'en' ? 'Do you charge transaction fees?' : lang === 'fr' ? 'Facturez-vous des frais de transaction ?' : 'هل تقتطعون عمولة على عمليات البيع؟',
      a: lang === 'en' ? 'No! Nuqta POS is a flat SaaS subscription model. We never charge percentages or commission fees on your transactions. Your profits remain entirely yours.' : lang === 'fr' ? 'Non ! Nuqta POS est basé sur un abonnement fixe. Nous ne prélevons jamais de commissions ou de frais sur vos mentes. Vos bénéfices vous reviennent à 100%.' : 'لا على الإطلاق! نظام نقطة هو اشتراك شهري ثابت ولا نقتطع أي نسب مئوية أو عمولات على مبيعاتك وأرباحك اليومية.'
    },
    {
      q: lang === 'en' ? 'What happens if I cancel?' : lang === 'fr' ? 'Que se passe-t-il si j\'annule mon abonnement ?' : 'ماذا يحدث إذا قمت بإلغاء اشتراكي؟',
      a: lang === 'en' ? 'If you cancel, you will remain active until the end of your prepaid billing period. You can easily export your products inventory, transactions lists, and tax summaries to Excel/CSV before closure.' : lang === 'fr' ? 'Si vous annulez, votre forfait restera actif jusqu\'à la fin de la période de facturation payée. Vous pouvez exporter vos données (stocks, transactions) au format Excel/CSV.' : 'عند الإلغاء، يظل حسابك نشطاً حتى نهاية الفترة مسبقة الدفع. يمكنك تصدير كافة بياناتك كالمنتجات والعملاء وسجل المبيعات لملفات Excel/CSV قبل الإغلاق.'
    }
  ];

  const compareTable = {
    headers: lang === 'en' ? ['Features', 'Starter', 'Growth', 'Enterprise'] : lang === 'fr' ? ['Fonctionnalités', 'Starter', 'Growth', 'Enterprise'] : ['الميزات والتفاصيل', 'Starter', 'Growth', 'Enterprise'],
    categories: [
      {
        name: lang === 'en' ? 'Register & Checkout' : lang === 'fr' ? 'Encaissement & Caisse' : 'الكاشير والعمليات',
        rows: [
          { name: lang === 'en' ? 'Registers Included' : lang === 'fr' ? 'Caisses Incluses' : 'أجهزة الكاشير الأساسية', starter: '1', growth: '3', enterprise: 'Unlimited' },
          { name: lang === 'en' ? 'Cash & Card Payments' : lang === 'fr' ? 'Espèce & Carte bancaire' : 'دعم الكاش والبطاقات البنكية', starter: true, growth: true, enterprise: true },
          { name: lang === 'en' ? 'NFC Contactless & QR Codes' : lang === 'fr' ? 'Sans-contact & QR Codes' : 'الدفع اللاتلامسي والـ QR', starter: false, growth: true, enterprise: true },
          { name: lang === 'en' ? 'Offline Mode Checkout' : lang === 'fr' ? 'Mode Hors-ligne complet' : 'ميزة البيع بدون اتصال إنترنت', starter: true, growth: true, enterprise: true },
          { name: lang === 'en' ? 'Invoice customization' : lang === 'fr' ? 'Personnalisation des factures' : 'تخصيص الفواتير وعروض الأسعار', starter: 'Basic', growth: 'Full Custom', enterprise: 'Full Custom + Multi-brand' }
        ]
      },
      {
        name: lang === 'en' ? 'Inventory Management' : lang === 'fr' ? 'Gestion des Stocks' : 'إدارة المخازن والمستودعات',
        rows: [
          { name: lang === 'en' ? 'Product Variant Matrix' : lang === 'fr' ? 'Matrice de variantes' : 'تتبع متغيرات المنتجات والمقاسات', starter: true, growth: true, enterprise: true },
          { name: lang === 'en' ? 'Low Stock Automated Alerts' : lang === 'fr' ? 'Alertes de rupture automatique' : 'تنبيهات قرب نفاد السلع آلياً', starter: false, growth: true, enterprise: true },
          { name: lang === 'en' ? 'Multi-Location Sync' : lang === 'fr' ? 'Synchronisation multi-boutiques' : 'ربط وإدارة فروع ومخازن متعددة', starter: false, growth: false, enterprise: true },
          { name: lang === 'en' ? 'CSV Import & Export tool' : lang === 'fr' ? 'Outil d\'import/export CSV' : 'مدير الرفع والتصدير والملفات', starter: true, growth: true, enterprise: true },
        ]
      },
      {
        name: lang === 'en' ? 'Staff & Analytics' : lang === 'fr' ? 'Équipe & Statistiques' : 'إدارة الموظفين والتقارير',
        rows: [
          { name: lang === 'en' ? 'Dynamic Analytics Updates' : lang === 'fr' ? 'Mises à jour des données' : 'تحديث التقارير والإحصائيات دقيقة بدقيقة', starter: 'Hourly', growth: 'Real-time', enterprise: 'Real-time' },
          { name: lang === 'en' ? 'Staff Role Permissions' : lang === 'fr' ? 'Autorisations par rôle d\'équipe' : 'صلاحيات متعددة للموظفين', starter: '2 Roles', growth: 'unlimited', enterprise: 'Custom permissions' },
          { name: lang === 'en' ? 'Full API Access for developers' : lang === 'fr' ? 'Accès API complet pour ingénieurs' : 'الربط البرمجي الكامل والـ API', starter: false, growth: false, enterprise: true },
          { name: lang === 'en' ? 'Support SLA Commitment' : lang === 'fr' ? 'Engagement d\'assistance' : 'درجة وأولوية الدعم الفني', starter: 'Email (24h)', growth: 'Priority (1h)', enterprise: 'Dedicated 24/7 Phone' },
        ]
      }
    ]
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="space-y-24 pb-20">
      
      {/* 🔮 Hero Area */}
      <section className="text-center max-w-2xl mx-auto pt-16 px-4 sm:px-6">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          {t.pricingTitle}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
          {t.pricingSubtitle}
        </p>

        {/* Billing Cycles Toggle */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <span className={`text-xs font-bold ${billingCycle === 'monthly' ? 'text-[var(--accent)] font-extrabold' : 'text-[var(--text-secondary)]'}`}>
            {t.monthly}
          </span>
          
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
            className="w-14 h-8 bg-zinc-200 rounded-full p-1 transition-all cursor-pointer relative"
          >
            <div className={`w-6 h-6 bg-[var(--accent)] rounded-full transition-all ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
          </button>
          
          <span className={`text-xs font-bold flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-[var(--accent)] font-extrabold' : 'text-[var(--text-secondary)]'}`}>
            <span>{t.annual}</span>
            <span className="bg-[var(--success)]/10 text-[var(--success)] text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              {t.save20}
            </span>
          </span>
        </div>
      </section>

      {/* 💳 3 Pricing Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch pt-4">
          
          {/* Starter Plan */}
          <div className="bg-white p-8 rounded-2xl border border-[var(--border)] flex flex-col justify-between transition-all hover:border-[var(--text-muted)] transform hover:-translate-y-1">
            <div className="space-y-6">
              <div>
                <h3 className="font-extrabold text-lg text-[var(--text-primary)]">{t.pricingStarterName}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1.5 min-h-[34px]">{t.pricingStarterDesc}</p>
              </div>
              
              <div className="border-y border-[var(--border)] py-4 font-mono">
                <span className="text-3xl font-black text-[var(--text-primary)]">{starterPrice} MAD</span>
                <span className="text-xs text-[var(--text-muted)]">{t.perMonth}</span>
              </div>

              <ul className="space-y-3 text-xs text-[var(--text-secondary)] font-semibold">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>1 Active Register & Backoffice</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Product Inventory Variant Matrix</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Hourly Analytics Reports</span>
                </li>
                <li className="flex items-center gap-2.5 text-[var(--text-muted)] line-through">
                  <span>Smart low stock reorder alerts</span>
                </li>
                <li className="flex items-center gap-2.5 text-[var(--text-muted)] line-through">
                  <span>Contactless payment wallets (NFC)</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onPageChange('contact')}
              className="w-full mt-8 py-3 bg-[var(--bg-surface)] hover:bg-gray-205 text-[var(--text-primary)] text-xs font-bold rounded-xl transition-all cursor-pointer"
            >
              {t.selectPlan}
            </button>
          </div>

          {/* Growth Plan (Most Popular / Glow Card) */}
          <div className="bg-white p-8 rounded-2xl border-2 border-[var(--accent)] flex flex-col justify-between transition-all shadow-xl hover:shadow-[var(--accent)]/10 transform scale-103 relative">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {t.popularLabel}
            </span>

            <div className="space-y-6 pt-2">
              <div>
                <h3 className="font-extrabold text-xl text-[var(--text-primary)]">{t.pricingGrowthName}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1.5 min-h-[34px]">{t.pricingGrowthDesc}</p>
              </div>
              
              <div className="border-y border-[var(--border)] py-4 font-mono">
                <span className="text-3xl font-black text-[var(--text-primary)]">{growthPrice} MAD</span>
                <span className="text-xs text-[var(--text-muted)]">{t.perMonth}</span>
              </div>

              <ul className="space-y-3 text-xs text-[var(--text-secondary)] font-semibold">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span className="font-bold">3 Registers / Server connections</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Automated Low stock reorder alerts</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Real-time cloud analytics & telemetry</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>NFC Payments & Local wallet checkout</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Staff shift transition reports & logs</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>1-hour turnaround priority support</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onPageChange('contact')}
              className="w-full mt-8 py-3.5 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-md hover:scale-101"
            >
              {t.selectPlan}
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-white p-8 rounded-2xl border border-[var(--border)] flex flex-col justify-between transition-all hover:border-[var(--text-muted)] transform hover:-translate-y-1">
            <div className="space-y-6">
              <div>
                <h3 className="font-extrabold text-lg text-[var(--text-primary)]">{t.pricingEnterpriseName}</h3>
                <p className="text-[11px] text-[var(--text-secondary)] mt-1.5 min-h-[34px]">{t.pricingEnterpriseDesc}</p>
              </div>
              
              <div className="border-y border-[var(--border)] py-4 font-mono">
                <span className="text-3xl font-black text-[var(--text-primary)]">{t.pricingEnterprisePrice}</span>
              </div>

              <ul className="space-y-3 text-xs text-[var(--text-secondary)] font-semibold">
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Unlimited Registers across multi-warehouses</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Complete developer API access & webhooks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Custom invoice layouts with PDF generation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>Dedicated accounts manager & SLA success contract</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-[var(--success)] shrink-0" />
                  <span>On-premise technical installation assistance</span>
                </li>
              </ul>
            </div>

            <button 
              onClick={() => onPageChange('contact')}
              className="w-full mt-8 py-3 bg-[var(--text-primary)] text-white hover:opacity-90 font-bold text-xs rounded-xl transition-all cursor-pointer"
            >
              {t.contactSales}
            </button>
          </div>

        </div>
      </section>

      {/* 📊 Feature Comparison Table */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-sm mx-auto mb-12">
          <h2 className="text-2xl font-extrabold text-[var(--text-primary)] leading-tight">
            Detailed Feature Breakdown
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">Compare side-by-side specs of every active plan.</p>
        </div>

        {/* Responsive horizontal scroll wrapper with sticky first col on mobile */}
        <div className="w-full overflow-x-auto rounded-2xl border border-[var(--border)] bg-white">
          <table className="w-full border-collapse text-xs text-left min-w-[650px] leading-none">
            <thead>
              <tr className="bg-gray-100 border-b border-[var(--border)] text-[var(--text-primary)] font-extrabold">
                {compareTable.headers.map((h, i) => (
                  <th key={i} className="p-4 uppercase tracking-wider font-mono text-[10px]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] font-semibold text-[var(--text-secondary)]">
              {compareTable.categories.map((cat, catIdx) => (
                <React.Fragment key={catIdx}>
                  {/* Category Header Row */}
                  <tr className="bg-gray-50">
                    <td colSpan={4} className="p-3 font-extrabold text-[var(--accent)] tracking-tight text-[11px] uppercase">
                      {cat.name}
                    </td>
                  </tr>
                  
                  {/* Category Rows */}
                  {cat.rows.map((row, rowIdx) => (
                    <tr key={rowIdx} className="hover:bg-gray-50/50">
                      <td className="p-4 text-[var(--text-primary)]">{row.name}</td>
                      <td className="p-4">
                        {typeof row.starter === 'boolean' ? (
                          row.starter ? <Check className="w-4 h-4 text-[var(--success)]" /> : '—'
                        ) : row.starter}
                      </td>
                      <td className="p-4 text-[var(--text-primary)]">
                        {typeof row.growth === 'boolean' ? (
                          row.growth ? <Check className="w-4 h-4 text-[var(--success)]" /> : '—'
                        ) : row.growth}
                      </td>
                      <td className="p-4 font-bold text-[var(--accent)]">
                        {typeof row.enterprise === 'boolean' ? (
                          row.enterprise ? <Check className="w-4 h-4 text-[var(--success)]" /> : '—'
                        ) : row.enterprise}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ❓ FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-sm mx-auto mb-16">
          <h2 className="text-3xl font-extrabold text-[var(--text-primary)] leading-tight">
            {t.faqTitle}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">{t.faqSubtitle}</p>
        </div>

        <div className="space-y-3.5">
          {faqs.map((f, index) => {
            const isOpen = openFaq === index;
            return (
              <div 
                key={index}
                className="bg-white border border-[var(--border)] rounded-2xl overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-extrabold text-xs text-[var(--text-primary)] cursor-pointer"
                >
                  <span className={`${isRtl ? 'text-right w-full' : ''}`}>{f.q}</span>
                  <ChevronDown className={`w-4.5 h-4.5 text-[var(--text-muted)] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[var(--accent)]' : ''}`} />
                </button>
                
                {/* Expand Collapsible using JS/CSS conditional height */}
                <div 
                  className={`transition-all duration-300 ease-in-out border-t border-[var(--border)]/10 px-5 overflow-hidden ${
                    isOpen ? 'max-h-40 py-4 opacity-100 bg-gray-50/30' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-semibold">
                    {f.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🏷️ Bottom CTA block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="bg-[var(--accent)] border p-12 sm:p-16 rounded-3xl text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to transition and save?
            </h2>
            <p className="text-sm text-white/95 leading-relaxed max-w-md mx-auto">
              Test out our Growth or Starter subscription free for 14 full days. Setup takes under 5 minutes with our onboarding assistants.
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
