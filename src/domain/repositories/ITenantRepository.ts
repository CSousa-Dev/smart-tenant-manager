/**
 * Tenant Repository Interface
 * Contrato para repositório de tenants
 */

import { Tenant } from '../entities/Tenant';

export interface ITenantRepository {
  create(name: string): Promise<Tenant>;
  findAll(): Promise<Tenant[]>;
  findById(id: string): Promise<Tenant | null>;
  update(id: string, name: string): Promise<Tenant>;
  delete(id: string): Promise<void>;
}

