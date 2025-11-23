/**
 * UpdateTenantUseCase Tests
 */

import { UpdateTenantUseCase } from '../../../../src/application/use-cases/UpdateTenantUseCase';
import { ITenantRepository } from '../../../../src/domain/repositories/ITenantRepository';
import { Tenant } from '../../../../src/domain/entities/Tenant';

describe('UpdateTenantUseCase', () => {
  let repository: jest.Mocked<ITenantRepository>;
  let useCase: UpdateTenantUseCase;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new UpdateTenantUseCase(repository);
  });

  it('should update tenant successfully', async () => {
    const tenantId = 'tenant-id';
    const input = { name: 'Updated Name' };
    const updatedTenant = new Tenant(tenantId, 'Updated Name');

    repository.update.mockResolvedValue(updatedTenant);

    const result = await useCase.execute(tenantId, input);

    expect(result).toBeInstanceOf(Tenant);
    expect(result.id).toBe(tenantId);
    expect(result.name).toBe('Updated Name');
    expect(repository.update).toHaveBeenCalledWith(tenantId, 'Updated Name');
  });

  it('should throw error when tenant not found', async () => {
    const tenantId = 'non-existent-id';
    const input = { name: 'Updated Name' };

    repository.update.mockRejectedValue(new Error(`Tenant with id "${tenantId}" not found`));

    await expect(useCase.execute(tenantId, input)).rejects.toThrow();
    expect(repository.update).toHaveBeenCalledWith(tenantId, 'Updated Name');
  });
});

