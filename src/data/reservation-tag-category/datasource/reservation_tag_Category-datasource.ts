import mongoose from "mongoose";
import { ReservationTagCategoryModel } from "@domain/reservation-tag-category/entities/reservation_tag_category_entities"; // Import the TagCategoryModel
import { ReservationTagCategory } from "../models/reservation_tag_category_model";
import ApiError from "@presentation/error-handling/api-error";

// Create reservationTagCategoryDataSource Interface
export interface ReservationTagCategoryDataSource {
    create(reservationTagCategory: ReservationTagCategoryModel): Promise<any>;
    update(id: string, reservationTagCategory: ReservationTagCategoryModel): Promise<any>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    getAll(): Promise<any[]>;
}

// reservationTagCategory Data Source communicates with the database
export class ReservationTagCategoryDataSourceImpl implements ReservationTagCategoryDataSource {
    constructor(private db: mongoose.Connection) { }

    async create(reservationTagCategory: ReservationTagCategoryModel): Promise<any> {
        const existingReservationTagCategory = await ReservationTagCategory.findOne({ name: reservationTagCategory.name });
        if (existingReservationTagCategory) {
            throw ApiError.emailExist();
        }
        const reservationTagCategoryData = new ReservationTagCategory(reservationTagCategory);
        const createdReservationTagCategory = await reservationTagCategoryData.save();
        return createdReservationTagCategory.toObject();
    }

    async delete(id: string): Promise<void> {
        await ReservationTagCategory.findByIdAndDelete(id);
    }

    async read(id: string): Promise<any | null> {
        const reservationTagCategory = await ReservationTagCategory.findById(id);
        return reservationTagCategory ? reservationTagCategory.toObject() : null; // Convert to a plain JavaScript object before returning
    }

    async getAll(): Promise<any[]> {
        const reservationTagCategories = await ReservationTagCategory.find();
        return reservationTagCategories.map((reservationTagCategory) => reservationTagCategory.toObject()); // Convert to plain JavaScript objects before returning
    }

    async update(id: string, reservationTagCategory: ReservationTagCategoryModel): Promise<any> {
        const updatedReservationTagCategory = await ReservationTagCategory.findByIdAndUpdate(id, reservationTagCategory, {
            new: true,
        }); // No need for conversion here
        return updatedReservationTagCategory ? updatedReservationTagCategory.toObject() : null; // Convert to a plain JavaScript object before returning
    }
}
