/**
 * Delete Tenant Use Case
 * Caso de uso para deletar um tenant
 */

import { ITenantRepository } from '../../domain/repositories/ITenantRepository';

export class DeleteTenantUseCase {
  constructor(private tenantRepo: ITenantRepository) {}

  async execute(id: string): Promise<void> {
    await this.tenantRepo.delete(id);
  }
}

