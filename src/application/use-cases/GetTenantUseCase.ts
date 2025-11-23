/**
 * Get Tenant Use Case
 * Caso de uso para buscar um tenant por ID
 */

import { ITenantRepository } from '../../domain/repositories/ITenantRepository';
import { Tenant } from '../../domain/entities/Tenant';

export class GetTenantUseCase {
  constructor(private tenantRepo: ITenantRepository) {}

  async execute(id: string): Promise<Tenant | null> {
    return this.tenantRepo.findById(id);
  }
}

