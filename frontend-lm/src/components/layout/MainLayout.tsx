import React from 'react';
import { LayoutProvider } from './LayoutProvider';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import type { NavItem } from 'types';

export const MainLayout: React.FC<{
  children: React.ReactNode;
  navigation?: NavItem[];
}> = ({ children, navigation = [] }) => {
  return (
    <LayoutProvider>
      <div className="min-h-screen bg-dark-900 flex">
        <Sidebar navigation={navigation} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-x-hidden overflow-y-auto">
            <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </LayoutProvider>
  );
}; 