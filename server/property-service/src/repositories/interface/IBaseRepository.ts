import { FilterQuery, UpdateQuery } from 'mongoose';

export interface IBaseRepository<T> {
    save(item: Partial<T>): Promise<T>;
    findOne(query: FilterQuery<T>): Promise<T | null>;
    findById(id: string): Promise<T | null>;
    findAll(filter?: FilterQuery<T>): Promise<T[]>;
    update(filter: FilterQuery<T>, item: UpdateQuery<T>): Promise<T | null>;
    delete(id: string): Promise<T | null>;
}
