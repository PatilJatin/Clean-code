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
