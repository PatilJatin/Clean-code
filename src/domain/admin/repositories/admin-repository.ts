import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";

export interface AdminRepository {
  createAdmin(admin: AdminModel): Promise<AdminEntity>;
  deleteAdmin(id: string): Promise<void>;
  updateAdmin(id: string, data: AdminModel): Promise<AdminEntity>;
  getAdmins(): Promise<AdminEntity[]>;
  getAdminById(id: string): Promise<AdminEntity | null>;
}
