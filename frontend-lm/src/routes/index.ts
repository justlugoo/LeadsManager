export const routes = {
  auth: {
    login: '/login',
    register: '/register',
  },
  app: {
    dashboard: '/dashboard',
    leads: '/leads',
    leadForm: '/leads/form',
    leadDetail: (id = ':id') => `/leads/${id}`,
    profile: '/profile',
  },
};

// Ejemplo de uso en tu sistema de rutas (App.tsx o similar):
// <Route path="/auth" element={<AuthCard />} />
// <Route path="/login" element={<Navigate to="/auth" replace />} />
// <Route path="/register" element={<Navigate to="/auth" replace />} />

// Para implementar la tarjeta sliding de login/registro:
// 1. Importa AuthCard desde 'components/auth/AuthCard'
// 2. Agrega la ruta: { path: '/auth', element: <AuthCard /> }
// 3. Haz que /login y /register redirijan a /auth con Navigate 