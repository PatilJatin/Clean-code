// // import { OutletMediaRepository } from "@data/outlet/repositories/outlet-media-repository";

// import { OutletMediaRepository } from "@data/aws/repositories/outlet-media-repository";
// import { Request, Response } from "express";

// export class OutletMediaService {
//   constructor(private readonly outletMediaRepository: OutletMediaRepository) {}

//   async getPresignedUrl(objectKey: string): Promise<string> {
//     return this.outletMediaRepository.getPresignedUrl(objectKey);
//   }
// }

// export class outletMedia {
     
// }


// async getPresignedUrl(req: equest, res: response): Promise<string> {
//   try {
//       const outletId:string=req.params.outletId
//     // Call the CreateOutletUsecase to create the outlet
//     const url= await this.createOutletUsecase.execute(
//       outletId
//     );

//     // Convert newOutlet from OutletEntity to the desired format using OutletMapper
//     // const responseData = OutletMapper.toEntity(newOutlet, true);

//     // Send the created outlet as a JSON response
//     res.json(responseData);
//   } catch (error) {
//     if (error instanceof ApiError) {
//       res.status(error.status).json({ error: error.message });
//     }
//     ApiError.internalError();
//   }
// }



// async reactivateOutlet(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> {
//   try {
//     const outletId: string = req.params.outletId;

//     // Call the ReactivateOutletUsecase to reactivate the outlet
//     await this.reactivateOutletUsecase.execute(outletId);

//     // Send a success message as a JSON response
//     res.json({ message: "Outlet reactivated successfully." });
//   } catch (error) {
//     if (error instanceof ApiError) {
//       res.status(error.status).json({ error: error.message });
//     } else {
//       ApiError.internalError();
//     }
//   }
// }
// }













// // import ApiError from "@presentation/error-handling/api-error";

// // import { OutletMediaDataSource } from '@data/aws/datasources/mediadata-source';

// // export class OutletMediaService {
// //   constructor(private readonly outletMediaDataSource: OutletMediaDataSource) {}

// //   async getPresignedUrl(id: string): Promise<string> {
// //     const objectKey = `outlets/${id}/brand-image/image-path.jpg`;

// //     return this.outletMediaDataSource.getPresignedUrl(objectKey);
// //   }
// // }



// Import necessary classes, interfaces, and dependencies
import { NextFunction, Request, Response } from "express";


import ApiError from "@presentation/error-handling/api-error";
import { GetPreSignedUrlUsecase } from "@domain/outlet/usecases/get-presignedurl";


export class MediaOutletService {

  private readonly createOutletMediaUsecase: GetPreSignedUrlUsecase;
  constructor(
    createOutletMediaUsecase: GetPreSignedUrlUsecase,

  ) {
    this.createOutletMediaUsecase = createOutletMediaUsecase;
  }

  async getPreSignedUrl(  
    req: Request,
    res: Response,
    ){
      try {
        
        const outletId: string = req.params.outletId;
        const presignedurl=await this.createOutletMediaUsecase.execute(outletId);
        console.log(presignedurl,"presignedurl")
        res.json("response is this");

      } catch (error) {

        console.log(error);
        
        if (error instanceof ApiError) {
          res.status(error.status).json({ error: error.message });
        } else {
          const error = ApiError.internalError();
          res.status(error.status).json({ error: error.message });
        }
        
      }
    }
}
