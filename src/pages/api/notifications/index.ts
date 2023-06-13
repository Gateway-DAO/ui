import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL, {
  maxLoadingRetryTime: process.env.NODE_ENV !== 'production' ? 50 : undefined,
});

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
