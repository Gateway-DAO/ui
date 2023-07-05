import useTranslation from 'next-translate/useTranslation';

import MorePopover from '@/components/atoms/more-popover';
import { v4 as uuidv4 } from 'uuid';

import { Divider, Skeleton, Stack, Typography } from '@mui/material';

import { AuthenticationsItem, Modals } from '../../types';

type Props = {
  wallets: AuthenticationsItem[];
  isLoading: boolean;
  onOpenModal: (data: Modals) => void;
};

export function ListWallets({ wallets, isLoading, onOpenModal }: Props) {
  const { t } = useTranslation('settings');

  const options = (item: AuthenticationsItem) => {
    return [
      {
        text: t('account-management.disconnect'),
        action: () => {
          onOpenModal({ type: 'remove', wallet: item?.data?.wallet });
        },
        hidden: false,
      },
    ];
  };

  return (
    <>
      {isLoading ? (
        <Skeleton sx={{ height: 30 }} />
      ) : (
        <Stack divider={<Divider sx={{ margin: ' 0 -3.7rem' }} />}>
          {wallets.map((item, index) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              py={2}
              key={index}
            >
              <Typography sx={{ flexGrow: 1 }}>{item?.data?.email}</Typography>
              {wallets.length > 1 && (
                <Stack height={32}>
                  <MorePopover
                    options={options(item)}
                    withBackground
                    key={uuidv4()}
                  />
                </Stack>
              )}
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}
