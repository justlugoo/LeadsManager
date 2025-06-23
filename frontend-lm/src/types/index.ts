// ============================================
// TIPOS PRINCIPALES DEL SISTEMA
// ============================================

// Tipos de autenticación
export interface User {
  id: number;
  email: string;
  full_name?: string;
  first_name?: string;
  last_name?: string;
  is_active?: boolean;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

// Tipos de Leads
export interface Lead {
  id: number;
  owner_id: number;
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  status: string; // string libre, no enum
  note: string;
  date_created: string; // ISO string
  date_last_updated: string; // ISO string
  owner?: User;
}

export interface LeadCreate {
  first_name: string;
  last_name: string;
  email: string;
  company: string;
  status: string;
  note: string;
}

export interface UpdateLeadData extends Partial<LeadCreate> {}

// Estados de los leads
type LeadStatus =
  | 'new'           // Nuevo
  | 'contacted'     // Contactado
  | 'qualified'     // Calificado
  | 'proposal'      // Propuesta enviada
  | 'negotiation'   // En negociación
  | 'won'           // Ganado/Convertido
  | 'lost';         // Perdido

// Configuración de estados con colores (adaptado a tu paleta)
export const LEAD_STATUS_CONFIG: Record<LeadStatus, {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
}> = {
  new: {
    label: 'Nuevo',
    color: 'text-primary-end',
    bgColor: 'bg-primary-start bg-opacity-10',
    icon: '🆕'
  },
  contacted: {
    label: 'Contactado',
    color: 'text-primary-start',
    bgColor: 'bg-primary-start bg-opacity-10',
    icon: '📞'
  },
  qualified: {
    label: 'Calificado',
    color: 'text-primary-end',
    bgColor: 'bg-primary-end bg-opacity-10',
    icon: '✅'
  },
  proposal: {
    label: 'Propuesta',
    color: 'text-orange-500',
    bgColor: 'bg-orange-100',
    icon: '📋'
  },
  negotiation: {
    label: 'Negociación',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-100',
    icon: '🤝'
  },
  won: {
    label: 'Ganado',
    color: 'text-green-500',
    bgColor: 'bg-green-100',
    icon: '🎉'
  },
  lost: {
    label: 'Perdido',
    color: 'text-red-500',
    bgColor: 'bg-red-100',
    icon: '❌'
  }
};

// Tipos para componentes UI (adaptado a tu paleta de colores)
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gradient' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
}

export interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'url';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  icon?: React.ReactNode;
  className?: string;
}

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
}

export interface BadgeProps {
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'gradient';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  className?: string;
}

// Tipos para respuestas de API
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

// Tipos para manejo de errores
export interface ApiError {
  message: string;
  status?: number;
  details?: string[];
}

// Tipos para dashboard/estadísticas
export interface DashboardStats {
  total_leads: number;
  new_leads: number;
  converted_leads: number;
  conversion_rate: number;
  leads_by_status: Record<LeadStatus, number>;
  recent_leads: Lead[];
}

// Tipos para navegación
export interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
  current?: boolean;
  count?: number;
}

export interface Token {
  access_token: string;
  token_type: string;
  expires_in: number;
} 