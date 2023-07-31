// Import necessary classes, interfaces, and dependencies
import { NextFunction, Request, Response } from "express";
import {
  OutletModel,
  OutletEntity,
  OutletMapper,
} from "@domain/outlet/entities/outlet";
import { CreateOutletUsecase } from "@domain/outlet/usecases/create-outlet";
import { GetOutletByIdUsecase } from "@domain/outlet/usecases/get-outlet-by-id";
import ApiError from "@presentation/error-handling/api-error";
import { GetAllOutlets } from "@domain/outlet/usecases/get-outlets";
import { UpdateOutletUsecase } from "@domain/outlet/usecases/update-outlet";
import { DeleteOutletUsecase } from "@domain/outlet/usecases/delete-outlet";
import { SuspendOutletUsecase } from "@domain/outlet/usecases/suspend-outlet";
import { ReactivateOutletUsecase } from "@domain/outlet/usecases/reactivate-outlet";

export class OutletService {
  private readonly createOutletUsecase: CreateOutletUsecase;
  private readonly getOutletByIdUsecase: GetOutletByIdUsecase;
  private readonly getAllOutletsUsecase: GetAllOutlets;
  private readonly updateOutletUsecase: UpdateOutletUsecase;
  private readonly deleteOutletUsecase: DeleteOutletUsecase;
  private readonly suspendOutletUsecase: SuspendOutletUsecase;
  private readonly reactivateOutletUsecase: ReactivateOutletUsecase;

  constructor(
    createOutletUsecase: CreateOutletUsecase,
    getOutletByIdUsecase: GetOutletByIdUsecase,
    getAllOutletsUsecase: GetAllOutlets,
    updateOutletUsecase: UpdateOutletUsecase,
    deleteOutletUsecase: DeleteOutletUsecase,
    suspendOutletUsecase: SuspendOutletUsecase,
    reactivateOutletUsecase: ReactivateOutletUsecase
  ) {
    this.createOutletUsecase = createOutletUsecase;
    this.getOutletByIdUsecase = getOutletByIdUsecase;
    this.getAllOutletsUsecase = getAllOutletsUsecase;
    this.updateOutletUsecase = updateOutletUsecase;
    this.deleteOutletUsecase = deleteOutletUsecase;
    this.suspendOutletUsecase = suspendOutletUsecase;
    this.reactivateOutletUsecase = reactivateOutletUsecase;
  }

  async createOutlet(req: Request, res: Response): Promise<void> {
    try {
      // Extract outlet data from the request body and convert it to OutletModel
      const outletData: OutletModel = OutletMapper.toModel(req.body);

      // Call the CreateOutletUsecase to create the outlet
      const newOutlet: OutletEntity = await this.createOutletUsecase.execute(
        outletData
      );

      // Convert newOutlet from OutletEntity to the desired format using OutletMapper
      const responseData = OutletMapper.toEntity(newOutlet, true);

      // Send the created outlet as a JSON response
      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      ApiError.internalError();
    }
  }

  async getOutletById(req: Request, res: Response): Promise<void> {
    try {
      const outletId: string = req.params.outletId;

      // Call the GetOutletByIdUsecase to get the outlet by ID
      const outlet: OutletEntity | null =
        await this.getOutletByIdUsecase.execute(outletId);

      if (outlet) {
        // Convert outlet from OutletEntity to plain JSON object using OutletMapper
        const responseData = OutletMapper.toModel(outlet);

        // Send the outlet as a JSON response
        res.json(responseData);
      } else {
        // Send a not found message as a JSON response
        const err = ApiError.notFound();
        res.status(err.status).json(err.message);
      }
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      }
      const err = ApiError.internalError();
      res.status(err.status).json(err.message);
    }
  }

  async getAllOutlets(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      // Call the GetAllOutletsUsecase to get all outlets
      const outlets: OutletEntity[] = await this.getAllOutletsUsecase.execute();

      // Convert outlets from an array of OutletEntity to an array of plain JSON objects using OutletMapper
      const responseData = outlets.map((outlet) =>
        OutletMapper.toModel(outlet)
      );

      // Send the outlets as a JSON response
      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      } else {
        ApiError.internalError();
      }
    }
  }

  async updateOutlet(req: Request, res: Response): Promise<void> {
    try {
      const outletId: string = req.params.outletId;
      const outletData: OutletModel = req.body;

      // Get the existing outlet by ID
      const existingOutlet: OutletEntity | null =
        await this.getOutletByIdUsecase.execute(outletId);

      if (!existingOutlet) {
        // If outlet is not found, send a not found message as a JSON response
        ApiError.notFound();
        return;
      }

      // Convert outletData from OutletModel to OutletEntity using OutletMapper
      const updatedOutletEntity: OutletEntity = OutletMapper.toEntity(
        outletData,
        true,
        existingOutlet
      );

      // Call the UpdateOutletUsecase to update the outlet
      const updatedOutlet: OutletEntity =
        await this.updateOutletUsecase.execute(outletId, updatedOutletEntity);

      // Convert updatedOutlet from OutletEntity to plain JSON object using OutletMapper
      const responseData = OutletMapper.toModel(updatedOutlet);

      // Send the updated outlet as a JSON response
      res.json(responseData);
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      } else {
        const err = ApiError.internalError();
        res.status(err.status).json(err.message);
      }
    }
  }

  async deleteOutlet(req: Request, res: Response): Promise<void> {
    try {
      const outletId: string = req.params.outletId;

      // Call the DeleteOutletUsecase to delete the outlet
      await this.deleteOutletUsecase.execute(outletId);

      // Send a success message as a JSON response
      res.json({ message: "Outlet deleted successfully." });
    } catch (error) {
      
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      } else {
        const err = ApiError.internalError();
        res.status(err.status).json(err.message);
      }
    }
  }

  async suspendOutlet(req: Request, res: Response): Promise<void> {
    try {
      const outletId: string = req.params.outletId;

      // Call the SuspendOutletUsecase to suspend the outlet
      await this.suspendOutletUsecase.execute(outletId);

      // Send a success message as a JSON response
      res.json({ message: "Outlet suspended successfully." });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      } else {
        ApiError.internalError();
      }
    }
  }

  async reactivateOutlet(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const outletId: string = req.params.outletId;

      // Call the ReactivateOutletUsecase to reactivate the outlet
      await this.reactivateOutletUsecase.execute(outletId);

      // Send a success message as a JSON response
      res.json({ message: "Outlet reactivated successfully." });
    } catch (error) {
      if (error instanceof ApiError) {
        res.status(error.status).json({ error: error.message });
      } else {
        ApiError.internalError();
      }
    }
  }
}
