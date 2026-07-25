/**
 * Forma dei dati restituiti dalla Fake Store API.
 * Verificata sugli endpoint reali: /products, /products/:id.
 */

export interface ProductRating {
  rate: number
  count: number
}

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
}

/**
 * /products/categories restituisce un array di stringhe:
 * ["electronics", "jewelery", "men's clothing", "women's clothing"]
 */
export type Category = string
