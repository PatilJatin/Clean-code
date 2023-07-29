// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response
import { OutletService } from "@presentation/services/outlet-services";
import { OutletDataSourceImpl } from "@data/outlet/datasources/outlet-data-source";
import { OutletRepositoryImpl } from "@data/outlet/repositories/outlet-repository-impl";
import { CreateOutlet } from "@domain/outlet/usecases/create-outlet";
import { GetOutletById } from "@domain/outlet/usecases/get-outlet-by-id";
import { GetAllOutlets } from "@domain/outlet/usecases/get-outlets";
import { UpdateOutlet } from "@domain/outlet/usecases/update-outlet";
import { DeleteOutlet } from "@domain/outlet/usecases/delete-outlet";
import { SuspendOutlet } from "@domain/outlet/usecases/suspend-outlet";
import { ReactivateOutlet } from "@domain/outlet/usecases/reactivate-outlet";

// Create an instance of the OutletDataSourceImpl and pass the mongoose connection
const outletDataSource = new OutletDataSourceImpl(mongoose.connection);

// Create an instance of the OutletRepositoryImpl and pass the OutletDataSourceImpl
const outletRepository = new OutletRepositoryImpl(outletDataSource);

// Create instances of the required use cases and pass the OutletRepositoryImpl
const createOutletUsecase = new CreateOutlet(outletRepository);
const getOutletByIdUsecase = new GetOutletById(outletRepository);
const getOutletsUsecase = new GetAllOutlets(outletRepository);
const updateOutletUsecase = new UpdateOutlet(outletRepository);
const deleteOutletUsecase = new DeleteOutlet(outletRepository);
const suspendOutletUsecase = new SuspendOutlet(outletRepository);
const reactivateOutletUsecase = new ReactivateOutlet(outletRepository);
// Initialize OutletService and inject required dependencies
const outletService = new OutletService(
  createOutletUsecase,
  getOutletByIdUsecase,
  getOutletsUsecase,
  updateOutletUsecase,
  deleteOutletUsecase,
  suspendOutletUsecase,
  reactivateOutletUsecase
);

// Create an Express router
export const outletRouter = Router();

// Route handling for creating a new outlet
outletRouter.post(
  "/outlet/create",
  outletService.createOutlet.bind(outletService)
);

//Route handling for getOutletById
outletRouter.get(
  "/outlet/getById/:outletId",
  outletService.getOutletById.bind(outletService)
);

//Route hanndling for getOutlets
outletRouter.get(
  "/outlet/getAllOutlets",
  outletService.getAllOutlets.bind(outletService)
);

outletRouter.put(
  "/outlet/updateOutlet/:outletId",
  outletService.updateOutlet.bind(outletService)
);

outletRouter.delete(
  "/outlet/deleteOutlet/:outletId",
  outletService.deleteOutlet.bind(outletService)
);

outletRouter.patch(
  "/outlet/suspendOutlet/:outletId",
  outletService.suspendOutlet.bind(outletService)
);

outletRouter.patch(
  "/outlet/reactivateOutlet/:outletId",
  outletService.reactivateOutlet.bind(outletService)
);
