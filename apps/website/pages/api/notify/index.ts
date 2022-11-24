import { emitMessage } from '../../../utils/sqs';

export default async function handler(req, res) {
  const { queueUrl, body } = req.body;

  try {
    emitMessage(queueUrl, JSON.stringify(body));
    res.status(200).json({ message: 'Message emitted.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
