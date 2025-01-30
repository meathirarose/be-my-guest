import { IBasicInfoDoc } from "../../models/interface/IBasicInfoModel";
import { IBaseRepository } from "./IBaseRepository";


export interface IPropertyRepository extends IBaseRepository<IBasicInfoDoc> {
    findByPropertyName(name: string): Promise<IBasicInfoDoc | null>;
}
