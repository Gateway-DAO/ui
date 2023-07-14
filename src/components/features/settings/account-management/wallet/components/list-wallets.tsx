import useTranslation from 'next-translate/useTranslation';

import MorePopover from '@/components/atoms/more-popover';
import { Protocol_Api_Chain } from '@/services/hasura/types';
import { brandColors } from '@/theme';
import { limitCharsCentered } from '@/utils/string';
import { FaEthereum } from 'react-icons/fa';
import { TbCurrencySolana } from 'react-icons/tb';
import { v4 as uuidv4 } from 'uuid';

import { Chip, Divider, Skeleton, Stack, Typography } from '@mui/material';

import { AuthenticationsItem, Modals } from '../../types';

type Props = {
  wallets: AuthenticationsItem[];
  isLoading: boolean;
  onRemoveWallet: (data: Modals) => void;
};

export function ListWallets({ wallets, isLoading, onRemoveWallet }: Props) {
  const { t } = useTranslation('settings');

  const icons = {
    [Protocol_Api_Chain.Evm]: <FaEthereum size={14} />,
    [Protocol_Api_Chain.Sol]: <TbCurrencySolana size={14} />,
  };

  const options = (authItem: AuthenticationsItem) => {
    return [
      {
        text: t('account-management.disconnect'),
        action: () => {
          onRemoveWallet({ type: 'remove', authItem });
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
        <Stack
          divider={
            <Divider sx={{ margin: { md: '0 -3.7rem', xs: '0 -1.5rem' } }} />
          }
        >
          {wallets.map((item, index) => (
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={2}
              py={2}
              key={index}
            >
              <Typography sx={{ flexGrow: 1 }}>
                {limitCharsCentered(item?.data?.address, 12)}
              </Typography>
              <Stack width={70}>
                {item?.data?.primary && (
                  <Chip
                    label={t('account-management.primary')}
                    color="success"
                    size="small"
                    sx={{ backgroundColor: brandColors.green.main }}
                  />
                )}
              </Stack>
              <Chip
                label={item?.data?.chain}
                size="small"
                icon={icons[item?.data?.chain]}
                sx={{ height: 26 }}
              />
              <Stack height={32} width={40}>
                {wallets.length > 1 && !item?.data?.primary && (
                  <MorePopover
                    options={options(item)}
                    withBackground
                    key={uuidv4()}
                  />
                )}
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}
    </>
  );
}
