import { SuperAdminModel } from "@domain/super-admin/entities/super-admin.entity";
import { Admin } from "@data/admin/models/admin-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";

export interface SuperAdminDataSource {
  create(superAdmin: SuperAdminModel): Promise<any>; // Return type should be Promise of AdminEntity
  update(id: string, superadmin: SuperAdminModel): Promise<any>; // Return type should be Promise of AdminEntity
  delete(id: string): Promise<void>;
  read(id: string): Promise<any | null>; // Return type should be Promise of AdminEntity or null
  getAllAdmins(): Promise<any[]>; // Return type should be Promise of an array of AdminEntity
}

export class SuperAdminDataSourceImpl implements SuperAdminDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(superAdmin: SuperAdminModel): Promise<any> {
    const existingSuperAdmin = await Admin.findOne({ email: superAdmin.email });
    if (existingSuperAdmin) {
      throw ApiError.emailExits()
    }


    superAdmin.superAdmin = true;
  
    const superAdminData = new Admin(superAdmin);

    const createdSuperAdmin = await superAdminData.save();
    
    return createdSuperAdmin.toObject();
  }

  async update(id: string, superAdmin: SuperAdminModel): Promise<any> {
    const updatedSuperAdmin = await Admin.findByIdAndUpdate(id, superAdmin, {
      new: true,
    }); // No need for conversion here
    return updatedSuperAdmin ? updatedSuperAdmin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async delete(id: string): Promise<void> {
    await Admin.findByIdAndDelete(id);
  }

  async read(id: string): Promise<any | null> {
    const superAdmin = await Admin.findById(id);
    return superAdmin ? superAdmin.toObject() : null; // Convert to plain JavaScript object before returning
  }

  async getAllAdmins(): Promise<any[]> {
    const superAdmins = await Admin.find();
    return superAdmins.map((superAdmin) => superAdmin.toObject()); // Convert to plain JavaScript objects before returning
  }
}
