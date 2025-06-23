import React from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  actions,
  className = '',
  onClick,
  hover = false
}) => {
  return (
    <div 
      className={`
        bg-dark-800 rounded-xl border border-dark-700 p-6 transition-all duration-200
        ${hover ? 'hover:border-primary-start hover:shadow-lg hover:shadow-primary-start/10' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {(title || subtitle || actions) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-light-100">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-light-300 mt-1">{subtitle}</p>
            )}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      )}
      {children}
    </div>
  );
}; 