import { Model, Document } from "mongoose";

export class BaseRepository<T extends Document> {
  private model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const newDocument = new this.model(data);
    return await newDocument.save();
  }

  async findAllProperties(): Promise<T[] | null> {
    return await this.model.find().exec(); 
  }
}
