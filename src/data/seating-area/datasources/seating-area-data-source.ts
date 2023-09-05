import mongoose from "mongoose";
import ApiError from "@presentation/error-handling/api-error";
import { SeatingAreaModel } from "@domain/seating-area/entities/seatingArea";
import { SeatingArea } from "../models/seatingArea-model";

export interface SeatingAreaDataSource {
  create(seatingArea: SeatingAreaModel): Promise<any>;
  getById(id: string): Promise<any | null>;
  getAllSeatingAreas(): Promise<any[]>;
  update(id: string, seatingArea: SeatingAreaModel): Promise<any>;
  delete(id: string): Promise<void>;
}

export class SeatingAreaDataSourceImpl implements SeatingAreaDataSource {
  constructor(private db: mongoose.Connection) {}

  async create(seatingArea: SeatingAreaModel): Promise<any> {
    console.log("=====>s1", "dataSource", seatingArea.seatingAreaName);
    const existingSeatingArea = await SeatingArea.findOne({
      seatingAreaName: seatingArea.seatingAreaName,
    });

    console.log("=====>s2", "dataSource", existingSeatingArea);
    if (existingSeatingArea) {
      throw ApiError.emailExist();
    }

    const seatingAreaData = new SeatingArea(seatingArea);
    console.log("=====>s3", "dataSource", seatingAreaData);
    const createdSeatingArea = await seatingAreaData.save();

    console.log("=====>s4", "dataSource", createdSeatingArea);
    return createdSeatingArea.toObject();
  }

  async getById(id: string): Promise<any | null> {
    const seatingArea = await SeatingArea.findById(id);
    return seatingArea ? seatingArea.toObject() : null;
  }

  async getAllSeatingAreas(): Promise<any[]> {
    const seatingAreas = await SeatingArea.find();
    return seatingAreas.map((seatingArea) => seatingArea.toObject());
  }

  async update(id: string, seatingArea: SeatingAreaModel): Promise<any> {
    const updatedSeatingArea = await SeatingArea.findByIdAndUpdate(
      id,
      seatingArea,
      {
        new: true,
      }
    );
    return updatedSeatingArea ? updatedSeatingArea.toObject() : null;
  }

  async delete(id: string): Promise<void> {
    await SeatingArea.findByIdAndDelete(id);
  }
}
