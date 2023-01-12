import useTranslation from 'next-translate/useTranslation';

import { useQuery } from '@tanstack/react-query';
import { PartialDeep } from 'type-fest';

import { theme } from '@gateway/theme';

import { Stack, Box, useMediaQuery } from '@mui/material';

import { ROUTES } from '../../../../../../constants/routes';
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

  const issuerName =
    issuer?.data?.username ??
    issuerCredential.primaryWallet?.ens ??
    issuerCredential.primaryWallet?.address;

  const recipientName =
    recipient?.data?.username ??
    recipientCredential.primaryWallet?.ens ??
    recipientCredential.primaryWallet?.address;

  return (
    <Stack
      justifyContent="space-between"
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'baseline', md: 'stretch' },
      }}
    >
      <CardUserCell
        label={t('credential.issuer-id')}
        picture={issuer?.data?.picture}
        name={issuerName}
        href={ROUTES.PROFILE.replace('[username]', issuerName)}
        hasLink={!!issuer.data}
      />
      <Box
        sx={{
          alignSelf: { md: 'center' },
          py: { xs: 0, md: 2 },
          px: { xs: 3, md: 2 },
          transform: { xs: 'rotate(90deg)', md: 'none' },
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
        label={t('credential.recipient-id')}
        picture={recipient?.data?.picture}
        name={recipientName}
        href={ROUTES.PROFILE.replace('[username]', recipientName)}
        alignRight={!isMobile}
        hasLink={!!recipient.data}
      />
    </Stack>
  );
}
