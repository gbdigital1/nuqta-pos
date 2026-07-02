import React, { useState } from 'react';
import {
    Printer,
    ShieldCheck,
    Database,
    Users,
    Share2,
    Lock,
    Clock,
    UserCheck,
    Cookie,
    Baby,
    RefreshCw,
    Mail,
    Building2,
    AlertTriangle,
} from 'lucide-react';
import { Language } from '../types';



export const PUBLISHER_IDENTITY = {
    name: 'GB DIGITAL',
    legalForm: 'SARL', // TODO: confirm exact legal form (SARL / SARL-AU / SA)
    address: 'Marjane, Av Mohammed El Menouni — Résidence La Princesse, Mag 3, Meknès 50050, Maroc',
    phone: '+212 674-872888',
    phoneHref: '+212674872888',
    email: 'contact@gb-digital.net',
    rc: null as string | null, // TODO: RC number + city
    ice: null as string | null, // TODO: ICE number
    cndpReceipt: null as string | null, // TODO: CNDP Loi 09-08 declaration/receipt number
    host: null as string | null, // TODO: hosting provider name + address
};


interface PrivacyPolicyProps {
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

export default function PrivacyPolicy({ lang, onPageChange }: PrivacyPolicyProps) {
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
        eyebrow: 'Privacy',
        title: 'Privacy Policy',
        lastUpdated: 'Last updated: July 1, 2026',
        intro:
            'This policy explains what data Nuqta POS collects when a business uses our point-of-sale, sales, credit, client, invoicing, supplier, purchasing, stock, and analytics platform, why we collect it, and the choices available to you.',
        printLabel: 'Print',
        contactLabel: 'Questions about your data?',
        contactCta: 'Contact us',
        sections: [
            {
                id: 'scope',
                icon: <ShieldCheck className="w-4 h-4" />,
                title: 'Scope',
                paragraphs: [
                    `This policy applies to the Nuqta POS application, dashboard, and related services, published by ${PUBLISHER_IDENTITY.name}. It covers data about merchants and staff who use Nuqta POS ("account data") and data merchants enter about their own customers, suppliers, and stock while running their business ("business data").`,
                    `For details on the identity of ${PUBLISHER_IDENTITY.name} as publisher, see our Legal Notice.`,
                ],
            },
            {
                id: 'what-we-collect',
                icon: <Database className="w-4 h-4" />,
                title: 'Data we collect',
                paragraphs: [
                    'Nuqta POS is built around sales and business management, so most of the data that passes through it is entered directly by you or your staff. We collect:',
                ],
                bullets: [
                    'Account data: name, phone number, email, business name, and login credentials for merchants and staff members.',
                    'Sales & transaction data: point-of-sale sales, payment methods, and credit balances recorded against your clients.',
                    'Client management data: names, contact details, and credit histories you record for your own customers.',
                    'Documents: invoices (factures), quotes (devis), and delivery notes (bons de livraison) generated within the platform.',
                    'Supplier & purchasing data: supplier records, purchase orders, and related costs.',
                    'Stock data: inventory levels, product catalogs, and stock movements.',
                    'Analytics data: usage patterns and sales trends we generate to power the advanced analytics features of the platform.',
                    'Technical data: device type, app version, and diagnostic logs needed to keep the service running.',
                ],
            },
            {
                id: 'how-we-use',
                icon: <Users className="w-4 h-4" />,
                title: 'How we use this data',
                paragraphs: [
                    'We use account and business data to operate the core features of Nuqta POS: processing sales, tracking client credit, generating invoices, quotes and delivery notes, managing suppliers and purchases, keeping stock levels accurate, and producing the analytics and reporting you rely on to run your business.',
                    'We also use data to provide customer support, secure your account, maintain and improve the service, and meet our legal and accounting obligations.',
                ],
            },
            {
                id: 'client-data-responsibility',
                icon: <UserCheck className="w-4 h-4" />,
                title: "Data about your own customers",
                paragraphs: [
                    'When you use Nuqta POS to manage your clients, credits, invoices, or suppliers, you are the data controller for the personal information you enter about those third parties, and you are responsible for having a lawful basis to collect and process it.',
                    `${PUBLISHER_IDENTITY.name} acts as a data processor for this business data: we store and process it on your behalf, strictly to provide the service, and do not use it for our own independent purposes.`,
                ],
            },
            {
                id: 'storage-security',
                icon: <Lock className="w-4 h-4" />,
                title: 'Storage & security',
                paragraphs: [
                    'Nuqta POS supports offline (Local), hybrid (Local + Sync) and fully cloud-connected modes. In offline mode, your data stays on your device. In hybrid or cloud mode, data syncs to and is stored on our servers so it is available across devices and protected against device loss.',
                    'We apply reasonable technical and organizational measures, including access controls and encrypted transmission, to protect data against unauthorized access.',
                ],
            },

            {
                id: 'cookies',
                icon: <Cookie className="w-4 h-4" />,
                title: 'Cookies',
                paragraphs: [
                    'Our website and dashboard may use cookies for authentication, language preference, and basic usage statistics. See our Legal Notice for details.',
                ],
            },

            {
                id: 'changes',
                icon: <RefreshCw className="w-4 h-4" />,
                title: 'Changes to this policy',
                paragraphs: [
                    'We may update this policy as Nuqta POS evolves. Material changes will be reflected by the "last updated" date above, and where appropriate, communicated directly to account holders.',
                ],
            },
        ],
    },

    fr: {
        eyebrow: 'Confidentialité',
        title: 'Politique de confidentialité',
        lastUpdated: 'Dernière mise à jour : 1er juillet 2026',
        intro:
            "Cette politique explique quelles données Nuqta POS collecte lorsqu'une entreprise utilise notre plateforme de caisse, de gestion des ventes, des crédits, des clients, de facturation, des fournisseurs, des achats, du stock et de l'analytique, pourquoi nous les collectons, et les choix qui s'offrent à vous.",
        printLabel: 'Imprimer',
        contactLabel: 'Une question sur vos données ?',
        contactCta: 'Nous contacter',
        sections: [
            {
                id: 'scope',
                icon: <ShieldCheck className="w-4 h-4" />,
                title: "Champ d'application",
                paragraphs: [
                    `Cette politique s'applique à l'application Nuqta POS, au tableau de bord et aux services associés, édités par ${PUBLISHER_IDENTITY.name}. Elle couvre les données relatives aux commerçants et employés utilisant Nuqta POS (« données de compte ») ainsi que les données que les commerçants saisissent sur leurs propres clients, fournisseurs et stocks (« données métier »).`,
                    `Pour l'identité de ${PUBLISHER_IDENTITY.name} en tant qu'éditeur, consultez nos Mentions légales.`,
                ],
            },
            {
                id: 'what-we-collect',
                icon: <Database className="w-4 h-4" />,
                title: 'Données collectées',
                paragraphs: [
                    "Nuqta POS est conçu autour de la gestion des ventes et de l'activité commerciale : la majorité des données qui transitent par la plateforme sont saisies directement par vous ou votre équipe. Nous collectons :",
                ],
                bullets: [
                    'Données de compte : nom, téléphone, email, raison sociale et identifiants de connexion des commerçants et employés.',
                    'Données de ventes et transactions : ventes en caisse, moyens de paiement et soldes de crédit enregistrés pour vos clients.',
                    'Données de gestion clients : noms, coordonnées et historiques de crédit que vous enregistrez pour vos propres clients.',
                    'Documents : factures, devis et bons de livraison générés au sein de la plateforme.',
                    "Données fournisseurs et achats : fiches fournisseurs, bons de commande et coûts associés.",
                    "Données de stock : niveaux d'inventaire, catalogues produits et mouvements de stock.",
                    "Données analytiques : tendances de ventes et d'utilisation générées pour alimenter les fonctionnalités d'analytique avancée.",
                    'Données techniques : type d\'appareil, version de l\'application et journaux de diagnostic nécessaires au fonctionnement du service.',
                ],
            },
            {
                id: 'how-we-use',
                icon: <Users className="w-4 h-4" />,
                title: 'Utilisation des données',
                paragraphs: [
                    "Nous utilisons les données de compte et métier pour faire fonctionner les fonctionnalités essentielles de Nuqta POS : traitement des ventes, suivi du crédit client, génération de factures, devis et bons de livraison, gestion des fournisseurs et des achats, suivi précis du stock, et production des analyses sur lesquelles vous vous appuyez pour piloter votre activité.",
                    'Nous utilisons également les données pour fournir un support client, sécuriser votre compte, maintenir et améliorer le service, et respecter nos obligations légales et comptables.',
                ],
            },
            {
                id: 'client-data-responsibility',
                icon: <UserCheck className="w-4 h-4" />,
                title: 'Données relatives à vos propres clients',
                paragraphs: [
                    "Lorsque vous utilisez Nuqta POS pour gérer vos clients, crédits, factures ou fournisseurs, vous êtes le responsable du traitement des données personnelles que vous saisissez sur ces tiers, et il vous appartient de disposer d'une base légale pour les collecter et les traiter.",
                    `${PUBLISHER_IDENTITY.name} agit en tant que sous-traitant pour ces données métier : nous les stockons et les traitons pour votre compte, strictement pour fournir le service, sans les utiliser à nos propres fins.`,
                ],
            },
            {
                id: 'storage-security',
                icon: <Lock className="w-4 h-4" />,
                title: 'Stockage et sécurité',
                paragraphs: [
                    "Nuqta POS fonctionne en mode hors ligne (Local), hybride ou connecté au cloud : l'emplacement de vos données dépend donc du mode choisi. En mode hors ligne, vos données restent sur votre appareil. En mode hybride ou cloud, elles sont synchronisées et stockées sur nos serveurs afin d'être disponibles sur plusieurs appareils et protégées en cas de perte de matériel.",
                    "Nous mettons en œuvre des mesures techniques et organisationnelles raisonnables, notamment des contrôles d'accès et un chiffrement des transmissions, pour protéger les données contre tout accès.",
                ],

            },


            {
                id: 'cookies',
                icon: <Cookie className="w-4 h-4" />,
                title: 'Cookies',
                paragraphs: [
                    "Notre site et notre tableau de bord peuvent utiliser des cookies pour l'authentification, la préférence de langue et des statistiques d'utilisation de base. Voir nos Mentions légales pour plus de détails.",
                ],
            },

            {
                id: 'changes',
                icon: <RefreshCw className="w-4 h-4" />,
                title: 'Modifications de cette politique',
                paragraphs: [
                    "Nous pouvons mettre à jour cette politique à mesure que Nuqta POS évolue. Les modifications substantielles se refléteront dans la date de « dernière mise à jour » ci-dessus et, le cas échéant, seront communiquées directement aux titulaires de compte.",
                ],
            },
        ],
    },

    ar: {
        eyebrow: 'الخصوصية',
        title: 'سياسة الخصوصية',
        lastUpdated: 'آخر تحديث: 1 يوليوز 2026',
        intro:
            'توضح هذه السياسة البيانات التي يجمعها Nuqta POS عندما تستخدم مقاولة منصتنا لنقاط البيع وتدبير المبيعات والائتمانات والزبائن والفوترة والموردين والمشتريات والمخزون والتحليلات، ولماذا نجمعها، والخيارات المتاحة لك.',
        printLabel: 'طباعة',
        contactLabel: 'لديك سؤال حول بياناتك؟',
        contactCta: 'تواصل معنا',
        sections: [
            {
                id: 'scope',
                icon: <ShieldCheck className="w-4 h-4" />,
                title: 'نطاق التطبيق',
                paragraphs: [
                    `تنطبق هذه السياسة على تطبيق Nuqta POS ولوحة التحكم والخدمات المرتبطة بها، والتي ينشرها ${PUBLISHER_IDENTITY.name}. وتشمل بيانات التجار والموظفين الذين يستخدمون Nuqta POS ("بيانات الحساب")، وكذا البيانات التي يُدخلها التجار حول زبائنهم ومورديهم ومخزونهم الخاص ("بيانات النشاط التجاري").`,
                    `للاطلاع على هوية ${PUBLISHER_IDENTITY.name} كناشر، يرجى مراجعة الإشعار القانوني.`,
                ],
            },
            {
                id: 'what-we-collect',
                icon: <Database className="w-4 h-4" />,
                title: 'البيانات التي نجمعها',
                paragraphs: ['صُمم Nuqta POS حول تدبير المبيعات والنشاط التجاري، لذلك فإن معظم البيانات التي تمر عبره يُدخلها أنتم أو فريقكم مباشرة. نجمع:'],
                bullets: [
                    'بيانات الحساب: الاسم، الهاتف، البريد الإلكتروني، اسم المقاولة، ومعلومات تسجيل الدخول للتجار والموظفين.',
                    'بيانات المبيعات والمعاملات: مبيعات نقطة البيع، طرق الأداء، وأرصدة الائتمان المسجلة لزبائنكم.',
                    'بيانات تدبير الزبائن: الأسماء، معلومات الاتصال، وسجلات الائتمان التي تسجلونها لزبائنكم.',
                    'الوثائق: الفواتير والعروض (devis) وبيانات التسليم المُنشأة داخل المنصة.',
                    'بيانات الموردين والمشتريات: سجلات الموردين، أوامر الشراء، والتكاليف المرتبطة بها.',
                    'بيانات المخزون: مستويات المخزون، كتالوجات المنتجات، وحركات المخزون.',
                    'بيانات تحليلية: أنماط الاستخدام واتجاهات المبيعات التي نُنشئها لتشغيل ميزات التحليل المتقدمة.',
                    'بيانات تقنية: نوع الجهاز، إصدار التطبيق، وسجلات التشخيص اللازمة لتشغيل الخدمة.',
                ],
            },
            {
                id: 'how-we-use',
                icon: <Users className="w-4 h-4" />,
                title: 'كيفية استخدام البيانات',
                paragraphs: [
                    'نستخدم بيانات الحساب والنشاط التجاري لتشغيل الوظائف الأساسية لـ Nuqta POS: معالجة المبيعات، تتبع ائتمان الزبائن، إنشاء الفواتير والعروض وبيانات التسليم، تدبير الموردين والمشتريات، ضبط مستويات المخزون، وإنتاج التحليلات والتقارير التي تعتمدون عليها في تسيير نشاطكم.',
                    'كما نستخدم البيانات لتقديم الدعم، تأمين حسابكم، صيانة الخدمة وتحسينها، والوفاء بالتزاماتنا القانونية والمحاسبية.',
                ],
            },
            {
                id: 'client-data-responsibility',
                icon: <UserCheck className="w-4 h-4" />,
                title: 'البيانات المتعلقة بزبائنكم',
                paragraphs: [
                    'عند استخدامكم لـ Nuqta POS لتدبير زبائنكم أو ائتماناتكم أو فواتيركم أو مورديكم، فإنكم تُعتبرون المسؤول عن معالجة البيانات الشخصية التي تُدخلونها بخصوص هؤلاء الأطراف الثالثة، وتتحملون مسؤولية توفر أساس قانوني لجمعها ومعالجتها.',
                    `تعمل ${PUBLISHER_IDENTITY.name} كمعالج لهذه البيانات التجارية: نقوم بتخزينها ومعالجتها نيابة عنكم، بشكل حصري لتقديم الخدمة، دون استخدامها لأغراضنا الخاصة.`,
                ],
            },
            {
                id: 'storage-security',
                icon: <Lock className="w-4 h-4" />,
                title: 'التخزين والأمن',
                paragraphs: [
                    'يعمل Nuqta POS في وضع غير متصل بالكامل، أو وضع هجين، أو وضع سحابي متصل بالكامل، لذا فإن مكان تواجد بياناتكم يعتمد على الوضع المعتمد. في الوضع غير المتصل، تبقى بياناتكم على جهازكم. أما في الوضع الهجين أو السحابي، فتتم مزامنة البيانات وتخزينها على خوادمنا لتكون متاحة عبر عدة أجهزة ومحمية من فقدان الجهاز.',
                    'نطبق تدابير تقنية وتنظيمية معقولة، بما في ذلك ضوابط الولوج وتشفير عمليات النقل، لحماية البيانات من أي ولوج غير مصرح به.',
                ],

            },


            {
                id: 'cookies',
                icon: <Cookie className="w-4 h-4" />,
                title: 'ملفات تعريف الارتباط',
                paragraphs: [
                    'قد يستخدم موقعنا ولوحة التحكم ملفات تعريف الارتباط للمصادقة، وتذكر تفضيل اللغة، وإحصائيات استخدام أساسية. راجع الإشعار القانوني للتفاصيل.',
                ],
            },

            {
                id: 'changes',
                icon: <RefreshCw className="w-4 h-4" />,
                title: 'التعديلات على هذه السياسة',
                paragraphs: [
                    'قد نُحدّث هذه السياسة مع تطور Nuqta POS. ستنعكس التغييرات الجوهرية في تاريخ "آخر تحديث" أعلاه، وسيتم، عند الاقتضاء، إبلاغ أصحاب الحسابات بها مباشرة.',
                ],
            },
        ],
    },
};