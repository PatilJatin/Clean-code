import { Either } from "monet";
import { TagCategoryEntity } from "../entities/tag_category_entities"; // Import the TagCategoryEntity
import { TagCategoryRepository } from "../repositories/tag_category-repo"; // Import the TagCategoryRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface UpdateTagCategoryUsecase {
  execute: (
    tagCategoryId: string,
    tagCategoryData: TagCategoryEntity
  ) => Promise<Either<ErrorClass, TagCategoryEntity>>;
}

export class UpdateTagCategory implements UpdateTagCategoryUsecase {
  private readonly tagCategoryRepository: TagCategoryRepository;

  constructor(tagCategoryRepository: TagCategoryRepository) {
    this.tagCategoryRepository = tagCategoryRepository;
  }

  async execute(
    tagCategoryId: string,
    tagCategoryData: TagCategoryEntity
  ): Promise<Either<ErrorClass, TagCategoryEntity>> {
    return await this.tagCategoryRepository.updateTagCategory(tagCategoryId, tagCategoryData);
  }
}
