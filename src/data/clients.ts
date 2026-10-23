/**
 * Real clients only. Add a client here once they have agreed to be named.
 * `quote` must be their own words; leave it out if you don't have one.
 */
export interface Client {
  person: string;
  business: string;
  industry: string;
  /** Product slug we built for them. */
  product?: string;
  quote?: string;
}

export const clients: Client[] = [
  {
    person: 'Naresh Tammewar',
    business: 'Naresh Enterprises (Tammewar Pharmacy)',
    industry: 'Pharmacy distribution',
    product: 'pharmacy-distribution-erp',
  },
];
