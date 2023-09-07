import { Either } from "monet";
import { TagCategoryEntity } from "../entities/tag_category_entities"; // Import the TagCategoryEntity
import { TagCategoryRepository } from "../repositories/tag_category-repo"; // Import the TagCategoryRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetAllTagCategoriesUsecase {
  execute: () => Promise<Either<ErrorClass, TagCategoryEntity[]>>;
}

export class GetAllTagCategories implements GetAllTagCategoriesUsecase {
  private readonly tagCategoryRepository: TagCategoryRepository;

  constructor(tagCategoryRepository: TagCategoryRepository) {
    this.tagCategoryRepository = tagCategoryRepository;
  }

  async execute(): Promise<Either<ErrorClass, TagCategoryEntity[]>> {
    return await this.tagCategoryRepository.getAllTagCategories();
  }
}
