import { SuperAdminModel, SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";

export interface SuperAdminRepository {
  createSuperAdmin(superadmin: SuperAdminModel): Promise<SuperAdminEntity>;
  deleteSuperAdmin(id: string): Promise<void>;
  updateSuperAdmin(id: string, data: SuperAdminModel): Promise<SuperAdminEntity>;
  getSuperAdmins(): Promise<SuperAdminEntity[]>;
  getSuperAdminById(id: string): Promise<SuperAdminEntity | null>;
}
