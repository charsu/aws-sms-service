import { snsService } from './snsService';
import { PublishInput } from 'aws-sdk/clients/sns';
import { ISmsPayload } from '../models';

// Mocking the SNS class
const mockPublish = jest.fn(() => ({ promise: jest.fn() }));
jest.mock('aws-sdk', () => {
    return {
        SNS: jest.fn(() => ({
            publish: mockPublish,
        })),
    };
});


describe('snsService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockPhoneNumber = '+1234567890';
    const mockMessage = 'Hello, world!';

    const smsPayload: ISmsPayload = {
        phoneNumber: mockPhoneNumber,
        message: mockMessage,
    };

    it('should publish an SMS message to SNS', async () => {
        await snsService.publishMessage(smsPayload);

        // Verify that the SNS.publish method was called with the correct parameters
        const expectedParams: PublishInput = {
            Message: mockMessage,
            PhoneNumber: mockPhoneNumber,
        };
        expect(mockPublish).toHaveBeenCalledWith(expectedParams);

        // Verify that the SNS.publish method was called once
        expect(mockPublish).toHaveBeenCalledTimes(1);
    });

    it('should handle an error during SNS publish', async () => {
        mockPublish.mockImplementationOnce(() => { throw new Error('Mocked SNS publish error') });

        await expect(snsService.publishMessage(smsPayload)).rejects.toThrowError('Mocked SNS publish error');

        // Verify that the SNS.publish method was called with the correct parameters
        const expectedParams: PublishInput = {
            Message: mockMessage,
            PhoneNumber: mockPhoneNumber,
        };
        expect(mockPublish).toHaveBeenCalledWith(expectedParams);

        // Verify that the SNS.publish method was called once
        expect(mockPublish).toHaveBeenCalledTimes(1);
    });
});