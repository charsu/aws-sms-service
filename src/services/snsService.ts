import { SNS } from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';
import { IService, ISmsPayload } from '../models';

export const snsService: IService = {
    publishMessage: async ({ message, phoneNumber }: ISmsPayload): Promise<void> => {
        const sns = new SNS();

        const params = {
            Message: message,
            PhoneNumber: phoneNumber,
        } as PublishInput;
        await sns.publish(params).promise();
    },
};
