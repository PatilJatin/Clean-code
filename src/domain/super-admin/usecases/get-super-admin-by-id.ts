import { SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";

export interface GetSuperAdminByIdUsecase {
  execute: (superAdminId: string) => Promise<SuperAdminEntity | null>;
}

export class GetSuperAdminById implements GetSuperAdminByIdUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(superAdminId: string): Promise<SuperAdminEntity | null> {
    return await this.superAdminRepository.getSuperAdminById(superAdminId)
  }
  
}
