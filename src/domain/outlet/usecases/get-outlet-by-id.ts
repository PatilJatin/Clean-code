import { OutletEntity } from "@domain/outlet/entities/outlet";
import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";

export interface GetOutletByIdUsecase {
  execute: (outletId: string) => Promise<OutletEntity | null>;
}

export class GetOutletById implements GetOutletByIdUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(outletId: string): Promise<OutletEntity | null> {
    return await this.outletRepository.getOutletById(outletId);
  }
}
