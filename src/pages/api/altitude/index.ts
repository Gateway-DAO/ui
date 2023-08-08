import altitude from './altitude.json';

type Cred = {
  _id: string;
  USER_ADDRESS: string;
  USER_TOTAL_TRANSACTIONS: number;
};

export default async function handler(req, res) {
  const { wallet } = req.query;

  const creds = altitude as Cred[];
  const tx = creds.find((cred) => cred.USER_ADDRESS === wallet.toLowerCase());

  if (tx) {
    res.status(200).json({ tx });
  } else {
    res.status(200).json({
      USER_ADDRESS: wallet,
      USER_TOTAL_TRANSACTIONS: 0,
    });
  }
}
