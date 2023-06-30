import { useState, useEffect } from 'react';

import { useCredential } from '@/hooks/use-credential';
import { useMintData } from '@/hooks/use-mint-data';
import { Credentials, Protocol_Api_Chain } from '@/services/hasura/types';
import { getExplorer, getSolanaExplorer } from '@/utils/web3';
import { PartialDeep } from 'type-fest';

import { SxProps } from '@mui/material';
import Card from '@mui/material/Card';

import { processScreen } from './process';

export enum Subjects {
  default = 'mint:default',
  start = 'mint:start',
  minting = 'mint:processing',
  sign = 'mint:sign-in',
  failed = 'mint:failed',
  successful = 'mint:successful',
  alreadyMinted = 'mint:already',
}

type MintCardProps = {
  tokenURI?: string;
  nftURL?: string;
  onMint?: () => void;
  credential: PartialDeep<Credentials>;
  sx?: SxProps;
};

export const MintCard = ({ credential, sx, ...props }: MintCardProps) => {
  const [mintProcessStatus, setMintProcessStatus] = useState<Subjects>(
    Subjects.default
  );
  const [error] = useState<any | null>(null);

  const isProtocol = !!credential.protocol_id;
  const { mintCredential: triggerMint, status } = useCredential(credential);
  const {
    mintCredential: mintProtocol,
    showMintButton,
    mintData,
    isMinting,
  } = useMintData({
    protocolCredentialId: credential.protocol_id,
  });

  const mint = () =>
    credential.protocol_id
      ? mintProtocol.mutate({ credentialId: credential.protocol_id })
      : triggerMint(credential);

  useEffect(() => {
    if (isProtocol) {
      mintData && setMintProcessStatus(Subjects.alreadyMinted);
      showMintButton && setMintProcessStatus(Subjects.default);
      isMinting && setMintProcessStatus(Subjects.minting);
    } else {
      (!status || status == 'idle') &&
        setMintProcessStatus(
          credential.status == 'minted'
            ? Subjects.alreadyMinted
            : Subjects.default
        );
      status == 'asking_signature' && setMintProcessStatus(Subjects.sign);
      status == 'minting' && setMintProcessStatus(Subjects.minting);
      if (status == 'minted') {
        setMintProcessStatus(Subjects.successful);
        setTimeout(() => {
          props.onMint && props.onMint();
          setMintProcessStatus(Subjects.alreadyMinted);
        }, 2500);
      }
      status == 'error' && setMintProcessStatus(Subjects.failed);
    }
  }, [status, credential, mintData, showMintButton, isMinting]);

  return (
    <Card
      sx={{
        width: '275px',
        height: '443px',
        display: 'flex',
        flexDirection: 'column',
        ...sx,
      }}
    >
      {processScreen(
        mintProcessStatus,
        setMintProcessStatus,
        mint,
        isProtocol,
        {
          error,
          credential,
          protocolMintData: mintData?.[0] && {
            chain: mintData?.[0].chain,
            transaction:
              mintData?.[0]?.chain === Protocol_Api_Chain.Evm
                ? getExplorer(
                    process.env.NEXT_PUBLIC_PROTOCOL_ENV === 'production'
                      ? 137
                      : 80001
                  ) +
                  '/tx/' +
                  mintData?.[0]?.transaction
                : getSolanaExplorer(
                    process.env.NEXT_PUBLIC_SOLANA_CLUSTER,
                    `/tx/${mintData?.[0]?.transaction}`
                  ),
          },
        }
      )}
    </Card>
  );
};

export default MintCard;
