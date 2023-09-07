import { Either } from "monet";
import { TagCategoryEntity } from "../entities/tag_category_entities"; // Import the TagCategoryEntity
import { TagCategoryRepository } from "../repositories/tag_category-repo"; // Import the TagCategoryRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface GetTagCategoryByIdUsecase {
  execute: (tagCategoryId: string) => Promise<Either<ErrorClass, TagCategoryEntity>>;
}

export class GetTagCategoryById implements GetTagCategoryByIdUsecase {
  private readonly tagCategoryRepository: TagCategoryRepository;

  constructor(tagCategoryRepository: TagCategoryRepository) {
    this.tagCategoryRepository = tagCategoryRepository;
  }

  async execute(tagCategoryId: string): Promise<Either<ErrorClass, TagCategoryEntity>> {
    return await this.tagCategoryRepository.getTagCategoryById(tagCategoryId);
  }
}

