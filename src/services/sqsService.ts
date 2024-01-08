import { SQS } from 'aws-sdk';

export const postMessage = async (phoneNumber: string, message: string): Promise<any> => {
    const sqs = new SQS();

    // Fetch SQS queue ARN from environment variable
    const sqsQueueUrl = process.env.SQS_QUEUE_URL;

    if (!sqsQueueUrl) {
        console.error('SQS_QUEUE_URL environment variable not defined.');
        return { statusCode: 500, body: 'SQS_QUEUE_URL not defined.' };
    }

    // setup payload
    const messageBody = JSON.stringify({ phoneNumber, message });
    const params: SQS.SendMessageRequest = {
        QueueUrl: sqsQueueUrl,
        MessageBody: messageBody,
    };

    try {
        await sqs.sendMessage(params).promise();
        console.log('Message sent to SQS queue.');
        return { statusCode: 200, body: 'Message sent to SQS queue successfully!' };
    } catch (error) {
        console.error('Error sending message to SQS queue:', error);
        return { statusCode: 500, body: 'Error sending message to SQS queue.' };
    }
};
