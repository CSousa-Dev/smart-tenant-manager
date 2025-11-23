/**
 * CreateTenantUseCase Tests
 */

import { CreateTenantUseCase } from '../../../../src/application/use-cases/CreateTenantUseCase';
import { ITenantRepository } from '../../../../src/domain/repositories/ITenantRepository';
import { Tenant } from '../../../../src/domain/entities/Tenant';

describe('CreateTenantUseCase', () => {
  let repository: jest.Mocked<ITenantRepository>;
  let useCase: CreateTenantUseCase;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new CreateTenantUseCase(repository);
  });

  it('should create a tenant successfully', async () => {
    const input = { name: 'Test Tenant' };
    const mockTenant = new Tenant('tenant-id', 'Test Tenant');

    repository.create.mockResolvedValue(mockTenant);

    const result = await useCase.execute(input);

    expect(result).toBeInstanceOf(Tenant);
    expect(result.name).toBe('Test Tenant');
    expect(repository.create).toHaveBeenCalledWith('Test Tenant');
  });

  it('should create tenant with different names', async () => {
    const input1 = { name: 'Tenant A' };
    const input2 = { name: 'Tenant B' };
    const mockTenant1 = new Tenant('id-1', 'Tenant A');
    const mockTenant2 = new Tenant('id-2', 'Tenant B');

    repository.create
      .mockResolvedValueOnce(mockTenant1)
      .mockResolvedValueOnce(mockTenant2);

    const result1 = await useCase.execute(input1);
    const result2 = await useCase.execute(input2);

    expect(result1.name).toBe('Tenant A');
    expect(result2.name).toBe('Tenant B');
    expect(repository.create).toHaveBeenCalledTimes(2);
  });
});

