<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ApiError } from '@/api/http'
import { getProducts, getProductsByCategory } from '@/api/products'
import ProductGrid from '@/components/ProductGrid.vue'
import { useAsyncData } from '@/composables/useAsyncData'
import { useCategoriesStore } from '@/stores/categories'
import type { Product } from '@/types/product'
import { findCategoryBySlug, formatCategoryLabel } from '@/utils/category'

const route = useRoute()
const categoriesStore = useCategoriesStore()

const activeSlug = computed(() => (route.query.category as string | undefined) ?? null)

/**
 * Sorgente unica dei prodotti mostrati.
 * Lo slug dell'URL non è reversibile: per risalire al nome
 * della categoria servono le categorie caricate dall'API.
 */
async function loadProducts(): Promise<Product[]> {
  const slug = activeSlug.value

  if (!slug) return getProducts()

  await categoriesStore.ensureLoaded()
  const category = findCategoryBySlug(categoriesStore.categories, slug)

  if (!category) {
    throw new ApiError(`La categoria "${slug}" non esiste.`, 404)
  }

  return getProductsByCategory(category)
}

const { data, error, state, execute } = useAsyncData(loadProducts)

const products = computed(() => data.value ?? [])
const isLoading = computed(() => state.value === 'loading' || state.value === 'idle')

const pageTitle = computed(() => {
  const slug = activeSlug.value
  if (!slug) return 'Tutti i prodotti'

  const category = findCategoryBySlug(categoriesStore.categories, slug)
  return category ? formatCategoryLabel(category) : 'Categoria'
})

// immediate: copre sia il primo caricamento sia il deep link;
// il watch gestisce i cambi di categoria successivi.
watch(activeSlug, execute, { immediate: true })
</script>

<template>
  <section class="home">
    <header class="home__header">
      <h1 class="home__title">{{ pageTitle }}</h1>
      <p v-if="state === 'success'" class="home__count">
        {{ products.length }}
        {{ products.length === 1 ? 'prodotto disponibile' : 'prodotti disponibili' }}
      </p>
    </header>

    <div v-if="state === 'error'" class="home__error" role="alert">
      <h2 class="home__error-title">Qualcosa è andato storto</h2>
      <p class="home__error-message">{{ error?.message }}</p>
      <div class="home__error-actions">
        <button type="button" class="button" @click="execute">Riprova</button>
        <RouterLink
          v-if="activeSlug"
          class="button button--ghost"
          :to="{ name: 'home', query: {} }"
        >
          Vedi tutti i prodotti
        </RouterLink>
      </div>
    </div>

    <p v-else-if="state === 'success' && products.length === 0" class="home__empty">
      Nessun prodotto in questa categoria.
    </p>

    <ProductGrid v-else :products="products" :loading="isLoading" />
  </section>
</template>

<style scoped lang="scss">
.home__header {
  margin-bottom: var(--space-6);
}

.home__title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
  letter-spacing: -0.02em;

  @include respond-to('md') {
    font-size: var(--font-size-3xl);
  }
}

.home__count {
  margin-top: var(--space-1);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.home__error {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-md);
}

.home__error-title {
  color: var(--color-danger);
  font-size: var(--font-size-lg);
}

.home__error-message {
  color: var(--color-text-muted);
}

.home__error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.home__empty {
  padding: var(--space-7) 0;
  color: var(--color-text-muted);
  text-align: center;
}
</style>
