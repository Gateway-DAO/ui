import useTranslation from 'next-translate/useTranslation';
import { useState } from 'react';

import { utils } from 'ethers';
import { useQuery } from 'react-query';

import { Button, Dialog, Typography } from '@mui/material';

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
      <Button variant="text" color="secondary" onClick={() => setIsOpen(true)}>
        {t('connections-count', { count: data?.length })}
      </Button>
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
