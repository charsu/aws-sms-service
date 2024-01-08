import AWS from 'aws-sdk';
import { snsService } from '../services/snsService';

export const handler = async (event: any) => {
  try {
    for (const record of event.Records) {
      const { body } = record;

      // Assuming Message contains information needed to send SMS
      const smsInfo = JSON.parse(body);

      // Implement your logic to send SMS using sns.publish
      await snsService.publishMessage(smsInfo.phoneNumber, smsInfo.message);

      console.log(`SMS sent to ${smsInfo.phoneNumber}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'SMS processing completed successfully' }),
    };
  } catch (error) {
    console.error('Error processing SQS messages:', error);

    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process SQS messages' }),
    };
  }
};
