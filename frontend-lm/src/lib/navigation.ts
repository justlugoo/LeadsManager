import HomeIcon from './icons/HomeIcon.svelte'
import UsersIcon from './icons/UsersIcon.svelte'
import UserIcon from './icons/UserIcon.svelte'
import { routes } from './routes'
import type { NavItem } from './types'

export const navigationItems: NavItem[] = [
  { name: 'Dashboard', icon: HomeIcon, href: routes.app.dashboard },
  { name: 'Leads', icon: UsersIcon, href: routes.app.leads },
  { name: 'Perfil', icon: UserIcon, href: routes.app.profile },
]
