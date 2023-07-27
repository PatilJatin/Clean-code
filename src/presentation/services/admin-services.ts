import { Request, Response } from "express";
import {
  AdminModel,
  AdminEntity,
  AdminMapper,
} from "@domain/admin/entities/admin";
import { CreateAdminUsecase } from "@domain/admin/usecases/create-admin";
import { DeleteAdminUsecase } from "@domain/admin/usecases/delete-admin";
import { GetAdminByIdUsecase } from "@domain/admin/usecases/get-admin-by-id";
import { UpdateAdminUsecase } from "@domain/admin/usecases/update-admin";
import { GetAllAdminsUsecase } from "@domain/admin/usecases/get-all-admins";

export class AdminService {
  private readonly createAdminUsecase: CreateAdminUsecase;
  private readonly deleteAdminUsecase: DeleteAdminUsecase;
  private readonly getAdminByIdUsecase: GetAdminByIdUsecase;
  private readonly updateAdminUsecase: UpdateAdminUsecase;
  private readonly getAllAdminsUsecase: GetAllAdminsUsecase;

  constructor(
    createAdminUsecase: CreateAdminUsecase,
    deleteAdminUsecase: DeleteAdminUsecase,
    getAdminByIdUsecase: GetAdminByIdUsecase,
    updateAdminUsecase: UpdateAdminUsecase,
    getAllAdminsUsecase: GetAllAdminsUsecase
  ) {
    this.createAdminUsecase = createAdminUsecase;
    this.deleteAdminUsecase = deleteAdminUsecase;
    this.getAdminByIdUsecase = getAdminByIdUsecase;
    this.updateAdminUsecase = updateAdminUsecase;
    this.getAllAdminsUsecase = getAllAdminsUsecase;
  }

  async createAdmin(req: Request, res: Response): Promise<void> {
    try {
      // Extract admin data from the request body and convert it to AdminModel
      const adminData: AdminModel = AdminMapper.toModel(req.body);

      // Call the CreateAdminUsecase to create the admin
      const newAdmin: AdminEntity = await this.createAdminUsecase.execute(
        adminData
      );

      // Convert newAdmin from AdminEntity to the desired format using AdminMapper
      const responseData = AdminMapper.toEntity(newAdmin, true);

      // Send the created admin as a JSON response
      res.json(responseData);
    } catch (error) {
      res.status(500).json({ error: "Failed to create admin." });
    }
  }

  async deleteAdmin(req: Request, res: Response): Promise<void> {
    try {
      const adminId: string = req.params.adminId;

      // Call the DeleteAdminUsecase to delete the admin
      await this.deleteAdminUsecase.execute(adminId);

      // Send a success message as a JSON response
      res.json({ message: "Admin deleted successfully." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete admin." });
    }
  }

  async getAdminById(req: Request, res: Response): Promise<void> {
    try {
      const adminId: string = req.params.adminId;

      // Call the GetAdminByIdUsecase to get the admin by ID
      const admin: AdminEntity | null = await this.getAdminByIdUsecase.execute(
        adminId
      );

      if (admin) {
        // Convert admin from AdminEntity to plain JSON object using AdminMapper
        const responseData = AdminMapper.toModel(admin);

        // Send the admin as a JSON response
        res.json(responseData);
      } else {
        // Send a not found message as a JSON response
        res.status(404).json({ message: "Admin not found." });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to get admin by ID." });
    }
  }

  async updateAdmin(req: Request, res: Response): Promise<void> {
    try {
      const adminId: string = req.params.adminId;
      const adminData: AdminModel = req.body;

      // Get the existing admin by ID
      const existingAdmin: AdminEntity | null =
        await this.getAdminByIdUsecase.execute(adminId);

      if (!existingAdmin) {
        // If admin is not found, send a not found message as a JSON response
        res.status(404).json({ message: "Admin not found." });
        return;
      }

      // Convert adminData from AdminModel to AdminEntity using AdminMapper
      const updatedAdminEntity: AdminEntity = AdminMapper.toEntity(
        adminData,
        true,
        existingAdmin
      );

      // Call the UpdateAdminUsecase to update the admin
      const updatedAdmin: AdminEntity = await this.updateAdminUsecase.execute(
        adminId,
        updatedAdminEntity
      );

      // Convert updatedAdmin from AdminEntity to plain JSON object using AdminMapper
      const responseData = AdminMapper.toModel(updatedAdmin);

      // Send the updated admin as a JSON response
      res.json(responseData);
    } catch (error) {
      res.status(500).json({ error: "Failed to update admin." });
    }
  }

  async getAllAdmins(req: Request, res: Response): Promise<void> {
    try {
      // Call the GetAllAdminsUsecase to get all admins
      const admins: AdminEntity[] = await this.getAllAdminsUsecase.execute();

      // Convert admins from an array of AdminEntity to an array of plain JSON objects using AdminMapper
      const responseData = admins.map((admin) => AdminMapper.toModel(admin));

      // Send the admins as a JSON response
      res.json(responseData);
    } catch (error) {
      res.status(500).json({ error: "Failed to get all admins." });
    }
  }
}
