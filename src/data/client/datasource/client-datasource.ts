import mongoose from "mongoose";
import { ClientModel } from "@domain/client/entities/client_entities"; // Import the ClientModel
import { Client } from "../models/client_model"; 
import ApiError from "@presentation/error-handling/api-error";

// Create ClientDataSource Interface
export interface ClientDataSource {
    create(client: ClientModel): Promise<any>;
    update(id: String, client: ClientModel): Promise<any>;
    delete(id: string): Promise<void>;
    read(id: string): Promise<any | null>;
    getAllClients(): Promise<any[]>;
}

// Client Data Source communicates with the database
export class ClientDataSourceImpl implements ClientDataSource {
    constructor(private db: mongoose.Connection) { }
    async create(client: ClientModel): Promise<any> {
        const existingClient = await Client.findOne({ email: client.email });
        if (existingClient) {
            throw ApiError.emailExist();
        }
        const clientData = new Client(client);
        const createdClient = await clientData.save();
        return createdClient.toObject();
    }
    async delete(id: string): Promise<void> {
        await Client.findByIdAndDelete(id);
    }

    async read(id: string): Promise<any | null> {
        const client = await Client.findById(id);
        return client ? client.toObject() : null; // Convert to a plain JavaScript object before returning
    }
    async getAllClients(): Promise<any[]> {
        const clients = await Client.find();
        return clients.map((client) => client.toObject()); // Convert to plain JavaScript objects before returning
    }
    async update(id: string, client: ClientModel): Promise<any> {
        const updatedClient = await Client.findByIdAndUpdate(id, client, {
            new: true,
        }); // No need for conversion here
        return updatedClient ? updatedClient.toObject() : null; // Convert to a plain JavaScript object before returning
    }
}
