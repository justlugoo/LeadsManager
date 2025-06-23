import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <nav className="flex gap-4">
      {/* Aquí puedes agregar enlaces de navegación */}
      <a href="/dashboard" className="text-light-100 hover:text-primary-start font-medium py-2 px-3 rounded transition-colors">Dashboard</a>
      <a href="/leads" className="text-light-100 hover:text-primary-start font-medium py-2 px-3 rounded transition-colors">Leads</a>
      <a href="/profile" className="text-light-100 hover:text-primary-start font-medium py-2 px-3 rounded transition-colors">Perfil</a>
    </nav>
  );
}; 