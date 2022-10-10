import Twitter from 'twitter-lite';

const KEYS = {
  consumer_key: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET,
};

const client = new Twitter({
  subdomain: 'api',
  version: '1.1',
  consumer_key: KEYS.consumer_key,
  consumer_secret: KEYS.consumer_secret,
  access_token_key: '',
  access_token_secret: '',
});

export default async function handler(req, res) {
  try {
    const response: any = await client.getRequestToken(
      `${
        process.env.NODE_ENV === 'development'
          ? 'http://twitter.local:4200'
          : `https://${req.headers.host}`
      }/oauth/twitter/following`
    );
    res.status(200).json({
      oauth_token: response.oauth_token,
      oauth_token_secret: response.oauth_token_secret,
      confirmed: response.oauth_callback_confirmed,
      callbackURL: `https://api.twitter.com/oauth/authenticate?oauth_token=${response?.oauth_token}`,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}
