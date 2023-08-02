

// Import necessary classes, interfaces, and dependencies
import { Request, Response } from "express";


import ApiError from "@presentation/error-handling/api-error";
import { GetPreSignedUrlUsecase } from "@domain/outlet/usecases/get-presignedurl";
import { DeleteBrandLogoUsecase } from "@domain/outlet/usecases/delete-brandlogo";


export class MediaOutletService {

  private readonly createOutletMediaUsecase: GetPreSignedUrlUsecase;
  private readonly deleteBrandLogoUsecase: DeleteBrandLogoUsecase;
  constructor(
    createOutletMediaUsecase: GetPreSignedUrlUsecase,
    deleteBrandLogoUsecase: DeleteBrandLogoUsecase,

  ) {
    this.createOutletMediaUsecase = createOutletMediaUsecase;
    this.deleteBrandLogoUsecase = deleteBrandLogoUsecase;
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
  
  async deletePreSignedUrl(req: Request, res: Response) {
    try {
        const outletId: string = req.params.outletId;
        const deletedBrandLogo=await this.deleteBrandLogoUsecase.execute();

      res.status(200).json({
        message: "deleted outlet Brand logo.",
        defaultProfile: deletedBrandLogo,
      });
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
