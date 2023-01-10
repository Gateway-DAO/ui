import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { theme } from '@gateway/theme';

import { Stack, Box, useMediaQuery } from '@mui/material';

import { User } from '../../../../../../services/gateway-protocol/types';
import { gqlAnonMethods } from '../../../../../../services/hasura/api';
import CardUserCell from './card-user-cell';

type Props = {
  issuer: PartialDeep<User>;
  recipient: PartialDeep<User>;
};

export default function CardUsers({
  issuer: issuerCredential,
  recipient: recipientCredential,
}: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  const issuer = useQuery(
    ['issuer', issuerCredential._id],
    () =>
      gqlAnonMethods.user_from_wallet({
        wallet: issuerCredential.primaryWallet?.address,
      }),
    {
      select: (data) => data.users?.[0],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  const recipient = useQuery(
    ['recipient', recipientCredential._id],
    () =>
      gqlAnonMethods.user_from_wallet({
        wallet: recipientCredential.primaryWallet?.address,
      }),
    {
      select: (data) => data.users?.[0],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: isMobile ? 'baseline' : 'center',
      }}
    >
      <CardUserCell user={issuer.data} label={t('credential.issuer-id')} />
      <Box
        sx={{
          py: isMobile ? 0 : 2,
          px: isMobile ? 3 : 2,
          transform: isMobile ? 'rotate(90deg)' : 'none',
        }}
      >
        <svg width="18" height="36" fill="none" viewBox="0 0 18 36">
          <path
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity=".7"
            d="m.5 1 17 17-17 17"
          />
        </svg>
      </Box>
      <CardUserCell
        user={recipient.data}
        label={t('credential.recipient-id')}
        alignRight={!isMobile}
      />
    </Stack>
  );
}
