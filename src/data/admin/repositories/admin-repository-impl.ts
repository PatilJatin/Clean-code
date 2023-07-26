// import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
// import { AdminRepository } from "@domain/admin/repositories/admin-repository";
// import { AdminDataSource } from "@data/admin/datasources/admin-data-source";

// class AdminRepositoryImpl implements AdminRepository{

//     private datasource: AdminDataSource

//     constructor(datasource: AdminDataSource){
//         this.datasource = datasource;
//     }

//     createAdmin(admin: AdminModel): Promise<AdminEntity> {
//         throw new Error("Method not implemented.");
//     }

//     deleteAdmin(id: string): Promise<void> {
//         throw new Error("Method not implemented.");
//     }

//     updateAdmin(id: string, data: AdminModel): Promise<AdminEntity> {
//         throw new Error("Method not implemented.");
//     }

//     getAdmins(): Promise<AdminEntity[]> {
//         throw new Error("Method not implemented.");
//     }

//     getAdminById(id: string): Promise<AdminEntity | null> {
//         throw new Error("Method not implemented.");
//     }

// }

import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { AdminDataSource } from "@data/admin/datasources/admin-data-source";

export class AdminRepositoryImpl implements AdminRepository {
  private readonly dataSource: AdminDataSource;

  constructor(dataSource: AdminDataSource) {
    this.dataSource = dataSource;
  }

  async createAdmin(admin: AdminModel): Promise<AdminEntity> {
    return await this.dataSource.create(admin);
  }

  async deleteAdmin(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateAdmin(id: string, data: AdminModel): Promise<AdminEntity> {
    return await this.dataSource.update(id, data);
  }

  async getAdmins(): Promise<AdminEntity[]> {
    return await this.dataSource.getAllAdmins();
  }

  async getAdminById(id: string): Promise<AdminEntity | null> {
    return await this.dataSource.read(id);
  }
}
