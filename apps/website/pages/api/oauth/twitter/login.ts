import Twitter from 'twitter-lite';

const KEYS = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
};

const client = new Twitter({
  subdomain: 'api', // "api" is the default (change for other subdomains)
  version: '1.1',
  consumer_key: KEYS.consumer_key,
  consumer_secret: KEYS.consumer_secret,
  access_token_key: '',
  access_token_secret: '',
});

export default async function handler(_req, res) {
  try {
    const response: any = await client.getRequestToken(
      'http://twitter.local:4200/following'
    );
    res.status(200).json({
      oauth_token: response.oauth_token,
      oauth_token_secret: response.oauth_token_secret,
      confirmed: response.oauth_callback_confirmed,
      callbackURL: `https://api.twitter.com/oauth/authenticate?oauth_token=${response?.oauth_token}`,
    });
  } catch (error) {
    console.log(error);
  }
}
