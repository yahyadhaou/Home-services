/**
 * pricing.js — shared pricing constants for every booking flow.
 *
 * SERVICE_FEE_RATE is the platform's take, shown to the customer as an
 * explicit line item rather than folded silently into the total. This
 * matches how German/EU marketplaces (MyHammer, Lieferando, etc.) present
 * fees, and it's what actually gives the business a visible revenue line
 * instead of an opaque "final price" nobody can audit.
 *
 * Prices shown to end users are gross (include 19% German VAT / MwSt.) per
 * the Preisangabenverordnung (PAngV) — screens must label totals
 * "inkl. MwSt." rather than leaving VAT status ambiguous.
 */
export const SERVICE_FEE_RATE = 0.12; // 12% platform/service fee, shown to the customer
export const VAT_RATE = 0.19; // German standard VAT rate — informational only, prices are already gross

export const withServiceFee = (subtotal) => {
  const fee = Math.round(subtotal * SERVICE_FEE_RATE);
  return { subtotal, fee, total: subtotal + fee };
};

export default { SERVICE_FEE_RATE, VAT_RATE, withServiceFee };
