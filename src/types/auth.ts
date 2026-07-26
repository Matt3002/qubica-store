export interface LoginCredentials {
  username: string
  password: string
}

/** Risposta di POST /auth/login */
export interface LoginResponse {
  token: string
}

/**
 * La Fake Store API restituisce solo il token, senza dati utente.
 * Conserviamo lo username inserito per poterlo mostrare nell'header.
 */
export interface AuthSession {
  token: string
  username: string
}
