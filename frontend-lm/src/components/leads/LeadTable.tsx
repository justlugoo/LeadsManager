import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import { routes } from 'routes';
import type { Lead } from 'types';

interface LeadTableProps {
  leads: Lead[];
  onStatusChange: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads, onStatusChange, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-dark-700">
            <th className="text-left py-3 px-4 font-medium text-light-200">Nombre</th>
            <th className="text-left py-3 px-4 font-medium text-light-200">Email</th>
            <th className="text-left py-3 px-4 font-medium text-light-200">Empresa</th>
            <th className="text-left py-3 px-4 font-medium text-light-200">Estado</th>
            <th className="text-left py-3 px-4 font-medium text-light-200">Fecha</th>
            <th className="text-right py-3 px-4 font-medium text-light-200">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8 text-light-300">
                No hay leads registrados
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead.id} className="border-b border-dark-700 hover:bg-dark-800/50">
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium text-light-100">
                      {lead.first_name} {lead.last_name}
                    </div>
                    {lead.note && (
                      <div className="text-sm text-light-300 truncate max-w-xs">
                        {lead.note}
                      </div>
                    )}
                  </div>
                </td>
                <td className="py-3 px-4 text-light-200">
                  {lead.email}
                </td>
                <td className="py-3 px-4 text-light-200">
                  {lead.company || '-'}
                </td>
                <td className="py-3 px-4">
                  <select
                    value={lead.status}
                    onChange={e => {
                      e.preventDefault();
                      console.log('Cambio de estado', lead.id, e.target.value);
                      onStatusChange(lead.id, e.target.value);
                    }}
                    onClick={e => e.stopPropagation()}
                    onMouseDown={e => e.stopPropagation()}
                    className="bg-dark-700 border border-dark-600 rounded px-2 py-1 text-sm text-light-100 focus:outline-none focus:ring-2 focus:ring-primary-start"
                  >
                    <option value="new">Nuevo</option>
                    <option value="contacted">Contactado</option>
                    <option value="qualified">Calificado</option>
                    <option value="proposal">Propuesta</option>
                    <option value="negotiation">Negociación</option>
                    <option value="won">Ganado</option>
                    <option value="lost">Perdido</option>
                  </select>
                </td>
                <td className="py-3 px-4 text-light-300 text-sm">
                  {new Date(lead.date_created).toLocaleDateString()}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link to={routes.app.leadDetail(lead.id.toString())}>
                      <Button variant="ghost" size="sm">
                        Ver
                      </Button>
                    </Link>
                    <Link to={`${routes.app.leadForm}?id=${lead.id}`}>
                      <Button variant="outline" size="sm">
                        Editar
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => onDelete(lead.id)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}; 