/**
 * GetTenantUseCase Tests
 */

import { GetTenantUseCase } from '../../../../src/application/use-cases/GetTenantUseCase';
import { ITenantRepository } from '../../../../src/domain/repositories/ITenantRepository';
import { Tenant } from '../../../../src/domain/entities/Tenant';

describe('GetTenantUseCase', () => {
  let repository: jest.Mocked<ITenantRepository>;
  let useCase: GetTenantUseCase;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new GetTenantUseCase(repository);
  });

  it('should get a tenant by id successfully', async () => {
    const tenantId = 'tenant-id';
    const mockTenant = new Tenant(tenantId, 'Test Tenant');

    repository.findById.mockResolvedValue(mockTenant);

    const result = await useCase.execute(tenantId);

    expect(result).toBeInstanceOf(Tenant);
    expect(result?.id).toBe(tenantId);
    expect(result?.name).toBe('Test Tenant');
    expect(repository.findById).toHaveBeenCalledWith(tenantId);
  });

  it('should return null when tenant not found', async () => {
    repository.findById.mockResolvedValue(null);

    const result = await useCase.execute('non-existent-id');

    expect(result).toBeNull();
    expect(repository.findById).toHaveBeenCalledWith('non-existent-id');
  });
});

