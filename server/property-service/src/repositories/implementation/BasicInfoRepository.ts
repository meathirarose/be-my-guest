import { Model, FilterQuery } from 'mongoose';
import { BaseRepository } from './BaseRepository';
import { IBasicInfoAttrs, IBasicInfoDoc } from '../../models/interface/IBasicInfoModel';
import { IBasicInfoRepository } from '../interface/IBasicInfoRepository';

export class BasicInfoRepository extends BaseRepository<IBasicInfoDoc> implements IBasicInfoRepository {
    private basicInfoModel: Model<IBasicInfoDoc>;

    constructor(basicInfoModel: Model<IBasicInfoDoc>) {
        super(basicInfoModel);
        this.basicInfoModel = basicInfoModel;
    }

    async saveBasicInfo(data: IBasicInfoAttrs): Promise<IBasicInfoDoc> {
        return await this.save(data);
    }

    async findByPropertyName(name: string): Promise<IBasicInfoDoc | null> {
        const query: FilterQuery<IBasicInfoDoc> = { propertyName: name };
        return await this.findOne(query);
    }
}