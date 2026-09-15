import axios from 'axios'
import type { Token, User, UserCreate } from './types'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('leadsManagerToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// El store de auth se registra aquí (en vez de que este módulo lo importe
// directamente) para evitar un import circular api.ts <-> stores/auth.ts.
let onUnauthorized: (() => void) | null = null
export function setUnauthorizedHandler(handler: () => void) {
  onUnauthorized = handler
}

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      onUnauthorized?.()
    }
    return Promise.reject(error)
  },
)

export interface LoginCredentials {
  email: string
  password: string
}

export const apiService = {
  login: (credentials: LoginCredentials) => {
    const formData = new URLSearchParams()
    formData.append('username', credentials.email)
    formData.append('password', credentials.password)

    return api.post<Token>('/auth/token', formData, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
  },

  register: (data: UserCreate) => api.post<Token>('/users/', data),

  getCurrentUser: () => api.get<User>('/users/me'),

  get: <T = unknown>(url: string) => api.get<T>(url),
  post: <T = unknown>(url: string, data?: unknown) => api.post<T>(url, data),
  put: <T = unknown>(url: string, data?: unknown) => api.put<T>(url, data),
  delete: <T = unknown>(url: string) => api.delete<T>(url),
}

export default api
