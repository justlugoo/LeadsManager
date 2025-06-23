import React from 'react';
import { MainLayout } from './MainLayout';
import { PageHeader } from './PageHeader';
import { EmptyState } from './EmptyState';
import { HomeIcon, UsersIcon, ChartBarIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

export default function LayoutDemo() {
  const navigation = [
    { name: 'Dashboard', href: '#', icon: <HomeIcon />, current: true },
    { name: 'Leads', href: '#', icon: <UsersIcon />, count: 12 },
    { name: 'Análisis', href: '#', icon: <ChartBarIcon /> },
    { name: 'Configuración', href: '#', icon: <Cog6ToothIcon /> }
  ];

  return (
    <MainLayout navigation={navigation}>
      <PageHeader
        title="Dashboard"
        subtitle="Resumen de tus leads y métricas principales"
        breadcrumbs={[
          { name: 'Inicio', href: '#' },
          { name: 'Dashboard' }
        ]}
        actions={
          <button className="px-4 py-2 bg-primary-start text-white rounded-lg hover:bg-primary-end transition-colors">
            Nueva Acción
          </button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-light-100 mb-2">Total Leads</h3>
          <p className="text-3xl font-bold text-primary-start">248</p>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-light-100 mb-2">Convertidos</h3>
          <p className="text-3xl font-bold text-green-500">34</p>
        </div>
        <div className="bg-dark-800 border border-dark-700 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-light-100 mb-2">Tasa de Conversión</h3>
          <p className="text-3xl font-bold text-blue-500">13.7%</p>
        </div>
      </div>
      <EmptyState
        icon={<UsersIcon />}
        title="No hay leads recientes"
        description="Cuando tengas nuevos leads, aparecerán aquí para que puedas gestionarlos fácilmente."
        action={
          <button className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:scale-105 transition-transform">
            Crear primer lead
          </button>
        }
      />
    </MainLayout>
  );
} 