/**
 * Update Tenant Use Case
 * Caso de uso para atualizar um tenant
 */

import { ITenantRepository } from '../../domain/repositories/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';

export class UpdateTenantUseCase {
  constructor(private tenantRepo: ITenantRepository) {}

  async execute(id: string, input: { name: string }): Promise<Tenant> {
    return this.tenantRepo.update(id, input.name);
  }
}

