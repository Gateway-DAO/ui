import AWS from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  region: process.env.SQS_REGION,
  accessKeyId: process.env.SQS_ACCESS_KEY_ID,
  secretAccessKey: process.env.SQS_SECRET_ACCESS_KEY,
});

const sqs = new AWS.SQS({ apiVersion: '2012-11-05' });

export const emitMessage = async (queueUrl: string, body: string) => {
  try {
    const params = {
      MessageBody: body,
      QueueUrl: queueUrl,
    };

    sqs.sendMessage(params, function (err, data) {
      if (err) {
        console.log('Error', err);
      } else {
        console.log('Success', data.MessageId);
      }
    });
  } catch (error) {
    console.error(error);
  }
};
