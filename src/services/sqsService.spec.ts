import { SQS } from 'aws-sdk';
import { sqsService } from './sqsService';
import { IService, ISmsPayload } from '../models';

// Mocking the SQS class
const mockSendMessage = jest.fn().mockImplementation(() => ({
    promise: jest.fn(),
}));
jest.mock('aws-sdk', () => {
    return {
        SQS: jest.fn(() => ({
            sendMessage: mockSendMessage,
        })),
    };
});

describe('sqsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.SQS_QUEUE_URL = 'mocked-sqs-queue-url';
    });

    it('should publish an SMS message to SQS successfully', async () => {
        const mockPhoneNumber = '+1234567890';
        const mockMessage = 'Hello, world!';

        const smsPayload: ISmsPayload = {
            phoneNumber: mockPhoneNumber,
            message: mockMessage,
        };

        const result = await sqsService.publishMessage(smsPayload);

        // Verify that the SQS.sendMessage method was called with the correct parameters
        const expectedParams = {
            QueueUrl: 'mocked-sqs-queue-url',
            MessageBody: JSON.stringify(smsPayload),
        };
        expect(mockSendMessage).toHaveBeenCalledWith(expectedParams);

        // Verify that the SQS.sendMessage method was called once
        expect(mockSendMessage).toHaveBeenCalledTimes(1);

        // Verify the result for a successful operation
        expect(result).toEqual({ statusCode: 200, body: 'Message sent to SQS queue successfully!' });
    });

    it('should handle an error during SQS sendMessage', async () => {
        const mockPhoneNumber = '+1234567890';
        const mockMessage = 'Hello, world!';

        const smsPayload: ISmsPayload = {
            phoneNumber: mockPhoneNumber,
            message: mockMessage,
        };

        // Simulate an error during SQS sendMessage
        mockSendMessage.mockImplementationOnce(() => { throw new Error('Mocked SQS publish error') });

        const result = await sqsService.publishMessage(smsPayload);

        // Verify that the SQS.sendMessage method was called with the correct parameters
        const expectedParams = {
            QueueUrl: 'mocked-sqs-queue-url',
            MessageBody: JSON.stringify(smsPayload),
        };
        expect(mockSendMessage).toHaveBeenCalledWith(expectedParams);

        // Verify that the SQS.sendMessage method was called once
        expect(mockSendMessage).toHaveBeenCalledTimes(1);

        // Verify the result for an error scenario
        expect(result).toEqual({ statusCode: 500, body: 'Error sending message to SQS queue.' });
    });

    it('should handle missing SQS_QUEUE_URL environment variable', async () => {
        // Clear the SQS_QUEUE_URL environment variable
        delete process.env.SQS_QUEUE_URL;

        const mockPhoneNumber = '+1234567890';
        const mockMessage = 'Hello, world!';

        const smsPayload: ISmsPayload = {
            phoneNumber: mockPhoneNumber,
            message: mockMessage,
        };

        const result = await sqsService.publishMessage(smsPayload);

        // Verify that the SQS.sendMessage method was not called
        expect(mockSendMessage).not.toHaveBeenCalled();

        // Verify the result for the missing environment variable scenario
        expect(result).toEqual({ statusCode: 500, body: 'SQS_QUEUE_URL not defined.' });
    });
});
