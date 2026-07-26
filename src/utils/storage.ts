/**
 * Accesso a localStorage tollerante ai guasti.
 * In modalità privata o con storage pieno le API lanciano:
 * l'app deve continuare a funzionare, semplicemente senza persistenza.
 */

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

export function writeJson(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Persistenza non disponibile: si prosegue con lo stato in memoria.
  }
}
