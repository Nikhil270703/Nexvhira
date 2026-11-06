/**
 * Customer reviews. REAL ONLY: add a review once the customer has written or said it
 * and agreed to have it shown with their name. Copy their words exactly.
 *
 * The reviews section stays hidden on the site until this list has at least one entry,
 * so an empty list is safe.
 *
 * Example (delete the // to use):
 * // { product: 'flour-mill', quote: 'Their exact words…', name: 'Full name', role: 'Owner', business: 'Mill name, Town' },
 */
export interface Review {
  /** Product slug from products.ts, e.g. 'flour-mill', 'pharmacy-distribution-erp', 'auraedu'. */
  product: string;
  /** The customer's own words. */
  quote: string;
  name: string;
  role?: string;
  business?: string;
}

export const reviews: Review[] = [];

export const reviewsFor = (slug: string) => reviews.filter((r) => r.product === slug);
