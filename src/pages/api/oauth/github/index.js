export default async function handler(req, res) {
  const response = await fetch(`https://github.com/login/oauth/access_token`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: req.body.client_id,
      client_secret: req.body.client_secret,
      code: req.body.code,
    }),
  });

  const data = await response.json();
  const token = data?.access_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  res.status(200).json({ token });
}
