import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";

export interface OutletRepository {
  createOutlet(outlet: OutletModel): Promise<OutletEntity>;
  getOutletById(id: string): Promise<OutletEntity | null>;
  getOutlets(): Promise<OutletEntity[]>;
  update(id: string, outlet: OutletModel): Promise<any>;
  delete(id: string): Promise<void>;
  suspend(id: string): Promise<void>;
  reactivate(id: string): Promise<any>;
}
