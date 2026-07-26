<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

async function handleLogout(): Promise<void> {
  auth.logout()

  // Se siamo su una pagina protetta, la guardia non scatta
  // sulla rotta corrente: il rimando va fatto qui.
  if (route.meta.requiresAuth) {
    await router.replace({ name: 'home' })
  }
}
</script>

<template>
  <div class="user-menu">
    <template v-if="auth.isAuthenticated">
      <span class="user-menu__name">{{ auth.username }}</span>
      <button type="button" class="user-menu__button" @click="handleLogout">Esci</button>
    </template>

    <RouterLink v-else class="user-menu__button" :to="{ name: 'login' }"> Accedi </RouterLink>
  </div>
</template>

<style scoped lang="scss">
.user-menu {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.user-menu__name {
  display: none;
  color: var(--color-text-muted);
  font-size: var(--font-size-sm);

  @include respond-to('md') {
    display: inline;
  }
}

.user-menu__button {
  padding: var(--space-2) var(--space-3);
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  white-space: nowrap;
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);

  &:hover {
    background-color: var(--color-surface-alt);
    border-color: var(--color-text-muted);
  }
}
</style>
