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

  const { accTkn, accTknSecret, tweet_text } = JSON.parse(req.body);

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
      text: tweet_text,
    });

    console.log('Testando', response);

    if (response[0].text.indexOf(req.body.tweet_content) > -1) {
      return res.status(200).json({ tweet_posted: true });
    }
    return res.status(200).json({ tweet_posted: false });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
