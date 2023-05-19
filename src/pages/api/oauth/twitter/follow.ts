import Twitter from 'twitter-lite';

const KEYS = {
  consumer_key: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { accTkn, accTknSecret, source_id, target_screen_name } = JSON.parse(
    req.body
  );

  const client = new Twitter({
    subdomain: 'api',
    version: '1.1',
    consumer_key: KEYS.consumer_key,
    consumer_secret: KEYS.consumer_secret,
    access_token_key: accTkn,
    access_token_secret: accTknSecret,
  });

  try {
    const response = await client.get('friendships/show', {
      source_id,
      target_screen_name,
    });

    if (
      response.relationship.source.following &&
      response.relationship.target.followed_by
    ) {
      return res.status(200).json({ twitter_follow: true });
    }
    return res.status(200).json({ twitter_follow: false });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
