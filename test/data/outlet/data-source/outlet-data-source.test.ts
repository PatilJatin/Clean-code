import { OutletEntity, OutletModel } from "@domain/outlet/entities/outlet";
import { Outlet } from "@data/outlet/models/outlet-model";
import mongoose from "mongoose";

import { OutletDataSourceImpl } from '@data/outlet/datasources/outlet-data-source'
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';

dotenv.config();

let outletDataSource: OutletDataSourceImpl;
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
  await Outlet.deleteMany({});
  outletDataSource = new OutletDataSourceImpl(connection);
});

describe("OutletDataSourceImpl", () => {

    const outletModel1: OutletModel = {
        brandLogo: "gsddn.jpg",
        outletName: "Example2 Brand",
        email: "example2563@gmail.com",
        phone: "123456789011",
        altPhone: "9876543210",
        address: "123 Example Street",
        city: "Example City",
        state: "Example State",
        country: "Example Country",
        pincode: 123456,
        active: true,
        admins: ["23werfweferwr"]
    }

    const outletModel2: OutletModel = {
        brandLogo: "gsn.jpg",
        outletName: "Example Brand",
        email: "exampe2@gmail.com",
        phone: "123452389011",
        altPhone: "9876543210",
        address: "123 Example Steet",
        city: "Example City",
        state: "Example State",
        country: "Example Country",
        pincode: 123326,
        active: true,
        admins: ["23werfweferwr"]

    }
    

    const outletModel3: OutletModel = {
        brandLogo: "gseen.jpg",
        outletName: "Example2 Brand",
        email: "exampe3@gmail.com",
        phone: "123452389011",
        altPhone: "9876543210",
        address: "123 Example Steet",
        city: "Example City",
        state: "Example State",
        country: "Example Country",
        pincode: 123326,
        active: true,
        admins: ["23werfweferwr"]
    }

    it("should check that there exists no outlet", async () => {
        const outlets: OutletEntity[] = await outletDataSource.getAllOutlets();

        expect(outlets.length).toEqual(0);
    });

    it("it should delete an existing outlet with ID", async () => {
        const outlet1: OutletEntity = await outletDataSource.create(outletModel1, true);
        const outlet2: OutletEntity = await outletDataSource.create(outletModel2, true);
        const outlet3: OutletEntity = await outletDataSource.create(outletModel3, true);
        const beforeDeletion: OutletEntity[] = await outletDataSource.getAllOutlets();
        expect(beforeDeletion.length).toEqual(3);
        const firstOutletId = outlet1.id;
        if (firstOutletId) {
            console.log(firstOutletId)

            await outletDataSource.delete(firstOutletId);
            const afterDeletion: OutletEntity[] = await outletDataSource.getAllOutlets();

            expect(afterDeletion.length).toEqual(2);
        }
    });

    it("should throw casting error on invalid ID when deleting.", async () => {

        const invalidID = "64d0cdcec399332ecc6";

        await expect(outletDataSource.delete(invalidID)).rejects.toThrow(mongoose.Error.CastError);
    });

    it("it should handle deletion of valid ID when outlet does not exist", () => {
        const validID = "64d101b9932c18da20288d77";
        expect(outletDataSource.delete(validID)).rejects.toThrow();
    });
});
