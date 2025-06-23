import React from 'react';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

export interface AlertProps {
  type?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  children: React.ReactNode;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  children,
  onClose,
  className = ''
}) => {
  const types = {
    info: {
      bg: 'bg-blue-50 border-blue-200',
      icon: InformationCircleIcon,
      iconColor: 'text-blue-500',
      textColor: 'text-blue-800'
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      icon: CheckCircleIcon,
      iconColor: 'text-green-500',
      textColor: 'text-green-800'
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      icon: ExclamationTriangleIcon,
      iconColor: 'text-yellow-500',
      textColor: 'text-yellow-800'
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      icon: ExclamationCircleIcon,
      iconColor: 'text-red-500',
      textColor: 'text-red-800'
    }
  };

  const config = types[type];
  const IconComponent = config.icon;

  return (
    <div className={`border rounded-lg p-4 ${config.bg} ${className}`}>
      <div className="flex">
        <IconComponent className={`w-5 h-5 ${config.iconColor} flex-shrink-0`} />
        <div className="ml-3 flex-1">
          {title && (
            <h3 className={`text-sm font-medium ${config.textColor}`}>
              {title}
            </h3>
          )}
          <div className={`text-sm ${config.textColor} ${title ? 'mt-1' : ''}`}>
            {children}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`ml-auto pl-3 ${config.textColor} hover:opacity-70`}
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
}; 