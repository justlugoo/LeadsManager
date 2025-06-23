import React, { useState } from 'react';
import { Bars3Icon, MagnifyingGlassIcon, BellIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useLayout } from './LayoutProvider';
import { useAuth } from 'hooks/useAuth';

export const Header: React.FC = () => {
  const { sidebarOpen, setSidebarOpen, currentUser } = useLayout();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { logout } = useAuth();

  const handleLogout = () => {
    setUserMenuOpen(false); // Cerrar el menú
    logout();
  };

  return (
    <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left side */}
        <div className="flex items-center gap-4">
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
                  {currentUser?.name || 'Usuario'}
                </p>
                <p className="text-xs text-light-300">
                  {currentUser?.email || 'usuario@ejemplo.com'}
                </p>
              </div>
            </button>
            {/* Dropdown menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-dark-800 border border-dark-700 rounded-lg shadow-lg py-1 z-50">
                <a href="#" className="block px-4 py-2 text-sm text-light-200 hover:bg-dark-700 hover:text-light-100">
                  Mi Perfil
                </a>
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