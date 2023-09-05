import mongoose from "mongoose";
import { GuestModel } from "@domain/guest/entities/guest_entities";
import { Guest } from "../models/guest_model";
import ApiError from "@presentation/error-handling/api-error";

//Create GUestDataSourse Interface
export interface GuestDataSource {
    create(guest: GuestModel): Promise<any>;
    update(id: String, guest: GuestModel): Promise<any>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    getAllguest(): Promise<any[]>;
}

//Guest Data Source is comunicate with data base
export class GuestDataSourceImpl implements GuestDataSource {
    constructor(private db: mongoose.Connection) { }
    async create(guest: GuestModel): Promise<any> {
        const existingGuest = await Guest.findOne({ email: guest.email });
        if (existingGuest) {
            throw ApiError.emailExist();
        }
        const guestData = new Guest(guest);
        const createdGuest = await guestData.save();
        // console.log(createdGuest);
        return createdGuest.toObject();
    }
    async delete(id: string): Promise<void> {
        await Guest.findByIdAndDelete(id);
    }

    async read(id: string): Promise<any | null> {
        const guest = await Guest.findById(id);
        return guest ? guest.toObject() : null; // Convert to plain JavaScript object before returning
    }
    async getAllguest(): Promise<any[]> {
        const guest = await Guest.find();
        return guest.map((guest) => guest.toObject()); // Convert to plain JavaScript objects before returning
      }
    async update(id: string, guest: GuestModel): Promise<any> {
        const updatedGuest = await Guest.findByIdAndUpdate(id, guest, {
          new: true,
        }); // No need for conversion here
        return updatedGuest ? updatedGuest.toObject() : null; // Convert to plain JavaScript object before returning
      }
}