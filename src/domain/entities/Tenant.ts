/**
 * Tenant Entity
 * Entidade de domínio representando um tenant
 */

export class Tenant {
  constructor(
    public readonly id: string,
    public name: string
  ) {}
}

