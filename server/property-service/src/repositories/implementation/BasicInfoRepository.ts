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

    async findAny(): Promise<IBasicInfoDoc | null> {
        return await this.findOne({});
    }    

    async findByEmail(email: string): Promise<IBasicInfoDoc | null> {
        return this.findOne({ contactEmail: email }); 
    }

    async findByPropertyName(name: string): Promise<IBasicInfoDoc | null> {
        const query: FilterQuery<IBasicInfoDoc> = { propertyName: name };
        return await this.findOne(query);
    }

    async findByCriteria(criteria: Partial<IBasicInfoDoc>): Promise<IBasicInfoDoc | null> {
        return await this.model.findOne(criteria as FilterQuery<IBasicInfoDoc>);
      }
}