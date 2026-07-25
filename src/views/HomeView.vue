<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { getProducts } from '@/api/products'
import ProductGrid from '@/components/ProductGrid.vue'
import { useAsyncData } from '@/composables/useAsyncData'

const { data, error, state, execute } = useAsyncData(getProducts)

const products = computed(() => data.value ?? [])
const isLoading = computed(() => state.value === 'loading' || state.value === 'idle')

onMounted(execute)
</script>

<template>
  <section class="home">
    <header class="home__header">
      <h1 class="home__title">Tutti i prodotti</h1>
      <p v-if="state === 'success'" class="home__count">
        {{ products.length }} prodotti disponibili
      </p>
    </header>

    <div v-if="state === 'error'" class="home__error" role="alert">
      <h2 class="home__error-title">Qualcosa è andato storto</h2>
      <p class="home__error-message">{{ error?.message }}</p>
      <button type="button" class="home__retry" @click="execute">Riprova</button>
    </div>

    <p v-else-if="state === 'success' && products.length === 0" class="home__empty">
      Nessun prodotto disponibile al momento.
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

.home__retry {
  padding: var(--space-2) var(--space-5);
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border: none;
  border-radius: var(--radius-sm);
  font-weight: 600;
  transition: background-color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary-hover);
  }
}

.home__empty {
  padding: var(--space-7) 0;
  color: var(--color-text-muted);
  text-align: center;
}
</style>
