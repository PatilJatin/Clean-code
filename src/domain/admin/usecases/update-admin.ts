import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";

export interface UpdateAdminUsecase {
  execute: (
    adminId: string,
    adminData: Partial<AdminModel>
  ) => Promise<AdminEntity>;
}

export class UpdateAdmin implements UpdateAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(
    adminId: string,
    adminData: Partial<AdminModel>
  ): Promise<AdminEntity> {
    const existingAdmin: AdminEntity | null =
      await this.adminRepository.getAdminById(adminId);

    if (!existingAdmin) {
      throw new Error("Admin not found.");
    }

    const updatedAdminData: AdminModel = {
      ...existingAdmin,
      ...adminData,
    };

   
    await this.adminRepository.updateAdmin(adminId, updatedAdminData);

    const updatedAdminEntity: AdminEntity | null =
      await this.adminRepository.getAdminById(adminId);

    if (!updatedAdminEntity) {
      throw new Error("Admin not found after update.");
    }

    return updatedAdminEntity;
  }
}
