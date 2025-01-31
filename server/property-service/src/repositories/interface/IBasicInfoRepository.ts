import { IBasicInfoDoc } from "../../models/interface/IBasicInfoModel";
import { IBaseRepository } from "./IBaseRepository";


export interface IBasicInfoRepository extends IBaseRepository<IBasicInfoDoc> {
    findByPropertyName(name: string): Promise<IBasicInfoDoc | null>;
    findByEmail(email: string): Promise<IBasicInfoDoc | null>;
    findAny(): Promise<IBasicInfoDoc | null>;
    findByCriteria(criteria: Partial<IBasicInfoDoc>): Promise<IBasicInfoDoc | null>;
    saveBasicInfo(data: IBasicInfoDoc): Promise<IBasicInfoDoc | null>;
}
