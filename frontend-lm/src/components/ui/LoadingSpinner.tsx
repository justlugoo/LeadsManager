import React from 'react';

// Este componente es ideal para mostrar estados de carga en los formularios de AuthCard (login/registro)
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <div className={`animate-spin rounded-full border-2 border-primary-start border-t-transparent ${sizes[size]}`} />
    </div>
  );
}; 