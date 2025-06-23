import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'components/ui/Button';
import { routes } from 'routes';
import type { Lead } from 'types';
import { PencilIcon, TrashIcon, EyeIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const STATUS_COLORS: Record<string, string> = {
  new: 'bg-primary-start/20 text-primary-end',
  contacted: 'bg-blue-500/20 text-blue-400',
  qualified: 'bg-green-500/20 text-green-400',
  proposal: 'bg-orange-500/20 text-orange-400',
  negotiation: 'bg-yellow-500/20 text-yellow-400',
  won: 'bg-green-700/20 text-green-500',
  lost: 'bg-red-500/20 text-red-400',
};

interface LeadTableProps {
  leads: Lead[];
  onStatusChange: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
}

export const LeadTable: React.FC<LeadTableProps> = ({ leads, onStatusChange, onDelete }) => {
  return (
    <div className="overflow-x-auto rounded-xl shadow-lg border border-dark-700 bg-dark-800">
      <table className="w-full min-w-[700px]">
        <thead className="sticky top-0 z-10 bg-dark-900/95 backdrop-blur border-b border-dark-700">
          <tr>
            <th className="py-3 px-4 text-left font-semibold text-light-200"> </th>
            <th className="py-3 px-4 text-left font-semibold text-light-200">Nombre</th>
            <th className="py-3 px-4 text-left font-semibold text-light-200">Email / Empresa</th>
            <th className="py-3 px-4 text-left font-semibold text-light-200">Estado</th>
            <th className="py-3 px-4 text-left font-semibold text-light-200">Fecha</th>
            <th className="py-3 px-4 text-right font-semibold text-light-200">Acciones</th>
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
              <tr key={lead.id} className="border-b border-dark-700 hover:bg-dark-700/40 transition">
                {/* Avatar/inicial */}
                <td className="py-3 px-4">
                  <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center">
                    {lead.first_name ? (
                      <span className="text-lg font-bold text-primary-end">
                        {lead.first_name[0]}
                      </span>
                    ) : (
                      <UserCircleIcon className="w-8 h-8 text-dark-400" />
                    )}
                  </div>
                </td>
                {/* Nombre y nota */}
                <td className="py-3 px-4">
                  <div className="font-semibold text-light-100 text-base">
                    {lead.first_name} {lead.last_name}
                  </div>
                  {lead.note && (
                    <div className="text-xs text-light-400 truncate max-w-xs mt-1">
                      {lead.note}
                    </div>
                  )}
                </td>
                {/* Email y empresa */}
                <td className="py-3 px-4">
                  <div className="text-light-200 text-sm font-medium">{lead.email}</div>
                  <div className="text-xs text-light-400">{lead.company || '-'}</div>
                </td>
                {/* Estado como badge + select */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[lead.status] || 'bg-dark-700 text-light-200'}`}>{
                      lead.status.charAt(0).toUpperCase() + lead.status.slice(1)
                    }</span>
                    <select
                      value={lead.status}
                      onChange={e => {
                        e.preventDefault();
                        onStatusChange(lead.id, e.target.value);
                      }}
                      onClick={e => e.stopPropagation()}
                      onMouseDown={e => e.stopPropagation()}
                      className="bg-dark-800 border border-dark-600 rounded px-2 py-1 text-xs text-light-100 focus:outline-none focus:ring-2 focus:ring-primary-start"
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
                </td>
                {/* Fecha */}
                <td className="py-3 px-4 text-light-300 text-xs">
                  {new Date(lead.date_created).toLocaleDateString()}
                </td>
                {/* Acciones */}
                <td className="py-3 px-4 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link to={routes.app.leadDetail(lead.id.toString())}>
                      <Button variant="ghost" size="sm" className="px-2">
                        <EyeIcon className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to={`${routes.app.leadForm}?id=${lead.id}`}>
                      <Button variant="outline" size="sm" className="px-2">
                        <PencilIcon className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm"
                      className="px-2"
                      onClick={() => onDelete(lead.id)}
                    >
                      <TrashIcon className="w-4 h-4" />
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