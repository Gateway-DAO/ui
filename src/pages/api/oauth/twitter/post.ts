import Twitter from 'twitter-lite';

const KEYS = {
  consumer_key: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET,
};

function replaceTCOLinks(tweetText, urls) {
  let updatedText = tweetText;
  urls.forEach((url) => {
    updatedText = updatedText.replace(url.url, url.expanded_url);
  });

  return updatedText;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' });
    return;
  }

  const { accTkn, accTknSecret, tweet_text, source_id } = JSON.parse(req.body);

  const client = new Twitter({
    subdomain: 'api',
    version: '1.1',
    consumer_key: KEYS.consumer_key,
    consumer_secret: KEYS.consumer_secret,
    access_token_key: accTkn,
    access_token_secret: accTknSecret,
  });

  try {
    const response = await client.get('statuses/user_timeline', {
      exclude_replies: false,
      user_id: source_id,
      include_rts: false,
      tweet_mode: 'extended',
    });

    let tweet_posted = false;
    if (response && response.length) {
      response.find((tweet) => {
        const text: string = tweet.full_text;
        const urls = tweet.entities.urls;

        const expandedText = replaceTCOLinks(text, urls);

        if (expandedText == tweet_text) {
          tweet_posted = true;
        }
      });
    }
    return res.status(200).json({ tweet_posted });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}
