

// Import necessary classes, interfaces, and dependencies
import { Request, Response } from "express";


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
        res.json(presignedurl);

      } catch (error) {        
        if (error instanceof ApiError) {
          res.status(error.status).json({ error: error.message });
        } else {
          const error = ApiError.internalError();
          res.status(error.status).json({ error: error.message });
        }
        
      }
    }
}
