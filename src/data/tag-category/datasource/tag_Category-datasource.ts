import mongoose from "mongoose";
import { TagCategoryModel } from "@domain/tags-category/entities/tag_category_entities"; // Import the TagCategoryModel
import { TagCategory } from "../models/tag_category_model"; 
import ApiError from "@presentation/error-handling/api-error";

// Create TagCategoryDataSource Interface
export interface TagCategoryDataSource {
    create(tagCategory: TagCategoryModel): Promise<any>;
    update(id: string, tagCategory: TagCategoryModel): Promise<any>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    getAllTagCategories(): Promise<any[]>;
}

// TagCategory Data Source communicates with the database
export class TagCategoryDataSourceImpl implements TagCategoryDataSource {
    constructor(private db: mongoose.Connection) { }

    async create(tagCategory: TagCategoryModel): Promise<any> {
        const existingTagCategory = await TagCategory.findOne({ name: tagCategory.name });
        if (existingTagCategory) {
            throw ApiError.emailExist();
        }
        const tagCategoryData = new TagCategory(tagCategory);
        const createdTagCategory = await tagCategoryData.save();
        return createdTagCategory.toObject();
    }

    async delete(id: string): Promise<void> {
        await TagCategory.findByIdAndDelete(id);
    }

    async read(id: string): Promise<any | null> {
        const tagCategory = await TagCategory.findById(id);
        return tagCategory ? tagCategory.toObject() : null; // Convert to a plain JavaScript object before returning
    }

    async getAllTagCategories(): Promise<any[]> {
        const tagCategories = await TagCategory.find();
        return tagCategories.map((tagCategory) => tagCategory.toObject()); // Convert to plain JavaScript objects before returning
    }

    async update(id: string, tagCategory: TagCategoryModel): Promise<any> {
        const updatedTagCategory = await TagCategory.findByIdAndUpdate(id, tagCategory, {
            new: true,
        }); // No need for conversion here
        return updatedTagCategory ? updatedTagCategory.toObject() : null; // Convert to a plain JavaScript object before returning
    }
}
