<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router'

const props = defineProps<{
  to: RouteLocationRaw
  label: string
  icon: string
  count: number
}>()

const ariaLabel = () =>
  props.count === 0 ? props.label : `${props.label}: ${props.count} elementi`
</script>

<template>
  <RouterLink class="counter-link" :to="to" :aria-label="ariaLabel()">
    <span class="counter-link__icon" aria-hidden="true">{{ icon }}</span>
    <Transition name="pop">
      <span v-if="count > 0" class="counter-link__badge" aria-hidden="true">
        {{ count > 99 ? '99+' : count }}
      </span>
    </Transition>
  </RouterLink>
</template>

<style scoped lang="scss">
.counter-link {
  position: relative;
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
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

.counter-link__badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  padding: 0 var(--space-1);
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: 700;
  line-height: 20px;
  text-align: center;
}

.pop-enter-active,
.pop-leave-active {
  transition:
    transform var(--transition-fast),
    opacity var(--transition-fast);
}

.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: scale(0.5);
}
</style>
