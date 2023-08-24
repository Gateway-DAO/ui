import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import { MintedChain } from '@/components/features/protocol/credentials/view/components/mint-nft-card';
import { DialogStatuses } from '@/components/organisms/mint/mint-modal/mint-dialog-protocol';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import {
  Protocol_Api_Chain,
  Protocol_Api_Credential,
  Protocol_Mint_CredentialMutationVariables,
} from '@/services/hasura/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

type Props = {
  protocolCredentialId: string;
  protocolCredential?: PartialDeep<Protocol_Api_Credential>;
};

export function useMintData({
  protocolCredentialId,
  protocolCredential,
}: Props) {
  const { me, hasuraUserService } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const router = useRouter();
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);

  const changeChainName = (chain): Protocol_Api_Chain => {
    if (chain === 'ethereum') return Protocol_Api_Chain.Evm;
    return chain;
  };

  const mountMintData = (
    credentialData: PartialDeep<Protocol_Api_Credential>
  ): MintedChain[] | null => {
    if (credentialData?.nft && credentialData?.nft?.minted) {
      return [
        {
          chain: changeChainName(
            credentialData?.nft?.chain
          ) as Protocol_Api_Chain,
          transaction: credentialData?.nft?.txHash,
        },
      ];
    }
    return null;
  };

  const credentialQuery = useQuery(
    [query.protocol_credential, protocolCredentialId],
    () =>
      hasuraUserService.protocol_credential({
        id: protocolCredentialId,
      }),
    {
      enabled: !!protocolCredentialId && !protocolCredential,
      select: ({ protocol }) =>
        protocol?.credential as PartialDeep<Protocol_Api_Credential>,
    }
  );

  const credential = useMemo(
    () => protocolCredential ?? credentialQuery?.data,
    [protocolCredential, credentialQuery?.data]
  );

  const [mintData, setMintData] = useState(mountMintData(credential));
  const [shareStatus, setShareStatus] = useState<DialogStatuses>(null);
  const isAllowedToMint = useMemo(() => credential?.nft !== null, [credential]);
  const isReceivedCredential = useMemo(
    () =>
      me && me?.wallet === credential?.recipientUser?.primaryWallet?.address,
    [credential?.recipientUser?.primaryWallet?.address, me]
  );

  useEffect(() => {
    setMintData(mountMintData(credential));
  }, [credential]);

  const mintCredential = useMutation(
    [query.mintCredential],
    (data: Protocol_Mint_CredentialMutationVariables) => {
      return hasuraUserService.protocol_mint_credential(data);
    },
    {
      onMutate: () => {
        setIsMinting(true);
      },
      onSuccess: (data) => {
        setIsMinting(false);
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
    isMinting,
    changeChainName,
    credential,
  };
}
