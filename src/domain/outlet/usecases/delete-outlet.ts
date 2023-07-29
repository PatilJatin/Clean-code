import { OutletRepository } from "@domain/outlet/repositories/outlet-repository";

export interface DeleteOutletUsecase {
  execute: (outletId: string) => Promise<void>;
}

export class DeleteOutlet implements DeleteOutletUsecase {
  private readonly outletRepository: OutletRepository;

  constructor(outletRepository: OutletRepository) {
    this.outletRepository = outletRepository;
  }

  async execute(outletId: string): Promise<void> {
    await this.outletRepository.delete(outletId);
  }
}
