import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";

export interface ReactivateOutletUsecase {
  execute: (outletId: string) => Promise<void>;
}

export class ReactivateOutlet implements ReactivateOutletUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(outletId: string): Promise<void> {
    await this.outletRepository.reactivate(outletId);
  }
}
