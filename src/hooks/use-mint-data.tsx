import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';

import { MintedChain } from '@/components/features/protocol/credentials/view/components/mint-nft-card';
import { DialogStatuses } from '@/components/organisms/mint/mint-modal/mint-dialog-protocol';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import {
  Protocol_Api_Chain,
  Protocol_Mint_CredentialMutationVariables,
} from '@/services/hasura/types';
import { useMutation, useQuery } from '@tanstack/react-query';

type Props = {
  protocolCredentialId: string;
};

export function useMintData({ protocolCredentialId }: Props) {
  const { me, hasuraUserService } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);

  const { data: credential } = useQuery(
    [query.protocol_credential, protocolCredentialId],
    () =>
      hasuraUserService.protocol_credential({
        id: protocolCredentialId,
      }),
    {
      enabled: !!protocolCredentialId,
      select: ({ protocol }) => protocol?.credential,
    }
  );

  const isAllowedToMint = useMemo(() => credential?.nft !== null, [credential]);
  const isReceivedCredential = useMemo(
    () =>
      me && me?.wallet === credential?.recipientUser?.primaryWallet?.address,
    [credential?.recipientUser?.primaryWallet?.address, me]
  );

  const changeChainName = (chain): Protocol_Api_Chain => {
    if (chain === 'ethereum') return Protocol_Api_Chain.Evm;
    return chain;
  };

  const initialMintData: MintedChain[] | null =
    credential?.nft && credential?.nft?.minted
      ? [
          {
            chain: changeChainName(credential.nft?.chain) as Protocol_Api_Chain,
            transaction: credential.nft?.txHash,
          },
        ]
      : null;

  const [shareStatus, setShareStatus] = useState<DialogStatuses>(null);
  const [mintData, setMintData] = useState(initialMintData);

  const mintCredential = useMutation(
    [query.mintCredential],
    (data: Protocol_Mint_CredentialMutationVariables) => {
      return hasuraUserService.protocol_mint_credential(data);
    },
    {
      onSuccess: (data) => {
        setIsOpen(true);
        setTimeout(() => {
          setShareStatus('share');
        }, 1000);
        setTimeout(() => {
          setIsOpen(false);
          setShareIsOpen(true);
        }, 3500);
        setMintData([
          {
            chain: credential?.recipientUser?.primaryWallet?.chain,
            transaction: data.protocol.mintCredential.txHash,
          },
        ]);
        router.replace(router.asPath);
      },
    }
  );

  const showMintButton = useMemo(
    () =>
      !credential?.nft?.minted &&
      isReceivedCredential &&
      isAllowedToMint &&
      !mintData,
    [credential?.nft, isAllowedToMint, isReceivedCredential, mintData]
  );

  return {
    isOpen,
    setIsOpen,
    shareIsOpen,
    setShareIsOpen,
    shareStatus,
    mintCredential,
    mintData,
    showMintButton,
    isReceivedCredential,
    isAllowedToMint,
  };
}
