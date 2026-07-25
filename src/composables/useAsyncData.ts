import { ref, shallowRef } from 'vue'
import { ApiError } from '@/api/http'

export type AsyncState = 'idle' | 'loading' | 'success' | 'error'

/**
 * Incapsula il ciclo di vita di una chiamata asincrona:
 * stato, dati ed errore in un unico posto.
 */
export function useAsyncData<T>(loader: () => Promise<T>) {
  // shallowRef: i dati sono immutabili e sostituiti in blocco,
  // non serve la reattività profonda su ogni prodotto dell'array.
  const data = shallowRef<T | null>(null)
  const error = ref<ApiError | null>(null)
  const state = ref<AsyncState>('idle')

  // Protegge dalle race condition: se parte una seconda richiesta
  // prima che la prima risponda, la risposta obsoleta viene scartata.
  let requestId = 0

  async function execute(): Promise<void> {
    const currentId = ++requestId
    state.value = 'loading'
    error.value = null

    try {
      const result = await loader()
      if (currentId !== requestId) return
      data.value = result
      state.value = 'success'
    } catch (caught) {
      if (currentId !== requestId) return
      error.value = caught instanceof ApiError ? caught : new ApiError('Si è verificato un errore.')
      state.value = 'error'
    }
  }

  return { data, error, state, execute }
}
