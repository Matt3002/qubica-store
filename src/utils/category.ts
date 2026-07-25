import type { Category } from '@/types/product'

/**
 * Converte una categoria in uno slug adatto all'URL.
 * "men's clothing" -> "mens-clothing"
 */
export function toSlug(category: Category): string {
  return category
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // rimuove i diacritici
    .replace(/[^a-z0-9]+/g, '-') // tutto il resto diventa trattino
    .replace(/^-+|-+$/g, '') // niente trattini ai bordi
}

/**
 * Ritrova la categoria originale a partire dallo slug dell'URL.
 * Serve per il deep link: dallo slug non si può tornare indietro
 * per calcolo, si confronta con la lista fetchata dall'API.
 */
export function findCategoryBySlug(categories: Category[], slug: string): Category | undefined {
  return categories.find((category) => toSlug(category) === slug)
}

/** Etichetta leggibile per la UI: "men's clothing" -> "Men's clothing" */
export function formatCategoryLabel(category: Category): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}
