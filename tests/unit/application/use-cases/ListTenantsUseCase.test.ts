/**
 * ListTenantsUseCase Tests
 */

import { ListTenantsUseCase } from '../../../../src/application/use-cases/ListTenantsUseCase';
import { ITenantRepository } from '../../../../src/domain/repositories/ITenantRepository';
import { Tenant } from '../../../../src/domain/entities/Tenant';

describe('ListTenantsUseCase', () => {
  let repository: jest.Mocked<ITenantRepository>;
  let useCase: ListTenantsUseCase;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new ListTenantsUseCase(repository);
  });

  it('should list all tenants', async () => {
    const mockTenants = [
      new Tenant('id-1', 'Tenant 1'),
      new Tenant('id-2', 'Tenant 2'),
      new Tenant('id-3', 'Tenant 3'),
    ];

    repository.findAll.mockResolvedValue(mockTenants);

    const result = await useCase.execute();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(3);
    expect(result[0]?.name).toBe('Tenant 1');
    expect(result[1]?.name).toBe('Tenant 2');
    expect(result[2]?.name).toBe('Tenant 3');
    expect(repository.findAll).toHaveBeenCalled();
  });

  it('should return empty array when no tenants exist', async () => {
    repository.findAll.mockResolvedValue([]);

    const result = await useCase.execute();

    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(0);
    expect(repository.findAll).toHaveBeenCalled();
  });
});

