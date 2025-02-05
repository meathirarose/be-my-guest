import { FilterQuery } from "mongoose";

export interface IBaseRepository<T> {
    save(item: T): Promise<T>;
    findById(id: string): Promise<T | null>;
    findAll(): Promise<T[]>;
    findOne(query: FilterQuery<T>): Promise<T | null>;  
    update(query: FilterQuery<T>, item: Partial<T>): Promise<T | null>;  
    delete(id: string): Promise<T | null>;  
    findByIdAndUpdate(id: string, updateData: Partial<T>): Promise<T | null>;
}
