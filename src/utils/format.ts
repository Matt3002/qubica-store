/**
 * I prezzi della Fake Store API sono in dollari.
 * Intl fa il lavoro di formattazione, niente concatenazioni a mano.
 */
const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export function formatPrice(value: number): string {
  return priceFormatter.format(value)
}
