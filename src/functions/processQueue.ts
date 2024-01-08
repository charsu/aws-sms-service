import { snsService } from '../services/snsService';
import { ISmsPayload } from '../models';

type IEvent = {
  Records: {
    body: string;
  }[];
};


export const handler = async (event: IEvent) => {
  try {
    for (const record of event.Records) {
      const { body } = record;

      // Assuming Message contains information needed to send SMS
      const smsInfo = JSON.parse(body) as ISmsPayload;

      // Implement your logic to send SMS using sns.publish
      await snsService.publishMessage(smsInfo);

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
