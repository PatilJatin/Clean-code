import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { TaxRateEntity, TaxRateModel } from "../entities/tax-rate";

export interface TaxRateRepository {
    createTaxRate(taxRate: TaxRateModel): Promise<Either<ErrorClass, TaxRateEntity>>;
    // getAllUser(): Promise<Either<ErrorClass, UserEntity[]>>;

}   