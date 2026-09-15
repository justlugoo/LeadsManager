export interface User {
  id: number
  email: string
}

export interface UserCreate {
  email: string
  password: string
}

export interface Token {
  access_token: string
  token_type: string
  expires_in: number
}

export interface Lead {
  id: number
  owner_id: number
  first_name: string
  last_name: string
  email: string
  company: string
  status: string // string libre, no enum
  note: string
  date_created: string // ISO string
  date_last_updated: string // ISO string
}

export interface LeadCreate {
  first_name: string
  last_name: string
  email: string
  company: string
  status: string
  note: string
}

export type UpdateLeadData = Partial<LeadCreate>

export interface NavItem {
  name: string
  href: string
  icon: import('svelte').Component<{ class?: string }>
}

type LeadStatus = 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'won' | 'lost'

// Tono de cada etapa: las 5 etapas intermedias usan una rampa ordinal de un
// solo matiz (más oscuro = más avanzado); "won"/"lost" son desenlaces, no
// etapas, y usan los colores de estado (verde/rojo), no la rampa.
// Clases completas y literales (no interpoladas) para que Tailwind las detecte.
export const LEAD_STATUS_CONFIG: Record<LeadStatus, { label: string; badgeClass: string }> = {
  new: { label: 'Nuevo', badgeClass: 'bg-stage-1/12 text-stage-1' },
  contacted: { label: 'Contactado', badgeClass: 'bg-stage-2/12 text-stage-2' },
  qualified: { label: 'Calificado', badgeClass: 'bg-stage-3/12 text-stage-3' },
  proposal: { label: 'Propuesta', badgeClass: 'bg-stage-4/12 text-stage-4' },
  negotiation: { label: 'Negociación', badgeClass: 'bg-stage-5/12 text-stage-5' },
  won: { label: 'Ganado', badgeClass: 'bg-good/12 text-good' },
  lost: { label: 'Perdido', badgeClass: 'bg-critical/12 text-critical' },
}

const FALLBACK_STATUS = { label: '', badgeClass: 'bg-text-muted/12 text-text-muted' }

export function statusConfig(status: string) {
  const config = LEAD_STATUS_CONFIG[status as LeadStatus]
  return config ?? { ...FALLBACK_STATUS, label: status }
}
