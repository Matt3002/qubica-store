<script setup lang="ts">
import { computed, watch } from 'vue'
import { getProductById } from '@/api/products'
import { useAsyncData } from '@/composables/useAsyncData'
import { formatCategoryLabel, toSlug } from '@/utils/category'
import { formatPrice } from '@/utils/format'

const props = defineProps<{ id: number }>()

const { data: product, error, state, execute } = useAsyncData(() => getProductById(props.id))

const isLoading = computed(() => state.value === 'loading' || state.value === 'idle')

const categoryLink = computed(() => {
  if (!product.value) return null
  return {
    label: formatCategoryLabel(product.value.category),
    slug: toSlug(product.value.category),
  }
})

// Il router riusa il componente se si naviga da /product/1 a /product/2:
// senza watch sull'id, il secondo prodotto non verrebbe mai caricato.
watch(() => props.id, execute, { immediate: true })
</script>

<template>
  <div class="product-view">
    <nav class="product-view__breadcrumb" aria-label="Percorso di navigazione">
      <RouterLink class="product-view__back" :to="{ name: 'home', query: {} }">
        <span aria-hidden="true">&larr;</span> Torna ai prodotti
      </RouterLink>
    </nav>

    <div v-if="isLoading" class="product-view__layout" aria-busy="true">
      <div class="product-view__media product-view__media--skeleton"></div>
      <div class="product-view__body">
        <span class="skeleton-line skeleton-line--short"></span>
        <span class="skeleton-line skeleton-line--title"></span>
        <span class="skeleton-line skeleton-line--medium"></span>
        <span class="skeleton-line"></span>
        <span class="skeleton-line"></span>
        <span class="skeleton-line skeleton-line--medium"></span>
      </div>
    </div>

    <div v-else-if="state === 'error'" class="product-view__error" role="alert">
      <h1 class="product-view__error-title">Prodotto non disponibile</h1>
      <p class="product-view__error-message">{{ error?.message }}</p>
      <div class="product-view__error-actions">
        <button type="button" class="button" @click="execute">Riprova</button>
        <RouterLink class="button button--ghost" :to="{ name: 'home', query: {} }">
          Vedi tutti i prodotti
        </RouterLink>
      </div>
    </div>

    <article v-else-if="product" class="product-view__layout">
      <div class="product-view__media">
        <img
          class="product-view__image"
          :src="product.image"
          :alt="product.title"
          width="600"
          height="600"
        />
      </div>

      <div class="product-view__body">
        <RouterLink
          v-if="categoryLink"
          class="product-view__category"
          :to="{ name: 'home', query: { category: categoryLink.slug } }"
        >
          {{ categoryLink.label }}
        </RouterLink>

        <h1 class="product-view__title">{{ product.title }}</h1>

        <p class="product-view__rating">
          <span aria-hidden="true">★</span>
          <span>{{ product.rating.rate.toFixed(1) }}</span>
          <span class="product-view__rating-count"> ({{ product.rating.count }} recensioni) </span>
        </p>

        <p class="product-view__price">{{ formatPrice(product.price) }}</p>

        <div class="product-view__description">
          <h2 class="product-view__description-title">Descrizione</h2>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="scss">
.product-view__breadcrumb {
  margin-bottom: var(--space-5);
}

.product-view__back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) 0;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-text);
  }
}

.product-view__layout {
  display: grid;
  gap: var(--space-6);

  @include respond-to('md') {
    grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
    gap: var(--space-7);
    align-items: start;
  }
}

.product-view__media {
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  padding: var(--space-6);
  background-color: var(--color-image-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  &--skeleton {
    background-color: var(--color-skeleton);
  }
}

.product-view__image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.product-view__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.product-view__category {
  align-self: flex-start;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-surface-alt);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  font-size: var(--font-size-xs);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);

  &:hover {
    background-color: var(--color-primary);
    color: var(--color-on-primary);
  }
}

.product-view__title {
  font-size: var(--font-size-xl);
  font-weight: 700;
  letter-spacing: -0.02em;

  @include respond-to('md') {
    font-size: var(--font-size-2xl);
  }
}

.product-view__rating {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
}

.product-view__rating-count {
  color: var(--color-text-muted);
}

.product-view__price {
  font-size: var(--font-size-3xl);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.product-view__description {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
  color: var(--color-text-muted);
}

.product-view__description-title {
  color: var(--color-text);
  font-size: var(--font-size-base);
  font-weight: 600;
}

.product-view__error {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-danger);
  border-radius: var(--radius-md);
}

.product-view__error-title {
  color: var(--color-danger);
  font-size: var(--font-size-xl);
}

.product-view__error-message {
  color: var(--color-text-muted);
}

.product-view__error-actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.skeleton-line {
  height: 1rem;
  background-color: var(--color-skeleton);
  border-radius: var(--radius-sm);

  &--title {
    height: 2rem;
  }

  &--short {
    width: 30%;
  }

  &--medium {
    width: 60%;
  }
}
</style>
