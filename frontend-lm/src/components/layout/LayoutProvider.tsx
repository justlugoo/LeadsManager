import React, { useState, createContext, useContext } from 'react';

interface User {
  id: number;
  email: string;
  name?: string;
  avatar?: string;
}

interface LayoutContextType {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined);

export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};

export const LayoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 1,
    email: 'usuario@ejemplo.com',
    name: 'Juan Pérez'
  });

  return (
    <LayoutContext.Provider value={{
      sidebarOpen,
      setSidebarOpen,
      currentUser,
      setCurrentUser
    }}>
      {children}
    </LayoutContext.Provider>
  );
}; 