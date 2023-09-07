import { TagCategoryEntity, TagCategoryModel } from "../entities/tag_category_entities"; // Import the TagCategoryEntity and TagCategoryModel classes
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface TagCategoryRepository {
    createTagCategory(
        tagCategory: TagCategoryModel
    ): Promise<Either<ErrorClass, TagCategoryEntity>>;
    deleteTagCategory(id: string): Promise<Either<ErrorClass, void>>;
    getTagCategoryById(id: string): Promise<Either<ErrorClass, TagCategoryEntity>>;
    updateTagCategory(
        id: string,
        data: TagCategoryModel
    ): Promise<Either<ErrorClass, TagCategoryEntity>>;
    getAllTagCategories(): Promise<Either<ErrorClass, TagCategoryEntity[]>>;
}
