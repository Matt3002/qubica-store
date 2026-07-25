import { request } from './http'
import type { Category, Product } from '@/types/product'

export function getProducts(): Promise<Product[]> {
  return request<Product[]>('/products')
}

export function getProductById(id: number): Promise<Product> {
  return request<Product>(`/products/${id}`)
}

export function getCategories(): Promise<Category[]> {
  return request<Category[]>('/products/categories')
}

export function getProductsByCategory(category: Category): Promise<Product[]> {
  // "men's clothing" contiene apostrofo e spazio: va codificato.
  return request<Product[]>(`/products/category/${encodeURIComponent(category)}`)
}
