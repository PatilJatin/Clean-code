import { ReservationTagCategoryEntity, ReservationTagCategoryModel } from "@domain/reservation-tag-category/entities/reservation_tag_category_entities"; // Import the TagCategoryModel
import { ReservationTagCategoryRepository } from "@domain/reservation-tag-category/repositories/reservation_tag_category-repo"; // Import the TagCategoryRepository
import { ReservationTagCategoryDataSource } from "../datasource/reservation_tag_Category-datasource"; // Import the TagCategoryDataSource
import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class ReservationTagCategoryRepositoryImpl implements ReservationTagCategoryRepository {
    private readonly reservationTagCategoryDataSource: ReservationTagCategoryDataSource;
    constructor(reservationTagCategoryDataSource: ReservationTagCategoryDataSource) {
        this.reservationTagCategoryDataSource = reservationTagCategoryDataSource;
    }

    async createReservationTagCategory(reservationTagCategory: ReservationTagCategoryModel): Promise<Either<ErrorClass, ReservationTagCategoryEntity>> {
        try {
            const createdReservationTagCategory = await this.reservationTagCategoryDataSource.create(reservationTagCategory); // Use the reservation tag category data source
            return Right<ErrorClass, ReservationTagCategoryEntity>(createdReservationTagCategory);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.badRequest());
        }
    }

    async deleteReservationTagCategory(id: string): Promise<Either<ErrorClass, void>> {
        try {
            const result = await this.reservationTagCategoryDataSource.delete(id); // Use the reservation tag category data source
            return Right<ErrorClass, void>(result); // Return Right if the deletion was successful
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, void>(ApiError.notFound());
            }
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateReservationTagCategory(id: string, data: ReservationTagCategoryModel): Promise<Either<ErrorClass, ReservationTagCategoryEntity>> {
        try {
            const updatedReservationTagCategory = await this.reservationTagCategoryDataSource.update(id, data); // Use the reservation tag category data source
            return Right<ErrorClass, ReservationTagCategoryEntity>(updatedReservationTagCategory);
        } catch (e) {
            if (e instanceof ApiError && e.name === "conflict") {
                return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.badRequest());
        }
    }

    async getAllReservationTagCategories(): Promise<Either<ErrorClass, ReservationTagCategoryEntity[]>> {
        try {
            const reservationTagCategories = await this.reservationTagCategoryDataSource.getAll(); // Use the reservation tag category data source
            return Right<ErrorClass, ReservationTagCategoryEntity[]>(reservationTagCategories);
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, ReservationTagCategoryEntity[]>(ApiError.notFound());
            }
            return Left<ErrorClass, ReservationTagCategoryEntity[]>(ApiError.badRequest());
        }
    }

    async getTagReservationCategoryById(id: string): Promise<Either<ErrorClass, ReservationTagCategoryEntity>> {
        try {
            const reservationTagCategory = await this.reservationTagCategoryDataSource.read(id); // Use the reservation tag category data source
            return reservationTagCategory
                ? Right<ErrorClass, ReservationTagCategoryEntity>(reservationTagCategory)
                : Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.notFound());
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, ReservationTagCategoryEntity>(ApiError.badRequest());
        }
    }
}
