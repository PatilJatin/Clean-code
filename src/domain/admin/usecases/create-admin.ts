import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";

export interface CreateAdminUsecase {
  execute: (adminData: AdminModel) => Promise<AdminEntity>
}

export class CreateAdmin implements CreateAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }
  
  async execute(adminData: AdminModel): Promise<AdminEntity> {
    return await this.adminRepository.createAdmin(adminData);
  }
}
