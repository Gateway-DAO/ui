import Twitter from 'twitter-lite';

const KEYS = {
  consumer_key: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET,
};

const client = new Twitter({
  subdomain: 'api', // "api" is the default (change for other subdomains)
  version: '1.1',
  consumer_key: KEYS.consumer_key,
  consumer_secret: KEYS.consumer_secret,
  access_token_key: '',
  access_token_secret: '',
});

export default async function handler(req, res) {
  try {
    const response = await client.getAccessToken({
      oauth_verifier: req.query.oauth_verifier,
      oauth_token: req.query.oauth_token,
    });
    res.status(200).json({
      accTkn: response.oauth_token,
      accTknSecret: response.oauth_token_secret,
      userId: response.user_id,
      screenName: response.screen_name,
    });
  } catch (error) {
    console.log(error);
  }
}
