import jwt, { JwtPayload } from 'jsonwebtoken';
import { JwtPayloadInput } from '../interfaces/IJwtPayloadInput';

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;
const JWT_EXPIRATION = process.env.JWT_EXPIRATION!;
const REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION!;

export class AuthService {
    static generateToken(user: JwtPayloadInput): string {
        console.log('====================================');
        console.log("generate token");
        console.log('====================================');
        return jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
            expiresIn: JWT_EXPIRATION
        });
    }

    static generateRefreshToken(user: JwtPayloadInput): string {
        console.log('====================================');
        console.log("generate refresh token");
        console.log('====================================');
        return jwt.sign({ id: user.id, email: user.email, role: user.role }, REFRESH_SECRET, {
            expiresIn: REFRESH_EXPIRATION
        })
    }

    static verifyToken(token: string): JwtPayload | null {
        try {
            const decoded = jwt.verify(token, JWT_SECRET);
            console.log(decoded, "verify-token decoded --------------------------------------------------------");
            return decoded as JwtPayload;
        } catch (error) {
            return null;
        }
    }

    static verifyRefreshToken(token: string): JwtPayload | null {
        try {
            const decoded = jwt.verify(token, REFRESH_SECRET);
            console.log(decoded, "refresh-token decoded --------------------------------------------------------");
            return decoded as JwtPayload;
        } catch (error) {
            return null;
        }
    }
}