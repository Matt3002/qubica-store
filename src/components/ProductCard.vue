<script setup lang="ts">
import type { Product } from '@/types/product'
import { formatCategoryLabel } from '@/utils/category'
import { formatPrice } from '@/utils/format'

defineProps<{ product: Product }>()
</script>

<template>
  <article class="product-card">
    <div class="product-card__media">
      <img
        class="product-card__image"
        :src="product.image"
        :alt="product.title"
        width="300"
        height="300"
        loading="lazy"
      />
    </div>

    <div class="product-card__body">
      <p class="product-card__category">{{ formatCategoryLabel(product.category) }}</p>

      <h3 class="product-card__title">
        <RouterLink
          class="product-card__link"
          :to="{ name: 'product', params: { id: product.id } }"
        >
          {{ product.title }}
        </RouterLink>
      </h3>

      <p class="product-card__price">{{ formatPrice(product.price) }}</p>
    </div>
  </article>
</template>

<style scoped lang="scss">
.product-card {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    border-color var(--transition-fast);

  &:hover {
    transform: translateY(-2px);
    border-color: var(--color-text-muted);
    box-shadow: var(--shadow-md);
  }

  /* Il focus arriva dal link interno: lo mostriamo sulla card intera. */
  &:has(.product-card__link:focus-visible) {
    @include focus-ring;
  }
}

.product-card__media {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  padding: var(--space-4);
  background-color: var(--color-image-bg);
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-card__body {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: var(--space-2);
  padding: var(--space-4);
}

.product-card__category {
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.product-card__title {
  font-size: var(--font-size-base);
  font-weight: 600;

  /* Titoli su due righe: altezza uniforme in tutta la griglia. */
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  overflow: hidden;
}

.product-card__link {
  /* Estende l'area cliccabile a tutta la card mantenendo
     un solo elemento focusabile per la navigazione da tastiera. */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
  }

  &:focus-visible {
    outline: none;
  }
}

.product-card__price {
  margin-top: auto;
  font-size: var(--font-size-lg);
  font-weight: 700;
}
</style>
