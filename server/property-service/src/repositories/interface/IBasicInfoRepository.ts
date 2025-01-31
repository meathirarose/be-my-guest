import { IBasicInfoDoc } from "../../models/interface/IBasicInfoModel";
import { IBaseRepository } from "./IBaseRepository";


export interface IBasicInfoRepository extends IBaseRepository<IBasicInfoDoc> {
    findByPropertyName(name: string): Promise<IBasicInfoDoc | null>;
    saveBasicInfo(data: IBasicInfoDoc): Promise<IBasicInfoDoc | null>;
}
