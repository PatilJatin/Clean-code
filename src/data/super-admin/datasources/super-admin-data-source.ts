import { SuperAdminModel, SuperAdminEntity, SuperAdminMapper} from "@domain/super-admin/entities/super-admin.entity";
import { Admin } from "@data/admin/models/admin-model";
import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { SuperAdminDataSource } from "types/db";



export class SuperAdminDataSourceImpl implements SuperAdminDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(superAdmin: SuperAdminModel, includeId: boolean = false): Promise<any> {
    const existingSuperAdmin = await Admin.findOne({ email: superAdmin.email });
    if (existingSuperAdmin) {
      throw ApiError.emailExist()
    }


    superAdmin.superAdmin = true;
  
    const superAdminData = new Admin(superAdmin);

    const createdSuperAdmin = await superAdminData.save();

    
    return SuperAdminMapper.toEntity(createdSuperAdmin.toObject(), includeId=includeId);
  }

  async update(id: string, superAdmin: SuperAdminModel, includeId: boolean = false): Promise<any> {
    const updatedSuperAdmin = await Admin.findByIdAndUpdate(id, superAdmin, {
      new: true,
    });
    return updatedSuperAdmin ? SuperAdminMapper.toEntity(updatedSuperAdmin.toObject(), includeId=includeId) : null; 
  }

  async delete(id: string): Promise<void> {
    await Admin.findByIdAndDelete(id);
  }

  async read(id: string, includeId: boolean = false):Promise<any> {
    const superAdmin = await Admin.findById(id);
    return superAdmin ? SuperAdminMapper.toEntity(superAdmin.toObject(), includeId=includeId) : null; 
  }

  async getAllAdmins(): Promise<SuperAdminEntity[]> {
    const superAdmins = await Admin.find();
    return superAdmins.map((superAdmin) => superAdmin.toObject()); 
  }
}
