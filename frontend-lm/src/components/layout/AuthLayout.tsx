import React from 'react';
import { ChartBarIcon } from '@heroicons/react/24/outline';

export const AuthLayout: React.FC<{
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}> = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
            <ChartBarIcon className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-light-100">{title}</h2>
          {subtitle && (
            <p className="mt-2 text-light-300">{subtitle}</p>
          )}
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}; 