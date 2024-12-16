
export interface IUserService {
    registerUser(name: string, email: string, password: string): Promise<void>;
}