import { SNS } from 'aws-sdk';

export const snsService = {
    publishMessage: async (phoneNumber: string, message: string): Promise<void> => {
        const sns = new SNS();
        const params = {
            Message: message,
            PhoneNumber: phoneNumber,
        };
        await sns.publish(params).promise();
    },
};
