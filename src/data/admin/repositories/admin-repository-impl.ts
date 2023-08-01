import { AdminModel, AdminEntity } from "@domain/admin/entities/admin";
import { AdminRepository } from "@domain/admin/repositories/admin-repository";
import { AdminDataSource } from "@data/admin/datasources/admin-data-source";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";
import { Either, Left, Right } from "monet";

export class AdminRepositoryImpl implements AdminRepository {
  private readonly dataSource: AdminDataSource;

  constructor(dataSource: AdminDataSource) {
    this.dataSource = dataSource;
  }

  async createAdmin(
    admin: AdminModel
  ): Promise<Either<ErrorClass, AdminEntity>> {
    try {
      let i = await this.dataSource.create(admin);
      return Right<ErrorClass, AdminEntity>(i);
    } catch (e) {
      console.log(typeof e, typeof ApiError.emailExits);

      if (typeof e === typeof ApiError.emailExits) {
        return Left<ErrorClass, AdminEntity>(ApiError.emailExits());
      }
      return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }

  async deleteAdmin(id: string): Promise<Either<ErrorClass, void>> {
    try {
      const res = await this.dataSource.delete(id);
      return Right<ErrorClass, void>(res);
    } catch (error) {
      return Left<ErrorClass, void>(ApiError.badRequest());
    }
  }

  async updateAdmin(
    id: string,
    data: AdminModel
  ): Promise<Either<ErrorClass, AdminEntity>> {
    try {
      const response = await this.dataSource.update(id, data);
      return Right<ErrorClass, AdminEntity>(response);
    } catch (error) {
      return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }

  async getAdmins(): Promise<Either<ErrorClass, AdminEntity[]>> {
    try {
      const response = await this.dataSource.getAllAdmins();
      return Right<ErrorClass, AdminEntity[]>(response);
    } catch (error) {
      if (typeof error === typeof ApiError.emailExits) {
        return Left<ErrorClass, AdminEntity[]>(ApiError.emailExits());
      }
      return Left<ErrorClass, AdminEntity[]>(ApiError.badRequest());
    }
  }

  async getAdminById(id: string): Promise<Either<ErrorClass, AdminEntity>> {
    try {
      let response = await this.dataSource.read(id);
      return Right<ErrorClass, AdminEntity>(response);
    } catch (e) {
      if (typeof e === typeof ApiError.notFound) {
        return Left<ErrorClass, AdminEntity>(ApiError.notFound());
      }
      return Left<ErrorClass, AdminEntity>(ApiError.badRequest());
    }
  }
}
