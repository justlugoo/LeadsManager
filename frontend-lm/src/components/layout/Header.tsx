import React, { useState } from 'react';
import { Bars3Icon, MagnifyingGlassIcon, BellIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useLayout } from './LayoutProvider';
import { useAuth } from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { sidebarOpen, setSidebarOpen } = useLayout();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserMenuOpen(false); // Cerrar el menú
    logout();
  };

  // Extraer nombre y apellido del usuario
  let fullName = 'Usuario';
  let userType = 'user';
  if (user) {
    if (user.full_name) {
      fullName = user.full_name;
    } else if (user.first_name && user.last_name) {
      fullName = `${user.first_name} ${user.last_name}`;
    } else if (user.email) {
      fullName = user.email.split('@')[0];
    }
    // Si en el futuro hay roles, aquí se puede ajustar
    userType = 'user';
  }

  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="/leads-manager-icon-simple.svg" alt="Logo Leads Manager" className="w-8 h-8 md:w-10 md:h-10 filter invert" />
            <span className="text-xl md:text-2xl font-bold text-white">Leads Manager</span>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden p-2 rounded-md text-light-300 hover:text-light-100 hover:bg-dark-700 transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <div className="hidden sm:block">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-light-300" />
              <input
                type="text"
                placeholder="Buscar leads..."
                className="w-64 pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-light-100 placeholder-light-300 focus:outline-none focus:ring-2 focus:ring-primary-start focus:border-transparent"
              />
            </div>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-light-300 hover:text-light-100 hover:bg-dark-700 rounded-lg transition-colors">
            <BellIcon className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-dark-700 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-light-100">
                  {fullName}
                </p>
                <p className="text-xs text-primary-end font-semibold uppercase tracking-wider">
                  {userType}
                </p>
              </div>
            </button>
            {/* Dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-1 z-50">
                <button
                  onClick={() => { setUserMenuOpen(false); navigate('/profile'); }}
                  className="block w-full text-left px-4 py-2 text-sm text-light-200 hover:bg-dark-700 hover:text-light-100"
                >
                  Mi Perfil
                </button>
                <a href="#" className="block px-4 py-2 text-sm text-light-200 hover:bg-dark-700 hover:text-light-100">
                  Configuración
                </a>
                <hr className="border-dark-700 my-1" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-light-200 hover:bg-dark-700 hover:text-light-100 transition-colors"
                >
                  <ArrowRightOnRectangleIcon className="w-5 h-5" />
                  <span>Cerrar sesión</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}; 