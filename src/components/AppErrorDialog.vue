<script setup lang="ts">
import BaseModal from '@/components/BaseModal.vue'
import { useErrorDialog } from '@/composables/useErrorDialog'

const dialog = useErrorDialog()
</script>

<template>
  <BaseModal :open="dialog.isOpen.value" title="Qualcosa è andato storto" @close="dialog.close">
    <p>{{ dialog.message.value }}</p>
    <p class="app-error-dialog__hint">
      Controlla la connessione e riprova. Se il problema persiste, riprova più tardi.
    </p>

    <template #actions>
      <button type="button" class="button button--ghost" @click="dialog.close">Chiudi</button>
      <button v-if="dialog.hasRetry()" type="button" class="button" @click="dialog.retry">
        Riprova
      </button>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.app-error-dialog__hint {
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
}
</style>
