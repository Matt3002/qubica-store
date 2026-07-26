import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { login as loginRequest } from '@/api/auth'
import { ApiError } from '@/api/http'
import type { AuthSession, LoginCredentials } from '@/types/auth'
import { readJson, writeJson } from '@/utils/storage'

const STORAGE_KEY = 'qubica-store:auth'

export const useAuthStore = defineStore('auth', () => {
  const session = ref<AuthSession | null>(readJson<AuthSession | null>(STORAGE_KEY, null))
  const isSubmitting = ref(false)
  const error = ref<ApiError | null>(null)

  const isAuthenticated = computed(() => session.value !== null)
  const username = computed(() => session.value?.username ?? null)

  async function login(credentials: LoginCredentials): Promise<void> {
    isSubmitting.value = true
    error.value = null

    try {
      const { token } = await loginRequest(credentials)
      session.value = { token, username: credentials.username }
      writeJson(STORAGE_KEY, session.value)
    } catch (caught) {
      // 401: credenziali errate. Tutto il resto è un problema tecnico.
      if (caught instanceof ApiError && caught.status === 401) {
        error.value = new ApiError('Username o password non corretti.', 401)
      } else {
        error.value = caught instanceof ApiError ? caught : new ApiError('Login non riuscito.')
      }
      throw error.value
    } finally {
      isSubmitting.value = false
    }
  }

  function logout(): void {
    session.value = null
    error.value = null
    writeJson(STORAGE_KEY, null)
  }

  return { session, isAuthenticated, username, isSubmitting, error, login, logout }
})
