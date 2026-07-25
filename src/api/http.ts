/**
 * Client HTTP minimale attorno a fetch.
 * Unico punto in cui si costruiscono le URL e si normalizzano gli errori.
 */

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://fakestoreapi.com'
const DEFAULT_TIMEOUT_MS = 10_000

/** Errore applicativo: distingue HTTP, rete e timeout. */
export class ApiError extends Error {
  readonly status: number | null

  constructor(message: string, status: number | null = null) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }

  /** true se il server non è stato raggiunto (offline, DNS, timeout). */
  get isNetworkError(): boolean {
    return this.status === null
  }
}

export async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  let response: Response

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      signal: options.signal ?? AbortSignal.timeout(DEFAULT_TIMEOUT_MS),
      headers: { Accept: 'application/json', ...options.headers },
    })
  } catch (error) {
    // fetch rigetta solo per problemi di rete, non per status 4xx/5xx.
    if (error instanceof DOMException && error.name === 'TimeoutError') {
      throw new ApiError('La richiesta ha impiegato troppo tempo.')
    }
    throw new ApiError('Impossibile contattare il server.')
  }

  if (!response.ok) {
    throw new ApiError(`Richiesta fallita con stato ${response.status}.`, response.status)
  }

  try {
    return (await response.json()) as T
  } catch {
    throw new ApiError('Risposta del server non valida.')
  }
}
