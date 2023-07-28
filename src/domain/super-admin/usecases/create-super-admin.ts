import { SuperAdminEntity, SuperAdminModel } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";

export interface CreateSuperAdminUsecase {
  execute: (superAdminData: SuperAdminModel) => Promise<SuperAdminEntity>;
}

export class CreateSuperAdmin implements CreateSuperAdminUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(superAdminData: SuperAdminModel): Promise<SuperAdminEntity> {
    return await this.superAdminRepository.createSuperAdmin(superAdminData);
  }
}
