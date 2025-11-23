/**
 * Tenant Controller
 * Controller para gerenciar tenants
 */

import { Request, Response } from 'express';
import { CreateTenantUseCase } from '../../application/use-cases/CreateTenantUseCase';
import { ListTenantsUseCase } from '../../application/use-cases/ListTenantsUseCase';
import { GetTenantUseCase } from '../../application/use-cases/GetTenantUseCase';
import { UpdateTenantUseCase } from '../../application/use-cases/UpdateTenantUseCase';
import { DeleteTenantUseCase } from '../../application/use-cases/DeleteTenantUseCase';
import { Tenant } from '../../domain/entities/Tenant';
import { AppError } from '../../shared/utils/AppError';
import { successResponse } from '../../shared/types/ApiResponse';

export class TenantController {
  constructor(
    private readonly createUC: CreateTenantUseCase,
    private readonly listUC: ListTenantsUseCase,
    private readonly getUC: GetTenantUseCase,
    private readonly updateUC: UpdateTenantUseCase,
    private readonly deleteUC: DeleteTenantUseCase
  ) {}

  async create(req: Request, res: Response): Promise<void> {
    try {
      if (!req.body.name || typeof req.body.name !== 'string') {
        throw AppError.badRequest('Name is required and must be a string');
      }

      const tenant = await this.createUC.execute({ name: req.body.name });
      res.status(201).json(successResponse(tenant));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async list(req: Request, res: Response): Promise<void> {
    try {
      const tenants = await this.listUC.execute();
      res.status(200).json(successResponse(tenants));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async get(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) {
        throw AppError.badRequest('Tenant id is required');
      }

      const tenant = await this.getUC.execute(req.params.id);

      if (!tenant) {
        throw AppError.notFound('Tenant not found');
      }

      res.status(200).json(successResponse(tenant));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) {
        throw AppError.badRequest('Tenant id is required');
      }

      if (!req.body.name || typeof req.body.name !== 'string') {
        throw AppError.badRequest('Name is required and must be a string');
      }

      const tenant = await this.updateUC.execute(req.params.id, { name: req.body.name });
      res.status(200).json(successResponse(tenant));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      if (!req.params.id) {
        throw AppError.badRequest('Tenant id is required');
      }

      await this.deleteUC.execute(req.params.id);
      res.status(200).json(successResponse({ message: 'Tenant deleted successfully' }));
    } catch (error) {
      this.handleError(error, res);
    }
  }

  private handleError(error: unknown, res: Response): void {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        success: false,
        error: {
          message: error.message,
          code: error.code,
        },
      });
      return;
    }

    if (error instanceof Error) {
      // Se for erro do repositório (tenant não encontrado)
      if (error.message.includes('not found')) {
        res.status(404).json({
          success: false,
          error: {
            message: error.message,
            code: 'NOT_FOUND',
          },
        });
        return;
      }

      res.status(500).json({
        success: false,
        error: {
          message: error.message || 'Internal server error',
          code: 'INTERNAL_ERROR',
        },
      });
      return;
    }

    res.status(500).json({
      success: false,
      error: {
        message: 'Internal server error',
        code: 'INTERNAL_ERROR',
      },
    });
  }
}

