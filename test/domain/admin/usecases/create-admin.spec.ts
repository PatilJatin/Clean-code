import { CreateAdmin, CreateAdminUsecase } from '@domain/admin/usecases/create-admin';
import { AdminEntity, AdminModel } from '@domain/admin/entities/admin';
import { AdminRepository } from '@domain/admin/repositories/admin-repository';
import { Either, Left, Right } from 'monet';
import { ErrorClass } from '@presentation/error-handling/api-error';

describe('CreateAdmin', () => {
  // Mock the AdminRepository
  const mockAdminRepository: AdminRepository = {
    createAdmin: jest.fn(),
    deleteAdmin: jest.fn(),
    updateAdmin: jest.fn(),
    getAdmins: jest.fn(),
    getAdminById: jest.fn()
  };

  // Create an instance of CreateAdmin with the mocked repository
  const createAdmin: CreateAdminUsecase = new CreateAdmin(mockAdminRepository);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create an admin', async () => {
    // Mock data
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

    // Mock the successful response from the repository
    const mockedResult: Either<ErrorClass, AdminEntity> = Right<ErrorClass, AdminEntity>({
      id: '64ccf38a876b1d7d8f025954',
      ...adminData,
    });

    // Mock the createAdmin method of the repository
    mockAdminRepository.createAdmin.mockResolvedValueOnce(mockedResult);

    // Call the execute method with the mock data
    const result: Either<ErrorClass, AdminEntity> = await createAdmin.execute(adminData);

    // Expect the result to match the mocked result
    expect(result).toEqual(mockedResult);

    // Expect the createAdmin method of the repository to have been called with the correct adminData
    expect(mockAdminRepository.createAdmin).toHaveBeenCalledWith(adminData);
  });

  it('should handle repository error', async () => {
    // Mock data
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

    // Mock the error response from the repository
    const mockedError: Either<ErrorClass, AdminEntity> = Left<ErrorClass, AdminEntity>({
      status: 500,
      message: 'Internal Server Error',
      name: 'InternalServerError',
    });

    // Mock the createAdmin method of the repository to throw an error
    mockAdminRepository.createAdmin.mockRejectedValueOnce(mockedError);

    // Call the execute method with the mock data
    const result: Either<ErrorClass, AdminEntity> = await createAdmin.execute(adminData);

    // Expect the result to match the mocked error
    expect(result).toEqual(mockedError);

    // Expect the createAdmin method of the repository to have been called with the correct adminData
    expect(mockAdminRepository.createAdmin).toHaveBeenCalledWith(adminData);
  });

  // Add more test cases for different scenarios as needed
});
