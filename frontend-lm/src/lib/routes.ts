export const routes = {
  auth: '/auth',
  app: {
    dashboard: '/dashboard',
    leads: '/leads',
    leadForm: '/leads/form',
    leadDetail: (id: number | string) => `/leads/${id}`,
    profile: '/profile',
  },
}
