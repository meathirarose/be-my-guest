import { IBasicInfoAttrs, IBasicInfoDoc } from "../../models/interface/IBasicInfoModel";

export interface IPropertyService {
    addBasicInfo(data: IBasicInfoAttrs): Promise<IBasicInfoDoc>;
}
