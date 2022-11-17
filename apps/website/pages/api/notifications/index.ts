import Redis from 'ioredis';

let redis = new Redis(process.env.NEXT_PUBLIC_REDIS_URL);

export default async function handler(req, res) {
  const { userId } = req.query;

  try {
    const notifications = await redis.get(userId);

    res.status(200).json({ notifications: JSON.parse(notifications) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
