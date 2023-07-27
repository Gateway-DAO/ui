import { getExplorerAPI, getExplorerAPIKey } from '@/utils/web3';

export default async function handler(req, res) {
  try {
    const { chain, contract_address } = req.query;

    const apiURL = getExplorerAPI(parseInt(chain));
    const apiKey = getExplorerAPIKey(parseInt(chain));

    const response = await fetch(
      `${apiURL}?module=contract&action=getabi&address=${contract_address}&apikey=${apiKey}`,
      {
        method: 'GET',
      }
    );

    const data = await response.json();

    res.status(200).json({ ABI: data.result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}
