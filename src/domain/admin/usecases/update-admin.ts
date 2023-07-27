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

  // async execute(adminId: string, adminData: AdminModel): Promise<AdminEntity> {
  //   return await this.adminRepository.updateAdmin(adminId, adminData);
  // }
  // UpdateAdminUsecase
  async execute(
    adminId: string,
    adminData: Partial<AdminModel>
  ): Promise<AdminEntity> {
    const existingAdmin: AdminEntity | null =
      await this.adminRepository.getAdminById(adminId);

    if (!existingAdmin) {
      throw new Error("Admin not found.");
    }

    // Perform the partial update by merging adminData with existingAdmin
    const updatedAdminData: AdminModel = {
      ...existingAdmin,
      ...adminData,
    };

    // Save the updatedAdminData to the repository
    await this.adminRepository.updateAdmin(adminId, updatedAdminData);

    // Fetch the updated admin entity from the repository
    const updatedAdminEntity: AdminEntity | null =
      await this.adminRepository.getAdminById(adminId);

    if (!updatedAdminEntity) {
      throw new Error("Admin not found after update.");
    }

    return updatedAdminEntity;
  }
}
