import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadsService } from 'services/leads';
import { Card } from 'components/ui/Card';
import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { PageHeader } from 'components/layout/PageHeader';
import { LoadingSpinner } from 'components/ui/LoadingSpinner';
import { Alert } from 'components/ui/Alert';
import { routes } from 'routes';
import { LEAD_STATUS_CONFIG } from 'types';
import type { Lead } from 'types';
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export const LeadsList: React.FC = () => {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadLeads();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [leads, searchTerm, statusFilter, companyFilter]);

  const loadLeads = async () => {
    try {
      setLoading(true);
      const data = await leadsService.getLeads();
      setLeads(data);
      setError(null);
    } catch (err: any) {
      setError('Error al cargar los leads');
      console.error('Error loading leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...leads];

    // Filtro de búsqueda
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.first_name.toLowerCase().includes(term) ||
        lead.last_name.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.company.toLowerCase().includes(term)
      );
    }

    // Filtro por estado
    if (statusFilter) {
      filtered = filtered.filter(lead => lead.status === statusFilter);
    }

    // Filtro por empresa
    if (companyFilter) {
      filtered = filtered.filter(lead => 
        lead.company.toLowerCase().includes(companyFilter.toLowerCase())
      );
    }

    setFilteredLeads(filtered);
  };

  const handleStatusChange = async (leadId: number, newStatus: string) => {
    try {
      await leadsService.updateLeadStatus(leadId, newStatus);
      // Recargar leads para obtener datos actualizados
      await loadLeads();
    } catch (err: any) {
      setError('Error al actualizar el estado del lead');
      // Log detallado para depuración
      console.error('Error al actualizar el estado del lead:', err, err?.response);
    }
  };

  const handleDeleteLead = async (leadId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este lead?')) {
      try {
        await leadsService.deleteLead(leadId);
        await loadLeads();
      } catch (err: any) {
        setError('Error al eliminar el lead');
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setStatusFilter('');
    setCompanyFilter('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leads"
        subtitle="Gestiona tus clientes potenciales"
        breadcrumbs={[
          { name: 'Inicio', href: routes.app.dashboard },
          { name: 'Leads' },
        ]}
        actions={
          <Button
            onClick={() => navigate(routes.app.leadForm)}
            variant="primary"
            icon={<PlusIcon className="w-4 h-4" />}
          >
            Nuevo Lead
          </Button>
        }
      />

      {error && (
        <Alert type="error">{error}</Alert>
      )}

      <Card>
        {/* Barra de búsqueda y filtros */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Buscar leads..."
                value={searchTerm}
                onChange={setSearchTerm}
                icon={<MagnifyingGlassIcon className="w-4 h-4" />}
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              icon={<FunnelIcon className="w-4 h-4" />}
            >
              Filtros
            </Button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-dark-800 rounded-lg border border-dark-700">
              <div>
                <label className="form-label">Estado</label>
                <select
                  className="input-field"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Todos los estados</option>
                  {Object.entries(LEAD_STATUS_CONFIG).map(([key, config]) => (
                    <option key={key} value={key}>{config.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Empresa</label>
                <Input
                  placeholder="Filtrar por empresa..."
                  value={companyFilter}
                  onChange={setCompanyFilter}
                />
              </div>
              <div className="md:col-span-2">
                <Button variant="ghost" onClick={clearFilters}>
                  Limpiar filtros
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Tabla de leads */}
        <div className="mt-6 overflow-x-auto">
          {filteredLeads.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-light-300 text-lg mb-2">
                {leads.length === 0 ? 'No hay leads registrados' : 'No se encontraron leads con los filtros aplicados'}
              </div>
              {leads.length === 0 && (
                <Button
                  onClick={() => navigate(routes.app.leadForm)}
                  variant="primary"
                  className="mt-4"
                >
                  Crear tu primer lead
                </Button>
              )}
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-700">
                  <th className="text-left py-3 px-4 font-medium text-light-300">Nombre</th>
                  <th className="text-left py-3 px-4 font-medium text-light-300">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-light-300">Empresa</th>
                  <th className="text-left py-3 px-4 font-medium text-light-300">Estado</th>
                  <th className="text-left py-3 px-4 font-medium text-light-300">Fecha</th>
                  <th className="text-right py-3 px-4 font-medium text-light-300">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => {
                  return (
                    <tr key={lead.id} className="border-b border-dark-700 hover:bg-dark-800 transition-colors">
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-light-100">
                            {lead.first_name} {lead.last_name}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-light-200">{lead.email}</td>
                      <td className="py-3 px-4 text-light-200">{lead.company || '-'}</td>
                      <td className="py-3 px-4">
                        <select
                          className="text-sm bg-transparent border border-dark-700 rounded px-2 py-1 text-light-100"
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        >
                          {Object.entries(LEAD_STATUS_CONFIG).map(([key, config]) => (
                            <option key={key} value={key}>{config.label}</option>
                          ))}
                        </select>
                      </td>
                      <td className="py-3 px-4 text-light-200 text-sm">
                        {new Date(lead.date_created).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(routes.app.leadDetail(lead.id.toString()))}
                            icon={<EyeIcon className="w-4 h-4" />}
                          >
                            Ver
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`${routes.app.leadForm}?id=${lead.id}`)}
                            icon={<PencilIcon className="w-4 h-4" />}
                          >
                            Editar
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteLead(lead.id)}
                            icon={<TrashIcon className="w-4 h-4" />}
                          >
                            Eliminar
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Información de resultados */}
        {filteredLeads.length > 0 && (
          <div className="mt-4 text-sm text-light-300">
            Mostrando {filteredLeads.length} de {leads.length} leads
          </div>
        )}
      </Card>
    </div>
  );
};

export default LeadsList; 