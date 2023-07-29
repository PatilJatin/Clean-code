import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";
import { OutletDataSource } from "@data/outlet/datasources/outlet-data-source";

export class OutletRepositoryImpl implements OutletRepository {
  private readonly dataSource: OutletDataSource;

  constructor(dataSource: OutletDataSource) {
    this.dataSource = dataSource;
  }

  async createOutlet(outlet: OutletModel): Promise<OutletEntity> {
    return await this.dataSource.create(outlet);
  }

  async getOutletById(id: string): Promise<OutletEntity | null> {
    return await this.dataSource.read(id);
  }

  async getOutlets(): Promise<OutletEntity[]> {
    return await this.dataSource.getAllOutlets();
  }

  async update(id: string, data: OutletModel): Promise<OutletEntity> {
    return await this.dataSource.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.dataSource.delete(id);
  }

  async suspend(id: string): Promise<void> {
    await this.dataSource.suspend(id);
  }

  async reactivate(id: string): Promise<void> {

    await this.dataSource.reactivate(id);
  }
}
