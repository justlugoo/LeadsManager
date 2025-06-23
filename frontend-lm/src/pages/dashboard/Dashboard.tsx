import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadsService } from 'services/leads';
import { Card } from 'components/ui/Card';
import { Button } from 'components/ui/Button';
import { PageHeader } from 'components/layout/PageHeader';
import { LoadingSpinner } from 'components/ui/LoadingSpinner';
import { Alert } from 'components/ui/Alert';
import { Badge } from 'components/ui/Badge';
import { routes } from 'routes';
import { LEAD_STATUS_CONFIG } from 'types';
import type { Lead } from 'types';
import { 
  UsersIcon, 
  UserPlusIcon, 
  CheckCircleIcon, 
  ChartBarIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';

interface DashboardStats {
  total_leads: number;
  new_leads: number;
  converted_leads: number;
  conversion_rate: number;
  leads_by_status: Record<string, number>;
  recent_leads: Lead[];
}

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      setLoading(true);
      // Simulamos las estadísticas ya que el backend no tiene este endpoint
      const leads = await leadsService.getLeads();
      
      const totalLeads = leads.length;
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      
      const newLeads = leads.filter(lead => 
        new Date(lead.date_created) >= weekAgo
      ).length;
      
      const convertedLeads = leads.filter(lead => lead.status === 'won').length;
      const conversionRate = totalLeads > 0 ? (convertedLeads / totalLeads) * 100 : 0;
      
      const leadsByStatus = leads.reduce((acc, lead) => {
        acc[lead.status] = (acc[lead.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      
      const recentLeads = leads
        .sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime())
        .slice(0, 5);

      setStats({
        total_leads: totalLeads,
        new_leads: newLeads,
        converted_leads: convertedLeads,
        conversion_rate: conversionRate,
        leads_by_status: leadsByStatus,
        recent_leads: recentLeads
      });
      
      setError(null);
    } catch (err: any) {
      setError('Error al cargar las estadísticas del dashboard');
      console.error('Error loading dashboard stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusConfig = (status: string) => {
    return LEAD_STATUS_CONFIG[status as keyof typeof LEAD_STATUS_CONFIG] || {
      label: status,
      color: 'text-gray-500',
      bgColor: 'bg-gray-100',
      icon: '📋'
    };
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <Alert type="error">No se pudieron cargar las estadísticas</Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        subtitle="Resumen de tu gestión de leads"
        breadcrumbs={[{ name: 'Dashboard' }]}
      />

      {error && (
        <Alert type="error">{error}</Alert>
      )}

      {/* Tarjetas de estadísticas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-300">Total de Leads</p>
              <p className="text-3xl font-bold text-light-100">{stats.total_leads}</p>
            </div>
            <div className="p-3 bg-primary-start bg-opacity-10 rounded-full">
              <UsersIcon className="w-6 h-6 text-primary-start" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-300">Leads Nuevos</p>
              <p className="text-3xl font-bold text-light-100">{stats.new_leads}</p>
              <p className="text-xs text-light-300">Últimos 7 días</p>
            </div>
            <div className="p-3 bg-blue-500 bg-opacity-10 rounded-full">
              <UserPlusIcon className="w-6 h-6 text-blue-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-300">Convertidos</p>
              <p className="text-3xl font-bold text-light-100">{stats.converted_leads}</p>
            </div>
            <div className="p-3 bg-green-500 bg-opacity-10 rounded-full">
              <CheckCircleIcon className="w-6 h-6 text-green-500" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-light-300">Tasa de Conversión</p>
              <p className="text-3xl font-bold text-light-100">{stats.conversion_rate.toFixed(1)}%</p>
            </div>
            <div className="p-3 bg-yellow-500 bg-opacity-10 rounded-full">
              <ChartBarIcon className="w-6 h-6 text-yellow-500" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Leads por Estado */}
        <Card>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-light-100 mb-4">Leads por Estado</h3>
            <div className="space-y-3">
              {Object.entries(stats.leads_by_status).map(([status, count]) => {
                const statusConfig = getStatusConfig(status);
                return (
                  <div key={status} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{statusConfig.icon}</span>
                      <span className="text-light-200">{statusConfig.label}</span>
                    </div>
                    <Badge variant="primary">{count}</Badge>
                  </div>
                );
              })}
              {Object.keys(stats.leads_by_status).length === 0 && (
                <p className="text-light-300 text-center py-4">No hay leads registrados</p>
              )}
            </div>
          </div>
        </Card>

        {/* Leads Recientes */}
        <Card>
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-light-100">Leads Recientes</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(routes.app.leads)}
              >
                Ver todos
              </Button>
            </div>
            <div className="space-y-4">
              {stats.recent_leads.map((lead) => {
                const statusConfig = getStatusConfig(lead.status);
                return (
                  <div key={lead.id} className="flex items-center justify-between p-3 bg-dark-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary-start bg-opacity-10 rounded-full flex items-center justify-center">
                        <span className="text-primary-start font-semibold">
                          {lead.first_name[0]}{lead.last_name[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-light-100">
                          {lead.first_name} {lead.last_name}
                        </p>
                        <p className="text-sm text-light-300">{lead.company || 'Sin empresa'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant="primary" 
                        className={`${statusConfig.bgColor} ${statusConfig.color}`}
                      >
                        {statusConfig.label}
                      </Badge>
                      <p className="text-xs text-light-300 mt-1">
                        {new Date(lead.date_created).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                );
              })}
              {stats.recent_leads.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-light-300 mb-4">No hay leads recientes</p>
                  <Button
                    onClick={() => navigate(routes.app.leadForm)}
                    variant="primary"
                  >
                    Crear tu primer lead
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Acciones Rápidas */}
      <Card>
        <div className="p-6">
          <h3 className="text-lg font-semibold text-light-100 mb-4">Acciones Rápidas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate(routes.app.leadForm)}
              variant="primary"
              className="h-16"
              icon={<UserPlusIcon className="w-5 h-5" />}
            >
              Nuevo Lead
            </Button>
            <Button
              onClick={() => navigate(routes.app.leads)}
              variant="outline"
              className="h-16"
              icon={<UsersIcon className="w-5 h-5" />}
            >
              Ver Todos los Leads
            </Button>
            <Button
              onClick={() => navigate(routes.app.profile)}
              variant="outline"
              className="h-16"
              icon={<EnvelopeIcon className="w-5 h-5" />}
            >
              Mi Perfil
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard; 