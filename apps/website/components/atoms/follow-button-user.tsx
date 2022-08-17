import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

import { gql } from 'graphql-request';
import { useQuery, useQueryClient } from 'react-query';
import { useAccount } from 'wagmi';

import { Button, ButtonProps } from '@mui/material';

import { useBidirectionFollow } from '../../hooks/use-bidirectional-follow';
import { useFollowUser } from '../../hooks/use-follow';
import { useAuth } from '../../providers/auth';
import { gqlCyberConnectClient } from '../../services/cyberconnect-api';
import { BidirectionalConnectionStatus } from '../../types/cyberconnect';
import { LoadingButton } from './loading-button';

type Props = {
  wallet: string;
} & ButtonProps;

export function FollowButtonUser({ wallet, ...props }: Props) {
  const { me, onOpenLogin } = useAuth();
  const { t } = useTranslation('common');
  const { request: status, onResetRequest } = useStatus(wallet);

  const { onToggleFollow } = useBidirectionFollow();

  const onClick = async () => {
    await onToggleFollow(
      wallet,
      status.data === BidirectionalConnectionStatus.CONNECTD
    );
    return onResetRequest();
  };

  /*   const label = useMemo(() => {
    if (!me) {
      return t('follow');
    }
    switch (status.data) {
      case BidirectionalConnectionStatus.CONNECTD:
        return t('unfollow');
      case BidirectionalConnectionStatus.PENDING:
        return t('pending');
      default:
        return t('follow');
    }
  }, [me, status.data]); */

  if (!me)
    return (
      <Button variant="contained" onClick={onOpenLogin} {...props}>
        {t('follow')}
      </Button>
    );

  return (
    <LoadingButton
      variant="contained"
      isLoading={status.isLoading}
      onClick={onClick}
      {...props}
    >
      {status.data}
    </LoadingButton>
  );
}

const useStatus = (wallet: string) => {
  const { me } = useAuth();
  const { data } = useAccount();
  const client = useQueryClient();
  const myWallet = data?.address;
  const request = useQuery(
    ['follow', myWallet, wallet],
    () =>
      gqlCyberConnectClient
        .request<{
          bidirectionalConnections: { state: BidirectionalConnectionStatus }[];
        }>(
          gql`
            query connection_state($fromAddress: String!, $toAddress: String!) {
              bidirectionalConnections(
                fromAddr: $fromAddress
                toAddrList: [$toAddress]
                network: ETH
              ) {
                state
                direction
                namespace
                latestEvent {
                  ...event
                }
                latestAnchorEvent {
                  ...event
                }
              }
              connections(
                fromAddr: $fromAddress
                toAddrList: [$toAddress]
                network: ETH
              ) {
                fromAddr
                toAddr
                followStatus {
                  isFollowed
                  isFollowing
                }
              }
            }
            fragment event on BiConnEvent {
              hash
              parentHash
              fromAddr
              toAddr
              network
              namespace
              createdAt
              isAnchor
              proof {
                content
                digest
                signature
                signingKey
                signingKeyAuth {
                  message
                  signature
                  address
                }
                arweaveTxHash
              }
              instruction
            }
          `,
          {
            fromAddress: myWallet,
            toAddress: wallet,
          }
        )
        .then((res, ...other) => {
          if (
            wallet === '0xD3F8E47536e8d69D1d1BC369eDb70eeb4adF7108' ||
            wallet === '0x3e54d8f06CE568B62F7322197179b70de5dC173d'
          ) {
            console.log(res, other);
          }
          return res;
        }),
    {
      enabled: !!me && !!myWallet,
      select: (res) => res.bidirectionalConnections[0].state,
    }
  );

  const onResetRequest = async () => {
    await client.invalidateQueries(['follow', myWallet, wallet]);
    await client.refetchQueries(['follow', myWallet, wallet]);
  };

  return { request, onResetRequest };
};
