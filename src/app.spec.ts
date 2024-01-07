import { sendSms } from './app';
import { smsController } from './controllers/smsController';

jest.mock('../src/controllers/smsController');

describe('app', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should handle HTTP POST request and send SMS', async () => {
    const mockSmsController = smsController as jest.Mocked<typeof smsController>;
    const mockSendSms = mockSmsController.sendSms.mockResolvedValueOnce('SMS request sent successfully');

    const mockEvent = {
      body: JSON.stringify({ phoneNumber: '+1234567890', message: 'Hello, World!' }),
    };

    const result = await sendSms(mockEvent as any);

    expect(mockSmsController.sendSms).toHaveBeenCalledWith('+1234567890', 'Hello, World!');
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe(JSON.stringify('SMS request sent successfully'));
  });

  it('should handle errors when sending SMS', async () => {
    const mockSmsController = smsController as jest.Mocked<typeof smsController>;
    const mockSendSms = mockSmsController.sendSms.mockRejectedValueOnce(new Error('Failed to send SMS'));

    const mockEvent = {
      body: JSON.stringify({ phoneNumber: '+1234567890', message: 'Hello, World!' }),
    };

    const result = await sendSms(mockEvent as any);

    expect(mockSmsController.sendSms).toHaveBeenCalledWith('+1234567890', 'Hello, World!');
    expect(result.statusCode).toBe(500);
    expect(result.body).toBe(JSON.stringify({ error: 'Failed to send SMS' }));
  });
});
