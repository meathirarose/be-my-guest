import { Document, Model } from "mongoose";
import { IBaseRepository } from "../interfaces/IBaseRepository";

export class BaseRepository <T extends Document> implements IBaseRepository<T> {
    private model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    // Create a new document
    async create(item: T): Promise<T> {
        const newItem = new this.model(item);
        return await newItem.save();
    }

    // Find document by ID
    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    // Get all documents
    async findAll(): Promise<T[]> {
        return await this.model.find();
    }

    // Update document by ID
    async update(id: string, item: Partial<T>): Promise<T | null> {
        return await this.model.findByIdAndUpdate(id, item, { new: true });
    }

    // Delete document by ID
    async delete(id: string): Promise<boolean> {
        const result = await this.model.findByIdAndDelete(id);
        return result !== null;
    }
        
}