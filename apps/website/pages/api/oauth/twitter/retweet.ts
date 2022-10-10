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

  const {
    accTkn,
    accTknSecret,
    tweet_link,
  }: {
    accTkn: string;
    accTknSecret: string;
    tweet_link: string;
  } = JSON.parse(req.body);

  console.log(JSON.parse(req.body));

  const client = new Twitter({
    subdomain: 'api',
    version: '1.1',
    consumer_key: KEYS.consumer_key,
    consumer_secret: KEYS.consumer_secret,
    access_token_key: accTkn,
    access_token_secret: accTknSecret,
  });

  try {
    const response = await client.get('statuses/lookup', {
      id: tweet_link.toString().split('/').at(-1),
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
