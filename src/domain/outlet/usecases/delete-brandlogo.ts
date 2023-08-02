import { MediaOutletRepository } from "@domain/outlet/repositories/media-outlet-repository";

export interface DeleteBrandLogoUsecase {
  execute: () => Promise<string>;
}

export class DeleteBrandLogo implements DeleteBrandLogoUsecase {
  private readonly mediaOutletRepo: MediaOutletRepository;

  constructor(mediaOutletRepo: MediaOutletRepository) {
    this.mediaOutletRepo = mediaOutletRepo;
  }

  async execute(): Promise<string> {
    return await this.mediaOutletRepo.deleteBrandLogo();
  }
}
