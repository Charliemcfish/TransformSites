// Package definitions for new pricing model
const PACKAGES = {
  WEBSITE_STARTER: {
    id: 'website_starter',
    displayName: 'Website Starter',
    websitePrice: 549,
    hostingPrice: 100,
    description: 'Perfect for small businesses getting started online'
  },
  WEBSITE_PRO: {
    id: 'website_pro',
    displayName: 'Website Pro',
    websitePrice: 749,
    hostingPrice: 125,
    description: 'Professional websites with advanced features'
  },
  WEBSITE_ELITE: {
    id: 'website_elite',
    displayName: 'Website Elite',
    websitePrice: 949,
    hostingPrice: 150,
    description: 'Premium websites with full customization'
  },
  CUSTOM: {
    id: 'custom',
    displayName: 'Custom Package',
    websitePrice: null,
    hostingPrice: null,
    description: 'Tailored solutions for unique requirements'
  }
};

// Payment type constants
const PAYMENT_TYPES = {
  ONE_TIME: 'one_time',
  MONTHLY: 'monthly',
  ANNUAL_HOSTING: 'annual_hosting'
};

// Hosting renewal warning threshold (days)
const HOSTING_RENEWAL_WARNING_DAYS = 14;

// Legacy package mapping for backward compatibility
const LEGACY_PACKAGE_MAP = {
  'starter': 'website_starter',
  'professional': 'website_pro',
  'premium': 'website_elite',
  'custom': 'custom'
};

// Helper function to get package by ID
function getPackageById(id) {
  return Object.values(PACKAGES).find(pkg => pkg.id === id);
}

// Helper function to get package options for dropdowns
function getPackageOptions() {
  return Object.values(PACKAGES).map(pkg => ({
    value: pkg.id,
    label: pkg.displayName
  }));
}

// Helper function to normalize legacy package names
function normalizeLegacyPackage(packageId) {
  return LEGACY_PACKAGE_MAP[packageId] || packageId;
}

// Helper function to get package display name (handles legacy names)
function getPackageDisplayName(packageId) {
  const normalized = normalizeLegacyPackage(packageId);
  const pkg = getPackageById(normalized);
  return pkg ? pkg.displayName : packageId.charAt(0).toUpperCase() + packageId.slice(1);
}
