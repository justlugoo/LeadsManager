import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from 'hooks/useAuth';

export const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token } = useAuth();
  // Si tienes loading en useAuth, puedes agregarlo aquí
  // if (loading) return <LoadingSpinner />;
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
}; 