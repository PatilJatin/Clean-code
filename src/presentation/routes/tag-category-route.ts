import mongoose from "mongoose";
import { Router } from "express";
import { TagCategoryServices } from "@presentation/services/tag-category-services"; // Import the TagCategoryServices
import { TagCategoryDataSourceImpl } from "@data/tag-category/datasource/tag_Category-datasource"; // Import the TagCategoryDataSourceImpl
import { TagCategoryRepositoryImpl } from "@data/tag-category/repository/tag_category-repo-impl"; // Import the TagCategoryRepositoryImpl
import { CreateTagCategory } from "@domain/tags-category/usecases/create-tags_category"; // Import the CreateTagCategory use case
import { GetAllTagCategories } from "@domain/tags-category/usecases/get-all-tag-category"; // Import the GetAllTagCategories use case
import { GetTagCategoryById } from "@domain/tags-category/usecases/get-tag-category-by-id"; // Import the GetTagCategoryById use case
import { UpdateTagCategory } from "@domain/tags-category/usecases/update-tag-category"; // Import the UpdateTagCategory use case
import { DeleteTagCategory } from "@domain/tags-category/usecases/delete-tags_category"; // Import the DeleteTagCategory use case

// Create an instance of the TagCategoryDataSourceImpl and pass the mongoose connection
const tagCategoryDataSource = new TagCategoryDataSourceImpl(mongoose.connection);

// Create an instance of the TagCategoryRepositoryImpl and pass the TagCategoryDataSourceImpl
const tagCategoryRepository = new TagCategoryRepositoryImpl(tagCategoryDataSource);

// Create instances of the required use cases and pass the TagCategoryRepositoryImpl
const createTagCategoryUsecase = new CreateTagCategory(tagCategoryRepository);
const deleteTagCategoryUsecase = new DeleteTagCategory(tagCategoryRepository);
const getTagCategoryByIdUsecase = new GetTagCategoryById(tagCategoryRepository);
const getAllTagCategoriesUsecase = new GetAllTagCategories(tagCategoryRepository);
const updateTagCategoryUsecase = new UpdateTagCategory(tagCategoryRepository);

// Initialize TagCategoryServices and inject required dependencies
const tagCategoryService = new TagCategoryServices(
    createTagCategoryUsecase,
    deleteTagCategoryUsecase,
    getTagCategoryByIdUsecase,
    getAllTagCategoriesUsecase,
    updateTagCategoryUsecase
);

// Create an Express router
export const tagCategoryRouter = Router();

// Route handling for creating a new tag category
tagCategoryRouter.post(
    "/add",
    tagCategoryService.createTagCategory.bind(tagCategoryService)
);

// Route handling for deleting a tag category by ID
tagCategoryRouter.delete(
    "/:tagCategoryId",
    tagCategoryService.deleteTagCategory.bind(tagCategoryService)
);

// Route handling for getting a tag category by ID
tagCategoryRouter.get(
    "/:tagCategoryId",
    tagCategoryService.getTagCategoryById.bind(tagCategoryService)
);

// Route handling for getting all tag categories
tagCategoryRouter.get("/", tagCategoryService.getAllTagCategories.bind(tagCategoryService));

// Route handling for updating a tag category by ID
tagCategoryRouter.put(
    "/:tagCategoryId",
    tagCategoryService.updateTagCategory.bind(tagCategoryService)
);

