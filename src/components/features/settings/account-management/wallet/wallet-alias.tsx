import useTranslation from 'next-translate/useTranslation';

import { LoadingButton } from '@/components/atoms/buttons/loading-button';
import MorePopover from '@/components/atoms/more-popover';
import { TitleSubtitleField } from '@/components/atoms/title-field';
import { v4 as uuidv4 } from 'uuid';

import { Divider, Skeleton, Stack, Typography } from '@mui/material';

import { AuthenticationsItem } from './../types';

type Props = {
  wallets: AuthenticationsItem[];
  isLoading: boolean;
};

export function WalletAlias({ wallets, isLoading }: Props) {
  const { t } = useTranslation('settings');

  const options = (item: AuthenticationsItem) => {
    return [
      {
        text: t('account-management.set-as-primary'),
        action: () => console.log('Test'),
        hidden: false,
      },
      {
        text: t('account-management.disconnect'),
        action: () => console.log('Test'),
        hidden: false,
      },
    ];
  };

  return (
    <Stack gap={3}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <TitleSubtitleField
          title={t('account-management.wallet-section-title')}
          subtitle={t('account-management.wallet-section-desc')}
        />
        <LoadingButton variant="text" sx={{ display: 'none' }}>
          {t('account-management.wallet-section-btn')}
        </LoadingButton>
      </Stack>
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
                <MorePopover
                  options={options(item)}
                  withBackground
                  key={uuidv4()}
                />
              )}
            </Stack>
          ))}
        </Stack>
      )}
    </Stack>
  );
}
