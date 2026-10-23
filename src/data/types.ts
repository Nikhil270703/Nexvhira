import type { ImageMetadata } from 'astro';

/** `live` = deployed and openable today. `prototype` = working build, demo on request. */
export type ProductStatus = 'live' | 'prototype';

export interface ProductClient {
  /** Person, exactly as they agreed to be named. */
  person: string;
  /** Business name. */
  business: string;
}

export interface Product {
  slug: string;
  name: string;
  /** One plain sentence: what it is and who it's for. */
  tagline: string;
  /** Industry or field, used for the "built for" line. */
  industry: string;
  status: ProductStatus;
  /** Two or three sentences for the product page intro. */
  summary: string;
  /** The everyday problem it solves, in the customer's words. */
  problem: string;
  /** Who uses it. */
  users: string[];
  /** Only features that are verified on the live app or in the code. */
  features: string[];
  /** Tech stack, only where known for certain. */
  tech?: string[];
  /** Interface languages. */
  languages?: string[];
  /** Public URL of the running app. */
  liveUrl?: string;
  /** Label for the live link, e.g. when it opens a client sign-in page. */
  liveLabel?: string;
  /** Public source code. */
  codeUrl?: string;
  client?: ProductClient;
  screenshot?: ImageMetadata;
  screenshotAlt?: string;
  /** Show on the home page. */
  featured: boolean;
}

export interface Service {
  slug: string;
  name: string;
  /** One sentence shown in lists. */
  summary: string;
  /** What the client actually gets. */
  deliverables: string[];
  /** Product slugs that show this service in practice. */
  examples?: string[];
  /** A condition the client should know before booking. */
  note?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  /** Optional short bio, in their own words. */
  bio?: string;
  linkedin?: string;
  github?: string;
}

export interface Step {
  title: string;
  body: string;
}

export interface Faq {
  q: string;
  a: string;
}
