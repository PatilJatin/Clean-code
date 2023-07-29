import { type SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";

export interface DeleteSuperAdminUsecase {
  execute: (superAdminId: string) => Promise<void>
}

export class DeleteSuperAdmin implements DeleteSuperAdminUsecase {
  private readonly superAdminRepository: SuperAdminRepository;

  constructor(superAdminRepository: SuperAdminRepository) {
    this.superAdminRepository = superAdminRepository;
  }

  async execute(superAdminId: string): Promise<void> {
    await this.superAdminRepository.deleteSuperAdmin(superAdminId)
  }
}
