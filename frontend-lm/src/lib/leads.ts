import { apiService } from './api'
import type { Lead, LeadCreate, UpdateLeadData } from './types'

export const leadsService = {
  async getLeads(): Promise<Lead[]> {
    const response = await apiService.get<Lead[]>('/leads/')
    return response.data
  },

  async getLead(id: number): Promise<Lead> {
    const response = await apiService.get<Lead>(`/leads/${id}`)
    return response.data
  },

  async createLead(data: LeadCreate): Promise<Lead> {
    const response = await apiService.post<Lead>('/leads/', data)
    return response.data
  },

  async updateLead(id: number, data: UpdateLeadData): Promise<Lead> {
    const response = await apiService.put<Lead>(`/leads/${id}`, data)
    return response.data
  },

  async deleteLead(id: number): Promise<void> {
    await apiService.delete(`/leads/${id}`)
  },

  async updateLeadStatus(id: number, status: string): Promise<Lead> {
    const lead = await this.getLead(id)
    const updatedLead = { ...lead, status }
    const response = await apiService.put<Lead>(`/leads/${id}`, updatedLead)
    return response.data
  },
}
