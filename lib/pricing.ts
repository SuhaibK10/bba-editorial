// Shared price formatting: item pages, cart, checkout, and order emails
// all render the same INR, tax-inclusive, whole-rupee format.
export function formatPrice(rupees: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(rupees);
}
