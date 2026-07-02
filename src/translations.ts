import { Language } from './types';

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    dir: 'ltr',
    navHome: 'Home',
    navFeatures: 'Features',
    navPricing: 'Pricing',
    navBusiness: 'Business Types',
    navIntegrations: 'Integrations',
    navContact: 'Contact Us',
    navAdmin: 'Admin Portal',
    navLogin: 'Log in',
    navStartFree: 'Free Demo',

    // Hero
    heroEyebrow: 'The POS built for modern retail',
    heroTitle: 'Sell more. Stress less. Grow faster.',
    heroSubtitle: 'Nuqta POS handles checkout, inventory, staff, and real-time analytics — so you can focus on building your kingdom and servicing your customers.',
    heroStartFreeCTA: 'Get Started Free',
    heroSeeDemoCTA: 'See a Demo →',

    // Trust
    trustTitle: 'Trusted by 12,000+ merchants across 40+ countries',
    trustMerchants: '12,000+ Merchants',
    trustProcessed: '35B MAD Processed',
    trustUptime: '99.98% Uptime',
    trustCountries: '40+ Countries',
    trustRating: '4.9★ Rating',

    // Quick Features
    featuresHeading: 'Everything in one place.',
    fastCheckoutTitle: '⚡ Fast Checkout',
    fastCheckoutDesc: 'Accept any payment method (Credit card, cash, contactless, NFC or local QR codes) in under 3 seconds. Smooth and fluid queue management.',
    inventoryTitle: '📦 Smart Inventory',
    inventoryDesc: 'Auto-track inventory levels, configure multi-variant items, receive low-stock alerts, and auto-generate purchase orders.',
    analyticsTitle: '📊 Real-Time Analytics',
    analyticsDesc: 'Know exactly what is selling, who sold it, and when. Dynamic reporting makes store management intuitive, even offsite.',

    // Interactive Demo
    demoHeading: 'Sleek Register Simulator',
    demoSubheading: 'An elegant, high-fidelity simulation of Nuqta register & real-time analytics. Experience our minimalist design interface first-hand.',
    demoTabPOS: 'POS Terminal',
    demoTabAnalytics: 'Analytics Dashboard',
    demoTabInvoice: 'Invoices & PDF',

    // POS Demo specific
    posProducts: 'Menu Catalogue',
    posCart: 'New Order Receipts',
    posSubtotal: 'Subtotal',
    posTax: 'VAT (20%)',
    posTotal: 'Total MAD',
    posCharge: 'Complete Transaction',
    posReset: 'Reset',
    posEmpty: 'Your order ticket is empty.',
    posComplete: 'Transaction completed successfully ✓',

    // Analytics Demo specific
    analyticsTodayRev: "Today's Revenue",
    analyticsTarget: "Weekly Target Progress",
    analyticsOrdersCount: 'Total Transactions',
    analyticsTopSelling: 'Top Margin Products',
    analyticsActiveStaff: 'Active Operators',

    // Invoice Demo specific
    invoiceTitle: 'Document Portal (Facture / Devis)',
    invoiceDesc: 'Generate and review certified invoices and estimates with localized compliance standards.',
    invoiceSender: 'Nuqta Retail Store S.A.R.L.',
    invoiceClient: 'Bill To:',
    invoiceClientName: 'Amine El Idrissi',
    invoiceClientAddress: 'Boulevard Anfa, Casablanca',
    invoiceNumber: 'Invoice #NQ-2026-904',
    invoiceDate: 'Date: June 24, 2026',
    invoiceType: 'Document Type',
    invoiceTypeInvoice: 'Facture (Invoice)',
    invoiceTypeQuote: 'Devis (Quotation)',
    invoiceGenerate: 'Generate & Print PDF',
    invoiceSuccess: 'Certified document created successfully with cryptographic QR validation ✓',

    // Pricing
    pricingTitle: 'Honest pricing. No surprises.',
    pricingSubtitle: 'Simple billing in MAD tailor-made for merchants of all scales. No commitment, cancel anytime.',
    monthly: 'Monthly',
    annual: 'Annual',
    save20: 'Save 20%',
    popularLabel: 'Most Popular',
    pricingStarterName: 'Nuqta Starter',
    pricingGrowthName: 'Nuqta Growth',
    pricingEnterpriseName: 'Nuqta Enterprise',
    pricingStarterDesc: 'Ideal for small retail stands, coffee stands, or pop-up stores.',
    pricingGrowthDesc: 'The ultimate tool for growing boutiques, busy cafés, and dynamic multi-staff retailers.',
    pricingEnterpriseDesc: 'Custom-fit solutions for enterprise franchises, department stores, and multi-location groups.',
    pricingStarterPrice: '290 MAD',
    pricingGrowthPrice: '790 MAD',
    pricingEnterprisePrice: 'Custom',
    perMonth: '/mo',
    featuresIncluded: 'Key Features:',
    contactSales: 'Contact Sales',
    selectPlan: 'Choose Plan',

    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Got questions? We have clear answers. Reach out if you need more details.',

    // Business Types
    businessTitle: 'Made for your kind of business.',
    businessSubtitle: 'Nuqta POS adapts to how you sell — not the other way around. Select your vertical below.',
    businessCafesTitle: 'Cafés & Coffee Shops',
    businessCafesDesc: 'Quick-fire order entries, modifier add-ons (size, milk, shots), table/tab management, and custom barista order displays.',
    businessBoutiquesTitle: 'Boutiques & Fashion',
    businessBoutiquesDesc: 'Complete variant controls (size, color, material), fitting-room reservations, seasonal stock imports, and barcode printing.',
    businessRestaurantsTitle: 'Restaurants & QSRs',
    businessRestaurantsDesc: 'Full floor layouts, table status, kitchen display screens, custom course splitting, and instant split-bill options for clients.',
    businessBeautyTitle: 'Beauty & Salons',
    businessBeautyDesc: 'Schedule-linked cashier checkouts, stylist commission sheets, tip presets, and physical product inventory management.',
    businessGymsTitle: 'Gyms & Fitness Centers',
    businessGymsDesc: 'Membership registration, day-pass QR sales, check-in validation, sports supplement retail trackers, and waiver uploads.',
    businessGroceryTitle: 'Grocery & Convenience',
    businessGroceryDesc: 'High-speed barcode scanning, weight-scale integration, buy-1-get-1 updates, and age-restrictions compliance checks.',
    // Business Types - Bullets
    businessBulletsCafes: [
      'Quick ticket modifier options (sugar, iced, extra milk)',
      'Smart multi-table seating map tracking',
      'Raw barista ticket printing kitchen displays'
    ],
    businessBulletsBoutiques: [
      'Matrix product variants setup (size, color, material)',
      'Reserve items and fitting-room holdings',
      'Instantaneous barcode generation & barcode tag printing'
    ],
    businessBulletsRestaurants: [
      'Full diningroom table status tracking',
      'Sub-second invoice splitting & bill divides',
      'Kitchen Display System (KDS) router'
    ],
    businessBulletsBeauty: [
      'Cashier checks tied directly inside your calendar',
      'Stylist and therapist commission trackers',
      'Tip presets configured inside card readers'
    ],
    businessBulletsGyms: [
      'Membership subscriptions barcode scans',
      'Day-pass QR generator with email receipt options',
      'Supplement retail tracker tied inside POS'
    ],
    businessBulletsGrocery: [
      'High-speed barcode checkout connections',
      'Digital scale integration for weight-based pricing',
      'Automated proximity DLC expiry alerts'
    ],

    // Business Types - Testimonials section
    businessStoriesEyebrow: 'Sector Success Stories',
    businessStoriesTitle: 'Loved by every trade',
    businessStoriesSubtitle: 'Click any tab to read live reviews from store owners.',

    // Business Types - Plan cards
    businessPlanSingleBadge: 'Single Store',
    businessPlanSingleTitle: 'Just starting out?',
    businessPlanSingleDesc: 'Ideal for smaller stands or independent merchants. Handle sales velocity, collect cards, and maintain inventory list from any device.',
    businessPlanSingleF1: 'Starter Plan features included',
    businessPlanSingleF2: 'Free 14-day fully-featured trial',
    businessPlanSingleCTA: 'Get Started Free',

    businessPlanMultiBadge: 'Multi-Location',
    businessPlanMultiTitle: 'Running multiple locations?',
    businessPlanMultiDesc: 'Scale your trade with API pipelines, warehouse transfers, regional performance heatmaps, and a dedicated account manager.',
    businessPlanMultiF1: 'Custom SLA onboarding packages',
    businessPlanMultiF2: 'Live SQL / inventory warehouse replication',
    businessPlanMultiCTA: 'Talk to Sales',

    // Business Types - Bottom CTA
    businessCtaTitle: 'Ready to upgrade your checkout terminal?',
    businessCtaDesc: 'Regardless of your trade, Nuqta POS provides a fluid, robust point of sale system with excellent reliability.',

    // Features Deep (Real translations of the 8 advanced core modules)
    featDeepTitle: 'Fully Integrated POS Modules',
    featDeepSubtitle: 'Ditch the spreadsheets. Nuqta integrates every essential tool for Moroccan retail, wholesale, and services under one highly polished European UI.',

    // 1. POS System & Sales Management
    featPosSystemTitle: 'POS & Sales Management',
    featPosSystemDesc: 'High-speed retail & wholesale checkout designed to maximize throughput and eliminate operator errors.',
    featPosSystemB1: 'Lightning fast sub-3s ticket checkouts with barcode scanner native links',
    featPosSystemB2: 'Robust Offline local cache database - keep making sales even with 0G internet',
    featPosSystemB3: 'Multi-payment support: cash, credit cards, local e-wallets, or split bills',
    featPosSystemB4: 'Tailored digital receipts automatically dispatched via WhatsApp & email',

    // 2. Credits Clients Management
    featCreditsTitle: 'Credits Clients Management',
    featCreditsDesc: 'Take back control of customer debts (Carnet de Crédit / Amana) and protect your cash flow.',
    featCreditsB1: 'Dynamic customer credit account ledger mapped directly inside the register',
    featCreditsB2: 'Configurable debt ceilings and automatic blockages on critical balances',
    featCreditsB3: 'Partial installments tracking with digital receipts printed for each payment',
    featCreditsB4: 'One-click automated WhatsApp payment reminders with custom payment link',

    // 3. Facture, Devis, Charges & Bon de livraison
    featInvoicingTitle: 'Factures, Devis, Charges & BL',
    featInvoicingDesc: 'A complete accounting ecosystem to issue compliant commercial documents on the spot.',
    featInvoicingB1: 'Certified commercial invoices (Factures) with automated tax calculations',
    featInvoicingB2: 'Professional quotations (Devis) converted to active sales tickets in one tap',
    featInvoicingB3: 'Delivery notes (Bons de Livraison) mapped cleanly to match physical consignments',
    featInvoicingB4: 'Comprehensive corporate expenses logging (Charges) to monitor net profitability',

    // 4. Daily detailed reports & Advanced analytics
    featReportsTitle: 'Daily Reports & Advanced Analytics',
    featReportsDesc: 'Deep financial visualization to optimize your profit margin and track retail velocity.',
    featReportsB1: 'Highly detailed end-of-day reports (Z-reports) with shift cash balances',
    featReportsB2: 'Granular hourly heatmap highlighting store crowd peaks to manage staffing',
    featReportsB3: 'A-grade margins analysis tracking SKU contribution against cost of goods (COGS)',
    featReportsB4: 'Dynamic analytics graphs showing historical growth trends across multiple branches',

    // 5. Double Ticket Management
    featTicketsTitle: 'Dual-Route Ticket Control',
    featTicketsDesc: 'Intelligent routing of order tickets to maximize operational speed and service accuracy.',
    featTicketsB1: 'Automatic split routing: Barista orders to coffee bar, food to the kitchen',
    featTicketsB2: 'Double ticket printing options for physical customer tag and kitchen rail prep',
    featTicketsB3: 'Live order queue screen for both operators and customers',
    featTicketsB4: 'Complete order ticket state tracker (Received, In-Prep, Dispatched)',

    // 6. Advanced Inventory Control
    featStockTitle: 'Advanced Stock Control',
    featStockDesc: 'Real-time multi-warehouse inventory engine to eliminate stockouts and minimize shrinkage.',
    featStockB1: 'Multi-variant matrix control (manage products by sizes, colors, and materials)',
    featStockB2: 'Composite recipe mapping (e.g. tracking flour, sugar, and milk per croissant sold)',
    featStockB3: 'Automated replenishment thresholds with low-stock SMS & email alerts',
    featStockB4: 'Mass stock catalog imports and updates in seconds using standard spreadsheets',

    // 7. Suppliers Directory
    featSuppliersTitle: 'Suppliers Management',
    featSuppliersDesc: 'Maintain detailed records of wholesale manufacturers and manage procurement cycles.',
    featSuppliersB1: 'Consolidated suppliers index with direct WhatsApp contact and address entries',
    featSuppliersB2: 'Price matrix tracking to monitor procurement inflation over time',
    featSuppliersB3: 'Outstanding supplier balances ledger with historical invoice attachments',
    featSuppliersB4: 'Supplier compliance metrics tracking past delivery delay incidents',

    // 8. PDF Bon de commande generator
    featPdfTitle: 'PDF Bon de Commande Generator',
    featPdfDesc: 'Generate and sign official purchase orders on-site to secure wholesale replenishment.',
    featPdfB1: 'Instant professional "Bon de Commande" documents generated in PDF format',
    featPdfB2: 'Nuqta cryptographic validation QR automatically printed on each document',
    featPdfB3: 'Built-in interactive signing pad to sign purchase orders directly on-screen',
    featPdfB4: 'Automated secure email dispatch of signed PDF orders to wholesale suppliers',

    // Integrations
    intTitle: 'Plug in. Power up.',
    intSubtitle: 'Connect Nuqta POS with the critical accounting, marketing, and delivery tools you already run on.',
    intApiLeftTitle: 'Build your own custom solution',
    intApiLeftDesc: 'Leverage our developer API to connect ERPs, specialized logistics, or customized warehouse management tools.',
    intApiLeftB1: 'Fully certified REST endpoints with JWT authorization',
    intApiLeftB2: 'Webhooks for real-time order and payment Web socket streaming',
    intApiLeftB3: 'Production-ready sandbox for easy local testing',
    viewApiDocs: 'View API Reference →',

    // Contact & CRM
    contactTitle: 'Scale Your Business With Nuqta',
    contactSubtitle: 'Request a customized quote or schedule a site visit by our retail engineers in Morocco.',
    contactFieldName: 'Name',
    contactFieldEmail: 'Email',
    contactFieldPhone: 'Phone Number',
    contactFieldBusiness: 'Business Sector',
    contactFieldSize: 'Number of Outlets',
    contactFieldMessage: 'Tell us about your project',
    contactSubmit: 'Submit Request',
    contactSucessTitle: 'Thank you!',
    contactSuccessDesc: 'Your request has been received. Our sales engineer will contact you in under 1 hour.',

    // Common
    footerProduct: 'Product',
    footerCompany: 'Company',
    footerSupport: 'Support',
    footerLegal: 'Legal',
    footerDescription: 'The merchant-first sales terminal and digital ledger built to scale retailers, premium cafes, boutiques, and multi-location franchises. Engineered for high reliability in Morocco and globally.',
    footerFeaturesLink: 'Features Overview',
    footerPricingLink: 'MAD Pricing Plans',
    footerBusinessLink: 'Business Solutions',
    footerAbout: 'About Us',
    footerBlog: 'Commercial Blog',
    footerHelp: 'Help Center',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms & Conditions',
    footerLegalNotice: 'Legal Notice',
    footerRights: '© 2026 Nuqta POS. All rights reserved. Engineered to international quality standards.',
    footerPoweredBy: 'Engineered & Designed by',
    footerPoweredByCredit: 'POWERED BY GB DIGITAL SOLUTIONS',
  },
  fr: {
    dir: 'ltr',
    navHome: 'Accueil',
    navFeatures: 'Fonctionnalités',
    navPricing: 'Tarifs',
    navBusiness: 'Secteurs d’Activité',
    navIntegrations: 'Intégrations',
    navContact: 'Contactez-nous',
    navAdmin: 'Portail Admin',
    navLogin: 'Connexion',
    navStartFree: 'Démo Gratuite',

    // Hero
    heroEyebrow: 'Le POS conçu pour le commerce moderne',
    heroTitle: 'Vendez plus. Stresser moins. Grandissez.',
    heroSubtitle: 'Nuqta POS gère l’encaissement, les stocks, l’équipe et la comptabilité en temps réel — pour que vous puissiez vous concentrer sur vos clients.',
    heroStartFreeCTA: 'Commencer Gratuitement',
    heroSeeDemoCTA: 'Voir Démo →',

    // Trust
    trustTitle: 'Adopté par plus de 12 000 commerçants dans 40 pays',
    trustMerchants: '12 000+ Commerçants',
    trustProcessed: '35 Md MAD Traités',
    trustUptime: 'Disponibilité 99.98%',
    trustCountries: '40+ Pays',
    trustRating: 'Note 4.9★',

    // Quick Features
    featuresHeading: 'Tout dans une seule plateforme.',
    fastCheckoutTitle: '⚡ Enregistrement Ultra Rapide',
    fastCheckoutDesc: 'Acceptez les cartes, l’espèce, le sans-contact NFC ou les QR Codes locaux en moins de 3 secondes. Fluide et sans attente.',
    inventoryTitle: '📦 Stocks Intelligents',
    inventoryDesc: 'Suivi automatique des produits, saisie des tailles/couleurs, alertes de rupture, et automatisation des commandes fournisseurs.',
    analyticsTitle: '📊 Rapports en Temps Réel',
    analyticsDesc: 'Savoir exactement ce qui se vend, qui vend et quand. Des analyses claires accessibles sur votre smartphone n’importe où.',

    // Interactive Demo
    demoHeading: 'Simulateur de Caisse Épuré',
    demoSubheading: 'Une démonstration fluide et fidèle de la caisse Nuqta et de son dashboard analytique. Faites l’expérience d’un design à l’ergonomie européenne.',
    demoTabPOS: 'Terminal Caisse',
    demoTabAnalytics: 'Tableau de Bord',
    demoTabInvoice: 'Factures & PDF',

    // POS Demo specific
    posProducts: 'Catalogue Produits',
    posCart: 'Ticket en Cours',
    posSubtotal: 'Sous-total',
    posTax: 'TVA (20%)',
    posTotal: 'Total MAD',
    posCharge: 'Encaisser la Vente',
    posReset: 'Vider',
    posEmpty: 'Votre ticket de commande est vide.',
    posComplete: 'Vente enregistrée avec succès ✓',

    // Analytics Demo specific
    analyticsTodayRev: "Chiffre d’Affaires du Jour",
    analyticsTarget: "Objectif Hebdomadaire",
    analyticsOrdersCount: 'Total Transactions',
    analyticsTopSelling: 'Meilleures Marges',
    analyticsActiveStaff: 'Opérateurs Actifs',

    // Invoice Demo specific
    invoiceTitle: 'Portail Documentaire (Factures / Devis)',
    invoiceDesc: 'Générez des pièces comptables certifiées conformes aux exigences d’exercice au Maroc.',
    invoiceSender: 'Nuqta Retail Morocco S.A.R.L.',
    invoiceClient: 'Facturer à:',
    invoiceClientName: 'Yassir El Alami',
    invoiceClientAddress: 'Gauthier, Casablanca',
    invoiceNumber: 'Facture #NQ-2026-817',
    invoiceDate: 'Date: 24 Juin 2026',
    invoiceType: 'Type de Document',
    invoiceTypeInvoice: 'Facture (Invoice)',
    invoiceTypeQuote: 'Devis (Quotation)',
    invoiceGenerate: 'Générer & Imprimer',
    invoiceSuccess: 'Pièce comptable émise avec succès et validée par QR code sécurisé ✓',

    // Pricing
    pricingTitle: 'Des tarifs honnêtes. Zéro surprise.',
    pricingSubtitle: 'Abonnements transparents en Dirham Marocain (MAD) adaptés à votre boutique. Résiliable en un clic.',
    monthly: 'Mensuel',
    annual: 'Annuel',
    save20: 'Économisez 20%',
    popularLabel: 'Le Plus Populaire',
    pricingStarterName: 'Nuqta Starter',
    pricingGrowthName: 'Nuqta Growth',
    pricingEnterpriseName: 'Nuqta Enterprise',
    pricingStarterDesc: 'Parfait pour les petits kiosques, cafés éphémères ou commerçants indépendants.',
    pricingGrowthDesc: 'Idéal pour les boutiques de mode, restaurants animés et équipes dynamiques.',
    pricingEnterpriseDesc: 'Pour les franchises multi-boutiques, centres de distribution et réseaux régionaux.',
    pricingStarterPrice: '290 MAD',
    pricingGrowthPrice: '790 MAD',
    pricingEnterprisePrice: 'Sur Mesure',
    perMonth: '/mois',
    featuresIncluded: 'Fonctionnalités Incluses :',
    contactSales: 'Contacter Commercial',
    selectPlan: 'Choisir ce Plan',

    // FAQ
    faqTitle: 'Foire Aux Questions',
    faqSubtitle: 'Des réponses claires à vos interrogations fréquentes. Besoin de plus ? Écrivez-nous.',

    // Business Types
    businessTitle: 'Conçu pour votre métier.',
    businessSubtitle: 'Nuqta s’adapte à vos processus commerciaux. Cliquez sur votre activité pour voir comment :',
    businessCafesTitle: 'Cafés & Salons de thé',
    businessCafesDesc: 'Prises de commande ultra-rapides, suppléments (lait d’avoine, taille), plans de table en salle, et affichage barista en cuisine.',
    businessBoutiquesTitle: 'Boutiques & Mode',
    businessBoutiquesDesc: 'Matrice de variantes (taille, couleur, matière), gestion des essayages cabine, impressions de codes-barres et suivi de saison.',
    businessRestaurantsTitle: 'Restaurants & Restauration Rapide',
    businessRestaurantsDesc: 'Envoi direct des commandes en cuisine, séparation automatique des entrées/plats, division intuitive d’additions et gestion de caisse.',
    businessBeautyTitle: 'Salons de Beauté & Spas',
    businessBeautyDesc: 'Paiements directement reliés à votre calendrier de réservations, commissions des collaborateurs, et vente de cosmétiques.',
    businessGymsTitle: 'Clubs de Sport & Fitness',
    businessGymsDesc: 'Vente d’abonnements, laissez-passer journaliers QR, contrôle d’accès, gestion de bar à protéines intégrée.',
    businessGroceryTitle: 'Supermarchés & Épiceries',
    businessGroceryDesc: 'Lecture scanner de codes-barres rapide, intégration de balances à pesée, gestion de lot DLC de proximité et cartes de fidélité.',
    // Business Types - Bullets
    businessBulletsCafes: [
      'Sélection rapide d\'options (sucre, glacé, lait végétal)',
      'Suivi dynamique des additions par table',
      'Transfert instantané de tickets sur écran de préparation'
    ],
    businessBulletsBoutiques: [
      'Déclinaisons complètes par taille, coloris et tissu',
      'Mise de côté et réservation d\'articles cabines',
      'Génération et édition directe d\'étiquettes de caisse'
    ],
    businessBulletsRestaurants: [
      'Suivi visuel des plats servis en salle',
      'Division de factures intuitive pour groupes',
      'Routage automatique vers les imprimantes de frites et grillades'
    ],
    businessBulletsBeauty: [
      'Encaissement synchronisé avec vos réservations',
      'Suivi des pourboires et commissions collaborateurs',
      'Préréglages de gratifications intégrés au lecteur CMI'
    ],
    businessBulletsGyms: [
      'Scan et contrôle d\'accès de cartes abonnés',
      'Vente de pass d\'accès QR instantanés',
      'Suivi d\'inventaire du bar à protéines et boissons'
    ],
    businessBulletsGrocery: [
      'Lecture et encaissement en rafale des articles',
      'Calcul automatique basé sur le poids (balances reliées)',
      'Alertes intelligentes de péremption de produits'
    ],

    // Business Types - Testimonials section
    businessStoriesEyebrow: 'Témoignages par Secteur',
    businessStoriesTitle: 'Adopté par tous les métiers',
    businessStoriesSubtitle: 'Cliquez sur un onglet pour lire les avis en direct de nos commerçants.',

    // Business Types - Plan cards
    businessPlanSingleBadge: 'Boutique Unique',
    businessPlanSingleTitle: 'Vous démarrez votre activité ?',
    businessPlanSingleDesc: 'Idéal pour les petits stands ou commerçants indépendants. Gérez vos ventes, encaissez les cartes et suivez votre inventaire depuis n\'importe quel appareil.',
    businessPlanSingleF1: 'Fonctionnalités du Plan Starter incluses',
    businessPlanSingleF2: 'Essai gratuit de 14 jours sans restriction',
    businessPlanSingleCTA: 'Commencer Gratuitement',

    businessPlanMultiBadge: 'Multi-Établissements',
    businessPlanMultiTitle: 'Vous gérez plusieurs points de vente ?',
    businessPlanMultiDesc: 'Développez votre activité avec des flux API, des transferts d\'entrepôt, des cartes thermiques de performance régionale et un gestionnaire de compte dédié.',
    businessPlanMultiF1: 'Forfaits d\'intégration sur mesure (SLA)',
    businessPlanMultiF2: 'Réplication en direct de l\'entrepôt SQL / inventaire',
    businessPlanMultiCTA: 'Contacter les Ventes',

    // Business Types - Bottom CTA
    businessCtaTitle: 'Prêt à moderniser votre caisse ?',
    businessCtaDesc: 'Quel que soit votre secteur, Nuqta POS offre un système de point de vente fluide, robuste et d\'une fiabilité exceptionnelle.',

    // Features Deep (Real translations of the 8 advanced core modules)
    featDeepTitle: 'Modules POS Ultra-Avancés',
    featDeepSubtitle: 'Oubliez les fichiers Excel obsolètes. Nuqta centralise l’intégralité de vos opérations de vente, de stock et de comptabilité sous une interface fluide.',

    // 1. POS System & Sales Management
    featPosSystemTitle: 'Caisse & Gestion des Ventes',
    featPosSystemDesc: 'Enregistrement à haute vitesse conçu pour dynamiser vos flux de clients et éliminer les erreurs humaines.',
    featPosSystemB1: 'Validation de ticket en moins de 3s avec raccordement douchette codes-barres',
    featPosSystemB2: 'Mode Hors-ligne fiable : continuez vos encaissements même sans réseau',
    featPosSystemB3: 'Multi-règlements fluides : espèces, cartes bancaires (CMI), sans contact ou notes partagées',
    featPosSystemB4: 'Reçus numériques soignés expédiés instantanément par WhatsApp & email',

    // 2. Credits Clients Management
    featCreditsTitle: 'Gestion des Crédits Clients',
    featCreditsDesc: 'Gardez un œil strict sur le carnet d’arriérés de vos clients fidèles (Carnet de Crédit / Amana).',
    featCreditsB1: 'Livre de comptes rattaché à chaque fiche client directement dans l’interface de caisse',
    featCreditsB2: 'Plafonds de crédit paramétrables et blocage des ventes au-delà du seuil critique',
    featCreditsB3: 'Suivi rigoureux des remboursements par acomptes avec reçu détaillé à chaque paiement',
    featCreditsB4: 'Relance automatique sur WhatsApp en un clic avec lien de règlement personnalisé',

    // 3. Facture, Devis, Charges & Bon de livraison
    featInvoicingTitle: 'Factures, Devis, Charges & BL',
    featInvoicingDesc: 'Un écosystème commercial global pour éditer instantanément vos pièces officielles.',
    featInvoicingB1: 'Émission de Factures commerciales normées avec calcul automatique des taxes',
    featInvoicingB2: 'Génération de Devis professionnels convertibles en vente en un seul clic',
    featInvoicingB3: 'Bons de livraison (BL) chaînés directement aux flux de chargement physique',
    featInvoicingB4: 'Saisie intégrée des Charges courantes (salaires, loyers, achats) pour connaître votre marge nette',

    // 4. Daily detailed reports & Advanced analytics
    featReportsTitle: 'Rapports Journaliers & Analyses',
    featReportsDesc: 'Clarifiez votre rentabilité financière et identifiez vos pics d’activité sans effort.',
    featReportsB1: 'Rapports de clôture journaliers (rapports Z) détaillés avec balance des tiroirs de caisse',
    featReportsB2: 'Carte thermique des ventes heure par heure pour ajuster le planning de vos équipes',
    featReportsB3: 'Analyse fine des marges par produit (SKU) croisée avec les coûts d’achat',
    featReportsB4: 'Graphiques interactifs de croissance consolidant les performances de tous vos magasins',

    // 5. Double Ticket Management
    featTicketsTitle: 'Gestion de Tickets Double Flux',
    featTicketsDesc: 'Aiguillage intelligent des commandes pour garantir un service rapide et sans confusion.',
    featTicketsB1: 'Séparation automatique des flux : boissons au bar barista, plats chauds en cuisine',
    featTicketsB2: 'Impression en double ticket : ticket d’attente client et bon de préparation rail cuisine',
    featTicketsB3: 'Affichage des files de préparation en direct pour les clients et préparateurs',
    featTicketsB4: 'Suivi d’état en temps réel de chaque ticket (Reçu, En préparation, Prêt)',

    // 6. Advanced Inventory Control
    featStockTitle: 'Gestion de Stock Avancée',
    featStockDesc: 'Suivi de vos entrepôts et approvisionnements en temps réel pour éradiquer les ruptures.',
    featStockB1: 'Matrice de produits multi-variantes (gestion par tailles, coloris et matières)',
    featStockB2: 'Fiches de composition de recettes (ex: décompte de farine, beurre et lait par croissant vendu)',
    featStockB3: 'Seuils d’alerte automatique de stock faible avec alertes par SMS et réassort suggéré',
    featStockB4: 'Importation et mise à jour massive de milliers de sifflets de stock via de simples fichiers Excel',

    // 7. Suppliers Directory
    featSuppliersTitle: 'Gestion des Merveilleux Masse Méta',
    featSuppliersDesc: 'Gérez vos relations de gros et sécurisez vos approvisionnements de manière professionnelle.',
    featSuppliersB1: 'Répertoire centralisé des fournisseurs avec contact WhatsApp direct et adresses physiques',
    featSuppliersB2: 'Suivi historique de l’inflation des prix d’achat chez vos grossistes',
    featSuppliersB3: 'État des soldes d’arriérés de paiement fournisseurs rattachés aux factures d’achat',
    featSuppliersB4: 'Évaluation de la fiabilité et du respect des délais de livraison des grossistes',

    // 8. PDF Bon de commande generator
    featPdfTitle: 'Générateur de PDF de Bons de Commande',
    featPdfDesc: 'Créez et signez sur le pouce des pièces de réapprovisionnement à envoyer à vos fournisseurs.',
    featPdfB1: 'Émission immédiate de Bons de Commande professionnels exportables au format PDF',
    featPdfB2: 'Intégration d’un QR code de certification Nuqta pour sécuriser le document',
    featPdfB3: 'Pavé de signature tactile intégré pour signer directement sur votre écran ou tablette',
    featPdfB4: 'Envoi automatisé du document PDF signé par courriel direct à votre fournisseur',

    // Integrations
    intTitle: 'Connectez. Amplifiez.',
    intSubtitle: 'Associez Nuqta POS aux plateformes de comptabilité, marketing et livraison que vous exploitez au quotidien.',
    intApiLeftTitle: 'Bâtissez vos propres flux sur-mesure',
    intApiLeftDesc: 'Utilisez notre API développeur pour interconnecter des systèmes ERP, logiciels de transport ou serveurs sur-mesure.',
    intApiLeftB1: 'Points d’accès REST modernes et sécurisés par jeton JWT',
    intApiLeftB2: 'Flux d’événements Webhooks en temps réel (commandes, retours)',
    intApiLeftB3: 'Environnement de bac à sable pour vos développeurs',
    viewApiDocs: 'Documentation API →',

    // Contact & CRM
    contactTitle: 'Propulsez Votre Commerce',
    contactSubtitle: 'Une question pour installer Nuqta POS au Maroc ? Nos conseillers planifient une démonstration ou une visite physique de vos locaux.',
    contactFieldName: 'Nom Complet',
    contactFieldEmail: 'Email',
    contactFieldPhone: 'Numéro de Téléphone',
    contactFieldBusiness: 'Secteur d’Activité',
    contactFieldSize: 'Nombre de Points de Vente',
    contactFieldMessage: 'Détails de votre projet',
    contactSubmit: 'Envoyer ma Demande',
    contactSucessTitle: 'Demande reçue !',
    contactSuccessDesc: 'Merci. Un ingénieur commercial Nuqta vous rappellera dans moins d’une heure.',

    // Common
    footerProduct: 'Produit',
    footerCompany: 'Entreprise',
    footerSupport: 'Assistance',
    footerLegal: 'Légal',
    footerRights: '© 2026 Nuqta POS. Tous droits réservés. Conçu selon les standards de qualité internationaux.',
    footerPoweredBy: 'Propulsé par',
    footerDescription: 'Le terminal de vente et le registre numérique pensés pour les commerçants — conçus pour accompagner la croissance des détaillants, cafés haut de gamme, boutiques et franchises multi-sites. Fiabilité optimale au Maroc et à l’international.',
    footerFeaturesLink: 'Aperçu des Fonctionnalités',
    footerPricingLink: 'Tarifs en MAD',
    footerBusinessLink: 'Solutions Professionnelles',
    footerAbout: 'À Propos',
    footerBlog: 'Blog Commercial',
    footerHelp: 'Centre d’Aide',
    footerPrivacy: 'Confidentialité',
    footerTerms: 'Conditions Générales (CGU-CGV)',
    footerLegalNotice: 'Mentions Légales',
    footerPoweredByCredit: 'PROPULSÉ PAR GB DIGITAL SOLUTIONS',
  },
  ar: {
    dir: 'rtl',
    navHome: 'الرئيسية',
    navFeatures: 'المميزات',
    navPricing: 'الباقات',
    navBusiness: 'الأنشطة التجارية',
    navIntegrations: 'الربط والبرامج',
    navContact: 'اتصل بنا ',
    navAdmin: 'بوابة الإدارة',
    navLogin: 'تسجيل الدخول',
    navStartFree: 'نسخة تجريبية مجانية',

    // Hero
    heroEyebrow: 'نظام الكاشير المطور للمتاجر الحديثة',
    heroTitle: 'بع أكثر. اقلق أقل. انمو أسرع.',
    heroSubtitle: 'يتحكم نظام نقطة (Nuqta) في المدفوعات، المخازن، الموظفين، والتقارير الفورية المباشرة — لتركز أنت على إرضاء زبائنك ومضاعفة أرباحك.',
    heroStartFreeCTA: 'ابدأ تجربتك مجاناً',
    heroSeeDemoCTA: 'شاهد العرض المباشر ←',

    // Trust
    trustTitle: 'موثوق به لدى أكثر من 12,000 تاجر في 40 دولة',
    trustMerchants: '12,000+ تاجر نشط',
    trustProcessed: '35 مليار درهم مغربي',
    trustUptime: '99.98% استقرار عمل النظام',
    trustCountries: '40+ دولة في العالم',
    trustRating: 'التقييم العام 4.9★',

    // Quick Features
    featuresHeading: 'كل احتياجات متجرك في واجهة واحدة.',
    fastCheckoutTitle: '⚡ دفع فائق السرعة',
    fastCheckoutDesc: 'اقبل جميع بطاقات الدفع البنكية، الدفع اللاتلامسي بالهاتف (NFC)، الدفع نقداً، أو رموز الـ QR المحلية في أقل من 3 ثوانٍ.',
    inventoryTitle: '📦 إدارة ذكية للمخازن',
    inventoryDesc: 'تتبع حركة المنتجات، وتنبيهات عند قرب نفاد السلع، وتوريد المنتجات بشكل تلقائي سلس دون تعقيد.',
    analyticsTitle: '📊 تقارير فورية مباشرة',
    analyticsDesc: 'اعرف بدقة ما يتم بيعه، ومن يقوم بالبيع، ومتى. نظام تحليلي متكامل متاح على هاتفك في أي وقت ومكان.',

    // Interactive Demo
    demoHeading: 'جهاز محاكاة الكاشير المبسط',
    demoSubheading: 'محاكاة رائعة وفائقة الدقة لواجهة بيع نظام نقطة ولوحة البيانات التفاعلية الخاصة به.',
    demoTabPOS: 'واجهة البيع الكاشير',
    demoTabAnalytics: 'لوحة الإحصائيات',
    demoTabInvoice: 'الفواتير وعروض الأسعار',

    // POS Demo specific
    posProducts: 'قائمة السلع',
    posCart: 'إيصال المبيعات',
    posSubtotal: 'المجموع الجزئي',
    posTax: 'الضريبة (20%)',
    posTotal: 'المجموع بالدرهم',
    posCharge: 'تأكيد ودفع الحساب',
    posReset: 'مسح',
    posEmpty: 'تذكرة الطلبات فارغة حالياً.',
    posComplete: 'تم تسجيل المبيعات بنجاح ✓',

    // Analytics Demo specific
    analyticsTodayRev: 'مبيعات اليوم الفورية',
    analyticsTarget: 'مدى التقدم الأسبوعي',
    analyticsOrdersCount: 'إجمالي العمليات',
    analyticsTopSelling: 'المنتجات الأعلى ربحية',
    analyticsActiveStaff: 'الموظفون النشطون الآن',

    // Invoice Demo specific
    invoiceTitle: 'بوابة المستندات (الفواتير والأسعار)',
    invoiceDesc: 'قم بإنشاء وتنزيل فواتير وعروض أسعار معتمدة ومطابقة للمعايير القانونية المحلية بالمغرب.',
    invoiceSender: 'شركة نقطة للبيع بالتجزئة (المغرب)',
    invoiceClient: 'فاتورة إلى:',
    invoiceClientName: 'أمين الإدريسي',
    invoiceClientAddress: 'شارع أنفا، الدار البيضاء',
    invoiceNumber: 'رقم الفاتورة NQ-2026-904',
    invoiceDate: 'التاريخ: 24 يونيو 2026',
    invoiceType: 'نوع المستند',
    invoiceTypeInvoice: 'فاتورة رسمية',
    invoiceTypeQuote: 'عرض أسعار معتمد',
    invoiceGenerate: 'توليد وطباعة المستند PDF',
    invoiceSuccess: 'تم توليد وتشفير المستند بنجاح بتوقيع نقطة الرقمي ✓',

    // Pricing
    pricingTitle: 'أسعار واضحة وشفافة. بلا مفاجآت.',
    pricingSubtitle: 'باقات ورسوم شهرية مرنة بالدرهم المغربي (MAD) تناسب جميع أحجام المتاجر. لا التزام سنوي وإلغاء في أي وقت.',
    monthly: 'شهري',
    annual: 'سنوي (خصم 20%)',
    save20: 'وفر 20%',
    popularLabel: 'الأكثر طلباً',
    pricingStarterName: 'نقطة Starter',
    pricingGrowthName: 'نقطة Growth',
    pricingEnterpriseName: 'نقطة المطورين',
    pricingStarterDesc: 'مثالي للعربات الصغيرة، مقاهي الكشك، والمتاجر الناشئة ذات الموظف الواحد.',
    pricingGrowthDesc: 'الباقة المتكاملة للمحلات التجارية الكبرى، المطاعم المزدحمة والفرق النشطة.',
    pricingEnterpriseDesc: 'حلول مفصلة للشركات الكبرى، السلاسل التجارية متعددة الفروع ومستودعات التوزيع.',
    pricingStarterPrice: '290 د.م',
    pricingGrowthPrice: '790 د.م',
    pricingEnterprisePrice: 'مخصص',
    perMonth: '/شهرياً',
    featuresIncluded: 'الميزات المضمنة:',
    contactSales: 'تواصل مع المبيعات',
    selectPlan: 'اختر هذه الباقة',

    // FAQ
    faqTitle: 'الأسئلة الشائعة وعلامات الاستفهام',
    faqSubtitle: 'لديك سؤال؟ وفرنا لك إجابات دقيقة ومفصلة. تواصل معنا لأي استفسار إضافي.',

    // Business Types
    businessTitle: 'مصمم خصيصاً لعملك.',
    businessSubtitle: 'نظام نقطة يتكيف مع طريقتك في البيع والخدمة وليس العكس. اختر تخصصك واستكشف الميزات:',
    businessCafesTitle: 'المقاهي ومحلات القهوة',
    businessCafesDesc: 'إدخال طلبات سريع، إضافات وتعديل حجم المشروبات، إدارة الطاولات المباشرة، وشاشات المطبخ للباريستا.',
    businessBoutiquesTitle: 'محلات الموضة والألبسة',
    businessBoutiquesDesc: 'إدارة وتتبع مقاسات وألوان وخامات المنتجات، حجز غرف القياس، طباعة الملصقات الباركود وتغيرات المواسم.',
    businessRestaurantsTitle: 'المطاعم ووجبات السرعة',
    businessRestaurantsDesc: 'إرسال مباشر للطلبات إلى المطبخ، تجزئة وتدبير الحسابات للضيوف، تقارير صيانة الطلبات والتوزيع السلس للوجبات.',
    businessBeautyTitle: 'مراكز التجميل والحلاقة',
    businessBeautyDesc: 'ربط عمليات الدفع بجدول المواعيد المحجوزة للمستفيد، تتبع عمولات عمال التجميل، مبيعات سلع العناية البدنية المباشرة.',
    businessGymsTitle: 'الصالات الرياضية والرشاقة',
    businessGymsDesc: 'حجز الاشتراكات الشهرية، تفعيل تصاريح الدخول اليومية بكود QR، بيع المكملات الغذائية، وإدارة الإعفاءات.',
    businessGroceryTitle: 'البقالات والمحلات الغذائية',
    businessGroceryDesc: 'قراءة سريعة لباركود السلع، ربط موازين الوزن الإلكترونية بالدفع، إدارة فترات ومواعيد انتهاء الصلاحية ودفتر بطاقة الولاء.',
    // Business Types - Bullets
    businessBulletsCafes: [
      'خيارات تعديل سريعة للطلب (سكر، مثلج، حليب إضافي)',
      'تتبع ذكي لحالة الطاولات المتعددة',
      'طباعة فورية لتذاكر الباريستا على شاشات التحضير'
    ],
    businessBulletsBoutiques: [
      'إعداد كامل لمتغيرات المنتج (المقاس، اللون، الخامة)',
      'حجز القطع وتتبع غرف القياس',
      'توليد وطباعة فورية لملصقات الباركود'
    ],
    businessBulletsRestaurants: [
      'تتبع كامل لحالة طاولات الصالة',
      'تجزئة الفواتير في أجزاء من الثانية',
      'توجيه تلقائي لشاشات عرض المطبخ (KDS)'
    ],
    businessBulletsBeauty: [
      'عمليات الدفع مرتبطة مباشرة بتقويم الحجوزات',
      'تتبع عمولات مصففي الشعر وأخصائيي التجميل',
      'إعدادات إكرامية مسبقة داخل قارئ البطاقات'
    ],
    businessBulletsGyms: [
      'مسح باركود اشتراكات الأعضاء',
      'توليد تصاريح دخول يومية بكود QR مع إيصال بالبريد',
      'تتبع مبيعات المكملات الغذائية داخل نظام الكاشير'
    ],
    businessBulletsGrocery: [
      'اتصال كاشير فائق السرعة لقراءة الباركود',
      'ربط الميزان الرقمي للتسعير حسب الوزن',
      'تنبيهات آلية لاقتراب انتهاء صلاحية المنتجات'
    ],

    // Business Types - Testimonials section
    businessStoriesEyebrow: 'قصص نجاح حسب القطاع',
    businessStoriesTitle: 'محبوب من قبل جميع المهن',
    businessStoriesSubtitle: 'اضغط على أي تبويب لقراءة تقييمات مباشرة من أصحاب المتاجر.',

    // Business Types - Plan cards
    businessPlanSingleBadge: 'متجر واحد',
    businessPlanSingleTitle: 'هل بدأت للتو؟',
    businessPlanSingleDesc: 'مثالي للأكشاك الصغيرة أو التجار المستقلين. تحكم في سرعة المبيعات، اقبل البطاقات، وتابع قائمة المخزون من أي جهاز.',
    businessPlanSingleF1: 'يشمل ميزات باقة Starter',
    businessPlanSingleF2: 'تجربة مجانية كاملة لمدة 14 يوماً',
    businessPlanSingleCTA: 'ابدأ مجاناً',

    businessPlanMultiBadge: 'فروع متعددة',
    businessPlanMultiTitle: 'هل تدير عدة فروع؟',
    businessPlanMultiDesc: 'وسّع نشاطك التجاري عبر واجهات API، نقل المخزون بين المستودعات، خرائط حرارية لأداء المناطق، ومدير حساب مخصص لك.',
    businessPlanMultiF1: 'باقات تأهيل مخصصة (SLA)',
    businessPlanMultiF2: 'مزامنة مباشرة لقاعدة بيانات المخزون SQL',
    businessPlanMultiCTA: 'تحدث مع المبيعات',

    // Business Types - Bottom CTA
    businessCtaTitle: 'هل أنت مستعد لتطوير جهاز الكاشير الخاص بك؟',
    businessCtaDesc: 'مهما كان نشاطك التجاري، يوفر نظام نقطة نظام بيع سلس وموثوق بدرجة موثوقية عالية.',

    // Features Deep
    featDeepTitle: 'وحدات كاشير متكاملة ومتقدمة',
    featDeepSubtitle: 'تخلص من جداول الإكسل المعقدة. يدمج نظام نقطة كافة الأدوات الضرورية لتجارة التجزئة، الجملة والخدمات بالمغرب تحت واجهة أوروبية عصرية فائقة السلاسة.',

    // 1. POS System & Sales Management
    featPosSystemTitle: 'نقاط البيع وإدارة المبيعات',
    featPosSystemDesc: 'نظام تسجيل مبيعات فائق السرعة لزيادة الإنتاجية ومنع أخطاء الكاشير كلياً.',
    featPosSystemB1: 'إتمام عمليات البيع في أقل من 3 ثوانٍ مع ربط مباشر لآلات قراءة الباركود',
    featPosSystemB2: 'وضع العمل بدون إنترنت متكامل - سجل المبيعات دون أي انقطاع في الشبكة',
    featPosSystemB3: 'دفع متعدد ومرن: نقدي، بطاقات بنكية، محافظ الكترونية أو تقسيم الفاتورة',
    featPosSystemB4: 'إيصالات رقمية أنيقة ترسل تلقائياً للزبائن عبر واتساب والبريد الإلكتروني',

    // 2. Credits Clients Management
    featCreditsTitle: 'إدارة ديون العملاء (الكريدي)',
    featCreditsDesc: 'أمسك بزمام ديون زبائنك الأوفياء (دفتر الكريدي / الأمانة) وحافظ على تدفقاتك المالية.',
    featCreditsB1: 'دفتر حساب ديون مدمج ومربوط بكل عميل مباشرة في واجهة الكاشير',
    featCreditsB2: 'إمكانية تحديد سقف أقصى للديون ومنع البيع التلقائي عند تجاوزه للحدود المسموحة',
    featCreditsB3: 'تتبع سداد الأقساط وتسجيل المبالغ المدفوعة مع إيصال خاص بكل قسط',
    featCreditsB4: 'إرسال تذكير بالديون تلقائياً بضغطة واحدة على واتساب مع رابط دفع مخصص',

    // 3. Facture, Devis, Charges & Bon de livraison
    featInvoicingTitle: 'الفواتير، عروض الأسعار، المصاريف وسندات التسليم',
    featInvoicingDesc: 'نظام محاسبي وتجاري متكامل لإصدار كافة المستندات والوثائق الرسمية بلمح البصر.',
    featInvoicingB1: 'إصدار فواتير بيع معتمدة ومطابقة للمعايير الضريبية وحساب تلقائي للنسب',
    featInvoicingB2: 'توليد عروض أسعار (Devis) احترافية قابلة للتحويل إلى تذكرة بيع نشطة بضغطة زر',
    featInvoicingB3: 'سندات تسليم (Bon de Livraison) مربوطة تلقائياً بحسابات الشحن وسحب المخازن',
    featInvoicingB4: 'تسجيل المصاريف التشغيلية (الCharges) كالكراء والرواتب لمعرفة الأرباح الصافية بدقة',

    // 4. Daily detailed reports & Advanced analytics
    featReportsTitle: 'التقارير اليومية والتحليلات المتقدمة',
    featReportsDesc: 'رؤية مالية واضحة لأداء متجرك ومراقبة الأرباح الصافية ومعدل تدوير المخزون.',
    featReportsB1: 'تقارير إغلاق الصندوق والوردية اليومية (Z-Report) مفصلة ومطابقة للنقدية',
    featReportsB2: 'خريطة زمنية حرارية لحجم المبيعات ساعة بساعة لتوزيع عمل الموظفين بنجاح',
    featReportsB3: 'تحليل هوامش الربح بدقة لكل صنف بالربط مع تكلفة الشراء والمستودع',
    featReportsB4: 'مخططات بيانية تفاعلية تظهر منحنى النمو وتكامل البيانات عبر جميع الفروع',

    // 5. Double Ticket Management
    featTicketsTitle: 'إدارة وتوجيه التذاكر المزدوجة',
    featTicketsDesc: 'نظام توجيه وتدبير تذاكر الطلبات لضمان خدمة فائقة السرعة ومنع حدوث أي فوضى.',
    featTicketsB1: 'توجيه آلي مفصل: طلبات المشروبات لباريستا القهوة والوجبات الساخنة للمطبخ',
    featTicketsB2: 'طباعة تذكرة مزدوجة: إيصال رقم الانتظار للزبون وتذكرة التجهيز في المطبخ',
    featTicketsB3: 'شاشات عرض حية لصف انتظار التحضير واضحة للمشغلين والزبائن',
    featTicketsB4: 'تتبع شامل لحالات الطلب من لحظة الاستلام، التحضير والتسليم',

    // 6. Advanced Inventory Control
    featStockTitle: 'إدارة المخازن المتقدمة',
    featStockDesc: 'محرك جرد مستودعات متطور يمنع نفاد السلع ويقلل من نسب الهدر والخسارة.',
    featStockB1: 'مصفوفة متغيرات متكاملة (إدارة السلع عبر المقاسات، الألوان والخامات)',
    featStockB2: 'بطاقات وصفات المكونات المركبة (مثال: خصم الطحين والزبدة والحليب تلقائياً لكل كرواسون مباع)',
    featStockB3: 'تعيين حدود إعادة الطلب التلقائي مع إشعارات SMS فورية للمخزون الضعيف',
    featStockB4: 'رفع وتحديث آلاف المنتجات والمخزون في ثوانٍ معدودة عبر ملفات Excel',

    // 7. Suppliers Directory
    featSuppliersTitle: 'إدارة الموردين والمشتريات',
    featSuppliersDesc: 'دليل شامل لبيانات ومعاملات الموردين وشركات الجملة لتنظيم توريد السلع.',
    featSuppliersB1: 'فهرس موحد للموردين مع ربط مباشر للاتصال عبر واتساب وعناوين مستودعاتهم',
    featSuppliersB2: 'تتبع تاريخي لتغير أسعار الشراء وتغيرات التضخم لدى جهات الجملة',
    featSuppliersB3: 'متابعة الديون المستحقة للموردين والمبالغ المتبقية مع إرفاق فواتير الشراء',
    featSuppliersB4: 'تقييم مدى دقة الموردين والتزامهم بمواعيد التسليم المقررة ومنع التأخير',

    // 8. PDF Bon de commande generator
    featPdfTitle: 'توليد سندات الطلب بصيغة PDF',
    featPdfDesc: 'أنشئ ووقع سندات طلب التوريد الرسمية لgrossistes بلمسة واحدة وإرسالها للموردين.',
    featPdfB1: 'إصدار فوري لسندات طلب الشراء (Bon de Commande) بتصميم احترافي بصيغة PDF',
    featPdfB2: 'إدراج رمز QR التوثيقي المشفر لنظام نقطة على كل سند تأكيداً لمصداقيته',
    featPdfB3: 'لوحة توقيع إلكتروني مدمجة للتوقيع مباشرة بإصبع اليد أو القلم على الشاشة',
    featPdfB4: 'إرسال آلي لسندات الطلب بصيغة PDF الموقعة إلى البريد الإلكتروني للمورد مباشرة',

    // Integrations
    intTitle: 'اربط متجرك. ضاعف قوتك.',
    intSubtitle: 'اربط نقطة ببرامج المحاسبة، والتسويق، والتوصيل الأكثر أهمية لشركتك.',
    intApiLeftTitle: 'ابن نظامك الخاص والربط البرمجي الكامل',
    intApiLeftDesc: 'استخدم واجهة برمجة تطبيقات المطورين لربط أنظمة الـ ERP الخاصة أو برمجيات مخصصة.',
    intApiLeftB1: 'نقاط ربط REST endpoints حديثة ومحمية بـ JWT',
    intApiLeftB2: 'تدفق بيانات فوري Webhooks للطلبات والمبيعات والمرتجعات',
    intApiLeftB3: 'بيئة تجريبية معزولة (Sandbox) جاهزة للاختبار فورا',
    viewApiDocs: 'مستندات الـ API للمطورين ←',

    // Contact & CRM
    contactTitle: 'طور أعمالك التجارية مع نقطة',
    contactSubtitle: 'اطلب عرض أسعار مخصص أو نسق زيارة لمعرضك من قبل أحد مهندسي المبيعات والدعم الفني لدينا بالمغرب.',
    contactFieldName: 'الاسم بالكامل',
    contactFieldEmail: 'البريد الإلكتروني',
    contactFieldPhone: 'رقم الهاتف (الواتساب)',
    contactFieldBusiness: 'نشاط متجرك',
    contactFieldSize: 'عدد فروع المعرض',
    contactFieldMessage: 'كيف نستطيع مساعدتك؟',
    contactSubmit: 'إرسال طلب الاستشارة المباشر',
    contactSucessTitle: 'تم إرسال طلبك بنجاح!',
    contactSuccessDesc: 'شكراً لاهتمامك. سيتصل بك مهندس مبيعات نقطة خلال أقل من ساعة لتنسيق لقاء وعرض مجاني.',

    // Common
    footerProduct: 'المنتج',
    footerCompany: 'الشركة',
    footerSupport: 'الدعم والمساعدة',
    footerLegal: 'قانوني',
    footerRights: '© 2026 نقطة POS. جميع الحقوق محفوظة. صُمم وفق أعلى معايير الجودة العالمية.',
    footerPoweredBy: 'بدعم من',
    footerDescription: 'محطة بيع ودفتر رقمي مصمم أولاً لخدمة التجار — بني لمواكبة نمو تجار التجزئة، المقاهي الراقية، البوتيكات والفروع المتعددة. موثوقية عالية في المغرب وعالمياً.',
    footerFeaturesLink: 'نظرة عامة على الميزات',
    footerPricingLink: 'باقات الأسعار بالدرهم',
    footerBusinessLink: 'حلول الأعمال',
    footerAbout: 'من نحن',
    footerBlog: 'المدونة التجارية',
    footerHelp: 'مركز المساعدة',
    footerPrivacy: 'الخصوصية',
    footerTerms: 'الشروط والأحكام',
    footerLegalNotice: 'إشعار قانوني',
    footerPoweredByCredit: 'مدعوم من GB DIGITAL للحلول الرقمية',
  }
};