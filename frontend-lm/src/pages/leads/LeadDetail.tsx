import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { leadsService } from 'services/leads';
import { Card } from 'components/ui/Card';
import { Button } from 'components/ui/Button';
import { PageHeader } from 'components/layout/PageHeader';
import { routes } from 'routes';
import type { Lead } from 'types';

export const LeadDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      leadsService.getLead(Number(id))
        .then(setLead)
        .catch(() => setError('No se pudo cargar el lead'))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-96">Cargando...</div>;
  }
  if (error || !lead) {
    return <div className="flex items-center justify-center min-h-96 text-red-400">{error || 'Lead no encontrado'}</div>;
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={`Lead: ${lead.first_name} ${lead.last_name}`}
        subtitle={lead.company ? `Empresa: ${lead.company}` : undefined}
        breadcrumbs={[
          { name: 'Inicio', href: routes.app.dashboard },
          { name: 'Leads', href: routes.app.leads },
          { name: 'Detalle' },
        ]}
        actions={
          <Button variant="outline" onClick={() => navigate(`${routes.app.leadForm}?id=${lead.id}`)}>
            Editar
          </Button>
        }
      />
      <Card className="max-w-xl mx-auto space-y-4">
        <div>
          <span className="font-semibold text-light-200">Nombre:</span> {lead.first_name} {lead.last_name}
        </div>
        <div>
          <span className="font-semibold text-light-200">Email:</span> {lead.email}
        </div>
        <div>
          <span className="font-semibold text-light-200">Empresa:</span> {lead.company || '-'}
        </div>
        <div>
          <span className="font-semibold text-light-200">Estado:</span> {lead.status}
        </div>
        <div>
          <span className="font-semibold text-light-200">Nota:</span> {lead.note || '-'}
        </div>
        <div>
          <span className="font-semibold text-light-200">Fecha de creación:</span> {new Date(lead.date_created).toLocaleString()}
        </div>
        <div>
          <span className="font-semibold text-light-200">Última actualización:</span> {new Date(lead.date_last_updated).toLocaleString()}
        </div>
        <div className="flex gap-2 justify-end pt-2">
          <Button variant="outline" onClick={() => navigate(routes.app.leads)}>
            Volver
          </Button>
          <Button variant="primary" onClick={() => navigate(`${routes.app.leadForm}?id=${lead.id}`)}>
            Editar
          </Button>
        </div>
      </Card>
    </div>
  );
}; 