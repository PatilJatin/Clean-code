// import { OutletMediaDataSource } from "@data/outlet/datasources/outlet-media-data-source";

import { MediaOutletRepository } from "@domain/outlet/repositories/media-outlet-repository";
import { OutletMediaDataSource } from "../datasources/mediadata-source";

// Define the OutletMediaRepository interface
export interface OutletMediaRepository {
  getPresignedUrl(objectKey: string): Promise<string>;
  deleteBrandLogo(objectKey: string): Promise<string>;
}

// Implement the OutletMediaRepository
export class OutletMediaRepositoryImpl implements MediaOutletRepository {
  constructor(private readonly outletMediaDataSource: OutletMediaDataSource) {}

  async getPreSignedUrl(objectKey: string): Promise<string> {
    // Call the OutletMediaDataSource to get the signed URL
    const signedUrl = await this.outletMediaDataSource.getPresignedUrl(objectKey);
     return signedUrl;
  }

  async deleteBrandLogo(): Promise<string> {
    // Call the OutletMediaDataSource to delete the brand logo
    const deleteBrandLogo = await this.outletMediaDataSource.deleteBrandLogo();
    return deleteBrandLogo;
  }
}
