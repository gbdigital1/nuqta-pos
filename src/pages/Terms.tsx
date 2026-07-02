import React, { useState } from 'react';
import {
    Printer,
    FileCheck2,
    LayoutGrid,
    UserPlus,
    CreditCard,
    ClipboardList,
    Database,
    ShieldOff,
    Copyright,
    Server,
    Gavel,
    XCircle,
    RefreshCw,
    Mail,
    AlertTriangle,
} from 'lucide-react';
import { Language } from '../types';


export const PUBLISHER_IDENTITY = {
    name: 'GB DIGITAL',
    legalForm: 'SARL AU', // TODO: confirm exact legal form (SARL / SARL-AU / SA)
    address: 'Marjane, Av Mohammed El Menouni — Résidence La Princesse, Mag 3, Meknès 50050, Maroc',
    phone: '+212 674-872888',
    phoneHref: '+212674872888',
    email: 'contact@gb-digital.net',
    rc: null as string | null, // TODO: RC number + city
    ice: null as string | null, // TODO: ICE number
    cndpReceipt: null as string | null, // TODO: CNDP Loi 09-08 declaration/receipt number
    host: null as string | null, // TODO: hosting provider name + address
};

interface TermsProps {
    lang: Language;
    onPageChange: (page: string) => void;
}

interface Note {
    text: string;
}

interface Section {
    id: string;
    icon: React.ReactNode;
    title: string;
    paragraphs: string[];
    bullets?: string[];
    note?: Note;
}

interface Content {
    eyebrow: string;
    title: string;
    lastUpdated: string;
    intro: string;
    printLabel: string;
    contactLabel: string;
    contactCta: string;
    sections: Section[];
}

/* ------------------------------------------------------------------ */

export default function Terms({ lang, onPageChange }: TermsProps) {
    const isRtl = lang === 'ar';
    const c = CONTENT[lang];
    const [activeId, setActiveId] = useState<string>(c.sections[0]?.id ?? '');

    const scrollTo = (id: string) => {
        setActiveId(id);
        const el = document.getElementById(id);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <div dir={isRtl ? 'rtl' : 'ltr'} className="pb-24">
            {/* Hero */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 pt-16">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-[var(--accent)] bg-[var(--accent-light)] px-2.5 py-1 rounded-full">
                        {c.eyebrow}
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1] mt-4">
                    {c.title}
                </h1>

                <div className="flex items-center gap-2 mt-3 text-[11px] font-mono font-bold text-[var(--text-muted)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    {c.lastUpdated}
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-5 max-w-2xl">{c.intro}</p>

                {/* chip nav */}
                <div className="-mx-4 px-4 mt-8 overflow-x-auto print:hidden">
                    <div className="flex gap-2 w-max pb-1">
                        {c.sections.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => scrollTo(s.id)}
                                className={`whitespace-nowrap text-[11px] font-bold px-3 py-1.5 rounded-full border transition-colors cursor-pointer ${activeId === s.id
                                    ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                                    : 'bg-white text-[var(--text-secondary)] border-[var(--border)]'
                                    }`}
                            >
                                {s.title}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Sections */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-8 space-y-5">
                {c.sections.map((s, idx) => (
                    <article
                        key={s.id}
                        id={s.id}
                        className="scroll-mt-24 bg-white rounded-2xl border border-[var(--border)] p-6 sm:p-8"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-2 rounded-xl bg-[var(--accent-light)] text-[var(--accent)] shrink-0">
                                {s.icon}
                            </div>
                            <h2 className="font-extrabold text-lg text-[var(--text-primary)] tracking-tight">
                                <span className="text-[var(--text-muted)] font-mono text-xs align-top mr-1.5 rtl:mr-0 rtl:ml-1.5">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                {s.title}
                            </h2>
                        </div>

                        <div className="space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                            {s.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}

                            {s.bullets && (
                                <ul className="space-y-2 pt-1">
                                    {s.bullets.map((b, i) => (
                                        <li key={i} className="flex items-start gap-2.5">
                                            <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                                            <span>{b}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}

                            {s.note && (
                                <div className="flex items-start gap-2.5 rounded-xl border bg-amber-50 border-amber-300 text-amber-900 p-3.5 mt-3">
                                    <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                                    <p className="text-[11px] font-semibold leading-relaxed">{s.note.text}</p>
                                </div>
                            )}
                        </div>
                    </article>
                ))}
            </section>

            {/* Contact strip */}
            <section className="max-w-4xl mx-auto px-4 sm:px-6 mt-10 print:hidden">
                <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[var(--accent-light)] text-[var(--accent)]">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-extrabold text-sm text-[var(--text-primary)]">{c.contactLabel}</p>
                            <a
                                href={`mailto:${PUBLISHER_IDENTITY.email}`}
                                className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--accent)]"
                            >
                                {PUBLISHER_IDENTITY.email}
                            </a>
                        </div>
                    </div>
                    <button
                        onClick={() => onPageChange('contact')}
                        className="px-5 py-2.5 text-xs font-bold bg-[var(--accent)] text-white hover:bg-[var(--accent-hover)] rounded-xl transition-all cursor-pointer shrink-0"
                    >
                        {c.contactCta}
                    </button>
                </div>
            </section>
        </div>
    );
}

/* ------------------------------------------------------------------ */

const CONTENT: Record<Language, Content> = {
    en: {
        eyebrow: 'Terms',
        title: 'Terms of Service',
        lastUpdated: 'Last updated: July 1, 2026',
        intro:
            'These Terms of Service govern your access to and use of Nuqta POS, the point-of-sale, sales, credit, client, invoicing, supplier, purchasing, stock, and analytics platform. By creating an account or using the service, you agree to these Terms.',
        printLabel: 'Print',
        contactLabel: 'Questions about these Terms?',
        contactCta: 'Contact us',
        sections: [
            {
                id: 'acceptance',
                icon: <FileCheck2 className="w-4 h-4" />,
                title: 'Acceptance of Terms',
                paragraphs: [
                    `These Terms form a binding agreement between you (the merchant, or the business you represent) and ${PUBLISHER_IDENTITY.name}, publisher of Nuqta POS. If you use the service on behalf of a business, you confirm you have authority to bind that business to these Terms.`,
                ],
            },
            {
                id: 'the-service',
                icon: <LayoutGrid className="w-4 h-4" />,
                title: 'Description of the service',
                paragraphs: [
                    'Nuqta POS is an advanced business management software, engineered to international quality standards, covering:',
                ],
                bullets: [
                    'Point-of-sale and sales management.',
                    'Client management and credit tracking.',
                    'Invoicing, quotes (devis), and delivery notes (bons de livraison).',
                    'Supplier records and purchasing management.',
                    'Stock and inventory management.',
                    'Advanced business analytics',
                    'Business Expenses Advanced Management System',
                    'Cashiers Management',
                    'Client follow-up',
                    'Sales & Transactions History',
                    'Reporting System (Generated PDF or Printed Automatically)',
                ],
                note: {
                    text: 'Feature availability may vary by plan (subscription or one-time license) and by deployment mode (offline, hybrid, or cloud).',
                },
            },
            {
                id: 'accounts',
                icon: <UserPlus className="w-4 h-4" />,
                title: 'Accounts & eligibility',
                paragraphs: [
                    'You must provide accurate registration information and keep your login credentials confidential. You are responsible for all activity carried out under your account and staff accounts you create.',
                ],
            },
            {
                id: 'your-data',
                icon: <Database className="w-4 h-4" />,
                title: 'Your business data',
                paragraphs: [
                    'You retain ownership of the business data you enter into Nuqta POS, including your client, credit, invoicing, supplier, purchasing, and stock records. You are responsible for the accuracy of this data and for complying with applicable tax, invoicing, and record-keeping regulations when using the platform to generate factures, devis, and bons de livraison.',
                    'See our Privacy Policy for how account and business data is processed.',
                ],
            },
            {
                id: 'acceptable-use',
                icon: <ShieldOff className="w-4 h-4" />,
                title: 'Acceptable use',
                paragraphs: ['When using Nuqta POS, you agree not to:'],
                bullets: [
                    'Use the service for any unlawful purpose or in violation of applicable Moroccan regulations.',
                    'Attempt to reverse-engineer, decompile, or interfere with the platform or its security.',
                    'Resell, sublicense, or provide access to the service to unauthorized third parties.',
                    "Upload data that infringes on the rights of others or that you do not have the right to process.",
                ],
            },
            {
                id: 'ip',
                icon: <Copyright className="w-4 h-4" />,
                title: 'Intellectual property',
                paragraphs: [
                    `The Nuqta POS name, logo, interface, and underlying software are the exclusive property of ${PUBLISHER_IDENTITY.name} or its licensors. These Terms grant you a limited right to use the service; they do not transfer any ownership of the platform itself. See our Legal Notice for further detail.`,
                ],
            },
            {
                id: 'availability',
                icon: <Server className="w-4 h-4" />,
                title: 'Service availability',
                paragraphs: [
                    'Because Nuqta POS supports offline, hybrid, and cloud modes, core point-of-sale functions remain usable without an internet connection where offline mode is enabled. Cloud sync, backups, and analytics that depend on connectivity require an internet connection.',
                ],

            },

            {
                id: 'changes',
                icon: <RefreshCw className="w-4 h-4" />,
                title: 'Changes to these Terms',
                paragraphs: [
                    'We may update these Terms as Nuqta POS evolves. Material changes will be reflected by the "last updated" date above, and where appropriate, communicated directly to account holders before taking effect.',
                ],
            },
        ],
    },

    fr: {
        eyebrow: 'Conditions',
        title: "Conditions Générales d'Utilisation",
        lastUpdated: 'Dernière mise à jour : 1er juillet 2026',
        intro:
            "Les présentes Conditions Générales régissent votre accès et votre utilisation de Nuqta POS, la plateforme de caisse, de gestion des ventes, des crédits, des clients, de facturation, des fournisseurs, des achats, du stock et de l'analytique. En créant un compte ou en utilisant le service, vous acceptez ces Conditions.",
        printLabel: 'Imprimer',
        contactLabel: 'Une question sur ces conditions ?',
        contactCta: 'Nous contacter',
        sections: [
            {
                id: 'acceptance',
                icon: <FileCheck2 className="w-4 h-4" />,
                title: 'Acceptation des conditions',
                paragraphs: [
                    `Les présentes Conditions constituent un accord contraignant entre vous (le commerçant, ou l'entreprise que vous représentez) et ${PUBLISHER_IDENTITY.name}, éditeur de Nuqta POS. Si vous utilisez le service au nom d'une entreprise, vous confirmez disposer de l'autorité nécessaire pour l'engager au titre des présentes Conditions.`,
                ],
            },
            {
                id: 'the-service',
                icon: <LayoutGrid className="w-4 h-4" />,
                title: 'Description du service',
                paragraphs: [
                    "Nuqta POS est une plateforme avancée de gestion d'entreprise, conçue selon des standards de qualité internationaux, couvrant :",
                ],
                bullets: [
                    'La caisse et la gestion des ventes.',
                    'La gestion des clients et le suivi du crédit.',
                    'La facturation, les devis et les bons de livraison.',
                    'Les fiches fournisseurs et la gestion des achats.',
                    'La gestion du stock et des inventaires.',
                    'Analyses commerciales avancées',
                    'Système avancé de gestion des dépenses professionnelles',
                    'Gestion des caissiers',
                    'Suivi des clients',
                    'Historique des ventes et transactions',
                    'Système de rapports (PDF généré ou imprimé automatiquement)',
                ],
                note: {
                    text: "La disponibilité des fonctionnalités peut varier selon la formule (abonnement ou licence unique) et le mode de déploiement (hors ligne, hybride ou cloud).",
                },
            },
            {
                id: 'accounts',
                icon: <UserPlus className="w-4 h-4" />,
                title: 'Comptes et éligibilité',
                paragraphs: [
                    'Vous devez fournir des informations d\'inscription exactes et garder vos identifiants confidentiels. Vous êtes responsable de toute activité effectuée sous votre compte et les comptes employés que vous créez.',
                ],
            },
            {
                id: 'your-data',
                icon: <Database className="w-4 h-4" />,
                title: 'Vos données métier',
                paragraphs: [
                    "Vous conservez la propriété des données métier que vous saisissez dans Nuqta POS, y compris vos fiches clients, crédits, factures, fournisseurs, achats et stock. Vous êtes responsable de l'exactitude de ces données et du respect de la réglementation fiscale, de facturation et de conservation des documents applicable lorsque vous utilisez la plateforme pour générer factures, devis et bons de livraison.",
                    "Consultez notre Politique de confidentialité pour savoir comment les données de compte et métier sont traitées.",
                ],
            },
            {
                id: 'acceptable-use',
                icon: <ShieldOff className="w-4 h-4" />,
                title: 'Utilisation autorisée',
                paragraphs: ["En utilisant Nuqta POS, vous vous engagez à ne pas :"],
                bullets: [
                    "Utiliser le service à des fins illicites ou en violation de la réglementation marocaine applicable.",
                    "Tenter de faire de l'ingénierie inverse, de décompiler ou de porter atteinte à la plateforme ou à sa sécurité.",
                    "Revendre, sous-licencier ou donner accès au service à des tiers non autorisés.",
                    "Téléverser des données portant atteinte aux droits d'autrui ou que vous n'avez pas le droit de traiter.",
                ],
            },
            {
                id: 'ip',
                icon: <Copyright className="w-4 h-4" />,
                title: 'Propriété intellectuelle',
                paragraphs: [
                    `La marque Nuqta POS, son logo, son interface et le logiciel sous-jacent sont la propriété exclusive de ${PUBLISHER_IDENTITY.name} ou de ses concédants. Les présentes Conditions vous accordent un droit d'utilisation limité du service ; elles ne transfèrent aucune propriété de la plateforme elle-même. Voir nos Mentions légales pour plus de détails.`,
                ],
            },
            {
                id: 'availability',
                icon: <Server className="w-4 h-4" />,
                title: 'Disponibilité du service',
                paragraphs: [
                    "Nuqta POS fonctionnant en modes hors ligne, hybride et cloud, les fonctions essentielles de caisse restent utilisables sans connexion internet lorsque le mode hors ligne est activé. La synchronisation cloud, les sauvegardes et l'analytique nécessitant une connectivité requièrent une connexion internet.",
                ],

            },

            {
                id: 'changes',
                icon: <RefreshCw className="w-4 h-4" />,
                title: 'Modifications des présentes Conditions',
                paragraphs: [
                    "Nous pouvons mettre à jour ces Conditions à mesure que Nuqta POS évolue. Les modifications substantielles se refléteront dans la date de « dernière mise à jour » ci-dessus et, le cas échéant, seront communiquées directement aux titulaires de compte avant leur entrée en vigueur.",
                ],
            },
        ],
    },

    ar: {
        eyebrow: 'الشروط',
        title: 'شروط الاستخدام',
        lastUpdated: 'آخر تحديث: 1 يوليوز 2026',
        intro:
            'تحكم شروط الاستخدام هذه ولوجكم واستخدامكم لـ Nuqta POS، منصة نقاط البيع وتدبير المبيعات والائتمانات والزبائن والفوترة والموردين والمشتريات والمخزون والتحليلات. بإنشاء حساب أو استخدام الخدمة، فإنكم توافقون على هذه الشروط.',
        printLabel: 'طباعة',
        contactLabel: 'لديك سؤال حول هذه الشروط؟',
        contactCta: 'تواصل معنا',
        sections: [
            {
                id: 'acceptance',
                icon: <FileCheck2 className="w-4 h-4" />,
                title: 'قبول الشروط',
                paragraphs: [
                    `تشكل هذه الشروط اتفاقاً ملزماً بينكم (التاجر، أو المقاولة التي تمثلونها) وبين ${PUBLISHER_IDENTITY.name}، ناشر Nuqta POS. إذا كنتم تستخدمون الخدمة نيابة عن مقاولة، فإنكم تؤكدون توفركم على الصلاحية لإلزام تلك المقاولة بهذه الشروط.`,
                ],
            },
            {
                id: 'the-service',
                icon: <LayoutGrid className="w-4 h-4" />,
                title: 'وصف الخدمة',
                paragraphs: ['Nuqta POS منصة متقدمة لتدبير الأعمال، مُصممة وفق معايير جودة دولية، تغطي:'],
                bullets: [
                    'نقطة البيع وتدبير المبيعات.',
                    'تدبير الزبائن وتتبع الائتمان.',
                    'الفوترة والعروض (devis) وبيانات التسليم.',
                    'سجلات الموردين وتدبير المشتريات.',
                    'تدبير المخزون والجرد.',
                    'التحليلات المتقدمة والتقارير.',
                    'نظام إدارة متقدم لمصاريف الأعمال',
                    'إدارة أمناء الصندوق',
                    'متابعة العملاء',
                    'سجل المبيعات والمعاملات',
                    'نظام التقارير (ملف PDF  أو مطبوع تلقائيًا)',
                ],
                note: {
                    text: 'قد تختلف الميزات المتاحة حسب الباقة (اشتراك أو رخصة واحدة) وحسب وضع التشغيل (غير متصل، هجين، أو سحابي).',
                },
            },
            {
                id: 'accounts',
                icon: <UserPlus className="w-4 h-4" />,
                title: 'الحسابات والأهلية',
                paragraphs: [
                    'يجب عليكم تقديم معلومات تسجيل دقيقة والحفاظ على سرية بيانات ولوجكم. أنتم مسؤولون عن كل نشاط يتم عبر حسابكم وحسابات الموظفين التي تنشئونها.',
                ],
            },
            {
                id: 'your-data',
                icon: <Database className="w-4 h-4" />,
                title: 'بيانات نشاطكم التجاري',
                paragraphs: [
                    'تحتفظون بملكية بيانات النشاط التجاري التي تُدخلونها في Nuqta POS، بما فيها سجلات زبائنكم وائتماناتكم وفواتيركم ومورديكم ومشترياتكم ومخزونكم. أنتم مسؤولون عن دقة هذه البيانات وعن الامتثال للتشريعات الضريبية وقواعد الفوترة وحفظ السجلات المعمول بها عند استخدام المنصة لإصدار الفواتير والعروض وبيانات التسليم.',
                    'راجعوا سياسة الخصوصية لمعرفة كيفية معالجة بيانات الحساب والنشاط التجاري.',
                ],
            },
            {
                id: 'acceptable-use',
                icon: <ShieldOff className="w-4 h-4" />,
                title: 'الاستخدام المقبول',
                paragraphs: ['عند استخدام Nuqta POS، تلتزمون بعدم:'],
                bullets: [
                    'استخدام الخدمة لأي غرض غير قانوني أو بشكل يخالف التشريعات المغربية المعمول بها.',
                    'محاولة الهندسة العكسية أو فك تشفير المنصة أو المساس بأمنها.',
                    'إعادة بيع الخدمة أو الترخيص من الباطن أو منح الولوج إليها لأطراف ثالثة غير مصرح لها.',
                    'رفع بيانات تنتهك حقوق الغير أو لا تملكون الحق في معالجتها.',
                ],
            },
            {
                id: 'ip',
                icon: <Copyright className="w-4 h-4" />,
                title: 'الملكية الفكرية',
                paragraphs: [
                    `تُعتبر علامة Nuqta POS وشعارها وواجهتها والبرمجيات الأساسية ملكية حصرية لـ ${PUBLISHER_IDENTITY.name} أو للجهات المرخِّصة لها. تمنحكم هذه الشروط حقاً محدوداً لاستخدام الخدمة، ولا تنقل إليكم أي ملكية للمنصة نفسها. راجعوا الإشعار القانوني لمزيد من التفاصيل.`,
                ],
            },
            {
                id: 'availability',
                icon: <Server className="w-4 h-4" />,
                title: 'توفر الخدمة',
                paragraphs: [
                    'نظراً لأن Nuqta POS يدعم الأوضاع غير المتصلة والهجينة والسحابية، تبقى وظائف نقطة البيع الأساسية قابلة للاستخدام دون اتصال بالإنترنت عند تفعيل الوضع غير المتصل. أما المزامنة السحابية والنسخ الاحتياطي والتحليلات التي تتطلب اتصالاً، فتستوجب اتصالاً بالإنترنت',
                ],

            },

            {
                id: 'changes',
                icon: <RefreshCw className="w-4 h-4" />,
                title: 'التعديلات على هذه الشروط',
                paragraphs: [
                    'قد نُحدّث هذه الشروط مع تطور Nuqta POS. ستنعكس التغييرات الجوهرية في تاريخ "آخر تحديث" أعلاه، وسيتم، عند الاقتضاء، إبلاغ أصحاب الحسابات بها مباشرة قبل دخولها حيز التنفيذ.',
                ],
            },
        ],
    },
};