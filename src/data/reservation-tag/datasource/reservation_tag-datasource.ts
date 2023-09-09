import mongoose from "mongoose";
import { ReservationTagModel } from "@domain/reservation-tag/entities/reservation_tag_entities"; // Import the TagCategoryModel
import { ReservationTag } from "../models/reservation_tag_model";
import ApiError from "@presentation/error-handling/api-error";

// Create ReservationTagDataSource Interface
export interface ReservationTagDataSource {
    create(reservationTag: ReservationTagModel): Promise<any>;
    update(id: string, tagCategory: ReservationTagModel): Promise<any>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    getAll(): Promise<any[]>;
}

// Tag Data Source communicates with the database
export class ReservationTagDataSourceImpl implements ReservationTagDataSource {
    constructor(private db: mongoose.Connection) { }

    async create(reservationTag: ReservationTagModel): Promise<any> {
        const existingReservationTag = await ReservationTag.findOne({ name: reservationTag.name });
        if (existingReservationTag) {
            throw ApiError.emailExist();
        }
        const reservationTagData = new ReservationTag(reservationTag);
        const createdReservationTag = await reservationTagData.save();
        return createdReservationTag.toObject();
    }

    async delete(id: string): Promise<void> {
        await ReservationTag.findByIdAndDelete(id);
    }

    async read(id: string): Promise<any | null> {
        const reservationTag = await ReservationTag.findById(id);
        return reservationTag ? reservationTag.toObject() : null; // Convert to a plain JavaScript object before returning
    }

    async getAll(): Promise<any[]> {
        const reservationTags = await ReservationTag.find();
        return reservationTags.map((reservationTag) => reservationTag.toObject()); // Convert to plain JavaScript objects before returning
    }

    async update(id: string, reservationTag: ReservationTagModel): Promise<any> {
        const updatedReservationTag = await ReservationTag.findByIdAndUpdate(id, reservationTag, {
            new: true,
        }); // No need for conversion here
        return updatedReservationTag ? updatedReservationTag.toObject() : null; // Convert to a plain JavaScript object before returning
    }
}
