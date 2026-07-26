<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoriesStore } from '@/stores/categories'
import { formatCategoryLabel, toSlug } from '@/utils/category'

const route = useRoute()
const store = useCategoriesStore()

const activeSlug = computed(() => (route.query.category as string | undefined) ?? null)

const links = computed(() =>
  store.categories.map((category) => ({
    slug: toSlug(category),
    label: formatCategoryLabel(category),
  })),
)

onMounted(() => {
  // L'errore è già registrato nello store: qui non deve
  // propagarsi come unhandled rejection.
  store.ensureLoaded().catch(() => {})
})
</script>

<template>
  <ul class="category-nav">
    <li v-if="store.isLoading" class="category-nav__loading" aria-hidden="true">
      <span v-for="n in 4" :key="n" class="category-nav__placeholder"></span>
    </li>

    <template v-else>
      <li>
        <RouterLink
          class="category-nav__link"
          :class="{ 'category-nav__link--active': activeSlug === null }"
          :aria-current="activeSlug === null ? 'page' : undefined"
          :to="{ name: 'home', query: {} }"
        >
          Tutti
        </RouterLink>
      </li>

      <li v-for="link in links" :key="link.slug">
        <RouterLink
          class="category-nav__link"
          :class="{ 'category-nav__link--active': activeSlug === link.slug }"
          :aria-current="activeSlug === link.slug ? 'page' : undefined"
          :to="{ name: 'home', query: { category: link.slug } }"
        >
          {{ link.label }}
        </RouterLink>
      </li>
    </template>
  </ul>
</template>

<style scoped lang="scss">
.category-nav {
  display: flex;
  gap: var(--space-1);
  align-items: center;
  list-style: none;
  padding: 0;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.category-nav__link {
  display: block;
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);
  white-space: nowrap;
  transition:
    background-color var(--transition-fast),
    color var(--transition-fast);

  &:hover {
    background-color: var(--color-surface-alt);
    color: var(--color-text);
  }

  &--active {
    background-color: var(--color-primary);
    color: var(--color-on-primary);

    &:hover {
      background-color: var(--color-primary-hover);
      color: var(--color-on-primary);
    }
  }
}

.category-nav__loading {
  display: flex;
  gap: var(--space-2);
}

.category-nav__placeholder {
  width: 80px;
  height: 32px;
  background-color: var(--color-skeleton);
  border-radius: var(--radius-full);
}
</style>
