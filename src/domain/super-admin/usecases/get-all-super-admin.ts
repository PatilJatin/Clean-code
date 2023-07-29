import { SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";

export interface GetAllSuperAdminsUsecase {
  execute: () => Promise<SuperAdminEntity[]>;
}

export class GetAllSuperAdmins implements GetAllSuperAdminsUsecase {
  private readonly SuperAdminRepository: SuperAdminRepository;

  constructor(SuperAdminRepository: SuperAdminRepository) {
    this.SuperAdminRepository = SuperAdminRepository;
  }

  async execute(): Promise<SuperAdminEntity[]> {
    return await this.SuperAdminRepository.getSuperAdmins();
  }
}
