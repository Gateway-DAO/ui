import Twitter from 'twitter-lite';

const KEYS = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }
  const client = new Twitter({
    subdomain: 'api',
    version: '1.1',
    consumer_key: KEYS.consumer_key,
    consumer_secret: KEYS.consumer_secret,
    access_token_key: req.body.accTkn,
    access_token_secret: req.body.accTknSecret,
  });

  const { tweet_link } = JSON.parse(req.body);

  try {
    const response = await client.get('statuses/show', {
      id: tweet_link.split('/').at(-1),
    });

    if (response[0].retweeted) {
      return res.status(200).json({ twitter_retweet: true });
    }
    return res.status(200).json({ twitter_retweet: false });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
