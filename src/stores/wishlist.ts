import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Product } from '@/types/product'
import { readJson, writeJson } from '@/utils/storage'

const STORAGE_KEY = 'qubica-store:wishlist'

export const useWishlistStore = defineStore('wishlist', () => {
  const products = ref<Product[]>(readJson<Product[]>(STORAGE_KEY, []))

  const totalItems = computed(() => products.value.length)
  const isEmpty = computed(() => products.value.length === 0)

  function has(productId: number): boolean {
    return products.value.some((product) => product.id === productId)
  }

  function add(product: Product): void {
    if (!has(product.id)) products.value.push(product)
  }

  function remove(productId: number): void {
    products.value = products.value.filter((product) => product.id !== productId)
  }

  /** Aggiunge o rimuove. Ritorna true se il prodotto è ora nella wishlist. */
  function toggle(product: Product): boolean {
    if (has(product.id)) {
      remove(product.id)
      return false
    }
    add(product)
    return true
  }

  function clear(): void {
    products.value = []
  }

  watch(products, (value) => writeJson(STORAGE_KEY, value), { deep: true })

  return { products, totalItems, isEmpty, has, add, remove, toggle, clear }
})
