export interface ISmsPayload {
    phoneNumber: string;
    message: string;
}

export interface IService {
    publishMessage(payload: ISmsPayload): Promise<any>;
}