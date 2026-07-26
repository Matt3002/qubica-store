import { ref } from 'vue'

// Stato a livello di modulo: una sola modale per tutta l'app.
const isOpen = ref(false)
const message = ref('')
let retryAction: (() => void) | null = null

export function useErrorDialog() {
  function open(text: string, retry?: () => void): void {
    message.value = text
    retryAction = retry ?? null
    isOpen.value = true
  }

  function close(): void {
    isOpen.value = false
    retryAction = null
  }

  function retry(): void {
    const action = retryAction
    close()
    action?.()
  }

  return {
    isOpen,
    message,
    hasRetry: () => retryAction !== null,
    open,
    close,
    retry,
  }
}
