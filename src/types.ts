export type Language = 'en' | 'fr' | 'ar';

export interface TranslationSet {
  // Navigation
  navHome: string;
  navFeatures: string;
  navPricing: string;
  navBusiness: string;
  navIntegrations: string;
  navContact: string;
  navLogin: string;
  navStartFree: string;
  
  // Quick Switch / Hero badges
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  heroStartFreeCTA: string;
  heroSeeDemoCTA: string;
  
  // Trust banner
  trustTitle: string;
  trustMerchants: string;
  trustProcessed: string;
  trustUptime: string;
  trustCountries: string;
  trustRating: string;

  // Features Highlight
  featuresHeading: string;
  fastCheckoutTitle: string;
  fastCheckoutDesc: string;
  inventoryTitle: string;
  inventoryDesc: string;
  analyticsTitle: string;
  analyticsDesc: string;

  // POS Demo
  demoHeading: string;
  demoSubheading: string;
  demoTabPOS: string;
  demoTabAnalytics: string;
  demoTabInvoice: string;
  
  // Pricing
  pricingTitle: string;
  pricingSubtitle: string;
  monthly: string;
  annual: string;
  save20: string;
  popularLabel: string;
  pricingStarterName: string;
  pricingGrowthName: string;
  pricingEnterpriseName: string;
  pricingStarterDesc: string;
  pricingGrowthDesc: string;
  pricingEnterpriseDesc: string;
  contactSales: string;
  featuresIncluded: string;

  // Business Types
  businessTitle: string;
  businessSubtitle: string;
  businessCafes: string;
  businessBoutiques: string;
  businessRestaurants: string;
  businessBeauty: string;
  businessGyms: string;
  businessGrocery: string;

  // Common footer
  footerProduct: string;
  footerCompany: string;
  footerSupport: string;
  footerLegal: string;
  footerRights: string;
}
