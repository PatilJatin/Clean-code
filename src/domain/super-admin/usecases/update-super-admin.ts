import { SuperAdminEntity, SuperAdminModel } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";
import ApiError from "@presentation/error-handling/api-error";

export interface UpdateSuperAdminUsecase {
  execute: (
    superAdminId: string,
    superAdminData: Partial<SuperAdminModel>
  ) => Promise<SuperAdminEntity>;
}

export class UpdateSuperAdmin implements UpdateSuperAdminUsecase {
  private readonly SuperAdminRepository: SuperAdminRepository;

  constructor(SuperAdminRepository: SuperAdminRepository) {
    this.SuperAdminRepository = SuperAdminRepository;
  }

  async execute(
    superAdminId: string,
    superAdminData: Partial<SuperAdminModel>
  ): Promise<SuperAdminEntity> {
    const existingSuperAdmin: SuperAdminEntity | null =
      await this.SuperAdminRepository.getSuperAdminById(superAdminId);

    if (!existingSuperAdmin) {
      throw ApiError.emailExits();
    }

    // Perform the partial update by merging adminData with existingAdmin
    const updatedSuperAdminData: SuperAdminModel = {
      ...existingSuperAdmin,
      ...superAdminData,
    };

    // Save the updatedAdminData to the repository
    await this.SuperAdminRepository.updateSuperAdmin(superAdminId, updatedSuperAdminData);

    // Fetch the updated admin entity from the repository
    const updatedSuperAdminEntity: SuperAdminEntity | null =
      await this.SuperAdminRepository.getSuperAdminById(superAdminId);

    if (!updatedSuperAdminEntity) {
      throw new Error("Admin not found after update.");
    }

    return updatedSuperAdminEntity;
  }
}
