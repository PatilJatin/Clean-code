import { OutletEntity, OutletModel } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";

export interface UpdateOutletUsecase {
  execute: (
    outletId: string,
    outletData: Partial<OutletModel>
  ) => Promise<OutletEntity>;
}

export class UpdateOutlet implements UpdateOutletUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(
    outletId: string,
    outletData: Partial<OutletModel>
  ): Promise<OutletEntity> {
    const existingOutlet: OutletEntity | null =
      await this.outletRepository.getOutletById(outletId);

    if (!existingOutlet) {
      throw new Error("Outlet not found.");
    }

    // Perform the partial update by merging outletData with existingOutlet
    const updatedOutletData: OutletModel = {
      ...existingOutlet,
      ...outletData,
    };

    // Save the updatedOutletData to the repository
    await this.outletRepository.update(outletId, updatedOutletData);

    // Fetch the updated outlet entity from the repository
    const updatedOutletEntity: OutletEntity | null =
      await this.outletRepository.getOutletById(outletId);

    if (!updatedOutletEntity) {
      throw new Error("Outlet not found after update.");
    }

    return updatedOutletEntity;
  }
}
