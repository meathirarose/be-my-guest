import { Model, Document, FilterQuery } from "mongoose";

export class BaseRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const newDocument = new this.model(data);
    return await newDocument.save();
  }

  // Find a document by a query 
  async findOne(query: FilterQuery<T>): Promise<T | null> {
    return await this.model.findOne(query);
  }

  // Find document by ID
  async findById(id: string): Promise<T | null> {
      return await this.model.findById(id);
  }

  // Find document by ID and update
  async findByIdAndUpdate(id: string, updateData: Partial<T>): Promise<T | null> {
      return await this.model.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Find all documents
  async findAll(filter: FilterQuery<T> = {}): Promise<T[]> {
      return await this.model.find(filter);
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
