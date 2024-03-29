import { sqsService } from '../services/sqsService';

export const smsController = {
    sendSms: async (phoneNumber: string, message: string): Promise<string> => {
        try {
            // Send the request payload onto an SNS topic
            await sqsService.publishMessage({ phoneNumber, message });
            return 'SMS request sent successfully';
        } catch (error: any) {
            throw new Error(`Failed to send SMS: ${error.message}`);
        }
    },
};
