import { HomeIcon, UsersIcon, UserIcon } from '@heroicons/react/24/outline';
import { routes } from 'routes';

export const navigationItems = [
  {
    name: 'Dashboard',
    icon: HomeIcon,
    href: routes.app.dashboard,
  },
  {
    name: 'Leads',
    icon: UsersIcon,
    href: routes.app.leads,
  },
  {
    name: 'Perfil',
    icon: UserIcon,
    href: routes.app.profile,
  },
]; 