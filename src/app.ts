import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda/trigger/api-gateway-proxy";
import { smsController } from './controllers/smsController';

export const sendSms = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
