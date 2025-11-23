// Tipos comuns que podem ser compartilhados entre módulos
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  meta?: {
    timestamp: string;
    requestId?: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
    };
  };
}

export interface ApiError {
  message: string
  code?: string
  details?: unknown
}

// Exemplo de tipo para entidades
export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

// Tenant Types
export interface Tenant {
  id: string;
  name: string;
}

// Request Types
export interface CreateTenantRequest {
  name: string;
}

export interface UpdateTenantRequest {
  name: string;
}

