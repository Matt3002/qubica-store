import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import type { Product } from '@/types/product'
import { readJson, writeJson } from '@/utils/storage'

const STORAGE_KEY = 'qubica-store:cart'

export interface CartItem {
  product: Product
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(readJson<CartItem[]>(STORAGE_KEY, []))

  const totalItems = computed(() => items.value.reduce((sum, item) => sum + item.quantity, 0))

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  )

  const isEmpty = computed(() => items.value.length === 0)

  function addItem(product: Product, quantity = 1): void {
    const existing = items.value.find((item) => item.product.id === product.id)

    if (existing) {
      existing.quantity += quantity
      return
    }

    items.value.push({ product, quantity })
  }

  function removeItem(productId: number): void {
    items.value = items.value.filter((item) => item.product.id !== productId)
  }

  function setQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    const item = items.value.find((entry) => entry.product.id === productId)
    if (item) item.quantity = quantity
  }

  function clear(): void {
    items.value = []
  }

  // deep: le quantità cambiano dentro gli oggetti, non sostituendo l'array.
  watch(items, (value) => writeJson(STORAGE_KEY, value), { deep: true })

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    addItem,
    removeItem,
    setQuantity,
    clear,
  }
})
