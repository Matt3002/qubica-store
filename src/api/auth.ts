import { request } from './http'
import type { LoginCredentials, LoginResponse } from '@/types/auth'

export function login(credentials: LoginCredentials): Promise<LoginResponse> {
  return request<LoginResponse>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
}
