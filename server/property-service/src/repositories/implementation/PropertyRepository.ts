import { BasicInfo } from "../../models/implementation/BasicInfoModel";
import { IBasicInfoDoc } from "../../models/interface/IBasicInfoModel";
import { IPropertyRepository } from "../interface/IPropertyRepository";
import { BaseRepository } from "./BaseRepository";

export class PropertyRepository extends BaseRepository<IBasicInfoDoc> implements IPropertyRepository {
  constructor() {
    super(BasicInfo);
  }

  async findByPropertyName(name: string): Promise<IBasicInfoDoc | null> {
    return await this.model.findOne({ propertyName: name });
  }
}
