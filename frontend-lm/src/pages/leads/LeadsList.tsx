import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { PageHeader } from 'components/layout/PageHeader';
import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { Card } from 'components/ui/Card';
import { LoadingSpinner } from 'components/ui/LoadingSpinner';
import { leadsService } from 'services/leads';
import { routes } from 'routes';
import type { Lead } from 'types';
import { LeadTable } from 'components/leads/LeadTable';

export const LeadsList: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar leads al montar el componente
  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await leadsService.getLeads();
      setLeads(data);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al cargar los leads');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteLead = async (id: number) => {
    if (!confirm('¿Estás seguro de que quieres eliminar este lead?')) {
      return;
    }

    try {
      await leadsService.deleteLead(id);
      setLeads(leads.filter(lead => lead.id !== id));
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al eliminar el lead');
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    setError(null);
    console.log('Handler ejecutado', id, newStatus);
    try {
      // Busca el lead actual
      const lead = leads.find(l => l.id === id);
      if (!lead) throw new Error('Lead no encontrado');
      // Envía todos los campos requeridos, cambiando solo el status
      const updatedLead = await leadsService.updateLead(id, {
        first_name: lead.first_name,
        last_name: lead.last_name,
        email: lead.email,
        company: lead.company,
        status: newStatus,
        note: lead.note,
      });
      console.log('Respuesta de updateLead', updatedLead);
      if (!updatedLead || !updatedLead.id) {
        throw new Error('Respuesta inválida del backend');
      }
      setLeads(leads.map(lead => 
        lead.id === id ? updatedLead : lead
      ));
    } catch (err: any) {
      let msg = 'Error al actualizar el estado';
      if (err.response?.data?.detail) {
        msg = Array.isArray(err.response.data.detail)
          ? err.response.data.detail.map((e: any) => e.msg).join(' | ')
          : err.response.data.detail;
      } else if (err.message) {
        msg = err.message;
      }
      setError(msg);
      console.error('Error al actualizar el estado', err);
    }
  };

  // Filtrar leads por término de búsqueda
  const filteredLeads = leads.filter(lead =>
    lead.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    lead.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader
        title="Leads"
        subtitle="Gestiona tus clientes potenciales"
        breadcrumbs={[
          { name: 'Inicio', href: routes.app.dashboard },
          { name: 'Leads' }
        ]}
        actions={
          <Link to={routes.app.leadForm}>
            <Button variant="primary" icon={<PlusIcon className="w-5 h-5" />}>
              Nuevo Lead
            </Button>
          </Link>
        }
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <Input
              placeholder="Buscar leads..."
              value={searchTerm}
              onChange={setSearchTerm}
              icon={<MagnifyingGlassIcon className="w-5 h-5" />}
            />
          </div>
          <Button variant="outline" onClick={loadLeads}>
            Actualizar
          </Button>
        </div>
      </Card>

      {/* Leads Table */}
      <Card>
        <LeadTable
          leads={filteredLeads}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteLead}
        />
      </Card>
    </div>
  );
}; 