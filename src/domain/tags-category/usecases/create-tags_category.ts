import { ErrorClass } from "@presentation/error-handling/api-error";
import { TagCategoryEntity, TagCategoryModel } from "../entities/tag_category_entities"; // Import the TagCategoryModel and TagCategoryEntity
import { TagCategoryRepository } from "../repositories/tag_category-repo"; // Import the TagCategoryRepository
import { Either, Right, Left } from "monet";

export interface CreateTagCategoryUsecase {
    execute: (tagCategoryData: TagCategoryModel) => Promise<Either<ErrorClass, TagCategoryEntity>>;
}

export class CreateTagCategory implements CreateTagCategoryUsecase {
    private readonly tagCategoryRepository: TagCategoryRepository;
    constructor(tagCategoryRepository: TagCategoryRepository) {
        this.tagCategoryRepository = tagCategoryRepository;
    }
    async execute(tagCategoryData: TagCategoryModel): Promise<Either<ErrorClass, TagCategoryEntity>> {
        return await this.tagCategoryRepository.createTagCategory(tagCategoryData);
    }
}
