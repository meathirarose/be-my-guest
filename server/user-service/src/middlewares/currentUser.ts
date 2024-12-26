import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface UserPayload {
    id: string,
    email: string
}

declare global {
    namespace Express {
        interface Request {
            currentUser?: UserPayload;
        }
    }
}

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accessToken;

    if(!token){
        return next();
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
        req.currentUser = payload;

    } catch (error) {
        console.log("JWT verification failed", error);
    }

    next();
}
