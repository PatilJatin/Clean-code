import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import {Either} from "monet";
import {ErrorClass} from "@presentation/error-handling/api-error"
export interface AdminRepository {
  createAdmin(admin: AdminModel): Promise<Either<ErrorClass,AdminEntity>>;
  deleteAdmin(id: string): Promise<void>;
  updateAdmin(id: string, data: AdminModel): Promise<AdminEntity>;
  getAdmins(): Promise<AdminEntity[]>;
  getAdminById(id: string): Promise<AdminEntity | null>;
}
