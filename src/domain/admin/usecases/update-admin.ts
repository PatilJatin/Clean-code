// import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
// import { AdminRepository } from "@domain/admin/repositories/admin-repository";
// import { ErrorClass } from "@presentation/error-handling/api-error";
// import { Either } from "monet";
// export interface UpdateAdminUsecase {
//   execute: (
//     adminId: string,
//     adminData: Partial<AdminModel>
//   ) => Promise<Either<ErrorClass, AdminEntity>>;
// }

// export class UpdateAdmin implements UpdateAdminUsecase {
//   private readonly adminRepository: AdminRepository;

//   constructor(adminRepository: AdminRepository) {
//     this.adminRepository = adminRepository;
//   }

//   async execute(
//     adminId: string,
//     adminData: Partial<AdminModel>
//   ): Promise<Either<ErrorClass, AdminEntity>> {
//     const existingAdmin: AdminEntity  =
//       await this.adminRepository.getAdminById(adminId);

//     if (!existingAdmin) {
//       throw new Error("Admin not found.");
//     }

//     // Perform the partial update by merging adminData with existingAdmin
//     const updatedAdminData: AdminModel = {
//       ...existingAdmin,
//       ...adminData,
//     };

//     // Save the updatedAdminData to the repository
//     await this.adminRepository.updateAdmin(adminId, updatedAdminData);

//     // Fetch the updated admin entity from the repository
//     const updatedAdminEntity: AdminEntity =
//       await this.adminRepository.getAdminById(adminId);

//     if (!updatedAdminEntity) {
//       throw new Error("Admin not found after update.");
//     }

//     return updatedAdminEntity;
//   }
// }

import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
export interface UpdateAdminUsecase {
  execute: (
    adminId: string,
    adminData: AdminModel
  ) => Promise<Either<ErrorClass, AdminEntity>>;
}

export class UpdateAdmin implements UpdateAdminUsecase {
  private readonly adminRepository: AdminRepository;

  constructor(adminRepository: AdminRepository) {
    this.adminRepository = adminRepository;
  }

  async execute(
    adminId: string,
    adminData: AdminModel
  ): Promise<Either<ErrorClass, AdminEntity>> {
    return await this.adminRepository.updateAdmin(adminId, adminData);
  }
}
