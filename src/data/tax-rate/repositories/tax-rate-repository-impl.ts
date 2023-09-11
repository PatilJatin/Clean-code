import { TaxRateRepository } from "@domain/tax-rate/repositories/tax-rate";
import { TaxRateDataSource } from "../datasources/tax-rate-data-source";
import { TaxRateEntity, TaxRateModel } from "@domain/tax-rate/entities/tax-rate";
import { Either, Left, Right } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";



export class TaxRateRepositoryImpl implements TaxRateRepository {
    private readonly dataSource: TaxRateDataSource ;
  
    constructor(dataSource: TaxRateDataSource) {
      this.dataSource = dataSource;
    }
  
    async createTaxRate(
      taxRate: TaxRateModel 
    ): Promise<Either<ErrorClass, TaxRateEntity>> {
      try {
        let i = await this.dataSource.create(taxRate);
        return Right<ErrorClass, TaxRateEntity>(i);
      } catch (e) {
        if (typeof ApiError.taxTypeExist) {
          return Left<ErrorClass, TaxRateEntity>(ApiError.taxTypeExist());
        }
        return Left<ErrorClass, TaxRateEntity>(ApiError.badRequest());
      }
     }
    }