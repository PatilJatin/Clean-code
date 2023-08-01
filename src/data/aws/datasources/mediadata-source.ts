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

    console.log(objectKey,"object key")
    const params = {
      Bucket: process.env.bucketName,
      Key: objectKey+".jpg",
      Expires: 3600,
    };
    
    const url  =  await s3.getSignedUrlPromise("getObject", params);
    console.log(url);
    return url;
  }
}
