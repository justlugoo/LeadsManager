import React from 'react';

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'gradient';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  size = 'md',
  children,
  className = ''
}) => {
  const variants = {
    default: 'bg-dark-700 text-light-200',
    primary: 'bg-primary-start bg-opacity-10 text-primary-start',
    success: 'bg-green-100 text-green-600',
    warning: 'bg-yellow-900/20 text-yellow-400 border border-yellow-700',
    danger: 'bg-red-900/20 text-red-400 border border-red-700',
    gradient: 'bg-gradient-primary text-white'
  };
  
  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm'
  };
  
  return (
    <span className={`inline-flex items-center rounded-full font-medium ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

// Este componente puede ser útil para mostrar estados en AuthCard si se requiere 