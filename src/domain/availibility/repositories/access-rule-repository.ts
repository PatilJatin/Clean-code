
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { ShiftEntity, ShiftModel } from "../entities/shift-entity";

export interface AccessRuleRepository {
  createAccessRule(shift: ShiftModel): Promise<Either<ErrorClass, ShiftEntity>>;
  updateAccessRule( id: string , shiftData: ShiftModel ): Promise<Either<ErrorClass, ShiftEntity>>
  getAccessRuleById( id: string ): Promise<Either<ErrorClass, ShiftEntity>>
  deleteAccessRule(id: string): Promise<Either<ErrorClass, void>>;
  getAllAccessRule(): Promise<Either<ErrorClass, ShiftEntity[]>>;
}
 