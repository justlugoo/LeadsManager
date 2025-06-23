export const routes = {
  auth: {
    login: '/login',
    register: '/register',
  },
  app: {
    dashboard: '/dashboard',
    leads: '/leads',
    leadDetail: (id = ':id') => `/leads/${id}`,
    profile: '/profile',
  },
}; 