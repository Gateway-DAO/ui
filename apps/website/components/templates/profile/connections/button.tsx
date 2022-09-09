import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';

import { Dialog, Link, Typography } from '@mui/material';

import { cyberConnectSDK } from '../../../../services-cyberconnect/api';
import { ConnectionsModal } from './modal';

type Props = {
  wallet: string;
};

export function ConnectionsButton({ wallet }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation('user-profile');

  const { isLoading, data } = useQuery(
    ['connections', wallet],
    () => cyberConnectSDK.user_connections({ address: wallet }),
    {
      enabled: !!wallet,
      refetchOnWindowFocus: true,
      refetchInterval: 10000,
      select: (data) =>
        data?.identity?.bidirectionalFriends?.list
          ?.filter(
            ({ bidirectionalConnection }) =>
              bidirectionalConnection.namespace === 'GatewayDAO'
          )
          .map(({ bidirectionalConnection: { from, to } }) =>
            utils.getAddress(to === wallet ? from : to)
          ) ?? [],
    }
  );

  if (isLoading) return <Typography>{t('loading.connections')}</Typography>;

  if (data?.length === 0) {
    return (
      <Typography>{t('connections-count', { count: data?.length })}</Typography>
    );
  }

  return (
    <>
      <Link
        component="button"
        type="button"
        color="text.primary"
        onClick={() => setIsOpen(true)}
        underline="hover"
        sx={(theme) => ({ cursor: 'pointer', ...theme.typography.body1 })}
      >
        {t('connections-count', { count: data?.length })}
      </Link>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        keepMounted={false}
        fullWidth
      >
        <ConnectionsModal
          wallet={wallet}
          connections={data}
          onClose={() => setIsOpen(false)}
        />
      </Dialog>
    </>
  );
}
