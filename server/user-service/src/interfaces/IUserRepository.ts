export interface IUserRepository {
    saveUser(name: string, email: string, password: string): Promise<void>;
}