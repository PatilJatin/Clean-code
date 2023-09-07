import { NextFunction, Request, Response } from "express";
import {
    TagCategoryEntity,
    TagCategoryMapper,
    TagCategoryModel,
} from "@domain/tags-category/entities/tag_category_entities"; // Import tag category-related entities and mapper
import { CreateTagCategoryUsecase } from "@domain/tags-category/usecases/create-tags_category"; // Import tag category-related use cases
import { DeleteTagCategoryUsecase } from "@domain/tags-category/usecases/delete-tags_category";
import { GetTagCategoryByIdUsecase } from "@domain/tags-category/usecases/get-tag-category-by-id";
import { GetAllTagCategoriesUsecase } from "@domain/tags-category/usecases/get-all-tag-category";
import { UpdateTagCategoryUsecase } from "@domain/tags-category/usecases/update-tag-category";
import { Either } from "monet";
import { ErrorClass } from "@presentation/error-handling/api-error";

export class TagCategoryServices {
    private readonly createTagCategoryUsecases: CreateTagCategoryUsecase;
    private readonly deleteTagCategoryUsecases: DeleteTagCategoryUsecase;
    private readonly getTagCategoryByIdUsecases: GetTagCategoryByIdUsecase;
    private readonly getAllTagCategoriesUsecases: GetAllTagCategoriesUsecase;
    private readonly updateTagCategoryUsecases: UpdateTagCategoryUsecase;

    constructor(
        createTagCategoryUsecases: CreateTagCategoryUsecase,
        deleteTagCategoryUsecases: DeleteTagCategoryUsecase,
        getTagCategoryByIdUsecases: GetTagCategoryByIdUsecase,
        getAllTagCategoriesUsecases: GetAllTagCategoriesUsecase,
        updateTagCategoryUsecases: UpdateTagCategoryUsecase,
    ) {
        this.createTagCategoryUsecases = createTagCategoryUsecases;
        this.deleteTagCategoryUsecases = deleteTagCategoryUsecases;
        this.getTagCategoryByIdUsecases = getTagCategoryByIdUsecases;
        this.getAllTagCategoriesUsecases = getAllTagCategoriesUsecases;
        this.updateTagCategoryUsecases = updateTagCategoryUsecases;
    }

    async createTagCategory(req: Request, res: Response): Promise<void> {
        const tagCategoryData: TagCategoryModel = TagCategoryMapper.toModel(req.body);

        const newTagCategory: Either<ErrorClass, TagCategoryEntity> =
            await this.createTagCategoryUsecases.execute(tagCategoryData);

        newTagCategory.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: TagCategoryEntity) => {
                const resData = TagCategoryMapper.toEntity(result, true);
                return res.json(resData);
            }
        );
    }

    async deleteTagCategory(req: Request, res: Response): Promise<void> {
        const tagCategoryId: string = req.params.tagCategoryId;

        const deletedTagCategory: Either<ErrorClass, void> =
            await this.deleteTagCategoryUsecases.execute(tagCategoryId);

        deletedTagCategory.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: void) => {
                return res.json({ message: "Tag category deleted successfully." });
            }
        );
    }

    async getTagCategoryById(req: Request, res: Response): Promise<void> {
        const tagCategoryId: string = req.params.tagCategoryId;

        const tagCategory: Either<ErrorClass, TagCategoryEntity> =
            await this.getTagCategoryByIdUsecases.execute(tagCategoryId);

        tagCategory.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: TagCategoryEntity) => {
                if (!result) {
                    return res.json({ message: "Tag category not found." });
                }
                const resData = TagCategoryMapper.toEntity(result);
                return res.json(resData);
            }
        );
    }

    async getAllTagCategories(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const tagCategories: Either<ErrorClass, TagCategoryEntity[]> =
            await this.getAllTagCategoriesUsecases.execute();

        tagCategories.cata(
            (error: ErrorClass) =>
                res.status(error.status).json({ error: error.message }),
            (result: TagCategoryEntity[]) => {
                const responseData = result.map((tagCategory) =>
                    TagCategoryMapper.toEntity(tagCategory)
                );
                return res.json(responseData);
            }
        );
    }

    async updateTagCategory(req: Request, res: Response): Promise<void> {
        const tagCategoryId: string = req.params.tagCategoryId;
        const tagCategoryData: TagCategoryModel = req.body;

        const existingTagCategory: Either<ErrorClass, TagCategoryEntity> =
            await this.getTagCategoryByIdUsecases.execute(tagCategoryId);

        existingTagCategory.cata(
            (error: ErrorClass) => {
                res.status(error.status).json({ error: error.message });
            },
            async (existingTagCategoryData: TagCategoryEntity) => {
                const updatedTagCategoryEntity: TagCategoryEntity = TagCategoryMapper.toEntity(
                    tagCategoryData,
                    true,
                    existingTagCategoryData
                );

                const updatedTagCategory: Either<ErrorClass, TagCategoryEntity> =
                    await this.updateTagCategoryUsecases.execute(
                        tagCategoryId,
                        updatedTagCategoryEntity
                    );

                updatedTagCategory.cata(
                    (error: ErrorClass) => {
                        res.status(error.status).json({ error: error.message });
                    },
                    (result: TagCategoryEntity) => {
                        const resData = TagCategoryMapper.toEntity(result, true);
                        res.json(resData);
                    }
                );
            }
        );
    }
}
