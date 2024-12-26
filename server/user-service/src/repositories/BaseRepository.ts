import { Document, Model, FilterQuery } from "mongoose";
import { IBaseRepository } from "../interfaces/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model; 
    }

    // Create a new document
    async save(item: T): Promise<T> {
        const newItem = new this.model(item);
        return await newItem.save();
    }

    // Find a document by a query 
    async findOne(query: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(query);
    }

    // Find document by ID
    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    // Find all documents
    async findAll(): Promise<T[]> {
        return await this.model.find();
    }

    // Update document by a filter query
    async update(
        filter: FilterQuery<T>,  
        item: Partial<T>          
    ): Promise<T | null> {
        return await this.model.findOneAndUpdate(filter, item, { new: true });
    }

    // Delete document by ID
    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }
}
