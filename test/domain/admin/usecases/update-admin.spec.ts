// import {
//   UpdateAdmin,
//   UpdateAdminUsecase,
// } from "@domain/admin/usecases/update-admin";
// import { AdminEntity, AdminModel } from "@domain/admin/entities/admin";
// import { AdminRepository } from "@domain/admin/repositories/admin-repository";
// import { Either, Left, Right } from "monet";
// import { ErrorClass } from "@presentation/error-handling/api-error";

// describe("UpdateAdmin", () => {
//   // Mock the AdminRepository
//   const mockAdminRepository: AdminRepository = {
//     createAdmin: jest.fn(),
//     deleteAdmin: jest.fn(),
//     updateAdmin: jest.fn(),
//     getAdmins: jest.fn(),
//     getAdminById: jest.fn(),
//   };

//   // Create an instance of UpdateAdmin with the mocked repository
//   const updateAdmin: UpdateAdminUsecase = new UpdateAdmin(mockAdminRepository);

//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   it("should update an admin", async () => {
//     // Mock data
//     const adminId = "64ccf38a876b1d7d8f025954";
//     const updatedAdminData: AdminModel = {
//       name: "John Doe Denver",
//       email: "john.doe@example.com",
//       phone: 1234567890,
//       brand: "XYZ Corp",
//       jobTitle: "Manager",
//       superAdmin: true,
//       admin: true,
//       permissions: [1, 2, 3],
//       active: true,
//       outlet: "Outlet 1",
//       fuid: "some-firebase-user-id",
//     };

//     // Mock the successful response from the repository
//     const mockedResult: Either<ErrorClass, AdminEntity> = Right<
//       ErrorClass,
//       AdminEntity
//     >({
//       id: adminId,
//       ...updatedAdminData,
//     });

//     // Mock the updateAdmin method of the repository
//     mockAdminRepository.updateAdmin.mockResolvedValueOnce(mockedResult);

//     // Call the execute method with the mock data
//     const result: Either<ErrorClass, AdminEntity> = await updateAdmin.execute(
//       adminId,
//       updatedAdminData
//     );

//     // Expect the result to match the mocked result
//     expect(result).toEqual(mockedResult);

//     // Expect the updateAdmin method of the repository to have been called with the correct adminId and updatedAdminData
//     expect(mockAdminRepository.updateAdmin).toHaveBeenCalledWith(
//       adminId,
//       updatedAdminData
//     );
//   });

//   it("should handle repository error", async () => {
//     // Mock data
//     const adminId = "64ccf38a876b1d7d8f025954";
//     const updatedAdminData: AdminModel = {
//       name: "John Doe Denver",
//       email: "john.doe@example.com",
//       phone: 1234567890,
//       brand: "XYZ Corp",
//       jobTitle: "Manager",
//       superAdmin: true,
//       admin: true,
//       permissions: [1, 2, 3],
//       active: true,
//       outlet: "Outlet 1",
//       fuid: "some-firebase-user-id",
//     };

//     // Mock the error response from the repository
//     const mockedError: Either<ErrorClass, AdminEntity> = Left<
//       ErrorClass,
//       AdminEntity
//     >({
//       status: 500,
//       message: "Internal Server Error",
//       name: "InternalServerError",
//     });

//     // Mock the updateAdmin method of the repository to throw an error
//     mockAdminRepository.updateAdmin.mockRejectedValueOnce(mockedError);

//     // Call the execute method with the mock data
//     const result: Either<ErrorClass, AdminEntity> = await updateAdmin.execute(
//       adminId,
//       updatedAdminData
//     );

//     // Expect the result to match the mocked error
//     expect(result).toEqual(mockedError);

//     // Expect the updateAdmin method of the repository to have been called with the correct adminId and updatedAdminData
//     expect(mockAdminRepository.updateAdmin).toHaveBeenCalledWith(
//       adminId,
//       updatedAdminData
//     );
//   });

//   // Add more test cases for different scenarios as needed
// });
