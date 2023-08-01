import { OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";

export interface GetAllOutletsUsecase {
  execute: () => Promise<OutletEntity[]>;
}

export class GetAllOutlets implements GetAllOutletsUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(): Promise<OutletEntity[]> {
    return await this.outletRepository.getOutlets();
  }
}
