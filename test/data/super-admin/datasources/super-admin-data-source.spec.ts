import { SuperAdminModel, SuperAdminEntity } from "@domain/super-admin/entities/super-admin.entity";
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

    it("should handle SuperAdmin update with invalid ID", async () => {
        
      const updatedSuperAdminModel: SuperAdminModel = {
        name: "Johns Doe",
        email: "johnsdoe@example.com",
        phone: 3453453432345,
        superAdmin: false,
        permissions: [101, 32, 43],
      };
      const invalidAdminId = "invalidId";
  
      // Attempt to update using an invalid ID
      await expect(superAdminDataSource.update(invalidAdminId, updatedSuperAdminModel, true)).rejects.toThrow();
    });


    it("should validate SuperAdmin creation and update", async () => {

      const superAdminModel: SuperAdminModel = {
        name: "Johns Doe",
        email: "johnsdoe@example.com",
        phone: 345345345345,
        superAdmin: true,
        permissions: [101, 32, 43, 32],
      };
  
      const updatedSuperAdminModel: SuperAdminModel = {
        name: "Johns Doe",
        email: "johnsdoe@example.com",
        phone: 3453453432345,
        superAdmin: false,
        permissions: [101, 32, 43],
      };
      const createdAdmin: SuperAdminEntity = await superAdminDataSource.create(superAdminModel, true);
      const createAdminId = createdAdmin.id;
  
      if (createAdminId) {
        await superAdminDataSource.update(createAdminId, updatedSuperAdminModel, true);
        
        const updatedAdmin: SuperAdminEntity = await superAdminDataSource.read(createAdminId); 
        expect(createdAdmin.name).toEqual(superAdminModel.name);
        expect(createdAdmin.email).toEqual(superAdminModel.email);
        expect(createdAdmin.phone).toEqual(superAdminModel.phone);
        expect(createdAdmin.superAdmin).toEqual(superAdminModel.superAdmin);

        expect(createdAdmin.name).toEqual(updatedSuperAdminModel.name);
        expect(createdAdmin.email).toEqual(updatedSuperAdminModel.email);
        expect(createdAdmin.phone).not.toEqual(updatedSuperAdminModel.phone);
        expect(createdAdmin.superAdmin).not.toEqual(updatedSuperAdminModel.superAdmin);
        expect(createdAdmin.permissions).not.toEqual(updatedSuperAdminModel.permissions);
  
        expect(updatedAdmin.name).toEqual(updatedSuperAdminModel.name);
        expect(updatedAdmin.email).toEqual(updatedSuperAdminModel.email);
        expect(updatedAdmin.phone).toEqual(updatedSuperAdminModel.phone);
        expect(updatedAdmin.superAdmin).toEqual(updatedSuperAdminModel.superAdmin);
        expect(updatedAdmin.permissions).toEqual(updatedSuperAdminModel.permissions);
      }

    });
  });
