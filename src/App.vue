<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'
</script>

<template>
  <a class="skip-link" href="#main-content">Salta al contenuto</a>

  <AppHeader />

  <main id="main-content" class="app-main">
    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </main>
</template>

<style scoped lang="scss">
.app-main {
  @include container;

  padding-block: var(--space-6) var(--space-8);
}
</style>
