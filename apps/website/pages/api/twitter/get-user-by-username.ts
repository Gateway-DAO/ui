import { Client } from 'twitter-api-sdk';

const appClient = new Client(process.env.NEXT_PUBLIC_TWITTER_BEARER_TOKEN);

export default async function handler(req, res) {
  try {
    const user = await appClient.users.findUserByUsername(req.body.username, {
      'user.fields': [
        'description',
        'id',
        'location',
        'name',
        'profile_image_url',
        'protected',
        'public_metrics',
        'username',
        'verified',
      ],
    });

    if (user.data.protected) {
      return res.status(500).json({
        message: 'User is protected',
      });
    }

    return res.status(200).json(user.data);
  } catch (err) {
    return res.status(500).json({
      message: 'An error occurred',
      err,
    });
  }
}
