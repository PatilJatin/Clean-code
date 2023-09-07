import { Either } from "monet";
import { TagCategoryRepository } from "../repositories/tag_category-repo"; // Import the TagCategoryRepository
import { ErrorClass } from "@presentation/error-handling/api-error";

export interface DeleteTagCategoryUsecase {
    execute: (tagCategoryId: string) => Promise<Either<ErrorClass, void>>;
}

export class DeleteTagCategory implements DeleteTagCategoryUsecase {
    private readonly tagCategoryRepository: TagCategoryRepository;

    constructor(tagCategoryRepository: TagCategoryRepository) {
        this.tagCategoryRepository = tagCategoryRepository;
    }

    async execute(tagCategoryId: string): Promise<Either<ErrorClass, void>> {
        return await this.tagCategoryRepository.deleteTagCategory(tagCategoryId);
    }
}
