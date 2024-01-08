import { smsController } from './smsController';
import { sqsService } from '../services/sqsService';

jest.mock('../services/sqsService');


describe('smsController', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    const payload = {
        message: 'Hello, World!',
        phoneNumber: '+1234567890',
    };

    it('should send SMS successfully', async () => {

        // Mock the implementation of publishMessage in snsService
        (sqsService.publishMessage as jest.Mock).mockResolvedValueOnce("");

        const result = await smsController.sendSms(payload.phoneNumber, payload.message);

        expect(sqsService.publishMessage).toHaveBeenCalledWith(payload);
        expect(result).toBe('SMS request sent successfully');
    });

    it('should handle errors when sending SMS', async () => {
        // Mock the implementation of publishMessage in snsService to throw an error
        (sqsService.publishMessage as jest.Mock).mockRejectedValueOnce(new Error('Failed to send SMS'));

        await expect(smsController.sendSms(payload.phoneNumber, payload.message)).rejects.toThrow('Failed to send SMS');

        expect(sqsService.publishMessage).toHaveBeenCalledWith(payload);
    });
});
