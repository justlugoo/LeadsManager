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