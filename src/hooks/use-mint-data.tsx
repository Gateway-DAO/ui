import { useMemo, useState } from 'react';

import { MintedChain } from '@/components/features/protocol/credentials/show/components/mint-nft-card';
import { DialogStatuses } from '@/components/molecules/mint-dialog-protocol';
import { query } from '@/constants/queries';
import { useAuth } from '@/providers/auth';
import { gatewayProtocolAuthSDK } from '@/services/gateway-protocol/api';
import {
  Chain,
  Credential,
  MintCredentialMutationVariables,
} from '@/services/gateway-protocol/types';
import { Scalars } from '@/services/hasura/types';
import { queryClient } from '@/services/query-client';
import { useMutation } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest/source/partial-deep';

type Props = {
  credential: PartialDeep<Credential>;
  loyaltyProgramId?: Scalars['uuid'];
  gateId?: Scalars['uuid'];
};

export function useMintData({ credential, loyaltyProgramId, gateId }: Props) {
  const { me, token } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [shareIsOpen, setShareIsOpen] = useState<boolean>(false);
  const isAllowedToMint = useMemo(() => credential?.nft !== null, [credential]);
  const isReceivedCredential = useMemo(
    () =>
      me && me?.wallet === credential?.recipientUser?.primaryWallet?.address,
    [credential?.recipientUser?.primaryWallet?.address, me]
  );

  const changeChainName = (chain): Chain => {
    if (chain === 'ethereum') return Chain.Evm;
    return chain;
  };

  const initialMintData: MintedChain[] | null =
    credential?.nft && credential?.nft?.minted
      ? [
          {
            chain: changeChainName(credential.nft?.chain) as Chain,
            transaction: credential.nft?.txHash,
          },
        ]
      : null;

  const [shareStatus, setShareStatus] = useState<DialogStatuses>(null);
  const [mintData, setMintData] = useState(initialMintData);

  const mintCredential = useMutation(
    [query.mintCredential],
    ({ credentialId }: MintCredentialMutationVariables) => {
      return gatewayProtocolAuthSDK(token).mintCredential({
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
            transaction: data.mintCredential.txHash,
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