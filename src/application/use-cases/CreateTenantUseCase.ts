/**
 * Create Tenant Use Case
 * Caso de uso para criar um novo tenant
 */

import { ITenantRepository } from '../../domain/repositories/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';

export class CreateTenantUseCase {
  constructor(private tenantRepo: ITenantRepository) {}

  async execute(input: { name: string }): Promise<Tenant> {
    return this.tenantRepo.create(input.name);
  }
}

