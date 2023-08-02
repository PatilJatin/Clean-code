import AWS from "aws-sdk";
import dotenv from "dotenv";

dotenv.config();

export interface OutletMediaDataSource {
  getPresignedUrl(objectKey: string): Promise<string>;
}

export class OutletMediaDataSourceImpl implements OutletMediaDataSource {

  async getPresignedUrl(objectKey: string): Promise<string> {

    const s3=new AWS.S3({
      region: "ap-south-1",
      credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || "AKIAVYM223P6QG4EDW6V",
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "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",
      }
  })

    const params = {
      Bucket: "gms-imageupload",
      Key: `outlets/${objectKey}/brand-image/image-path`+".jpg",
      Expires: 3600,
    };
    
    return  await s3.getSignedUrlPromise("putObject", params);
  }
}
