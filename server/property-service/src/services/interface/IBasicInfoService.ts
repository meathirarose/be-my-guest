import { IBasicInfoDoc } from "../../models/interface/IBasicInfoModel";

export interface IBasicInfoService {
    addBasicInfo(data: IBasicInfoDoc): Promise<IBasicInfoDoc | null>;
    findByCriteria(criteria: Partial<IBasicInfoDoc>): Promise<IBasicInfoDoc | null>;
}
