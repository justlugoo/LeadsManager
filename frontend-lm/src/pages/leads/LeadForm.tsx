import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { leadsService } from 'services/leads';
import { Card } from 'components/ui/Card';
import { Button } from 'components/ui/Button';
import { Input } from 'components/ui/Input';
import { PageHeader } from 'components/layout/PageHeader';
import { routes } from 'routes';
import type { Lead, LeadCreate } from 'types';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export const LeadForm: React.FC = () => {
  const query = useQuery();
  const id = query.get('id');
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState<LeadCreate>({
    first_name: '',
    last_name: '',
    email: '',
    company: '',
    status: 'new',
    note: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      setLoading(true);
      leadsService.getLead(Number(id))
        .then((lead: Lead) => {
          setForm({
            first_name: lead.first_name,
            last_name: lead.last_name,
            email: lead.email,
            company: lead.company,
            status: lead.status,
            note: lead.note,
          });
        })
        .catch(() => setError('No se pudo cargar el lead'))
        .finally(() => setLoading(false));
    }
  }, [id, isEdit]);

  const handleChange = (field: keyof LeadCreate, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isEdit && id) {
        await leadsService.updateLead(Number(id), form);
      } else {
        await leadsService.createLead(form);
      }
      navigate(routes.app.leads);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error al guardar el lead');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={isEdit ? 'Editar Lead' : 'Nuevo Lead'}
        subtitle={isEdit ? 'Modifica los datos del lead' : 'Crea un nuevo lead'}
        breadcrumbs={[
          { name: 'Inicio', href: routes.app.dashboard },
          { name: 'Leads', href: routes.app.leads },
          { name: isEdit ? 'Editar' : 'Nuevo' },
        ]}
      />
      <Card className="max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nombre"
            placeholder="Nombre"
            value={form.first_name}
            onChange={(v) => handleChange('first_name', v)}
            required
          />
          <Input
            label="Apellido"
            placeholder="Apellido"
            value={form.last_name}
            onChange={(v) => handleChange('last_name', v)}
            required
          />
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(v) => handleChange('email', v)}
            required
          />
          <Input
            label="Empresa"
            placeholder="Empresa"
            value={form.company}
            onChange={(v) => handleChange('company', v)}
          />
          <div>
            <label className="form-label">Estado</label>
            <select
              className="input-field"
              value={form.status}
              onChange={e => handleChange('status', e.target.value)}
            >
              <option value="new">Nuevo</option>
              <option value="contacted">Contactado</option>
              <option value="qualified">Calificado</option>
              <option value="proposal">Propuesta</option>
              <option value="negotiation">Negociación</option>
              <option value="won">Ganado</option>
              <option value="lost">Perdido</option>
            </select>
          </div>
          <Input
            label="Nota"
            placeholder="Nota"
            value={form.note}
            onChange={(v) => handleChange('note', v)}
          />
          {error && <div className="bg-red-900/50 border border-red-700 text-red-200 px-4 py-3 rounded-lg">{error}</div>}
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => navigate(routes.app.leads)}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" loading={loading}>
              {isEdit ? 'Guardar cambios' : 'Crear Lead'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}; 