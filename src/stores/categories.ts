import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getCategories } from '@/api/products'
import { ApiError } from '@/api/http'
import type { Category } from '@/types/product'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const error = ref<ApiError | null>(null)
  const isLoading = ref(false)
  const isLoaded = ref(false)

  // Deduplica le chiamate concorrenti: header e Home partono
  // insieme al primo caricamento, ma la richiesta HTTP è una sola.
  let inflight: Promise<void> | null = null

  async function ensureLoaded(): Promise<void> {
    if (isLoaded.value) return
    if (inflight) return inflight

    isLoading.value = true
    error.value = null

    inflight = (async () => {
      try {
        categories.value = await getCategories()
        isLoaded.value = true
      } catch (caught) {
        error.value =
          caught instanceof ApiError ? caught : new ApiError('Impossibile caricare le categorie.')
        throw error.value
      } finally {
        isLoading.value = false
        inflight = null
      }
    })()

    return inflight
  }

  return { categories, error, isLoading, isLoaded, ensureLoaded }
})
