// admin-datasource.test.ts

import { AdminDataSourceImpl } from '@data/admin/datasources/admin-data-source'; // Adjust the path based on your file structure
import mongoose from 'mongoose';
import { AdminModel, AdminEntity } from '@domain/admin/entities/admin';
import { Admin } from '@data/admin/models/admin-model'; // Adjust the path based on your file structure
import { MongoMemoryServer } from 'mongodb-memory-server';
import ApiError from '@presentation/error-handling/api-error';
import dotenv from 'dotenv'

dotenv.config();

// Declare variables to be used in tests
let adminDataSource: AdminDataSourceImpl;
let mongod: MongoMemoryServer;
let connection: mongoose.Connection;

const dbUrl = "mongodb+srv://jatinp8390:Kolhapur09@cluster0.rpywjyb.mongodb.net/?retryWrites=true&w=majority"

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
  adminDataSource = new AdminDataSourceImpl(connection);
});

describe('AdminDataSourceImpl', () => {
  // Test Cases for create Method
  it('should create an admin', async () => {
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

    const createdAdmin: AdminEntity = await adminDataSource.create(adminData);

    expect(createdAdmin).toBeTruthy();
    expect(createdAdmin).toHaveProperty('_id');
    // Add more specific assertions based on your requirements and data
  });

  it('should throw ApiError.emailExist() when creating an admin with duplicate email', async () => {
    // Create an admin with a specific email in the database
    const existingAdmin: AdminModel = { 
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
    await adminDataSource.create(existingAdmin);

    // Try to create another admin with the same email
    const duplicateAdmin: AdminModel = { 
        name: 'Jatin Patil',
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

    await expect(adminDataSource.create(duplicateAdmin)).rejects.toThrow(ApiError.emailExist());
  });

  // Add more test cases for create method based on invalid data

  // Test Cases for update Method
  // Write test cases similar to create method but for the update method
  describe('AdminDataSource', () => {
    it('should update an admin', async () => {
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
      const createdAdmin = await adminDataSource.create(adminData);
      const updatedAdminData: AdminModel = {
        name: 'John Doe Denver',
        email: 'john.doe@example.com',
        phone: 1234567890,
        brand: 'XYZ Corp',
        jobTitle: 'Manager',
        superAdmin: true,
        admin: true,
        permissions: [1, 2, 3],
        active: true,
        outlet: 'Outlet 1',
        fuid: 'some-firebase-user-id',
      };

      const updatedAdmin = await adminDataSource.update(createdAdmin._id, updatedAdminData);
      expect(updatedAdmin).toMatchObject(updatedAdminData);
    });
    it('should return null when updating a non-existent admin', async () => {
      const nonExistentAdminId = 'some-non-existent-id';
      const updatedAdminData: AdminModel = {
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

      const updatedAdmin = await adminDataSource.update(nonExistentAdminId, updatedAdminData);

      expect(updatedAdmin).toBeNull();
    });

    it('should throw ApiError when updating admin with duplicate email', async () => {
      // Create two admins with same email
      const admin1: AdminModel = {
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
      const admin2: AdminModel = {
        name: 'Jatin Patil',
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
      await adminDataSource.create(admin1);
      const admin2Id = (await adminDataSource.create(admin2))._id;

      // Try to update admin2's email to match admin1's email
      const duplicateEmailUpdate: AdminModel = {
        email: admin1.email,
        // ... other admin data ...
      };

      await expect(adminDataSource.update(admin2Id, duplicateEmailUpdate)).rejects.toThrow(ApiError.emailExist());
    });







    })


  // Test Cases for delete Method
  // Write test cases for delete method to test successful deletion and deletion of a non-existent admin

  // Test Cases for read Method
  // Write test cases for read method to test successful read and reading a non-existent admin

  // Test Cases for getAllAdmins Method
  // Write test cases for getAllAdmins method to test retrieval of all admins with and without data in the database
