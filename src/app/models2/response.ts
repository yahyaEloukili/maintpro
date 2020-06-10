export interface IResponse<T> {
    success: boolean;
    total: number;
    count: number;
    pagination: any;
    data: T[];
}
