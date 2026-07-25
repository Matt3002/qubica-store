<script setup lang="ts">
import ThemeToggle from '@/components/ThemeToggle.vue'
</script>

<template>
  <header class="app-header">
    <div class="app-header__inner">
      <RouterLink to="/" class="app-header__logo">
        <span class="app-header__logo-mark" aria-hidden="true">◆</span>
        <span class="app-header__logo-text">Strike Store</span>
      </RouterLink>

      <!-- La navigazione per categorie arriva nello Step 4 -->
      <nav class="app-header__nav" aria-label="Categorie prodotti">
        <!-- placeholder -->
      </nav>

      <div class="app-header__actions">
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

  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-height: var(--header-height);
}

.app-header__logo {
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
  flex: 1;
  min-width: 0;
}

.app-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-left: auto;
}
</style>
