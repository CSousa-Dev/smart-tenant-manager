import { useState, useCallback } from 'react';
import { tenantsService } from '@/services/tenants';
import type {
  Tenant,
  CreateTenantRequest,
  UpdateTenantRequest,
} from '@/types';

export const useTenants = () => {
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchTenants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tenantsService.listTenants();
      setTenants(data);
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const createTenant = useCallback(async (data: CreateTenantRequest) => {
    setLoading(true);
    setError(null);
    try {
      const newTenant = await tenantsService.createTenant(data);
      setTenants((prev) => [newTenant, ...prev]);
      return newTenant;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTenant = useCallback(async (id: string, data: UpdateTenantRequest) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTenant = await tenantsService.updateTenant(id, data);
      setTenants((prev) =>
        prev.map((tenant) => (tenant.id === id ? updatedTenant : tenant))
      );
      return updatedTenant;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteTenant = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await tenantsService.deleteTenant(id);
      setTenants((prev) => prev.filter((tenant) => tenant.id !== id));
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const getTenantById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const tenant = await tenantsService.getTenantById(id);
      return tenant;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Erro desconhecido');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    tenants,
    loading,
    error,
    fetchTenants,
    createTenant,
    updateTenant,
    deleteTenant,
    getTenantById,
  };
};

