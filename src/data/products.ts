import type { Product } from './types';
import nareshShot from '../assets/products/naresh-enterprises.jpg';
import flourShot from '../assets/products/flour-mill.jpg';
import auraShot from '../assets/products/auraedu.jpg';

/**
 * Products, in the order the owner listed them.
 * Rule: `features` holds only what can be seen in the live app or the code.
 * To hide a product, delete its object (or set featured: false to keep it off the home page).
 */
export const products: Product[] = [
  {
    slug: 'pharmacy-distribution-erp',
    name: 'Pharmacy Distribution ERP',
    tagline: 'Stock and order management for a pharmacy distributor.',
    industry: 'Pharmacy distribution',
    status: 'live',
    summary:
      'A private web app built for Naresh Enterprises (Tammewar Pharmacy). The shop owner signs in from any device to manage stock and orders, and the whole app switches between English and Marathi.',
    problem:
      'A distributor needs one place to see what is in stock and what has been ordered, in a language the whole shop is comfortable reading.',
    users: ['Shop owner', 'Distributor staff'],
    features: [
      'Manage stock and orders from one shop dashboard',
      'Secure sign-in for the shop owner',
      'Full English and मराठी interface',
      'Light and dark mode',
      'Can be added to a phone’s home screen like an app',
    ],
    languages: ['English', 'मराठी'],
    liveUrl: 'https://tammewar-pharmacy.pages.dev/',
    liveLabel: 'Open the app (client sign-in)',
    client: { person: 'Naresh Tammewar', business: 'Naresh Enterprises (Tammewar Pharmacy)' },
    screenshot: nareshShot,
    screenshotAlt: 'Sign-in screen of the Naresh Enterprises Distribution Management ERP',
    featured: true,
  },
  {
    slug: 'flour-mill',
    name: 'Flour Mill',
    tagline: 'Order tracking, dues and receipts for flour mills.',
    industry: 'Flour milling',
    status: 'live',
    summary:
      'Customers check on their grain from their phone instead of calling the mill. The owner runs the milling queue, records cash and UPI payments and sends payment reminders from one dashboard.',
    problem:
      'Customers keep calling to ask whether their flour is ready, and the mill has to track who still owes money for which order.',
    users: ['Mill owner', 'Mill customers'],
    features: [
      'Customers log in with their mobile number and a 4-digit PIN',
      'Each order moves from queued to milling to ready, with a notice when it is ready',
      'A receipt-style slip for every order',
      'Cash and UPI payments, with total, paid and balance due',
      'Per-kg milling rates by grain and fineness, with totals worked out automatically',
      'Owner dashboard with the day’s queue, total outstanding and one-tap payment reminders',
      'English and मराठी',
    ],
    languages: ['English', 'मराठी'],
    liveUrl: 'https://feed-mill-management-system-production.up.railway.app/',
    liveLabel: 'Open the live app',
    screenshot: flourShot,
    screenshotAlt: 'Flour Mill home page asking “Is my flour ready?” with a mobile-number login',
    featured: true,
  },
  {
    slug: 'auraedu',
    name: 'AuraEdu',
    tagline: 'Institution management for academies, schools and colleges.',
    industry: 'Education and training',
    status: 'live',
    summary:
      'One platform for running an institute: admissions, students, staff, attendance, fees, exams and payroll, with separate spaces for admins, teachers, students and parents.',
    problem:
      'Institutes juggle admissions, attendance, fees and payroll across registers, spreadsheets and chat groups, and nothing lines up at the end of the month.',
    users: ['Institute admins', 'Teachers', 'Students', 'Parents'],
    features: [
      'Online admissions, with enquiries converted into student records automatically',
      'Student, staff, course, batch and timetable management',
      'Attendance by biometric, manual or QR code',
      'Fees collection, accounts, salary and payroll',
      'Online tests with proctoring, and certificate generation',
      'Notices by SMS, email and push; WhatsApp and Zoom live classes',
      'Several branches run from one dashboard',
      'Admin dashboard, teacher workspace, Android student app and parent access',
    ],
    liveUrl: 'https://aura-edu-eight.vercel.app/',
    liveLabel: 'Open the live site',
    screenshot: auraShot,
    screenshotAlt: 'AuraEdu home page: “Run your entire institution on one platform.”',
    featured: true,
  },
  {
    slug: 'legal-case-predictor',
    name: 'Legal Case Outcome Predictor',
    tagline: 'An AI prototype that estimates the likely outcome of an Indian legal case.',
    industry: 'Legal technology',
    status: 'prototype',
    summary:
      'A prototype that reads a case and estimates its likely outcome, built on InLegalBERT, a language model trained on Indian legal documents. It runs as a simple web app.',
    problem:
      'Lawyers and litigants want an early, evidence-based sense of how a case might go before investing time and money.',
    users: ['Lawyers', 'Legal researchers'],
    features: [
      'Built on InLegalBERT, a language model for Indian legal text',
      'Web interface built with Streamlit',
      'Data stored in Supabase',
    ],
    tech: ['Python', 'InLegalBERT', 'Streamlit', 'Supabase'],
    featured: false,
  },
  {
    slug: 'safelinker',
    name: 'SafeLinker',
    tagline: 'Checks whether a web link is likely to be a phishing site.',
    industry: 'Cybersecurity',
    status: 'prototype',
    summary:
      'A prototype that looks at a URL and flags whether it is likely to be a phishing link, so people can check before they click.',
    problem: 'Fake links in messages and emails look real enough to fool staff and customers.',
    users: ['Businesses', 'Everyday internet users'],
    features: ['Phishing URL detection'],
    featured: false,
  },
  {
    slug: 'customer-segmentation',
    name: 'Customer Segmentation Analytics',
    tagline: 'Finds a bank’s high-value and high-potential customers.',
    industry: 'Banking and fintech',
    status: 'prototype',
    summary:
      'A data-analysis project on 10,000 bank customer records. It scores every customer, groups them into four value tiers and ranks the ones worth a closer look.',
    problem:
      'Banks treat most customers the same and miss the ones who could grow into their most valuable accounts.',
    users: ['Bank and fintech teams', 'Relationship managers'],
    features: [
      'A Customer Value Score built from seven weighted dimensions',
      'K-Means clustering into Standard, Silver, Gold and Premium tiers',
      '1,338 low-value, high-potential customers ranked by priority, each with a suggested action',
      'Tested on 10,000 customer records',
    ],
    tech: ['Python', 'pandas', 'scikit-learn', 'Excel'],
    codeUrl: 'https://github.com/Bharambevaish/Fintech-Customer-Segmentation',
    featured: false,
  },
];

export const liveProducts = products.filter((p) => p.status === 'live');
export const prototypes = products.filter((p) => p.status === 'prototype');

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const statusLabel: Record<Product['status'], string> = {
  live: 'Live',
  prototype: 'Prototype',
};
