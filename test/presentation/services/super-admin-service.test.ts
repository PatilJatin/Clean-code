import dotenv from 'dotenv'
dotenv.config();

import { Admin } from "@data/admin/models/admin-model";
import mongoose from "mongoose";

import { SuperAdminDataSourceImpl } from '@data/super-admin/datasources/super-admin-data-source'
import { SuperAdminService } from '@presentation/services/super-admin-service'
import { MongoMemoryServer } from 'mongodb-memory-server';


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



let superAdminDataSource: SuperAdminDataSourceImpl;
let mongod: MongoMemoryServer;
let connection: mongoose.Connection;

const dbUrl = "mongodb+srv://jatinp8390:Kolhapur09@cluster0.rpywjyb.mongodb.net/?retryWrites=true&w=majority"

describe("SuperAdminService", async() => {

    const mockUpdateSuperAdminUsecase: UpdateSuperAdminUsecase = {
        execute: jest.fn(),
      };
    
    const mockGetSuperAdminByIdUsecase: GetSuperAdminByIdUsecase = {
        execute: jest.fn(),
    };

    const superAdminService: SuperAdminService = new SuperAdminService(
    {} as CreateSuperAdminUsecase,
    {} as DeleteSuperAdminUsecase,
    mockGetSuperAdminByIdUsecase,
    mockUpdateSuperAdminUsecase,
    {} as GetAllSuperAdminsUsecase
    );
    
      
      const mockRequest: Request = {

        body: {
            firstName: 'J',
            lastName: 'Doe',
            email: 'jdoe@abc123.com',
            password: 'Abcd1234',
            passwordConfirm: 'Abcd1234',
            company: 'ABC Inc.',
            },
        } as Request;
    
      const mockResponse: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      } as unknown as Response;
    
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it("should update SuperAdmin and return the updated entity", async () => {
        const updatedSuperAdminEntity: SuperAdminEntity = {
          id: "123",
          name: "John Doe",
          email: "john@example.com",
          phone: 1234567890,
          superAdmin: true,
          permissions: [101, 102],
        };
    
        // Setting up the mockResolvedValue for the execute method
        const resolvedRight: Either<ErrorClass, SuperAdminEntity> = Either.right(updatedSuperAdminEntity);
        (mockGetSuperAdminByIdUsecase.execute as jest.Mock).mockResolvedValue(resolvedRight);

        await superAdminService.updateSuperAdmin(mockRequest, mockResponse);
    
        expect(mockGetSuperAdminByIdUsecase.execute).toHaveBeenCalledWith(
          "123"
        );
        expect(mockUpdateSuperAdminUsecase.execute).toHaveBeenCalledWith(
          "123",
          mockRequest.body
        );
        expect(mockResponse.json).toHaveBeenCalledWith(
          updatedSuperAdminEntity
        );
      });
    
    // const mockUpdateSuperAdminUsecase: UpdateSuperAdminUsecase = {
    //     execute: jest.fn(),
    //   };

    // const mockGetSuperAdminByIdUsecase: GetSuperAdminByIdUsecase = {
    //     execute: jest.fn(),
    //   };

    // const superAdminService: SuperAdminService = new SuperAdminService(
    //     {} as CreateSuperAdminUsecase,
    //     {} as DeleteSuperAdminUsecase,
    //     mockGetSuperAdminByIdUsecase,
    //     mockUpdateSuperAdminUsecase,
    //     {} as GetAllSuperAdminsUsecase
    // );

    
    // const mockRequest: Request = {
    //     params: { superAdminId: "123" },
    //     body: {
    //         name: "John Doe",
    //         email: "john@example.com",
    //         phone: 1234567890,
    //         superAdmin: true,
    //         permissions: [101, 102],
    //     } 
    // } as unknown as  Request;;
    
    // const mockResponse: Response = {
    //     status: jest.fn().mockReturnThis(),
    //     json: jest.fn(),
    // } as unknown as Response;

    // beforeEach(() => {
    //     jest.clearAllMocks();
    //   });

    it("should verify no admin exists", async() => {});
    //     const updatedSuperAdminEntity: SuperAdminEntity = {
    //         id: "123",
    //         name: "John Doe",
    //         email: "john@example.com",
    //         phone: 1234567890,
    //         superAdmin: true,
    //         permissions: [101, 102],
    //       };

    //       const resolvedRight: Either<ErrorClass, SuperAdminEntity> = Either.right(updatedSuperAdminEntity);
    //       (mockGetSuperAdminByIdUsecase.execute as jest.Mock).mockResolvedValue(resolvedRight);
      
    //       mockGetSuperAdminByIdUsecase.execute.mockResolvedValue(
    //         Either.right(updatedSuperAdminEntity)
    //       );
    //       mockUpdateSuperAdminUsecase.execute.mockResolvedValue(
    //         Either.right(updatedSuperAdminEntity)
    //       );
      
    //       await superAdminService.updateSuperAdmin(mockRequest, mockResponse);
      
    //       expect(mockGetSuperAdminByIdUsecase.execute).toHaveBeenCalledWith(
    //         "123"
    //       );
    //       expect(mockUpdateSuperAdminUsecase.execute).toHaveBeenCalledWith(
    //         "123",
    //         mockRequest.body
    //       );
    //       expect(mockResponse.json).toHaveBeenCalledWith(
    //         updatedSuperAdminEntity
    //       );
    // });

    it("should throw error if Super admin with ID does not exists", async () => {});

    it("should handle ", async () => {});
    it("should throw error if Super admin with ID does not exists", async () => {});
});