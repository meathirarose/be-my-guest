export interface IUserRepository {
    saveUser(name: string, email: string, password: string, country: string): Promise<void>;
}