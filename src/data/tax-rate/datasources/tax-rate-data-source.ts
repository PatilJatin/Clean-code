import { TaxRateModel } from "@domain/tax-rate/entities/tax-rate";
import { TaxRate } from "../models/tax-rate-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface TaxRateDataSource{
    create(taxRate: TaxRateModel): Promise<any>; // Return type should be Promise of AdminEntity
    // getAllUsers(): Promise<any[]>;
  }

export class TaxRateDataSourceImpl implements TaxRateDataSource {

    constructor(private db: mongoose.Connection) {}
  
  async create(taxRate: TaxRateModel): Promise<any> {
      const existingRate = await TaxRate.findOne({ type: taxRate.type });
      if (existingRate) {
        throw ApiError.taxTypeExist();
      }
  
      const taxData = new TaxRate(taxRate);
      
      const createdTaxRate = await taxData.save();
  
      return createdTaxRate.toObject();
      
    }
}