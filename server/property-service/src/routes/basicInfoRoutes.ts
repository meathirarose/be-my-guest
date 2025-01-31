import express from "express";
import { IBasicInfoRepository } from "../repositories/interface/IBasicInfoRepository";
import { BasicInfoRepository } from "../repositories/implementation/BasicInfoRepository";
import { BasicInfoService } from "../services/implementation/BasicInfoService";
import { IBasicInfoService } from "../services/interface/IBasicInfoService";
import { BasicInfoController } from "../controllers/implementation/BasicInfoController";
import { IBasicInfoController } from "../controllers/interface/IBasicInfoController";
import { BasicInfo } from "../models/implementation/BasicInfoModel";
import { validateRequest } from "@be-my-guest/common";
import { basicInfoValidationSchema } from "../validations/BasicInfo";

const router = express.Router();

const basicInfoRepository: IBasicInfoRepository = new BasicInfoRepository(BasicInfo);
const basicInfoService: IBasicInfoService = new BasicInfoService(basicInfoRepository);
const basicInfoController: IBasicInfoController = new BasicInfoController(basicInfoService);

router.post(
    "/add-basic-info",
    validateRequest(basicInfoValidationSchema),
    basicInfoController.basicInfo
);


export default router;
