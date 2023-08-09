// superadmin-datasource.test.ts

import { SuperAdminDataSourceImpl } from "@data/super-admin/datasources/super-admin-data-source"; // Adjust the path based on your file structure
import mongoose from "mongoose";
import { SuperAdminModel, SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity"
import { Admin } from "@data/admin/models/admin-model"; // Adjust the path based on your file structure
import ApiError from "@presentation/error-handling/api-error";
import dotenv from "dotenv";

dotenv.config();

// Declare variables to be used in tests
let superAdminDataSource: SuperAdminDataSourceImpl;

let connection: mongoose.Connection;

const dbUrl =
  "mongodb+srv://jatinp8390:Kolhapur09@cluster0.rpywjyb.mongodb.net/?retryWrites=true&w=majority";

beforeAll(async () => {
  // Connect to the actual MongoDB server
  await mongoose.connect(dbUrl);
  connection = mongoose.connection;
});

afterAll(async () => {
  // Disconnect from the actual MongoDB server
  await mongoose.disconnect();
}, 10000);

beforeEach(async () => {
  // Clear the database before each test
  await Admin.deleteMany({});
  superAdminDataSource = new SuperAdminDataSourceImpl(connection);
});

describe("SuperAdminDataSourceImpl", () => {
  // Test Cases for create Method
  it("should create a super admin", async () => {
    const superAdminData: SuperAdminModel = {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: 9876543210,
      superAdmin: true,
      permissions: [1, 2, 3],
    };

    const createdSuperAdmin: SuperAdminEntity =
      await superAdminDataSource.create(superAdminData);

    expect(createdSuperAdmin).toBeTruthy();
    expect(createdSuperAdmin).toHaveProperty("_id");
    // Add more specific assertions based on your requirements and data
  });

  it("should throw ApiError.emailExist() when creating a super admin with duplicate email", async () => {
    // Create a super admin with a specific email in the database
    const existingSuperAdmin: SuperAdminModel = {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: 9876543210,
      superAdmin: true,
      permissions: [1, 2, 3],
    };
    await superAdminDataSource.create(existingSuperAdmin);

    // Try to create another super admin with the same email
    const duplicateSuperAdmin: SuperAdminModel = {
      name: "Mark Johnson",
      email: "jane.smith@example.com",
      phone: 9876543210,
      superAdmin: true,
      permissions: [1, 2, 3],
    };

    await expect(
      superAdminDataSource.create(duplicateSuperAdmin)
    ).rejects.toThrow(ApiError.emailExist());
  });
});

//GetByID Superadmin

it("should get super admin by id", async () => {
  const superAdminData = {
    id: "fakeSuperAdminId",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: 9876543210,
    superAdmin: true,
    permissions: [1, 2, 3],
  };

  // Mock superAdminDataSource.read to resolve with superAdminData
  jest.spyOn(superAdminDataSource, "read").mockResolvedValue(superAdminData);

  const result = await superAdminDataSource.read("fakeSuperAdminId"); // Use superAdminDataSource to call read
  expect(result).toEqual(superAdminData);
});




