/**
 * Company-wide facts. Change a value here and every page updates.
 * Leave a field empty ('') to hide it on the site.
 */
export const site = {
  name: 'Nexvhira',
  /** Legal form. Stays plain "Nexvhira" until registration is complete. */
  legalName: 'Nexvhira',
  tagline: 'Software that speaks the language of your business.',
  taglineMr: 'तुमच्या व्यवसायाच्या भाषेत बोलणारे सॉफ्टवेअर',
  description:
    'Nexvhira is a software company in Pune. We build business software, websites, dashboards and AI tools for small and growing businesses, in English and Marathi.',
  city: 'Pune',
  region: 'Maharashtra',
  country: 'India',
  countryCode: 'IN',

  founder: { name: 'Nikhil Raghuwanshi', role: 'Founder & CEO' },

  email: 'nraghuvanshi100@gmail.com',
  /** E.164 without spaces, used for tel: and WhatsApp links. */
  phone: '+917666781458',
  /** How the number is shown on the page. */
  phoneDisplay: '+91 76667 81458',

  /** Filled in after Udyam MSME registration, e.g. 'UDYAM-MH-00-0000000'. */
  udyamNumber: '',

  /**
   * Web3Forms access key (free, emailed to the company inbox from web3forms.com).
   * While empty, the contact form opens WhatsApp with the message pre-filled.
   */
  web3formsKey: '',

  /** Cloudflare Web Analytics token. Only needed while on workers.dev; leave empty once the domain runs through Cloudflare. */
  cfAnalyticsToken: '',

  socials: {
    linkedin: '',
    github: '',
    instagram: '',
  },

  foundedYear: 2026,
} as const;

/** WhatsApp click-to-chat link, optionally with a pre-filled message. */
export function whatsappLink(message?: string): string {
  const number = site.phone.replace(/[^0-9]/g, '');
  const text = message ? `?text=${encodeURIComponent(message)}` : '';
  return `https://wa.me/${number}${text}`;
}

export const telLink = `tel:${site.phone}`;
export const mailLink = `mailto:${site.email}`;

export const nav = [
  { href: '/products/', label: 'Products' },
  { href: '/services/', label: 'Services' },
  { href: '/about/', label: 'About' },
  { href: '/contact/', label: 'Contact' },
] as const;
