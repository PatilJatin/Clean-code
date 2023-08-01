import { OutletModel, OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";

export interface CreateOutletUsecase {
  execute: (outletData: OutletModel) => Promise<OutletEntity>;
}


export class CreateOutlet implements CreateOutletUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(outletData: OutletModel): Promise<OutletEntity> {
    return await this.outletRepository.createOutlet(outletData);
  }
}
