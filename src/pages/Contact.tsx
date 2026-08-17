import React, { useState } from 'react';
import {
  CheckCircle, ShieldCheck, Mail, Phone, MapPin,
  Clock, Sparkles
} from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../translations';
import emailjs from '@emailjs/browser';

interface ContactProps {
  lang: Language;
}

export default function Contact({ lang }: ContactProps) {
  const t = TRANSLATIONS[lang];
  const isRtl = lang === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    vertical: 'cafe',
    customVertical: '',
    outlets: '1',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) return;

    // --- Lead scoring & saving (your existing logic, unchanged) ---
    let score = 50;
    if (parseInt(formData.outlets) > 1) score += 15;
    if (parseInt(formData.outlets) > 5) score += 15;
    if (formData.message && formData.message.length > 30) score += 15;
    if (formData.email.includes('.ma') || formData.email.includes('.com')) score += 5;
    score = Math.min(100, score);

    const city = formData.city.trim() || 'N/A';

    const leadId = 'NQ-LEAD-' + Math.floor(Math.random() * 90000 + 10000);

    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: leadId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          vertical: formData.vertical,
          customVertical: formData.customVertical,
          outlets: formData.outlets || '1',
          message: formData.message,
          createdAt: new Date().toISOString(),
          status: 'new',
          score,
          source: 'Web Contact Form',
          region: city
        })
      });
    } catch (err) {
      console.error('Error saving lead to API:', err);
    }

    // Apply the dropdown fix from before
    const VERTICAL_LABELS: Record<string, string> = {
      cafe: 'Boutique or Fashion',
      restaurant: 'Café, Restaurant or Fast Food',
      salon: 'Beauty Salon or Spa',
      retail: 'Supermarket or Grocery store',
      other: 'Other business sector',
    };
    const businessLabel = formData.customVertical || VERTICAL_LABELS[formData.vertical] || formData.vertical;
    const firstName = formData.name.trim().split(' ')[0];

    // 1) Notify your sales team — your existing template, unchanged
    try {
      await emailjs.send(
        'service_p6gjmd8',
        'template_5a8c7ba',
        {
          lead_id: leadId,
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          business: businessLabel,
          outlets: formData.outlets || '1',
          region: city,
          message: formData.message || 'No message provided.',
          score,
        },
        'TPzOuwSE-ukKMmMSZ'
      );
    } catch (err) {
      console.error('Admin notification email failed:', err);
    }

    // 2) Send the welcome email to the CLIENT — new template from Step 1
    try {
      await emailjs.send(
        'service_p6gjmd8',
        'template_791hoak', // from Step 1
        {
          to_email: formData.email,   // ← this fills the "To Email" field you set in Step 2
          first_name: firstName,
          full_name: formData.name,
          business: businessLabel,
          outlets: formData.outlets || '1',
          region: city,
          lead_id: leadId,
        },
        'TPzOuwSE-ukKMmMSZ'
      );
    } catch (err) {
      console.error('Client confirmation email failed:', err);
    }

    setSubmitted(true);
  };

  return (
    <div className="space-y-20 pb-20 pt-10">

      {/* 🔮 Hero / Title */}
      <section className="text-center max-w-2xl mx-auto px-4 sm:px-6 space-y-4">
        <div className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
          <Sparkles className="w-3.5 h-3.5" />
          {lang === 'en'
            ? 'Onboard with Nuqta Sales Engineers'
            : lang === 'fr'
              ? 'Intégration avec nos ingénieurs commerciaux'
              : 'التفعيل بمرافقة مهندسي المبيعات لدينا'}
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)]">
          {t.contactTitle}
        </h1>
        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
          {t.contactSubtitle}
        </p>
      </section>

      {/* 📬 Form & Info Grid Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">

          {/* Left Column: Stunning contact form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[var(--border)] shadow-xl relative overflow-hidden">

            {submitted ? (
              <div className="text-center py-16 space-y-5 animate-fade-in flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-[var(--success)]/10 text-[var(--success)] flex items-center justify-center mb-2">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-black text-[var(--text-primary)]">
                  {t.contactSucessTitle}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed mx-auto">
                  {t.contactSuccessDesc}
                </p>
                <div className="pt-4 border-t border-[var(--border)] w-full max-w-xs font-mono text-[10px] text-[var(--text-muted)]">
                  Ref ID: NQ-SUPPORT-ID-{Math.floor(Math.random() * 90000) + 10000}
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      {t.contactFieldName} <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="text"
                      className="w-full text-xs p-3.5 rounded-xl border border-[var(--border)] bg-gray-50/50 focus:outline-[var(--accent)] text-[var(--text-primary)] font-semibold transition-all"
                      placeholder={lang === 'en' ? 'e.g. Yassine El Idrissi' : lang === 'fr' ? 'ex. Yassine El Idrissi' : 'مثال: ياسين الإدريسي'}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      {t.contactFieldEmail} <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="email"
                      className="w-full text-xs p-3.5 rounded-xl border border-[var(--border)] bg-gray-50/50 focus:outline-[var(--accent)] text-[var(--text-primary)] font-semibold transition-all"
                      placeholder={lang === 'en' ? 'e.g. business@domain.ma' : lang === 'fr' ? 'ex. contact@entreprise.ma' : 'مثال: business@domain.ma'}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Phone field (WhatsApp) */}
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      {t.contactFieldPhone} <span className="text-red-500">*</span>
                    </label>
                    <input
                      required
                      type="tel"
                      className="w-full text-xs p-3.5 rounded-xl border border-[var(--border)] bg-gray-50/50 focus:outline-[var(--accent)] text-[var(--text-primary)] font-semibold transition-all"
                      placeholder={lang === 'en' ? 'e.g. +212 600-000000' : lang === 'fr' ? 'ex. +212 600-000000' : 'مثال: +212 600-000000'}
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  {/* Business Vertical */}
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      {t.contactFieldBusiness}
                    </label>
                    <select
                      className="w-full text-xs p-3.5 rounded-xl border border-[var(--border)] bg-gray-50/50 focus:outline-[var(--accent)] text-[var(--text-primary)] font-bold transition-all"
                      value={formData.vertical}
                      onChange={(e) => setFormData({ ...formData, vertical: e.target.value })}
                    >
                      <option value="cafe">{lang === 'en' ? 'Boutique or Fashion' : lang === 'fr' ? 'Boutique et Prêt-à-porter' : 'محلات الموضة والألبسة'}</option>
                      <option value="restaurant">{lang === 'en' ? 'Café, Restaurant or Fast Food' : lang === 'fr' ? 'Café / Restaurant / Fast food' : 'مقهى / مطعم / مأكولات سريعة'}</option>
                      <option value="salon">{lang === 'en' ? 'Beauty Salon or Spa' : lang === 'fr' ? 'Salon de Beauté / Spa' : 'صالون تجميل / سبا'}</option>
                      <option value="retail">{lang === 'en' ? 'Supermarket or Grocery store' : lang === 'fr' ? 'Supermarché / Alimentation / Épicerie' : 'سوبرماركت / بقالة / متجر غذائي'}</option>
                      <option value="autre">{lang === 'en' ? 'Other (Specify below)' : lang === 'fr' ? 'Autre (À préciser ci-dessous)' : 'آخر (يرجى التحديد أدناه)'}</option>
                    </select>
                    {formData.vertical === 'autre' && (
                      <div className="mt-3 animate-fade-in">
                        <input
                          required
                          type="text"
                          className="w-full text-xs p-3.5 rounded-xl border border-[var(--border)] bg-gray-50/50 focus:outline-[var(--accent)] text-[var(--text-primary)] font-semibold transition-all"
                          placeholder={lang === 'en' ? 'Specify your business sector...' : lang === 'fr' ? 'Précisez votre Secteur d’Activité...' : 'حدد نشاطك التجاري بدقة...'}
                          value={formData.customVertical}
                          onChange={(e) => setFormData({ ...formData, customVertical: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Client City */}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      {lang === 'en' ? 'City' : lang === 'fr' ? 'Ville' : 'المدينة'}
                    </label>
                    <input
                      type="text"
                      className="w-full text-xs p-3.5 rounded-xl border border-[var(--border)] bg-gray-50/50 focus:outline-[var(--accent)] text-[var(--text-primary)] font-semibold transition-all"
                      placeholder={lang === 'en' ? 'e.g. Casablanca' : lang === 'fr' ? 'ex. Casablanca' : 'مثال: الدار البيضاء'}
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                  {/* Number of Outlets */}
                  <div>
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      {t.contactFieldSize}
                    </label>
                    <input
                      type="number"
                      min="1"
                      className="w-full text-xs p-3.5 rounded-xl border border-[var(--border)] bg-gray-50/50 focus:outline-[var(--accent)] text-[var(--text-primary)] font-semibold transition-all"
                      placeholder="1"
                      value={formData.outlets}
                      onChange={(e) => setFormData({ ...formData, outlets: e.target.value })}
                    />
                  </div>

                  {/* Message Field */}
                  <div className="sm:col-span-1">
                    <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                      {lang === 'en' ? 'Preferred Onboarding Method' : lang === 'ar' ? 'الطريقة المفضلة للإعداد' : "Méthode d'intégration privilégiée"}
                    </label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      <label className="flex items-center gap-2 p-3 border border-[var(--border)] bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer">
                        <input type="radio" name="method" defaultChecked className="accent-[var(--accent)]" />
                        <span>{lang === 'en' ? 'Remote Call' : lang === 'fr' ? 'Appel à distance' : 'اتصال عن بعد'}</span>
                      </label>
                      <label className="flex items-center gap-2 p-3 border border-[var(--border)] bg-gray-50 hover:bg-gray-100 rounded-xl cursor-pointer">
                        <input type="radio" name="method" className="accent-[var(--accent)]" />
                        <span>{lang === 'en' ? 'On-site visit' : lang === 'fr' ? 'Visite sur site' : 'زيارة ميدانية'}</span>
                      </label>
                    </div>
                  </div>

                </div>

                {/* Message text area */}
                <div>
                  <label className="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">
                    {t.contactFieldMessage}
                  </label>
                  <textarea
                    rows={4}
                    className="w-full text-xs p-4 rounded-xl border border-[var(--border)] bg-gray-50/50 focus:outline-[var(--accent)] text-[var(--text-primary)] font-semibold transition-all"
                    placeholder={lang === 'en'
                      ? 'Describe any custom integrations (Shopify, QuickBooks etc)...'
                      : lang === 'fr'
                        ? 'Décrivez les intégrations personnalisées souhaitées (Shopify, QuickBooks etc)...'
                        : 'صف أي عمليات ربط مخصصة ترغب بها (Shopify، QuickBooks إلخ)...'}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white hover:shadow-lg font-extrabold text-sm rounded-xl transition-all shadow-md cursor-pointer"
                >
                  {t.contactSubmit}
                </button>

              </form>
            )}

          </div>

          {/* Right Column: Key Contacts & Physical cards */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">

            {/* Quick Contact Points */}
            <div className="bg-white p-6 rounded-2xl border border-[var(--border)] space-y-6 shadow-sm">
              <h3 className="font-extrabold text-sm uppercase text-[var(--text-primary)] tracking-tight">
                {lang === 'en' ? 'Direct Support Channels' : lang === 'fr' ? 'Canaux de support direct' : 'قنوات الدعم المباشر'}
              </h3>

              <div className="space-y-4 font-semibold text-xs text-[var(--text-secondary)]">

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-[var(--accent-light)] text-[var(--accent)]">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold leading-none mb-0.5">
                      {lang === 'en' ? 'Corporate Email' : lang === 'fr' ? 'E-mail professionnel' : 'البريد الإلكتروني للشركة'}
                    </span>
                    <a href="mailto:sales@nuqta.pos" className="text-[var(--text-primary)] hover:text-[var(--accent)] underline font-mono">sales@nuqta.pos</a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-600">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold leading-none mb-0.5">
                      {lang === 'en' ? 'WhatsApp hotline' : lang === 'fr' ? 'Ligne WhatsApp' : 'رقم الواتساب المباشر'}
                    </span>
                    <span className="text-[var(--text-primary)] font-mono">
                      +212 522-493021 {lang === 'en' ? '(Meknes office)' : lang === 'fr' ? '(Bureau de Meknes)' : '(مكتب مكناس)'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-orange-100 text-orange-600">
                    <MapPin className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[var(--text-muted)] block uppercase font-bold leading-none mb-0.5">
                      {lang === 'en' ? 'Headquarters' : lang === 'fr' ? 'Siège social' : 'المقر الرئيسي'}
                    </span>
                    <p className="text-[var(--text-primary)] leading-snug">
                      {lang === 'en' || lang === 'fr'
                        ? 'Marjane, Av Mohammed El menouni résidence la princesse Mag 3, Meknès 50050'
                        : 'مرجان، شارع محمد المنوني، إقامة الأميرة، محل 3، مكناس 50050'}
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* SLA guarantees card */}
            <div className="bg-gray-100 p-6 rounded-2xl border border-[var(--border)] space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-white border border-[var(--border)] flex items-center justify-center">
                    <Clock className="w-4 h-4 text-[var(--accent)]" />
                  </div>
                  <h4 className="font-extrabold text-xs uppercase tracking-wider text-[var(--text-primary)]">
                    {lang === 'en' ? 'Onboarding & Support SLA' : lang === 'fr' ? "SLA d'intégration & support" : 'ضمان سرعة التفعيل والدعم'}
                  </h4>
                </div>

                <p className="text-xs text-[var(--text-secondary)] leading-relaxed font-semibold">
                  {lang === 'en'
                    ? 'We guarantee a reply in under 1 hour, every time. Site integrations, data migration from legacy tools, and on-premises CMI terminal setup are handled end-to-end by our localized experts — no back-and-forth, no guesswork.'
                    : lang === 'fr'
                      ? 'Nous garantissons une réponse en moins d\'une heure, à chaque fois. Intégrations sur site, migration des données depuis vos anciens outils et configuration des terminaux CMI sont prises en charge de bout en bout par nos experts locaux.'
                      : 'نضمن لك الرد في أقل من ساعة واحدة، في كل مرة. يتولى خبراؤنا المحليون الربط في الموقع، وترحيل البيانات من الأنظمة القديمة، وتثبيت أجهزة الدفع (CMI) بشكل كامل — دون تعقيد أو انتظار.'}
                </p>
              </div>

              {/* Stat strip so the card isn't just a paragraph */}
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div className="bg-white rounded-xl border border-[var(--border)] p-2.5 text-center">
                  <span className="block text-sm font-extrabold text-[var(--accent)] font-mono">&lt;1h</span>
                  <span className="block text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-wide mt-0.5">
                    {lang === 'en' ? 'Reply time' : lang === 'fr' ? 'Délai réponse' : 'وقت الرد'}
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-[var(--border)] p-2.5 text-center">
                  <span className="block text-sm font-extrabold text-[var(--accent)] font-mono">24/7</span>
                  <span className="block text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-wide mt-0.5">
                    {lang === 'en' ? 'Support' : lang === 'fr' ? 'Support' : 'الدعم'}
                  </span>
                </div>
                <div className="bg-white rounded-xl border border-[var(--border)] p-2.5 text-center">
                  <span className="block text-sm font-extrabold text-[var(--accent)] font-mono">100%</span>
                  <span className="block text-[8px] font-bold text-[var(--text-muted)] uppercase tracking-wide mt-0.5">
                    {lang === 'en' ? 'Setup done for you' : lang === 'fr' ? 'Configuré pour vous' : 'إعداد كامل'}
                  </span>
                </div>
              </div>
            </div>

            {/* Safety badge */}
            {/* <div className="p-4 bg-[var(--accent-light)] border border-[var(--accent)]/10 text-[var(--text-primary)] text-xs rounded-xl flex items-center gap-3 font-semibold">
              <ShieldCheck className="w-6 h-6 text-[var(--accent)] shrink-0" />
              <span>
                {lang === 'en'
                  ? 'Certified under CMI Security specifications for direct card readers integration.'
                  : lang === 'fr'
                    ? "Certifié conforme aux spécifications de sécurité CMI pour l'intégration directe des terminaux de paiement."
                    : 'معتمد بموجب مواصفات أمان CMI للربط المباشر مع أجهزة قراءة البطاقات البنكية.'}
              </span>
            </div> */}

          </div>

        </div>
      </section>

    </div>
  );
}
