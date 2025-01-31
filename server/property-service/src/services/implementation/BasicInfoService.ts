import { NotFoundError } from "@be-my-guest/common";
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
            
            console.log("console nu munne------------------------------------------------------------>");
            const response = await this.basicInfoRepository.saveBasicInfo(data);
            console.log("response from basicInfo service----------------------------------------->",response);
            if (!response) throw new NotFoundError("Failed to save basic info");
            return response;

        } catch (error) {
            console.error("Error in add basic info service:", error);
            throw error;
        }
    }

}
