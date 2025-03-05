import { NextFunction, Request, Response } from "express";

export interface IPropertyController {
    listProperty(req: Request, res: Response, next: NextFunction): Promise<void>;
    fetchPropertiesByUser(req: Request, res: Response, next: NextFunction): Promise<void>;
    fetchProperties(req: Request, res: Response, next: NextFunction): Promise<void>;
    fetchProperty(req: Request, res: Response, next: NextFunction): Promise<void>;
    updateProperty(req: Request, res: Response, next: NextFunction): Promise<void>;
    blockProperty(req: Request, res: Response, next: NextFunction): Promise<void>;
    addToWishlist(req: Request, res: Response, next: NextFunction): Promise<void>;
    filterProperties(req: Request, res: Response, next: NextFunction): Promise<void>;
}