import type { Service } from './types';

export const services: Service[] = [
  {
    slug: 'custom-software',
    name: 'Custom business software',
    summary:
      'Billing, stock, orders, queues and payments, built around the way your business already works.',
    deliverables: [
      'A web app your team opens on a phone or computer',
      'Owner dashboard and staff logins',
      'English and मराठी screens if you need them',
      'Setup, data import and staff walkthrough',
    ],
    examples: ['pharmacy-distribution-erp', 'flour-mill', 'auraedu'],
  },
  {
    slug: 'websites',
    name: 'Websites and web apps',
    summary:
      'Company websites, product pages and customer portals that load fast on phones and are easy to find on Google.',
    deliverables: [
      'Design and build of the site',
      'Contact and enquiry forms that reach your inbox or WhatsApp',
      'Basic search-engine setup',
      'Hosting and domain setup',
    ],
  },
  {
    slug: 'data-analytics',
    name: 'Data analytics and dashboards',
    summary:
      'We turn your sales, customer or operations data into dashboards and reports you can act on.',
    deliverables: [
      'Data clean-up and analysis',
      'Dashboards in Power BI, Excel or a web app',
      'A short written report of what the numbers show',
    ],
    examples: ['customer-segmentation'],
  },
  {
    slug: 'ai-ml',
    name: 'AI and machine learning',
    summary:
      'Prediction, classification and text-analysis models, wrapped in a simple app your team can use.',
    deliverables: [
      'A working model trained on your data or on public data',
      'A simple web interface to use it',
      'Notes on what the model can and cannot do',
    ],
    examples: ['legal-case-predictor', 'safelinker'],
  },
  {
    slug: 'security-review',
    name: 'Basic security reviews',
    summary:
      'A practical check of your website or app: logins and passwords, HTTPS, exposed admin pages and backups.',
    deliverables: [
      'A checklist review of your site or app',
      'A plain-language list of fixes, most urgent first',
      'Help applying the fixes if you want it',
    ],
    note: 'We only review systems you own, and only with your written permission.',
  },
];
