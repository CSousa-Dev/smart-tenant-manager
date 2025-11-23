/**
 * Tenant Entity Tests
 */

import { Tenant } from '../../../../src/domain/entities/Tenant';

describe('Tenant', () => {
  describe('constructor', () => {
    it('should create a tenant with id and name', () => {
      const tenant = new Tenant('tenant-id', 'Test Tenant');

      expect(tenant.id).toBe('tenant-id');
      expect(tenant.name).toBe('Test Tenant');
    });

    it('should allow updating name', () => {
      const tenant = new Tenant('tenant-id', 'Original Name');

      tenant.name = 'Updated Name';

      expect(tenant.name).toBe('Updated Name');
      expect(tenant.id).toBe('tenant-id');
    });

    it('should create multiple tenants with different ids', () => {
      const tenant1 = new Tenant('id-1', 'Tenant 1');
      const tenant2 = new Tenant('id-2', 'Tenant 2');

      expect(tenant1.id).toBe('id-1');
      expect(tenant2.id).toBe('id-2');
      expect(tenant1.name).toBe('Tenant 1');
      expect(tenant2.name).toBe('Tenant 2');
    });

    it('should create tenant with empty name', () => {
      const tenant = new Tenant('tenant-id', '');

      expect(tenant.id).toBe('tenant-id');
      expect(tenant.name).toBe('');
    });
  });
});

