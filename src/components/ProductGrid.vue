<script setup lang="ts">
import type { Product } from '@/types/product'
import ProductCard from '@/components/ProductCard.vue'
import SkeletonCard from '@/components/SkeletonCard.vue'

withDefaults(
  defineProps<{
    products: Product[]
    loading?: boolean
    skeletonCount?: number
  }>(),
  {
    loading: false,
    skeletonCount: 8,
  },
)
</script>

<template>
  <ul class="product-grid" :aria-busy="loading">
    <template v-if="loading">
      <li v-for="n in skeletonCount" :key="`skeleton-${n}`">
        <SkeletonCard />
      </li>
    </template>

    <template v-else>
      <li v-for="product in products" :key="product.id">
        <ProductCard :product="product" />
      </li>
    </template>
  </ul>
</template>

<style scoped lang="scss">
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-5);
  list-style: none;
  padding: 0;

  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
}
</style>
