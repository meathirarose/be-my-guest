import { Document, Model, FilterQuery, UpdateQuery } from "mongoose";
import { IBaseRepository } from "../interface/IBaseRepository";

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
    protected model: Model<T>;

    constructor(model: Model<T>) {
        this.model = model;
    }

    async save(item: Partial<T>): Promise<T> {
        const newItem = new this.model(item);
        return await newItem.save();
    }

    async findOne(query: FilterQuery<T>): Promise<T | null> {
        return await this.model.findOne(query);
    }

    async findById(id: string): Promise<T | null> {
        return await this.model.findById(id);
    }

    async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
        return await this.model.find(filter);
    }

    async update(filter: FilterQuery<T>, item: UpdateQuery<T>): Promise<T | null> {
        return await this.model.findOneAndUpdate(filter, item, { new: true });
    }

    async delete(id: string): Promise<T | null> {
        return await this.model.findByIdAndDelete(id);
    }
}