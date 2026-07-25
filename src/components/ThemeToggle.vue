<script setup lang="ts">
import { computed } from 'vue'
import { useTheme } from '@/composables/useTheme'

const { theme, toggleTheme } = useTheme()

const label = computed(() =>
  theme.value === 'dark' ? 'Passa al tema chiaro' : 'Passa al tema scuro',
)
</script>

<template>
  <button
    type="button"
    class="theme-toggle"
    :aria-label="label"
    :title="label"
    @click="toggleTheme"
  >
    <span aria-hidden="true">{{ theme === 'dark' ? '☀' : '☾' }}</span>
  </button>
</template>

<style scoped lang="scss">
.theme-toggle {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  background-color: transparent;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  font-size: var(--font-size-lg);
  transition:
    background-color var(--transition-fast),
    border-color var(--transition-fast);

  &:hover {
    background-color: var(--color-surface-alt);
    border-color: var(--color-text-muted);
  }
}
</style>
