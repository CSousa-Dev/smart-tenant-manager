/**
 * In Memory Tenant Repository
 * Implementação do repositório de tenants usando armazenamento em memória
 */

import { v4 as uuidv4 } from 'uuid';
import { ITenantRepository } from '../../domain/repositories/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';

export class InMemoryTenantRepository implements ITenantRepository {
  private items: Tenant[] = [];

  async create(name: string): Promise<Tenant> {
    const tenant = new Tenant(uuidv4(), name);
    this.items.push(tenant);
    return tenant;
  }

  async findAll(): Promise<Tenant[]> {
    return this.items;
  }

  async findById(id: string): Promise<Tenant | null> {
    return this.items.find((t) => t.id === id) || null;
  }

  async update(id: string, name: string): Promise<Tenant> {
    const tenant = this.items.find((t) => t.id === id);
    if (!tenant) {
      throw new Error(`Tenant with id "${id}" not found`);
    }
    tenant.name = name;
    return tenant;
  }

  async delete(id: string): Promise<void> {
    const index = this.items.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error(`Tenant with id "${id}" not found`);
    }
    this.items.splice(index, 1);
  }
}

