import { api } from './api';
import type {
  Tenant,
  CreateTenantRequest,
  UpdateTenantRequest,
} from '@/types';

export const tenantsService = {
  /**
   * Criar um novo tenant
   */
  async createTenant(data: CreateTenantRequest): Promise<Tenant> {
    const response = await api.post<Tenant>('/tenants', data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Erro ao criar tenant');
    }
    return response.data;
  },

  /**
   * Buscar tenant por ID
   */
  async getTenantById(id: string): Promise<Tenant> {
    const response = await api.get<Tenant>(`/tenants/${id}`);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Erro ao buscar tenant');
    }
    return response.data;
  },

  /**
   * Atualizar tenant
   */
  async updateTenant(id: string, data: UpdateTenantRequest): Promise<Tenant> {
    const response = await api.put<Tenant>(`/tenants/${id}`, data);
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Erro ao atualizar tenant');
    }
    return response.data;
  },

  /**
   * Excluir tenant
   */
  async deleteTenant(id: string): Promise<void> {
    const response = await api.delete<{ message: string }>(`/tenants/${id}`);
    if (!response.success) {
      throw new Error(response.error?.message || 'Erro ao excluir tenant');
    }
  },

  /**
   * Listar todos os tenants
   */
  async listTenants(): Promise<Tenant[]> {
    const response = await api.get<Tenant[]>('/tenants');
    if (!response.success || !response.data) {
      throw new Error(response.error?.message || 'Erro ao listar tenants');
    }
    return response.data;
  },
};

