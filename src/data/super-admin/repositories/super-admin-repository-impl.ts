import { SuperAdminModel, SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";
import { SuperAdminRepository } from "@domain/super-admin/repositories/super-admin-repository";
import { SuperAdminDataSource } from "@data/super-admin/datasources/super-admin-data-source";

export class SuperAdminRepositoryImpl implements SuperAdminRepository {
  private readonly dataSource: SuperAdminDataSource;

  constructor(dataSource: SuperAdminDataSource) {
    this.dataSource = dataSource;
  }

  async createSuperAdmin(superAdmin: SuperAdminModel): Promise<SuperAdminEntity> {
    return await this.dataSource.create(superAdmin);
  }

  async deleteSuperAdmin(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async updateSuperAdmin(id: string, data: SuperAdminModel): Promise<SuperAdminEntity> {
    return await this.dataSource.update(id, data);
  }

  async getSuperAdmins(): Promise<SuperAdminEntity[]> {
    return await this.dataSource.getAllAdmins();
  }

  async getSuperAdminById(id: string): Promise<SuperAdminEntity | null> {
    return await this.dataSource.read(id);
  }
}
