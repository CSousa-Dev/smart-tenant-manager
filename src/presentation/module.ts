/**
 * Tenant Manager Module
 * Registra o módulo tenant-manager na aplicação
 */

import { Application } from 'express';
import { router, setTenantController } from './routes/tenantRoutes';
import { TenantController } from './controllers/TenantController';
import { CreateTenantUseCase } from '../application/use-cases/CreateTenantUseCase';
import { ListTenantsUseCase } from '../application/use-cases/ListTenantsUseCase';
import { GetTenantUseCase } from '../application/use-cases/GetTenantUseCase';
import { UpdateTenantUseCase } from '../application/use-cases/UpdateTenantUseCase';
import { DeleteTenantUseCase } from '../application/use-cases/DeleteTenantUseCase';
import { InMemoryTenantRepository } from '../infrastructure/repositories/InMemoryTenantRepository';
import { config } from '../config/environment';

export function registerModule(app: Application): void {
  // Inicializa repositório
  const repository = new InMemoryTenantRepository();

  // Inicializa use cases
  const createTenantUseCase = new CreateTenantUseCase(repository);
  const listTenantsUseCase = new ListTenantsUseCase(repository);
  const getTenantUseCase = new GetTenantUseCase(repository);
  const updateTenantUseCase = new UpdateTenantUseCase(repository);
  const deleteTenantUseCase = new DeleteTenantUseCase(repository);

  // Inicializa controller
  const tenantController = new TenantController(
    createTenantUseCase,
    listTenantsUseCase,
    getTenantUseCase,
    updateTenantUseCase,
    deleteTenantUseCase
  );

  // Configura controller nas rotas
  setTenantController(tenantController);

  // Registra rotas
  const apiPrefix = config.apiPrefix || '/api';
  app.use(`${apiPrefix}/tenants`, router);
}

