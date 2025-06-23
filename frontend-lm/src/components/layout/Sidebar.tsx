import React from 'react';
import { ChartBarIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLayout } from './LayoutProvider';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
  current?: boolean;
  count?: number;
}

export const Sidebar: React.FC<{ navigation: NavItem[] }> = ({ navigation }) => {
  const { sidebarOpen, setSidebarOpen } = useLayout();

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-dark-800 border-r border-dark-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between p-4 border-b border-dark-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <ChartBarIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-light-100">LeadsCRM</h1>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-light-300 hover:text-light-100 hover:bg-dark-700"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${item.current 
                  ? 'bg-primary-start text-white shadow-lg' 
                  : 'text-light-300 hover:text-light-100 hover:bg-dark-700'
                }
              `}
            >
              <span className="w-5 h-5">{item.icon}</span>
              {item.name}
              {item.count && (
                <span className="ml-auto bg-dark-700 text-light-200 px-2 py-0.5 rounded-full text-xs">
                  {item.count}
                </span>
              )}
            </a>
          ))}
        </nav>
        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-dark-700">
          <div className="flex items-center justify-between text-xs text-light-300">
            <span>© 2024 LeadsCRM</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </>
  );
}; 