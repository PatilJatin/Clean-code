import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";

export interface UpdateAdminUsecase {
  execute: (adminId: string, adminData: AdminModel) => Promise<AdminEntity>;
}

export class UpdateAdmin implements UpdateAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(adminId: string, adminData: AdminModel): Promise<AdminEntity> {
    return await this.adminRepository.updateAdmin(adminId, adminData);
  }
}
