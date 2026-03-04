/**
 * Application Constants
 * Centralized constants for the entire application
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  TIMEOUT: 30000,
};

// Routes Configuration
export const ROUTES = {
  HOME: '/',
  FACTORY: '/factory',
  PROCESS: '/process',
  MATCHER: '/matcher',
  SHOP: '/shop',
  BULK_INQUIRY: '/bulk',
  ADMIN: {
    DASHBOARD: '/admin/dashboard',
    INQUIRIES: '/admin/inquiries',
    SETTINGS: '/admin/settings',
  },
};

// Fabric Types
export const FABRIC_TYPES = [
  { value: '100% Organic Cotton', label: '100% Organic Cotton' },
  { value: 'Polyester Blend', label: 'Polyester Blend' },
  { value: 'Linen', label: 'Linen' },
  { value: 'Oxford Weave', label: 'Oxford Weave' },
  { value: 'Silk Satin', label: 'Silk Satin' },
  { value: 'Cotton-Polyester Blend', label: 'Cotton-Polyester Blend' },
  { value: 'Bamboo Fiber', label: 'Bamboo Fiber' },
  { value: 'Hemp', label: 'Hemp' },
];

// Inquiry Status Options
export const INQUIRY_STATUS = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
};

// AI Analysis Categories
export const AI_CATEGORIES = {
  STANDARD: 'Standard Dyeing',
  TECHNICAL: 'Technical Textile',
  SUSTAINABLE: 'Sustainable Production',
  BULK: 'Bulk Manufacturing',
};

// Company Information
export const COMPANY_INFO = {
  NAME: 'Sri Mayur Colors',
  TAGLINE: 'Industrial Precision',
  FULL_NAME: 'Sri Mayur Colors',
  ADDRESS: {
    STREET: '255, Perumbaraikadu',
    AREA: 'Kongu Vellalar Mandapam Backside',
    CITY: 'Pallipalayam',
    DISTRICT: 'Namakkal',
    STATE: 'Tamil Nadu',
    COUNTRY: 'India',
  },
  EMAIL: 'export@srimayur.com',
  PHONE: '+91',
  WEBSITE: 'www.srimayurcolors.com',
};

// Certifications
export const CERTIFICATIONS = [
  { code: 'ISO 9001:2015', name: 'ISO 9001:2015', type: 'Quality Management' },
  { code: 'GOTS', name: 'GOTS Certified', type: 'Organic Textile' },
  { code: 'REACH', name: 'REACH Compliant', type: 'Chemical Safety' },
  { code: 'ZLD', name: 'ZLD Facility', type: 'Environmental' },
];

// Animation Durations (in milliseconds)
export const ANIMATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
  PAGE_TRANSITION: 400,
};

// Breakpoints (matching Tailwind)
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
};

export default {
  API_CONFIG,
  ROUTES,
  FABRIC_TYPES,
  INQUIRY_STATUS,
  AI_CATEGORIES,
  COMPANY_INFO,
  CERTIFICATIONS,
  ANIMATION,
  BREAKPOINTS,
};

