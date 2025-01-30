import { IBasicInfoAttrs, IBasicInfoDoc } from "../../models/interface/IBasicInfoModel";
import { IPropertyRepository } from "../../repositories/interface/IPropertyRepository";
import { IPropertyService } from "../interface/IPropertyService";


export class PropertyService implements IPropertyService {
    private propertyRepository: IPropertyRepository;

    constructor(propertyRepository: IPropertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    async addBasicInfo(data: IBasicInfoAttrs): Promise<IBasicInfoDoc> {
        const newProperty = await this.propertyRepository.create(data as IBasicInfoDoc);
        return newProperty;
    }

}
