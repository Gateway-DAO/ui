import useTranslation from 'next-translate/useTranslation';

import { DateTime } from 'luxon';
import { PartialDeep } from 'type-fest';

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

import { Credential } from '../../../../services/gateway-protocol/types';
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

  const isDateExpired = (() => {
    if (!credential?.expirationDate) {
      return false;
    }
    const expireDate = new Date(credential?.expirationDate);
    expireDate.setDate(expireDate.getDate());
    return expireDate.getTime() < new Date().getTime();
  })();

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
            sanket.gate
          </Typography>
        </CardCell>
        <CardCell label={t('credential.status')}>
          {!isDateExpired && (
            <Chip
              label={t('credential.valid')}
              size="small"
              variant="outlined"
              color="success"
            />
          )}
          {isDateExpired && (
            <Chip
              label={t('credential.expired')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {/* {credential?.status === 'REVOKED' && (
            <Chip
              label={t('credential.revoked')}
              size="small"
              variant="outlined"
              color="warning"
            />
          )}
          {credential?.status === 'INVALID' && (
            <Chip
              label={t('credential.invalid')}
              size="small"
              variant="outlined"
              color="error"
            />
          )} */}
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
