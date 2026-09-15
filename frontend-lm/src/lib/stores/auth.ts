import { writable } from 'svelte/store'
import { push } from 'svelte-spa-router'
import { apiService, setUnauthorizedHandler } from '../api'
import { routes } from '../routes'
import type { User, UserCreate } from '../types'

export const token = writable<string | null>(localStorage.getItem('leadsManagerToken'))
export const user = writable<User | null>(null)

function clearSession() {
  localStorage.removeItem('leadsManagerToken')
  token.set(null)
  user.set(null)
}

// Cubre tanto el token inválido al cargar la página como una sesión que
// expira mientras se está usando la app: cualquier 401 termina aquí.
setUnauthorizedHandler(clearSession)

async function fetchAndSetUser(): Promise<boolean> {
  try {
    const res = await apiService.getCurrentUser()
    user.set(res.data)
    return true
  } catch {
    user.set(null)
    return false
  }
}

function setSession(newToken: string) {
  localStorage.setItem('leadsManagerToken', newToken)
  token.set(newToken)
}

function extractErrorMessage(error: unknown, fallback: string): string {
  const detail = (error as { response?: { data?: { detail?: string } } })?.response?.data?.detail
  return detail ?? fallback
}

// Si ya había un token guardado (recarga de página), valida la sesión al
// iniciar; si el token ya no sirve, clearSession() se dispara solo vía el
// interceptor de 401 de arriba.
if (localStorage.getItem('leadsManagerToken')) {
  fetchAndSetUser()
}

export async function register(data: UserCreate) {
  try {
    const response = await apiService.register(data)
    setSession(response.data.access_token)
    await fetchAndSetUser()
    push(routes.app.dashboard)
    return { success: true }
  } catch (error) {
    return { success: false, error: extractErrorMessage(error, 'Ocurrió un error al registrarse.') }
  }
}

export async function login(email: string, password: string) {
  try {
    const response = await apiService.login({ email, password })
    setSession(response.data.access_token)
    await fetchAndSetUser()
    push(routes.app.dashboard)
    return { success: true }
  } catch (error) {
    return { success: false, error: extractErrorMessage(error, 'Ocurrió un error al iniciar sesión.') }
  }
}

export function logout() {
  clearSession()
  push(routes.auth)
}
