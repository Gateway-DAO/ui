import useTranslation from 'next-translate/useTranslation';

import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';
import { useQuery } from 'wagmi';

import { brandColors, theme } from '@gateway/theme';

import {
  Stack,
  Paper,
  Box,
  Divider,
  Chip,
  useMediaQuery,
  Typography,
} from '@mui/material';

import {
  Credential,
  CredentialStatus,
} from '../../../../services/gateway-protocol/types';
import { gqlAnonMethods } from '../../../../services/hasura/api';
import CardUsers from '../credentials/show/components/card-users';
import CardCell from './card-cell';

type Props = {
  credential: PartialDeep<Credential>;
  elevation?: number;
};

export default function CredentialCardInfo({
  credential,
  elevation = 2,
}: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

  // TODO: Remove
  const issuer = useQuery(
    ['issuer', credential?.issuerUser?.id],
    () =>
      gqlAnonMethods.user_from_wallet({
        wallet: credential?.issuerUser?.primaryWallet?.address,
      }),
    {
      select: (data) => data.users?.[0],
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  return (
    <Paper
      elevation={elevation}
      component={Stack}
      sx={{
        border: '1px solid rgba(229, 229, 229, 0.12)',
        borderRadius: 2,
        mb: 3,
        overflow: 'hidden',
        boxShadow: 'none',
      }}
      divider={<Divider sx={{ width: '100%' }} />}
    >
      <CardUsers
        issuer={credential?.issuerUser}
        recipient={credential?.recipientUser}
      />
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
        }}
        divider={
          <Box>
            <Divider orientation={isMobile ? 'horizontal' : 'vertical'} />
          </Box>
        }
      >
        <CardCell label={t('credential.authenticated-by')}>
          <Typography color={brandColors.purple.main} variant="body2">
            {credential?.issuerUser.gatewayId}
          </Typography>
        </CardCell>
        <CardCell label={t('credential.status')}>
          {credential?.status === CredentialStatus.Valid && (
            <Chip
              label={t('credential.valid')}
              size="small"
              variant="outlined"
              color="success"
            />
          )}
          {credential?.status === CredentialStatus.Suspended && (
            <Chip
              label={t('credential.suspended')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {credential?.status === CredentialStatus.Revoked && (
            <Chip
              label={t('credential.revoked')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {credential?.status === CredentialStatus.Invalid && (
            <Chip
              label={t('credential.invalid')}
              size="small"
              variant="outlined"
              color="error"
            />
          )}
        </CardCell>
      </Stack>
      <Stack
        alignItems="stretch"
        justifyContent="space-around"
        sx={{
          flexDirection: isMobile ? 'column' : 'row',
        }}
        divider={
          <Box>
            <Divider orientation={isMobile ? 'horizontal' : 'vertical'} />
          </Box>
        }
      >
        <CardCell label={t('credential.issuance-date')}>
          {DateTime.fromISO(credential?.createdAt).toLocaleString(
            DateTime.DATETIME_SHORT
          )}
        </CardCell>
        <CardCell label={t('credential.expiration-date')}>
          {credential?.expirationDate
            ? DateTime.fromISO(credential?.expirationDate).toLocaleString(
                DateTime.DATETIME_SHORT
              )
            : t('credential.indeterminate')}
        </CardCell>
      </Stack>
    </Paper>
  );
}
