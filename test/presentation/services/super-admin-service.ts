import { Admin } from "@data/admin/models/admin-model";
import mongoose from "mongoose";

import { SuperAdminDataSourceImpl } from '@data/super-admin/datasources/super-admin-data-source'
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv'

dotenv.config();

let superAdminDataSource: SuperAdminDataSourceImpl;
let mongod: MongoMemoryServer;
let connection: mongoose.Connection;

const dbUrl = "mongodb+srv://jatinp8390:Kolhapur09@cluster0.rpywjyb.mongodb.net/?retryWrites=true&w=majority"


import { NextFunction, Request, Response } from "express";

import {
    SuperAdminModel,
    SuperAdminEntity,
    SuperAdminMapper,
} from "@domain/super-admin/entities/super-admin.entity";

import { CreateSuperAdminUsecase } from "@domain/super-admin/usecases/create-super-admin";
import { DeleteSuperAdminUsecase } from "@domain/super-admin/usecases/delete-super-admin";
import { GetSuperAdminByIdUsecase } from "@domain/super-admin/usecases/get-super-admin-by-id";
import { UpdateSuperAdminUsecase } from "@domain/super-admin/usecases/update-super-admin";
import { GetAllSuperAdminsUsecase } from "@domain/super-admin/usecases/get-all-super-admin";

const CreateSuperAdminUsecaseMock = jest.fn();
const DeleteSuperAdminUsecaseMock = jest.fn();
const GetSuperAdminByIdUsecaseMock = jest.fn();
const UpdateSuperAdminUsecaseMock = jest.fn();
const GetAllSuperAdminsUsecaseMock = jest.fn();

import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either } from "monet";

export class SuperAdminService {
    private readonly createSuperAdminUsecase: CreateSuperAdminUsecase;
    private readonly deleteSuperAdminUsecase: DeleteSuperAdminUsecase;
    private readonly getSuperAdminByIdUsecase: GetSuperAdminByIdUsecase;
    private readonly updateSuperAdminUsecase: UpdateSuperAdminUsecase;
    private readonly getAllSuperAdminsUsecase: GetAllSuperAdminsUsecase;
    public internalError = ApiError.internalError()
    public deleteSuccess = ApiError.delete()

    constructor(
        createSuperAdminUsecase: CreateSuperAdminUsecase,
        deleteSuperAdminUsecase: DeleteSuperAdminUsecase,
        getSuperAdminByIdUsecase: GetSuperAdminByIdUsecase,
        updateSuperAdminUsecase: UpdateSuperAdminUsecase,
        getAllSuperAdminsUsecase: GetAllSuperAdminsUsecase
    ) {
        this.createSuperAdminUsecase = createSuperAdminUsecase;
        this.deleteSuperAdminUsecase = deleteSuperAdminUsecase;
        this.getSuperAdminByIdUsecase = getSuperAdminByIdUsecase;
        this.updateSuperAdminUsecase = updateSuperAdminUsecase;
        this.getAllSuperAdminsUsecase = getAllSuperAdminsUsecase;
    }


    async updateSuperAdmin(req: Request, res: Response): Promise<void> {

        const superAdminId: string = req.params.superAdminId;
        const superAdminData: SuperAdminModel = req.body;

        // Get the existing admin by ID
        const existingSuperAdmin: Either<ErrorClass, SuperAdminEntity> =
            await this.getSuperAdminByIdUsecase.execute(superAdminId);

        existingSuperAdmin.cata((error: ErrorClass) => {
            res.status(error.status).json({ error: error.message })
        },
            async (result: SuperAdminEntity) => {
                const resData = SuperAdminMapper.toEntity(result, true);
                const updatedSuperAdminEntity: SuperAdminEntity = SuperAdminMapper.toEntity(
                    superAdminData,
                    true,
                    resData
                );


                const updateSuperAdmin: Either<ErrorClass, SuperAdminEntity> =
                    await this.updateSuperAdminUsecase.execute(superAdminId, updatedSuperAdminEntity);

                updateSuperAdmin.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message })
                    },
                    (response: SuperAdminEntity) => {
                        const resData = SuperAdminMapper.toModel(response);

                        res.json(resData);
                    }
                )
            }
        );
    }

}

