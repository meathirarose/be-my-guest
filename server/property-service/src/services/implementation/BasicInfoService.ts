import { BadRequestError, NotFoundError } from "@be-my-guest/common";
import { IBasicInfoDoc } from "../../models/interface/IBasicInfoModel";
import { IBasicInfoRepository } from "../../repositories/interface/IBasicInfoRepository";
import { IBasicInfoService } from "../interface/IBasicInfoService";

export class BasicInfoService implements IBasicInfoService {
    private basicInfoRepository: IBasicInfoRepository;

    constructor(basicInfoRepository: IBasicInfoRepository) {
        this.basicInfoRepository = basicInfoRepository;
    }

    async addBasicInfo(data: IBasicInfoDoc): Promise<IBasicInfoDoc | null> {
        try {
            const existingInfo = await this.basicInfoRepository.findByCriteria({
                contactEmail: data.contactEmail,
                propertyName: data.propertyName
            });
            console.log("contain existing info?-------------------------------------->", existingInfo);

            if (existingInfo) {
                throw new BadRequestError("A record with the same contact email and property name already exists.");
            }
            
            const response = await this.basicInfoRepository.saveBasicInfo(data);
            console.log("get response?--------------------------------------------------------->", response);
            if (!response) throw new NotFoundError("Failed to save basic info");
            return response;

        } catch (error) {
            console.error("Error in add basic info service:", error);
            throw error;
        }
    }

    async findByCriteria(criteria: Partial<IBasicInfoDoc>): Promise<IBasicInfoDoc | null> {
        try {
            const result = await this.basicInfoRepository.findByCriteria(criteria);
            console.log("got any result?---------------------------------------------------------->",result)
            return result;
        } catch (error) {
            console.error("Error in find by criteria service:", error);
            throw error;
        }
    }
}