// // import { OutletMediaDataSourceImpl } from "@data/aws/datasources/mediadata-source";
// // import { OutletMediaRepositoryImpl } from "@data/aws/repositories/outlet-media-repository";
// // import { OutletMediaService } from "@presentation/services/mediadata-services";
// // import { Router, Request, Response } from "express";
// // const dotenv = require("dotenv");
// // dotenv.config();

// import { GetPresignedUrl } from "@domain/outlet/usecases/get-presignedurl";
// import { OutletMediaService } from "@presentation/services/mediadata-services";


// // // import { OutletMediaService } from "@domain/outlet/services/outlet-media-service";
// // // import { OutletMediaRepositoryImpl } from "@data/outlet/repositories/outlet-media-repository";
// // // import { OutletMediaDataSourceImpl } from "@data/outlet/datasources/outlet-media-data-source";

// // export const outletMediaRouter = Router();

// // const outletMediaDataSource = new OutletMediaDataSourceImpl(
// //   process.env.AWS_ACCESS_KEY_ID || "",
// //   process.env.AWS_SECRET_ACCESS_KEY || "",
// //   process.env.AWS_region || "",
// //   process.env.bucketName || ""
// // );

// // const outletMediaRepository = new OutletMediaRepositoryImpl(outletMediaDataSource);

// // const outletMediaService = new OutletMediaService(outletMediaRepository);

// // const getSignedUrlHandler = async (req: Request, res: Response) => {
// //   try {
// //     const { id }: { id: string } = req.body;
// //     // Validate the input, e.g., check if objectKey is provided and valid.

// //     // Call the OutletMediaService to get the signed URL
// //     const  signedUrl  = await outletMediaService.getPresignedUrl( id );
     
// //     res.status(200).json({ signedUrl });
// //   } catch (error) {
// //     res.status(500).json({ error: "Failed to get signed URL for media upload" });
// //   }
// // };

// // outletMediaRouter.post("/getSignedUrl", getSignedUrlHandler);













// // // import express, { Request, Response, Router } from 'express';
// // // import { OutletMediaService } from '@presentation/services/mediadata-services';
// // // import { OutletMediaDataSource, OutletMediaDataSourceImpl } from '@data/aws/datasources/mediadata-source';


// // // const outletMediaRouter: Router = express.Router();

// // // const outletMediaDataSource: OutletMediaDataSource = new OutletMediaDataSourceImpl();

// // // const outletMediaService = new OutletMediaService(outletMediaDataSource);

// // // // export const configureOutletMediaRoutes = (outletMediaService: OutletMediaService): Router => {

// // //   outletMediaRouter.post('/getPresignedUrl', async (req: Request, res: Response) => {
// // //     try {
// // //       const { id } = req.body;

// // //       const presignedUrl = await outletMediaService.getPresignedUrl(id);

// // //       res.status(200).json({ presignedUrl });
// // //     } catch (error) {
// // //       res.status(500).json({ error: 'Failed to get the presigned URL.' });
// // //     }
// // //   });


  

// // //   export default outletMediaRouter;

// const outletService=new OutletMediaService(
//   GetPresignedUrlUsecase
// )

// export const outletMediaRouter = Router();


// outletMediaRouter.post(
//   "/outlet/create",
//   outletService.createOutlet.bind(outletService)
// );


// Import necessary classes, interfaces, and dependencies
import mongoose from "mongoose";
import { Router } from "express"; // Correctly import Request and Response

import { OutletDataSourceImpl } from "@data/outlet/datasources/outlet-data-source";
import { OutletRepositoryImpl } from "@data/outlet/repositories/outlet-repository-impl";

import { MediaOutletService,} from "@presentation/services/mediadata-services";
import { GetPreSignedUrl } from "@domain/outlet/usecases/get-presignedurl";
import { OutletMediaDataSourceImpl } from "@data/aws/datasources/mediadata-source";
import { OutletMediaRepositoryImpl } from "@data/aws/repositories/outlet-media-repository";

// Create an instance of the OutletDataSourceImpl and pass the mongoose connection
// const outletDataSource = new OutletDataSourceImpl(mongoose.connection);
const outletDataSource = new OutletMediaDataSourceImpl();

// Create an instance of the OutletRepositoryImpl and pass the OutletDataSourceImpl
const outletRepository = new OutletMediaRepositoryImpl(outletDataSource);

// Create instances of the required use cases and pass the OutletRepositoryImpl
const outletMediaUsecase = new GetPreSignedUrl(outletRepository);

// Initialize OutletService and inject required dependencies
const outletMediaService = new MediaOutletService(
  outletMediaUsecase,
);

// Create an Express router
export const mediaRoutes = Router();


mediaRoutes.get(
  "/outlet/getpresignedurl/:outletId",
  outletMediaService.getPreSignedUrl.bind(outletMediaService)
);
// mediaRoutes.delete(
//   "/outlet/deleteMedia/:outletId",
//   outletMediaService.deletePreSignedUrl.bind(outletMediaService)
// )





