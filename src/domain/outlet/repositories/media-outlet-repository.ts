

export interface MediaOutletRepository {
  getPreSignedUrl(objectKey: string): Promise<string>;
}
