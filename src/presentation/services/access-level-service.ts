import { AccessLevelEntity, AccessLevelMapper, AccessLevelModel } from "@domain/access-level/entities/access-level";
import { CreateAccessLevelUsecase } from "@domain/access-level/usecases/create-acces-level";
import { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";
import { NextFunction, Request, Response } from "express";
import { GetAllAccessLevelUseCase } from "@domain/access-level/usecases/get-all-access-level";


export class AccessLevelService{
    private readonly createAccessLevelUseCase:CreateAccessLevelUsecase;
    private readonly getAccessLevelUseCase:GetAllAccessLevelUseCase;

    constructor(
        createAccessLevelUseCase:CreateAccessLevelUsecase,
        getAccessLevelUseCase:GetAllAccessLevelUseCase,
    ){
        this.createAccessLevelUseCase = createAccessLevelUseCase;
        this.getAccessLevelUseCase=getAccessLevelUseCase;
    }

    async createAccessLevel(req:Request,res:Response):Promise<void>{
        const accessLevelData:AccessLevelModel=AccessLevelMapper.toModel(req.body)

        const newAccessLevel : Either<ErrorClass,AccessLevelEntity>=
        await this.createAccessLevelUseCase.execute(accessLevelData)
        newAccessLevel.cata(
            (error: ErrorClass) =>
        res.status(error.status).json({ error: error.message }),
      (result: AccessLevelEntity) => {
        const resData = AccessLevelMapper.toEntity(result, true);
        return res.json(resData);
      }
        )
    }

    async getAccessLevel(
        req:Request,
        res:Response,
        next:NextFunction
        ):Promise<void>{
            const accessLevel : Either<ErrorClass,AccessLevelEntity[]>=
            await this.getAccessLevelUseCase.execute();
            accessLevel.cata(
                (error: ErrorClass) =>
                  res.status(error.status).json({ error: error.message }),
                (accessLevel: AccessLevelEntity[]) => {
                  const resData = accessLevel.map((role) => AccessLevelMapper.toEntity(role));
                  return res.json(resData);
                }
              );
        }

}