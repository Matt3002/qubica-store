<script setup lang="ts">
import ProductGrid from '@/components/ProductGrid.vue'
import { useWishlistStore } from '@/stores/wishlist'

const wishlist = useWishlistStore()
</script>

<template>
  <section class="wishlist">
    <header class="wishlist__header">
      <h1 class="wishlist__title">Wishlist</h1>
      <button
        v-if="!wishlist.isEmpty"
        type="button"
        class="button button--ghost"
        @click="wishlist.clear()"
      >
        Svuota
      </button>
    </header>

    <p v-if="wishlist.isEmpty" class="wishlist__empty">
      Non hai ancora salvato nessun prodotto.
      <RouterLink class="wishlist__empty-link" :to="{ name: 'home', query: {} }">
        Sfoglia i prodotti
      </RouterLink>
    </p>

    <ProductGrid v-else :products="wishlist.products" />
  </section>
</template>

<style scoped lang="scss">
.wishlist__header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.wishlist__title {
  font-size: var(--font-size-2xl);
  font-weight: 700;
}

.wishlist__empty {
  padding: var(--space-7) 0;
  color: var(--color-text-muted);
  text-align: center;
}

.wishlist__empty-link {
  color: var(--color-primary);
  text-decoration: underline;
}
</style>
