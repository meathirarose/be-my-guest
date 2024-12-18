
export interface IUserService {
    registerUser(name: string, email: string, password: string, country: string): Promise<void>;
}