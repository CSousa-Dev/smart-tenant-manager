/**
 * DeleteTenantUseCase Tests
 */

import { DeleteTenantUseCase } from '../../../../src/application/use-cases/DeleteTenantUseCase';
import { ITenantRepository } from '../../../../src/domain/repositories/ITenantRepository';

describe('DeleteTenantUseCase', () => {
  let repository: jest.Mocked<ITenantRepository>;
  let useCase: DeleteTenantUseCase;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new DeleteTenantUseCase(repository);
  });

  it('should delete tenant successfully', async () => {
    const tenantId = 'tenant-id';

    repository.delete.mockResolvedValue();

    await useCase.execute(tenantId);

    expect(repository.delete).toHaveBeenCalledWith(tenantId);
  });

  it('should throw error when tenant not found', async () => {
    const tenantId = 'non-existent-id';

    repository.delete.mockRejectedValue(new Error(`Tenant with id "${tenantId}" not found`));

    await expect(useCase.execute(tenantId)).rejects.toThrow();
    expect(repository.delete).toHaveBeenCalledWith(tenantId);
  });
});

