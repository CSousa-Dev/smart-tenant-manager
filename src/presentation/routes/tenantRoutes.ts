/**
 * Tenant Routes
 * Define as rotas REST para tenants
 */

import { Router, Request, Response } from 'express';
import { TenantController } from '../controllers/TenantController';

const router = Router();

// Inicializa controller (será injetado via módulo)
let tenantController: TenantController;

export function setTenantController(controller: TenantController): void {
  tenantController = controller;
}

// Rotas CRUD
router.post('/', (req: Request, res: Response) => tenantController.create(req, res));

router.get('/', (req: Request, res: Response) => tenantController.list(req, res));

router.get('/:id', (req: Request, res: Response) => tenantController.get(req, res));

router.put('/:id', (req: Request, res: Response) => tenantController.update(req, res));

router.delete('/:id', (req: Request, res: Response) => tenantController.delete(req, res));

export { router };

