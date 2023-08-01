import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";

export interface SuspendOutletUsecase {
  execute: (outletId: string) => Promise<void>;
}

export class SuspendOutlet implements SuspendOutletUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(outletId: string): Promise<void> {
    await this.outletRepository.suspend(outletId);
  }
}
