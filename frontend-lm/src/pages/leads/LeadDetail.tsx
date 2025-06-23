import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { leadsService } from 'services/leads';
import { Card } from 'components/ui/Card';
import { Button } from 'components/ui/Button';
import { Badge } from 'components/ui/Badge';
import { PageHeader } from 'components/layout/PageHeader';
import { LoadingSpinner } from 'components/ui/LoadingSpinner';
import { Alert } from 'components/ui/Alert';
import { routes } from 'routes';
import { LEAD_STATUS_CONFIG } from 'types';
import type { Lead } from 'types';
import { 
  PencilIcon, 
  TrashIcon, 
  ArrowLeftIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export const LeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    if (id) {
      loadLead(parseInt(id));
    }
  }, [id]);

  const loadLead = async (leadId: number) => {
    try {
      setLoading(true);
      const data = await leadsService.getLead(leadId);
      setLead(data);
      setError(null);
    } catch (err: any) {
      setError('Error al cargar el lead');
      console.error('Error loading lead:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    if (!lead) return;
    
    try {
      setUpdatingStatus(true);
      await leadsService.updateLeadStatus(lead.id, newStatus);
      await loadLead(lead.id);
    } catch (err: any) {
      setError('Error al actualizar el estado del lead');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleDeleteLead = async () => {
    if (!lead) return;
    
    if (window.confirm('¿Estás seguro de que quieres eliminar este lead? Esta acción no se puede deshacer.')) {
      try {
        await leadsService.deleteLead(lead.id);
        navigate(routes.app.leads);
      } catch (err: any) {
        setError('Error al eliminar el lead');
      }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="text-center py-12">
        <Alert type="error">Lead no encontrado</Alert>
      </div>
    );
  }

  const statusConfig = getStatusConfig(lead.status);

  return (
    <div className="space-y-6">
      <PageHeader
        title={`${lead.first_name} ${lead.last_name}`}
        subtitle="Detalles del lead"
        breadcrumbs={[
          { name: 'Inicio', href: routes.app.dashboard },
          { name: 'Leads', href: routes.app.leads },
          { name: `${lead.first_name} ${lead.last_name}` },
        ]}
        actions={
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(routes.app.leads)}
              icon={<ArrowLeftIcon className="w-4 h-4" />}
            >
              Volver
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(`${routes.app.leadForm}?id=${lead.id}`)}
              icon={<PencilIcon className="w-4 h-4" />}
            >
              Editar
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteLead}
              icon={<TrashIcon className="w-4 h-4" />}
            >
              Eliminar
            </Button>
          </div>
        }
      />

      {error && (
        <Alert type="error">{error}</Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información Principal */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-primary-start bg-opacity-10 rounded-full flex items-center justify-center">
                    <span className="text-primary-start text-2xl font-bold">
                      {lead.first_name[0]}{lead.last_name[0]}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-light-100">
                      {lead.first_name} {lead.last_name}
                    </h2>
                    <p className="text-light-300">{lead.company || 'Sin empresa'}</p>
                  </div>
                </div>
                <Badge 
                  variant="primary" 
                  className={`${statusConfig.bgColor} ${statusConfig.color} text-lg px-4 py-2`}
                >
                  <span className="mr-2">{statusConfig.icon}</span>
                  {statusConfig.label}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <EnvelopeIcon className="w-5 h-5 text-light-300" />
                    <div>
                      <p className="text-sm text-light-300">Email</p>
                      <p className="text-light-100 font-medium">{lead.email}</p>
                    </div>
                  </div>
                  
                  {lead.company && (
                    <div className="flex items-center gap-3">
                      <BuildingOfficeIcon className="w-5 h-5 text-light-300" />
                      <div>
                        <p className="text-sm text-light-300">Empresa</p>
                        <p className="text-light-100 font-medium">{lead.company}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-light-300" />
                    <div>
                      <p className="text-sm text-light-300">Fecha de Creación</p>
                      <p className="text-light-100 font-medium">{formatDate(lead.date_created)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <ClockIcon className="w-5 h-5 text-light-300" />
                    <div>
                      <p className="text-sm text-light-300">Última Actualización</p>
                      <p className="text-light-100 font-medium">{formatDate(lead.date_last_updated)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Notas */}
          {lead.note && (
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-light-100 mb-4">Notas</h3>
                <div className="bg-dark-800 p-4 rounded-lg">
                  <p className="text-light-200 whitespace-pre-wrap">{lead.note}</p>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Panel Lateral */}
        <div className="space-y-6">
          {/* Estado del Lead */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-light-100 mb-4">Estado del Lead</h3>
              <div className="space-y-3">
                <div>
                  <label className="form-label">Cambiar Estado</label>
                  <select
                    className="input-field"
                    value={lead.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updatingStatus}
                  >
                    {Object.entries(LEAD_STATUS_CONFIG).map(([key, config]) => (
                      <option key={key} value={key}>{config.label}</option>
                    ))}
                  </select>
                </div>
                {updatingStatus && (
                  <div className="flex items-center gap-2 text-sm text-light-300">
                    <LoadingSpinner />
                    Actualizando estado...
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Acciones Rápidas */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-light-100 mb-4">Acciones</h3>
              <div className="space-y-3">
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => navigate(`${routes.app.leadForm}?id=${lead.id}`)}
                  icon={<PencilIcon className="w-4 h-4" />}
                >
                  Editar Lead
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(`mailto:${lead.email}`, '_blank')}
                  icon={<EnvelopeIcon className="w-4 h-4" />}
                >
                  Enviar Email
                </Button>
                <Button
                  variant="danger"
                  className="w-full"
                  onClick={handleDeleteLead}
                  icon={<TrashIcon className="w-4 h-4" />}
                >
                  Eliminar Lead
                </Button>
              </div>
            </div>
          </Card>

          {/* Información del Sistema */}
          <Card>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-light-100 mb-4">Información del Sistema</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-light-300">ID del Lead:</span>
                  <span className="text-light-100 font-mono">#{lead.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-300">Propietario:</span>
                  <span className="text-light-100">Tú</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-300">Creado:</span>
                  <span className="text-light-100">{new Date(lead.date_created).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-light-300">Actualizado:</span>
                  <span className="text-light-100">{new Date(lead.date_last_updated).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail; 