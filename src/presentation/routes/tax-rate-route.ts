import { TaxRateDataSourceImpl } from "@data/tax-rate/datasources/tax-rate-data-source";
import { TaxRateRepositoryImpl } from "@data/tax-rate/repositories/tax-rate-repository-impl";
import { CreateTaxRate } from "@domain/tax-rate/usecases/create-tax-rate";
import { TaxRateService } from "@presentation/services/tax-rate-service";
import { Router } from "express";
import mongoose from "mongoose";


const mongooseConnection = mongoose.connection;

const taxRateDataSource=new TaxRateDataSourceImpl(mongooseConnection)
const taxRateRepository=new TaxRateRepositoryImpl(taxRateDataSource)

const createTaxRateUseCase=new CreateTaxRate(taxRateRepository)
// const getAllUserUseCase=new GetAllUsers(userRepository)

const taxRateService=new TaxRateService(
    createTaxRateUseCase,
    // getAllUserUseCase
)

export const taxRateRouter=Router()

taxRateRouter.post(
    "/create",
    taxRateService.createTaxRate.bind(taxRateService)
)