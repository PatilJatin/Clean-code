
import { TaxRateEntity, TaxRateMapper, TaxRateModel } from "@domain/tax-rate/entities/tax-rate";
import { CreateTaxRateUseCase } from "@domain/tax-rate/usecases/create-tax-rate";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { NextFunction, Request, Response } from "express";
import { Either } from "monet";


export class TaxRateService{
    private readonly createTaxRateUseCase:CreateTaxRateUseCase;
    // private readonly getAllUserUseCase:GetAllUserUseCase;
    constructor(
        createTaxRateUseCase:CreateTaxRateUseCase,
        // getAllUserUseCase:GetAllUserUseCase,
    ){
        this.createTaxRateUseCase = createTaxRateUseCase;
        // this.getAllUserUseCase = getAllUserUseCase;
    }



async createTaxRate(req: Request, res: Response): Promise<void> {
    const taxRateData: TaxRateModel = TaxRateMapper.toModel(req.body);

    const newRate: Either<ErrorClass, TaxRateEntity> =
      await this.createTaxRateUseCase.execute(taxRateData);

      newRate.cata(
      (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: TaxRateEntity) => {
        const resData = TaxRateMapper.toEntity(result, true);
        return res.json(resData);
      }
    );
  }
}