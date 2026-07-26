<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  title: string
}>()

const emit = defineEmits<{ close: [] }>()

const dialogRef = ref<HTMLDialogElement | null>(null)

watch(
  () => props.open,
  (isOpen) => {
    const dialog = dialogRef.value
    if (!dialog) return

    // showModal() dà gratis: focus trap, Escape, inerzia del resto
    // della pagina e backdrop. Non serve implementarli a mano.
    if (isOpen && !dialog.open) dialog.showModal()
    if (!isOpen && dialog.open) dialog.close()
  },
)

/** Chiude cliccando sul backdrop: il click ha come target il <dialog> stesso. */
function handleBackdropClick(event: MouseEvent): void {
  if (event.target === dialogRef.value) emit('close')
}

onBeforeUnmount(() => dialogRef.value?.close())
</script>

<template>
  <dialog
    ref="dialogRef"
    class="modal"
    :aria-label="title"
    @close="emit('close')"
    @click="handleBackdropClick"
  >
    <div class="modal__panel">
      <h2 class="modal__title">{{ title }}</h2>

      <div class="modal__body">
        <slot />
      </div>

      <footer class="modal__footer">
        <slot name="actions" />
      </footer>
    </div>
  </dialog>
</template>

<style scoped lang="scss">
.modal {
  width: min(440px, calc(100vw - 2 * var(--space-4)));
  padding: 0;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-lg);
  color: var(--color-text);

  &::backdrop {
    background-color: rgb(0 0 0 / 0.5);
  }

  &[open] {
    animation: modal-in var(--transition-base) ease;
  }
}

.modal__panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  padding: var(--space-6);
}

.modal__title {
  font-size: var(--font-size-lg);
  font-weight: 700;
}

.modal__body {
  color: var(--color-text-muted);
}

.modal__footer {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: var(--space-3);
}

@keyframes modal-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}
</style>
