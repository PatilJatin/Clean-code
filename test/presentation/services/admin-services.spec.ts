import { AdminService } from '@presentation/services/admin-services';
import {
  CreateAdminUsecase,
} from '@domain/admin/usecases/create-admin';
import {
    DeleteAdminUsecase,
} from '@domain/admin/usecases/delete-admin';
import {
    GetAdminByIdUsecase,
} from '@domain/admin/usecases/get-admin-by-id';
import {
    UpdateAdminUsecase,
} from '@domain/admin/usecases/update-admin';
import {
    GetAllAdminsUsecase,
} from '@domain/admin/usecases/get-all-admins';

import { AdminEntity, AdminMapper, AdminModel } from '@domain/admin/entities/admin';
import { ErrorClass } from '@presentation/error-handling/api-error';
import { Either, Right, Left } from 'monet';
import { Request, Response } from 'express';

describe('AdminService', () => {
  // Define mock dependencies

  
  let createAdminUsecaseMock: jest.Mocked<CreateAdminUsecase>;
  let getAdminByIdUsecaseMock:jest.Mocked<GetAdminByIdUsecase>;
    let deleteAdminUsecaseMock:jest.Mocked<DeleteAdminUsecase>
    let updateAdminUsecaseMock:jest.Mocked<UpdateAdminUsecase>
    let getAllAdminsUsecaseMock:jest.Mocked<GetAllAdminsUsecase>
  

   createAdminUsecaseMock  =  {
    execute: jest.fn(),
  }as any;
  getAdminByIdUsecaseMock  =  {
    execute: jest.fn(),
  }as any;
  deleteAdminUsecaseMock  =  {
    execute: jest.fn(),
  }as any;
  updateAdminUsecaseMock  =  {
    execute: jest.fn(),
  }as any;
  getAllAdminsUsecaseMock  =  {
    execute: jest.fn(),
  }as any;

  // Create an instance of AdminService with the mock dependencies
  const adminService = new AdminService(
    createAdminUsecaseMock,
    getAdminByIdUsecaseMock,
    deleteAdminUsecaseMock,
    updateAdminUsecaseMock,
    getAllAdminsUsecaseMock
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  const adminData: AdminModel = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: 1234567890,
    brand: 'ABC Corp',
    jobTitle: 'Manager',
    superAdmin: true,
    admin: true,
    permissions: [1, 2, 3],
    active: true,
    outlet: 'Outlet 1',
    fuid: 'some-firebase-user-id',
  };
  const resultData = {
    id: "1234568",
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: 1234567890,
    brand: 'ABC Corp',
    jobTitle: 'Manager',
    superAdmin: true,
    admin: true,
    permissions: [1, 2, 3],
    active: true,
    outlet: 'Outlet 1',
    fuid: 'some-firebase-user-id',
  };


  // Test for createAdmin method
  describe('createAdmin', () => {
    it('should create admin successfully', async () => {
      const req: Request = { body: { ...adminData  } } as Request;
      const res: Response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      }as any;


    //   const mockCreateAdminUsecase: CreateAdminUsecase = jest.fn();

    // const adminData: AdminModel = AdminMapper.toModel(adminData);

    // const mockedResult = Right(resultData);

    createAdminUsecaseMock.execute.mockResolvedValue(resultData);

      await adminService.createAdmin(req, res);

      expect(res.json).toHaveBeenCalledWith(resultData);
      expect(res.status).toBe(200);
    });

    it('should handle create admin error', async () => {
      // Test for handling errors
    });

  });

  // Test for deleteAdmin method
  describe('deleteAdmin', () => {
    // Test for deleteAdmin method
  });

  // Test for getAdminById method
  describe('getAdminById', () => {
    // Test for getAdminById method
  });

  // Test for updateAdmin method
  describe('updateAdmin', () => {
    // Test for updateAdmin method
  });

  // Test for getAllAdmins method
  describe('getAllAdmins', () => {
    // Test for getAllAdmins method
  });
});
