import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtPayloadInput } from '../interfaces/IJwtPayloadInput';
import dotenv from 'dotenv';
dotenv.config();

export class AuthService {
    static generateToken(user: JwtPayloadInput): string {
        return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.ACCESS_SECRET!, {
            expiresIn: process.env.ACCESS_EXPIRATION!
        });
    }

    static generateRefreshToken(user: JwtPayloadInput): string {
        return jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.REFRESH_SECRET!, {
            expiresIn: process.env.REFRESH_EXPIRATION!
        })
    }

    static verifyToken(token: string): JwtPayload | null {
        try {
            const decoded = jwt.verify(token, process.env.ACCESS_SECRET!);
            return decoded as JwtPayload;
        } catch (error) {
            console.log(error)
            return null;
        }
    }

    static verifyRefreshToken(token: string): JwtPayload | null {
        try {
            const decoded = jwt.verify(token, process.env.REFRESH_SECRET!);
            return decoded as JwtPayload;
        } catch (error) {
            console.log(error)
            return null;
        }
    }
}