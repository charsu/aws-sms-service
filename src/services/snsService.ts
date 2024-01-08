import { SNS } from 'aws-sdk';
import { PublishInput } from 'aws-sdk/clients/sns';

export const snsService = {
    publishMessage: async (phoneNumber: string, message: string): Promise<void> => {
        const sns = new SNS();

        const params = {
            Message: message,
            PhoneNumber: phoneNumber,
        } as PublishInput;
        await sns.publish(params).promise();
    },
};
