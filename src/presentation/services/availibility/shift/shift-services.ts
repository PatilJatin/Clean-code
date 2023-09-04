import { NextFunction, Request, Response } from "express";

import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { CreateShiftUsecase } from "@domain/availibility/usecases/shift-usecase/create-usecase";
import { ShiftEntity, ShiftMapper, ShiftModel } from "@domain/availibility/entities/shift-entity";
import { UpdateShiftUsecase } from "@domain/availibility/usecases/shift-usecase/update-usecase";
import { GetShiftByIdUsecase } from "@domain/availibility/usecases/shift-usecase/get-shift-by-id.usecase";
import { DeleteShiftUsecase } from "@domain/availibility/usecases/shift-usecase/delete-usecase";
import { GetAllShiftsUsecase } from "@domain/availibility/usecases/shift-usecase/getall-shifts-usecase";

export class ShiftService {
  private readonly createShiftUsecase: CreateShiftUsecase;
  private readonly updateShiftUsecase: UpdateShiftUsecase;
  private readonly getShiftByIdUsecase: GetShiftByIdUsecase;
  private readonly deleteShiftUsecase: DeleteShiftUsecase;
  private readonly getAllShiftUsecase: GetAllShiftsUsecase;

  constructor(
      createShiftUsecase: CreateShiftUsecase,
      updateShiftUsecase: UpdateShiftUsecase,
      getShiftByIdUsecase: GetShiftByIdUsecase,
      deleteShiftUsecase: DeleteShiftUsecase,
      getAllShiftUsecase: GetAllShiftsUsecase
  ) {
    this.createShiftUsecase = createShiftUsecase; 
    this.updateShiftUsecase = updateShiftUsecase;
    this.getShiftByIdUsecase = getShiftByIdUsecase;
    this.deleteShiftUsecase = deleteShiftUsecase;
    this.getAllShiftUsecase = getAllShiftUsecase;
  }

  async createShift(req: Request, res: Response): Promise<void> {
  
    const shiftData: ShiftModel = ShiftMapper.toModel(req.body);

    const newShift: Either<ErrorClass, ShiftEntity> =
      await this.createShiftUsecase.execute(shiftData);

      newShift.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: ShiftEntity) => {
        const resData = ShiftMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }


  async updateShift(req: Request, res: Response): Promise<void> {
    const shiftId: string = req.params.shiftId;
    const shiftData: ShiftModel = req.body;

    // Get the existing shift by ID
    const existingShift: Either<ErrorClass, ShiftEntity> =
      await this.getShiftByIdUsecase.execute(shiftId);

     

      existingShift.cata(
      (error: ErrorClass) => {
        res.status(error.status).json({ error: error.message });
      },
      async (result: ShiftEntity) => {
        const resData = ShiftMapper.toEntity(result, true);
        const updatedShiftEntity: ShiftEntity = ShiftMapper.toEntity(
          shiftData,
          true,
          resData
        );

        res.json(updatedShiftEntity);
       

        // Call the UpdateAdminUsecase to update the admin
        // const updatedShift: Either<ErrorClass, ShiftEntity> =
        //   await this.updateShiftUsecase.execute(shiftId, updatedShiftEntity);

        // updatedShift.cata(
        //   (error: ErrorClass) => {
        //     res.status(error.status).json({ error: error.message });
        //   },
        //   (response: ShiftEntity) => {
        //     // Convert updatedShift from AdminEntity to plain JSON object using AdminMapper
        //     const responseData = ShiftMapper.toModel(response);

        //     // Send the updated admin as a JSON response
        //     res.json(responseData);
        //   }
        // );
      }
    );
  }


    async getShiftById(req: Request, res: Response): Promise<void> {

    const shiftId: string = req.params.shiftId;

    // Call the GetAdminByIdUsecase to get the admin by ID
    const admin: Either<ErrorClass, ShiftEntity> =
      await this.getShiftByIdUsecase.execute(shiftId);

    admin.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: ShiftEntity) => {
        const resData = ShiftMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }

    async deleteShift(req: Request, res: Response): Promise<void> {
    const shiftId: string = req.params.shiftId;

    // Call the DeleteAdminUsecase to delete the admin
    const response: Either<ErrorClass, void> =
      await this.deleteShiftUsecase.execute(shiftId);

    (await response).cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: void) => {
        return res.json({ message: "Shift deleted successfully." });
      }
    );
  }


  async getAllShifts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    // Call the GetAllAdminsUsecase to get all admins
    const shifts: Either<ErrorClass, ShiftEntity[]> =
      await this.getAllShiftUsecase.execute();

      shifts.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (shifts: ShiftEntity[]) => {
        const resData = shifts.map((shift) => ShiftMapper.toEntity(shift));
        return res.json(resData);
      }
    );
  }
}
