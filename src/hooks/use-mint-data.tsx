import { useMemo, useState } from 'react';

import { DialogStatuses } from '@/components/molecules/mint-dialog-protocol';
import { MintedChain } from '@/components/templates/protocol/credentials/show/components/mint-nft-card';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import {
  Protocol_Api_Credential,
  Protocol_Api_Chain,
  Protocol_Mint_CredentialMutationVariables,
} from '@/services/hasura/types';
import { Scalars } from '@/services/hasura/types';
import { queryClient } from '@/services/query-client';
import { useMutation } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

type Props = {
  credential: PartialDeep<Protocol_Api_Credential>;
  loyaltyProgramId?: Scalars['uuid'];
  gateId?: Scalars['uuid'];
};

export function useMintData({ credential, loyaltyProgramId, gateId }: Props) {
  const { me, gqlAuthMethods } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);
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
    ({ credentialId }: Protocol_Mint_CredentialMutationVariables) => {
      return gqlAuthMethods.protocol_mint_credential({
        credentialId: credentialId,
      });
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
        queryClient.refetchQueries([
          query.protocol_credential_by_gate_id,
          {
            user_id: me?.id,
            gate_id: gateId,
          },
        ]);
        if (loyaltyProgramId) {
          queryClient.refetchQueries([
            query.protocol_credential_by_loyalty_id,
            {
              user_id: me?.id,
              loyalty_id: loyaltyProgramId,
            },
          ]);
        }
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
