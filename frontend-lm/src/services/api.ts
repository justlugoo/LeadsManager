import axios from 'axios'
import type { UserCreate } from 'types';

// --- Instancia Base de la API ---
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// --- Interceptor para Añadir el Token de Autenticación ---
// Esta función se ejecuta antes de que cada petición sea enviada.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('leadsManagerToken');
    if (token) {
      // Si existe un token, lo añade a la cabecera de Autorización.
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; // Devuelve la configuración modificada.
  },
  (error) => {
    // Maneja un error en la petición.
    return Promise.reject(error);
  }
);

// --- Definición de Tipos para nuestra API ---

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface User {
    email: string;
    id: number;
    full_name: string;
    is_active: boolean;
}

// --- Funciones de Servicio de la API ---
// Un objeto que agrupa todas nuestras llamadas a la API.
export const apiService = {
    
    login: (credentials: LoginCredentials) => {
        // El ayudante OAuth2 del backend espera datos de formulario, no JSON.
        const formData = new URLSearchParams();
        // El backend espera que el campo se llame 'username'.
        formData.append('username', credentials.email); 
        formData.append('password', credentials.password);
        
        return api.post<AuthResponse>('/auth/token', formData, {
            // Necesitamos sobreescribir el 'Content-Type' por defecto para esta petición específica.
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });
    },

    register: (data: UserCreate) => {
        // El endpoint de registro espera JSON, así que esta llamada es directa.
        return api.post<AuthResponse>('/users/', data);
    },

    getCurrentUser: () => {
        // El interceptor añadirá la cabecera con el token automáticamente.
        return api.get<User>('/users/me');
    },

    // Métodos HTTP genéricos para otros endpoints
    get: <T = any>(url: string) => {
        return api.get<T>(url);
    },

    post: <T = any>(url: string, data?: any) => {
        return api.post<T>(url, data);
    },

    put: <T = any>(url: string, data?: any) => {
        return api.put<T>(url, data);
    },

    delete: <T = any>(url: string) => {
        return api.delete<T>(url);
    },
};

// Aún podemos exportar la instancia base por si alguna vez necesitamos hacer una
// llamada sin el interceptor, pero generalmente es mejor usar las funciones de servicio.
export default api