import { smsController } from './smsController';
import { snsService } from '../services/snsService';

jest.mock('../services/snsService');


describe('smsController', () => {
    afterEach(() => {
        jest.resetAllMocks();
    });

    it('should send SMS successfully', async () => {
        const phoneNumber = '+1234567890';
        const message = 'Hello, World!';

        // Mock the implementation of publishMessage in snsService
        (snsService.publishMessage as jest.Mock).mockResolvedValueOnce("");

        const result = await smsController.sendSms(phoneNumber, message);

        expect(snsService.publishMessage).toHaveBeenCalledWith(phoneNumber, message);
        expect(result).toBe('SMS request sent successfully');
    });

    it('should handle errors when sending SMS', async () => {
        const phoneNumber = '+1234567890';
        const message = 'Hello, World!';

        // Mock the implementation of publishMessage in snsService to throw an error
        (snsService.publishMessage as jest.Mock).mockRejectedValueOnce(new Error('Failed to send SMS'));

        await expect(smsController.sendSms(phoneNumber, message)).rejects.toThrow('Failed to send SMS');

        expect(snsService.publishMessage).toHaveBeenCalledWith(phoneNumber, message);
    });
});
