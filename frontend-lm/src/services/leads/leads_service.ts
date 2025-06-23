import { apiService } from '../api';
import type { Lead, LeadCreate, UpdateLeadData } from 'types';

/**
 * Servicio para gestionar las operaciones CRUD de leads
 * Utiliza el apiService base para las peticiones HTTP
 */
export const leadsService = {
  /**
   * Obtiene todos los leads del usuario autenticado
   */
  async getLeads(): Promise<Lead[]> {
    const response = await apiService.get('/leads/');
    return response.data;
  },

  /**
   * Obtiene un lead específico por su ID
   */
  async getLead(id: number): Promise<Lead> {
    const response = await apiService.get(`/leads/${id}`);
    return response.data;
  },

  /**
   * Crea un nuevo lead
   */
  async createLead(data: LeadCreate): Promise<Lead> {
    const response = await apiService.post('/leads/', data);
    return response.data;
  },

  /**
   * Actualiza un lead existente
   */
  async updateLead(id: number, data: UpdateLeadData): Promise<Lead> {
    const response = await apiService.put(`/leads/${id}`, data);
    return response.data;
  },

  /**
   * Elimina un lead
   */
  async deleteLead(id: number): Promise<void> {
    await apiService.delete(`/leads/${id}`);
  },

  /**
   * Actualiza el estado de un lead (requiere enviar el objeto completo)
   */
  async updateLeadStatus(id: number, status: string): Promise<Lead> {
    // 1. Obtener el lead actual
    const lead = await this.getLead(id);
    // 2. Actualizar el campo status
    const updatedLead = { ...lead, status };
    // 3. Enviar el objeto completo por PUT
    const response = await apiService.put(`/leads/${id}`, updatedLead);
    return response.data;
  }
}; 