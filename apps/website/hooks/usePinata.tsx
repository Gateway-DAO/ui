const PINATA = {
  key: process.env.NEXT_PUBLIC_PINATA_KEY,
  secret: process.env.NEXT_PUBLIC_PINATA_SECRET,
};

/**
 * It returns an object with two functions that upload files and metadata to IPFS
 * @returns An object with two functions.
 */
export const usePinata = () => {
  /**
   * It takes a file and uploads it to IPFS
   * @param form - The form data that contains the file you want to upload.
   * @returns The IPFS hash of the file that was uploaded.
   */
  const uploadFileToIPFS = async (form) => {
    const res = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS/', {
      method: 'POST',
      body: form,
      headers: new Headers({
        pinata_api_key: PINATA.key,
        pinata_secret_api_key: PINATA.secret,
      }),
    });

    return (await res.json()).IpfsHash;
  };

  /**
   * It takes an object, converts it to JSON, and uploads it to IPFS
   * @param obj - The object you want to upload to IPFS.
   * @returns The IPFS hash of the metadata object.
   */
  const uploadMetadataToIPFS = async (obj: Record<string, any>) => {
    const res = await fetch('https://api.pinata.cloud/pinning/pinJSONToIPFS/', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: new Headers({
        pinata_api_key: PINATA.key,
        pinata_secret_api_key: PINATA.secret,
        'Content-Type': 'application/json',
      }),
    });

    const data = await res.json();

    return data.IpfsHash;
  };

  return { uploadFileToIPFS, uploadMetadataToIPFS };
};
