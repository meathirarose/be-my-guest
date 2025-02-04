import { NextFunction, Response, Request } from "express";

export interface IMediaUploadController {
    mediaUpload(req: Request, res: Response, next: NextFunction): Promise<void>;
}