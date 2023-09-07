import { TagCategoryEntity, TagCategoryModel } from "@domain/tags-category/entities/tag_category_entities"; // Import the TagCategoryModel
import { TagCategoryRepository } from "@domain/tags-category/repositories/tag_category-repo"; // Import the TagCategoryRepository
import { TagCategoryDataSource } from "../datasource/tag_Category-datasource"; // Import the TagCategoryDataSource
import { Either, Right, Left } from "monet";
import ApiError, { ErrorClass } from "@presentation/error-handling/api-error";

export class TagCategoryRepositoryImpl implements TagCategoryRepository {
    private readonly tagCategoryDataSource: TagCategoryDataSource;
    constructor(tagCategoryDataSource: TagCategoryDataSource) {
        this.tagCategoryDataSource = tagCategoryDataSource;
    }

    async createTagCategory(tagCategory: TagCategoryModel): Promise<Either<ErrorClass, TagCategoryEntity>> {
        try {
            const createdTagCategory = await this.tagCategoryDataSource.create(tagCategory); // Use the tag category data source
            return Right<ErrorClass, TagCategoryEntity>(createdTagCategory);
        } catch (error) {
            if (error instanceof ApiError && error.name === "conflict") {
                return Left<ErrorClass, TagCategoryEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, TagCategoryEntity>(ApiError.badRequest());
        }
    }

    async deleteTagCategory(id: string): Promise<Either<ErrorClass, void>> {
        try {
            const result = await this.tagCategoryDataSource.delete(id); // Use the tag category data source
            return Right<ErrorClass, void>(result); // Return Right if the deletion was successful
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, void>(ApiError.notFound());
            }
            return Left<ErrorClass, void>(ApiError.badRequest());
        }
    }

    async updateTagCategory(id: string, data: TagCategoryModel): Promise<Either<ErrorClass, TagCategoryEntity>> {
        try {
            const updatedTagCategory = await this.tagCategoryDataSource.update(id, data); // Use the tag category data source
            return Right<ErrorClass, TagCategoryEntity>(updatedTagCategory);
        } catch (e) {
            if (e instanceof ApiError && e.name === "conflict") {
                return Left<ErrorClass, TagCategoryEntity>(ApiError.emailExist());
            }
            return Left<ErrorClass, TagCategoryEntity>(ApiError.badRequest());
        }
    }

    async getAllTagCategories(): Promise<Either<ErrorClass, TagCategoryEntity[]>> {
        try {
            const tagCategories = await this.tagCategoryDataSource.getAllTagCategories(); // Use the tag category data source
            return Right<ErrorClass, TagCategoryEntity[]>(tagCategories);
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, TagCategoryEntity[]>(ApiError.notFound());
            }
            return Left<ErrorClass, TagCategoryEntity[]>(ApiError.badRequest());
        }
    }

    async getTagCategoryById(id: string): Promise<Either<ErrorClass, TagCategoryEntity>> {
        try {
            const tagCategory = await this.tagCategoryDataSource.read(id); // Use the tag category data source
            return tagCategory
                ? Right<ErrorClass, TagCategoryEntity>(tagCategory)
                : Left<ErrorClass, TagCategoryEntity>(ApiError.notFound());
        } catch (e) {
            if (e instanceof ApiError && e.name === "notfound") {
                return Left<ErrorClass, TagCategoryEntity>(ApiError.notFound());
            }
            return Left<ErrorClass, TagCategoryEntity>(ApiError.badRequest());
        }
    }
}
