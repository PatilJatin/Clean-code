import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { Admin } from "../models/admin-model";
import mongoose from "mongoose";
export interface AdminDataSource {
  create(admin: AdminModel): Promise<AdminEntity>; // Return type should be Promise of AdminEntity
  update(id: string, admin: AdminModel): Promise<AdminEntity>; // Return type should be Promise of AdminEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<AdminEntity | null>; // Return type should be Promise of AdminEntity or null
  getAllAdmins(): Promise<AdminEntity[]>; // Return type should be Promise of an array of AdminEntity
}

export class AdminDataSourceImpl implements AdminDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(admin: AdminModel): Promise<AdminEntity> {
    const existingAdmin = await Admin.findOne({ email: admin.email });
    if (existingAdmin) {
      throw new Error("Email already exists.");
    }

    const adminData = new Admin(admin);
    const createdAdmin = await adminData.save();
    const adminEntity: AdminEntity = {
      ...createdAdmin.toObject(),
      id: createdAdmin._id.toString(),
    };

    return adminEntity;
  }

  // async update(id: string, admin: AdminModel): Promise<AdminEntity> {
  //   const existingAdmin = await Admin.findOne({ email: admin.email });
  // if (existingAdmin) {
  //   throw new Error("Email already exists.");
  // }
  //   const updatedAdmin = await Admin.findByIdAndUpdate(id, admin, {
  //     new: true,
  //   }); // No need for conversion here
  //   return updatedAdmin ? updatedAdmin.toObject();// Convert to plain JavaScript object before returning
  // }
  async update(
    adminId: string,
    adminData: Partial<AdminEntity>
  ): Promise<AdminEntity> {
    try {
      // Find the existing admin in the database based on adminId
      const existingAdmin = await Admin.findById(adminId);

      if (!existingAdmin) {
        // If admin is not found, throw an error to indicate not found
        throw new Error("Admin not found.");
      }

      // Merge the new admin data with the existing admin data
      const updatedAdminData = { ...existingAdmin.toObject(), ...adminData };

      // Convert the _id property to a string
      if (updatedAdminData._id) {
        updatedAdminData.id = updatedAdminData._id.toString();
      }

      // Update the admin in the database with the merged data
      await Admin.findByIdAndUpdate(adminId, updatedAdminData, {
        new: true,
      });

      // Return the updated admin data as an AdminEntity
      return updatedAdminData as AdminEntity;
    } catch (error) {
      // Handle any errors that occur during the update process
      throw new Error("Failed to update admin.");
    }
  }

  async delete(id: string): Promise<void> {
    await Admin.findByIdAndDelete(id);
  }

  async read(id: string): Promise<AdminEntity | null> {
    const admin = await Admin.findById(id);
    return admin ? admin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllAdmins(): Promise<AdminEntity[]> {
    const admins = await Admin.find();
    return admins.map((admin) => admin.toObject()); // Convert to plain JavaScript objects before returning
  }
}
