// // import { OutletMediaRepository } from "@data/outlet/repositories/outlet-media-repository";

// import { GetPresignedUrlEntity } from "@domain/outlet/entities/outlet-media";

// // Define the input and output for the use case
// interface GetPresignedUrlInput {
//   objectKey: string;
// }

// interface GetPresignedUrlOutputUseCases {
//   execute: (outletId: string) => Promise<GetPresignedUrlEntity | null>;
// }

// // Define the GetPresignedUrl use case
// export class GetPresignedUrl implements GetPresignedUrlOutputUseCases {
//   constructor(private readonly outletMediaRepository: OutletMediaRepository) {}

//   async execute(input: GetPresignedUrlInput): Promise<GetPresignedUrlEntity> {
//     const { objectKey } = input;
//     // Validate the input, e.g., check if objectKey is provided and valid.

//     // Call the OutletMediaRepository to get the signed URL
//     const signedUrl = await this.outletMediaRepository.getPresignedUrl(objectKey);

//     return { signedUrl };
//   }
// }


// // export interface GetOutletByIdUsecase {
// //   execute: (outletId: string) => Promise<OutletEntity | null>;
// // }

// // export class GetOutletById implements GetOutletByIdUsecase {
// //   private readonly outletRepository: OutletRepository;

// //   constructor(outletRepository: OutletRepository) {
// //     this.outletRepository = outletRepository;
// //   }

// //   async execute(outletId: string): Promise<OutletEntity | null> {
// //     return await this.outletRepository.getOutletById(outletId);
// //   }
// // }

import { MediaOutletRepository } from "@domain/outlet/repositories/media-outlet-repository";

export interface GetPreSignedUrlUsecase {
  execute: (outletId: string) => Promise<any>;
}

export class GetPreSignedUrl implements GetPreSignedUrlUsecase {
  private readonly mediaOutletRepo: MediaOutletRepository;

  constructor(mediaOutletRepo: MediaOutletRepository) {
    this.mediaOutletRepo = mediaOutletRepo;
  }

  async execute(outletId: string): Promise<void> {
    await this.mediaOutletRepo.getPreSignedUrl(outletId);
  }
}





