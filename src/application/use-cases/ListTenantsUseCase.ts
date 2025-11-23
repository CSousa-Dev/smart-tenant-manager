/**
 * List Tenants Use Case
 * Caso de uso para listar todos os tenants
 */

import { ITenantRepository } from '../../domain/repositories/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';

export class ListTenantsUseCase {
  constructor(private tenantRepo: ITenantRepository) {}

  async execute(): Promise<Tenant[]> {
    return this.tenantRepo.findAll();
  }
}

