import { smsController } from '../controllers/smsController';

type IEvent = {
    body: string;
};

export const handler = async (event: IEvent): Promise<any> => {
    try {
        const body = JSON.parse(event.body || '{}');
        const result = await smsController.sendSms(body.phoneNumber, body.message);
        return {
            statusCode: 200,
            body: JSON.stringify(result),
        };
    } catch (error: any) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message }),
        };
    }
};