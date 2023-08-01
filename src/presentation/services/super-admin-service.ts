import { NextFunction, Request, Response } from "express";

import {
    SuperAdminModel,
    SuperAdminEntity,
    SuperAdminMapper,
} from "@domain/super-admin/entities/super-admin.entity";

import { CreateSuperAdminUsecase } from "@domain/super-admin/usecases/create-super-admin";
import { DeleteSuperAdminUsecase } from "@domain/super-admin/usecases/delete-super-admin";
import { GetSuperAdminByIdUsecase } from "@domain/super-admin/usecases/get-super-admin-by-id";
import { UpdateSuperAdminUsecase } from "@domain/super-admin/usecases/update-super-admin";
import { GetAllSuperAdminsUsecase } from "@domain/super-admin/usecases/get-all-super-admin";

import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";

export class SuperAdminService {
    private readonly createSuperAdminUsecase: CreateSuperAdminUsecase;
    private readonly deleteSuperAdminUsecase: DeleteSuperAdminUsecase;
    private readonly getSuperAdminByIdUsecase: GetSuperAdminByIdUsecase;
    private readonly updateSuperAdminUsecase: UpdateSuperAdminUsecase;
    private readonly getAllSuperAdminsUsecase: GetAllSuperAdminsUsecase;
    public internalError = ApiError.internalError()
    public deleteSuccess = ApiError.delete()

    constructor(
        createSuperAdminUsecase: CreateSuperAdminUsecase,
        deleteSuperAdminUsecase: DeleteSuperAdminUsecase,
        getSuperAdminByIdUsecase: GetSuperAdminByIdUsecase,
        updateSuperAdminUsecase: UpdateSuperAdminUsecase,
        getAllSuperAdminsUsecase: GetAllSuperAdminsUsecase
    ) {
        this.createSuperAdminUsecase = createSuperAdminUsecase;
        this.deleteSuperAdminUsecase = deleteSuperAdminUsecase;
        this.getSuperAdminByIdUsecase = getSuperAdminByIdUsecase;
        this.updateSuperAdminUsecase = updateSuperAdminUsecase;
        this.getAllSuperAdminsUsecase = getAllSuperAdminsUsecase;
    }



    async createSuperAdmin(req: Request, res: Response): Promise<void> {
        // try {
            // Extract admin data from the request body and convert it to AdminModel
            const superAdminData: SuperAdminModel = SuperAdminMapper.toModel(req.body);

            // Call the CreateAdminUsecase to create the admin
            const newSuperAdmin: Either<ErrorClass, SuperAdminEntity> = 
            await this.createSuperAdminUsecase.execute(superAdminData);

            newSuperAdmin.cata((error:ErrorClass) => 
            res.status(error.status).json({error: error.message}),
            (result: SuperAdminEntity) => {
                const resData = SuperAdminMapper.toEntity(result, true);
                return res.json(resData);
            }
            )

           
    }

    async deleteSuperAdmin(req: Request, res: Response): Promise<void> {
        // try {
            const superAdminId: string = req.params.superAdminId;

            // Call the DeleteAdminUsecase to delete the admin
           const deleteSuperAdmin =  await this.deleteSuperAdminUsecase.execute(superAdminId);

           deleteSuperAdmin.cata((error:ErrorClass) => 
           res.status(error.status).json({error: error.message}),
           (result: void) => {
               const resData = this.deleteSuccess
               return res.json(resData);
           }
           )

            // Send a success message as a JSON response
            // res.json({ message: "SuperAdmin deleted successfully." });

        // } catch (error) {
        //     if (error instanceof ApiError) {
        //         res.status(error.status).json({ error: error.message });
        //     } else {
        //         res.status(this.internalError.status).json(this.internalError.message)
        //     }
        // }
    }

    async getSuperAdminById(req: Request, res: Response): Promise<void> {
        // try {
            const superAdminId: string = req.params.superAdminId;

            // Call the GetAdminByIdUsecase to get the admin by ID
            const superAdmin: Either<ErrorClass, SuperAdminEntity | null> = await this.getSuperAdminByIdUsecase.execute(
                superAdminId
            );

            superAdmin.cata((error:ErrorClass) =>
             res.status(error.status).json({error: error.message}),
             (result:  SuperAdminEntity | null) => {
                const resData = SuperAdminMapper.toModel(result)
                return res.json(resData);
            } 
             )

            // if (superAdmin) {
            //     // Convert admin from AdminEntity to plain JSON object using AdminMapper
            //     const responseData = SuperAdminMapper.toModel(superAdmin);

            //     // Send the admin as a JSON response
            //     res.json(responseData);

            // } else {
            //     // Send a not found message as a JSON response
            //     throw ApiError.notFound()
            // }
        // } catch (error) {
        //     if (error instanceof ApiError) {
        //         res.status(error.status).json({ error: error.message });
        //     } else {
        //         res.status(this.internalError.status).json(this.internalError.message)
        //     }

        // }
    }

    async updateSuperAdmin(req: Request, res: Response): Promise<void> {
        try {

            const superAdminId: string = req.params.superAdminId;
            const superAdminData: SuperAdminModel = req.body;

            // Get the existing admin by ID
            const existingSuperAdmin: Either<ErrorClass, SuperAdminEntity | null> =
                await this.getSuperAdminByIdUsecase.execute(superAdminId);

            if (!existingSuperAdmin) {
                // If admin is not found, send a not found message as a JSON response
                throw ApiError.notFound();

            }

            // Convert adminData from AdminModel to AdminEntity using AdminMapper
            const updatedAdminEntity: SuperAdminEntity = SuperAdminMapper.toEntity(
                superAdminData,
                true,
                existingSuperAdmin
            );

            // Call the UpdateAdminUsecase to update the admin
            const updatedSuperAdmin: SuperAdminEntity = await this.updateSuperAdminUsecase.execute(
                superAdminId,
                updatedAdminEntity
            );

            // Convert updatedAdmin from AdminEntity to plain JSON object using AdminMapper
            const responseData = SuperAdminMapper.toModel(updatedSuperAdmin);

            // Send the updated admin as a JSON response
            res.json(responseData);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(this.internalError.status).json(this.internalError.message)
            }
        }
    }

    async getAllSuperAdmins(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Call the GetAllAdminsUsecase to get all admins
            const superAdmins: SuperAdminEntity[] = await this.getAllSuperAdminsUsecase.execute();

            // Convert admins from an array of AdminEntity to an array of plain JSON objects using AdminMapper
            const responseData = superAdmins.map((superAdmin) => SuperAdminMapper.toModel(superAdmin));

            // Send the admins as a JSON response
            res.json(responseData);
        } catch (error) {
            if (error instanceof ApiError) {
                res.status(error.status).json({ error: error.message });
            } else {
                res.status(this.internalError.status).json(this.internalError.message)
            }
        }
    }
}
