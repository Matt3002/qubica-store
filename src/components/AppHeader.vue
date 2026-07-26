<script setup lang="ts">
import CategoryNav from '@/components/CategoryNav.vue'
import CounterLink from '@/components/CounterLink.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useCartStore } from '@/stores/cart'
import { useWishlistStore } from '@/stores/wishlist'

const cart = useCartStore()
const wishlist = useWishlistStore()
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <RouterLink to="/" class="app-header__logo">
        <span class="app-header__logo-mark" aria-hidden="true">◆</span>
        <span class="app-header__logo-text">Strike Store</span>
      </RouterLink>

      <nav class="app-header__nav" aria-label="Categorie prodotti">
        <CategoryNav />
      </nav>

      <div class="app-header__actions">
        <CounterLink
          :to="{ name: 'wishlist' }"
          label="Wishlist"
          icon="♡"
          :count="wishlist.totalItems"
        />
        <CounterLink :to="{ name: 'cart' }" label="Carrello" icon="⛨" :count="cart.totalItems" />
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.app-header {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  transition: background-color var(--transition-base);
}

.app-header__inner {
  @include container;

  display: grid;
  grid-template-areas:
    'logo actions'
    'nav nav';
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: var(--space-2) var(--space-4);
  padding-block: var(--space-3);

  @include respond-to('md') {
    grid-template-areas: 'logo nav actions';
    grid-template-columns: auto 1fr auto;
    min-height: var(--header-height);
    padding-block: 0;
  }
}

.app-header__logo {
  grid-area: logo;
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-lg);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.app-header__logo-mark {
  color: var(--color-primary);
}

.app-header__nav {
  grid-area: nav;
  min-width: 0;
}

.app-header__actions {
  grid-area: actions;
  display: flex;
  align-items: center;
  gap: var(--space-2);
}
</style>
