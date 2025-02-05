
export interface IBaseRepository<T> {
    create(item: Partial<T>): Promise<T>;
    findAllProperties(): Promise<T[] | null>;
}
