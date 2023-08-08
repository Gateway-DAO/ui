import altitude from './altitude.json';

type Cred = {
  _id: string;
  USER_ADDRESS: string;
  USER_TOTAL_TRANSACTIONS: number;
};

export default async function handler(req, res) {
  const { wallet } = req.query;

  try {
    const creds = altitude as Cred[];
    const tx = creds.find((cred) => cred.USER_ADDRESS === wallet.toLowerCase());

    res.status(200).json(tx);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
