import mongoose from "mongoose";
import { ClientTagModel } from "@domain/client-tag/entities/client_tag_entities"; // Import the TagCategoryModel
import { ClientTag } from "../models/client_tag_model";
import ApiError from "@presentation/error-handling/api-error";

// Create CLientTagDataSource Interface
export interface ClientTagDataSource {
    create(clientTag: ClientTagModel): Promise<any>;
    update(id: string, tagCategory: ClientTagModel): Promise<any>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    getAll(): Promise<any[]>;
}

// Tag Data Source communicates with the database
export class ClientTagDataSourceImpl implements ClientTagDataSource {
    constructor(private db: mongoose.Connection) { }

    async create(clientTag: ClientTagModel): Promise<any> {
        const existingClientTag = await ClientTag.findOne({ name: clientTag.name });
        if (existingClientTag) {
            throw ApiError.emailExist();
        }
        const clientTagData = new ClientTag(clientTag);
        const createdClientTag = await clientTagData.save();
        return createdClientTag.toObject();
    }

    async delete(id: string): Promise<void> {
        await ClientTag.findByIdAndDelete(id);
    }

    async read(id: string): Promise<any | null> {
        const clientTag = await ClientTag.findById(id);
        return clientTag ? clientTag.toObject() : null; // Convert to a plain JavaScript object before returning
    }

    async getAll(): Promise<any[]> {
        const clientTags = await ClientTag.find();
        return clientTags.map((clientTag) => clientTag.toObject()); // Convert to plain JavaScript objects before returning
    }

    async update(id: string, clientTag: ClientTagModel): Promise<any> {
        const updatedClientTag = await ClientTag.findByIdAndUpdate(id, clientTag, {
            new: true,
        }); // No need for conversion here
        return updatedClientTag ? updatedClientTag.toObject() : null; // Convert to a plain JavaScript object before returning
    }
}
