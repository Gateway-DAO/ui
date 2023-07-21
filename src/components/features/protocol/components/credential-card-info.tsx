import useTranslation from 'next-translate/useTranslation';

import {
  Protocol_Api_Credential,
  Protocol_Api_CredentialStatus,
} from '@/services/hasura/types';
import { theme } from '@/theme';
import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

import { Stack, Paper, Box, Divider, Chip, useMediaQuery } from '@mui/material';

import AuthenticatedBy from './authenticated-by';
import CardCell from './card-cell';
import CardUsers from './card-users';

type Props = {
  credential: PartialDeep<Protocol_Api_Credential>;
  elevation?: number;
};

export default function CredentialCardInfo({
  credential,
  elevation = 2,
}: Props) {
  const { t } = useTranslation('protocol');
  const isMobile = useMediaQuery(theme.breakpoints.down('md'), { noSsr: true });

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
        issuerAuthData={credential?.issuerAuth}
        organization={credential?.issuerOrganization}
        recipient={credential?.recipientUser}
        recipientAuthData={credential?.recipientAuth}
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
        <AuthenticatedBy
          authenticatedBy={credential?.issuerUser}
          hasLink={!!credential?.issuerUser.gatewayId}
        />
        <CardCell label={t('credential.status')}>
          {credential?.status === Protocol_Api_CredentialStatus.Valid && (
            <Chip
              label={t('credential.valid')}
              size="small"
              variant="outlined"
              color="success"
            />
          )}
          {credential?.status === Protocol_Api_CredentialStatus.Suspended && (
            <Chip
              label={t('credential.suspended')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {credential?.status === Protocol_Api_CredentialStatus.Revoked && (
            <Chip
              label={t('credential.revoked')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {credential?.status === Protocol_Api_CredentialStatus.Invalid && (
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
