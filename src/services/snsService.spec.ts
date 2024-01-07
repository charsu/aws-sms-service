import { snsService } from './snsService';
import { SNS } from 'aws-sdk';

jest.mock('aws-sdk');

xdescribe('snsService', () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should publish a message to SNS successfully', async () => {
        const mockPublishPromise = jest.fn().mockResolvedValueOnce({ MessageId: 'mockedMessageId' });
        const mockPublish = jest.fn().mockImplementationOnce(async() => (mockPublishPromise));
        (SNS.prototype.publish as jest.Mock).mockImplementationOnce(mockPublish);

        const phoneNumber = '+1234567890';
        const message = 'Hello, World!';

        await snsService.publishMessage(phoneNumber, message);

        expect(SNS.prototype.publish).toHaveBeenCalledWith({
            Message: message,
            PhoneNumber: phoneNumber,
        });

        expect(mockPublishPromise).toHaveBeenCalled();
    });

    it('should handle errors when publishing a message to SNS', async () => {
        const mockPublishPromise = jest.fn().mockRejectedValueOnce(new Error('Failed to publish message'));
        const mockPublish = jest.fn().mockImplementationOnce(() => ({ promise: mockPublishPromise }));
        (SNS.prototype.publish as jest.Mock).mockImplementationOnce(mockPublish);

        const phoneNumber = '+1234567890';
        const message = 'Hello, World!';

        await expect(snsService.publishMessage(phoneNumber, message)).rejects.toThrow('Failed to publish message');

        expect(SNS.prototype.publish).toHaveBeenCalledWith({
            Message: message,
            PhoneNumber: phoneNumber,
        });

        expect(mockPublishPromise).toHaveBeenCalled();
    });
});
