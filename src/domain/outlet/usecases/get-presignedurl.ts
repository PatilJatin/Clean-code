
import { MediaOutletRepository } from "@domain/outlet/repositories/media-outlet-repository";

export interface GetPreSignedUrlUsecase {
  execute: (outletId: string) => Promise<string>;
}

export class GetPreSignedUrl implements GetPreSignedUrlUsecase {
  private readonly mediaOutletRepo: MediaOutletRepository;

  constructor(mediaOutletRepo: MediaOutletRepository) {
    this.mediaOutletRepo = mediaOutletRepo;
  }

  async execute(outletId: string): Promise<string> {
  return await this.mediaOutletRepo.getPreSignedUrl(outletId);
  }
}





