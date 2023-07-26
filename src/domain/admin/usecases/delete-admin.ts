import { type AdminRepository } from "@domain/admin/repositories/admin-repository";

export interface DeleteAdminUsecase {
  execute: (adminId: string) => Promise<void>
}

export class DeleteAdmin implements DeleteAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId: string): Promise<void> {
    await this.adminRepository.deleteAdmin(adminId);
  }
}
