import React, { useEffect, useRef, useState } from 'react';
import {
    Building2,
    Server,
    Copyright,
    Link2,
    Cookie,
    ShieldAlert,
    Gavel,
    Printer,
    Check,
    Mail,
    Phone,
    MapPin,
    AlertTriangle,
} from 'lucide-react';
import { Language } from '../types';

/* ------------------------------------------------------------------ */
/*  Shared publisher / operating-entity identity                       */
/*  Nuqta POS is built and operated by GB DIGITAL.                     */
/*  Fill in RC / ICE / CNDP once available — flagged inline as TODO.   */
/* ------------------------------------------------------------------ */
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

/* ------------------------------------------------------------------ */
/*  Content types                                                      */
/* ------------------------------------------------------------------ */
export interface LegalSubsection {
    title: string;
    paragraphs?: string[];
    bullets?: string[];
}

export interface LegalNote {
    type: 'info' | 'warning' | 'todo';
    text: string;
}

export interface LegalSection {
    id: string;
    icon: React.ReactNode;
    title: string;
    paragraphs?: string[];
    bullets?: string[];
    subsections?: LegalSubsection[];
    note?: LegalNote;
}

export interface LegalPageContent {
    eyebrow: string;
    title: string;
    lastUpdated: string;
    intro: string;
    sections: LegalSection[];
    contactLabel: string;
    contactCta: string;
    tocLabel: string;
    printLabel: string;
    copyLabel: string;
    copiedLabel: string;
}

/* ------------------------------------------------------------------ */
/*  Page content (per language)                                        */
/* ------------------------------------------------------------------ */
const CONTENT: Record<Language, LegalPageContent> = {
    en: {
        eyebrow: 'Legal',
        title: 'Legal Notice',
        lastUpdated: 'Last updated: July 1, 2026',
        intro:
            'In accordance with Moroccan law governing electronic commerce and digital publishing, this notice identifies the publisher of the Nuqta POS website and application, the hosting provider, and the terms under which the site may be used.',
        tocLabel: 'On this page',
        printLabel: 'Print',
        copyLabel: 'Copy link',
        copiedLabel: 'Copied',
        contactLabel: 'Questions about this notice?',
        contactCta: 'Contact us',
        sections: [
            {
                id: 'publisher',
                icon: <Building2 className="w-4 h-4" />,
                title: 'Site publisher',
                paragraphs: [
                    `The Nuqta POS website and application are published and operated by ${PUBLISHER_IDENTITY.name} SARL AU, a company registered in Morocco.`,
                ],
                bullets: [
                    `Registered office: ${PUBLISHER_IDENTITY.address}`,
                    `Phone: ${PUBLISHER_IDENTITY.phone}`,
                    `Email: ${PUBLISHER_IDENTITY.email}`,

                ],
            },
            {
                id: 'publication-director',
                icon: <Building2 className="w-4 h-4" />,
                title: 'Publication director',
                paragraphs: [
                    `The person responsible for publication is the legal representative of ${PUBLISHER_IDENTITY.name}. Any correspondence regarding site content should be sent to ${PUBLISHER_IDENTITY.email}.`,
                ],
            },
            {
                id: 'hosting',
                icon: <Server className="w-4 h-4" />,
                title: 'Hosting',
                paragraphs: [
                    'The site and its associated services are hosted by a third-party infrastructure provider. Details of the hosting provider are listed below.',
                ],
                bullets: [
                    PUBLISHER_IDENTITY.host ? PUBLISHER_IDENTITY.host : 'Hosting provider: Hostinger',
                ],
            },
            {
                id: 'intellectual-property',
                icon: <Copyright className="w-4 h-4" />,
                title: 'Intellectual property',
                paragraphs: [
                    `The Nuqta POS name, logo, interface, source code, and all content published on the site (text, graphics, icons, product photography) are the exclusive property of ${PUBLISHER_IDENTITY.name} or its licensors, and are protected under Moroccan and international intellectual property law.`,
                    'No part of the site may be reproduced, distributed, modified, or used for commercial purposes without prior written authorization, except where reproduction is strictly for private, non-commercial use.',
                ],
            },

            {
                id: 'cookies',
                icon: <Cookie className="w-4 h-4" />,
                title: 'Cookies',
                paragraphs: [
                    'The site may use cookies and similar technologies to keep you signed in, remember your language preference, and measure basic audience statistics. You can configure your browser to refuse cookies.',
                ],
            },
            {
                id: 'liability',
                icon: <ShieldAlert className="w-4 h-4" />,
                title: 'Limitation of liability',
                paragraphs: [
                    `${PUBLISHER_IDENTITY.name} makes reasonable efforts to ensure the accuracy and availability of information on this site, but cannot guarantee it is free of errors, omissions, or interruptions. Use of the site is at the visitor's own responsibility.`,
                ],
            },

        ],
    },

    fr: {
        eyebrow: 'Mentions légales',
        title: 'Mentions légales',
        lastUpdated: 'Dernière mise à jour : 1er juillet 2026',
        intro:
            "Conformément à la législation marocaine relative au commerce électronique et à la publication numérique, la présente page identifie l'éditeur du site et de l'application Nuqta POS, l'hébergeur, ainsi que les conditions d'utilisation du site.",
        tocLabel: 'Sur cette page',
        printLabel: 'Imprimer',
        copyLabel: 'Copier le lien',
        copiedLabel: 'Copié',
        contactLabel: 'Une question sur ces mentions ?',
        contactCta: 'Nous contacter',
        sections: [
            {
                id: 'publisher',
                icon: <Building2 className="w-4 h-4" />,
                title: "Éditeur du site",
                paragraphs: [
                    `Le site et l'application Nuqta POS sont édités et exploités par ${PUBLISHER_IDENTITY.name} SARL AU, société immatriculée au Maroc.`,
                ],
                bullets: [
                    `Siège social : ${PUBLISHER_IDENTITY.address}`,
                    `Téléphone : ${PUBLISHER_IDENTITY.phone}`,
                    `Email : ${PUBLISHER_IDENTITY.email}`,
                ],
            },
            {
                id: 'publication-director',
                icon: <Building2 className="w-4 h-4" />,
                title: 'Directeur de la publication',
                paragraphs: [
                    `Le directeur de la publication est le représentant légal de ${PUBLISHER_IDENTITY.name}. Toute correspondance relative au contenu du site peut être adressée à ${PUBLISHER_IDENTITY.email}.`,
                ],
            },
            {
                id: 'hosting',
                icon: <Server className="w-4 h-4" />,
                title: 'Hébergement',
                paragraphs: [
                    'Le site et les services associés sont hébergés par un prestataire tiers dont les coordonnées figurent ci-dessous.',
                ],
                bullets: [
                    'Hébergeur : Hostinger',
                ],
            },
            {
                id: 'intellectual-property',
                icon: <Copyright className="w-4 h-4" />,
                title: 'Propriété intellectuelle',
                paragraphs: [
                    `La marque Nuqta POS, son logo, son interface, son code source et l'ensemble des contenus publiés sur le site (textes, visuels, icônes, photographies) sont la propriété exclusive de ${PUBLISHER_IDENTITY.name} ou de ses concédants, et sont protégés par le droit marocain et international de la propriété intellectuelle.`,
                    "Toute reproduction, distribution, modification ou exploitation commerciale, même partielle, est interdite sans autorisation écrite préalable, hormis un usage strictement privé et non commercial.",
                ],
            },

            {
                id: 'cookies',
                icon: <Cookie className="w-4 h-4" />,
                title: 'Cookies',
                paragraphs: [
                    "Le site peut utiliser des cookies et technologies similaires afin de maintenir votre session active, mémoriser votre langue préférée et établir des statistiques de fréquentation. Vous pouvez configurer votre navigateur pour refuser les cookies.",
                ],
            },
            {
                id: 'liability',
                icon: <ShieldAlert className="w-4 h-4" />,
                title: 'Limitation de responsabilité',
                paragraphs: [
                    `${PUBLISHER_IDENTITY.name} met en œuvre des moyens raisonnables pour assurer l'exactitude et la disponibilité des informations publiées sur ce site, sans pouvoir garantir l'absence d'erreurs, d'omissions ou d'interruptions. L'utilisation du site relève de la seule responsabilité du visiteur.`,
                ],
            },

        ],
    },

    ar: {
        eyebrow: 'الإشعار القانوني',
        title: 'إشعار قانوني',
        lastUpdated: 'آخر تحديث: 1 يوليوز 2026',
        intro:
            'وفقاً للتشريع المغربي المتعلق بالتجارة الإلكترونية والنشر الرقمي، يحدد هذا الإشعار هوية ناشر موقع وتطبيق Nuqta POS، ومزود الاستضافة، وشروط استخدام الموقع.',
        tocLabel: 'في هذه الصفحة',
        printLabel: 'طباعة',
        copyLabel: 'نسخ الرابط',
        copiedLabel: 'تم النسخ',
        contactLabel: 'لديك سؤال حول هذا الإشعار؟',
        contactCta: 'تواصل معنا',
        sections: [
            {
                id: 'publisher',
                icon: <Building2 className="w-4 h-4" />,
                title: 'ناشر الموقع',
                paragraphs: [
                    `يتم نشر وتشغيل موقع وتطبيق Nuqta POS من طرف ${PUBLISHER_IDENTITY.name} SARL AU، شركة مسجلة بالمغرب.`,
                ],
                bullets: [
                    `المقر الاجتماعي: ${PUBLISHER_IDENTITY.address}`,
                    `الهاتف: ${PUBLISHER_IDENTITY.phone}`,
                    `البريد الإلكتروني: ${PUBLISHER_IDENTITY.email}`,

                ],

            },
            {
                id: 'publication-director',
                icon: <Building2 className="w-4 h-4" />,
                title: 'مدير النشر',
                paragraphs: [
                    `مدير النشر هو الممثل القانوني لشركة ${PUBLISHER_IDENTITY.name}. يمكن توجيه أي مراسلة تتعلق بمحتوى الموقع إلى ${PUBLISHER_IDENTITY.email}.`,
                ],
            },
            {
                id: 'hosting',
                icon: <Server className="w-4 h-4" />,
                title: 'الاستضافة',
                paragraphs: ['يتم استضافة الموقع والخدمات المرتبطة به من طرف مزود استضافة خارجي، تُذكر بياناته أدناه.'],
                bullets: ['مزود الاستضافة: Hostinger'],

            },
            {
                id: 'intellectual-property',
                icon: <Copyright className="w-4 h-4" />,
                title: 'الملكية الفكرية',
                paragraphs: [
                    `تُعتبر علامة Nuqta POS، وشعارها، وواجهتها، وشيفرتها المصدرية، وجميع المحتويات المنشورة على الموقع (نصوص، رسومات، أيقونات، صور) ملكية حصرية لشركة ${PUBLISHER_IDENTITY.name} أو للجهات المرخِّصة لها، وهي محمية بموجب القانون المغربي والدولي للملكية الفكرية.`,
                    'يُمنع أي استنساخ أو توزيع أو تعديل أو استغلال تجاري، ولو جزئي، دون إذن كتابي مسبق، باستثناء الاستعمال الشخصي غير التجاري.',
                ],
            },

            {
                id: 'cookies',
                icon: <Cookie className="w-4 h-4" />,
                title: 'ملفات تعريف الارتباط (Cookies)',
                paragraphs: [
                    'قد يستخدم الموقع ملفات تعريف الارتباط وتقنيات مشابهة للحفاظ على جلستك، وتذكر لغتك المفضلة، وقياس إحصائيات الزيارة الأساسية. يمكنك ضبط متصفحك لرفض هذه الملفات.',
                ],
            },
            {
                id: 'liability',
                icon: <ShieldAlert className="w-4 h-4" />,
                title: 'تحديد المسؤولية',
                paragraphs: [
                    `تبذل ${PUBLISHER_IDENTITY.name} جهوداً معقولة لضمان دقة وتوفر المعلومات المنشورة على هذا الموقع، دون أن تضمن خلوها من الأخطاء أو الانقطاعات. يتحمل الزائر وحده مسؤولية استخدامه للموقع.`,
                ],
            },

        ],
    },
};

/* ------------------------------------------------------------------ */
/*  Small presentational helpers                                       */
/* ------------------------------------------------------------------ */
function NoteBox({ note }: { note: LegalNote }) {
    const styles: Record<LegalNote['type'], string> = {
        info: 'bg-[var(--accent-light)] border-[var(--accent)]/20 text-[var(--text-secondary)]',
        warning: 'bg-amber-50 border-amber-200 text-amber-900',
        todo: 'bg-amber-50 border-amber-300 text-amber-900',
    };
    return (
        <div className={`flex items-start gap-2.5 rounded-xl border p-3.5 mt-3 ${styles[note.type]}`}>
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
            <p className="text-[11px] font-semibold leading-relaxed">{note.text}</p>
        </div>
    );
}

function IdentityCard({ lang }: { lang: Language }) {
    const label =
        lang === 'en' ? 'Operating entity' : lang === 'fr' ? "Société d'exploitation" : 'الجهة المشغلة';
    return (
        <div className="mt-8 bg-white rounded-2xl border border-[var(--border)] p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2 flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold tracking-wider text-[var(--text-muted)]">
                    {label}
                </span>
                <span className="font-extrabold text-sm text-[var(--text-primary)]">{PUBLISHER_IDENTITY.name}</span>
            </div>
            <div className="flex items-start gap-2.5 text-xs text-[var(--text-secondary)] font-semibold">
                <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-[var(--accent)]" />
                <span>{PUBLISHER_IDENTITY.address}</span>
            </div>
            <div className="flex flex-col gap-2">
                <a
                    href={`tel:${PUBLISHER_IDENTITY.phoneHref}`}
                    className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] font-semibold hover:text-[var(--accent)]"
                >
                    <Phone className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
                    <span dir="ltr">{PUBLISHER_IDENTITY.phone}</span>
                </a>
                <a
                    href={`mailto:${PUBLISHER_IDENTITY.email}`}
                    className="flex items-center gap-2.5 text-xs text-[var(--text-secondary)] font-semibold hover:text-[var(--accent)]"
                >
                    <Mail className="w-3.5 h-3.5 shrink-0 text-[var(--accent)]" />
                    {PUBLISHER_IDENTITY.email}
                </a>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */
interface LegalProps {
    lang: Language;
    onPageChange: (page: string) => void;
}

export default function Legal({ lang, onPageChange }: LegalProps) {
    const content: LegalPageContent = CONTENT[lang];
    const isRtl = lang === 'ar';
    const [activeId, setActiveId] = useState<string>(content.sections[0]?.id ?? '');
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-15% 0px -70% 0px', threshold: 0 }
        );

        return () => observer.disconnect();
    }, [content]);

    const activeIndex = content.sections.findIndex((s) => s.id === activeId);
    const progressPct =
        content.sections.length > 1 ? Math.max(0, activeIndex) / (content.sections.length - 1) : 0;

    const scrollToSection = (id: string) => {
        const el = sectionRefs.current[id];
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 96;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    const copyLink = (id: string) => {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        navigator.clipboard?.writeText(url).catch(() => { });
        setCopiedId(id);
        window.setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1800);
    };

    return (
        <div dir={isRtl ? 'rtl' : 'ltr'} className="pb-24">
            {/* Hero */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 pt-16">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <span className="text-[10px] uppercase font-extrabold tracking-wider text-[var(--accent)] bg-[var(--accent-light)] px-2.5 py-1 rounded-full">
                        {content.eyebrow}
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.1] mt-4">
                    {content.title}
                </h1>

                <div className="flex items-center gap-2 mt-3 text-[11px] font-mono font-bold text-[var(--text-muted)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    {content.lastUpdated}
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-5 max-w-2xl">
                    {content.intro}
                </p>

                <IdentityCard lang={lang} />
            </section>

            {/* Body: sticky TOC + sections */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 lg:gap-14 items-start">
                    {/* TOC (desktop sidebar) */}
                    <nav className="hidden md:block sticky top-24 self-start">
                        <p className="text-[10px] uppercase font-extrabold tracking-wider text-[var(--text-muted)] mb-3">
                            {content.tocLabel}
                        </p>
                        <div className="relative pl-4">
                            <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border)]" />
                            <div
                                className="absolute left-0 top-0 w-px bg-[var(--accent)] transition-all duration-300"
                                style={{ height: `${progressPct * 100}%` }}
                            />
                            <ul className="space-y-3">
                                {content.sections.map((s) => (
                                    <li key={s.id}>
                                        <button
                                            onClick={() => scrollToSection(s.id)}
                                            className={`text-left text-xs font-semibold leading-snug transition-colors cursor-pointer ${activeId === s.id
                                                ? 'text-[var(--accent)]'
                                                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                                }`}
                                        >
                                            {s.title}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>

                    {/* TOC (mobile chip row) */}
                    <div className="md:hidden -mx-4 px-4 mb-2 overflow-x-auto">
                        <div className="flex gap-2 w-max pb-1">
                            {content.sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => scrollToSection(s.id)}
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

                    {/* Sections */}
                    <div className="space-y-6 min-w-0">
                        {content.sections.map((s, idx) => (
                            <article
                                key={s.id}
                                id={s.id}
                                ref={(el) => {
                                    sectionRefs.current[s.id] = el;
                                }}
                                className="scroll-mt-24 bg-white rounded-2xl border border-[var(--border)] p-6 sm:p-8"
                            >
                                <div className="flex items-start justify-between gap-3 mb-4">
                                    <div className="flex items-center gap-3">
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
                                    <button
                                        onClick={() => copyLink(s.id)}
                                        className="shrink-0 p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--accent)] hover:bg-[var(--accent-light)] transition-colors cursor-pointer print:hidden"
                                        aria-label={content.copyLabel}
                                        title={copiedId === s.id ? content.copiedLabel : content.copyLabel}
                                    >
                                        {copiedId === s.id ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
                                    </button>
                                </div>

                                <div className="space-y-3 text-xs text-[var(--text-secondary)] leading-relaxed font-medium">
                                    {s.paragraphs?.map((p, i) => (
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

                                    {s.subsections?.map((sub, i) => (
                                        <div key={i} className="pt-3 border-t border-[var(--border)]">
                                            <h3 className="font-bold text-[var(--text-primary)] text-xs mb-2">{sub.title}</h3>
                                            {sub.paragraphs?.map((p, j) => (
                                                <p key={j} className="mb-2">
                                                    {p}
                                                </p>
                                            ))}
                                            {sub.bullets && (
                                                <ul className="space-y-2">
                                                    {sub.bullets.map((b, j) => (
                                                        <li key={j} className="flex items-start gap-2.5">
                                                            <span className="w-1 h-1 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                                                            <span>{b}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    ))}

                                    {s.note && <NoteBox note={s.note} />}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact strip */}
            <section className="max-w-5xl mx-auto px-4 sm:px-6 mt-10 print:hidden">
                <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-[var(--accent-light)] text-[var(--accent)]">
                            <Mail className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="font-extrabold text-sm text-[var(--text-primary)]">{content.contactLabel}</p>
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
                        {content.contactCta}
                    </button>
                </div>
            </section>
        </div>
    );
}